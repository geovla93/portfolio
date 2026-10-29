// Renders public/images/me.jpg as a line engraving: opaque lines on a
// transparent ground, which the page uses as a themable CSS mask.
//
//   node scripts/engrave-portrait.mjs <out.png> [shadow|highlight]
//
// "shadow" draws lines where the photo is dark (ink on paper, light theme);
// "highlight" draws them where it is bright (silver on steel, dark theme).
// Encode the result with `cwebp -lossless -z 9` into
// public/images/portrait-engraved-{light,dark}.webp.
import { chromium } from "@playwright/test";
import { readFileSync, writeFileSync } from "node:fs";

const [outPng, mode = "shadow"] = process.argv.slice(2);
if (!outPng)
  throw new Error("Usage: engrave-portrait.mjs <out.png> [shadow|highlight]");

const src = readFileSync(
  new URL("../public/images/me.jpg", import.meta.url),
).toString("base64");

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent("<canvas id=c></canvas>");
const dataUrl = await page.evaluate(
  async ([b64, mode]) => {
    const img = new Image();
    img.src = `data:image/jpeg;base64,${b64}`;
    await img.decode();
    const W = img.naturalWidth,
      H = img.naturalHeight;
    const S = 2; // output scale
    const src = document.createElement("canvas");
    src.width = W;
    src.height = H;
    const sctx = src.getContext("2d");
    sctx.drawImage(img, 0, 0);
    const px = sctx.getImageData(0, 0, W, H).data;
    const lum = new Float32Array(W * H);
    for (let i = 0; i < W * H; i++) {
      lum[i] =
        (0.2126 * px[i * 4] + 0.7152 * px[i * 4 + 1] + 0.0722 * px[i * 4 + 2]) /
        255;
    }
    // Levels: stretch the 3rd..97th percentile to full range.
    const sorted = Array.from(lum).sort((a, b) => a - b);
    const lo = sorted[Math.floor(sorted.length * 0.03)];
    const hi = sorted[Math.floor(sorted.length * 0.97)];
    // Box blur radius 1 to keep lines from shimmering on JPEG noise.
    const blur = new Float32Array(W * H);
    for (let y = 0; y < H; y++)
      for (let x = 0; x < W; x++) {
        let s = 0,
          n = 0;
        for (let dy = -1; dy <= 1; dy++)
          for (let dx = -1; dx <= 1; dx++) {
            const xx = x + dx,
              yy = y + dy;
            if (xx >= 0 && yy >= 0 && xx < W && yy < H) {
              s += lum[yy * W + xx];
              n++;
            }
          }
        blur[y * W + x] = s / n;
      }
    // Vignette: the subject (face and torso) carries full tone, the backdrop
    // fades out toward the edges like a banknote portrait.
    const cx = W * 0.5,
      cy = H * 0.5,
      rx = W * 0.5,
      ry = H * 0.58;
    const darkness = (x, y) => {
      const xi = Math.min(W - 1, Math.max(0, Math.round(x)));
      const yi = Math.min(H - 1, Math.max(0, Math.round(y)));
      let l = (blur[yi * W + xi] - lo) / (hi - lo);
      l = Math.min(1, Math.max(0, l));
      let d = mode === "shadow" ? Math.pow(1 - l, 1.55) : Math.pow(l, 1.25);
      const e = Math.hypot((x - cx) / rx, (y - cy) / ry);
      const fade = e < 0.62 ? 1 : Math.max(0, 1 - (e - 0.62) / 0.42);
      return d * fade * fade * (3 - 2 * fade);
    };

    const out = document.getElementById("c");
    out.width = W * S;
    out.height = H * S;
    const ctx = out.getContext("2d");
    ctx.fillStyle = "#000";

    // Layer 1: gently waving horizontal lines, width set by tone.
    const spacing = 3.1; // source px between line centres
    const step = 0.75;
    for (let y0 = spacing / 2; y0 < H; y0 += spacing) {
      const top = [],
        bottom = [];
      for (let x = 0; x <= W; x += step) {
        const wave =
          1.1 * Math.sin(x / 23 + y0 / 31) + 0.6 * Math.sin(x / 9.5 - y0 / 17);
        const y = y0 + wave;
        const t = Math.min(spacing * 0.86, spacing * 0.92 * darkness(x, y));
        if (t < 0.09) {
          top.push(null);
          bottom.push(null);
          continue;
        }
        top.push([x, y - t / 2]);
        bottom.push([x, y + t / 2]);
      }
      // Draw each continuous run as a filled ribbon.
      let run = [];
      const flush = () => {
        if (run.length > 1) {
          ctx.beginPath();
          run.forEach(([a], i) =>
            i ? ctx.lineTo(a[0] * S, a[1] * S) : ctx.moveTo(a[0] * S, a[1] * S),
          );
          for (let i = run.length - 1; i >= 0; i--)
            ctx.lineTo(run[i][1][0] * S, run[i][1][1] * S);
          ctx.closePath();
          ctx.fill();
        }
        run = [];
      };
      for (let i = 0; i < top.length; i++) {
        if (top[i]) run.push([top[i], bottom[i]]);
        else flush();
      }
      flush();
    }

    // Layer 2: diagonal hatching only in the deepest shadows.
    ctx.lineCap = "round";
    const hs = 4.2,
      ang = (-58 * Math.PI) / 180,
      ux = Math.cos(ang),
      uy = Math.sin(ang);
    const diag = Math.hypot(W, H);
    for (let o = -diag; o < diag; o += hs) {
      let prev = null;
      for (let s = -diag; s < diag; s += 1) {
        const x = W / 2 + ux * s - uy * o,
          y = H / 2 + uy * s + ux * o;
        if (x < 0 || y < 0 || x > W || y > H) {
          prev = null;
          continue;
        }
        const d = darkness(x, y);
        if (d > 0.62) {
          const w = Math.min(1.5, (d - 0.62) * 3.4);
          if (prev) {
            ctx.lineWidth = w * S;
            ctx.beginPath();
            ctx.moveTo(prev[0] * S, prev[1] * S);
            ctx.lineTo(x * S, y * S);
            ctx.stroke();
          }
          prev = [x, y];
        } else prev = null;
      }
    }
    return out.toDataURL("image/png");
  },
  [src, mode],
);
writeFileSync(outPng, Buffer.from(dataUrl.split(",")[1], "base64"));
await browser.close();
console.log("wrote", outPng);

"use client";

import { useEffect } from "react";

type LatentDriverProps = {
  /** The id of the SVG group that carries the latent copy of the mesh. */
  targetId: string;
};

const MAX_TILT = 2.6;

/**
 * Turns the latent copy of the medallion's mesh a few degrees against the
 * base copy, so the hidden monogram surfaces as moiré. The pointer drives it
 * where there is one; on touch screens, scrolling through the hero does.
 */
export function LatentDriver({ targetId }: LatentDriverProps) {
  useEffect(() => {
    const target = document.getElementById(targetId);
    const section = target?.closest("section");
    if (!target || !section) return;

    // Tilt turns the latent copy and thickens its lines, so the monogram
    // reads as a denser weave; at rest the two copies match exactly.
    const render = (tilt: number) => {
      target.setAttribute("transform", `rotate(${tilt.toFixed(3)})`);
      target.setAttribute(
        "stroke-width",
        (0.8 + Math.abs(tilt) * 0.42).toFixed(3),
      );
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      render(1.6);
      return;
    }

    let current = 0;
    let goal = 0;
    let frame = 0;

    const tick = () => {
      current += (goal - current) * 0.09;
      if (Math.abs(goal - current) < 0.002) current = goal;
      render(current);
      frame = current === goal ? 0 : requestAnimationFrame(tick);
    };
    const steer = (value: number) => {
      goal = Math.max(-MAX_TILT, Math.min(MAX_TILT, value));
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const onPointerMove = (event: PointerEvent) => {
      const bounds = section.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      steer((x - 0.5) * 2 * MAX_TILT);
    };
    const onPointerLeave = () => steer(0);
    const onScroll = () => {
      const progress = window.scrollY / Math.max(1, section.offsetHeight);
      steer(Math.min(1, progress * 1.6) * MAX_TILT);
    };

    if (fine.matches) {
      section.addEventListener("pointermove", onPointerMove);
      section.addEventListener("pointerleave", onPointerLeave);
    } else {
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    return () => {
      cancelAnimationFrame(frame);
      section.removeEventListener("pointermove", onPointerMove);
      section.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, [targetId]);

  return null;
}

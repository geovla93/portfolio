import { LatentDriver } from "@/components/security/latent-driver";
import { MICROTEXT } from "@/components/security/microprint";
import { experiences } from "@/data/experiences";
import { copyAngles, polarPath, rosetteFor } from "@/lib/guilloche";
import { cn } from "@/lib/utils";

// The medallion is built from the two roles' rosettes: the current role sets
// the outer mesh, the first role at Cyberscope the inner one.
const current = rosetteFor(experiences[0].start);
const first = rosetteFor(experiences[experiences.length - 1].start);

const BAND_WAVES = 40;
const RING_RADIUS = 466;

const paths = {
  band: polarPath((t) => 420 + 15 * Math.sin(BAND_WAVES * t), 960),
  outer: polarPath((t) => 236 + 118 * Math.cos(current.lobes * t)),
  inner: polarPath((t) => 82 + 22 * Math.cos(first.lobes * t)),
  core: polarPath((t) => 30 + 10 * Math.cos(current.lobes * t), 360),
};

const ringPath = `M0 ${-RING_RADIUS}A${RING_RADIUS} ${RING_RADIUS} 0 1 1 0 ${RING_RADIUS}A${RING_RADIUS} ${RING_RADIUS} 0 1 1 0 ${-RING_RADIUS}`;

const LATENT_ID = "medallion-latent";

type CopiesProps = {
  href: string;
  angles: number[];
  offset?: number;
};

function Copies({ href, angles, offset = 0 }: CopiesProps) {
  return angles.map((angle, index) => (
    <use
      key={angle}
      href={`#${href}`}
      transform={`rotate(${angle.toFixed(3)})`}
      style={{ "--i": index + offset } as React.CSSProperties}
    />
  ));
}

function Monogram({ fill }: { fill: string }) {
  return (
    <text
      x="0"
      y="0"
      dy="0.35em"
      textAnchor="middle"
      fontSize="340"
      fontWeight="800"
      letterSpacing="-10"
      fill={fill}
      style={{ fontFamily: "var(--font-commissioner)" }}
    >
      GV
    </text>
  );
}

type MedallionProps = {
  className?: string;
};

export function Medallion({ className }: MedallionProps) {
  const outerAngles = copyAngles(current.lobes, current.copies);

  return (
    <>
      <svg
        viewBox="-500 -500 1000 1000"
        aria-hidden="true"
        className={cn("engrave pointer-events-none select-none", className)}
      >
        <defs>
          {Object.entries(paths).map(([name, d]) => (
            <path
              key={name}
              id={`medallion-${name}`}
              d={d}
              pathLength={1}
              vectorEffect="non-scaling-stroke"
            />
          ))}
          <path id="medallion-ring" d={ringPath} />
          <mask
            id="medallion-hide"
            maskUnits="userSpaceOnUse"
            x="-500"
            y="-500"
            width="1000"
            height="1000"
          >
            <rect x="-500" y="-500" width="1000" height="1000" fill="white" />
            <Monogram fill="black" />
          </mask>
          <mask
            id="medallion-show"
            maskUnits="userSpaceOnUse"
            x="-500"
            y="-500"
            width="1000"
            height="1000"
          >
            <Monogram fill="white" />
          </mask>
        </defs>

        <g fill="none" strokeWidth="0.8">
          <g stroke="var(--line-faint)">
            <Copies href="medallion-band" angles={copyAngles(BAND_WAVES, 8)} />
          </g>
          <g stroke="var(--line)" mask="url(#medallion-hide)">
            <Copies href="medallion-outer" angles={outerAngles} offset={4} />
          </g>
          <g mask="url(#medallion-show)">
            <g id={LATENT_ID} stroke="var(--line)">
              <Copies href="medallion-outer" angles={outerAngles} offset={4} />
            </g>
          </g>
          <g stroke="var(--iris)">
            <Copies
              href="medallion-inner"
              angles={copyAngles(first.lobes, first.copies)}
              offset={10}
            />
          </g>
          <g stroke="var(--line)">
            <Copies
              href="medallion-core"
              angles={copyAngles(current.lobes, 9)}
              offset={20}
            />
          </g>
        </g>

        <text
          className="fill-microprint"
          fontSize="10"
          letterSpacing="1.5"
          style={{
            fontFamily: "var(--font-martian-mono)",
            textTransform: "uppercase",
          }}
        >
          <textPath
            href="#medallion-ring"
            textLength={Math.round(2 * Math.PI * RING_RADIUS - 8)}
            lengthAdjust="spacing"
          >
            {MICROTEXT.repeat(4)}
          </textPath>
        </text>
      </svg>
      <LatentDriver targetId={LATENT_ID} />
    </>
  );
}

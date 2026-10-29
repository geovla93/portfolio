import { copyAngles, polarPath, rosetteFor } from "@/lib/guilloche";
import { cn } from "@/lib/utils";

type SealProps = {
  /** The role's start date, "YYYY-MM", which sets the rosette. */
  start: string;
  className?: string;
};

/** A small rosette generated from a role's start date. */
export function Seal({ start, className }: SealProps) {
  const { lobes, copies } = rosetteFor(start);
  const id = `seal-${start}`;

  return (
    <figure className={cn("flex items-center gap-4", className)}>
      <svg
        viewBox="-50 -50 100 100"
        aria-hidden="true"
        className="size-28 shrink-0"
      >
        <defs>
          <path
            id={id}
            d={polarPath((t) => 25 + 21 * Math.cos(lobes * t), 480)}
            vectorEffect="non-scaling-stroke"
          />
        </defs>
        <g fill="none" stroke="var(--line)" strokeWidth="0.4">
          {copyAngles(lobes, copies, 0.45).map((angle) => (
            <use
              key={angle}
              href={`#${id}`}
              transform={`rotate(${angle.toFixed(3)})`}
            />
          ))}
          <circle r="48" stroke="var(--line-faint)" />
        </g>
      </svg>
      <figcaption className="data-label text-muted-foreground">
        {lobes} lobes × {copies} passes
        <span className="block">from {start.replace("-", ".")}</span>
      </figcaption>
    </figure>
  );
}

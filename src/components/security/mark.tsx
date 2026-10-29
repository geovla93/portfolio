import { copyAngles, polarPath } from "@/lib/guilloche";
import { cn } from "@/lib/utils";

// Sparse enough to read as a rosette at icon size.
const LOBES = 5;
const d = polarPath((t) => 22 + 24 * Math.cos(LOBES * t), 300);

/** The site mark: a small rosette from the medallion's family. */
export function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="-50 -50 100 100"
      aria-hidden="true"
      className={cn("size-7", className)}
    >
      <defs>
        <path id="site-mark" d={d} vectorEffect="non-scaling-stroke" />
      </defs>
      <g fill="none" stroke="currentColor" strokeWidth="1.1">
        {copyAngles(LOBES, 3).map((angle) => (
          <use
            key={angle}
            href="#site-mark"
            transform={`rotate(${angle.toFixed(3)})`}
          />
        ))}
      </g>
    </svg>
  );
}

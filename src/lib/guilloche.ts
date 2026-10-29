// Guilloché geometry. Every rosette on the page is one closed polar curve,
// drawn many times at small rotations so the copies weave into a mesh.

type PolarCurve = (theta: number) => number;

/** An SVG path for a closed polar curve centred on the origin. */
export function polarPath(radius: PolarCurve, steps = 720): string {
  const points: string[] = [];
  for (let i = 0; i < steps; i++) {
    const theta = (i / steps) * Math.PI * 2;
    const r = radius(theta);
    points.push(
      `${(r * Math.cos(theta)).toFixed(1)} ${(r * Math.sin(theta)).toFixed(1)}`,
    );
  }
  return `M${points.join(" ")}Z`;
}

/**
 * Rotation for each copy, spreading the copies across one lobe. A spread
 * below 1 bunches them into ribbons that stay legible at small sizes.
 */
export function copyAngles(
  lobes: number,
  copies: number,
  spread = 1,
): number[] {
  const span = (360 / lobes) * spread;
  return Array.from({ length: copies }, (_, i) => (span / copies) * i);
}

export type RosetteSpec = {
  /** Lobes around the curve: the role's start month plus three. */
  lobes: number;
  /** Rotated copies: the last two digits of the role's start year. */
  copies: number;
};

/** Derives a role's rosette from its start date ("YYYY-MM"). */
export function rosetteFor(start: string): RosetteSpec {
  const [year, month] = start.split("-").map(Number);
  return { lobes: month + 3, copies: year % 100 };
}

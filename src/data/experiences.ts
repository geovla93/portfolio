export type Experience = {
  title: string;
  company: string;
  /** "YYYY-MM" */
  start: string;
  /** "YYYY-MM", or absent for the current role. */
  end?: string;
  summary: string;
  scope: { label: string; items: string[] }[];
  technologies: string[];
};

// The CTO title is listed on cyberscope.io/about-us without a start date, so
// it sits on the role that began in June 2025 until the date is confirmed.
export const experiences = [
  {
    title: "Chief Technology Officer & Vice President, Product",
    company: "Cyberscope",
    start: "2025-06",
    summary:
      "I lead the vision and execution of Cyberscope's blockchain security SaaS platforms.",
    scope: [
      {
        label: "Product",
        items: [
          "Define the product roadmap and prioritize features for customer value and market differentiation.",
          "Align technical work with evolving compliance requirements and business objectives.",
        ],
      },
      {
        label: "Leadership",
        items: [
          "Coordinate the engineering, auditing, and design teams that deliver the platforms.",
          "Build security best practices into every stage of development.",
        ],
      },
    ],
    technologies: [
      "React",
      "Next.js",
      "Node.js",
      "MongoDB",
      "Postgres",
      "TypeScript",
      "AWS",
      "Docker",
    ],
  },
  {
    title: "Software Engineer",
    company: "Cyberscope",
    start: "2022-11",
    end: "2025-05",
    summary:
      "I built core features of Cyberscope's web platform and ran formal smart contract audits.",
    scope: [
      {
        label: "Engineering",
        items: [
          "Designed and implemented core platform features in Next.js, Node.js, and MongoDB, built for performance and maintainability.",
          "Improved internal auditing tools to streamline vulnerability analysis.",
        ],
      },
      {
        label: "Security",
        items: [
          "Ran formal smart contract audits of DeFi and NFT projects.",
          "Identified critical Solidity vulnerabilities and advised teams on remediation.",
        ],
      },
    ],
    technologies: ["React", "Next.js", "Node.js", "MongoDB", "Solidity"],
  },
] as const satisfies Experience[];

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/** "2025-06" → "Jun 2025" */
export function formatMonth(value: string) {
  const [year, month] = value.split("-").map(Number);
  return `${monthNames[month - 1]} ${year}`;
}

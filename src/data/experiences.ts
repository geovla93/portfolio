export type Experience = {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
};

export const experiences = [
  {
    title: "Vice President of Product",
    company: "Cyberscope",
    period: "June 2025 - Present",
    description:
      "Leading the vision and execution of Cyberscope's blockchain security SaaS platforms, I define the product roadmap and prioritize features that drive both customer value and market differentiation. I coordinate engineering, auditing, and design teams to deliver scalable, secure solutions—aligning technical efforts with evolving compliance requirements and business objectives. My work has accelerated platform growth and improved operational efficiency by embedding security best practices into every stage of development.",
    technologies: [
      "React",
      "Next.js",
      "Node.js",
      "MongoDB",
      "TypeScript",
      "AWS",
      "MongoDB",
      "Docker",
    ],
  },
  {
    title: "Software Engineer",
    company: "Cyberscope",
    period: "October 2022 - May 2025",
    description:
      "Designed and implemented core web platform features using Next.js, Node.js, and MongoDB, ensuring high performance and maintainability. Conducted formal smart contract audits—identifying critical Solidity vulnerabilities and advising on remediation in DeFi and NFT projects. Enhanced internal auditing tools, streamlining vulnerability analysis workflows and bolstering overall protocol security.",
    technologies: ["React", "Next.js", "Node.js", "MongoDB", "Solidity"],
  },
] as const satisfies Experience[];

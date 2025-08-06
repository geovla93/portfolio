export type Project = {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
};

export const projects = [
  {
    title: "VolBoost",
    description:
      "VolBoost is a DeFi automation tool that helps token projects boost their trading volume, liquidity, and visibility through automated trading. The system operates through a Telegram bot interface and smart contracts deployed on multiple blockchain networks.",
    image: "/placeholder.svg",
    technologies: ["Node.js", "TypeScript", "Viem", "Telegraf", "Solidity"],
    liveUrl: "https://t.me/volboost_bot",
  },
  {
    title: "Minu",
    description:
      "Minu is a comprehensive Web3 DeFi platform built on the Binance Smart Chain (BSC) featuring a cryptocurrency mining game and decentralized exchange.",
    image: "/placeholder.svg",
    technologies: [
      "React",
      "Next.js",
      "Solidity",
      "Viem",
      "Wagmi",
      "TypeScript",
      "Motion",
    ],
    liveUrl: "https://minu.com",
  },
  {
    title: "My Portfolio",
    description:
      "A personal portfolio website showcasing my projects, experiences, and skills in web development.",
    image: "/placeholder.svg",
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Motion",
    ],
    liveUrl: "https://geovla.dev",
  },
] as const satisfies Project[];

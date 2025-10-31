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
    title: "Volume Boost",
    description:
      "Volume Boost is a DeFi automation tool that helps token projects boost their trading volume, liquidity, and visibility through automated trading. The system operates through a Telegram bot interface and smart contracts deployed on multiple blockchain networks.",
    image: "/images/volboost.png",
    technologies: ["Node.js", "TypeScript", "Viem", "Telegraf", "Solidity"],
    liveUrl: "https://t.me/volboost_bot",
  },
  {
    title: "Utopia",
    description:
      "Utopia is a comprehensive Web3 DeFi platform built on the Binance Smart Chain (BSC) featuring a cryptocurrency mining game and decentralized exchange.",
    image: "/images/utopia.png",
    technologies: [
      "React",
      "Next.js",
      "Solidity",
      "Viem",
      "Wagmi",
      "TypeScript",
      "shadcn/ui",
    ],
    liveUrl: "https://utopiabnb.com",
  },
  {
    title: "My Portfolio",
    description:
      "My personal portfolio website showcasing my projects, experience, and skills as a software engineer.",
    image: "/images/portfolio.png",
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

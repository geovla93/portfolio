export type Project = {
  title: string;
  summary: string;
  image: string;
  imageAlt: string;
  /** Address shown beside the title, without the protocol. */
  address: string;
  specs: { label: string; value: string }[];
  decisions?: string[];
  technologies: string[];
  /** Where to try the product, labeled with what opens. */
  live?: { label: string; url: string };
  githubUrl?: string;
};

export const projects = [
  {
    title: "Volume Boost",
    summary:
      "A DeFi automation tool that raises a token's trading volume, liquidity, and visibility through automated trading.",
    image: "/images/volboost.png",
    imageAlt: "Volume Boost logo: a robot mascot beside the product name",
    address: "t.me/volboost_bot",
    specs: [
      { label: "Interface", value: "Telegram bot" },
      { label: "Contracts", value: "Solidity, deployed on multiple networks" },
      { label: "Chain access", value: "Viem" },
      { label: "Runtime", value: "Node.js and TypeScript, with Telegraf" },
    ],
    technologies: ["Node.js", "TypeScript", "Viem", "Telegraf", "Solidity"],
    live: { label: "Open in Telegram", url: "https://t.me/volboost_bot" },
  },
  {
    title: "Utopia",
    summary:
      "A Web3 DeFi platform with a cryptocurrency mining game and a decentralized exchange.",
    image: "/images/utopia.png",
    imageAlt: "Utopia home page: the game's title over an illustrated city",
    address: "utopiabnb.com",
    specs: [
      { label: "Network", value: "BNB Smart Chain" },
      { label: "Interface", value: "Web app in Next.js and React" },
      { label: "Wallet and chain", value: "Wagmi and Viem" },
      { label: "Contracts", value: "Solidity" },
    ],
    technologies: [
      "React",
      "Next.js",
      "Solidity",
      "Viem",
      "Wagmi",
      "TypeScript",
      "shadcn/ui",
    ],
    live: { label: "Visit site", url: "https://utopiabnb.com" },
  },
  {
    title: "geovla.dev",
    summary:
      "This portfolio: a single-page Next.js site whose contact form is verified with Cloudflare Turnstile and delivered through Resend.",
    image: "/images/geovla-dev.png",
    imageAlt: "The geovla.dev home page",
    address: "geovla.dev",
    specs: [
      { label: "Framework", value: "Next.js 16 App Router, React 19" },
      { label: "Styling", value: "Tailwind CSS 4, shadcn/ui on Base UI" },
      { label: "Email", value: "Resend" },
    ],
    decisions: [
      "Cloudflare Turnstile is verified on the server before any validation or sending.",
      "The email domain check fails only on a nonexistent domain, so a DNS outage never blocks a real sender.",
      "Fields validate on submit, then on blur, and a failed send never clears what you typed.",
    ],
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Resend",
    ],
    // Visitors are already on the live site, so link the source instead.
    githubUrl: "https://github.com/geovla93/portfolio",
  },
] as const satisfies Project[];

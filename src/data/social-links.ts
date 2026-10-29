export type SocialLink = {
  label: string;
  handle: string;
  href: string;
};

export const socialLinks = [
  {
    label: "GitHub",
    handle: "geovla93",
    href: "https://github.com/geovla93",
  },
  {
    label: "LinkedIn",
    handle: "georgios-vlassis",
    href: "https://www.linkedin.com/in/georgios-vlassis-045844105",
  },
  {
    label: "X",
    handle: "@GeorgeVlassis",
    href: "https://x.com/GeorgeVlassis",
  },
] as const satisfies SocialLink[];

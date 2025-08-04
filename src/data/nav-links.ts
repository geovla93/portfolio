export type NavLink = {
  label: string;
  hash: string;
};

export const navLinks = [
  { label: "About", hash: "about" },
  { label: "Tech Stack", hash: "tech-stack" },
  { label: "Projects", hash: "projects" },
  { label: "Contact", hash: "contact" },
] as const satisfies NavLink[];

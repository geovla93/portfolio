export type NavLink = {
  label: string;
  hash: string;
};

export const navLinks = [
  { label: "About", hash: "about" },
  { label: "Experience", hash: "experience" },
  { label: "Projects", hash: "projects" },
  { label: "Contact", hash: "contact" },
] as const satisfies NavLink[];

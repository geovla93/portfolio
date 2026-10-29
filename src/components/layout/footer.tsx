import Link from "next/link";

import { GithubIcon } from "@/components/icons/github";
import { LinkedInIcon } from "@/components/icons/linkedin";
import { XIcon } from "@/components/icons/x";
import { Microprint } from "@/components/security/microprint";
import { socialLinks } from "@/data/social-links";
import { cn } from "@/lib/utils";

const icons = {
  GitHub: GithubIcon,
  LinkedIn: LinkedInIcon,
  X: XIcon,
};

type FooterProps = React.ComponentProps<"footer">;

export function Footer({ className, ...props }: FooterProps) {
  return (
    <footer className={cn("bg-card", className)} {...props}>
      <Microprint />
      <div className="lattice flex flex-col-reverse items-start justify-between gap-6 py-8 sm:flex-row sm:items-center">
        <p className="text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} George Vlassis ·{" "}
          <span className="font-mono text-xs">geovla.dev</span>
        </p>

        <ul className="text-muted-foreground -ml-2 flex items-center gap-1 sm:ml-0">
          {socialLinks.map(({ label, href }) => {
            const Icon = icons[label];
            return (
              <li key={label}>
                <Link
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="hover:text-foreground flex size-10 items-center justify-center transition-colors"
                >
                  <Icon
                    aria-hidden="true"
                    className={label === "X" ? "size-4" : "size-5"}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}

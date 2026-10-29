import Link from "next/link";

import { GithubIcon } from "@/components/icons/github";
import { LinkedInIcon } from "@/components/icons/linkedin";
import { XIcon } from "@/components/icons/x";
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
    <footer className={cn("border-t", className)} {...props}>
      <div className="mx-auto flex w-full max-w-5xl flex-col-reverse items-start justify-between gap-4 px-4 py-6 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <p className="text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} George Vlassis
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

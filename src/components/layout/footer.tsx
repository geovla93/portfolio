import Link from "next/link";

import { GithubIcon } from "@/components/icons/github";
import { LinkedInIcon } from "@/components/icons/linkedin";
import { TwitterIcon } from "@/components/icons/twitter";
import { cn } from "@/lib/utils";

type FooterProps = React.ComponentProps<"footer">;

export function Footer({ className, ...props }: FooterProps) {
  return (
    <footer className={cn("", className)} {...props}>
      <div className="container mx-auto flex flex-col-reverse items-center justify-between gap-x-2 gap-y-5 px-4 py-6 sm:flex-row sm:px-6 lg:px-8 xl:px-0 2xl:px-10">
        <span className="text-muted-foreground">
          &copy; {new Date().getFullYear()} George Vlassis. All rights reserved.
        </span>

        <div className="text-muted-foreground flex items-center gap-3">
          <Link href="https://github.com/geovla93" target="_blank">
            <GithubIcon className="size-5" />
          </Link>
          <Link href="https://x.com/GeorgeVlassis" target="_blank">
            <TwitterIcon className="size-5" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/georgios-vlassis-045844105"
            target="_blank"
          >
            <LinkedInIcon className="size-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}

import { ArrowUpRightIcon } from "lucide-react";

import { ButtonLink } from "@/components/button-link";
import { GithubIcon } from "@/components/icons/github";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="py-16 sm:py-24"
    >
      <div className="grid gap-10 md:grid-cols-12 md:gap-12">
        <h2
          id="about-title"
          className="max-w-sm text-4xl leading-tight tracking-tight text-balance sm:text-5xl md:col-span-5"
        >
          Engineering and product, under one title
        </h2>
        <div className="md:col-span-7">
          <div className="max-w-lg space-y-4 leading-relaxed text-pretty">
            <p>
              At Cyberscope I set the product roadmap for our blockchain
              security SaaS platforms, and coordinate the engineering, auditing,
              and design teams that build them.
            </p>
            <p className="text-muted-foreground">
              I came to the role from the code. For two and a half years I built
              the company&apos;s web platform in Next.js, Node.js, and MongoDB,
              and audited Solidity contracts for the vulnerabilities that put
              DeFi and NFT projects at risk. I still build products end to end,
              from the interface down to the contracts.
            </p>
          </div>

          <ButtonLink
            href="https://github.com/geovla93"
            target="_blank"
            variant="outline"
            className="mt-8"
          >
            <GithubIcon aria-hidden="true" className="size-4" />
            View GitHub
            <ArrowUpRightIcon />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

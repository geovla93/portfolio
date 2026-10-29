import { ArrowDownRightIcon, ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

import { ButtonLink } from "@/components/button-link";
import { GithubIcon } from "@/components/icons/github";

const capabilities = [
  {
    label: "Leadership",
    value:
      "Product roadmap, prioritization, and delivery across engineering, auditing, and design teams.",
  },
  {
    label: "Engineering",
    value:
      "Full-stack web platforms in Next.js, Node.js, TypeScript, MongoDB, and Postgres.",
  },
  {
    label: "Security",
    value:
      "Formal smart contract audits, Solidity vulnerability analysis, and remediation advice.",
  },
  {
    label: "Web3",
    value: "DeFi products with Solidity contracts, Viem, and Wagmi.",
  },
  { label: "Experience", value: "More than five years building software." },
];

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="py-24 sm:py-32 lg:py-40"
    >
      <div className="lattice grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-x-6">
        <figure className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <div
            role="img"
            aria-label="Portrait of George Vlassis in a grey coat and dark turtleneck, rendered as a line engraving"
            className="portrait-engraving aspect-[578/870] w-full max-w-[28rem]"
          />
          <figcaption className="data-label text-muted-foreground mt-4">
            Engraved in code from a photograph
          </figcaption>
        </figure>

        <div className="lg:col-span-7 lg:col-start-6 xl:col-span-6 xl:col-start-7">
          <h2
            id="about-title"
            className="font-engraved text-[clamp(2.5rem,5.2vw,4.75rem)] leading-[1] font-[680] tracking-[-0.03em] text-balance"
          >
            Engineering and product, under one title
          </h2>
          <div className="mt-10 max-w-[62ch] space-y-5 text-lg leading-relaxed text-pretty">
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

          <dl className="mt-14 border-t">
            {capabilities.map(({ label, value }) => (
              <div
                key={label}
                className="grid gap-1 border-b py-4 sm:grid-cols-[9rem_1fr] sm:gap-6"
              >
                <dt className="data-label text-muted-foreground pt-1">
                  {label}
                </dt>
                <dd className="leading-relaxed">{value}</dd>
              </div>
            ))}
          </dl>

          <ButtonLink
            href="https://github.com/geovla93"
            target="_blank"
            variant="outline"
            size="lg"
            className="mt-10"
          >
            <GithubIcon aria-hidden="true" className="size-5" />
            View Github
            <ArrowUpRightIcon />
          </ButtonLink>

          <p className="mt-12 border-t pt-8 text-lg">
            Looking for a leader who can also ship the code?{" "}
            <Link
              href="#contact"
              className="text-primary inline-flex items-center gap-1 font-medium underline"
            >
              Start a conversation
              <ArrowDownRightIcon className="size-4" />
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";

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
      className="scroll-mt-16 border-t py-16 sm:py-24"
    >
      <div className="grid gap-10 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-4">
          <Image
            src="/images/me.jpg"
            alt="Portrait of George Vlassis in a grey coat and dark turtleneck"
            width={578}
            height={870}
            sizes="(min-width: 768px) 320px, 224px"
            className="h-auto w-full max-w-56 rounded-lg border md:max-w-xs"
          />
        </div>

        <div className="md:col-span-8">
          <h2
            id="about-title"
            className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl"
          >
            Engineering and product, under one title
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-pretty">
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

          <dl className="mt-8 divide-y border-y">
            {capabilities.map(({ label, value }) => (
              <div
                key={label}
                className="grid gap-1 py-3 sm:grid-cols-[8rem_1fr] sm:gap-6"
              >
                <dt className="text-muted-foreground text-sm">{label}</dt>
                <dd className="text-sm leading-relaxed">{value}</dd>
              </div>
            ))}
          </dl>

          <ButtonLink
            href="https://github.com/geovla93"
            target="_blank"
            variant="outline"
            className="mt-8"
          >
            <GithubIcon aria-hidden="true" className="size-4" />
            View Github
            <ArrowUpRightIcon />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

import { ArrowDownRightIcon, DownloadIcon } from "lucide-react";

import { ButtonLink } from "@/components/button-link";
import { DownloadButton } from "@/components/download-button";
import { experiences, formatMonth } from "@/data/experiences";

const firstRole = experiences[experiences.length - 1];

const specifications = [
  { label: "Title", value: "Chief Technology Officer & VP, Product" },
  {
    label: "Company",
    // A non-breaking space keeps the month and year together.
    value: `Cyberscope, since ${formatMonth(firstRole.start).replace(" ", "\u00a0")}`,
  },
  { label: "Security", value: "Formal audits of DeFi and NFT contracts" },
  { label: "Stack", value: "TypeScript, Next.js, Node.js, Solidity" },
  { label: "Shipped", value: "Volume Boost, Utopia" },
  { label: "Based in", value: "Ioannina, Greece" },
];

export function Hero() {
  return (
    <section aria-labelledby="hero-name" className="py-16 sm:py-24">
      <h1
        id="hero-name"
        className="text-4xl font-semibold tracking-tight sm:text-5xl"
      >
        George Vlassis
      </h1>
      <p className="mt-4 max-w-2xl text-xl text-balance sm:text-2xl">
        I lead engineering and product in blockchain security, and I still write
        the code.
      </p>
      <p className="text-muted-foreground mt-4 max-w-2xl leading-relaxed text-pretty">
        Today I run technology and product at Cyberscope. Before that I built
        core features of its web platform and ran formal smart contract audits
        for DeFi and NFT projects.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="#contact" size="lg">
          Get in touch
          <ArrowDownRightIcon />
        </ButtonLink>
        <DownloadButton
          href="/george_vlassis_cv.pdf"
          variant="outline"
          size="lg"
        >
          <DownloadIcon />
          Download CV
        </DownloadButton>
      </div>

      <dl className="mt-12 grid gap-x-8 gap-y-6 border-t pt-8 sm:grid-cols-2 lg:grid-cols-3">
        {specifications.map(({ label, value }) => (
          <div key={label}>
            <dt className="text-muted-foreground text-sm">{label}</dt>
            <dd className="mt-1 text-sm leading-snug">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

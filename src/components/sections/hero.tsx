import { ArrowDownRightIcon, DownloadIcon } from "lucide-react";

import { ButtonLink } from "@/components/button-link";
import { DownloadButton } from "@/components/download-button";
import { Medallion } from "@/components/security/medallion";
import { Microprint } from "@/components/security/microprint";
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
    <section
      aria-labelledby="hero-name"
      className="relative flex flex-col overflow-hidden lg:min-h-[calc(100svh-4.0625rem)]"
    >
      {/* Placed so the latent monogram stays on canvas and clear of the
          copy, the spec strip, and the name at every width. */}
      <Medallion className="absolute top-[75vw] -right-[9vw] w-[118vw] max-w-none sm:top-[30vw] sm:-right-[6vw] sm:w-[80vw] md:top-[22vw] md:-right-[4vw] md:w-[64vw] lg:-top-[14vw] lg:-right-[14vw] lg:w-[56vw] xl:-top-[20vw] xl:-right-[15vw] xl:w-[60vw]" />

      <Microprint className="bg-background relative border-t-0" />

      <div className="lattice relative grid flex-1 grid-cols-12 gap-x-6 pt-8 sm:pt-12 lg:grid-rows-[1fr_auto_auto] lg:pt-12">
        <h1
          id="hero-name"
          className="font-engraved col-span-12 row-start-2 mt-[13rem] text-[22vw] leading-[0.86] font-[780] tracking-[-0.035em] [--volm:100] sm:mt-[23rem] sm:text-[21vw] lg:row-start-3 lg:mt-4 lg:text-[min(13.4vw,12.25rem)] lg:leading-[0.98]"
        >
          <span className="block lg:inline">George</span>{" "}
          <span className="block lg:inline">Vlassis</span>
        </h1>

        <div className="col-span-12 row-start-1 sm:col-span-10 lg:col-span-7 xl:col-span-6">
          <p className="font-engraved text-[clamp(1.875rem,3.3vw,3rem)] leading-[1.06] font-[560] tracking-[-0.025em] text-balance [--volm:55]">
            I lead engineering and product in blockchain security, and I still
            write the code.
          </p>
          <p className="text-muted-foreground mt-6 max-w-[36rem] text-lg leading-relaxed text-pretty">
            Today I run technology and product at Cyberscope. Before that I
            built core features of its web platform and ran formal smart
            contract audits for DeFi and NFT projects.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
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
        </div>

        <dl className="bg-border col-span-12 row-start-3 mt-12 grid gap-px border sm:grid-cols-2 md:grid-cols-3 lg:row-start-2 lg:mt-8 lg:grid-cols-6">
          {specifications.map(({ label, value }) => (
            <div
              key={label}
              className="bg-card grid grid-cols-[6.5rem_1fr] gap-4 px-5 py-3 sm:block sm:py-4"
            >
              <dt className="data-label text-muted-foreground pt-0.5">
                {label}
              </dt>
              <dd className="text-[0.9375rem] leading-snug sm:mt-2">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <Microprint className="relative mt-8 lg:mt-5" />
    </section>
  );
}

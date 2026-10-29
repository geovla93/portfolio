import { ArrowDownRightIcon } from "lucide-react";
import Link from "next/link";

import { Seal } from "@/components/security/seal";
import {
  experiences,
  formatMonth,
  type Experience as ExperienceType,
} from "@/data/experiences";

function Role({
  title,
  company,
  start,
  end,
  summary,
  scope,
  technologies,
}: ExperienceType) {
  return (
    <li className="grid gap-8 border-b py-12 lg:grid-cols-12 lg:gap-x-6 lg:py-16">
      <div className="flex flex-col gap-6 lg:col-span-3">
        <p className="font-mono text-sm tracking-[0.02em]">
          <time dateTime={start}>{formatMonth(start)}</time>
          <span aria-hidden="true"> → </span>
          <span className="sr-only"> to </span>
          {end ? <time dateTime={end}>{formatMonth(end)}</time> : "Present"}
        </p>
        <Seal start={start} />
      </div>

      <div className="lg:col-span-9">
        <h3 className="font-engraved text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[1.05] font-[650] tracking-[-0.025em] text-balance">
          {title}
        </h3>
        <p className="text-muted-foreground mt-2 text-lg">{company}</p>
        <p className="mt-6 max-w-[60ch] text-lg leading-relaxed">{summary}</p>

        <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-6">
          {scope.map((group) => (
            <div key={group.label}>
              <h4 className="data-label text-muted-foreground border-b pb-3">
                {group.label}
              </h4>
              <ul className="mt-4 space-y-3">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="before:bg-iris relative pl-5 leading-relaxed before:absolute before:top-[0.7em] before:left-0 before:h-px before:w-2.5"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-10 font-mono text-xs leading-relaxed">
          <span className="text-muted-foreground">Stack: </span>
          {technologies.join(" / ")}
        </p>
      </div>
    </li>
  );
}

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="border-t py-24 sm:py-32 lg:py-40"
    >
      <div className="lattice">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-6">
          <h2
            id="experience-title"
            className="font-engraved text-[clamp(2.5rem,5.2vw,4.75rem)] leading-[1] font-[680] tracking-[-0.03em] text-balance lg:col-span-7"
          >
            From smart contract audits to CTO
          </h2>
          <p className="text-muted-foreground max-w-[44ch] text-lg leading-relaxed lg:col-span-4 lg:col-start-9 lg:self-end">
            Since {formatMonth(experiences[experiences.length - 1].start)}{" "}
            I&apos;ve been at Cyberscope, a blockchain security company. The
            scope has grown from writing and auditing code to owning the
            product.
          </p>
        </div>

        <ol className="mt-16 border-t lg:mt-20">
          {experiences.map((experience) => (
            <Role key={experience.start} {...experience} />
          ))}
        </ol>

        <p className="mt-12 text-lg">
          Hiring for a technical leadership role?{" "}
          <Link
            href="#contact"
            className="text-primary inline-flex items-center gap-1 font-medium underline"
          >
            Send me a message
            <ArrowDownRightIcon className="size-4" />
          </Link>
        </p>
      </div>
    </section>
  );
}

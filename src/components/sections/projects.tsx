import { ArrowDownRightIcon, ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ButtonLink } from "@/components/button-link";
import { GithubIcon } from "@/components/icons/github";
import { projects, type Project as ProjectType } from "@/data/projects";

const countWords = ["No", "One", "Two", "Three", "Four", "Five", "Six"];

function ProjectSheet({
  title,
  summary,
  image,
  imageAlt,
  address,
  specs,
  decisions,
  technologies,
  liveUrl,
  githubUrl,
  index,
}: ProjectType & { index: number }) {
  const titleId = `project-${index}-title`;

  return (
    <article aria-labelledby={titleId} className="border-t pt-8">
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
        <h3
          id={titleId}
          className="font-engraved text-[clamp(2.25rem,4.6vw,4rem)] leading-none font-[680] tracking-[-0.03em]"
        >
          {title}
        </h3>
        <p className="text-muted-foreground font-mono text-sm">{address}</p>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-x-6">
        <div className="border p-1.5 lg:col-span-7 lg:self-start">
          <div className="bg-muted relative aspect-[21/10] overflow-hidden border">
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(min-width: 1408px) 800px, (min-width: 1024px) 56vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-5">
          <p className="text-lg leading-relaxed text-pretty">{summary}</p>

          <dl className="mt-8 border-t">
            {specs.map(({ label, value }) => (
              <div
                key={label}
                className="grid grid-cols-[8.5rem_1fr] gap-4 border-b py-3"
              >
                <dt className="data-label text-muted-foreground pt-0.5">
                  {label}
                </dt>
                <dd className="leading-snug">{value}</dd>
              </div>
            ))}
          </dl>

          {decisions && (
            <div className="mt-8">
              <h4 className="data-label text-muted-foreground">
                Engineering decisions
              </h4>
              <ul className="mt-4 space-y-3">
                {decisions.map((decision) => (
                  <li
                    key={decision}
                    className="before:bg-iris relative pl-5 leading-relaxed before:absolute before:top-[0.7em] before:left-0 before:h-px before:w-2.5"
                  >
                    {decision}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="mt-8 font-mono text-xs leading-relaxed">
            <span className="text-muted-foreground">Stack: </span>
            {technologies.join(" / ")}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-describedby={titleId}
            >
              Live Demo
              <ArrowUpRightIcon />
            </ButtonLink>
            {githubUrl && (
              <ButtonLink
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                aria-describedby={titleId}
              >
                <GithubIcon aria-hidden="true" className="size-4" />
                View Code
              </ButtonLink>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="border-t py-24 sm:py-32 lg:py-40"
    >
      <div className="lattice">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-6">
          <h2
            id="projects-title"
            className="font-engraved text-[clamp(2.5rem,5.2vw,4.75rem)] leading-[1] font-[680] tracking-[-0.03em] text-balance lg:col-span-7"
          >
            Shipped work, and how it&apos;s built
          </h2>
          <p className="text-muted-foreground max-w-[44ch] text-lg leading-relaxed lg:col-span-4 lg:col-start-9 lg:self-end">
            {countWords[projects.length] ?? projects.length} live products. Each
            sheet lists what it does, how it&apos;s put together, and where to
            try it.
          </p>
        </div>

        <div className="mt-16 space-y-24 lg:mt-20 lg:space-y-32">
          {projects.map((project, index) => (
            <ProjectSheet key={project.title} index={index} {...project} />
          ))}
        </div>

        <p className="mt-20 border-t pt-8 text-lg">
          Need a product like these built?{" "}
          <Link
            href="#contact"
            className="text-primary inline-flex items-center gap-1 font-medium underline"
          >
            Tell me about it
            <ArrowDownRightIcon className="size-4" />
          </Link>
        </p>
      </div>
    </section>
  );
}

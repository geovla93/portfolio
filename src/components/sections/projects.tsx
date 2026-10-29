import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";

import { ButtonLink } from "@/components/button-link";
import { GithubIcon } from "@/components/icons/github";
import { projects, type Project as ProjectType } from "@/data/projects";

const countWords = ["No", "One", "Two", "Three", "Four", "Five", "Six"];

function ProjectItem({
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
    <article
      aria-labelledby={titleId}
      className="grid gap-6 md:grid-cols-12 md:gap-8"
    >
      <div className="bg-muted relative aspect-21/10 overflow-hidden rounded-lg border md:col-span-7 md:self-start">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 560px, (min-width: 768px) 58vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="md:col-span-5">
        <h3 id={titleId} className="text-xl font-semibold tracking-tight">
          {title}
        </h3>
        <p className="text-muted-foreground mt-1 font-mono text-xs">
          {address}
        </p>
        <p className="mt-3 leading-relaxed text-pretty">{summary}</p>

        <dl className="mt-6 divide-y border-y text-sm">
          {specs.map(({ label, value }) => (
            <div key={label} className="grid grid-cols-[7.5rem_1fr] gap-4 py-2">
              <dt className="text-muted-foreground">{label}</dt>
              <dd className="leading-snug">{value}</dd>
            </div>
          ))}
        </dl>

        {decisions && (
          <div className="mt-6">
            <h4 className="text-sm font-medium">Engineering decisions</h4>
            <ul className="text-muted-foreground mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed">
              {decisions.map((decision) => (
                <li key={decision}>{decision}</li>
              ))}
            </ul>
          </div>
        )}

        <p className="text-muted-foreground mt-6 font-mono text-xs">
          {technologies.join(" · ")}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
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
    </article>
  );
}

export function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="scroll-mt-16 border-t py-16 sm:py-24"
    >
      <h2
        id="projects-title"
        className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl"
      >
        Shipped work, and how it&apos;s built
      </h2>
      <p className="text-muted-foreground mt-3 max-w-2xl leading-relaxed">
        {countWords[projects.length] ?? projects.length} live products: what
        each one does, how it&apos;s built, and where to try it.
      </p>

      <div className="mt-10 space-y-16">
        {projects.map((project, index) => (
          <ProjectItem key={project.title} index={index} {...project} />
        ))}
      </div>
    </section>
  );
}

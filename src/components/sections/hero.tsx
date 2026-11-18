import { ArrowDownRightIcon, DownloadIcon, MapPinIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ButtonLink } from "@/components/button-link";
import { DownloadButton } from "@/components/download-button";
import { projects } from "@/data/projects";

export function Hero() {
  return (
    <section aria-labelledby="hero-name">
      <div className="grid items-center gap-10 py-12 sm:grid-cols-[minmax(0,1fr)_minmax(0,0.55fr)] sm:gap-8 sm:py-18 lg:py-20">
        <div>
          <h1
            id="hero-name"
            className="text-[clamp(4rem,7.5vw,6rem)] leading-[0.98] tracking-[-0.04em]"
          >
            George <em>Vlassis</em>
          </h1>
          <p className="text-primary mt-5 font-medium">
            CTO &amp; VP, Product at Cyberscope
          </p>
          <p className="mt-4 max-w-[35ch] text-xl leading-snug text-pretty sm:text-2xl">
            I lead engineering and product in blockchain security, and I still
            write the code.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <ButtonLink href="#contact" size="lg">
              Get in touch <ArrowDownRightIcon />
            </ButtonLink>
            <DownloadButton
              href="/george_vlassis_cv.pdf"
              variant="ghost"
              size="lg"
            >
              <DownloadIcon /> Download CV
            </DownloadButton>
          </div>
        </div>

        <figure className="portrait-print mx-auto w-[min(72%,17rem)] -rotate-3 self-center p-2.5 sm:w-[90%]">
          <Image
            src="/images/me.jpg"
            alt="George Vlassis in a grey coat and dark turtleneck"
            width={578}
            height={870}
            sizes="(min-width: 640px) 260px, 68vw"
            loading="eager"
            className="aspect-[1.12] w-full object-cover object-[50%_31%] sm:aspect-[0.88]"
          />
          <figcaption className="flex items-center gap-1.5 px-0.5 pt-2.5 pb-1 text-xs">
            <MapPinIcon aria-hidden="true" className="size-3.5" />
            Ioannina, Greece
          </figcaption>
        </figure>
      </div>

      <nav aria-label="Selected work" className="border-y py-5">
        <div className="grid items-center gap-x-5 md:grid-cols-[auto_repeat(3,minmax(0,1fr))]">
          <h2 className="text-muted-foreground mb-2 text-sm font-medium md:mr-4 md:mb-0">
            Selected work
          </h2>
          {projects
            .filter((project) => "live" in project)
            .map((project) => (
              <Link
                key={project.id}
                href={`#project-${project.id}`}
                className="group flex min-h-12 items-center gap-3 rounded-sm py-1.5 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 md:border-l md:pl-5"
              >
                <Image
                  src={project.image}
                  width={40}
                  height={40}
                  sizes="40px"
                  alt=""
                  className="size-10 shrink-0 rounded-sm border object-cover"
                />
                <span className="font-medium">{project.title}</span>
                <ArrowDownRightIcon
                  aria-hidden="true"
                  className="text-muted-foreground group-hover:text-primary ml-auto size-4 shrink-0"
                />
              </Link>
            ))}
        </div>
      </nav>
    </section>
  );
}

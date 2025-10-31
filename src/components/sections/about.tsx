import { DownloadIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { GithubIcon } from "@/components/icons/github";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DownloadButton } from "@/components/download-button";

export function About() {
  return (
    <section id="about" className="relative px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col items-center gap-4 md:items-start">
          <Badge variant="secondary">About Me</Badge>

          <div className="grid grid-cols-1 gap-6 text-center md:grid-cols-2 md:gap-8 md:text-left">
            <div className="flex flex-col gap-3">
              <h2 className="text-4xl font-bold tracking-tight">
                Passionate about creating impactful web experiences
              </h2>
              <p className="text-muted-foreground text-center md:text-justify">
                With over 5 years of experience in full-stack development, I
                specialize in building scalable web applications using modern
                technologies. My expertise includes React, Node.js, and cloud
                architecture. I&apos;m passionate about creating elegant
                solutions to complex problems and sharing knowledge with the
                developer community.
              </p>
              <div className="mt-6 flex justify-center gap-4 md:justify-start">
                <Button className="rounded-full" asChild>
                  <Link href="https://github.com/geovla93" target="_blank">
                    <GithubIcon className="size-5" />
                    View Github
                  </Link>
                </Button>
                <DownloadButton
                  href="/george_vlassis_cv.pdf"
                  variant="outline"
                  className="rounded-full"
                >
                  <DownloadIcon />
                  Download CV
                </DownloadButton>
              </div>
            </div>
            <div className="bg-accent relative h-full min-h-96 w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/me.jpg"
                alt="placeholder image"
                className="h-full w-full object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

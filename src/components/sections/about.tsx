import { DownloadIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { GithubIcon } from "@/components/icons/github";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DownloadButton from "../download-button";

export function About() {
  return (
    <section id="about" className="relative px-6 py-20">
      <div className="mx-auto max-w-screen-md">
        <div className="flex flex-col items-center gap-4 md:items-start">
          <Badge variant="secondary">About Me</Badge>

          <div className="grid grid-cols-1 gap-6 text-center md:grid-cols-2 md:text-left">
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
              <div className="mt-6 flex flex-wrap justify-start gap-4">
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
            <div className="h-auto w-full">
              <div className="bg-accent relative h-full w-full overflow-hidden rounded-2xl">
                <Image
                  src="/placeholder.svg"
                  alt="placeholder image"
                  className="object-cover"
                  fill
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

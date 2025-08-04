import { DownloadIcon } from "lucide-react";

import { GithubIcon } from "@/components/icons/github";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProfileImage } from "@/components/profile-image";

export function About() {
  return (
    <section id="about" className="relative px-6 py-20">
      <div className="mx-auto max-w-screen-md">
        <div className="flex flex-col gap-12 md:flex-row-reverse">
          <ProfileImage className="mt-10 hidden md:block" />

          {/* Content */}
          <div className="flex-1 md:text-left">
            <Badge variant="secondary" className="mb-4">
              About Me
            </Badge>
            <ProfileImage className="mt-3 mb-8 block md:hidden" />
            <h2 className="mb-4 text-4xl font-bold tracking-tight">
              Passionate about creating impactful web experiences
            </h2>
            <p className="text-muted-foreground mb-6 text-justify">
              With over 5 years of experience in full-stack development, I
              specialize in building scalable web applications using modern
              technologies. My expertise includes React, Node.js, and cloud
              architecture. I&apos;m passionate about creating elegant solutions
              to complex problems and sharing knowledge with the developer
              community.
            </p>
            <div className="flex flex-wrap justify-start gap-4">
              <Button className="rounded-full">
                <GithubIcon className="size-5" />
                View Github
              </Button>
              <Button variant="outline" className="rounded-full">
                <DownloadIcon />
                Download CV
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

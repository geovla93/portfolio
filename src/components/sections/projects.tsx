import { ExternalLinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { GithubIcon } from "@/components/icons/github";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { projects, type Project as ProjectType } from "@/data/projects";

function ProjectCard({
  title,
  description,
  image,
  technologies,
  liveUrl,
  githubUrl,
}: ProjectType) {
  return (
    <Card className="group border-accent hover:border-primary/50 relative overflow-hidden pt-0 transition-all">
      <div className="bg-accent relative h-64 overflow-hidden">
        <Image
          src={image}
          alt={title}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          fill
        />
      </div>
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <Badge key={tech} variant="secondary" className="rounded-full">
            {tech}
          </Badge>
        ))}
      </CardContent>
      <CardFooter className="mt-auto gap-3">
        {liveUrl && (
          <Button variant="default" className="rounded-full" asChild>
            <Link href={liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLinkIcon className="mr-1 size-4" />
              Live Demo
            </Link>
          </Button>
        )}
        {githubUrl && (
          <Button
            variant="outline"
            className="rounded-full shadow-none"
            asChild
          >
            <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
              <GithubIcon className="mr-1 size-4" />
              View Code
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative px-6 py-20">
      <div className="mx-auto max-w-screen-md">
        <div className="text-center">
          <Badge variant="secondary">Projects</Badge>
          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Featured Work
          </h2>
          <p className="text-muted-foreground mt-2 text-lg sm:mt-4">
            Showcasing some of my best projects and technical achievements
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}

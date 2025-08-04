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

type ProjectCardProps = {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
};

function ProjectCard({
  title,
  description,
  image,
  technologies,
  liveUrl,
  githubUrl,
}: ProjectCardProps) {
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
  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "A full-featured e-commerce platform with real-time inventory management, payment processing, and admin dashboard.",
      image: "/placeholder.svg",
      technologies: ["Next.js", "TypeScript", "Stripe", "Prisma", "PostgreSQL"],
      liveUrl: "https://ecommerce-demo.com",
      githubUrl: "https://github.com/username/ecommerce",
    },
    {
      title: "AI Task Manager",
      description:
        "Smart task management app that uses AI to categorize, prioritize, and suggest optimal task scheduling.",
      image: "/placeholder.svg",
      technologies: ["React", "Python", "TensorFlow", "FastAPI", "MongoDB"],
      liveUrl: "https://ai-taskmanager.com",
      githubUrl: "https://github.com/username/ai-taskmanager",
    },
    {
      title: "Real-time Chat Application",
      description:
        "Feature-rich chat application with real-time messaging, file sharing, and video calls.",
      image: "/placeholder.svg",
      technologies: ["React", "Socket.io", "WebRTC", "Node.js", "Redis"],
      liveUrl: "https://chatapp-demo.com",
      githubUrl: "https://github.com/username/chat-app",
    },
    {
      title: "AI Image Generator",
      description:
        "An AI image generator that uses a model to generate images based on a prompt.",
      image: "/placeholder.svg",
      technologies: ["React", "Next.js", "Tailwind CSS", "Shadcn UI"],
      liveUrl: "https://ai-image-generator.com",
      githubUrl: "https://github.com/username/ai-image-generator",
    },
  ];

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

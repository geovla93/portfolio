import { ExternalLinkIcon } from "lucide-react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/icons/github";

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
    <div className="group border-accent hover:border-primary/50 relative flex flex-col overflow-hidden rounded-xl border transition-all">
      {/* Project Image */}
      <div className="bg-accent relative h-64 overflow-hidden">
        <Image
          src={image}
          alt={title}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          fill
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>

        {/* Technologies */}
        <div className="mb-6 flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="rounded-full">
              {tech}
            </Badge>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-auto flex gap-3">
          {liveUrl && (
            <Button variant="default" className="rounded-full" asChild>
              <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLinkIcon className="mr-1 h-4 w-4" />
                Live Demo
              </a>
            </Button>
          )}
          {githubUrl && (
            <Button
              variant="outline"
              className="rounded-full shadow-none"
              asChild
            >
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <GithubIcon className="mr-1 h-4 w-4" />
                View Code
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
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
        <div className="mb-12 text-center">
          <Badge variant="secondary" className="mb-4">
            Projects
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Featured Work
          </h2>
          <p className="text-muted-foreground mt-2 text-lg sm:mt-4">
            Showcasing some of my best projects and technical achievements
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}

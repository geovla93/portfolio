import { Building2Icon, CalendarIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";

type ExperienceItemProps = {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
};

const ExperienceItem = ({
  title,
  company,
  period,
  description,
  technologies,
}: ExperienceItemProps) => {
  return (
    <div className="relative pl-8 not-last:pb-12">
      {/* Timeline line */}
      <div className="bg-muted absolute top-2.5 left-0 h-full w-0.5 group-first:top-6 group-first:h-[calc(100%-24px)]">
        <div className="border-primary bg-background absolute top-0 -left-[5px] size-3 rounded-full border-2" />
      </div>

      {/* Content */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="bg-accent flex size-9 flex-shrink-0 items-center justify-center rounded-full">
            <Building2Icon className="text-muted-foreground size-5" />
          </div>
          <span className="text-lg font-semibold">{company}</span>
        </div>
        <div>
          <h3 className="text-xl font-medium">{title}</h3>
          <div className="mt-1 flex items-center gap-2 text-sm">
            <CalendarIcon className="size-4" />
            <span>{period}</span>
          </div>
        </div>
        <p className="text-muted-foreground">{description}</p>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="rounded-full">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Experience = () => {
  const experiences = [
    {
      title: "Senior Full Stack Developer",
      company: "TechCorp Solutions",
      period: "2021 - Present",
      description:
        "Led the development of enterprise-scale web applications, mentored junior developers, and implemented best practices for code quality and performance optimization.",
      technologies: ["React", "Node.js", "TypeScript", "AWS", "MongoDB"],
    },
    {
      title: "Full Stack Developer",
      company: "Digital Innovations Inc",
      period: "2019 - 2021",
      description:
        "Developed and maintained multiple client projects, implemented responsive designs, and integrated third-party APIs for enhanced functionality.",
      technologies: ["React", "Express.js", "PostgreSQL", "Docker", "Redis"],
    },
    {
      title: "Frontend Developer",
      company: "WebTech Studios",
      period: "2018 - 2019",
      description:
        "Created responsive and interactive user interfaces, collaborated with designers, and optimized application performance.",
      technologies: ["React", "JavaScript", "SASS", "Webpack", "Jest"],
    },
  ];

  return (
    <section id="experience" className="relative px-6 py-20">
      <div className="mx-auto max-w-screen-md">
        <div className="text-center">
          <Badge variant="secondary">Experience</Badge>
          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Professional Journey
          </h2>
          <p className="text-muted-foreground mt-2 text-lg sm:mt-4">
            A timeline of my professional growth and key achievements
          </p>
        </div>

        <div className="relative mt-12">
          {experiences.map((experience, index) => (
            <ExperienceItem key={index} {...experience} />
          ))}
        </div>
      </div>
    </section>
  );
};

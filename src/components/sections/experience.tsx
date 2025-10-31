import { Building2Icon, CalendarIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  experiences,
  type Experience as ExperienceType,
} from "@/data/experiences";

const ExperienceItem = ({
  title,
  company,
  period,
  description,
  technologies,
}: ExperienceType) => {
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
  return (
    <section id="experience" className="relative px-6 py-20">
      <div className="mx-auto max-w-3xl">
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

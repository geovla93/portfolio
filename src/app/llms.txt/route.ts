import { experiences, formatMonth } from "@/data/experiences";
import { navLinks } from "@/data/nav-links";
import { projects, type Project } from "@/data/projects";
import { site } from "@/data/site";
import { socialLinks } from "@/data/social-links";

export const dynamic = "force-static";

export function GET() {
  const markdown = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    "This single-page portfolio covers professional experience, shipped software projects, and contact information.",
    "",
    "## Portfolio",
    "",
    `- [Home](${site.url}): Professional overview.`,
    ...navLinks.map((link) => `- [${link.label}](${site.url}/#${link.hash})`),
    `- [CV](${site.url}/george_vlassis_cv.pdf): Downloadable curriculum vitae.`,
    "",
    "## Experience",
    "",
    ...experiences.map(
      (role) =>
        `- ${role.title}, ${role.company} (${formatMonth(role.start)} – ${"end" in role ? formatMonth(role.end) : "Present"}): ${role.summary}`,
    ),
    "",
    "## Projects",
    "",
    ...projects.flatMap((project: Project) => [
      `- [${project.title}](${site.url}/#project-${project.id}): ${project.summary}`,
      ...(project.live
        ? [`  - [${project.live.label}](${project.live.url})`]
        : []),
      ...(project.githubUrl ? [`  - [Source code](${project.githubUrl})`] : []),
    ]),
    "",
    "## Public profiles",
    "",
    ...socialLinks.map((link) => `- [${link.label}](${link.href})`),
    "",
  ].join("\n");

  return new Response(markdown, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

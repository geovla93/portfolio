import { experiences } from "@/data/experiences";
import { projects, type Project } from "@/data/projects";
import { site } from "@/data/site";
import { socialLinks } from "@/data/social-links";

const personId = `${site.url}/#person`;
const websiteId = `${site.url}/#website`;
const pageId = `${site.url}/#webpage`;
const currentRole = experiences[0];

const projectEntities = projects.map((project: Project) => ({
  "@type": project.githubUrl ? "SoftwareSourceCode" : "CreativeWork",
  "@id": `${site.url}/#project-${project.id}`,
  name: project.title,
  description: project.summary,
  url: project.live?.url ?? site.url,
  image: new URL(project.image, site.url).href,
  keywords: project.technologies,
  contributor: { "@id": personId },
  ...(project.githubUrl ? { codeRepository: project.githubUrl } : {}),
}));

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: site.name,
      url: site.url,
      image: `${site.url}/images/me.jpg`,
      description: site.description,
      jobTitle: currentRole.title,
      worksFor: { "@type": "Organization", name: currentRole.company },
      sameAs: socialLinks.map((link) => link.href),
      knowsAbout: [
        "Blockchain security",
        "Smart contract auditing",
        "Engineering leadership",
        "Product leadership",
        ...new Set(experiences.flatMap((role) => [...role.technologies])),
      ],
      subjectOf: { "@id": pageId },
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: site.url,
      name: site.name,
      inLanguage: site.language,
      publisher: { "@id": personId },
    },
    {
      "@type": "WebPage",
      "@id": pageId,
      url: site.url,
      name: site.title,
      description: site.description,
      inLanguage: site.language,
      isPartOf: { "@id": websiteId },
      mainEntity: { "@id": personId },
      mentions: projectEntities.map((project) => ({ "@id": project["@id"] })),
    },
    ...projectEntities,
  ],
};

export function PortfolioJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        // Escaping '<' prevents content from closing the script element.
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}

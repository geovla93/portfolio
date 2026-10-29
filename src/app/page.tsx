import type { Metadata } from "next";

import { PortfolioJsonLd } from "@/components/portfolio-json-ld";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { site } from "@/data/site";
import { socialLinks } from "@/data/social-links";

export const metadata: Metadata = {
  alternates: { canonical: site.url },
  openGraph: {
    type: "website",
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: site.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    creator: socialLinks.find((link) => link.label === "X")?.handle,
    // Next.js uses the file-based Open Graph image for the Twitter card too.
  },
};

export default function HomePage() {
  return (
    <main
      id="main"
      tabIndex={-1}
      className="mx-auto w-full max-w-5xl px-4 outline-none sm:px-6 lg:px-8"
    >
      <PortfolioJsonLd />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />
    </main>
  );
}

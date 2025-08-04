import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 2xl:px-10">
      <Hero />
      <About />
      <Experience />
      <Projects />
    </main>
  );
}

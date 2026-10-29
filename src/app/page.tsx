import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";

export default function HomePage() {
  return (
    <main
      id="main"
      tabIndex={-1}
      className="mx-auto w-full max-w-5xl px-4 outline-none sm:px-6 lg:px-8"
    >
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />
    </main>
  );
}

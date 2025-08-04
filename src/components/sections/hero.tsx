import { CircleArrowDownIcon, ZapIcon } from "lucide-react";

import AnimatedGridPattern from "@/components/animated-grid-pattern";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-6">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        className="inset-x-0 h-full skew-y-12 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />
      <div className="relative z-[1] max-w-screen-md text-center">
        <Badge className="rounded-full border-none">
          <ZapIcon className="fill-current" />
          Fullstack Web Developer
        </Badge>
        <h1 className="mt-6 text-4xl !leading-[1.2] font-bold tracking-tight sm:text-5xl md:text-6xl">
          Building Scalable & Engaging Web Experiences
        </h1>
        <p className="mt-6 text-[17px] md:text-lg">
          Hey there! I&apos;m a John Doe, a Full Stack Developer who loves
          building cool and scalable web experiences. From crafting beautiful
          frontends to powering robust backends, I bring ideas to life with
          clean code and great design. Let&apos;s create something amazing
          together! 🚀
        </p>
        <div className="mt-12 flex items-center justify-center gap-4">
          <Button size="lg" className="rounded-full text-base">
            See What I Do <CircleArrowDownIcon className="ml-2 !h-5.5 !w-5.5" />
          </Button>
        </div>
      </div>
    </section>
  );
}

import { CircleArrowDownIcon, ZapIcon } from "lucide-react";
import Link from "next/link";

import AnimatedGridPattern from "@/components/animated-grid-pattern";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative flex min-h-svh items-center justify-center overflow-hidden px-6 pt-6">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        className="inset-x-0 h-full skew-y-12 mask-[radial-gradient(500px_circle_at_center,white,transparent)]"
      />
      <div className="relative z-1 max-w-3xl text-center">
        <Badge className="rounded-full border-none">
          <ZapIcon className="fill-current" />
          Software Engineer
        </Badge>
        <h1 className="mt-6 text-4xl leading-tight font-bold tracking-tight sm:text-5xl md:text-6xl">
          Building Scalable & Engaging Web Experiences
        </h1>
        <p className="mt-6 text-lg md:text-lg">
          Hey there! I&apos;m a George Vlassis, a Sowftware Engineer who loves
          building cool and scalable web experiences. From crafting beautiful
          frontends to powering robust backends, I bring ideas to life with
          clean code and great design. Let&apos;s create something amazing
          together! 🚀
        </p>
        <div className="mt-12 flex items-center justify-center gap-4">
          <Button size="lg" className="rounded-full text-base" asChild>
            <Link href="#about">
              See What I Do <CircleArrowDownIcon className="size-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

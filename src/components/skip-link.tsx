"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SkipLink() {
  return (
    // A native anchor, unlike next/link, moves the browser's sequential focus
    // starting point to <main>.
    <a
      href="#main"
      className={cn(
        buttonVariants({ variant: "outline" }),
        "fixed top-2 left-4 z-60 -translate-y-16 focus-visible:translate-y-0 motion-reduce:transition-none",
      )}
    >
      Skip to content
    </a>
  );
}

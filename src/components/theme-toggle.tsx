"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { flushSync } from "react-dom";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ThemeChoice = "light" | "dark" | "system";

function resolve(choice: ThemeChoice) {
  if (choice !== "system") return choice;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeToggle() {
  const { setTheme } = useTheme();

  // Switching theme runs the other plate through the press as one wipe,
  // where the browser supports view transitions and motion is welcome.
  const choose = (choice: ThemeChoice) => {
    const root = document.documentElement;
    const next = resolve(choice);
    const unchanged = root.classList.contains(next);
    if (
      unchanged ||
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setTheme(choice);
      return;
    }

    const transition = document.startViewTransition(() => {
      flushSync(() => setTheme(choice));
      root.classList.remove("light", "dark");
      root.classList.add(next);
      root.style.colorScheme = next;
    });
    // A transition skipped by a newer one rejects; that is expected.
    transition.ready.catch(() => {});
    transition.finished.catch(() => {});
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" size="icon" />}>
        <SunIcon className="size-[1.125rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        <MoonIcon className="absolute size-[1.125rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        <span className="sr-only">Toggle theme</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => choose("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => choose("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => choose("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

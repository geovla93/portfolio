import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";
import { navLinks } from "@/data/nav-links";
import { DesktopNavigation } from "./desktop-navigation";
import { MobileNavigation } from "./mobile-navigation";

export function Header() {
  return (
    <header className="bg-background sticky top-0 z-50 border-b">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-semibold tracking-tight">
          George Vlassis
        </Link>
        <div className="flex items-center gap-2">
          <DesktopNavigation navLinks={navLinks} />
          <MobileNavigation navLinks={navLinks} />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

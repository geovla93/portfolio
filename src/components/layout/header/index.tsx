import Link from "next/link";

import { Mark } from "@/components/security/mark";
import { ThemeToggle } from "@/components/theme-toggle";
import { navLinks } from "@/data/nav-links";
import { DesktopNavigation } from "./desktop-navigation";
import { MobileNavigation } from "./mobile-navigation";

export function Header() {
  return (
    <header className="bg-background sticky top-0 z-50 border-b">
      <div className="lattice flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="font-engraved flex items-center gap-2.5 text-lg font-semibold tracking-[-0.01em]"
        >
          <Mark className="text-iris" />
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

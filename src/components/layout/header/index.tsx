import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";
import { navLinks } from "@/data/nav-links";
import { DesktopNavigation } from "./desktop-navigation";
import { MobileNavigation } from "./mobile-navigation";

export function Header() {
  return (
    <header className="absolute top-0 z-50 w-full transition-all duration-300">
      <div className="container mx-auto flex max-w-7xl items-center justify-between gap-6 p-4 sm:px-6 lg:px-8 2xl:px-10">
        <Link href="/" className="text-2xl font-bold">
          My Portfolio
        </Link>
        <div className="flex items-center space-x-3">
          <DesktopNavigation navLinks={navLinks} />
          <MobileNavigation navLinks={navLinks} />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import type { NavLink } from "@/data/nav-links";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

type DesktopNavigationProps = Readonly<
  React.ComponentProps<typeof NavigationMenu> & {
    navLinks: NavLink[];
  }
>;

export function DesktopNavigation({
  navLinks,
  className,
  ...props
}: DesktopNavigationProps) {
  const activeHash = useActiveSection(navLinks.map((link) => link.hash));

  return (
    <NavigationMenu
      className={cn("hidden items-center space-x-8 md:flex", className)}
      {...props}
    >
      <NavigationMenuList>
        {navLinks.map((link) => (
          <NavigationMenuItem key={link.hash}>
            {/* `active` styles the link; "location" replaces its default
                aria-current="page", since these are sections of one page. */}
            <NavigationMenuLink
              active={link.hash === activeHash}
              aria-current={link.hash === activeHash ? "location" : undefined}
              render={<Link href={{ hash: link.hash }} />}
            >
              {link.label}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

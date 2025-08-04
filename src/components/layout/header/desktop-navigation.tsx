import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import type { NavLink } from "@/data/nav-links";
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
  return (
    <NavigationMenu
      className={cn("hidden items-center space-x-8 md:flex", className)}
      {...props}
    >
      <NavigationMenuList>
        {navLinks.map((link) => (
          <NavigationMenuItem key={link.hash}>
            <NavigationMenuLink asChild>
              <Link href={{ hash: link.hash }}>{link.label}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

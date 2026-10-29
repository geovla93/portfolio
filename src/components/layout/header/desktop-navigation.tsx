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
      className={cn("mr-2 hidden items-center md:flex", className)}
      {...props}
    >
      <NavigationMenuList className="gap-0">
        {navLinks.map((link) => (
          <NavigationMenuItem key={link.hash}>
            <NavigationMenuLink
              render={<Link href={{ hash: link.hash }} />}
              className="hover:text-primary focus:text-primary px-3 py-2 text-[0.9375rem] font-medium hover:bg-transparent focus:bg-transparent"
            >
              {link.label}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

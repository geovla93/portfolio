"use client";

import { MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLinkItem,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { NavLink } from "@/data/nav-links";

type MobileNavigationProps = Readonly<
  React.ComponentProps<typeof DropdownMenu> & {
    navLinks: NavLink[];
  }
>;

export function MobileNavigation({
  navLinks,
  ...props
}: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen} {...props}>
      <DropdownMenuTrigger
        className="order-last md:hidden"
        aria-label="Toggle navigation"
        render={<Button variant="ghost" size="icon" />}
      >
        {isOpen ? (
          <XIcon className="size-6" />
        ) : (
          <MenuIcon className="size-6" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {navLinks.map((link) => (
            <DropdownMenuLinkItem
              key={link.hash}
              render={<Link href={{ hash: link.hash }} />}
            >
              {link.label}
            </DropdownMenuLinkItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

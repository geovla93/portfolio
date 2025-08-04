"use client";

import { MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
      <DropdownMenuTrigger className="order-last md:hidden" asChild>
        <Button variant="ghost" size="icon">
          {isOpen ? (
            <XIcon className="size-6" />
          ) : (
            <MenuIcon className="size-6" />
          )}
          <span className="sr-only" aria-hidden="true">
            Toggle navigation
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {navLinks.map((link) => (
          <DropdownMenuItem key={link.hash} asChild>
            <Link href={{ hash: link.hash }}>{link.label}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

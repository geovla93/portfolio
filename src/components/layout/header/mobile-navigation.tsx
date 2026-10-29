"use client";

import { MenuIcon, XIcon } from "lucide-react";
import { useState } from "react";

import { ButtonLink } from "@/components/button-link";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { NavLink } from "@/data/nav-links";
import { useActiveSection } from "@/hooks/use-active-section";

type MobileNavigationProps = Readonly<
  React.ComponentProps<typeof Popover> & {
    navLinks: NavLink[];
  }
>;

export function MobileNavigation({
  navLinks,
  ...props
}: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const activeHash = useActiveSection(navLinks.map((link) => link.hash));

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen} {...props}>
      <PopoverTrigger
        className="order-last md:hidden"
        aria-label="Toggle navigation"
        render={<Button variant="ghost" size="icon" className="size-11" />}
      >
        {isOpen ? (
          <XIcon className="size-6" />
        ) : (
          <MenuIcon className="size-6" />
        )}
      </PopoverTrigger>
      <PopoverContent align="end" aria-label="Menu" className="w-56 p-1">
        <nav aria-label="Main">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.hash}>
                <ButtonLink
                  href={{ hash: link.hash }}
                  variant={link.hash === activeHash ? "secondary" : "ghost"}
                  aria-current={
                    link.hash === activeHash ? "location" : undefined
                  }
                  className="h-11 w-full justify-start"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </ButtonLink>
              </li>
            ))}
          </ul>
        </nav>
      </PopoverContent>
    </Popover>
  );
}

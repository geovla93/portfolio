"use client";

import type { VariantProps } from "class-variance-authority";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DownloadButtonProps = Omit<
  React.ComponentProps<typeof Link>,
  "href" | "download"
> &
  VariantProps<typeof buttonVariants> & {
    href: string;
    filename?: string;
  };

export function DownloadButton({
  children,
  filename,
  href,
  variant,
  size,
  className,
  ...props
}: DownloadButtonProps) {
  return (
    <Link
      href={href}
      download={filename ?? true}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </Link>
  );
}

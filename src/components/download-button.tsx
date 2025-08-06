"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

type DownloadButtonProps = Omit<
  React.ComponentProps<typeof Button>,
  "asChild"
> & {
  href: string;
  filename?: string;
};

export function DownloadButton({
  children,
  filename,
  href,
  ...props
}: DownloadButtonProps) {
  return (
    <Button asChild {...props}>
      <Link href={href} download={filename ?? true}>
        {children}
      </Link>
    </Button>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "This page does not exist. Return to George Vlassis's portfolio.",
};

export default function NotFound() {
  return (
    <main
      id="main"
      tabIndex={-1}
      className="mx-auto w-full max-w-5xl px-4 py-16 outline-none sm:px-6 sm:py-24 lg:px-8"
    >
      <h1 className="text-4xl font-semibold tracking-tight">Page not found</h1>
      <p className="text-muted-foreground mt-4">This page does not exist.</p>
      <Link href="/" className="mt-8 inline-block underline underline-offset-4">
        Return to George Vlassis&apos;s portfolio
      </Link>
    </main>
  );
}

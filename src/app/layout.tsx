import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { SkipLink } from "@/components/skip-link";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toast";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  authors: { name: site.name, url: site.url },
  creator: site.name,
  // Leave production indexing at its default, so error pages can supply their
  // own noindex directive without inheriting an explicit index directive.
  robots:
    process.env.VERCEL_ENV === "preview"
      ? { index: false, follow: true }
      : undefined,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // next-themes sets the theme class and color-scheme on <html> before
    // hydration; scroll-pt-16 keeps anchors and focus clear of the header.
    <html
      lang={site.language}
      className="scroll-pt-16 motion-safe:scroll-smooth"
      suppressHydrationWarning
    >
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          "font-sans antialiased",
        )}
      >
        <div className="isolate">
          <ThemeProvider>
            <SkipLink />
            <Header />
            {children}
            <Footer />
            <Toaster />
          </ThemeProvider>
        </div>
        <Analytics />
      </body>
    </html>
  );
}

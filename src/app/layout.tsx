import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  title: {
    default: "Portfolio — George Vlassis",
    template: "%s | George Vlassis",
  },
  description:
    "Clean, fast, and accessible portfolio showcasing projects, case studies, and thoughts on modern web development.",
  keywords: [
    "portfolio",
    "software engineer",
    "web developer",
    "frontend",
    "react",
    "next.js",
    "typescript",
    "ui",
    "open source",
  ],
  applicationName: "Portfolio",
  authors: [{ name: "George Vlassis" }],
  creator: "George Vlassis",
  publisher: "George Vlassis",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          "font-sans antialiased",
        )}
      >
        <ThemeProvider>
          <Header />
          {children}
          <Footer className="mt-20" />
        </ThemeProvider>
        <Toaster richColors />
        <Analytics />
      </body>
    </html>
  );
}

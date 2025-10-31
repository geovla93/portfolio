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
    default: "George Vlassis — Software Engineer",
    template: "%s | George Vlassis",
  },
  description:
    "Portfolio of George Vlassis, VP of Product at Cyberscope. Experienced software engineer specializing in blockchain security, smart contract auditing, and modern web development with Next.js, TypeScript, and Node.js.",
  keywords: [
    "George Vlassis",
    "Software Engineer",
    "Blockchain Security",
    "Smart Contract Auditor",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Cyberscope",
    "VP of Product",
    "Web3",
    "SaaS",
    "Auditing",
    "React",
    "Drizzle ORM",
  ],
  applicationName: "Portfolio",
  authors: [{ name: "George Vlassis" }],
  creator: "George Vlassis",
  publisher: "George Vlassis",
  alternates: {
    canonical: "/",
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

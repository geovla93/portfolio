import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { SkipLink } from "@/components/skip-link";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description =
  "George Vlassis is Chief Technology Officer & VP, Product at Cyberscope: a hands-on engineering and product leader in blockchain security who builds Next.js and Node.js platforms, Solidity products, and formal smart contract audits.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  title: {
    default:
      "George Vlassis — Engineering & Product Leader, Blockchain Security",
    template: "%s | George Vlassis",
  },
  description,
  keywords: [
    "George Vlassis",
    "CTO",
    "Chief Technology Officer",
    "VP of Product",
    "Cyberscope",
    "Blockchain Security",
    "Smart Contract Auditor",
    "Software Engineer",
    "Solidity",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Web3",
    "DeFi",
  ],
  applicationName: "geovla.dev",
  authors: { name: "George Vlassis", url: "https://geovla.dev" },
  creator: "George Vlassis",
  publisher: "George Vlassis",
  alternates: {
    canonical: "/",
  },
  category: "technology",
  openGraph: {
    type: "website",
    title: "George Vlassis — Engineering & Product Leader, Blockchain Security",
    description,
    url: "/",
    siteName: "George Vlassis",
    images: {
      url: "/og-image.png",
      width: 1200,
      height: 630,
      alt: "George Vlassis Portfolio",
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "George Vlassis — Engineering & Product Leader, Blockchain Security",
    description:
      "CTO & VP, Product at Cyberscope. Hands-on engineering leader in blockchain security.",
    creator: "@GeorgeVlassis",
    site: "@GeorgeVlassis",
    images: {
      url: "/og-image.png",
      width: 1200,
      height: 630,
      alt: "George Vlassis Portfolio",
    },
  },
  robots: {
    index: true,
    follow: true,
  },
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
      lang="en"
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

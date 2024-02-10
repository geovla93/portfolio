import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

import siteConfig from '@/config/site';
import { cn } from '@/lib/utils';

export const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" className="h-full">
      <body
        className={cn(
          inter.variable,
          'bg-background text-foreground h-full font-sans antialiased',
        )}
      >
        {children}
      </body>
    </html>
  );
};

export default RootLayout;

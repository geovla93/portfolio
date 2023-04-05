import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';

import './globals.css';

export const metadata: Metadata = {
  title: 'George Vlassis | Full Stack Web Developer and Smart Contract Auditor',
  description:
    'I am a Software Engineer based in Ioannina, Greece, specializing in full-stack web development and smart contract auditing. View my portfolio to learn more.',
  keywords:
    'George Vlassis, software engineer, full-stack web developer, smart contract auditor, Ioannina, Greece, portfolio',
  authors: { name: 'George Vlassis' },
  viewport: 'width=device-width, initial-scale=1.0',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

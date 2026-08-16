import type { Metadata } from 'next';
import { SpaceVoid } from '@/components/SpaceVoid';
import { SvgFilters } from '@/components/SvgFilters';
import './globals.css';

export const metadata: Metadata = {
  title: 'azterisk.net // Portfolio Portal & Subdomain Launcher',
  description:
    'Deep-space interactive portfolio constellation and launcher for all hosted azterisk.net subdomains.',
  keywords: [
    'azterisk',
    'portfolio',
    'unknown frequencies',
    'careerreport',
    'salesflow',
    'patentflow',
    'spacetimedb',
    'makerspace',
    'developer',
  ],
  authors: [{ name: 'Azteriisk', url: 'https://github.com/Azteriisk' }],
  openGraph: {
    title: 'azterisk.net // Portfolio Portal & Subdomain Launcher',
    description:
      'Interactive constellation hub displaying active subdomains and tech architectures across azterisk.net.',
    url: 'https://azterisk.net',
    siteName: 'azterisk.net',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#030307] text-white min-h-screen relative overflow-x-hidden selection:bg-white selection:text-black">
        {/* SVG Hand-Drawn Wobbly Filters Definition */}
        <SvgFilters />

        {/* Dynamic Deep Space Void Background Particle System */}
        <SpaceVoid />

        {/* Main Application Container */}
        {children}
      </body>
    </html>
  );
}

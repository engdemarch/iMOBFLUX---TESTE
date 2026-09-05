import type { Metadata } from 'next';
import './globals.css';
import { MetaPixel } from '@/components/MetaPixel';

export const metadata: Metadata = {
  title: 'ImobFlux',
  description: 'Catálogo de imóveis: casas, apartamentos, terrenos e salas comerciais.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <MetaPixel />
      </head>
      <body suppressHydrationWarning className="bg-[#F2F4F6] text-[#15263A] min-h-screen">
        {children}
      </body>
    </html>
  );
}

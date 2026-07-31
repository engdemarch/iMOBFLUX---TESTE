'use client';

import React, { useState, useEffect } from 'react';
import { SiteConfig } from '@/lib/types';

interface HeroProps {
  config: SiteConfig;
}

const DEFAULT_BANNER = 'https://picsum.photos/seed/hero-house/1800/1200';

export const Hero: React.FC<HeroProps> = ({ config }) => {
  const banners = (config.banners && config.banners.length > 0)
    ? config.banners
    : [DEFAULT_BANNER];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <section id="topo" className="relative h-[85vh] min-h-[540px] max-h-[800px] overflow-hidden bg-[#122234]">
      {/* Background Banner Slides */}
      {banners.map((src, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={src}
            alt="Fachada de imóvel"
            className="w-full h-full object-cover filter saturate-[0.92] brightness-[0.72]"
          />
        </div>
      ))}

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end pb-20 sm:pb-24 bg-gradient-to-b from-black/20 via-black/40 to-black/75">
        <div className="max-w-[1180px] w-full mx-auto px-5 sm:px-8">
          <div className="text-[#E7DCC0] text-xs sm:text-sm tracking-[0.14em] uppercase font-semibold mb-4 sm:mb-5">
            Criciúma e região · SC
          </div>
          <h1 className="text-[#FBF9F3] text-4xl sm:text-6xl lg:text-[72px] font-bold leading-[1.04] max-w-[840px] tracking-tight">
            O imóvel certo<br />começa por uma<br />boa pergunta.
          </h1>
          <p className="text-[#E4E1D6] max-w-[500px] mt-5 text-base sm:text-lg leading-relaxed font-normal">
            Selecionamos casas, apartamentos e terrenos com atenção aos detalhes que realmente importam para quem vai morar ali.
          </p>
        </div>
      </div>
    </section>
  );
};

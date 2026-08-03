'use client';

import React, { useState, useEffect } from 'react';
import { SiteConfig } from '@/lib/types';
import { MapPin } from 'lucide-react';

interface HeroModernoProps {
  config: SiteConfig;
}

const DEFAULT_BANNER = 'https://picsum.photos/seed/hero-house/1800/1200';

export const HeroModerno: React.FC<HeroModernoProps> = ({ config }) => {
  const banners = (config.banners && config.banners.length > 0) ? config.banners : [DEFAULT_BANNER];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => setCurrentIndex((prev) => (prev + 1) % banners.length), 6000);
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <section id="topo" className="bg-[#F4F6F8] pt-14 pb-20 sm:pt-20 sm:pb-28 overflow-hidden">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 mb-6 bg-white border border-[#E8ECEF] rounded-full text-[11px] font-semibold text-[var(--t-primary)]">
            <MapPin className="w-3.5 h-3.5" />
            Criciúma e região · SC
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold leading-[1.08] text-[#15263A] tracking-tight">
            Encontre o imóvel que combina com sua próxima fase.
          </h1>
          <p className="text-[#4A5568] max-w-md mt-5 text-base sm:text-lg leading-relaxed">
            Casas, apartamentos e terrenos selecionados com atenção aos detalhes que realmente importam.
          </p>
          <div className="flex items-center gap-3 mt-8">
            <a
              href="#imoveis"
              className="inline-flex items-center justify-center px-6 py-3.5 bg-[var(--t-primary)] hover:bg-[var(--t-primary-dark)] text-white text-sm font-semibold rounded-full transition-colors shadow-sm"
            >
              Ver imóveis disponíveis
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/3] rounded-[28px] overflow-hidden shadow-xl">
            {banners.map((src, index) => (
              <img
                key={index}
                src={src}
                alt="Fachada de imóvel"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
          </div>
          <div className="hidden sm:block absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-lg border border-[#E8ECEF] px-5 py-4">
            <div className="text-2xl font-extrabold text-[#15263A]">{config.imoveisNegociados || '+350 imóveis'}</div>
            <div className="text-xs text-[#68707C] font-medium">negociados na região</div>
          </div>
        </div>
      </div>
    </section>
  );
};

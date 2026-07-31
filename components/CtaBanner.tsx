'use client';

import React from 'react';
import { SiteConfig } from '@/lib/types';
import { MessageCircle } from 'lucide-react';

interface CtaBannerProps {
  config: SiteConfig;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ config }) => {
  const waMessage = encodeURIComponent('Olá! Gostaria de anunciar meu imóvel com vocês.');
  const waUrl = `https://wa.me/${config.whats || '5548999990000'}?text=${waMessage}`;

  return (
    <section className="bg-[#122234] text-[#F4F1EA] py-16 sm:py-20" id="anuncie">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#F8F6EF] max-w-xl leading-tight">
            Quer vender ou alugar o seu imóvel?
          </h2>
          <p className="text-[#C8C4B6] mt-3 max-w-lg text-sm sm:text-base leading-relaxed">
            Cadastramos, fotografamos e divulgamos o seu imóvel para a nossa base de clientes interessados na região.
          </p>
        </div>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-6 py-3.5 border border-[#F4F1EA] text-[#F4F1EA] hover:bg-[#F4F1EA] hover:text-[#122234] text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-[2px] transition-colors whitespace-nowrap"
        >
          <MessageCircle className="w-5 h-5" />
          <span>Quero anunciar meu imóvel</span>
        </a>
      </div>
    </section>
  );
};

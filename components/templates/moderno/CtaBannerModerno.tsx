'use client';

import React from 'react';
import { SiteConfig } from '@/lib/types';
import { MessageCircle } from 'lucide-react';

interface CtaBannerModernoProps {
  config: SiteConfig;
}

export const CtaBannerModerno: React.FC<CtaBannerModernoProps> = ({ config }) => {
  const waMessage = encodeURIComponent('Olá! Gostaria de anunciar meu imóvel com vocês.');
  const waUrl = `https://wa.me/${config.whats || '5548999990000'}?text=${waMessage}`;

  return (
    <section className="py-14 sm:py-20" id="anuncie">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
        <div className="bg-[var(--t-primary)] rounded-[28px] px-8 py-12 sm:px-14 sm:py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white max-w-xl leading-tight">
              Quer vender ou alugar o seu imóvel?
            </h2>
            <p className="text-white/80 mt-3 max-w-lg text-sm sm:text-base leading-relaxed">
              Cadastramos, fotografamos e divulgamos o seu imóvel para nossa base de clientes interessados na região.
            </p>
          </div>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-white text-[var(--t-primary)] hover:bg-[#F4F6F8] text-sm font-semibold rounded-full transition-colors whitespace-nowrap shrink-0"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Quero anunciar meu imóvel</span>
          </a>
        </div>
      </div>
    </section>
  );
};

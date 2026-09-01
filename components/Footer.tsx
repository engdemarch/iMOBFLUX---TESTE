'use client';

import React from 'react';
import { SiteConfig } from '@/lib/types';
import { Lock } from 'lucide-react';

interface FooterProps {
  config: SiteConfig;
  onOpenBrokerModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ config, onOpenBrokerModal }) => {
  const currentYear = new Date().getFullYear();

  const nameParts = (config.nome || 'Alef Hansen').trim().split(' ');
  const firstName = nameParts[0] || 'Alef';
  const lastName = nameParts.slice(1).join(' ');

  return (
    <footer className="bg-[#15263A] text-[#C9C6BB] pt-16 pb-24" id="contato">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#34332C]">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-2.5 mb-3.5">
              {config.logo && (
                <img
                  src={config.logo}
                  alt={config.nome}
                  className="h-[30px] w-auto object-contain max-w-[120px]"
                />
              )}
              {(!config.logo || config.mostrarNome) && (
                <div className="flex flex-col leading-tight">
                  <span className="font-brand text-base sm:text-lg font-extrabold tracking-tight text-[#F4F1EA]">
                    {firstName}{lastName && <><span className="text-[#0F3D5C] mx-[1px]">·</span>{lastName}</>}
                  </span>
                  <span className="text-[10px] font-medium tracking-[0.1em] uppercase text-[#8B8E86]">
                    {config.subtitulo || 'Corretor de Imóveis'}
                  </span>
                </div>
              )}
            </div>
            <p className="text-sm text-[#B5B2A6] leading-relaxed">
              Atendimento próximo do início ao fim do negócio.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#F4F1EA] font-sans text-xs tracking-[0.09em] uppercase font-semibold mb-4">
              Contato
            </h4>
            <a
              href={`tel:+${config.whats || '5548999990000'}`}
              className="block text-sm text-[#B5B2A6] hover:text-[#F4F1EA] transition-colors mb-2"
            >
              {config.telefone || '(48) 99999-0000'}
            </a>
            <a
              href={`mailto:${config.email || 'contato@alefhansen.com.br'}`}
              className="block text-sm text-[#B5B2A6] hover:text-[#F4F1EA] transition-colors mb-2"
            >
              {config.email || 'contato@alefhansen.com.br'}
            </a>
            <p className="text-sm text-[#B5B2A6] leading-snug">
              {config.endereco || 'Rua Exemplo, 100 — Centro'}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[#F4F1EA] font-sans text-xs tracking-[0.09em] uppercase font-semibold mb-4">
              Navegação
            </h4>
            <a href="#imoveis" className="block text-sm text-[#B5B2A6] hover:text-[#F4F1EA] transition-colors mb-2">
              Imóveis
            </a>
            <a href="#como-funciona" className="block text-sm text-[#B5B2A6] hover:text-[#F4F1EA] transition-colors mb-2">
              Como funciona
            </a>
            <a href="#depoimentos" className="block text-sm text-[#B5B2A6] hover:text-[#F4F1EA] transition-colors mb-2">
              Depoimentos
            </a>
            <a href="#anuncie" className="block text-sm text-[#B5B2A6] hover:text-[#F4F1EA] transition-colors mb-2">
              Anuncie o seu
            </a>
          </div>

          {/* Institutional */}
          <div>
            <h4 className="text-[#F4F1EA] font-sans text-xs tracking-[0.09em] uppercase font-semibold mb-4">
              Institucional
            </h4>
            <p className="text-sm text-[#B5B2A6] font-medium">
              {config.creci || 'CRECI 00000-J'}
            </p>
            <p className="text-xs text-[#8B8E86] mt-4 leading-relaxed">
              Os valores e condições dos imóveis estão sujeitos a alterações sem aviso prévio.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center py-6 text-xs text-[#726F64] gap-3">
          <span>
            © {currentYear} {config.nome || 'Alef Hansen'}. Todos os direitos reservados.
          </span>
          <button
            type="button"
            onClick={onOpenBrokerModal}
            className="inline-flex items-center gap-1.5 text-xs text-[#8B8E86] hover:text-[#C9C6BB] transition-colors underline underline-offset-4 cursor-pointer"
          >
            <Lock className="w-3 h-3" />
            <span>ImobFlux</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

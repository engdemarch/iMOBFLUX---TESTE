'use client';

import React from 'react';
import { SiteConfig } from '@/lib/types';
import { Lock } from 'lucide-react';

interface FooterModernoProps {
  config: SiteConfig;
  onOpenBrokerModal: () => void;
}

export const FooterModerno: React.FC<FooterModernoProps> = ({ config, onOpenBrokerModal }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#F4F6F8] pt-14 pb-10" id="contato">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-3.5">
              {config.logo ? (
                <img src={config.logo} alt={config.nome} className="h-8 w-auto object-contain max-w-[120px] rounded-lg" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-[var(--t-primary)] text-white flex items-center justify-center text-xs font-bold shrink-0">
                  {(config.nome || 'I').charAt(0)}
                </div>
              )}
              <span className="text-base font-bold text-[#15263A]">{config.nome || 'ImobFlux'}</span>
            </div>
            <p className="text-sm text-[#68707C] leading-relaxed">
              Corretor de imóveis atuando em Criciúma e região, com atendimento próximo do início ao fim do negócio.
            </p>
          </div>

          <div>
            <h4 className="text-[#15263A] text-xs uppercase font-bold tracking-wide mb-4">Contato</h4>
            <a href={`tel:+${config.whats || '5548999990000'}`} className="block text-sm text-[#68707C] hover:text-[#15263A] transition-colors mb-2">
              {config.telefone || '(48) 99999-0000'}
            </a>
            <a href={`mailto:${config.email || 'contato@alefhansen.com.br'}`} className="block text-sm text-[#68707C] hover:text-[#15263A] transition-colors mb-2">
              {config.email || 'contato@alefhansen.com.br'}
            </a>
            <p className="text-sm text-[#68707C] leading-snug">{config.endereco || 'Rua Exemplo, 100 — Centro, Criciúma/SC'}</p>
          </div>

          <div>
            <h4 className="text-[#15263A] text-xs uppercase font-bold tracking-wide mb-4">Navegação</h4>
            <a href="#imoveis" className="block text-sm text-[#68707C] hover:text-[#15263A] transition-colors mb-2">Imóveis</a>
            <a href="#como-funciona" className="block text-sm text-[#68707C] hover:text-[#15263A] transition-colors mb-2">Como funciona</a>
            <a href="#depoimentos" className="block text-sm text-[#68707C] hover:text-[#15263A] transition-colors mb-2">Depoimentos</a>
            <a href="#anuncie" className="block text-sm text-[#68707C] hover:text-[#15263A] transition-colors mb-2">Anuncie o seu</a>
          </div>

          <div>
            <h4 className="text-[#15263A] text-xs uppercase font-bold tracking-wide mb-4">Institucional</h4>
            <p className="text-sm text-[#68707C] font-medium">{config.creci || 'CRECI 00000-J'}</p>
            <p className="text-xs text-[#68707C]/80 mt-4 leading-relaxed">
              Os valores e condições dos imóveis estão sujeitos a alterações sem aviso prévio.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-[#E8ECEF] text-xs text-[#68707C] gap-3">
          <span>© {currentYear} {config.nome || 'ImobFlux'}. Todos os direitos reservados.</span>
          <button
            type="button"
            onClick={onOpenBrokerModal}
            className="inline-flex items-center gap-1.5 text-xs text-[#68707C] hover:text-[#15263A] transition-colors underline underline-offset-4 cursor-pointer"
          >
            <Lock className="w-3 h-3" />
            <span>ImobFlux</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

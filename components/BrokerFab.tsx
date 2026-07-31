'use client';

import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { SiteConfig } from '@/lib/types';

interface BrokerFabProps {
  config?: SiteConfig;
  onClick: () => void;
}

export const BrokerFab: React.FC<BrokerFabProps> = ({ config, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isImobiliaria = config?.tipoPerfil === 'imobiliaria';
  const name = config?.nome || (isImobiliaria ? 'Imobiliária' : 'Corretor de Imóveis');
  const avatar = config?.fotoCorretor || config?.logo || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80';
  
  const whatsDigits = config?.whats ? config.whats.replace(/\D/g, '') : '5548999990000';
  const defaultMsg = isImobiliaria
    ? 'Olá! Vim pelo site e gostaria de atendimento com a imobiliária.'
    : 'Olá! Vim pelo site e gostaria de tirar dúvidas com o corretor.';
  
  const whatsUrl = `https://wa.me/${whatsDigits}?text=${encodeURIComponent(defaultMsg)}`;

  // Show card if user clicks or hovers
  const showCard = isOpen || isHovered;

  return (
    <div className="fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-40 flex items-center gap-2.5">
      {/* Main Conversation Widget Button */}
      <div 
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Floating Message Card Popup */}
        {showCard && (
          <div className="absolute bottom-16 right-0 w-[290px] sm:w-[320px] bg-white border border-[#DEE2E7] rounded-xl shadow-2xl overflow-hidden animate-fade-in z-50 transition-all">
            {/* Header */}
            <div className="bg-[#0F3D5C] text-white p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative w-9 h-9 rounded-full overflow-hidden border border-white/20 bg-[#122234] shrink-0">
                  <img src={avatar} alt={name} className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#25D366] border border-white rounded-full" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white leading-tight truncate max-w-[170px]">
                    {name}
                  </h4>
                  <span className="text-[10px] text-[#25D366] font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                    Online agora · Responde rápido
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white p-1 rounded-full cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body Bubble */}
            <div className="p-4 bg-[#F8F9FA] space-y-3">
              <div className="bg-white border border-[#DEE2E7] rounded-lg p-3 text-xs text-[#15263A] shadow-xs relative leading-relaxed">
                <p className="font-medium">
                  👋 <strong className="text-[#0F3D5C]">Olá! Seja bem-vindo(a)!</strong>
                </p>
                <p className="mt-1 text-[#4A5568]">
                  {isImobiliaria
                    ? 'Está procurando o imóvel ideal ou quer vender/avaliar sua propriedade? Fale conosco agora pelo WhatsApp!'
                    : 'Está procurando o imóvel ideal ou tem alguma dúvida? Entre em contato diretamente comigo no WhatsApp!'}
                </p>
                <span className="text-[9px] text-[#A0AEC0] block text-right mt-1 font-mono">
                  Agora mesmo ✓✓
                </span>
              </div>

              {/* Direct WhatsApp CTA Button */}
              <a
                href={whatsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold uppercase tracking-wider rounded-md flex items-center justify-center gap-2 transition-colors shadow-md group cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                <span>Conversar no WhatsApp</span>
                <Send className="w-3.5 h-3.5 opacity-80" />
              </a>
            </div>
          </div>
        )}

        {/* Floating Chat Icon Trigger Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Abrir conversa"
          title="Fale conosco no WhatsApp"
          className="relative w-12 h-12 sm:w-13 sm:h-13 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer group"
        >
          <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 transition-transform group-hover:rotate-12" />
          
          {/* Active Pulsing Badge Dot */}
          <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#25D366] border-2 border-white" />
          </span>
        </button>
      </div>
    </div>
  );
};


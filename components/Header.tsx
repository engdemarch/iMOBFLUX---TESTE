'use client';

import React, { useState } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { SiteConfig } from '@/lib/types';

interface HeaderProps {
  config: SiteConfig;
  onOpenBrokerModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ config }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Split name for visual dot effect: e.g. "Alef Hansen" -> "Alef·Hansen"
  const nameParts = (config.nome || 'Alef Hansen').trim().split(' ');
  const firstName = nameParts[0] || 'Alef';
  const lastName = nameParts.slice(1).join(' ') || 'Hansen';

  const waMessage = encodeURIComponent('Olá! Vim pelo site e gostaria de mais informações.');
  const waUrl = `https://wa.me/${config.whats || '5548999990000'}?text=${waMessage}`;

  return (
    <header className="sticky top-0 z-40 bg-[rgba(243,241,234,0.92)] backdrop-blur-md border-b border-[#DEE2E7]">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8 h-[74px] flex items-center justify-between">
        {/* Brand Logo & Name */}
        <a href="#topo" className="flex items-center gap-2.5 group">
          {config.logo && (
            <img
              src={config.logo}
              alt={config.nome}
              className="h-[34px] w-auto object-contain block max-w-[140px]"
            />
          )}
          {(!config.logo || config.mostrarNome) && (
            <div className="flex flex-col leading-tight">
              <span className="font-brand text-base sm:text-lg font-extrabold tracking-tight text-[#15263A]">
                {firstName}<span className="text-[#0F3D5C] mx-[1px]">·</span>{lastName}
              </span>
              <span className="text-[10px] font-medium tracking-[0.1em] uppercase text-[#68707C] mt-0.5">
                {config.subtitulo || 'Corretor de Imóveis'}
              </span>
            </div>
          )}
        </a>

        {/* Navigation Links Desktop */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-8">
          <a href="#imoveis" className="text-sm text-[#68707C] hover:text-[#15263A] transition-colors font-medium">
            Imóveis
          </a>
          <a href="#como-funciona" className="text-sm text-[#68707C] hover:text-[#15263A] transition-colors font-medium">
            Como funciona
          </a>
          <a href="#depoimentos" className="text-sm text-[#68707C] hover:text-[#15263A] transition-colors font-medium">
            Depoimentos
          </a>
          <a href="#anuncie" className="text-sm text-[#68707C] hover:text-[#15263A] transition-colors font-medium">
            Anuncie o seu
          </a>
          <a href="#contato" className="text-sm text-[#68707C] hover:text-[#15263A] transition-colors font-medium">
            Contato
          </a>
        </nav>

        {/* Header CTA Button */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0F3D5C] hover:bg-[#0B2C44] text-white text-xs font-medium uppercase tracking-[0.04em] rounded-[2px] transition-colors shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Falar no WhatsApp</span>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#15263A] hover:bg-[#DEE2E7]/40 rounded-sm"
          aria-label="Abrir menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFFFFF] border-b border-[#DEE2E7] px-6 py-5 flex flex-col gap-4 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <a
            href="#imoveis"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base text-[#15263A] font-medium py-1.5 border-b border-[#DEE2E7]/50"
          >
            Imóveis
          </a>
          <a
            href="#como-funciona"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base text-[#15263A] font-medium py-1.5 border-b border-[#DEE2E7]/50"
          >
            Como funciona
          </a>
          <a
            href="#depoimentos"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base text-[#15263A] font-medium py-1.5 border-b border-[#DEE2E7]/50"
          >
            Depoimentos
          </a>
          <a
            href="#anuncie"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base text-[#15263A] font-medium py-1.5 border-b border-[#DEE2E7]/50"
          >
            Anuncie o seu
          </a>
          <a
            href="#contato"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base text-[#15263A] font-medium py-1.5 border-b border-[#DEE2E7]/50"
          >
            Contato
          </a>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 w-full py-3 bg-[#0F3D5C] text-white text-sm font-medium uppercase tracking-wider rounded-[2px]"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Falar no WhatsApp</span>
          </a>
        </div>
      )}
    </header>
  );
};

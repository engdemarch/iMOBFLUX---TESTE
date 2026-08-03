'use client';

import React, { useState } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { SiteConfig } from '@/lib/types';

interface HeaderModernoProps {
  config: SiteConfig;
  onOpenBrokerModal: () => void;
}

export const HeaderModerno: React.FC<HeaderModernoProps> = ({ config }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const waMessage = encodeURIComponent('Olá! Vim pelo site e gostaria de mais informações.');
  const waUrl = `https://wa.me/${config.whats || '5548999990000'}?text=${waMessage}`;

  const navLinks = [
    { href: '#imoveis', label: 'Imóveis' },
    { href: '#como-funciona', label: 'Como funciona' },
    { href: '#depoimentos', label: 'Depoimentos' },
    { href: '#anuncie', label: 'Anuncie o seu' },
    { href: '#contato', label: 'Contato' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#E8ECEF]">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8 h-[76px] flex items-center justify-between">
        <a href="#topo" className="flex items-center gap-2.5">
          {config.logo ? (
            <img src={config.logo} alt={config.nome} className="h-9 w-auto object-contain block max-w-[140px] rounded-lg" />
          ) : (
            <div className="w-9 h-9 rounded-full bg-[var(--t-primary)] text-white flex items-center justify-center text-sm font-bold shrink-0">
              {(config.nome || 'I').charAt(0)}
            </div>
          )}
          {(!config.logo || config.mostrarNome) && (
            <div className="flex flex-col leading-tight">
              <span className="text-base sm:text-lg font-bold text-[#15263A]">
                {config.nome || 'ImobFlux'}
              </span>
              <span className="text-[10px] font-medium tracking-wide text-[#68707C]">
                {config.subtitulo || 'Corretor de Imóveis'}
              </span>
            </div>
          )}
        </a>

        <nav className="hidden md:flex items-center gap-1 bg-[#F4F6F8] rounded-full px-1.5 py-1.5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-semibold text-[#4A5568] hover:text-[#15263A] hover:bg-white transition-colors px-3.5 py-2 rounded-full"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden sm:flex items-center gap-3">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--t-primary)] hover:bg-[var(--t-primary-dark)] text-white text-xs font-semibold rounded-full transition-colors shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Falar no WhatsApp</span>
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#15263A] hover:bg-[#F4F6F8] rounded-full"
          aria-label="Abrir menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#E8ECEF] px-6 py-5 flex flex-col gap-1 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm text-[#15263A] font-medium py-2.5 px-3 rounded-xl hover:bg-[#F4F6F8]"
            >
              {link.label}
            </a>
          ))}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 w-full py-3 bg-[var(--t-primary)] text-white text-sm font-semibold rounded-full"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Falar no WhatsApp</span>
          </a>
        </div>
      )}
    </header>
  );
};

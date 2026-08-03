'use client';

import React from 'react';
import { SiteConfig } from '@/lib/types';
import { UserCheck, Building2, Award, MessageCircle, ShieldCheck, Phone, CheckCircle2 } from 'lucide-react';

interface BrokerPresentationProps {
  config: SiteConfig;
  onOpenBrokerModal?: () => void;
}

export const BrokerPresentation: React.FC<BrokerPresentationProps> = ({ config }) => {
  if (config.mostrarSobre === false) {
    return null;
  }

  const isImobiliaria = config.tipoPerfil === 'imobiliaria';
  const brokerPhoto = config.fotoCorretor || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80';
  const whatsNumber = config.whats ? config.whats.replace(/\D/g, '') : '';
  const whatsUrl = whatsNumber
    ? `https://wa.me/${whatsNumber}?text=${encodeURIComponent(
        isImobiliaria
          ? `Olá! Gostaria de falar com a imobiliária sobre a compra, venda ou aluguel de imóveis.`
          : `Olá! Gostaria de conversar com o corretor sobre a compra, venda ou aluguel de imóveis.`
      )}`
    : '';

  return (
    <section className="py-20 bg-white border-t border-[#DEE2E7]" id="sobre">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Photo & Stats Badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-[420px] lg:max-w-none">
              {/* Decorative Frame Backing */}
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-[var(--t-primary)] rounded-[2px] pointer-events-none hidden sm:block" />
              
              {/* Image Box */}
              <div className="relative bg-[#F2F4F6] border border-[#DEE2E7] rounded-[2px] overflow-hidden shadow-lg aspect-[4/5] max-h-[520px]">
                {brokerPhoto ? (
                  <img
                    src={brokerPhoto}
                    alt={config.nome || (isImobiliaria ? 'Imobiliária' : 'Corretor')}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-[var(--t-primary)] text-white p-6 text-center">
                    {isImobiliaria ? (
                      <Building2 className="w-20 h-20 mb-3 opacity-80" />
                    ) : (
                      <UserCheck className="w-20 h-20 mb-3 opacity-80" />
                    )}
                    <span className="text-xl font-bold">{config.nome}</span>
                    <span className="text-xs text-[#CBD5E1] mt-1">{config.creci}</span>
                  </div>
                )}

                {/* CRECI Floating Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#15263A]/90 backdrop-blur-md text-white p-3.5 rounded-[2px] border border-white/10 flex items-center justify-between shadow-md">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-[#25D366] shrink-0" />
                    <div>
                      <span className="block text-xs font-bold uppercase tracking-wider text-white">
                        {config.nome}
                      </span>
                      <span className="block text-[11px] text-[#A0AEC0] font-mono">
                        {config.creci || (isImobiliaria ? 'CRECI-J Cadastrado' : 'CRECI Cadastrado')}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] bg-[#25D366] text-white font-bold px-2 py-0.5 rounded-[2px] uppercase tracking-wider">
                    {isImobiliaria ? 'Imobiliária Verificada' : 'Verificado'}
                  </span>
                </div>
              </div>

              {/* Stat Badge Overlay */}
              {(config.anosExperiencia || config.imoveisNegociados) && (
                <div className="absolute -bottom-6 -right-2 sm:-right-6 bg-[var(--t-primary)] text-white p-4 sm:p-5 rounded-[2px] shadow-xl border border-white/20 max-w-[200px]">
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="w-5 h-5 text-[#F59E0B]" />
                    <span className="text-lg font-bold">{config.anosExperiencia || 'Mercado'}</span>
                  </div>
                  <p className="text-[11px] text-[#CBD5E1] leading-tight font-medium">
                    {config.imoveisNegociados ? `${config.imoveisNegociados} e dezenas de famílias satisfeitas` : 'Experiência comprovada em negociações imobiliárias'}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Text & Content */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="text-xs font-semibold tracking-[0.12em] uppercase text-[var(--t-primary)] mb-2 flex items-center gap-1.5">
                {isImobiliaria ? (
                  <Building2 className="w-4 h-4 text-[var(--t-primary)]" />
                ) : (
                  <UserCheck className="w-4 h-4 text-[var(--t-primary)]" />
                )}
                <span>{isImobiliaria ? 'Apresentação da Imobiliária' : 'Apresentação Profissional'}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#15263A] tracking-tight leading-tight">
                {config.sobreTitulo || `Atendimento de Excelência com ${config.nome}`}
              </h2>
            </div>

            <div className="prose prose-slate max-w-none text-[#4A5568] text-base leading-relaxed space-y-4">
              <p>
                {config.sobreTexto ||
                  (isImobiliaria
                    ? `Somos uma imobiliária atuante no mercado regional, com foco em prestação de serviços transparentes, éticos e seguros. Auxiliamos nossos clientes na busca do imóvel perfeito, gestão de negócios e valorização para venda ou locação.`
                    : `Sou profissional atuante no mercado imobiliário, com foco em prestação de serviço transparente, ética e segura. Auxilio meus clientes na busca do imóvel perfeito e na melhor valorização na hora da venda.`)}
              </p>
            </div>

            {/* Key Service Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="flex items-center gap-2.5 p-3 bg-[#F8F9FA] border border-[#DEE2E7] rounded-[2px]">
                <CheckCircle2 className="w-4 h-4 text-[var(--t-primary)] shrink-0" />
                <span className="text-xs font-semibold text-[#15263A]">Avaliação Real e Precisa de Mercado</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 bg-[#F8F9FA] border border-[#DEE2E7] rounded-[2px]">
                <CheckCircle2 className="w-4 h-4 text-[var(--t-primary)] shrink-0" />
                <span className="text-xs font-semibold text-[#15263A]">Assessoria em Financiamento Habitacional</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 bg-[#F8F9FA] border border-[#DEE2E7] rounded-[2px]">
                <CheckCircle2 className="w-4 h-4 text-[var(--t-primary)] shrink-0" />
                <span className="text-xs font-semibold text-[#15263A]">Segurança Jurídica & Cartorária</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 bg-[#F8F9FA] border border-[#DEE2E7] rounded-[2px]">
                <CheckCircle2 className="w-4 h-4 text-[var(--t-primary)] shrink-0" />
                <span className="text-xs font-semibold text-[#15263A]">Atendimento Exclusivo Personalizado</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              {whatsUrl && (
                <a
                  href={whatsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold uppercase tracking-wider rounded-[2px] transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{isImobiliaria ? 'Falar com a Imobiliária no WhatsApp' : 'Falar com o Corretor no WhatsApp'}</span>
                </a>
              )}

              {config.telefone && (
                <a
                  href={`tel:${config.telefone.replace(/\D/g, '')}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#F2F4F6] hover:bg-[#DEE2E7] text-[#15263A] text-xs font-bold uppercase tracking-wider rounded-[2px] transition-colors border border-[#DEE2E7]"
                >
                  <Phone className="w-4 h-4 text-[var(--t-primary)]" />
                  <span>Ligar: {config.telefone}</span>
                </a>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

'use client';

import React from 'react';
import { Search, UserCheck, CalendarCheck2, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      icon: Search,
      title: 'Curadoria & Filtros Inteligentes',
      description:
        'Imóveis reais com informações 100% verificadas, filtráveis por transação, cidade, quartos e faixa de preço.',
      highlights: ['Acervo Verificado', 'Valores Transparentes', 'Fotos Reais']
    },
    {
      num: '02',
      icon: UserCheck,
      title: 'Atendimento Direto com o Corretor',
      description:
        'Cada imóvel conta com um corretor agenciador especialista. Fale direto com o responsável no WhatsApp, sem robôs.',
      highlights: ['Contato Direto', 'Respostas Rápidas', 'Atendimento Humanizado']
    },
    {
      num: '03',
      icon: CalendarCheck2,
      title: 'Visitas Personalizadas & Propostas',
      description:
        'Agende a visita no melhor horário e conte com apoio na formulação de propostas e avaliação de permutas.',
      highlights: ['Horários Flexíveis', 'Avaliação Mercadológica', 'Negociação Transparente']
    },
    {
      num: '04',
      icon: ShieldCheck,
      title: 'Assessoria Jurídica & Financiamento',
      description:
        'Verificação de certidões, simulação e aprovação de financiamento bancário até a entrega das chaves.',
      highlights: ['Análise Documental', 'Aprovação de Crédito', 'Segurança em Contrato']
    }
  ];

  return (
    <section className="py-20 bg-[#F8FAFC] border-y border-[#DEE2E7] relative overflow-hidden" id="como-funciona">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8">

        {/* Header Section */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EAF0F6] border border-[#CBD5E1] text-[#0F3D5C] text-[11px] font-bold uppercase tracking-widest rounded-[2px] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#0F3D5C]" />
            Experiência de Compra & Agenciamento
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#15263A] tracking-tight leading-tight">
            Como funciona nossa consultoria imobiliária
          </h2>
          <p className="mt-3 text-[#68707C] text-base leading-relaxed">
            Do primeiro clique ao fechamento, quatro etapas transparentes garantem agilidade e segurança jurídica em todo o processo.
          </p>
        </div>

        {/* 2x2 Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {steps.map((step, index) => {
            const IconComp = step.icon;
            return (
              <div
                key={index}
                className="group relative bg-white border border-[#DEE2E7] rounded-[2px] p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-[#0F3D5C]/40 transition-all"
              >
                {/* Big background step number */}
                <span className="pointer-events-none absolute top-4 right-5 font-['Space_Grotesk'] text-5xl font-extrabold text-[#EAF0F6] group-hover:text-[#F2F4F6] transition-colors select-none">
                  {step.num}
                </span>

                <div className="relative">
                  <span className="inline-flex items-center justify-center w-11 h-11 bg-[#0F3D5C] text-white rounded-[2px] shadow-sm">
                    <IconComp className="w-5 h-5" />
                  </span>

                  <h3 className="text-lg sm:text-xl font-bold text-[#15263A] tracking-tight mt-4">
                    {step.title}
                  </h3>

                  <p className="text-[#4A5568] text-sm leading-relaxed mt-2">
                    {step.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-[#F2F4F6]">
                    {step.highlights.map((h, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#0F3D5C] bg-[#F8FAFC] border border-[#E2E8F0] px-2.5 py-1 rounded-[2px]"
                      >
                        <CheckCircle2 className="w-3 h-3 text-[#25D366] shrink-0" />
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

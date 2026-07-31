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
        'Encontre imóveis reais com informações 100% verificadas. Utilize filtros por tipo de transação, cidade, número de quartos e faixa de preço, identificando selos como Aceita Permuta, Parcelamento Direto e Imóvel na Planta.',
      highlights: ['Acervo Verificado', 'Valores Transparentes', 'Fotos Reais']
    },
    {
      num: '02',
      icon: UserCheck,
      title: 'Atendimento Direto com o Corretor',
      description:
        'Cada imóvel conta com um corretor agenciador especialista na propriedade. Ao clicar no WhatsApp, você fala diretamente com o profissional responsável pelo imóvel, sem robôs ou formulários demorados.',
      highlights: ['Contato Direto', 'Respostas Rápidas', 'Atendimento Humanizado']
    },
    {
      num: '03',
      icon: CalendarCheck2,
      title: 'Visitas Personalizadas & Propostas',
      description:
        'Agende a visita no melhor horário para sua rotina. Apresentamos todos os detalhes técnicos do imóvel e do condomínio, auxiliando na formulação de propostas e avaliação de permutas.',
      highlights: ['Horários Flexíveis', 'Avaliação Mercadológica', 'Negociação Transparente']
    },
    {
      num: '04',
      icon: ShieldCheck,
      title: 'Assessoria Jurídica & Financiamento',
      description:
        'Conclua seu negócio com total tranquilidade. Cuidamos da verificação de todas as certidões do imóvel e dos proprietários, além da simulação e aprovação do financiamento bancário até a entrega das chaves.',
      highlights: ['Análise Documental', 'Aprovação de Crédito', 'Segurança em Contrato']
    }
  ];

  return (
    <section className="py-20 bg-[#F8FAFC] border-y border-[#DEE2E7] relative overflow-hidden" id="como-funciona">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
        
        {/* Header Section */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EAF0F6] border border-[#CBD5E1] text-[#0F3D5C] text-[11px] font-bold uppercase tracking-widest rounded-[2px] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#0F3D5C]" />
            Experiência de Compra & Agenciamento
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#15263A] tracking-tight leading-tight">
            Como funciona nossa consultoria imobiliária
          </h2>
          <p className="mt-3 text-[#68707C] text-base leading-relaxed">
            Eliminamos burocracias e intermediários desnecessários. Conheça as etapas transparentes que garantem agilidade e segurança jurídica do primeiro clique até o fechamento.
          </p>
        </div>

        {/* Continuous Process Flow (Without Boxy Cards) */}
        <div className="relative border-l-2 border-[#CBD5E1] ml-4 sm:ml-6 pl-6 sm:pl-10 space-y-12 sm:space-y-14">
          {steps.map((step, index) => {
            const IconComp = step.icon;
            return (
              <div key={index} className="relative group">
                
                {/* Step Marker Node on the line */}
                <div className="absolute -left-[35px] sm:-left-[51px] top-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#0F3D5C] text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-md ring-4 ring-[#F8FAFC] group-hover:bg-[#25D366] transition-colors">
                  {step.num}
                </div>

                {/* Content Block (No framed box) */}
                <div className="pt-0.5">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="p-1.5 bg-[#EAF0F6] text-[#0F3D5C] rounded-[2px] inline-flex items-center justify-center">
                      <IconComp className="w-5 h-5" />
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#15263A] tracking-tight">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-[#4A5568] text-sm sm:text-[15px] leading-relaxed max-w-3xl">
                    {step.description}
                  </p>

                  {/* Highlights Bullet Badges */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-3.5">
                    {step.highlights.map((h, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F3D5C] bg-white border border-[#E2E8F0] px-2.5 py-1 rounded-[2px]"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366]" />
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


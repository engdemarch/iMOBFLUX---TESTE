'use client';

import React from 'react';
import { Home, Image, Settings, MessageSquareQuote, Users, Lock, CreditCard, HelpCircle, ArrowRight } from 'lucide-react';

interface WelcomeModalProps {
  businessName: string;
  onClose: () => void;
}

const TABS = [
  { icon: Home, name: 'Imóveis', text: 'Todos os imóveis que você cadastrou, com busca e filtros.' },
  { icon: Image, name: '+ Novo Imóvel', text: 'Cadastre um imóvel novo: fotos, preço, endereço e descrição.' },
  { icon: Settings, name: 'Configurações', text: 'Logo, cores, textos do site, telefone/WhatsApp e endereço de atendimento.' },
  { icon: MessageSquareQuote, name: 'Depoimentos', text: 'Avaliações de clientes exibidas no seu site.' },
  { icon: Users, name: 'Corretores', text: 'Sua equipe, se você trabalha com mais de um corretor.' },
  { icon: Lock, name: 'Acesso & Senha', text: 'Troque sua senha de acesso ao painel.' },
  { icon: CreditCard, name: 'Assinatura', text: 'Status do seu plano e gerenciamento do pagamento.' },
  { icon: HelpCircle, name: 'Suporte', text: 'Tire dúvidas com o assistente automático, a qualquer hora.' }
];

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ businessName, onClose }) => {
  return (
    <div className="fixed inset-0 z-[60] bg-[#122234]/75 backdrop-blur-sm flex items-start justify-center overflow-y-auto p-4 sm:p-6">
      <div className="bg-white max-w-lg w-full p-6 sm:p-8 rounded-[2px] shadow-2xl border border-[#DEE2E7] my-8">
        <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#0F3D5C] mb-1.5">
          Site criado com sucesso
        </p>
        <h2 className="text-xl sm:text-2xl font-bold text-[#15263A] mb-2">
          Bem-vindo(a), {businessName}!
        </h2>
        <p className="text-sm text-[#68707C] mb-6 leading-relaxed">
          Este é o seu painel de gestão — aqui você cadastra imóveis, ajusta as informações do site e acompanha sua
          assinatura. Um resumo rápido de cada aba:
        </p>

        <div className="space-y-3 mb-6">
          {TABS.map((tab) => (
            <div key={tab.name} className="flex items-start gap-3">
              <div className="w-7 h-7 shrink-0 rounded-[2px] bg-[#F2F4F6] border border-[#DEE2E7] flex items-center justify-center">
                <tab.icon className="w-3.5 h-3.5 text-[#0F3D5C]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#15263A]">{tab.name}</p>
                <p className="text-xs text-[#68707C]">{tab.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#F2F4F6] border border-[#DEE2E7] rounded-[2px] p-3.5 mb-6">
          <p className="text-xs text-[#68707C] leading-relaxed">
            <strong className="text-[#15263A]">Pra voltar aqui depois:</strong> no rodapé do seu site público, clique
            em <strong className="text-[#15263A]">&quot;Área do Corretor&quot;</strong> e entre com o e-mail e a
            senha que você acabou de cadastrar.
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full inline-flex items-center justify-center gap-2 py-3 bg-[#0F3D5C] hover:bg-[#0B2C44] text-white text-xs font-semibold uppercase tracking-wider rounded-[2px] transition-colors"
        >
          Entendi, vamos começar
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

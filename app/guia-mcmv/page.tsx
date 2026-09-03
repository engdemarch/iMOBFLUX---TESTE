import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  FileText,
  MessageCircleQuestion,
  Percent,
  ShieldCheck,
  XCircle
} from 'lucide-react';
import { Logo } from '@/components/Logo';

export const metadata = {
  title: 'Domine o Financiamento MCMV e Venda Mais — Guia para Corretores'
};

const CHECKOUT_URL = 'https://pay.kiwify.com.br/8fSD8mG';

const CLIENT_QUESTIONS = [
  'Será que eu consigo financiar?',
  'Quanto eu preciso ganhar?',
  'Posso usar meu FGTS?',
  'Quanto vai ficar minha parcela?',
  'Qual imóvel eu consigo comprar?',
  'Eu consigo algum subsídio?'
];

const LEARN_ITEMS = [
  {
    number: '01',
    title: 'Entenda as faixas do MCMV',
    text: 'Veja de forma organizada as principais informações de cada faixa: Renda • Juros • Subsídio • Teto do imóvel. Tudo apresentado de maneira simples para facilitar sua consulta durante o atendimento.'
  },
  {
    number: '02',
    title: 'Aprenda a qualificar seu cliente',
    text: 'Descubra quais perguntas fazer antes de sair apresentando imóveis: renda familiar, capacidade de compra, possibilidade de financiamento, uso do FGTS, perfil do imóvel e potencial de enquadramento. Quanto melhor você qualifica, menos tempo perde com clientes fora do perfil.'
  },
  {
    number: '03',
    title: 'Use o FGTS como aliado na venda',
    text: 'Entenda como o FGTS pode entrar na estratégia de compra do seu cliente e aprenda a explicar de maneira simples como ele pode ser utilizado dentro do processo de aquisição do imóvel.'
  },
  {
    number: '04',
    title: 'Quebre as principais objeções',
    text: 'Acesso a scripts prontos para situações comuns do atendimento — em vez de improvisar, você terá uma base de resposta para conduzir a conversa.'
  }
];

const OBJECTIONS = ['Não tenho entrada.', 'Minha renda é baixa.', 'A parcela vai ficar muito alta.', 'Não sei se consigo financiar.', 'Vou esperar mais um pouco.'];

const RECEIVES = [
  'Informações das faixas do MCMV',
  'Renda de enquadramento',
  'Juros',
  'Subsídios',
  'Teto de imóvel',
  'Estratégias de qualificação',
  'Orientações sobre FGTS',
  'Principais objeções',
  'Scripts prontos para atendimento',
  'Acesso digital imediato'
];

const FOR_YOU = [
  'É corretor de imóveis autônomo',
  'Trabalha em uma imobiliária',
  'Está começando na carreira',
  'Trabalha com imóveis populares ou de entrada',
  'Atende clientes que dependem de financiamento',
  'Tem dificuldade para explicar o MCMV',
  'Quer transmitir mais segurança durante o atendimento',
  'Quer melhorar sua abordagem comercial'
];

const NOT_FOR_YOU = [
  'Você já domina completamente o processo de financiamento',
  'Você procura um curso técnico ou jurídico aprofundado',
  'Você quer dezenas de horas de aulas',
  'Você não trabalha com clientes interessados em financiamento imobiliário'
];

const BEFORE_AFTER = ['Qual é a renda familiar?', 'Você pretende utilizar FGTS?', 'Já possui algum financiamento?', 'Quanto pretende investir na entrada?', 'Qual faixa de imóvel você está buscando?'];

const FAQS = [
  {
    q: 'Como vou receber o e-book?',
    a: 'Após a confirmação da compra, você receberá o acesso ao material digital conforme as instruções enviadas pela plataforma.'
  },
  { q: 'O material é físico?', a: 'Não. O produto é um e-book digital em PDF.' },
  { q: 'Quantas páginas tem?', a: 'O guia possui aproximadamente 12 páginas, com conteúdo direto e organizado para consulta rápida.' },
  { q: 'O conteúdo é atualizado?', a: 'O material foi desenvolvido com foco nas regras e informações do MCMV de 2026, conforme indicado na oferta.' },
  {
    q: 'Preciso ser corretor de imóveis?',
    a: 'O material foi desenvolvido principalmente para corretores de imóveis, especialmente aqueles que trabalham com clientes que dependem de financiamento.'
  },
  {
    q: 'Preciso entender de financiamento para usar?',
    a: 'Não. Essa é justamente a proposta do material: apresentar os principais pontos de forma simples, sem linguagem excessivamente técnica.'
  },
  {
    q: 'Vou aprender a fazer financiamento?',
    a: 'Não é um curso técnico de operação bancária. O objetivo é ajudar o corretor a entender os principais pontos do MCMV, qualificar clientes e conduzir melhor suas conversas de venda.'
  },
  { q: 'Posso acessar pelo celular?', a: 'Sim. Por ser um PDF digital, você poderá consultar o material em dispositivos compatíveis com leitura de PDF.' }
];

function EbookCover({ className = '' }: { className?: string }) {
  return (
    <div className={`w-64 sm:w-72 rounded-[10px] overflow-hidden shadow-[0_30px_60px_-20px_rgba(15,61,92,0.5)] ring-1 ring-black/10 bg-gradient-to-br from-[#0F3D5C] to-[#0B2C44] text-white ${className}`}>
      <div className="p-6 flex flex-col h-full min-h-[360px]">
        <div className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 mb-6 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-wider">
          <FileText className="w-3 h-3" />
          Guia em PDF
        </div>
        <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#F5A524] mb-2">Para corretores de imóveis</p>
        <h3 className="text-2xl font-extrabold leading-tight mb-4">Domine o Financiamento MCMV e Venda Mais</h3>
        <div className="mt-auto flex items-center gap-4 text-[11px] text-white/70 pt-4 border-t border-white/10">
          <span className="inline-flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" /> 12 páginas
          </span>
          <span className="inline-flex items-center gap-1">
            <Percent className="w-3.5 h-3.5" /> MCMV 2026
          </span>
        </div>
      </div>
    </div>
  );
}

function CheckoutButton({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <a
      href={CHECKOUT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-b from-[#FBBF24] to-[#F59E0B] hover:from-[#FCC94D] hover:to-[#F7A912] text-[#3A2500] text-sm font-extrabold uppercase tracking-wide rounded-full shadow-[0_15px_35px_-10px_rgba(245,158,11,0.6)] transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] ${className}`}
    >
      {children}
      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
    </a>
  );
}

export default function GuiaMcmvPage() {
  return (
    <div className="min-h-screen bg-white text-[#15263A]">
      {/* Header minimalista — sem menu de navegação pra não distrair da oferta */}
      <header className="py-5 border-b border-[#EDEFF2]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 flex justify-center">
          <Logo variant="light" iconClassName="w-6 h-6" textClassName="text-base" />
        </div>
      </header>

      {/* 1. HERO */}
      <section className="relative bg-[#F7F9FB] overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -z-0 top-[-320px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full opacity-40 blur-3xl"
          style={{ background: 'radial-gradient(circle, #BFD3F2 0%, transparent 70%)' }}
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 pt-14 pb-16 sm:pt-20 sm:pb-20 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 mb-6 bg-[#0F3D5C]/8 border border-[#0F3D5C]/15 rounded-full text-[11px] font-bold uppercase tracking-wider text-[#0F3D5C]">
            Guia prático para corretores de imóveis · Atualizado para 2026
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-6 leading-tight text-[#0B1B2E]">
            Domine o Financiamento MCMV e Venda Mais
          </h1>
          <p className="text-base sm:text-lg text-[#3E4A5C] max-w-xl mx-auto mb-3">
            Pare de perder clientes porque você não sabe explicar o financiamento.
          </p>
          <p className="text-sm sm:text-base text-[#3E4A5C] max-w-xl mx-auto mb-8">
            Aprenda, de forma simples e prática, como entender as faixas do MCMV, qualificar melhor seus clientes,
            utilizar o FGTS e responder às principais objeções que travam uma venda.
          </p>

          <div className="flex justify-center mb-8">
            <EbookCover className="rotate-2" />
          </div>

          <p className="text-xs font-bold uppercase tracking-wider text-[#68707C] mb-6">
            Guia prático em PDF · 12 páginas · Acesso imediato
          </p>

          <CheckoutButton>Quero dominar o MCMV e vender mais</CheckoutButton>
          <p className="text-xs text-[#68707C] mt-3">Acesso imediato após a confirmação da compra.</p>

          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 text-xs text-[#3E4A5C] font-medium">
            {['Conteúdo direto ao ponto', 'Linguagem simples', 'Feito para corretores', 'Acesso digital imediato'].map((t) => (
              <li key={t} className="inline-flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#0F3D5C]" /> {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 2. A DOR */}
      <section className="bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 leading-snug">
            Quantas vendas você já perdeu porque o cliente não entendeu o financiamento?
          </h2>

          <p className="text-center text-[#3E4A5C] mb-4">O cliente pergunta:</p>
          <div className="space-y-2.5 mb-8">
            {CLIENT_QUESTIONS.map((q) => (
              <blockquote key={q} className="border-l-4 border-[#0F3D5C]/20 bg-[#F7F9FB] rounded-r-[8px] px-4 py-2.5 text-sm text-[#15263A] italic">
                &ldquo;{q}&rdquo;
              </blockquote>
            ))}
          </div>

          <p className="text-[#3E4A5C] leading-relaxed mb-4">E você precisa saber responder.</p>
          <p className="text-[#3E4A5C] leading-relaxed mb-4">
            Porque quando o corretor não consegue explicar o financiamento com segurança, o cliente começa a
            procurar respostas em outro lugar.
          </p>
          <p className="font-bold text-[#0B1B2E] text-lg mb-6">E uma dúvida mal respondida pode virar uma venda perdida.</p>
          <p className="text-[#3E4A5C] leading-relaxed">
            O problema não é apenas encontrar imóveis. É saber{' '}
            <strong className="text-[#15263A]">qualificar o cliente, entender o perfil financeiro e conduzir a conversa até a decisão de compra.</strong>
          </p>
        </div>
      </section>

      {/* 3. A SOLUÇÃO */}
      <section className="bg-[#F7F9FB] border-y border-[#DEE2E7]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 leading-snug">
            Um guia simples para você entender o MCMV e conversar com mais segurança com seus clientes.
          </h2>
          <p className="text-[#3E4A5C] leading-relaxed mb-4">
            O <strong className="text-[#15263A]">Domine o Financiamento MCMV e Venda Mais</strong> foi criado para o
            corretor que não quer virar especialista em financiamento.
          </p>
          <p className="text-[#3E4A5C] leading-relaxed mb-4">
            Você só precisa entender <strong className="text-[#15263A]">o que realmente importa para a venda.</strong>
          </p>
          <p className="text-[#3E4A5C] leading-relaxed">
            Em apenas 12 páginas, você encontrará um material direto, visual e prático para consultar sempre que
            surgir uma dúvida durante o atendimento.
          </p>
        </div>
      </section>

      {/* 4. O QUE VOCÊ VAI APRENDER */}
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-14">Dentro do guia você vai encontrar:</h2>
          <div className="space-y-8">
            {LEARN_ITEMS.map((item) => (
              <div key={item.number} className="flex gap-5">
                <div className="shrink-0 w-11 h-11 rounded-2xl bg-gradient-to-br from-[#1D5680] to-[#0B2C44] text-white flex items-center justify-center font-extrabold text-sm shadow-[0_8px_16px_-6px_rgba(15,61,92,0.45)]">
                  {item.number}
                </div>
                <div>
                  <h3 className="font-bold text-[#15263A] mb-1.5">{item.title}</h3>
                  <p className="text-sm text-[#3E4A5C] leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-[#F7F9FB] border border-[#DEE2E7] rounded-2xl p-6">
            <p className="text-sm font-bold text-[#15263A] mb-3">Você também terá scripts prontos para objeções como:</p>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {OBJECTIONS.map((o) => (
                <p key={o} className="text-sm text-[#3E4A5C] italic bg-white border border-[#DEE2E7] rounded-[8px] px-3 py-2">
                  &ldquo;{o}&rdquo;
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. O DIFERENCIAL */}
      <section className="bg-[#0F3D5C]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-white/70 mb-1">Não é um curso de financiamento.</h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-8">É uma ferramenta para o seu atendimento.</h3>
          <p className="text-white/70 mb-1.5">Você não precisa assistir horas de aulas.</p>
          <p className="text-white/70 mb-1.5">Não precisa estudar dezenas de páginas.</p>
          <p className="text-white/70 mb-6">Não precisa entender juridiquês.</p>
          <p className="text-white/90 mb-8">O objetivo é simples:</p>
          <p className="text-lg font-bold text-white mb-10">
            Você abrir o PDF, encontrar a informação que precisa e conseguir explicar melhor para o seu cliente.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Consulta rápida', 'Linguagem simples', 'Foco na venda'].map((t) => (
              <span key={t} className="px-4 py-2 bg-white/10 border border-white/15 rounded-full text-xs font-bold uppercase tracking-wider text-white">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 6. MOSTRE O PRODUTO */}
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20 grid md:grid-cols-2 gap-10 items-center">
          <div className="flex justify-center">
            <EbookCover className="-rotate-2" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Veja o que você recebe</h2>
            <p className="text-sm font-bold text-[#0F3D5C] mb-1">📕 E-book — Domine o Financiamento MCMV e Venda Mais</p>
            <p className="text-sm text-[#3E4A5C] mb-6">
              Guia prático em PDF com 12 páginas. Conteúdo organizado para facilitar a consulta durante o atendimento.
            </p>
            <p className="text-xs font-bold uppercase tracking-wider text-[#68707C] mb-3">Você recebe:</p>
            <ul className="space-y-2">
              {RECEIVES.map((r) => (
                <li key={r} className="flex items-center gap-2 text-sm text-[#15263A]">
                  <CheckCircle2 className="w-4 h-4 text-[#0F3D5C] shrink-0" /> {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 7 & 8. PARA QUEM É / NÃO É */}
      <section className="bg-[#F7F9FB] border-y border-[#DEE2E7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20 grid md:grid-cols-2 gap-8">
          <div className="bg-white border border-[#DEE2E7] rounded-2xl p-6">
            <h2 className="text-lg font-bold text-[#15263A] mb-5">Esse guia foi feito para você se:</h2>
            <ul className="space-y-3">
              {FOR_YOU.map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-sm text-[#3E4A5C]">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" /> {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white border border-[#DEE2E7] rounded-2xl p-6">
            <h2 className="text-lg font-bold text-[#15263A] mb-2">Provavelmente este material não é para você se:</h2>
            <p className="text-xs text-[#68707C] mb-5">O objetivo aqui é ser simples, rápido e útil para quem está vendendo.</p>
            <ul className="space-y-3">
              {NOT_FOR_YOU.map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-sm text-[#3E4A5C]">
                  <XCircle className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 9. TRANSFORMAÇÃO */}
      <section className="bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 leading-snug">
            Imagine atender seu próximo cliente sabendo exatamente o que perguntar.
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 items-start">
            <div className="bg-[#F7F9FB] border border-[#DEE2E7] rounded-2xl p-5">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#68707C] mb-3">Em vez de</p>
              <p className="text-sm italic text-[#3E4A5C]">&ldquo;Qual imóvel você está procurando?&rdquo;</p>
            </div>
            <div className="bg-[#0F3D5C] rounded-2xl p-5">
              <p className="text-[11px] font-bold uppercase tracking-wider text-white/60 mb-3">Você começa entendendo</p>
              <ul className="space-y-2">
                {BEFORE_AFTER.map((t) => (
                  <li key={t} className="text-sm italic text-white">
                    &ldquo;{t}&rdquo;
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-center text-[#3E4A5C] mt-10 mb-2">Isso muda completamente a qualidade do atendimento.</p>
          <p className="text-center text-[#3E4A5C]">
            Você deixa de simplesmente <strong className="text-[#15263A]">mostrar imóveis</strong>. E passa a{' '}
            <strong className="text-[#15263A]">conduzir o cliente para uma possibilidade real de compra.</strong>
          </p>
        </div>
      </section>

      {/* 11. OFERTA */}
      <section className="relative bg-[#0B1B2E] overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-30 blur-3xl"
          style={{ background: 'radial-gradient(circle, #F59E0B 0%, transparent 70%)' }}
        />
        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-snug">
            Quanto vale uma venda que você pode deixar de perder por não saber explicar o financiamento?
          </h2>
          <p className="text-white/70 mb-2">
            O conhecimento apresentado neste guia pode ajudar você a conduzir melhor uma única conversa com um
            potencial comprador.
          </p>
          <p className="text-white/70 mb-10">Mas você não precisa investir em um curso caro.</p>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 text-left max-w-sm mx-auto">
            <p className="text-[11px] font-bold uppercase tracking-wider text-white/50 mb-3 text-center">Você recebe</p>
            <ul className="space-y-2 text-sm text-white">
              {['📕 Guia completo em PDF', '12 páginas práticas', 'MCMV atualizado para 2026', 'Scripts de atendimento', 'Estratégias de qualificação', 'Orientações sobre FGTS'].map(
                (t) => (
                  <li key={t}>{t}</li>
                )
              )}
            </ul>
          </div>

          <p className="text-xs font-bold uppercase tracking-wider text-white/50 mb-2">Por apenas</p>
          <p className="text-5xl font-extrabold text-white mb-2">R$ 7,90</p>
          <p className="text-xs font-bold uppercase tracking-wider text-[#F5A524] mb-8">Acesso imediato</p>

          <p className="text-sm text-white/60 max-w-md mx-auto mb-8 italic">
            De corretor para corretor: você não precisa saber tudo sobre financiamento. Mas precisa saber o
            suficiente para não perder uma oportunidade de venda.
          </p>

          <CheckoutButton>Quero meu guia agora</CheckoutButton>
          <p className="text-xs text-white/50 mt-3">Pagamento seguro · Acesso digital · Receba após a confirmação da compra</p>
        </div>
      </section>

      {/* 12. GARANTIA */}
      <section className="bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Você não precisa comprar no escuro.</h2>
          <p className="text-[#3E4A5C] leading-relaxed mb-8">
            Você terá acesso ao material e poderá avaliar se ele realmente faz sentido para sua rotina profissional.
          </p>
          <div className="inline-flex flex-col items-center gap-3 bg-[#F7F9FB] border border-[#DEE2E7] rounded-2xl px-8 py-6">
            <ShieldCheck className="w-8 h-8 text-[#0F3D5C]" />
            <p className="text-sm font-bold text-[#15263A]">Compra segura</p>
            <p className="text-xs text-[#68707C] max-w-xs">
              Sua compra é processada de forma segura e você recebe as instruções de acesso após a confirmação do
              pagamento.
            </p>
          </div>
        </div>
      </section>

      {/* 13. FAQ */}
      <section className="bg-[#F7F9FB] border-y border-[#DEE2E7]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">Perguntas frequentes</h2>
          <div className="mt-10 space-y-3">
            {FAQS.map((f) => (
              <details key={f.q} className="group bg-white border border-[#DEE2E7] rounded-[10px] px-5 py-4">
                <summary className="flex items-center justify-between gap-3 cursor-pointer list-none font-semibold text-sm text-[#15263A]">
                  <span className="inline-flex items-center gap-2">
                    <MessageCircleQuestion className="w-4 h-4 text-[#0F3D5C] shrink-0" />
                    {f.q}
                  </span>
                  <span className="text-[#68707C] transition-transform duration-200 group-open:rotate-45 text-lg leading-none">+</span>
                </summary>
                <p className="text-sm text-[#3E4A5C] leading-relaxed mt-3 pl-6">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 14. CTA FINAL */}
      <section className="bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 leading-snug">
            Pare de deixar o financiamento virar uma barreira para a sua venda.
          </h2>
          <p className="text-[#3E4A5C] mb-1.5">Você não precisa saber tudo.</p>
          <p className="text-[#3E4A5C] mb-8">
            Precisa saber <strong className="text-[#15263A]">o que perguntar, o que explicar e como conduzir o cliente.</strong>
          </p>
          <p className="text-sm text-[#68707C] mb-8">Tenha o guia no seu celular e consulte sempre que precisar.</p>
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1B2E] mb-10 leading-snug">
            DOMINE O MCMV.
            <br />
            VENDA COM MAIS SEGURANÇA.
          </h3>
          <CheckoutButton>Quero meu guia agora</CheckoutButton>
          <p className="text-xs text-[#68707C] mt-3">Acesso digital imediato após a compra.</p>
        </div>
      </section>

      {/* 15. CONEXÃO COM O IMOBFLUX */}
      <section className="bg-[#F7F9FB] border-t border-[#DEE2E7]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-14 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-[#68707C] mb-2">E depois que você aprender a vender melhor...</p>
          <h2 className="text-lg font-bold text-[#15263A] mb-3">Organize melhor seus clientes e imóveis.</h2>
          <p className="text-sm text-[#3E4A5C] max-w-md mx-auto mb-1.5">
            Conheça o <strong>ImobFlux</strong>, uma solução criada para ajudar corretores a terem uma presença
            digital mais profissional e organizar sua operação comercial.
          </p>
          <p className="text-sm text-[#3E4A5C] max-w-md mx-auto mb-6 italic">
            Seu conhecimento ajuda você a vender. Sua estrutura ajuda você a vender todos os dias.
          </p>
          <Link
            href="/marketing"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0F3D5C] hover:text-[#0B2C44] hover:underline"
          >
            Conhecer o ImobFlux <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <p className="text-xs text-[#68707C] mt-3 max-w-sm mx-auto">
            Crie sua presença profissional e tenha uma estrutura para apresentar seus imóveis e captar oportunidades.
          </p>
        </div>
      </section>

      {/* 16. RODAPÉ */}
      <footer className="bg-white border-t border-[#DEE2E7]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 text-center">
          <Logo variant="light" iconClassName="w-5 h-5" textClassName="text-sm" className="justify-center mb-3" />
          <p className="text-xs text-[#68707C] mb-1">Soluções digitais para corretores e profissionais do mercado imobiliário.</p>
          <p className="text-xs text-[#68707C] mb-4">© 2026 ImobFlux. Todos os direitos reservados.</p>
          <div className="flex items-center justify-center gap-4 text-xs text-[#68707C] mb-6">
            <Link href="/termos" className="hover:text-[#15263A] transition-colors">
              Termos de Uso
            </Link>
            <Link href="/privacidade" className="hover:text-[#15263A] transition-colors">
              Política de Privacidade
            </Link>
            <a href="mailto:eng.demarch@gmail.com" className="hover:text-[#15263A] transition-colors">
              Contato
            </a>
          </div>
          <p className="text-[11px] text-[#9AA3AF] max-w-xl mx-auto leading-relaxed">
            As informações apresentadas no material têm caráter educacional e comercial e não substituem a análise e
            confirmação das condições específicas junto às instituições financeiras e órgãos competentes.
          </p>
        </div>
      </footer>
    </div>
  );
}

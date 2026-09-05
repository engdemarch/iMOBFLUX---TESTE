import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  ArrowRight,
  Building2,
  Check,
  Globe,
  LayoutDashboard,
  MessageCircle,
  Palette,
  RefreshCw,
  Rocket,
  Share2,
  Star,
  UserPlus,
  Users
} from 'lucide-react';
import { LiveDemoShowcase } from '@/components/templates/LiveDemoShowcase';
import { Logo } from '@/components/Logo';
import { SupportChatWidget } from '@/components/SupportChat';
import { TrackedLink } from '@/components/TrackedLink';

const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost';

const BENEFITS = [
  {
    icon: LayoutDashboard,
    title: 'Seus imóveis em um só lugar',
    text: 'Crie uma vitrine profissional para apresentar seus imóveis de forma organizada.'
  },
  {
    icon: MessageCircle,
    title: 'Atendimento pelo WhatsApp',
    text: 'Facilite o contato e transforme a visita ao seu site em uma conversa.'
  },
  {
    icon: Palette,
    title: 'Visual profissional',
    text: 'Passe uma imagem mais profissional sem precisar contratar designer ou programador.'
  },
  {
    icon: RefreshCw,
    title: 'Fácil de atualizar',
    text: 'Cadastre e altere seus imóveis sempre que precisar.'
  },
  {
    icon: Globe,
    title: 'Seu espaço na internet',
    text: 'Tenha um endereço para divulgar na bio, anúncios, cartões e WhatsApp.'
  },
  {
    icon: Users,
    title: 'Feito para corretores',
    text: 'Uma plataforma pensada para a rotina de quem trabalha com imóveis.'
  }
];

const STEPS = [
  { number: '01', icon: UserPlus, title: 'Crie sua conta', text: 'Cadastre-se gratuitamente e entre na plataforma.' },
  {
    number: '02',
    icon: Building2,
    title: 'Monte sua vitrine',
    text: 'Adicione seus imóveis, fotos, informações e formas de contato.'
  },
  { number: '03', icon: Rocket, title: 'Publique', text: 'Seu site está pronto para ser compartilhado com seus clientes.' },
  {
    number: '04',
    icon: Share2,
    title: 'Divulgue',
    text: 'Coloque o link na sua bio, WhatsApp, anúncios e materiais de divulgação.'
  }
];

const OFERTA_HIGHLIGHTS = ['7 dias grátis', 'R$ 47,90/ano', 'Sem fidelidade', 'Comece agora'];

// Mockups de janela de navegador usados no hero e na seção de produto, no
// estilo "screenshot flutuante" — cartão branco com barra de título.
const FLOATING_CARDS = [
  {
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80',
    label: 'Casa de Condomínio',
    meta: '4 quartos · R$ 1.280.000',
    className: 'hidden lg:block left-0 top-4 -rotate-6'
  },
  {
    img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80',
    label: 'Apartamento',
    meta: '2 quartos · R$ 410.000',
    className: 'hidden lg:block right-0 top-0 rotate-6'
  }
];

// Faixa de mockups sempre visível (qualquer largura de tela) — garante prova
// visual do produto pra todo mundo, independente da janela do navegador.
const SHOWCASE_STRIP = [
  {
    img: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=400&q=80',
    label: 'Casa Térrea',
    meta: '3 quartos · R$ 620.000'
  },
  {
    img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=400&q=80',
    label: 'Sobrado de Luxo',
    meta: '4 quartos · R$ 1.280.000'
  },
  {
    img: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=400&q=80',
    label: 'Apartamento Mobiliado',
    meta: '2 quartos · R$ 410.000'
  },
  {
    img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=400&q=80',
    label: 'Casa de Praia',
    meta: '3 quartos · R$ 750.000'
  }
];

function BrowserCard({ img, label, meta, className = '' }: { img: string; label: string; meta: string; className?: string }) {
  return (
    <div
      className={`shrink-0 rounded-2xl overflow-hidden shadow-[0_20px_40px_-15px_rgba(15,61,92,0.25)] ring-1 ring-black/5 bg-white transition-transform duration-300 hover:-translate-y-1 ${className}`}
    >
      <div className="h-6 bg-gradient-to-b from-[#F7F9FB] to-[#EEF2F6] border-b border-[#E5EAF0] flex items-center gap-1.5 px-3">
        <span className="w-2 h-2 rounded-full bg-[#FF5F57]" />
        <span className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
        <span className="w-2 h-2 rounded-full bg-[#28C840]" />
      </div>
      <img src={img} alt="" className="w-full h-20 object-cover" />
      <div className="px-3 py-2.5 text-left">
        <p className="text-[10px] font-bold text-[#15263A] truncate">{label}</p>
        <p className="text-[9px] text-[#68707C] truncate">{meta}</p>
      </div>
    </div>
  );
}

function PhoneMockup({ className = '' }: { className?: string }) {
  return (
    <div className={`w-28 xl:w-32 transition-transform duration-300 hover:-translate-y-1 ${className}`}>
      <div className="rounded-[32px] border-[3px] border-[#0B1B2E] bg-[#0B1B2E] shadow-[0_25px_50px_-15px_rgba(15,61,92,0.4)] overflow-hidden p-1">
        <div className="relative bg-white rounded-[26px] overflow-hidden" style={{ aspectRatio: '9 / 18.5' }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-3 bg-[#0B1B2E] rounded-b-xl z-10" />
          <div className="pt-4 px-1.5 flex flex-col h-full">
            <p className="text-[7px] font-bold text-[#0F3D5C] mb-1 px-0.5">ImobFlux</p>
            <img
              src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=300&q=80"
              alt=""
              className="w-full h-16 object-cover rounded-[6px]"
            />
            <p className="text-[6.5px] font-semibold text-[#15263A] mt-1 px-0.5">Apartamento c/ Vista Livre</p>
            <p className="text-[7px] font-bold text-[#0F3D5C] px-0.5">R$ 410.000</p>
            <div className="mt-auto mb-2 mx-0.5 bg-[#25D366] text-white text-[6px] font-bold text-center py-1.5 rounded-full">
              FALAR NO WHATSAPP
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CtaButton({
  href,
  children,
  variant = 'primary',
  metaContentName
}: {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'onDark';
  metaContentName: string;
}) {
  const base =
    'group inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold rounded-full transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]';
  const styles =
    variant === 'primary'
      ? 'bg-gradient-to-b from-[#1A4D73] to-[#0B2C44] hover:from-[#1D5680] hover:to-[#0F3D5C] text-white shadow-[0_12px_30px_-8px_rgba(15,61,92,0.55)]'
      : 'bg-white hover:bg-[#F2F4F6] text-[#0F3D5C] shadow-[0_12px_30px_-8px_rgba(0,0,0,0.25)]';
  return (
    <TrackedLink
      href={href}
      className={`${base} ${styles}`}
      metaEvent="Lead"
      metaParams={{ content_name: metaContentName }}
    >
      {children}
      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
    </TrackedLink>
  );
}

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-white text-[#15263A] overflow-x-hidden">
      {/* Faixa de promoção de lançamento */}
      <Link
        href="#oferta"
        className="block bg-[#0B2C44] hover:bg-[#0F3D5C] text-white text-center text-xs sm:text-sm font-semibold py-2 px-4 transition-colors"
      >
        🚀 Promoção de lançamento: assinatura anual por <strong>R$ 47,90</strong> — economize 89%
      </Link>

      {/* Nav */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-[#DEE2E7]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Logo variant="light" iconClassName="w-6 h-6" textClassName="text-base" />
          <nav className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/signup?mode=login"
              className="px-3.5 sm:px-4 py-2 text-sm font-semibold text-[#0F3D5C] hover:text-[#0B2C44] transition-colors"
            >
              Entrar
            </Link>
            <TrackedLink
              href="/signup"
              className="px-4 sm:px-5 py-2.5 bg-[#0F3D5C] hover:bg-[#0B2C44] hover:scale-[1.03] active:scale-[0.98] text-white text-sm font-bold rounded-full transition-all duration-200 shadow-[0_8px_20px_-6px_rgba(15,61,92,0.5)]"
              metaEvent="Lead"
              metaParams={{ content_name: 'header_testar_gratis' }}
            >
              Testar grátis
            </TrackedLink>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="relative bg-[#F7F9FB] overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -z-0 top-[-320px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full opacity-50 blur-3xl"
          style={{ background: 'radial-gradient(circle, #BFD3F2 0%, transparent 70%)' }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-14 pb-16 sm:pt-20 sm:pb-20 text-center">
          {FLOATING_CARDS.map((card) => (
            <BrowserCard key={card.label} {...card} className={`absolute w-32 xl:w-40 z-0 ${card.className}`} />
          ))}
          <PhoneMockup className="hidden lg:block absolute right-2 bottom-0 rotate-3 z-0" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex flex-col items-center gap-1 mb-7 px-7 py-5 bg-white rounded-3xl shadow-[0_20px_45px_-18px_rgba(15,61,92,0.4)] border border-[#DEE2E7]">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#68707C]">
                <Star className="w-3 h-3 fill-[#0F3D5C] text-[#0F3D5C]" />
                Promoção de lançamento
              </span>
              <div className="flex items-end gap-1.5">
                <span className="text-lg sm:text-xl font-bold text-[#0F3D5C] mb-1.5 sm:mb-2">R$</span>
                <span className="text-6xl sm:text-7xl font-extrabold text-[#0F3D5C] leading-none tracking-tight">
                  47,90
                </span>
                <span className="text-sm sm:text-base font-bold text-[#68707C] mb-1.5 sm:mb-2">/ano</span>
              </div>
              <span className="text-xs sm:text-sm font-bold text-[#237A46] mt-1">
                Vale muito a pena: menos de R$ 4/mês por um site que trabalha por você 24h.
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold mb-6 leading-tight text-[#0B1B2E]">
              Seu próximo cliente pode estar procurando por você agora.
            </h1>
            <p className="text-base sm:text-lg text-[#3E4A5C] max-w-xl mx-auto mb-8">
              Tenha seu próprio site imobiliário profissional, divulgue seus imóveis e receba contatos de clientes
              pelo WhatsApp — sem complicação e sem precisar contratar um programador.
            </p>
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <CtaButton href="/signup" metaContentName="hero_quero_testar">Quero testar grátis por 7 dias</CtaButton>
          </div>
          <p className="relative z-10 text-xs text-[#68707C] mt-4 font-medium">
            ✓ 7 dias grátis &nbsp; ✓ R$ 47,90/ano (promoção) &nbsp; ✓ Comece em poucos minutos
          </p>

          {/* Faixa de imóveis — sempre visível, qualquer tamanho de tela */}
          <div className="relative z-10 mt-14 flex gap-4 overflow-x-auto pb-2 sm:justify-center sm:overflow-visible sm:flex-wrap snap-x snap-mandatory">
            {SHOWCASE_STRIP.map((item) => (
              <BrowserCard key={item.label} {...item} className="w-40 snap-start" />
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO DE DOR */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 leading-snug">
              Você trabalha para vender imóveis. Não para ficar brigando com tecnologia.
            </h2>
            <p className="text-[#3E4A5C] leading-relaxed mb-4">
              Instagram ajuda a gerar atenção. Portais ajudam a divulgar imóveis. Mas quando o cliente quer conhecer
              melhor você, sua carteira e seus imóveis, ter um espaço próprio faz diferença.
            </p>
            <p className="text-[#3E4A5C] leading-relaxed mb-4">
              O problema é que criar e manter um site profissional sempre pareceu caro, complicado e demorado.
            </p>
            <p className="font-bold text-[#0B1B2E] text-lg">O ImobFlux foi criado para mudar isso.</p>
          </div>
          <div className="flex justify-center">
            <BrowserCard
              img="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80"
              label="seunome.imobflux"
              meta="Site profissional, no ar agora"
              className="w-72 sm:w-80"
            />
          </div>
        </div>
      </section>

      {/* SEÇÃO DE PRODUTO */}
      <section className="bg-[#F7F9FB] border-y border-[#DEE2E7]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Seu site imobiliário profissional. Pronto para você usar.</h2>
            <p className="text-[#3E4A5C] leading-relaxed">
              O ImobFlux reúne as principais ferramentas que um corretor precisa para construir sua presença digital
              em um só lugar. Cadastre seus imóveis, organize sua vitrine, compartilhe seus anúncios e permita que
              seus clientes encontrem você e entrem em contato facilmente.
            </p>
          </div>
          <div className="max-w-[1100px] mx-auto mb-10">
            <LiveDemoShowcase />
          </div>
          <div className="text-center">
            <CtaButton href="/signup" metaContentName="beneficios_quero_criar">Quero criar meu site</CtaButton>
          </div>
        </div>
      </section>

      {/* SEÇÃO DE BENEFÍCIOS */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center max-w-xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold">Mais profissionalismo. Mais confiança. Mais oportunidades.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  className="group bg-white border border-[#EAEDF1] p-6 rounded-2xl hover:border-transparent hover:-translate-y-1.5 hover:shadow-[0_25px_50px_-20px_rgba(15,61,92,0.35)] transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#1D5680] to-[#0B2C44] group-hover:from-[#2568A0] group-hover:to-[#0F3D5C] rounded-xl text-white mb-4 shadow-[0_8px_16px_-6px_rgba(15,61,92,0.45)] transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-[#15263A] mb-1.5">{b.title}</h3>
                  <p className="text-xs text-[#68707C] leading-relaxed">{b.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SEÇÃO DE OBJEÇÃO */}
      <section className="bg-[#F7F9FB] border-y border-[#DEE2E7]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-5">Mas eu não entendo de tecnologia…</h2>
          <p className="text-[#3E4A5C] leading-relaxed mb-2">Melhor ainda.</p>
          <p className="text-[#3E4A5C] leading-relaxed mb-6">
            O ImobFlux foi pensado para você não precisar entender de programação, hospedagem ou desenvolvimento de
            sites.
          </p>
          <p className="text-lg font-bold text-[#0B1B2E]">
            Você cuida dos imóveis e dos clientes.
            <br />O ImobFlux cuida da tecnologia.
          </p>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center max-w-xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold">Comece em poucos minutos.</h2>
          </div>
          <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 mb-12">
            <div
              aria-hidden
              className="hidden lg:block absolute top-6 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#DEE2E7] to-transparent"
            />
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="relative text-center sm:text-left">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#1D5680] to-[#0B2C44] rounded-2xl text-white mb-4 relative z-10 shadow-[0_10px_20px_-8px_rgba(15,61,92,0.5)]">
                    <Icon className="w-5 h-5" />
                    <span className="absolute -top-2.5 -right-2.5 w-6 h-6 flex items-center justify-center bg-white ring-1 ring-[#DEE2E7] rounded-full text-[9px] font-extrabold text-[#0F3D5C] shadow-sm">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#15263A] mb-1.5">{step.title}</h3>
                  <p className="text-sm text-[#68707C] leading-relaxed">{step.text}</p>
                </div>
              );
            })}
          </div>
          <div className="text-center">
            <CtaButton href="/signup" metaContentName="como_funciona_comecar">Começar agora — é grátis</CtaButton>
          </div>
        </div>
      </section>

      {/* SEÇÃO DE OFERTA */}
      <section id="oferta" className="relative bg-[#0F3D5C] overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-40 blur-3xl"
          style={{ background: 'radial-gradient(circle, #5B8DEF 0%, transparent 70%)' }}
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 mb-6 bg-white/10 border border-white/20 rounded-full text-[11px] font-bold uppercase tracking-wider text-white">
            <Rocket className="w-3.5 h-3.5" />
            Promoção de lançamento — por tempo limitado
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">
            Garanta o ImobFlux pelo menor preço que ele já teve.
          </h2>
          <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-8 max-w-xl mx-auto">
            Teste grátis por 7 dias. Depois, uma única cobrança por ano — sem mensalidade e sem susto na fatura.
          </p>

          <div className="inline-flex flex-col items-center bg-white/5 border border-white/15 rounded-3xl px-8 py-8 sm:px-14 sm:py-10 mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-white/50 line-through">
              De R$ 454,80/ano
            </span>
            <div className="flex items-end gap-1.5 mt-1">
              <span className="text-lg font-bold text-white/70 mb-2">R$</span>
              <span className="text-6xl sm:text-7xl font-extrabold text-white leading-none">47</span>
              <span className="text-2xl font-bold text-white/70 mb-1.5">,90</span>
            </div>
            <span className="text-sm font-semibold text-white/80 mt-2">por ano — menos de R$ 4/mês</span>
            <span className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 bg-[#25D366]/15 border border-[#25D366]/30 rounded-full text-[11px] font-bold text-[#25D366]">
              Economize 89%
            </span>
          </div>

          <div>
            <CtaButton href="/signup" variant="onDark" metaContentName="oferta_quero_garantir">
              Quero garantir por R$ 47,90/ano
            </CtaButton>
          </div>

          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/85 font-semibold mt-8">
            {OFERTA_HIGHLIGHTS.map((h) => (
              <li key={h} className="inline-flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" /> {h}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-[#0B1B2E]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-5 text-white">
            Enquanto você pensa, seu próximo cliente continua procurando.
          </h2>
          <p className="text-sm sm:text-base text-white/65 leading-relaxed mb-2">
            Não espere ter dezenas de imóveis, milhares de seguidores ou uma grande imobiliária para começar.
          </p>
          <p className="text-sm sm:text-base text-white/65 leading-relaxed mb-8">
            Comece com o que você tem hoje. Crie sua presença profissional na internet e esteja pronto quando o
            próximo cliente procurar por você.
          </p>
          <CtaButton href="/signup" variant="onDark" metaContentName="cta_final_criar_gratis">
            Criar meu site grátis
          </CtaButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-[#DEE2E7]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo variant="light" iconClassName="w-5 h-5" textClassName="text-sm" />
          <div className="flex items-center gap-5 text-xs text-[#68707C]">
            <Link href="/signup" className="hover:text-[#15263A] transition-colors">
              Criar conta
            </Link>
            <Link href="/signup?mode=login" className="hover:text-[#15263A] transition-colors">
              Entrar
            </Link>
            <Link href="/termos" className="hover:text-[#15263A] transition-colors">
              Termos de Uso
            </Link>
            <Link href="/privacidade" className="hover:text-[#15263A] transition-colors">
              Privacidade
            </Link>
          </div>
        </div>
      </footer>

      <SupportChatWidget />
    </div>
  );
}

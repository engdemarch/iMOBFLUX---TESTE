import Link from 'next/link';
import {
  ArrowRight,
  Check,
  Globe,
  LayoutDashboard,
  Palette,
  Rocket,
  ShieldCheck,
  Smartphone,
  Star,
  UserPlus,
  Users,
  Zap
} from 'lucide-react';
import { LiveDemoShowcase } from '@/components/templates/LiveDemoShowcase';
import { Logo } from '@/components/Logo';

const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost';

const STEPS = [
  {
    icon: UserPlus,
    title: 'Crie sua conta',
    text: 'Escolha o endereço do seu site e cadastre-se em menos de 2 minutos. 7 dias grátis, sem compromisso.'
  },
  {
    icon: Palette,
    title: 'Personalize seu site',
    text: 'Adicione seu logo, suas cores, fotos e dados de contato. Cadastre seus imóveis com fotos, preço e descrição.'
  },
  {
    icon: Rocket,
    title: 'Comece a vender',
    text: `Compartilhe seunome.${rootDomain} nas redes sociais e anúncios. Seus clientes navegam, filtram e te chamam no WhatsApp.`
  }
];

const ADVANTAGES = [
  {
    icon: Zap,
    title: 'No ar em minutos',
    text: 'Sem programador, sem designer. Você mesmo monta e atualiza seu site pelo painel, sem depender de ninguém.'
  },
  {
    icon: Globe,
    title: 'Seu endereço, sua marca',
    text: 'Um site só seu, com seu nome e sua identidade — não é uma página perdida em um portal genérico de imóveis.'
  },
  {
    icon: LayoutDashboard,
    title: 'Painel completo de gestão',
    text: 'Cadastre imóveis, depoimentos e sua equipe de corretores. Tudo organizado em um só lugar, atualizado na hora.'
  },
  {
    icon: Smartphone,
    title: 'Feito para o WhatsApp',
    text: 'Cada imóvel tem um botão direto pro WhatsApp — o cliente interessado fala com você sem fricção nenhuma.'
  },
  {
    icon: ShieldCheck,
    title: 'Sem fidelidade',
    text: 'Assinatura mensal, cancele quando quiser pelo próprio painel. Sem multa, sem letra miúda.'
  },
  {
    icon: Users,
    title: 'Para corretores e imobiliárias',
    text: 'Funciona tanto pra quem atua sozinho quanto pra equipes — cadastre todos os corretores do seu time.'
  }
];

// Mockups de janela de navegador flutuando no hero, no estilo das referências
// (cartão branco, barra de título com os três pontinhos, imagem do imóvel).
const FLOATING_CARDS = [
  {
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80',
    label: 'Casa de Condomínio',
    meta: '4 quartos · R$ 1.280.000',
    className: 'hidden 2xl:block left-0 top-6 -rotate-6'
  },
  {
    img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80',
    label: 'Apartamento',
    meta: '2 quartos · R$ 410.000',
    className: 'hidden 2xl:block right-0 top-2 rotate-6'
  },
  {
    img: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=400&q=80',
    label: 'Casa Térrea',
    meta: '3 quartos · R$ 620.000',
    className: 'hidden 2xl:block left-10 bottom-4 rotate-3'
  }
];

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-[#F2F4F6] text-[#15263A] overflow-x-hidden">
      {/* Nav */}
      <header className="sticky top-0 z-30 bg-[#081527]/85 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Logo variant="dark" iconClassName="w-6 h-6" textClassName="text-base" />
          <nav className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/signup?mode=login"
              className="px-3.5 sm:px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white/80 hover:text-white transition-colors"
            >
              Entrar
            </Link>
            <Link
              href="/signup"
              className="px-3.5 sm:px-4 py-2.5 bg-[#5B8DEF] hover:bg-[#4A7CE0] text-white text-xs font-semibold uppercase tracking-wider rounded-[2px] transition-colors"
            >
              Criar minha conta
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero — fundo escuro com glow, igual à referência */}
      <section className="relative bg-[#081527] overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -z-0 top-[-260px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full opacity-60 blur-3xl"
          style={{ background: 'radial-gradient(circle, #2A5FD9 0%, #14275C 45%, transparent 72%)' }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -z-0 bottom-[-200px] right-[-100px] w-[500px] h-[500px] rounded-full opacity-40 blur-3xl"
          style={{ background: 'radial-gradient(circle, #5B8DEF 0%, transparent 70%)' }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-24 sm:pt-24 sm:pb-32 text-center">
          {FLOATING_CARDS.map((card) => (
            <div
              key={card.label}
              className={`absolute w-40 rounded-[8px] overflow-hidden shadow-2xl bg-white z-0 ${card.className}`}
            >
              <div className="h-5 bg-[#F2F4F6] border-b border-[#DEE2E7] flex items-center gap-1 px-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5F57]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#FEBC2E]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#28C840]" />
              </div>
              <img src={card.img} alt="" className="w-full h-20 object-cover" />
              <div className="px-2.5 py-2">
                <p className="text-[10px] font-bold text-[#15263A] truncate">{card.label}</p>
                <p className="text-[9px] text-[#68707C] truncate">{card.meta}</p>
              </div>
            </div>
          ))}

          {/* Mockup de celular flutuando, mostrando a tela do produto */}
          <div className="hidden 2xl:block absolute right-6 bottom-0 w-32 rotate-3 z-0">
            <div className="rounded-[20px] border-[3px] border-[#0B1B2E] bg-[#081527] shadow-2xl overflow-hidden">
              <div className="relative bg-white" style={{ aspectRatio: '9 / 18.5' }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-2.5 bg-[#0B1B2E] rounded-b-md z-10" />
                <div className="pt-4 px-1.5 flex flex-col h-full">
                  <p className="text-[7px] font-bold text-[#0F3D5C] mb-1 px-0.5">ImobFlux</p>
                  <img
                    src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=300&q=80"
                    alt=""
                    className="w-full h-16 object-cover rounded-[3px]"
                  />
                  <p className="text-[6.5px] font-semibold text-[#15263A] mt-1 px-0.5">Apartamento c/ Vista Livre</p>
                  <p className="text-[7px] font-bold text-[#0F3D5C] px-0.5">R$ 410.000</p>
                  <div className="mt-auto mb-2 mx-0.5 bg-[#25D366] text-white text-[6px] font-bold text-center py-1 rounded-[3px]">
                    FALAR NO WHATSAPP
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 mb-6 bg-white/10 border border-white/15 rounded-full text-[11px] font-semibold uppercase tracking-wider text-[#8FB1F7]">
              <Star className="w-3.5 h-3.5 fill-[#8FB1F7]" />
              7 dias grátis para testar
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold mb-6 leading-tight text-white">
              Seu próprio site de imóveis, no ar em minutos
            </h1>
            <p className="text-base sm:text-lg text-white/65 max-w-xl mx-auto mb-10">
              Catálogo de imóveis, painel de gestão completo e um endereço só seu —{' '}
              <span className="font-semibold text-white">seunome.{rootDomain}</span> — pra você vender mais sem
              depender de portal nenhum.
            </p>
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/signup"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#5B8DEF] hover:bg-[#4A7CE0] text-white text-xs font-semibold uppercase tracking-wider rounded-[2px] transition-colors shadow-[0_0_30px_-5px_#5B8DEF]"
            >
              Criar minha conta grátis
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#como-funciona"
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 bg-white/5 border border-white/20 hover:border-white/40 text-white text-xs font-semibold uppercase tracking-wider rounded-[2px] transition-colors"
            >
              Ver como funciona
            </a>
          </div>
          <p className="text-[11px] text-white/50 mt-4">
            R$ 37,90/mês depois do teste grátis. Cancele quando quiser, sem multa.
          </p>
        </div>
      </section>

      {/* Demo ao vivo */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 py-20 sm:py-28">
        <LiveDemoShowcase />
      </section>

      {/* Como funciona */}
      <section id="como-funciona" className="bg-white border-y border-[#DEE2E7]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center max-w-xl mx-auto mb-14">
            <div className="text-xs font-semibold tracking-[0.12em] uppercase text-[#0F3D5C] mb-2">
              Como funciona
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold">Do zero ao site no ar em três passos</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-8 sm:gap-6">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="relative text-center sm:text-left">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-[#F2F4F6] border border-[#DEE2E7] rounded-full text-[#0F3D5C] mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-[11px] font-bold tracking-wider uppercase text-[#68707C] mb-1">
                    Passo {i + 1}
                  </div>
                  <h3 className="text-lg font-bold text-[#15263A] mb-2">{step.title}</h3>
                  <p className="text-sm text-[#68707C] leading-relaxed">{step.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Vantagens */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="text-xs font-semibold tracking-[0.12em] uppercase text-[#0F3D5C] mb-2">
            Por que ImobFlux
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold">Feito pra corretor vender, não pra mexer com tecnologia</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ADVANTAGES.map((adv) => {
            const Icon = adv.icon;
            return (
              <div
                key={adv.title}
                className="bg-white border border-[#DEE2E7] p-6 rounded-[2px] hover:border-[#0F3D5C] hover:-translate-y-1 hover:shadow-md transition-all duration-200"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 bg-[#F2F4F6] rounded-full text-[#0F3D5C] mb-4">
                  <Icon className="w-4.5 h-4.5" />
                </div>
                <h3 className="text-sm font-bold text-[#15263A] mb-1.5">{adv.title}</h3>
                <p className="text-xs text-[#68707C] leading-relaxed">{adv.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Pricing / CTA final — escuro com glow, ecoa o hero */}
      <section className="relative bg-[#081527] overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-50 blur-3xl"
          style={{ background: 'radial-gradient(circle, #2A5FD9 0%, transparent 70%)' }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-white">Comece grátis hoje mesmo</h2>
          <p className="text-sm sm:text-base text-white/65 max-w-md mx-auto mb-8">
            7 dias de teste completo, sem cobrança. Depois, R$ 37,90/mês — cancele quando quiser, direto pelo painel.
          </p>
          <div className="inline-flex flex-col items-center gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#5B8DEF] hover:bg-[#4A7CE0] text-white text-xs font-semibold uppercase tracking-wider rounded-[2px] transition-colors shadow-[0_0_30px_-5px_#5B8DEF]"
            >
              Criar minha conta grátis
              <ArrowRight className="w-4 h-4" />
            </Link>
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/60">
              <li className="inline-flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" /> Sem cartão travado
              </li>
              <li className="inline-flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" /> Sem fidelidade
              </li>
              <li className="inline-flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" /> Suporte direto com o time
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#081527]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo variant="dark" iconClassName="w-5 h-5" textClassName="text-sm" />
          <div className="flex items-center gap-5 text-xs text-white/50">
            <Link href="/signup" className="hover:text-white transition-colors">
              Criar conta
            </Link>
            <Link href="/signup?mode=login" className="hover:text-white transition-colors">
              Entrar
            </Link>
            <Link href="/termos" className="hover:text-white transition-colors">
              Termos de Uso
            </Link>
            <Link href="/privacidade" className="hover:text-white transition-colors">
              Privacidade
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

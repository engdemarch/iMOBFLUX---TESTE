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
import { TEMPLATES } from '@/lib/templates';

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

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-[#F2F4F6] text-[#15263A]">
      {/* Nav */}
      <header className="sticky top-0 z-30 bg-[#F2F4F6]/90 backdrop-blur-sm border-b border-[#DEE2E7]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="text-sm font-bold tracking-[0.12em] uppercase text-[#0F3D5C]">
            ImobFlux
          </div>
          <nav className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/signup?mode=login"
              className="px-3.5 sm:px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#0F3D5C] hover:text-[#0B2C44] transition-colors"
            >
              Entrar
            </Link>
            <Link
              href="/signup"
              className="px-3.5 sm:px-4 py-2.5 bg-[#0F3D5C] hover:bg-[#0B2C44] text-white text-xs font-semibold uppercase tracking-wider rounded-[2px] transition-colors"
            >
              Criar minha conta
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-20 sm:pt-24 sm:pb-28 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 mb-6 bg-white border border-[#DEE2E7] rounded-full text-[11px] font-semibold uppercase tracking-wider text-[#0F3D5C]">
          <Star className="w-3.5 h-3.5 fill-[#0F3D5C]" />
          7 dias grátis para testar
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold max-w-3xl mx-auto mb-6 leading-tight">
          Seu próprio site de imóveis, no ar em minutos
        </h1>
        <p className="text-base sm:text-lg text-[#68707C] max-w-xl mx-auto mb-10">
          Catálogo de imóveis, painel de gestão completo e um endereço só seu —{' '}
          <span className="font-semibold text-[#15263A]">seunome.{rootDomain}</span> — pra você vender mais sem
          depender de portal nenhum.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#0F3D5C] hover:bg-[#0B2C44] text-white text-xs font-semibold uppercase tracking-wider rounded-[2px] transition-colors"
          >
            Criar minha conta grátis
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#como-funciona"
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 bg-white border border-[#DEE2E7] hover:border-[#0F3D5C] text-[#15263A] text-xs font-semibold uppercase tracking-wider rounded-[2px] transition-colors"
          >
            Ver como funciona
          </a>
        </div>
        <p className="text-[11px] text-[#68707C] mt-4">
          R$ 97/mês depois do teste grátis. Cancele quando quiser, sem multa.
        </p>
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

      {/* Templates */}
      <section className="bg-white border-y border-[#DEE2E7]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center max-w-xl mx-auto mb-14">
            <div className="text-xs font-semibold tracking-[0.12em] uppercase text-[#0F3D5C] mb-2">
              Escolha o visual
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Comece com o template que combina com você</h2>
            <p className="text-sm text-[#68707C]">
              Você escolhe no cadastro — dá pra trocar depois. Mais opções chegando em breve.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {TEMPLATES.map((t) => (
              <div key={t.id} className="text-left">
                {/* Browser chrome mockup */}
                <div className="border border-[#DEE2E7] rounded-[6px] overflow-hidden shadow-sm bg-white">
                  <div className="h-8 bg-[#F2F4F6] border-b border-[#DEE2E7] flex items-center gap-1.5 px-3">
                    <span className="w-2 h-2 rounded-full bg-[#DEE2E7]" />
                    <span className="w-2 h-2 rounded-full bg-[#DEE2E7]" />
                    <span className="w-2 h-2 rounded-full bg-[#DEE2E7]" />
                  </div>

                  {t.id === 'classico' ? (
                    <div style={{ background: t.primaryDark }} className="aspect-[16/10] flex flex-col justify-end p-4 gap-2">
                      <div className="w-1/2 h-2 rounded-full bg-white/30" />
                      <div className="w-3/4 h-3 rounded-full bg-white/70" />
                      <div className="w-2/3 h-3 rounded-full bg-white/70" />
                      <div className="flex gap-1.5 mt-2">
                        <div className="flex-1 h-10 rounded-[2px] bg-white/15" />
                        <div className="flex-1 h-10 rounded-[2px] bg-white/15" />
                        <div className="flex-1 h-10 rounded-[2px] bg-white/15" />
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-[16/10] bg-[#F4F6F8] flex items-center gap-3 p-4">
                      <div className="flex-1 space-y-2">
                        <div className="w-4/5 h-2.5 rounded-full" style={{ background: `${t.primary}33` }} />
                        <div className="w-full h-3.5 rounded-full bg-[#D9DEE3]" />
                        <div className="w-3/4 h-3.5 rounded-full bg-[#D9DEE3]" />
                        <div
                          className="mt-2 w-20 h-6 rounded-full"
                          style={{ background: t.primary }}
                        />
                      </div>
                      <div className="flex-1 h-full rounded-2xl" style={{ background: `${t.primary}55` }} />
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2.5 mt-4">
                  <span
                    className="w-6 h-6 rounded-full shrink-0"
                    style={{ background: `linear-gradient(135deg, ${t.primary}, ${t.primaryDark})` }}
                  />
                  <div>
                    <div className="text-sm font-bold text-[#15263A]">{t.nome}</div>
                    <div className="text-xs text-[#68707C]">{t.descricao}</div>
                  </div>
                </div>
              </div>
            ))}
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
                className="bg-white border border-[#DEE2E7] p-6 rounded-[2px] hover:border-[#0F3D5C] transition-colors"
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

      {/* Pricing / CTA final */}
      <section className="bg-[#0F3D5C] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Comece grátis hoje mesmo</h2>
          <p className="text-sm sm:text-base text-white/75 max-w-md mx-auto mb-8">
            7 dias de teste completo, sem cobrança. Depois, R$ 97/mês — cancele quando quiser, direto pelo painel.
          </p>
          <div className="inline-flex flex-col items-center gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white hover:bg-[#F2F4F6] text-[#0F3D5C] text-xs font-semibold uppercase tracking-wider rounded-[2px] transition-colors"
            >
              Criar minha conta grátis
              <ArrowRight className="w-4 h-4" />
            </Link>
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/75">
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
      <footer className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs font-semibold tracking-[0.12em] uppercase text-[#0F3D5C]">
          ImobFlux
        </div>
        <div className="flex items-center gap-5 text-xs text-[#68707C]">
          <Link href="/signup" className="hover:text-[#15263A] transition-colors">
            Criar conta
          </Link>
          <Link href="/signup?mode=login" className="hover:text-[#15263A] transition-colors">
            Entrar
          </Link>
        </div>
      </footer>
    </div>
  );
}

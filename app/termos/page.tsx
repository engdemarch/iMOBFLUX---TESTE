import Link from 'next/link';

export const metadata = {
  title: 'Termos de Uso — ImobFlux'
};

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-[#F2F4F6] text-[#15263A]">
      <header className="sticky top-0 z-30 bg-[#F2F4F6]/90 backdrop-blur-sm border-b border-[#DEE2E7]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/marketing" className="text-sm font-bold tracking-[0.12em] uppercase text-[#0F3D5C]">
            ImobFlux
          </Link>
          <Link href="/signup" className="text-xs font-semibold text-[#0F3D5C] hover:underline">
            Criar conta
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Termos de Uso</h1>
        <p className="text-xs text-[#68707C] mb-10">Última atualização: 1 de setembro de 2026.</p>

        <div className="space-y-8 text-sm leading-relaxed text-[#15263A]">
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#0F3D5C] mb-2">1. Sobre o ImobFlux</h2>
            <p>
              O ImobFlux é uma plataforma que permite a corretores e imobiliárias criar e gerenciar um site próprio
              de catálogo de imóveis, hospedado em um subdomínio individual (<code>seunome.{'{'}dominio{'}'}</code>),
              mediante assinatura paga. Estes Termos regulam o uso da plataforma pelo assinante (&quot;você&quot;,
              &quot;corretor&quot;) e são operados por Gustavo Marcos De March, CPF 098.311.319-08, com endereço na Rua
              da República, 80, Bairro Comerciário, Criciúma/SC. Contato: eng.demarch@gmail.com.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#0F3D5C] mb-2">2. Cadastro e conta</h2>
            <p>
              Para assinar, você deve fornecer nome completo, CPF, e-mail e senha válidos e verdadeiros. Você é
              responsável por manter a confidencialidade da sua senha e por todas as atividades realizadas na sua
              conta. O endereço (slug) do seu site é escolhido por você no cadastro e fica vinculado à sua conta
              enquanto a assinatura estiver ativa.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#0F3D5C] mb-2">3. Assinatura, cobrança e teste grátis</h2>
            <p className="mb-2">
              O acesso ao ImobFlux é vendido por assinatura mensal recorrente, atualmente R$ 97/mês. Novas contas
              têm direito a 7 dias de teste gratuito; o cartão informado no cadastro só é cobrado ao fim do período
              de teste, salvo cancelamento anterior.
            </p>
            <p className="mb-2">
              A cobrança é processada por um terceiro (Stripe). O ImobFlux não armazena dados completos de cartão de
              crédito.
            </p>
            <p>
              Você pode cancelar a assinatura a qualquer momento, sem multa e sem fidelidade, diretamente pelo painel
              do corretor (aba &quot;Assinatura&quot; → &quot;Gerenciar assinatura&quot;). O cancelamento interrompe
              cobranças futuras; valores já pagos referentes ao período em curso não são reembolsados, salvo
              disposição legal em contrário.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#0F3D5C] mb-2">4. Suspensão por inadimplência</h2>
            <p>
              Caso um pagamento falhe ou a assinatura seja cancelada, o site público associado à sua conta fica
              indisponível para visitantes. O acesso ao painel do corretor permanece disponível para que você possa
              regularizar o pagamento ou exportar/gerenciar suas informações.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#0F3D5C] mb-2">5. Conteúdo publicado por você</h2>
            <p>
              Você é o único responsável pelos imóveis, fotos, descrições, depoimentos e demais conteúdos que
              cadastrar no seu site, e declara possuir os direitos necessários sobre esse conteúdo (por exemplo,
              autorização para uso das fotos dos imóveis anunciados). É proibido publicar conteúdo ilegal, enganoso,
              ou que viole direitos de terceiros. O ImobFlux pode remover conteúdo ou suspender contas que violem
              este Termo.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#0F3D5C] mb-2">6. Disponibilidade do serviço</h2>
            <p>
              Envidamos esforços para manter a plataforma disponível, mas não garantimos operação ininterrupta ou
              livre de erros. Manutenções, falhas de terceiros (hospedagem, provedores de pagamento) ou casos
              fortuitos podem causar indisponibilidade temporária.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#0F3D5C] mb-2">7. Limitação de responsabilidade</h2>
            <p>
              O ImobFlux é uma ferramenta de publicação de site; não somos parte, corretores, nem intermediários das
              negociações imobiliárias realizadas entre você e seus clientes, e não respondemos por elas. Na máxima
              extensão permitida em lei, nossa responsabilidade se limita ao valor pago pela assinatura nos últimos
              12 meses.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#0F3D5C] mb-2">8. Encerramento de conta</h2>
            <p>
              Você pode encerrar sua conta a qualquer momento cancelando a assinatura. Podemos suspender ou encerrar
              contas que violem estes Termos, mediante aviso prévio quando possível.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#0F3D5C] mb-2">9. Alterações destes Termos</h2>
            <p>
              Podemos atualizar estes Termos periodicamente. Mudanças relevantes serão comunicadas por e-mail ou
              aviso na plataforma. O uso contínuo do ImobFlux após a alteração implica aceite dos novos termos.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#0F3D5C] mb-2">10. Lei aplicável</h2>
            <p>
              Estes Termos são regidos pelas leis brasileiras. Fica eleito o foro do domicílio do responsável pelo
              ImobFlux para dirimir eventuais controvérsias, salvo disposição legal em contrário.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#0F3D5C] mb-2">11. Contato</h2>
            <p>
              Dúvidas sobre estes Termos: eng.demarch@gmail.com.
            </p>
          </section>
        </div>

        <p className="mt-12 text-[11px] text-[#68707C] border-t border-[#DEE2E7] pt-6">
          Consulte também nossa{' '}
          <Link href="/privacidade" className="text-[#0F3D5C] hover:underline">
            Política de Privacidade
          </Link>
          .
        </p>
      </main>
    </div>
  );
}

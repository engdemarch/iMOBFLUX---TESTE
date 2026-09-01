import Link from 'next/link';

export const metadata = {
  title: 'Política de Privacidade — ImobFlux'
};

export default function PrivacidadePage() {
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
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Política de Privacidade</h1>
        <p className="text-xs text-[#68707C] mb-10">Última atualização: 1 de setembro de 2026.</p>

        <div className="space-y-8 text-sm leading-relaxed text-[#15263A]">
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#0F3D5C] mb-2">1. Quem controla seus dados</h2>
            <p>
              Esta Política descreve como o ImobFlux coleta, usa e protege dados pessoais de corretores/assinantes
              (&quot;você&quot;) e dos visitantes dos sites hospedados na plataforma, em conformidade com a Lei Geral
              de Proteção de Dados (Lei 13.709/2018 — LGPD). O controlador dos dados é Gustavo Marcos De March,
              CPF 098.311.319-08, com endereço na Rua da República, 80, Bairro Comerciário, Criciúma/SC. Contato
              para questões de privacidade: eng.demarch@gmail.com.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#0F3D5C] mb-2">2. Dados que coletamos</h2>
            <p className="mb-2"><span className="font-semibold">Do corretor/assinante, no cadastro e uso do painel:</span> nome completo, CPF, e-mail, senha (armazenada de forma criptografada pelo provedor de autenticação), endereço do site escolhido, e os dados que você cadastra sobre seu negócio (imóveis, fotos, depoimentos, dados de contato, corretores da equipe).</p>
            <p className="mb-2"><span className="font-semibold">Dados de pagamento:</span> o número do cartão e demais dados sensíveis de pagamento são inseridos diretamente na Stripe (nosso processador de pagamentos) e nunca trafegam pelos nossos servidores. Armazenamos apenas identificadores de cliente/assinatura na Stripe e o status da assinatura.</p>
            <p><span className="font-semibold">Dos visitantes do seu site:</span> os dados de navegação e, quando o visitante opta por contato via WhatsApp ou formulário, os dados que ele mesmo informa (nome, telefone, mensagem). Esses dados são tratados sob sua responsabilidade como corretor, para o único fim de viabilizar o contato comercial.</p>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#0F3D5C] mb-2">3. Para que usamos seus dados</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Criar e autenticar sua conta, e manter o isolamento dos dados entre diferentes corretores;</li>
              <li>Processar a assinatura, cobrança e emissão de recibos (o CPF é usado para essa finalidade fiscal/de faturamento);</li>
              <li>Operar e exibir o site que você configura no subdomínio escolhido;</li>
              <li>Comunicar avisos de serviço (cobrança, problemas na conta, mudanças nestes termos);</li>
              <li>Prevenir fraude e cumprir obrigações legais.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#0F3D5C] mb-2">4. Com quem compartilhamos</h2>
            <p className="mb-2">Não vendemos dados pessoais. Compartilhamos dados apenas com prestadores de serviço estritamente necessários para operar a plataforma (operadores, nos termos da LGPD):</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="font-semibold">Supabase</span> — banco de dados, autenticação e armazenamento de imagens;</li>
              <li><span className="font-semibold">Stripe</span> — processamento de pagamentos e cobrança recorrente;</li>
              <li><span className="font-semibold">Vercel</span> — hospedagem da aplicação.</li>
            </ul>
            <p className="mt-2">Esses prestadores só acessam os dados na medida necessária para prestar o serviço contratado.</p>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#0F3D5C] mb-2">5. Por quanto tempo guardamos os dados</h2>
            <p>
              Mantemos seus dados enquanto a conta estiver ativa. Após o cancelamento da assinatura, os dados podem
              ser mantidos por um período adicional para cumprimento de obrigações legais (por exemplo, fiscais) ou
              resolução de disputas, e depois excluídos ou anonimizados.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#0F3D5C] mb-2">6. Seus direitos</h2>
            <p className="mb-2">Nos termos da LGPD, você pode solicitar, a qualquer momento:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Confirmação de que tratamos seus dados, e acesso a eles;</li>
              <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
              <li>Anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade com a lei;</li>
              <li>Portabilidade dos dados a outro fornecedor;</li>
              <li>Eliminação dos dados tratados com base no seu consentimento;</li>
              <li>Revogação do consentimento, quando aplicável.</li>
            </ul>
            <p className="mt-2">
              Para exercer esses direitos, entre em contato pelo e-mail eng.demarch@gmail.com.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#0F3D5C] mb-2">7. Segurança</h2>
            <p>
              Adotamos medidas técnicas e administrativas para proteger seus dados, incluindo controle de acesso por
              conta (isolamento entre corretores no banco de dados), conexões criptografadas (HTTPS) e senhas
              armazenadas de forma criptografada. Nenhum sistema é 100% livre de risco; caso identifiquemos um
              incidente de segurança relevante, notificaremos conforme exigido pela LGPD.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#0F3D5C] mb-2">8. Cookies</h2>
            <p>
              Usamos cookies essenciais para manter sua sessão autenticada no painel do corretor. Não utilizamos
              cookies de rastreamento publicitário próprios; se ferramentas de análise forem adicionadas no futuro,
              esta Política será atualizada.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#0F3D5C] mb-2">9. Alterações desta Política</h2>
            <p>
              Podemos atualizar esta Política periodicamente. A versão vigente é sempre a publicada nesta página, com
              a data de atualização indicada no topo.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#0F3D5C] mb-2">10. Contato</h2>
            <p>
              Dúvidas ou solicitações sobre seus dados pessoais: eng.demarch@gmail.com.
            </p>
          </section>
        </div>

        <p className="mt-12 text-[11px] text-[#68707C] border-t border-[#DEE2E7] pt-6">
          Consulte também nossos{' '}
          <Link href="/termos" className="text-[#0F3D5C] hover:underline">
            Termos de Uso
          </Link>
          .
        </p>
      </main>
    </div>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { isSlugFormatValid, isSlugReserved } from '@/lib/host';

// Fase 3: o cadastro não grava mais o tenant direto do navegador — depois de
// criar a conta no Supabase Auth, o usuário é enviado pro Checkout do Stripe;
// o tenant só é criado pelo webhook (app/api/stripe/webhook) quando o
// pagamento (ou início do período de teste) é confirmado. Exige que "Confirm
// email" esteja desativado nas configurações de Auth do Supabase (Authentication
// > Providers > Email), senão signUp() não retorna sessão ativa e a chamada a
// /api/checkout abaixo falha por falta de sessão.
export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [slug, setSlug] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [resumeMode, setResumeMode] = useState(false);

  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost';
  const normalizedSlug = slug.trim().toLowerCase();

  // Retomada de cadastro abandonado: se já existe sessão mas nenhum tenant
  // associado a ela, o usuário fechou a aba do Stripe no meio do caminho.
  useEffect(() => {
    if (window.location.search.includes('canceled=1')) {
      setInfo('Pagamento cancelado. Você pode tentar novamente quando quiser.');
    }

    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        setCheckingSession(false);
        return;
      }

      const { data: tenant } = await supabase
        .from('tenants')
        .select('slug')
        .eq('owner_user_id', session.user.id)
        .maybeSingle();

      if (tenant?.slug) {
        const port = window.location.port ? `:${window.location.port}` : '';
        window.location.href = `${window.location.protocol}//${tenant.slug}.${rootDomain}${port}`;
        return;
      }

      const meta = session.user.user_metadata as { pending_slug?: string; pending_business_name?: string };
      if (meta?.pending_slug) {
        setSlug(meta.pending_slug);
        setBusinessName(meta.pending_business_name || '');
        setEmail(session.user.email || '');
        setResumeMode(true);
      }
      setCheckingSession(false);
    })();
  }, [rootDomain]);

  const goToCheckout = async () => {
    setError('');
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      setError('Sessão expirada. Recarregue a página e tente novamente.');
      return;
    }

    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.access_token}` },
      body: JSON.stringify({ slug: normalizedSlug, businessName: businessName.trim() })
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Não foi possível iniciar o pagamento. Tente novamente.');
      return;
    }
    window.location.href = data.url;
  };

  const handleResumeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await goToCheckout();
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isSlugFormatValid(normalizedSlug)) {
      setError('Endereço inválido. Use apenas letras minúsculas, números e hífen (3 a 63 caracteres).');
      return;
    }
    if (isSlugReserved(normalizedSlug)) {
      setError('Esse endereço não está disponível. Escolha outro.');
      return;
    }

    setLoading(true);
    try {
      const { data: existing } = await supabase
        .from('tenants_public')
        .select('id')
        .eq('slug', normalizedSlug)
        .maybeSingle();
      if (existing) {
        setError('Esse endereço já está em uso. Escolha outro.');
        return;
      }

      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: { data: { pending_slug: normalizedSlug, pending_business_name: businessName.trim() } }
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }
      if (!signUpData.session) {
        setError('Cadastro criado, mas é preciso confirmar o e-mail antes de continuar. Verifique sua caixa de entrada.');
        return;
      }

      await goToCheckout();
    } finally {
      setLoading(false);
    }
  };

  if (checkingSession) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2F4F6] px-4 py-10">
      <div className="w-full max-w-[440px] bg-white border border-[#DEE2E7] p-8 rounded-[2px]">
        <div className="text-xs font-semibold tracking-[0.12em] uppercase text-[#0F3D5C] mb-1">
          ImobFlux
        </div>
        <h1 className="text-2xl font-bold text-[#15263A] mb-6">
          {resumeMode ? 'Finalizar cadastro' : 'Criar minha conta'}
        </h1>

        {info && !error && (
          <div className="p-3 mb-5 text-xs font-medium text-[#0F3D5C] bg-[#F2F4F6] border border-[#DEE2E7] rounded-[2px]">
            {info}
          </div>
        )}

        {error && (
          <div className="p-3 mb-5 text-xs font-medium text-[#A8452F] bg-[#F7EAE6] border border-[#E4C3B9] rounded-[2px]">
            {error}
          </div>
        )}

        {resumeMode ? (
          <div className="space-y-4">
            <p className="text-sm text-[#68707C]">
              Seu cadastro para <span className="font-semibold text-[#15263A]">{businessName}</span> ainda não foi
              concluído. Finalize o pagamento pra ativar seu site em{' '}
              <span className="font-medium">{normalizedSlug}.{rootDomain}</span>.
            </p>
            <form onSubmit={handleResumeSubmit}>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#0F3D5C] hover:bg-[#0B2C44] disabled:opacity-50 text-white text-xs font-semibold uppercase tracking-wider rounded-[2px] transition-colors"
              >
                {loading ? 'Redirecionando...' : 'Continuar para o pagamento'}
              </button>
            </form>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold tracking-wider uppercase text-[#68707C] mb-1.5">
                Nome do negócio
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Ex: João Silva Imóveis"
                required
                className="w-full px-3.5 py-2.5 bg-[#F2F4F6] border border-[#DEE2E7] rounded-[2px] text-sm text-[#15263A] focus:outline-none focus:bg-white focus:border-[#0F3D5C]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-wider uppercase text-[#68707C] mb-1.5">
                Endereço do seu site
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="joaosilva"
                required
                className="w-full px-3.5 py-2.5 bg-[#F2F4F6] border border-[#DEE2E7] rounded-[2px] text-sm text-[#15263A] focus:outline-none focus:bg-white focus:border-[#0F3D5C]"
              />
              {normalizedSlug && (
                <p className="text-[11px] text-[#68707C] mt-1">
                  Seu site: <span className="font-medium">{normalizedSlug}.{rootDomain}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-wider uppercase text-[#68707C] mb-1.5">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="voce@exemplo.com.br"
                required
                className="w-full px-3.5 py-2.5 bg-[#F2F4F6] border border-[#DEE2E7] rounded-[2px] text-sm text-[#15263A] focus:outline-none focus:bg-white focus:border-[#0F3D5C]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-wider uppercase text-[#68707C] mb-1.5">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                required
                minLength={6}
                className="w-full px-3.5 py-2.5 bg-[#F2F4F6] border border-[#DEE2E7] rounded-[2px] text-sm text-[#15263A] focus:outline-none focus:bg-white focus:border-[#0F3D5C]"
              />
            </div>

            <p className="text-[11px] text-[#68707C]">
              7 dias grátis, depois R$ 97/mês. Cartão solicitado no próximo passo, sem cobrança durante o teste.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#0F3D5C] hover:bg-[#0B2C44] disabled:opacity-50 text-white text-xs font-semibold uppercase tracking-wider rounded-[2px] transition-colors mt-2"
            >
              {loading ? 'Redirecionando...' : 'Continuar para o pagamento'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { isSlugFormatValid, isSlugReserved } from '@/lib/host';
import { PasswordInput } from '@/components/PasswordInput';
import { formatCpf, isValidCpf } from '@/lib/brasil';

// Fase 3: o cadastro não grava mais o tenant direto do navegador — depois de
// criar a conta no Supabase Auth, o usuário é enviado pro Checkout do Stripe;
// o tenant só é criado pelo webhook (app/api/stripe/webhook) quando o
// pagamento (ou início do período de teste) é confirmado. Se "Confirm email"
// estiver ativo nas configurações de Auth do Supabase, signUp() não retorna
// sessão ativa (tratado abaixo) — o link do e-mail de confirmação usa
// emailRedirectTo para trazer o usuário de volta pra cá, onde routeSession()
// retoma o cadastro pendente (pending_slug) e segue pro checkout.

type Mode = 'signup' | 'login' | 'forgot';

export default function SignupPage() {
  const [mode, setMode] = useState<Mode>('signup');

  // Cadastro
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [slug, setSlug] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [cpf, setCpf] = useState('');

  // Login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Recuperação de senha
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [resumeMode, setResumeMode] = useState(false);

  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost';
  const normalizedSlug = slug.trim().toLowerCase();

  const redirectToTenant = (tenantSlug: string) => {
    const port = window.location.port ? `:${window.location.port}` : '';
    // ?panel=1: abre direto no painel do corretor em vez do site público —
    // ver app/page.tsx, que detecta esse parâmetro e chama setBrokerModalOpen.
    window.location.href = `${window.location.protocol}//${tenantSlug}.${rootDomain}${port}/?panel=1`;
  };

  // Depois de obter uma sessão (login ou cadastro), decide pra onde mandar o
  // usuário: já tem site -> redireciona pro subdomínio; pagou mas fechou a
  // aba do Stripe no meio -> retomada; senão, quem chamou segue o próprio fluxo.
  // Retorna true se já tratou o redirecionamento/retomada.
  const routeSession = async (userId: string, userEmail: string | undefined, metadata: Record<string, unknown>) => {
    const { data: tenant } = await supabase
      .from('tenants')
      .select('slug')
      .eq('owner_user_id', userId)
      .maybeSingle();

    if (tenant?.slug) {
      redirectToTenant(tenant.slug);
      return true;
    }

    const meta = metadata as { pending_slug?: string; pending_business_name?: string; pending_cpf?: string };
    if (meta?.pending_slug) {
      setSlug(meta.pending_slug);
      setBusinessName(meta.pending_business_name || '');
      setCpf(meta.pending_cpf || '');
      setEmail(userEmail || '');
      setResumeMode(true);
      return true;
    }

    return false;
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('canceled') === '1') {
      setInfo('Pagamento cancelado. Você pode tentar novamente quando quiser.');
    }
    if (params.get('mode') === 'login') {
      setMode('login');
    }

    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        setCheckingSession(false);
        return;
      }
      await routeSession(session.user.id, session.user.email, session.user.user_metadata);
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
      body: JSON.stringify({ slug: normalizedSlug, businessName: businessName.trim(), cpf: cpf.replace(/\D/g, '') })
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
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    if (!isValidCpf(cpf)) {
      setError('CPF inválido. Confira os números digitados.');
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
        options: {
          data: { pending_slug: normalizedSlug, pending_business_name: businessName.trim(), pending_cpf: cpf.replace(/\D/g, '') },
          emailRedirectTo: `${window.location.origin}/signup`
        }
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

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: loginEmail.trim(),
        password: loginPassword
      });
      if (signInError || !data.session) {
        setError('E-mail ou senha incorretos.');
        return;
      }
      const routed = await routeSession(data.session.user.id, data.session.user.email, data.session.user.user_metadata);
      if (!routed) {
        setError('Não encontramos um site associado a esta conta.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const port = window.location.port ? `:${window.location.port}` : '';
      const redirectTo = `${window.location.protocol}//${rootDomain}${port}/reset-password`;
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(forgotEmail.trim(), { redirectTo });
      if (resetError) {
        setError('Não foi possível enviar o e-mail de recuperação. Tente novamente em instantes.');
        return;
      }
      setForgotSent(true);
    } finally {
      setLoading(false);
    }
  };

  if (checkingSession) return null;

  const title = resumeMode
    ? 'Finalizar cadastro'
    : mode === 'login'
      ? 'Entrar'
      : mode === 'forgot'
        ? 'Recuperar senha'
        : 'Criar minha conta';

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2F4F6] px-4 py-10">
      <div className="w-full max-w-[440px] bg-white border border-[#DEE2E7] p-8 rounded-[2px]">
        <div className="text-xs font-semibold tracking-[0.12em] uppercase text-[#0F3D5C] mb-1">
          ImobFlux
        </div>
        <h1 className="text-2xl font-bold text-[#15263A] mb-6">{title}</h1>

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
        ) : mode === 'forgot' ? (
          <div className="space-y-4">
            {forgotSent ? (
              <p className="text-sm text-[#68707C]">
                Se esse e-mail estiver cadastrado, enviamos um link pra redefinir a senha. Confira sua caixa de
                entrada (e o spam).
              </p>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <p className="text-sm text-[#68707C]">
                  Digite o e-mail da sua conta pra receber um link de redefinição de senha.
                </p>
                <div>
                  <label className="block text-xs font-semibold tracking-wider uppercase text-[#68707C] mb-1.5">
                    E-mail
                  </label>
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="voce@exemplo.com.br"
                    required
                    className="w-full px-3.5 py-2.5 bg-[#F2F4F6] border border-[#DEE2E7] rounded-[2px] text-sm text-[#15263A] focus:outline-none focus:bg-white focus:border-[#0F3D5C]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#0F3D5C] hover:bg-[#0B2C44] disabled:opacity-50 text-white text-xs font-semibold uppercase tracking-wider rounded-[2px] transition-colors"
                >
                  {loading ? 'Enviando...' : 'Enviar link de recuperação'}
                </button>
              </form>
            )}
            <button
              type="button"
              onClick={() => { setMode('login'); setForgotSent(false); setError(''); }}
              className="text-xs text-[#0F3D5C] font-semibold hover:underline"
            >
              ← Voltar para o login
            </button>
          </div>
        ) : mode === 'login' ? (
          <div className="space-y-4">
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold tracking-wider uppercase text-[#68707C] mb-1.5">
                  E-mail
                </label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="voce@exemplo.com.br"
                  required
                  className="w-full px-3.5 py-2.5 bg-[#F2F4F6] border border-[#DEE2E7] rounded-[2px] text-sm text-[#15263A] focus:outline-none focus:bg-white focus:border-[#0F3D5C]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold tracking-wider uppercase text-[#68707C] mb-1.5">
                  Senha
                </label>
                <PasswordInput
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••"
                  required
                  className="w-full px-3.5 py-2.5 bg-[#F2F4F6] border border-[#DEE2E7] rounded-[2px] text-sm text-[#15263A] focus:outline-none focus:bg-white focus:border-[#0F3D5C]"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#0F3D5C] hover:bg-[#0B2C44] disabled:opacity-50 text-white text-xs font-semibold uppercase tracking-wider rounded-[2px] transition-colors mt-2"
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </button>
            </form>
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => { setMode('forgot'); setError(''); }}
                className="text-xs text-[#0F3D5C] font-semibold hover:underline"
              >
                Esqueci minha senha
              </button>
              <button
                type="button"
                onClick={() => { setMode('signup'); setError(''); }}
                className="text-xs text-[#68707C] hover:underline"
              >
                Criar uma conta
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold tracking-wider uppercase text-[#68707C] mb-1.5">
                  Nome completo
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Ex: João Silva"
                  required
                  className="w-full px-3.5 py-2.5 bg-[#F2F4F6] border border-[#DEE2E7] rounded-[2px] text-sm text-[#15263A] focus:outline-none focus:bg-white focus:border-[#0F3D5C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-wider uppercase text-[#68707C] mb-1.5">
                  CPF
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={cpf}
                  onChange={(e) => setCpf(formatCpf(e.target.value))}
                  placeholder="000.000.000-00"
                  required
                  maxLength={14}
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
                <PasswordInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••"
                  required
                  minLength={6}
                  className="w-full px-3.5 py-2.5 bg-[#F2F4F6] border border-[#DEE2E7] rounded-[2px] text-sm text-[#15263A] focus:outline-none focus:bg-white focus:border-[#0F3D5C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-wider uppercase text-[#68707C] mb-1.5">
                  Confirmar senha
                </label>
                <PasswordInput
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••"
                  required
                  minLength={6}
                  className="w-full px-3.5 py-2.5 bg-[#F2F4F6] border border-[#DEE2E7] rounded-[2px] text-sm text-[#15263A] focus:outline-none focus:bg-white focus:border-[#0F3D5C]"
                />
              </div>

              <p className="text-[11px] text-[#68707C]">
                7 dias grátis, depois R$ 97/mês. Cartão solicitado no próximo passo, sem cobrança durante o teste.
              </p>

              <p className="text-[11px] text-[#68707C]">
                Ao continuar, você concorda com os{' '}
                <Link href="/termos" target="_blank" className="text-[#0F3D5C] hover:underline">
                  Termos de Uso
                </Link>{' '}
                e a{' '}
                <Link href="/privacidade" target="_blank" className="text-[#0F3D5C] hover:underline">
                  Política de Privacidade
                </Link>
                .
              </p>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#0F3D5C] hover:bg-[#0B2C44] disabled:opacity-50 text-white text-xs font-semibold uppercase tracking-wider rounded-[2px] transition-colors mt-2"
              >
                {loading ? 'Redirecionando...' : 'Continuar para o pagamento'}
              </button>
            </form>
            <button
              type="button"
              onClick={() => { setMode('login'); setError(''); }}
              className="text-xs text-[#68707C] hover:underline"
            >
              Já tem uma conta? <span className="text-[#0F3D5C] font-semibold">Entrar</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

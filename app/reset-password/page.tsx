'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { PasswordInput } from '@/components/PasswordInput';

// Página de destino do link de "esqueci minha senha" (ver resetPasswordForEmail
// em app/signup/page.tsx e components/BrokerModal.tsx). O supabase-js detecta
// o token de recuperação na URL automaticamente e cria uma sessão temporária,
// que só serve pra trocar a senha via updateUser — não é uma sessão normal.
export default function ResetPasswordPage() {
  const [checking, setChecking] = useState(true);
  const [validSession, setValidSession] = useState(false);
  const [linkErrorMessage, setLinkErrorMessage] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [tenantSlug, setTenantSlug] = useState<string | null>(null);

  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost';

  useEffect(() => {
    // Quando o link do Supabase já vem expirado/usado, ele redireciona pra cá
    // com o erro no hash/query (#error=... ou ?error=...) em vez de criar
    // sessão — sem checar isso, a página mostrava sempre a mesma mensagem
    // genérica de "link inválido", mascarando a causa real.
    const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));
    const searchParams = new URLSearchParams(window.location.search);
    const errorCode = hashParams.get('error_code') || searchParams.get('error_code');
    const errorDescription = hashParams.get('error_description') || searchParams.get('error_description');

    if (errorCode === 'otp_expired') {
      setLinkErrorMessage('Esse link de redefinição expirou. Volte pra tela de login e solicite um novo.');
    } else if (errorDescription) {
      setLinkErrorMessage(decodeURIComponent(errorDescription.replace(/\+/g, ' ')));
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setValidSession(!!session);
      setChecking(false);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres.');
      return;
    }
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    setLoading(true);
    try {
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) {
        setError('Não foi possível redefinir a senha. Solicite um novo link e tente novamente.');
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: tenant } = await supabase
          .from('tenants')
          .select('slug')
          .eq('owner_user_id', session.user.id)
          .maybeSingle();
        setTenantSlug(tenant?.slug ?? null);
      }
      setDone(true);
    } finally {
      setLoading(false);
    }
  };

  const goToSite = () => {
    const port = window.location.port ? `:${window.location.port}` : '';
    window.location.href = tenantSlug
      ? `${window.location.protocol}//${tenantSlug}.${rootDomain}${port}`
      : `${window.location.protocol}//${rootDomain}${port}/signup`;
  };

  if (checking) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2F4F6] px-4 py-10">
      <div className="w-full max-w-[440px] bg-white border border-[#DEE2E7] p-8 rounded-[2px]">
        <div className="text-xs font-semibold tracking-[0.12em] uppercase text-[#0F3D5C] mb-1">
          ImobFlux
        </div>
        <h1 className="text-2xl font-bold text-[#15263A] mb-6">Redefinir senha</h1>

        {!validSession ? (
          <p className="text-sm text-[#68707C]">
            {linkErrorMessage || (
              <>
                Esse link de redefinição é inválido ou expirou. Se você pediu a redefinição em outro navegador ou
                dispositivo, abra o link no mesmo navegador usado para solicitá-lo. Caso contrário, volte pra tela de
                login e solicite um novo.
              </>
            )}
          </p>
        ) : done ? (
          <div className="space-y-4">
            <p className="text-sm text-[#68707C]">Senha redefinida com sucesso.</p>
            <button
              type="button"
              onClick={goToSite}
              className="w-full py-3 bg-[#0F3D5C] hover:bg-[#0B2C44] text-white text-xs font-semibold uppercase tracking-wider rounded-[2px] transition-colors"
            >
              Continuar
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-xs font-medium text-[#A8452F] bg-[#F7EAE6] border border-[#E4C3B9] rounded-[2px]">
                {error}
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold tracking-wider uppercase text-[#68707C] mb-1.5">
                Nova senha
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
                Confirmar nova senha
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
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#0F3D5C] hover:bg-[#0B2C44] disabled:opacity-50 text-white text-xs font-semibold uppercase tracking-wider rounded-[2px] transition-colors"
            >
              {loading ? 'Salvando...' : 'Redefinir senha'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

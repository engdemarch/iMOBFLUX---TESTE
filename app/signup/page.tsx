'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { DEFAULT_CONFIG } from '@/lib/storage';
import { isSlugFormatValid, isSlugReserved } from '@/lib/host';

// Fase 2 é explicitamente "só pra teste": exige que "Confirm email" esteja
// desativado nas configurações de Auth do Supabase (Authentication > Providers
// > Email), senão signUp() não retorna sessão ativa e o insert do tenant abaixo
// falha por falta de auth.uid(). Revisitar com um fluxo de criação adiada
// (usando pending_slug/pending_business_name já salvos no user_metadata) antes
// de abrir cadastro público de verdade.
export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [slug, setSlug] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost';
  const normalizedSlug = slug.trim().toLowerCase();

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
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: { data: { pending_slug: normalizedSlug, pending_business_name: businessName.trim() } }
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }
      if (!signUpData.session || !signUpData.user) {
        setError('Cadastro criado, mas é preciso confirmar o e-mail antes de continuar. Verifique sua caixa de entrada.');
        return;
      }

      const { error: tenantError } = await supabase.from('tenants').insert({
        owner_user_id: signUpData.user.id,
        slug: normalizedSlug,
        config: { ...DEFAULT_CONFIG, nome: businessName.trim() || DEFAULT_CONFIG.nome }
      });

      if (tenantError) {
        setError(
          tenantError.code === '23505'
            ? 'Esse endereço já está em uso. Escolha outro.'
            : 'Não foi possível criar seu site. Tente novamente.'
        );
        return;
      }

      const port = window.location.port ? `:${window.location.port}` : '';
      window.location.href = `${window.location.protocol}//${normalizedSlug}.${rootDomain}${port}`;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2F4F6] px-4 py-10">
      <div className="w-full max-w-[440px] bg-white border border-[#DEE2E7] p-8 rounded-[2px]">
        <div className="text-xs font-semibold tracking-[0.12em] uppercase text-[#0F3D5C] mb-1">
          ImobFlux
        </div>
        <h1 className="text-2xl font-bold text-[#15263A] mb-6">Criar minha conta</h1>

        {error && (
          <div className="p-3 mb-5 text-xs font-medium text-[#A8452F] bg-[#F7EAE6] border border-[#E4C3B9] rounded-[2px]">
            {error}
          </div>
        )}

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

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#0F3D5C] hover:bg-[#0B2C44] disabled:opacity-50 text-white text-xs font-semibold uppercase tracking-wider rounded-[2px] transition-colors mt-2"
          >
            {loading ? 'Criando...' : 'Criar meu site'}
          </button>
        </form>
      </div>
    </div>
  );
}

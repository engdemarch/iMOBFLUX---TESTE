'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

interface Kpis {
  totalTenants: number;
  byStatus: Record<string, number>;
  mrrBrl: number;
  trialsEndingSoon: number;
  newLast30Days: number;
  recent: {
    slug: string;
    status: string;
    planSlug: string;
    trialEndsAt: string | null;
    createdAt: string;
  }[];
}

const STATUS_LABEL: Record<string, string> = {
  trialing: 'Período de teste',
  active: 'Ativa',
  past_due: 'Pagamento pendente',
  canceled: 'Cancelada',
  suspended: 'Suspensa'
};

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [kpis, setKpis] = useState<Kpis | null>(null);
  const [fetchError, setFetchError] = useState('');

  const loadKpis = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      setAuthorized(false);
      setLoading(false);
      return;
    }
    const res = await fetch('/api/admin/kpis', {
      headers: { Authorization: `Bearer ${session.access_token}` }
    });
    if (res.status === 403) {
      setAuthorized(false);
      setLoading(false);
      return;
    }
    if (!res.ok) {
      setFetchError('Não foi possível carregar os dados.');
      setLoading(false);
      return;
    }
    setKpis(await res.json());
    setAuthorized(true);
    setLoading(false);
  };

  useEffect(() => {
    loadKpis();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoggingIn(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (error) {
        setLoginError('E-mail ou senha incorretos.');
        return;
      }
      setLoading(true);
      await loadKpis();
    } finally {
      setLoggingIn(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F2F4F6] text-[#68707C] text-sm">
        Carregando...
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F2F4F6] px-4">
        <form
          onSubmit={handleLogin}
          className="bg-white border border-[#DEE2E7] rounded-[2px] p-8 w-full max-w-sm space-y-4"
        >
          <h1 className="text-lg font-bold text-[#15263A]">Painel administrativo</h1>
          <p className="text-xs text-[#68707C]">Acesso restrito. Entre com a conta do dono da plataforma.</p>
          {loginError && <p className="text-xs text-red-600">{loginError}</p>}
          <div>
            <label className="block text-xs font-semibold tracking-wider uppercase text-[#68707C] mb-1.5">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              required
              className="w-full px-3.5 py-2.5 bg-[#F2F4F6] border border-[#DEE2E7] rounded-[2px] text-sm text-[#15263A] focus:outline-none focus:bg-white focus:border-[#0F3D5C]"
            />
          </div>
          <button
            type="submit"
            disabled={loggingIn}
            className="w-full py-2.5 bg-[#0F3D5C] hover:bg-[#0B2C44] disabled:opacity-50 text-white text-xs font-semibold uppercase tracking-wider rounded-[2px] transition-colors"
          >
            {loggingIn ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    );
  }

  if (fetchError || !kpis) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F2F4F6] text-sm text-red-600">
        {fetchError || 'Erro ao carregar.'}
      </div>
    );
  }

  const cards = [
    { label: 'Corretores cadastrados', value: kpis.totalTenants },
    { label: 'Pagando (ativos)', value: kpis.byStatus.active ?? 0 },
    { label: 'Em teste grátis', value: kpis.byStatus.trialing ?? 0 },
    { label: 'MRR estimado', value: `R$ ${kpis.mrrBrl.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
    { label: 'Pagamento pendente', value: kpis.byStatus.past_due ?? 0 },
    { label: 'Cancelados/Suspensos', value: (kpis.byStatus.canceled ?? 0) + (kpis.byStatus.suspended ?? 0) },
    { label: 'Trials acabando em 7 dias', value: kpis.trialsEndingSoon },
    { label: 'Novos cadastros (30 dias)', value: kpis.newLast30Days }
  ];

  return (
    <div className="min-h-screen bg-[#F2F4F6] text-[#15263A]">
      <header className="border-b border-[#DEE2E7] bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <span className="text-sm font-bold tracking-[0.12em] uppercase text-[#0F3D5C]">
            ImobFlux · Admin
          </span>
          <button
            type="button"
            onClick={() => supabase.auth.signOut().then(() => window.location.reload())}
            className="text-xs text-[#68707C] hover:text-[#15263A]"
          >
            Sair
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {cards.map((c) => (
            <div key={c.label} className="bg-white border border-[#DEE2E7] rounded-[2px] p-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#68707C] mb-1.5">{c.label}</p>
              <p className="text-2xl font-bold text-[#15263A]">{c.value}</p>
            </div>
          ))}
        </div>

        <h2 className="text-xs font-bold uppercase tracking-wider text-[#68707C] mb-3">Cadastros recentes</h2>
        <div className="bg-white border border-[#DEE2E7] rounded-[2px] overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#DEE2E7] text-left text-[10px] font-semibold uppercase tracking-wider text-[#68707C]">
                <th className="px-4 py-2.5">Slug</th>
                <th className="px-4 py-2.5">Status</th>
                <th className="px-4 py-2.5">Plano</th>
                <th className="px-4 py-2.5">Criado em</th>
                <th className="px-4 py-2.5">Fim do teste</th>
              </tr>
            </thead>
            <tbody>
              {kpis.recent.map((t) => (
                <tr key={t.slug} className="border-b border-[#DEE2E7] last:border-0">
                  <td className="px-4 py-2.5 font-medium">{t.slug}</td>
                  <td className="px-4 py-2.5">{STATUS_LABEL[t.status] || t.status}</td>
                  <td className="px-4 py-2.5 text-[#68707C]">{t.planSlug}</td>
                  <td className="px-4 py-2.5 text-[#68707C]">
                    {new Date(t.createdAt).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-4 py-2.5 text-[#68707C]">
                    {t.trialEndsAt ? new Date(t.trialEndsAt).toLocaleDateString('pt-BR') : '—'}
                  </td>
                </tr>
              ))}
              {kpis.recent.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-[#68707C]">
                    Nenhum cadastro ainda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

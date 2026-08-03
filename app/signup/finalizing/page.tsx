'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

const POLL_INTERVAL_MS = 1500;
const TIMEOUT_MS = 30000;

// Depois do pagamento no Stripe, o tenant só é criado quando o webhook
// (app/api/stripe/webhook) processa o checkout.session.completed — o que
// normalmente leva menos de 1 segundo, mas não é instantâneo. Essa página
// espera o tenant aparecer antes de mandar o usuário pro subdomínio dele.
export default function FinalizingPage() {
  const [timedOut, setTimedOut] = useState(false);
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost';

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');
    if (!slug) {
      setTimedOut(true);
      return;
    }

    let cancelled = false;
    const startedAt = Date.now();

    const check = async () => {
      const { data } = await supabase.from('tenants_public').select('slug').eq('slug', slug).maybeSingle();
      if (cancelled) return;

      if (data?.slug) {
        const port = window.location.port ? `:${window.location.port}` : '';
        window.location.href = `${window.location.protocol}//${data.slug}.${rootDomain}${port}`;
        return;
      }

      if (Date.now() - startedAt > TIMEOUT_MS) {
        setTimedOut(true);
        return;
      }
      setTimeout(check, POLL_INTERVAL_MS);
    };

    check();
    return () => {
      cancelled = true;
    };
  }, [rootDomain]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2F4F6] px-4 text-center">
      <div className="max-w-sm">
        {timedOut ? (
          <>
            <h1 className="text-lg font-bold text-[#15263A] mb-2">Ainda estamos processando seu pagamento</h1>
            <p className="text-sm text-[#68707C] mb-5">
              Isso pode levar mais alguns instantes. Você pode tentar novamente ou voltar mais tarde.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 bg-[#0F3D5C] hover:bg-[#0B2C44] text-white text-xs font-semibold uppercase tracking-wider rounded-[2px] transition-colors"
            >
              Tentar novamente
            </button>
          </>
        ) : (
          <>
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#DEE2E7] border-t-[#0F3D5C] animate-spin mb-4" />
            <h1 className="text-lg font-bold text-[#15263A] mb-2">Preparando seu site</h1>
            <p className="text-sm text-[#68707C]">Confirmando o pagamento, só um instante...</p>
          </>
        )}
      </div>
    </div>
  );
}

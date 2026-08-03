import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Cliente com service role key: ignora RLS/GRANTs por completo. Só deve ser
// usado em código server-only (Route Handlers, scripts) — nunca importado em
// nada que rode no navegador.
//
// Inicialização preguiçosa pelo mesmo motivo de lib/stripe.ts: o Next.js
// importa as rotas de API durante o build para coletar metadados, o que
// instanciaria o client mesmo sem nenhuma requisição real acontecer.
let cachedClient: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (!cachedClient) {
    cachedClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );
  }
  return cachedClient;
}

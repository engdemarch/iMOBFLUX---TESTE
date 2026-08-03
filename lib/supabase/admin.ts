import { createClient } from '@supabase/supabase-js';

// Cliente com service role key: ignora RLS/GRANTs por completo. Só deve ser
// usado em código server-only (Route Handlers, scripts) — nunca importado em
// nada que rode no navegador.
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

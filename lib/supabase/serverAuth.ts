import { createClient } from '@supabase/supabase-js';

// Resolve o usuário autenticado a partir do header Authorization de uma
// requisição de servidor (Route Handler), sem nunca confiar em um id vindo
// direto do corpo da requisição.
export async function getUserFromRequest(req: Request) {
  const authHeader = req.headers.get('authorization') ?? '';
  const token = authHeader.replace(/^Bearer\s+/i, '');
  if (!token) return null;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${token}` } } }
  );

  const { data, error } = await supabase.auth.getUser();
  return error ? null : data.user;
}

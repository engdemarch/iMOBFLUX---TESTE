import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost';

// Sessão guardada em cookie (não localStorage) com domain=.{rootDomain}, pra
// ser compartilhada entre o domínio raiz (/signup, /reset-password) e todos
// os subdomínios de tenant — sem isso, logar em demarchveiculos.com.br não
// "aparece" em demo.demarchveiculos.com.br (localStorage é isolado por origem).
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey, {
  cookieOptions: {
    domain: `.${rootDomain}`,
    path: '/',
    sameSite: 'lax',
    secure: rootDomain !== 'localhost'
  }
});

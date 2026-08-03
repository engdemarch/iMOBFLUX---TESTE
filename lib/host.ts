// Slugs reservados: nomes de rota/infra que não podem virar subdomínio de corretor.
export const RESERVED_SLUGS = new Set([
  'www', 'app', 'api', 'admin', 'marketing', 'demo', 'auth', 'login',
  'signup', 'dashboard', 'static', 'assets', 'cdn', 'mail', 'ftp',
  'blog', 'help', 'support', 'docs', 'status', 'root', 'test', 'supabase'
]);

// Extrai o slug do tenant a partir do hostname, dado o domínio raiz configurado.
// Não assume TLD de 2 rótulos (funciona igual para "demarchveiculos.com.br" e "localhost").
// Retorna null para o ápice, "www", ou qualquer host que não pertença ao domínio raiz.
export function extractTenantSlug(hostname: string, rootDomain: string): string | null {
  const host = hostname.toLowerCase();
  const root = rootDomain.toLowerCase();
  if (host === root || host === `www.${root}`) return null;
  if (!host.endsWith(`.${root}`)) return null;
  return host.slice(0, -(root.length + 1)).split('.')[0] || null;
}

export function isSlugFormatValid(slug: string): boolean {
  return /^[a-z0-9]([a-z0-9-]{1,61}[a-z0-9])?$/.test(slug);
}

export function isSlugReserved(slug: string): boolean {
  return RESERVED_SLUGS.has(slug.toLowerCase());
}

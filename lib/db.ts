import { supabase } from './supabase/client';
import { Property, SiteConfig, Testimonial, Corretor } from './types';
import { DEFAULT_CONFIG } from './storage';
import { extractTenantSlug } from './host';

// Fase 2: o middleware (middleware.ts) já garante que "/" só é renderizado
// com um subdomínio de tenant válido — o ápice/www é reescrito para /marketing
// antes de chegar aqui. Por isso a resolução é puramente por hostname, sem
// fallback de sessão ou de tenant de desenvolvimento.
export async function resolveTenantId(): Promise<string | null> {
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost';
  const slug = extractTenantSlug(window.location.hostname, rootDomain);
  if (!slug) return null;

  const { data } = await supabase
    .from('tenants_public')
    .select('id')
    .eq('slug', slug)
    .maybeSingle();
  return data?.id ?? null;
}

// Tenant que o usuário logado *possui* (dono da conta) — usado só pelo
// BrokerModal para decidir se o painel de edição deve desbloquear, distinto
// do tenant que está sendo *visitado* (resolveTenantId acima).
export async function resolveOwnerTenantId(): Promise<string | null> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) return null;

  const { data } = await supabase
    .from('tenants')
    .select('id')
    .eq('owner_user_id', session.user.id)
    .maybeSingle();
  return data?.id ?? null;
}

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

export async function getConfig(tenantId: string): Promise<SiteConfig> {
  const { data } = await supabase
    .from('tenants_public')
    .select('config')
    .eq('id', tenantId)
    .maybeSingle();
  return { ...DEFAULT_CONFIG, ...(data?.config as Partial<SiteConfig> | undefined) };
}

export async function saveConfig(tenantId: string, config: SiteConfig): Promise<boolean> {
  const { error } = await supabase
    .from('tenants')
    .update({ config, updated_at: new Date().toISOString() })
    .eq('id', tenantId);
  if (error) console.error('Failed to save config:', error);
  return !error;
}

// ---------------------------------------------------------------------------
// Properties
// ---------------------------------------------------------------------------

type PropertyRow = Record<string, unknown>;

function rowToProperty(row: PropertyRow): Property {
  return {
    id: row.id as string,
    createdAt: new Date(row.created_at as string).getTime(),
    titulo: row.titulo as string,
    transacao: row.transacao as Property['transacao'],
    tipo: row.tipo as string,
    bairro: row.bairro as string,
    cidade: row.cidade as string,
    estado: row.estado as string,
    endereco: (row.endereco as string) ?? undefined,
    cep: (row.cep as string) ?? undefined,
    preco: Number(row.preco),
    quartos: Number(row.quartos),
    banheiros: Number(row.banheiros),
    vagas: Number(row.vagas),
    area: Number(row.area),
    destaque: Boolean(row.destaque),
    descricao: row.descricao as string,
    tags: (row.tags as string[]) ?? undefined,
    previsaoEntrega: (row.previsao_entrega as string) ?? undefined,
    fotos: (row.fotos as string[]) ?? [],
    proprietarioNome: (row.proprietario_nome as string) ?? undefined,
    proprietarioTelefone: (row.proprietario_telefone as string) ?? undefined,
    proprietarioObs: (row.proprietario_obs as string) ?? undefined,
    corretorId: (row.corretor_id as string) ?? undefined,
    corretorNome: (row.corretor_nome as string) ?? undefined,
    corretorCreci: (row.corretor_creci as string) ?? undefined,
    corretorWhats: (row.corretor_whats as string) ?? undefined,
    corretorFoto: (row.corretor_foto as string) ?? undefined,
    corretorCargo: (row.corretor_cargo as string) ?? undefined
  };
}

function propertyToRow(p: Property, tenantId: string): PropertyRow {
  return {
    id: p.id,
    tenant_id: tenantId,
    titulo: p.titulo,
    transacao: p.transacao,
    tipo: p.tipo,
    bairro: p.bairro,
    cidade: p.cidade,
    estado: p.estado,
    endereco: p.endereco ?? null,
    cep: p.cep ?? null,
    preco: p.preco,
    quartos: p.quartos,
    banheiros: p.banheiros,
    vagas: p.vagas,
    area: p.area,
    destaque: p.destaque,
    descricao: p.descricao,
    tags: p.tags ?? null,
    previsao_entrega: p.previsaoEntrega ?? null,
    fotos: p.fotos ?? [],
    proprietario_nome: p.proprietarioNome ?? null,
    proprietario_telefone: p.proprietarioTelefone ?? null,
    proprietario_obs: p.proprietarioObs ?? null,
    corretor_id: p.corretorId ?? null,
    corretor_nome: p.corretorNome ?? null,
    corretor_creci: p.corretorCreci ?? null,
    corretor_whats: p.corretorWhats ?? null,
    corretor_foto: p.corretorFoto ?? null,
    corretor_cargo: p.corretorCargo ?? null,
    created_at: new Date(p.createdAt).toISOString()
  };
}

export async function getProperties(tenantId: string): Promise<Property[]> {
  const { data } = await supabase
    .from('properties_public')
    .select('*')
    .eq('tenant_id', tenantId)
    .order('created_at', { ascending: false });
  return (data ?? []).map(rowToProperty);
}

// Espelha o comportamento do antigo saveStoredProperties: recebe o array
// completo, faz upsert de tudo e apaga do banco quem não está mais no array.
export async function saveProperties(tenantId: string, properties: Property[]): Promise<boolean> {
  const rows = properties.map(p => propertyToRow(p, tenantId));
  const ids = properties.map(p => p.id);

  const { error: upsertError } = await supabase.from('properties').upsert(rows, { onConflict: 'id' });
  if (upsertError) {
    console.error('Failed to save properties:', upsertError);
    return false;
  }

  const deleteQuery = supabase.from('properties').delete().eq('tenant_id', tenantId);
  const { error: deleteError } = ids.length > 0
    ? await deleteQuery.not('id', 'in', `(${ids.join(',')})`)
    : await deleteQuery;
  if (deleteError) {
    console.error('Failed to clean up orphan properties:', deleteError);
    return false;
  }
  return true;
}

export async function deleteProperty(tenantId: string, id: string): Promise<boolean> {
  const { error } = await supabase.from('properties').delete().eq('tenant_id', tenantId).eq('id', id);
  return !error;
}

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------

function rowToTestimonial(row: PropertyRow): Testimonial {
  return {
    id: row.id as string,
    createdAt: new Date(row.created_at as string).getTime(),
    nome: row.nome as string,
    local: (row.local as string) ?? undefined,
    nota: Number(row.nota),
    texto: row.texto as string,
    origem: (row.origem as Testimonial['origem']) ?? undefined,
    foto: (row.foto as string) ?? undefined,
    destaque: Boolean(row.destaque)
  };
}

function testimonialToRow(t: Testimonial, tenantId: string): PropertyRow {
  return {
    id: t.id,
    tenant_id: tenantId,
    nome: t.nome,
    local: t.local ?? null,
    nota: t.nota,
    texto: t.texto,
    origem: t.origem ?? null,
    foto: t.foto ?? null,
    destaque: t.destaque ?? false,
    created_at: new Date(t.createdAt).toISOString()
  };
}

export async function getTestimonials(tenantId: string): Promise<Testimonial[]> {
  const { data } = await supabase
    .from('testimonials_public')
    .select('*')
    .eq('tenant_id', tenantId)
    .order('created_at', { ascending: false });
  return (data ?? []).map(rowToTestimonial);
}

export async function saveTestimonials(tenantId: string, testimonials: Testimonial[]): Promise<boolean> {
  const rows = testimonials.map(t => testimonialToRow(t, tenantId));
  const ids = testimonials.map(t => t.id);

  const { error: upsertError } = await supabase.from('testimonials').upsert(rows, { onConflict: 'id' });
  if (upsertError) {
    console.error('Failed to save testimonials:', upsertError);
    return false;
  }

  const deleteQuery = supabase.from('testimonials').delete().eq('tenant_id', tenantId);
  const { error: deleteError } = ids.length > 0
    ? await deleteQuery.not('id', 'in', `(${ids.join(',')})`)
    : await deleteQuery;
  return !deleteError;
}

export async function deleteTestimonial(tenantId: string, id: string): Promise<boolean> {
  const { error } = await supabase.from('testimonials').delete().eq('tenant_id', tenantId).eq('id', id);
  return !error;
}

// ---------------------------------------------------------------------------
// Corretores
// ---------------------------------------------------------------------------

function rowToCorretor(row: PropertyRow): Corretor {
  return {
    id: row.id as string,
    createdAt: new Date(row.created_at as string).getTime(),
    nome: row.nome as string,
    creci: row.creci as string,
    telefone: row.telefone as string,
    whats: row.whats as string,
    email: (row.email as string) ?? undefined,
    foto: (row.foto as string) ?? undefined,
    cargo: (row.cargo as string) ?? undefined
  };
}

function corretorToRow(c: Corretor, tenantId: string): PropertyRow {
  return {
    id: c.id,
    tenant_id: tenantId,
    nome: c.nome,
    creci: c.creci,
    telefone: c.telefone,
    whats: c.whats,
    email: c.email ?? null,
    foto: c.foto ?? null,
    cargo: c.cargo ?? null,
    created_at: new Date(c.createdAt).toISOString()
  };
}

export async function getCorretores(tenantId: string): Promise<Corretor[]> {
  const { data } = await supabase
    .from('corretores_public')
    .select('*')
    .eq('tenant_id', tenantId)
    .order('created_at', { ascending: false });
  return (data ?? []).map(rowToCorretor);
}

export async function saveCorretores(tenantId: string, corretores: Corretor[]): Promise<boolean> {
  const rows = corretores.map(c => corretorToRow(c, tenantId));
  const ids = corretores.map(c => c.id);

  const { error: upsertError } = await supabase.from('corretores').upsert(rows, { onConflict: 'id' });
  if (upsertError) {
    console.error('Failed to save corretores:', upsertError);
    return false;
  }

  const deleteQuery = supabase.from('corretores').delete().eq('tenant_id', tenantId);
  const { error: deleteError } = ids.length > 0
    ? await deleteQuery.not('id', 'in', `(${ids.join(',')})`)
    : await deleteQuery;
  return !deleteError;
}

export async function deleteCorretor(tenantId: string, id: string): Promise<boolean> {
  const { error } = await supabase.from('corretores').delete().eq('tenant_id', tenantId).eq('id', id);
  return !error;
}

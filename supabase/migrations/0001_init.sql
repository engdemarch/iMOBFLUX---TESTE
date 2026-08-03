-- ImobFlux Fase 1: schema multi-tenant, RLS e views públicas
-- Rodar no SQL Editor do Supabase (Project > SQL Editor > New query).

-- ---------------------------------------------------------------------------
-- Tabelas
-- ---------------------------------------------------------------------------

create table public.tenants (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null unique references auth.users(id) on delete cascade,
  slug text not null unique,
  status text not null default 'trialing'
    check (status in ('trialing', 'active', 'past_due', 'canceled', 'suspended')),
  plan_slug text,
  trial_ends_at timestamptz,
  billing_provider text,
  billing_customer_id text,
  billing_subscription_id text,
  config jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index tenants_slug_idx on public.tenants (slug);

-- id é texto (não uuid): o app já gera seus próprios ids no formato "cor172..."
-- client-side; manter esse formato evita reescrever a geração de id na UI.
create table public.corretores (
  id text primary key,
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  nome text not null,
  creci text,
  telefone text,
  whats text,
  email text,
  foto text,
  cargo text,
  created_at timestamptz not null default now()
);
create index corretores_tenant_idx on public.corretores (tenant_id);

-- id é texto (formato "p172...") pelo mesmo motivo de corretores.id acima.
create table public.properties (
  id text primary key,
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  titulo text not null,
  transacao text not null check (transacao in ('Venda', 'Aluguel')),
  tipo text not null,
  bairro text,
  cidade text not null,
  estado text not null,
  endereco text,
  cep text,
  preco numeric(14, 2) not null default 0,
  quartos smallint not null default 0,
  banheiros smallint not null default 0,
  vagas smallint not null default 0,
  area numeric(10, 2) not null default 0,
  destaque boolean not null default false,
  descricao text,
  tags text[],
  previsao_entrega text,
  fotos text[] not null default '{}',
  -- privado: nunca exposto nas views públicas
  proprietario_nome text,
  proprietario_telefone text,
  proprietario_obs text,
  -- snapshot do corretor associado (site de imobiliária com múltiplos corretores)
  corretor_id text references public.corretores(id) on delete set null,
  corretor_nome text,
  corretor_creci text,
  corretor_whats text,
  corretor_foto text,
  corretor_cargo text,
  created_at timestamptz not null default now()
);
create index properties_tenant_idx on public.properties (tenant_id);
create index properties_tenant_filter_idx on public.properties (tenant_id, transacao, tipo, cidade);
create index properties_tenant_quartos_idx on public.properties (tenant_id, quartos);
create index properties_tenant_destaque_idx on public.properties (tenant_id, destaque);
create index properties_tenant_created_idx on public.properties (tenant_id, created_at desc);

-- id é texto (formato "t172...") pelo mesmo motivo de corretores.id acima.
create table public.testimonials (
  id text primary key,
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  nome text not null,
  local text,
  nota smallint not null check (nota between 1 and 5),
  texto text not null,
  origem text check (origem in ('google', 'direto')),
  foto text,
  destaque boolean default false,
  created_at timestamptz not null default now()
);
create index testimonials_tenant_idx on public.testimonials (tenant_id);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------

alter table public.tenants enable row level security;
alter table public.properties enable row level security;
alter table public.testimonials enable row level security;
alter table public.corretores enable row level security;

create function public.current_tenant_id() returns uuid
language sql stable security definer set search_path = public as $$
  select id from public.tenants where owner_user_id = auth.uid()
$$;

create policy "tenant owner selects own tenant" on public.tenants
  for select using (owner_user_id = auth.uid());
create policy "tenant owner updates own tenant" on public.tenants
  for update using (owner_user_id = auth.uid());
create policy "tenant owner inserts own tenant" on public.tenants
  for insert with check (owner_user_id = auth.uid());
-- sem policy de delete: apagar um tenant é ação administrativa (service role), não do próprio dono

create policy "owner full access to own properties" on public.properties
  for all using (tenant_id = public.current_tenant_id())
  with check (tenant_id = public.current_tenant_id());

create policy "owner full access to own testimonials" on public.testimonials
  for all using (tenant_id = public.current_tenant_id())
  with check (tenant_id = public.current_tenant_id());

create policy "owner full access to own corretores" on public.corretores
  for all using (tenant_id = public.current_tenant_id())
  with check (tenant_id = public.current_tenant_id());

-- ---------------------------------------------------------------------------
-- Views públicas (visitante anônimo do site do corretor)
-- Nunca expor proprietario_nome/telefone/obs nem dados de billing do tenant.
-- security_invoker = false: a view roda com o privilégio do dono (bypassa RLS
-- das tabelas base), que é o padrão do Supabase para expor uma janela segura
-- sobre tabelas travadas por RLS.
-- ---------------------------------------------------------------------------

create view public.properties_public
  with (security_invoker = false) as
  select id, tenant_id, created_at, titulo, transacao, tipo, bairro, cidade, estado,
         endereco, cep, preco, quartos, banheiros, vagas, area, destaque, descricao,
         tags, previsao_entrega, fotos,
         corretor_id, corretor_nome, corretor_creci, corretor_whats, corretor_foto, corretor_cargo
  from public.properties;
grant select on public.properties_public to anon, authenticated;

create view public.testimonials_public
  with (security_invoker = false) as
  select id, tenant_id, created_at, nome, local, nota, texto, origem, foto, destaque
  from public.testimonials;
grant select on public.testimonials_public to anon, authenticated;

create view public.corretores_public
  with (security_invoker = false) as
  select id, tenant_id, created_at, nome, creci, telefone, whats, email, foto, cargo
  from public.corretores;
grant select on public.corretores_public to anon, authenticated;

create view public.tenants_public
  with (security_invoker = false) as
  select id, slug, status, config
  from public.tenants;
grant select on public.tenants_public to anon, authenticated;

-- ---------------------------------------------------------------------------
-- Storage: bucket público para logos, banners e fotos de imóveis/corretores.
-- Caminho: {tenant_id}/{categoria}/{arquivo}.jpg
-- Leitura pública é feita pela URL pública (bypassa RLS); INSERT/UPDATE/DELETE
-- exigem que o usuário autenticado seja dono do tenant da primeira pasta do caminho.
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public)
values ('tenant-media', 'tenant-media', true)
on conflict (id) do nothing;

create policy "tenant owner uploads own media" on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'tenant-media'
    and (storage.foldername(name))[1] = public.current_tenant_id()::text
  );

create policy "tenant owner updates own media" on storage.objects
  for update to authenticated
  using (
    bucket_id = 'tenant-media'
    and (storage.foldername(name))[1] = public.current_tenant_id()::text
  );

create policy "tenant owner deletes own media" on storage.objects
  for delete to authenticated
  using (
    bucket_id = 'tenant-media'
    and (storage.foldername(name))[1] = public.current_tenant_id()::text
  );

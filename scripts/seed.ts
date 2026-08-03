// Cria um tenant de desenvolvimento no Supabase com os dados de exemplo do app.
// Uso: npm run seed -- --email=voce@exemplo.com --password=SenhaForte123 --slug=demo
//
// Requer SUPABASE_SERVICE_ROLE_KEY em .env.local (nunca exposta ao navegador).
import { config } from 'dotenv';
config({ path: '.env.local' });
import { createClient } from '@supabase/supabase-js';
import { DEFAULT_CONFIG, DEMO_CORRETORES, DEMO_PROPERTIES, DEMO_TESTIMONIALS } from '../lib/storage';

function parseArgs() {
  const args: Record<string, string> = {};
  for (const arg of process.argv.slice(2)) {
    const match = arg.match(/^--([^=]+)=(.*)$/);
    if (match) args[match[1]] = match[2];
  }
  return args;
}

async function main() {
  const { email, password, slug = 'demo' } = parseArgs();
  if (!email || !password) {
    console.error('Uso: npm run seed -- --email=voce@exemplo.com --password=SenhaForte123 --slug=demo');
    process.exit(1);
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    console.error('Defina NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY em .env.local');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });

  console.log(`Criando usuário ${email}...`);
  const { data: userData, error: userError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true
  });
  if (userError || !userData.user) {
    console.error('Falha ao criar usuário:', userError?.message);
    process.exit(1);
  }

  console.log(`Criando tenant "${slug}"...`);
  const { data: tenant, error: tenantError } = await supabase
    .from('tenants')
    .insert({ owner_user_id: userData.user.id, slug, config: DEFAULT_CONFIG })
    .select('id')
    .single();
  if (tenantError || !tenant) {
    console.error('Falha ao criar tenant:', tenantError?.message);
    process.exit(1);
  }
  const tenantId = tenant.id as string;

  // Prefixa os ids de exemplo com o slug para permitir semear vários tenants
  // de teste sem colidir com as chaves primárias (ids de DEMO_* são fixos).
  const withSlug = (id: string) => `${slug}-${id}`;

  console.log(`Inserindo ${DEMO_CORRETORES.length} corretores...`);
  const { error: corretoresError } = await supabase.from('corretores').insert(
    DEMO_CORRETORES.map(c => ({
      id: withSlug(c.id),
      tenant_id: tenantId,
      nome: c.nome,
      creci: c.creci,
      telefone: c.telefone,
      whats: c.whats,
      email: c.email ?? null,
      foto: c.foto ?? null,
      cargo: c.cargo ?? null,
      created_at: new Date(c.createdAt).toISOString()
    }))
  );
  if (corretoresError) {
    console.error('Falha ao inserir corretores:', corretoresError.message);
    process.exit(1);
  }

  console.log(`Inserindo ${DEMO_PROPERTIES.length} imóveis...`);
  const { error: propertiesError } = await supabase.from('properties').insert(
    DEMO_PROPERTIES.map(p => ({
      id: withSlug(p.id),
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
      corretor_id: p.corretorId ? withSlug(p.corretorId) : null,
      corretor_nome: p.corretorNome ?? null,
      corretor_creci: p.corretorCreci ?? null,
      corretor_whats: p.corretorWhats ?? null,
      corretor_foto: p.corretorFoto ?? null,
      corretor_cargo: p.corretorCargo ?? null,
      created_at: new Date(p.createdAt).toISOString()
    }))
  );
  if (propertiesError) {
    console.error('Falha ao inserir imóveis:', propertiesError.message);
    process.exit(1);
  }

  console.log(`Inserindo ${DEMO_TESTIMONIALS.length} depoimentos...`);
  const { error: testimonialsError } = await supabase.from('testimonials').insert(
    DEMO_TESTIMONIALS.map(t => ({
      id: withSlug(t.id),
      tenant_id: tenantId,
      nome: t.nome,
      local: t.local ?? null,
      nota: t.nota,
      texto: t.texto,
      origem: t.origem ?? null,
      foto: t.foto ?? null,
      destaque: t.destaque ?? false,
      created_at: new Date(t.createdAt).toISOString()
    }))
  );
  if (testimonialsError) {
    console.error('Falha ao inserir depoimentos:', testimonialsError.message);
    process.exit(1);
  }

  console.log('\nPronto! Tenant de desenvolvimento criado:');
  console.log(`  slug:  ${slug}`);
  console.log(`  email: ${email}`);
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost';
  console.log(`\nAcesse em: http://${slug}.${rootDomain}:PORTA (a porta do seu "npm run dev")`);
}

main();

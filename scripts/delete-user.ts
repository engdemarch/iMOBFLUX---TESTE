// Remove um usuário de teste (Supabase Auth + tenant associado, se houver).
// Uso: npm run delete-user -- --email=voce@exemplo.com
//
// Requer SUPABASE_SERVICE_ROLE_KEY em .env.local (nunca exposta ao navegador).
import { config } from 'dotenv';
config({ path: '.env.local' });
import { createClient } from '@supabase/supabase-js';

function parseArgs() {
  const args: Record<string, string> = {};
  for (const arg of process.argv.slice(2)) {
    const match = arg.match(/^--([^=]+)=(.*)$/);
    if (match) args[match[1]] = match[2];
  }
  return args;
}

async function main() {
  const { email } = parseArgs();
  if (!email) {
    console.error('Uso: npm run delete-user -- --email=voce@exemplo.com');
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

  console.log(`Procurando usuário ${email}...`);
  let targetUser: { id: string; email?: string } | null = null;
  let page = 1;
  while (!targetUser) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage: 1000 });
    if (error) {
      console.error('Erro ao listar usuários:', error.message);
      process.exit(1);
    }
    targetUser = data.users.find(u => u.email?.toLowerCase() === email.toLowerCase()) ?? null;
    if (data.users.length < 1000) break;
    page++;
  }

  if (!targetUser) {
    console.log('Nenhum usuário encontrado com esse e-mail. Nada a fazer.');
    return;
  }

  console.log(`Usuário encontrado: ${targetUser.id}`);

  const { data: tenant } = await supabase
    .from('tenants')
    .select('id, slug')
    .eq('owner_user_id', targetUser.id)
    .maybeSingle();

  if (tenant) {
    console.log(`Removendo tenant associado (slug: ${tenant.slug})...`);
    const { error: tenantError } = await supabase.from('tenants').delete().eq('id', tenant.id);
    if (tenantError) {
      console.error('Erro ao remover tenant:', tenantError.message);
      process.exit(1);
    }
  } else {
    console.log('Nenhum tenant associado a esse usuário.');
  }

  console.log('Removendo usuário do Supabase Auth...');
  const { error: deleteError } = await supabase.auth.admin.deleteUser(targetUser.id);
  if (deleteError) {
    console.error('Erro ao remover usuário:', deleteError.message);
    process.exit(1);
  }

  console.log('Concluído. E-mail liberado para novo cadastro.');
}

main();

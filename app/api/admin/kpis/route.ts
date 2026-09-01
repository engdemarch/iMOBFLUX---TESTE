import { getSupabaseAdmin } from '@/lib/supabase/admin';
import { getUserFromRequest } from '@/lib/supabase/serverAuth';

export const runtime = 'nodejs';

// Único dono da plataforma por enquanto — sem tabela de admins pra um SaaS
// de um corretor só operando. Ver lib/adminEmail.ts se isso crescer.
const ADMIN_EMAIL = 'eng.demarch@gmail.com';
const MONTHLY_PRICE_BRL = 97;

export async function GET(req: Request) {
  const user = await getUserFromRequest(req);
  if (!user || user.email !== ADMIN_EMAIL) {
    return Response.json({ error: 'Não autorizado.' }, { status: 403 });
  }

  const { data: tenants, error } = await getSupabaseAdmin()
    .from('tenants')
    .select('slug, status, plan_slug, trial_ends_at, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    return Response.json({ error: 'Falha ao carregar dados.' }, { status: 500 });
  }

  const byStatus: Record<string, number> = { trialing: 0, active: 0, past_due: 0, canceled: 0, suspended: 0 };
  for (const t of tenants) {
    byStatus[t.status] = (byStatus[t.status] ?? 0) + 1;
  }

  const now = Date.now();
  const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
  const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;

  const trialsEndingSoon = tenants.filter(
    (t) => t.status === 'trialing' && t.trial_ends_at && new Date(t.trial_ends_at).getTime() - now <= sevenDaysMs
  ).length;

  const newLast30Days = tenants.filter((t) => now - new Date(t.created_at).getTime() <= thirtyDaysMs).length;

  return Response.json({
    totalTenants: tenants.length,
    byStatus,
    mrrBrl: byStatus.active * MONTHLY_PRICE_BRL,
    trialsEndingSoon,
    newLast30Days,
    recent: tenants.slice(0, 15).map((t) => ({
      slug: t.slug,
      status: t.status,
      planSlug: t.plan_slug,
      trialEndsAt: t.trial_ends_at,
      createdAt: t.created_at
    }))
  });
}

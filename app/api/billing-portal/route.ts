import { getStripe } from '@/lib/stripe';
import { getSupabaseAdmin } from '@/lib/supabase/admin';
import { getUserFromRequest } from '@/lib/supabase/serverAuth';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const user = await getUserFromRequest(req);
  if (!user) {
    return Response.json({ error: 'Não autenticado.' }, { status: 401 });
  }

  const { data: tenant } = await getSupabaseAdmin()
    .from('tenants')
    .select('billing_customer_id')
    .eq('owner_user_id', user.id)
    .maybeSingle();

  if (!tenant?.billing_customer_id) {
    return Response.json({ error: 'Nenhuma assinatura encontrada para esta conta.' }, { status: 404 });
  }

  const origin = new URL(req.url).origin;

  const session = await getStripe().billingPortal.sessions.create({
    customer: tenant.billing_customer_id,
    return_url: origin
  });

  return Response.json({ url: session.url });
}

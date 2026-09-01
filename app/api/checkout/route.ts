import { getStripe } from '@/lib/stripe';
import { getSupabaseAdmin } from '@/lib/supabase/admin';
import { getUserFromRequest } from '@/lib/supabase/serverAuth';
import { isSlugFormatValid, isSlugReserved } from '@/lib/host';
import { isValidCpf } from '@/lib/brasil';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const user = await getUserFromRequest(req);
  if (!user || !user.email) {
    return Response.json({ error: 'Não autenticado.' }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const slug = (body?.slug ?? '').trim().toLowerCase();
  const businessName = (body?.businessName ?? '').trim();
  const cpf = (body?.cpf ?? '').replace(/\D/g, '');

  if (!isSlugFormatValid(slug)) {
    return Response.json({ error: 'Endereço inválido.' }, { status: 400 });
  }
  if (isSlugReserved(slug)) {
    return Response.json({ error: 'Esse endereço não está disponível.' }, { status: 400 });
  }
  if (!isValidCpf(cpf)) {
    return Response.json({ error: 'CPF inválido.' }, { status: 400 });
  }

  // Um usuário só pode ter um tenant.
  const { data: existingOwnerTenant } = await getSupabaseAdmin()
    .from('tenants')
    .select('id, slug')
    .eq('owner_user_id', user.id)
    .maybeSingle();
  if (existingOwnerTenant) {
    return Response.json(
      { error: 'Você já tem um site criado.', slug: existingOwnerTenant.slug },
      { status: 409 }
    );
  }

  // Revalida o slug no servidor (o front já checou, mas isso é a fonte de verdade).
  const { data: existingSlug } = await getSupabaseAdmin()
    .from('tenants')
    .select('id')
    .eq('slug', slug)
    .maybeSingle();
  if (existingSlug) {
    return Response.json({ error: 'Esse endereço já está em uso.' }, { status: 409 });
  }

  // /signup só é servido no domínio raiz (nunca num subdomínio de tenant),
  // então a própria origem da requisição já é a base certa pro redirect.
  const origin = new URL(req.url).origin;

  const session = await getStripe().checkout.sessions.create({
    mode: 'subscription',
    customer_email: user.email,
    line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
    subscription_data: { trial_period_days: 7 },
    success_url: `${origin}/signup/finalizing?slug=${encodeURIComponent(slug)}`,
    cancel_url: `${origin}/signup?canceled=1`,
    metadata: {
      supabase_user_id: user.id,
      slug,
      business_name: businessName,
      cpf
    }
  });

  return Response.json({ url: session.url });
}

import Stripe from 'stripe';
import { getStripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { DEFAULT_CONFIG } from '@/lib/storage';

export const runtime = 'nodejs';

// Mapeia o status de assinatura do Stripe para o enum de tenants.status.
function mapStripeStatus(status: Stripe.Subscription.Status): string {
  switch (status) {
    case 'trialing':
      return 'trialing';
    case 'active':
      return 'active';
    case 'past_due':
      return 'past_due';
    case 'canceled':
      return 'canceled';
    case 'unpaid':
      return 'suspended';
    case 'incomplete':
      return 'past_due';
    case 'incomplete_expired':
      return 'canceled';
    case 'paused':
      return 'suspended';
    default:
      return 'suspended';
  }
}

export async function POST(req: Request) {
  const rawBody = await req.text();
  const signature = req.headers.get('stripe-signature');

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(rawBody, signature!, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error('Assinatura de webhook inválida:', err);
    return new Response('Invalid signature', { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const supabaseUserId = session.metadata?.supabase_user_id;
      const slug = session.metadata?.slug;
      const businessName = session.metadata?.business_name;

      if (!supabaseUserId || !slug || !session.subscription || !session.customer) {
        console.error('checkout.session.completed sem metadata esperada:', session.id);
        break;
      }

      const subscription = await getStripe().subscriptions.retrieve(session.subscription as string);

      const row = {
        owner_user_id: supabaseUserId,
        slug,
        status: mapStripeStatus(subscription.status),
        plan_slug: 'default',
        trial_ends_at: subscription.trial_end ? new Date(subscription.trial_end * 1000).toISOString() : null,
        billing_provider: 'stripe',
        billing_customer_id: session.customer as string,
        billing_subscription_id: session.subscription as string,
        config: { ...DEFAULT_CONFIG, nome: businessName || DEFAULT_CONFIG.nome }
      };

      const { error } = await supabaseAdmin
        .from('tenants')
        .upsert(row, { onConflict: 'owner_user_id', ignoreDuplicates: true });

      if (error?.code === '23505') {
        // Slug tomado por uma corrida rara entre a validação e o pagamento —
        // quem já pagou não pode ficar sem site, então cai pra um slug com sufixo.
        await supabaseAdmin.from('tenants').insert({
          ...row,
          slug: `${slug}-${(session.subscription as string).slice(-6)}`
        });
      } else if (error) {
        console.error('Falha ao criar tenant no webhook:', error);
      }
      break;
    }

    case 'customer.subscription.updated':
    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      const status = event.type === 'customer.subscription.deleted'
        ? 'canceled'
        : mapStripeStatus(subscription.status);

      // Sem erro se o tenant ainda não existir (evento chegou antes do
      // checkout.session.completed terminar de processar) — checkout.session.completed
      // não depende deste handler, então a ordem aqui é segura de qualquer forma.
      const { error } = await supabaseAdmin
        .from('tenants')
        .update({
          status,
          trial_ends_at: subscription.trial_end ? new Date(subscription.trial_end * 1000).toISOString() : null,
          updated_at: new Date().toISOString()
        })
        .eq('billing_subscription_id', subscription.id);

      if (error) {
        console.error('Falha ao sincronizar status do tenant:', error);
      }
      break;
    }

    default:
      break;
  }

  return new Response('ok', { status: 200 });
}

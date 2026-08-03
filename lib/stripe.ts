import Stripe from 'stripe';

// Inicialização preguiçosa: o Next.js importa as rotas de API durante o build
// (para coletar metadados), o que instanciaria o client mesmo sem nenhuma
// requisição real acontecer — e o SDK do Stripe lança erro na hora se a chave
// não estiver presente. Adiar a criação evita que o build falhe por falta de
// STRIPE_SECRET_KEY (só é necessária em runtime, nunca em build).
let cachedClient: Stripe | null = null;

export function getStripe(): Stripe {
  if (!cachedClient) {
    cachedClient = new Stripe(process.env.STRIPE_SECRET_KEY!);
  }
  return cachedClient;
}

type FbqFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    fbq?: FbqFn;
  }
}

// Dispara um evento do Meta Pixel (ex: 'Lead', 'InitiateCheckout') a partir do
// navegador. Não faz nada em SSR ou se o Pixel ainda não carregou (ex: bloqueador
// de anúncios) — ver components/MetaPixel.tsx, que injeta o fbq base.
export function trackMetaEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return;
  window.fbq('track', eventName, params);
}

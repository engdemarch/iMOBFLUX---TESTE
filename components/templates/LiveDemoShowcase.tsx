'use client';

import { useState } from 'react';
import { Monitor, Smartphone } from 'lucide-react';

const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost';
const DEMO_URL = `https://demo.${rootDomain}`;

// Mostra o site demo rodando de verdade (iframe), não uma captura de tela —
// o visitante rola, filtra imóveis e abre o modal de detalhe dentro do
// próprio preview.
export function LiveDemoShowcase() {
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop');

  return (
    <div>
      <div className="flex items-center justify-center gap-1.5 mb-5">
        <button
          type="button"
          onClick={() => setViewport('desktop')}
          className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-full transition-colors ${
            viewport === 'desktop' ? 'bg-[#0F3D5C] text-white' : 'bg-white border border-[#DEE2E7] text-[#68707C] hover:text-[#15263A]'
          }`}
        >
          <Monitor className="w-3.5 h-3.5" />
          Desktop
        </button>
        <button
          type="button"
          onClick={() => setViewport('mobile')}
          className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-full transition-colors ${
            viewport === 'mobile' ? 'bg-[#0F3D5C] text-white' : 'bg-white border border-[#DEE2E7] text-[#68707C] hover:text-[#15263A]'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          Celular
        </button>
      </div>

      <div
        className={`mx-auto border border-[#DEE2E7] rounded-[10px] overflow-hidden shadow-xl bg-white transition-all duration-300 ${
          viewport === 'desktop' ? 'w-full' : 'max-w-[420px]'
        }`}
      >
        <div className="h-11 bg-[#F2F4F6] border-b border-[#DEE2E7] flex items-center gap-3 px-4">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#DEE2E7]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#DEE2E7]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#DEE2E7]" />
          </div>
          <div className="flex-1 bg-white border border-[#DEE2E7] rounded-full px-3 py-1.5 text-[11px] text-[#68707C] text-center truncate">
            {DEMO_URL.replace('https://', '')}
          </div>
        </div>
        <iframe
          src={DEMO_URL}
          title="Site demo do ImobFlux"
          loading="lazy"
          className={`w-full bg-white transition-all duration-300 ${viewport === 'desktop' ? 'h-[560px]' : 'h-[620px]'}`}
        />
      </div>
      <p className="text-center text-xs text-[#68707C] mt-4">
        Site real, funcionando de verdade — role e clique à vontade.
      </p>
    </div>
  );
}

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, Send, X, Loader2 } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const GREETING: ChatMessage = {
  role: 'assistant',
  content: 'Oi! Sou o assistente do ImobFlux. Posso ajudar com dúvidas sobre o sistema, preço, cadastro ou pagamento. O que você quer saber?'
};

// Painel de chat em si — usado tanto flutuante (landing page) quanto embutido
// numa aba (painel do corretor). Sem estado de abrir/fechar, só a conversa.
export function SupportChatPanel({ className = '' }: { className?: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setError('');
    setInput('');

    const history = [...messages, { role: 'user' as const, content: text }];
    setMessages([...history, { role: 'assistant', content: '' }]);
    setLoading(true);

    try {
      const res = await fetch('/api/support-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history })
      });
      if (!res.ok || !res.body) throw new Error('Falha ao conectar com o suporte.');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setMessages([...history, { role: 'assistant', content: accumulated }]);
      }
    } catch {
      setError('Não foi possível falar com o suporte agora. Tente novamente.');
      setMessages(history);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex flex-col bg-white ${className}`}>
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] rounded-[10px] px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                m.role === 'user' ? 'bg-[#0F3D5C] text-white' : 'bg-[#F2F4F6] text-[#15263A]'
              }`}
            >
              {m.content || (loading && i === messages.length - 1 ? <Loader2 className="w-4 h-4 animate-spin" /> : '')}
            </div>
          </div>
        ))}
        {error && <p className="text-xs text-red-600 text-center">{error}</p>}
      </div>
      <div className="border-t border-[#DEE2E7] p-3 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          placeholder="Digite sua dúvida..."
          disabled={loading}
          className="flex-1 px-3.5 py-2.5 bg-[#F2F4F6] border border-[#DEE2E7] rounded-full text-sm text-[#15263A] focus:outline-none focus:bg-white focus:border-[#0F3D5C] disabled:opacity-60"
        />
        <button
          type="button"
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          className="shrink-0 w-10 h-10 flex items-center justify-center bg-[#0F3D5C] hover:bg-[#0B2C44] disabled:opacity-40 text-white rounded-full transition-colors"
          aria-label="Enviar"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// Bolha flutuante + janela — usada na landing page (visitantes, sem login).
export function SupportChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-[70]">
      {open && (
        <div className="mb-3 w-[92vw] max-w-[360px] h-[70vh] max-h-[520px] rounded-[14px] shadow-2xl ring-1 ring-black/10 overflow-hidden flex flex-col bg-white">
          <div className="flex items-center justify-between px-4 py-3 bg-[#0F3D5C] text-white">
            <div>
              <p className="text-sm font-bold">Suporte ImobFlux</p>
              <p className="text-[11px] text-white/70">Respostas automáticas com IA</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              aria-label="Fechar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <SupportChatPanel className="flex-1 min-h-0" />
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-14 h-14 rounded-full bg-[#0F3D5C] hover:bg-[#0B2C44] text-white shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-105"
        aria-label="Abrir suporte"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  );
}

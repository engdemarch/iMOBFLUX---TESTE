import { getAnthropic, SUPPORT_CHAT_MODEL, SUPPORT_SYSTEM_PROMPT } from '@/lib/anthropic';

export const runtime = 'nodejs';

const MAX_HISTORY_MESSAGES = 16;
const MAX_MESSAGE_LENGTH = 2000;

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

function isValidHistory(value: unknown): value is ChatMessage[] {
  if (!Array.isArray(value) || value.length === 0 || value.length > MAX_HISTORY_MESSAGES) return false;
  return value.every(
    (m) =>
      m &&
      (m.role === 'user' || m.role === 'assistant') &&
      typeof m.content === 'string' &&
      m.content.length > 0 &&
      m.content.length <= MAX_MESSAGE_LENGTH
  );
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const messages = body?.messages;

  if (!isValidHistory(messages)) {
    return Response.json({ error: 'Mensagens inválidas.' }, { status: 400 });
  }
  if (messages[messages.length - 1].role !== 'user') {
    return Response.json({ error: 'A última mensagem precisa ser do usuário.' }, { status: 400 });
  }

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      try {
        const claudeStream = getAnthropic().messages.stream({
          model: SUPPORT_CHAT_MODEL,
          max_tokens: 1024,
          system: SUPPORT_SYSTEM_PROMPT,
          messages
        });

        claudeStream.on('text', (delta) => {
          controller.enqueue(encoder.encode(delta));
        });

        await claudeStream.finalMessage();
        controller.close();
      } catch (err) {
        console.error('Falha no support-chat:', err);
        controller.enqueue(encoder.encode('Desculpe, tive um problema para responder agora. Tente novamente em instantes.'));
        controller.close();
      }
    }
  });

  return new Response(stream, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
}

import { TemplateDefinition } from '@/lib/templates';

interface TemplatePreviewProps {
  template: TemplateDefinition;
  className?: string;
}

// Miniatura estilizada (moldura de navegador + blocos de cor) de como o
// template fica no site real — usada tanto na galeria da landing page
// quanto no seletor do /signup, pra não deixar a escolha abstrata demais.
export function TemplatePreview({ template: t, className = '' }: TemplatePreviewProps) {
  return (
    <div className={`border border-[#DEE2E7] rounded-[6px] overflow-hidden bg-white ${className}`}>
      <div className="h-6 bg-[#F2F4F6] border-b border-[#DEE2E7] flex items-center gap-1 px-2.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#DEE2E7]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#DEE2E7]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#DEE2E7]" />
      </div>

      {t.id === 'classico' ? (
        <div style={{ background: t.primaryDark }} className="aspect-[16/10] flex flex-col justify-end p-3 gap-1.5">
          <div className="w-1/2 h-1.5 rounded-full bg-white/30" />
          <div className="w-3/4 h-2.5 rounded-full bg-white/70" />
          <div className="w-2/3 h-2.5 rounded-full bg-white/70" />
          <div className="flex gap-1 mt-1.5">
            <div className="flex-1 h-8 rounded-[2px] bg-white/15" />
            <div className="flex-1 h-8 rounded-[2px] bg-white/15" />
            <div className="flex-1 h-8 rounded-[2px] bg-white/15" />
          </div>
        </div>
      ) : (
        <div className="aspect-[16/10] bg-[#F4F6F8] flex items-center gap-2.5 p-3">
          <div className="flex-1 space-y-1.5">
            <div className="w-4/5 h-2 rounded-full" style={{ background: `${t.primary}33` }} />
            <div className="w-full h-2.5 rounded-full bg-[#D9DEE3]" />
            <div className="w-3/4 h-2.5 rounded-full bg-[#D9DEE3]" />
            <div className="mt-1.5 w-16 h-5 rounded-full" style={{ background: t.primary }} />
          </div>
          <div className="flex-1 h-full rounded-xl" style={{ background: `${t.primary}55` }} />
        </div>
      )}
    </div>
  );
}

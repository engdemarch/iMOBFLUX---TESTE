// Registro de templates de site disponíveis. Cada tenant escolhe um no
// cadastro (config.template) e ele fica fixo até o corretor trocar (futuro).
// "primary"/"primaryDark" viram as CSS vars --t-primary/--t-primary-dark,
// aplicadas em app/page.tsx e usadas pelas seções compartilhadas entre
// templates (SearchBar, HowItWorks, BrokerPresentation, Testimonials,
// LocationMap, PropertyDetailModal, BrokerFab, PropertyCatalog).
export type TemplateId = 'classico' | 'moderno';

export interface TemplateDefinition {
  id: TemplateId;
  nome: string;
  descricao: string;
  primary: string;
  primaryDark: string;
}

export const TEMPLATES: TemplateDefinition[] = [
  {
    id: 'classico',
    nome: 'Clássico',
    descricao: 'Editorial e sóbrio — hero em foto de fundo escura, tipografia serifada no logo.',
    primary: '#0F3D5C',
    primaryDark: '#0B2C44'
  },
  {
    id: 'moderno',
    nome: 'Moderno',
    descricao: 'Leve e arredondado — hero dividido com cartões flutuantes, visual clean.',
    primary: '#0D9488',
    primaryDark: '#0B7A70'
  }
];

export const DEFAULT_TEMPLATE: TemplateId = 'classico';

export function getTemplate(id: string | undefined): TemplateDefinition {
  return TEMPLATES.find((t) => t.id === id) || TEMPLATES.find((t) => t.id === DEFAULT_TEMPLATE)!;
}

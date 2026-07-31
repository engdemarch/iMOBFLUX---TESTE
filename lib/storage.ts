import { Property, SiteConfig, Testimonial, Corretor } from './types';

export const DEMO_CORRETORES: Corretor[] = [
  {
    id: 'corretor1',
    createdAt: 1720000000000,
    nome: 'Alef Hansen',
    creci: 'CRECI 45.120-F',
    telefone: '(48) 99999-0001',
    whats: '5548999990001',
    email: 'alef.hansen@imobiliaria.com.br',
    cargo: 'Corretor Sênior',
    foto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'corretor2',
    createdAt: 1719990000000,
    nome: 'Juliana Martins',
    creci: 'CRECI 51.890-F',
    telefone: '(48) 99888-2233',
    whats: '5548998882233',
    email: 'juliana.martins@imobiliaria.com.br',
    cargo: 'Especialista em Lançamentos',
    foto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'corretor3',
    createdAt: 1719980000000,
    nome: 'Roberto Alves',
    creci: 'CRECI 38.450-F',
    telefone: '(48) 99111-4455',
    whats: '5548991114455',
    email: 'roberto.alves@imobiliaria.com.br',
    cargo: 'Consultor Imobiliário',
    foto: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80'
  }
];

export const DEFAULT_CONFIG: SiteConfig = {
  nome: "Site Corretor de Imoveis",
  subtitulo: "Corretor de Imóveis Licenciado",
  creci: "CRECI 00000-J",
  telefone: "(48) 99999-0000",
  whats: "5548999990000",
  email: "contato@corretor.com.br",
  endereco: "Rua Exemplo, 100 — Centro, Criciúma/SC",
  enderecoAtendimento: "Av. Centenário, 1500 — Centro, Criciúma/SC",
  mostrarMapa: true,
  googleMapsEmbedUrl: "",
  logo: "",
  mostrarNome: true,
  banners: [
    "https://picsum.photos/seed/hero-house/1800/1200",
    "https://picsum.photos/seed/hero-house2/1800/1200"
  ],
  tipoPerfil: 'corretor',
  fotoCorretor: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
  sobreTitulo: "Sua melhor consultoria na conquista do imóvel ideal",
  sobreTexto: "Com ampla experiência no mercado imobiliário regional, presto atendimento consultivo e personalizado para quem deseja comprar, vender ou alugar imóveis com total segurança jurídica e transparência. Ofereço avaliação precisa de mercado, assessoria em financiamento habitacional do início ao fim e curadoria das melhores oportunidades.",
  mostrarSobre: true,
  anosExperiencia: "10+ anos",
  imoveisNegociados: "+350 imóveis"
};

export const DEMO_PROPERTIES: Property[] = [
  {
    id: 'demo1',
    createdAt: 1720000000000,
    titulo: 'CASA TÉRREA COM 3 QUARTOS E QUINTAL AMPLO',
    transacao: 'Venda',
    tipo: 'Casa',
    bairro: 'CENTRO',
    cidade: 'CRICIÚMA',
    estado: 'SC',
    endereco: 'RUA COBERTURA, 120',
    preco: 620000,
    quartos: 3,
    banheiros: 2,
    vagas: 2,
    area: 180,
    destaque: true,
    tags: ['Aceita permuta', 'Parcelamento direto'],
    descricao: 'Casa térrea reformada, com quintal amplo, churrasqueira e ótima localização próxima ao comércio do bairro.\n\nPossui acabamento em gesso, piso porcelanato e móveis sob medida na cozinha e banheiros.',
    fotos: [
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
    ],
    proprietarioNome: 'Carlos Eduardo Santos',
    proprietarioTelefone: '(48) 99888-1122',
    proprietarioObs: 'Exclusividade de venda. Aceita financiamento bancário.',
    corretorId: 'corretor1',
    corretorNome: 'Alef Hansen',
    corretorCreci: 'CRECI 45.120-F',
    corretorWhats: '5548999990001',
    corretorFoto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    corretorCargo: 'Corretor Sênior'
  },
  {
    id: 'demo2',
    createdAt: 1719999000000,
    titulo: 'APARTAMENTO MOBILIADO COM VISTA LIVRE',
    transacao: 'Venda',
    tipo: 'Apartamento',
    bairro: 'PIO CORRÊA',
    cidade: 'CRICIÚMA',
    estado: 'SC',
    endereco: 'RUA CORONEL PEDRO, 450',
    preco: 410000,
    quartos: 2,
    banheiros: 2,
    vagas: 1,
    area: 74,
    destaque: true,
    tags: ['MCMV', 'Parcelamento direto'],
    descricao: 'Apartamento totalmente mobilado, com 1 suíte, sacada integrada com churrasqueira a carvão e vista panorâmica livre.\n\nEdifício com salão de festas, academia e portaria eletrônica.',
    fotos: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=80'
    ],
    proprietarioNome: 'Juliana Ferreira',
    proprietarioTelefone: '(48) 99111-3344',
    proprietarioObs: 'Comissão acordada em 6%. Estuda carro no negócio.',
    corretorId: 'corretor2',
    corretorNome: 'Juliana Martins',
    corretorCreci: 'CRECI 51.890-F',
    corretorWhats: '5548998882233',
    corretorFoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    corretorCargo: 'Especialista em Lançamentos'
  },
  {
    id: 'demo3',
    createdAt: 1719998000000,
    titulo: 'TERRENO PLANO EM CONDOMÍNIO FECHADO',
    transacao: 'Venda',
    tipo: 'Terreno / Lote',
    bairro: 'PRIMEIRA LINHA',
    cidade: 'CRICIÚMA',
    estado: 'SC',
    endereco: 'CONDOMÍNIO RESERVA DOS LAGOS',
    preco: 295000,
    quartos: 0,
    banheiros: 0,
    vagas: 0,
    area: 420,
    destaque: false,
    descricao: 'Terreno plano e pronto para construir, localizado em condomínio fechado de alto padrão com infraestrutura completa de lazer e segurança 24 horas.',
    fotos: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    proprietarioNome: 'Marcos Roberto',
    proprietarioTelefone: '(48) 98877-2211'
  },
  {
    id: 'demo4',
    createdAt: 1719997000000,
    titulo: 'SOBRADO DE LUXO COM PISCINA AQUECIDA',
    transacao: 'Venda',
    tipo: 'Casa de Condomínio',
    bairro: 'VERDINHO',
    cidade: 'CRICIÚMA',
    estado: 'SC',
    endereco: 'AVENIDA DOS ALPES, 300',
    preco: 1280000,
    quartos: 4,
    banheiros: 4,
    vagas: 3,
    area: 260,
    destaque: true,
    tags: ['Lançamento', 'Na planta', 'Parcelamento direto'],
    previsaoEntrega: 'Dezembro / 2027',
    descricao: 'Alto padrão de acabamento! Sobrado com 4 suítes, energia solar fotovoltaica, piscina aquecida e espaço gourmet integrado.',
    fotos: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80'
    ],
    proprietarioNome: 'Ana Paula Lima',
    proprietarioTelefone: '(48) 99666-5544'
  },
  {
    id: 'demo5',
    createdAt: 1719996000000,
    titulo: 'APARTAMENTO PARA ALUGAR PRÓXIMO AO CENTRO',
    transacao: 'Aluguel',
    tipo: 'Apartamento',
    bairro: 'CENTRO',
    cidade: 'CRICIÚMA',
    estado: 'SC',
    endereco: 'RUA HENRIQUE LAGE, 210',
    preco: 2400,
    quartos: 2,
    banheiros: 1,
    vagas: 1,
    area: 68,
    destaque: false,
    descricao: 'Excelente opção de aluguel residencial no Centro. Imóvel arejado, com armários na cozinha e 1 vaga de garagem coberta.',
    fotos: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'
    ],
    proprietarioNome: 'Roberto Mendes',
    proprietarioTelefone: '(48) 99222-8877'
  },
  {
    id: 'demo6',
    createdAt: 1719995000000,
    titulo: 'CASA TÉRREA NO LITORAL A 3 QUADRAS DO MAR',
    transacao: 'Venda',
    tipo: 'Casa',
    bairro: 'CENTRO',
    cidade: 'BALNEÁRIO RINCÃO',
    estado: 'SC',
    endereco: 'RUA DAS GAROUPAS, 85',
    preco: 750000,
    quartos: 3,
    banheiros: 3,
    vagas: 2,
    area: 150,
    destaque: false,
    descricao: 'Casa de praia espaçosa, ideal para morar ou curtir o verão. Ampla varanda, espaço gourmet com churrasqueira e quintal gramado.',
    fotos: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=80'
    ],
    proprietarioNome: 'Fernanda Machado',
    proprietarioTelefone: '(48) 98444-9900'
  }
];

export const DEMO_TESTIMONIALS: Testimonial[] = [
  {
    id: 'demot1',
    createdAt: 1720000000000,
    nome: 'Marina Souza',
    local: 'Criciúma/SC',
    nota: 5,
    texto: 'Comprei meu primeiro apartamento com a ajuda do corretor e fui super bem orientada em cada etapa, da visita até a assinatura do contrato no banco.',
    origem: 'google',
    foto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    destaque: true
  },
  {
    id: 'demot2',
    createdAt: 1719999000000,
    nome: 'Rafael Cardoso',
    local: 'Balneário Rincão/SC',
    nota: 5,
    texto: 'Vendi minha casa em poucas semanas! O anúncio ficou ótimo, com fotos de alta qualidade, e o atendimento nas visitas foi rápido e muito transparente.',
    origem: 'google',
    foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    destaque: true
  },
  {
    id: 'demot3',
    createdAt: 1719998000000,
    nome: 'Juliana Ramos',
    local: 'Forquilhinha/SC',
    nota: 5,
    texto: 'Aluguei um imóvel residencial e todo o processo foi transparente e sem burocracia excessiva. Recomendo fortemente para quem busca segurança.',
    origem: 'direto',
    foto: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    destaque: true
  },
  {
    id: 'demot4',
    createdAt: 1719997000000,
    nome: 'Carlos Eduardo Santos',
    local: 'Criciúma/SC',
    nota: 5,
    texto: 'Excelente profissional! Me ajudou a encontrar uma área comercial perfeita para a expansão do meu negócio. Atendimento muito ágil e ético.',
    origem: 'google',
    foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    destaque: true
  },
  {
    id: 'demot5',
    createdAt: 1719996000000,
    nome: 'Beatriz Vasconcelos',
    local: 'Içara/SC',
    nota: 5,
    texto: 'Atendimento impecável! Respondeu a todas as dúvidas com paciência e conhecimento do mercado imobiliário da região.',
    origem: 'google',
    foto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    destaque: true
  },
  {
    id: 'demot6',
    createdAt: 1719995000000,
    nome: 'Marcelo Silveira',
    local: 'Criciúma/SC',
    nota: 5,
    texto: 'Negociação transparente e segura. Recomendo para todos que procuram tranquilidade ao adquirir seu imóvel.',
    origem: 'direto',
    foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    destaque: true
  }
];

// LocalStorage functions
export function notifyStorageChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('local-storage-updated'));
  }
}

export function subscribeStorage(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  window.addEventListener('local-storage-updated', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('local-storage-updated', callback);
  };
}

let cachedConfigRaw: string | null = null;
let cachedConfigObj: SiteConfig = DEFAULT_CONFIG;

export function getStoredConfigSnapshot(): SiteConfig {
  if (typeof window === 'undefined') return DEFAULT_CONFIG;
  const raw = localStorage.getItem('site-config');
  if (raw === cachedConfigRaw && cachedConfigRaw !== null) return cachedConfigObj;
  cachedConfigRaw = raw;
  if (!raw) {
    cachedConfigObj = DEFAULT_CONFIG;
  } else {
    try {
      cachedConfigObj = { ...DEFAULT_CONFIG, ...JSON.parse(raw) };
    } catch (e) {
      cachedConfigObj = DEFAULT_CONFIG;
    }
  }
  return cachedConfigObj;
}

export function getStoredConfig(): SiteConfig {
  return getStoredConfigSnapshot();
}

export function saveStoredConfig(config: SiteConfig): boolean {
  if (typeof window === 'undefined') return false;
  try {
    localStorage.setItem('site-config', JSON.stringify(config));
    notifyStorageChange();
    return true;
  } catch (e) {
    console.error('Failed to save config:', e);
    return false;
  }
}

let cachedPropsKey: string | null = null;
let cachedPropsList: Property[] = DEMO_PROPERTIES;

export function getStoredPropertiesSnapshot(): Property[] {
  if (typeof window === 'undefined') return DEMO_PROPERTIES;
  const isSeeded = localStorage.getItem('property-seeded-v3');
  const idxRaw = localStorage.getItem('property-index') || '';
  const key = `${isSeeded || ''}_${idxRaw}`;
  if (key === cachedPropsKey && cachedPropsKey !== null) return cachedPropsList;
  cachedPropsKey = key;
  cachedPropsList = getStoredProperties();
  return cachedPropsList;
}

export function getStoredProperties(): Property[] {
  if (typeof window === 'undefined') return DEMO_PROPERTIES;
  try {
    const isSeeded = localStorage.getItem('property-seeded-v3');
    if (!isSeeded) {
      localStorage.setItem('property-seeded-v3', 'true');
      saveStoredProperties(DEMO_PROPERTIES);
      return DEMO_PROPERTIES;
    }

    const idxRaw = localStorage.getItem('property-index');
    if (!idxRaw) {
      return [];
    }

    const ids: string[] = JSON.parse(idxRaw);
    const properties: Property[] = [];
    for (const id of ids) {
      const pRaw = localStorage.getItem('property:' + id);
      if (pRaw) {
        try {
          properties.push(JSON.parse(pRaw));
        } catch (e) {}
      }
    }
    return properties.sort((a, b) => b.createdAt - a.createdAt);
  } catch (e) {
    return DEMO_PROPERTIES;
  }
}

export interface BrokerCredentials {
  user: string;
  passHash: string;
}

export function getStoredCredentials(): BrokerCredentials {
  const defaultCreds: BrokerCredentials = {
    user: 'admin1',
    // SHA-256 for '123456'
    passHash: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92'
  };
  if (typeof window === 'undefined') return defaultCreds;
  try {
    const raw = localStorage.getItem('broker-credentials');
    if (!raw) return defaultCreds;
    const parsed = JSON.parse(raw);
    return {
      user: parsed.user || defaultCreds.user,
      passHash: parsed.passHash || defaultCreds.passHash
    };
  } catch (e) {
    return defaultCreds;
  }
}

export function saveStoredCredentials(user: string, passHash: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    localStorage.setItem('broker-credentials', JSON.stringify({ user, passHash }));
    notifyStorageChange();
    return true;
  } catch (e) {
    console.error('Failed to save credentials:', e);
    return false;
  }
}

export function saveStoredProperties(properties: Property[]): boolean {
  if (typeof window === 'undefined') return false;
  try {
    // 1. Save new index
    const ids = properties.map(p => p.id);
    localStorage.setItem('property-index', JSON.stringify(ids));

    // 2. Save each property
    for (const p of properties) {
      localStorage.setItem('property:' + p.id, JSON.stringify(p));
    }

    // 3. Clean up orphans
    const newIdSet = new Set(ids);
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('property:')) {
        const propId = key.replace('property:', '');
        if (!newIdSet.has(propId)) {
          localStorage.removeItem(key);
        }
      }
    }

    notifyStorageChange();
    return true;
  } catch (e) {
    console.error('Failed to save properties:', e);
    return false;
  }
}

export function deleteStoredProperty(id: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    // Remove specific item
    localStorage.removeItem('property:' + id);

    // Update index
    const idxRaw = localStorage.getItem('property-index');
    if (idxRaw) {
      const ids: string[] = JSON.parse(idxRaw);
      const updatedIds = ids.filter(i => i !== id);
      localStorage.setItem('property-index', JSON.stringify(updatedIds));
    }
    notifyStorageChange();
    return true;
  } catch (e) {
    return false;
  }
}

let cachedTestimonialsKey: string | null = null;
let cachedTestimonialsList: Testimonial[] = DEMO_TESTIMONIALS;

export function getStoredTestimonialsSnapshot(): Testimonial[] {
  if (typeof window === 'undefined') return DEMO_TESTIMONIALS;
  const isSeeded = localStorage.getItem('testimonial-seeded-v2');
  const idxRaw = localStorage.getItem('testimonial-index') || '';
  const key = `${isSeeded || ''}_${idxRaw}`;
  if (key === cachedTestimonialsKey && cachedTestimonialsKey !== null) return cachedTestimonialsList;
  cachedTestimonialsKey = key;
  cachedTestimonialsList = getStoredTestimonials();
  return cachedTestimonialsList;
}

export function getStoredTestimonials(): Testimonial[] {
  if (typeof window === 'undefined') return DEMO_TESTIMONIALS;
  try {
    const isSeeded = localStorage.getItem('testimonial-seeded-v2');
    if (!isSeeded) {
      localStorage.setItem('testimonial-seeded-v2', 'true');
      saveStoredTestimonials(DEMO_TESTIMONIALS);
      return DEMO_TESTIMONIALS;
    }

    const idxRaw = localStorage.getItem('testimonial-index');
    if (!idxRaw) {
      return [];
    }

    const ids: string[] = JSON.parse(idxRaw);
    const testimonials: Testimonial[] = [];
    for (const id of ids) {
      const tRaw = localStorage.getItem('testimonial:' + id);
      if (tRaw) {
        try {
          testimonials.push(JSON.parse(tRaw));
        } catch (e) {}
      }
    }
    return testimonials.sort((a, b) => b.createdAt - a.createdAt);
  } catch (e) {
    return DEMO_TESTIMONIALS;
  }
}

export function saveStoredTestimonials(testimonials: Testimonial[]): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const ids = testimonials.map(t => t.id);
    localStorage.setItem('testimonial-index', JSON.stringify(ids));
    for (const t of testimonials) {
      localStorage.setItem('testimonial:' + t.id, JSON.stringify(t));
    }

    const newIdSet = new Set(ids);
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('testimonial:')) {
        const tId = key.replace('testimonial:', '');
        if (!newIdSet.has(tId)) {
          localStorage.removeItem(key);
        }
      }
    }

    notifyStorageChange();
    return true;
  } catch (e) {
    return false;
  }
}

export function deleteStoredTestimonial(id: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    localStorage.removeItem('testimonial:' + id);
    const idxRaw = localStorage.getItem('testimonial-index');
    if (idxRaw) {
      const ids: string[] = JSON.parse(idxRaw);
      const updatedIds = ids.filter(i => i !== id);
      localStorage.setItem('testimonial-index', JSON.stringify(updatedIds));
    }
    notifyStorageChange();
    return true;
  } catch (e) {
    return false;
  }
}

let cachedCorretoresKey: string | null = null;
let cachedCorretoresList: Corretor[] = DEMO_CORRETORES;

export function getStoredCorretoresSnapshot(): Corretor[] {
  if (typeof window === 'undefined') return DEMO_CORRETORES;
  const isSeeded = localStorage.getItem('corretor-seeded-v1');
  const idxRaw = localStorage.getItem('corretor-index') || '';
  const key = `${isSeeded || ''}_${idxRaw}`;
  if (key === cachedCorretoresKey && cachedCorretoresKey !== null) return cachedCorretoresList;
  cachedCorretoresKey = key;
  cachedCorretoresList = getStoredCorretores();
  return cachedCorretoresList;
}

export function getStoredCorretores(): Corretor[] {
  if (typeof window === 'undefined') return DEMO_CORRETORES;
  try {
    const isSeeded = localStorage.getItem('corretor-seeded-v1');
    if (!isSeeded) {
      localStorage.setItem('corretor-seeded-v1', 'true');
      saveStoredCorretores(DEMO_CORRETORES);
      return DEMO_CORRETORES;
    }

    const idxRaw = localStorage.getItem('corretor-index');
    if (!idxRaw) return [];

    const ids: string[] = JSON.parse(idxRaw);
    const corretores: Corretor[] = [];
    for (const id of ids) {
      const cRaw = localStorage.getItem('corretor:' + id);
      if (cRaw) {
        try {
          corretores.push(JSON.parse(cRaw));
        } catch (e) {}
      }
    }
    return corretores.sort((a, b) => b.createdAt - a.createdAt);
  } catch (e) {
    return DEMO_CORRETORES;
  }
}

export function saveStoredCorretores(corretores: Corretor[]): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const ids = corretores.map(c => c.id);
    localStorage.setItem('corretor-index', JSON.stringify(ids));
    for (const c of corretores) {
      localStorage.setItem('corretor:' + c.id, JSON.stringify(c));
    }

    const newIdSet = new Set(ids);
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('corretor:')) {
        const cId = key.replace('corretor:', '');
        if (!newIdSet.has(cId)) {
          localStorage.removeItem(key);
        }
      }
    }

    notifyStorageChange();
    return true;
  } catch (e) {
    return false;
  }
}

export function deleteStoredCorretor(id: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    localStorage.removeItem('corretor:' + id);
    const idxRaw = localStorage.getItem('corretor-index');
    if (idxRaw) {
      const ids: string[] = JSON.parse(idxRaw);
      const updatedIds = ids.filter(i => i !== id);
      localStorage.setItem('corretor-index', JSON.stringify(updatedIds));
    }
    notifyStorageChange();
    return true;
  } catch (e) {
    return false;
  }
}

// Client-side image compression to base64
export function resizeImageToDataUrl(file: File, maxW = 1100, quality = 0.75): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        let { width, height } = img;
        if (width > maxW) {
          height = Math.round(height * (maxW / width));
          width = maxW;
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject('No canvas context');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

// Helper SHA-256 for password verification
export async function sha256(text: string): Promise<string> {
  const enc = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest('SHA-256', enc);
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Reference code formatter: ID -> "REF 0001"
export function formatRefCode(id: string): string {
  const numOnly = id.replace(/\D/g, '');
  if (!numOnly) {
    // string fallback
    return `REF-${id.slice(-4).toUpperCase()}`;
  }
  return 'REF ' + numOnly.slice(-4).padStart(4, '0');
}

// Currency / price formatter
export function formatPrice(value: number, transacao?: string): string {
  const n = Number(value) || 0;
  const formatted = n.toLocaleString('pt-BR', { maximumFractionDigits: 0 });
  return `R$ ${formatted}${transacao === 'Aluguel' ? ' /mês' : ''}`;
}

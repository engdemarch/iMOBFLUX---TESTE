export interface Corretor {
  id: string;
  nome: string;
  creci: string;
  telefone: string;
  whats: string; // digits only e.g. 5548999990000
  email?: string;
  foto?: string;
  cargo?: string; // e.g. "Corretor de Imóveis", "Especialista em Lançamentos"
  createdAt: number;
}

export interface Property {
  id: string;
  createdAt: number;
  titulo: string;
  transacao: 'Venda' | 'Aluguel';
  tipo: string;
  bairro: string;
  cidade: string;
  estado: string;
  endereco?: string;
  preco: number;
  quartos: number;
  banheiros: number;
  vagas: number;
  area: number;
  destaque: boolean;
  descricao: string;
  tags?: string[];
  previsaoEntrega?: string;
  fotos: string[];
  // Private internal owner info (never shown publicly)
  proprietarioNome?: string;
  proprietarioTelefone?: string;
  proprietarioObs?: string;
  // Associated Broker (for Imobiliárias with multiple brokers)
  corretorId?: string;
  corretorNome?: string;
  corretorCreci?: string;
  corretorWhats?: string;
  corretorFoto?: string;
  corretorCargo?: string;
}

export interface SiteConfig {
  nome: string;
  subtitulo: string;
  creci: string;
  telefone: string;
  whats: string; // digits only with DDI e.g. 5548999990000
  email: string;
  endereco: string;
  enderecoAtendimento?: string;
  mostrarMapa?: boolean;
  googleMapsEmbedUrl?: string;
  logo: string; // Base64 data URL
  mostrarNome: boolean;
  banners: string[]; // Array of Base64 data URLs / image links
  // Broker Presentation / About section
  tipoPerfil?: 'corretor' | 'imobiliaria';
  fotoCorretor?: string;
  sobreTitulo?: string;
  sobreTexto?: string;
  mostrarSobre?: boolean;
  anosExperiencia?: string;
  imoveisNegociados?: string;
}

export interface Testimonial {
  id: string;
  createdAt: number;
  nome: string;
  local?: string;
  nota: number; // 1 to 5
  texto: string;
  origem?: 'google' | 'direto';
  foto?: string;
  destaque?: boolean;
}

export interface FilterState {
  transacao: string;
  tipo: string;
  cidade: string;
  quartos: string;
}

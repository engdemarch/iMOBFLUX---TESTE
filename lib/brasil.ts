// Estados brasileiros (lista estática — não muda, sem necessidade de API)
export const ESTADOS_BR: { sigla: string; nome: string }[] = [
  { sigla: 'AC', nome: 'Acre' },
  { sigla: 'AL', nome: 'Alagoas' },
  { sigla: 'AP', nome: 'Amapá' },
  { sigla: 'AM', nome: 'Amazonas' },
  { sigla: 'BA', nome: 'Bahia' },
  { sigla: 'CE', nome: 'Ceará' },
  { sigla: 'DF', nome: 'Distrito Federal' },
  { sigla: 'ES', nome: 'Espírito Santo' },
  { sigla: 'GO', nome: 'Goiás' },
  { sigla: 'MA', nome: 'Maranhão' },
  { sigla: 'MT', nome: 'Mato Grosso' },
  { sigla: 'MS', nome: 'Mato Grosso do Sul' },
  { sigla: 'MG', nome: 'Minas Gerais' },
  { sigla: 'PA', nome: 'Pará' },
  { sigla: 'PB', nome: 'Paraíba' },
  { sigla: 'PR', nome: 'Paraná' },
  { sigla: 'PE', nome: 'Pernambuco' },
  { sigla: 'PI', nome: 'Piauí' },
  { sigla: 'RJ', nome: 'Rio de Janeiro' },
  { sigla: 'RN', nome: 'Rio Grande do Norte' },
  { sigla: 'RS', nome: 'Rio Grande do Sul' },
  { sigla: 'RO', nome: 'Rondônia' },
  { sigla: 'RR', nome: 'Roraima' },
  { sigla: 'SC', nome: 'Santa Catarina' },
  { sigla: 'SP', nome: 'São Paulo' },
  { sigla: 'SE', nome: 'Sergipe' },
  { sigla: 'TO', nome: 'Tocantins' }
];

export function formatCep(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

export function formatCpf(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
}

export function isValidCpf(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  if (digits.length !== 11 || /^(\d)\1{10}$/.test(digits)) return false;

  const checkDigit = (base: string) => {
    let total = 0;
    let factor = base.length + 1;
    for (const char of base) {
      total += parseInt(char, 10) * factor--;
    }
    const remainder = (total * 10) % 11;
    return remainder === 10 ? 0 : remainder;
  };

  const d1 = checkDigit(digits.slice(0, 9));
  const d2 = checkDigit(digits.slice(0, 10));
  return d1 === parseInt(digits[9], 10) && d2 === parseInt(digits[10], 10);
}

export interface EnderecoPorCep {
  cep: string;
  logradouro: string;
  bairro: string;
  cidade: string;
  estado: string;
}

// Busca endereço a partir do CEP (ViaCEP)
export async function fetchEnderecoPorCep(cep: string): Promise<EnderecoPorCep | null> {
  const digits = cep.replace(/\D/g, '');
  if (digits.length !== 8) return null;

  const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
  if (!res.ok) throw new Error('Falha ao consultar o CEP.');

  const data = await res.json();
  if (data.erro) return null;

  return {
    cep: formatCep(digits),
    logradouro: data.logradouro || '',
    bairro: data.bairro || '',
    cidade: data.localidade || '',
    estado: (data.uf || '').toUpperCase()
  };
}

// Busca todos os municípios de um estado (IBGE), para padronizar a escrita da cidade
export async function fetchCidadesPorEstado(uf: string): Promise<string[]> {
  if (!uf) return [];

  const res = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
  if (!res.ok) throw new Error('Falha ao buscar cidades do estado.');

  const data: { nome: string }[] = await res.json();
  return data.map((c) => c.nome).sort((a, b) => a.localeCompare(b, 'pt-BR'));
}

'use client';

import { useCidadesPorEstado } from '@/hooks/useCidadesPorEstado';

interface CidadeSelectProps {
  estado: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  className?: string;
  id?: string;
}

// Select de cidade populado dinamicamente com os municípios do estado (IBGE),
// para padronizar a escrita. Mantém o valor atual como opção mesmo se ele não
// vier da lista (ex: registro antigo salvo como texto livre).
export function CidadeSelect({ estado, value, onChange, required, className, id }: CidadeSelectProps) {
  const { cidades, loading, error } = useCidadesPorEstado(estado);

  if (!estado) {
    return (
      <select disabled value="" onChange={() => {}} className={className} id={id}>
        <option value="">Selecione o estado primeiro</option>
      </select>
    );
  }

  if (error) {
    return (
      <input
        type="text"
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder="Não foi possível carregar as cidades. Digite manualmente."
        className={className}
      />
    );
  }

  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      disabled={loading}
      className={className}
    >
      <option value="">{loading ? 'Carregando cidades...' : 'Selecione a cidade'}</option>
      {value && !cidades.includes(value) && <option value={value}>{value}</option>}
      {cidades.map((cidade) => (
        <option key={cidade} value={cidade}>
          {cidade}
        </option>
      ))}
    </select>
  );
}

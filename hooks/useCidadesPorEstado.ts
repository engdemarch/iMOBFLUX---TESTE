'use client';

import { useEffect, useState } from 'react';
import { fetchCidadesPorEstado } from '@/lib/brasil';

// Cache em módulo: evita rebuscar as cidades do mesmo estado a cada troca de aba/formulário
const cidadesCache: Record<string, string[]> = {};

export function useCidadesPorEstado(uf: string) {
  const [cidades, setCidades] = useState<string[]>(uf ? cidadesCache[uf] || [] : []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!uf) {
      setCidades([]);
      setError(false);
      return;
    }

    if (cidadesCache[uf]) {
      setCidades(cidadesCache[uf]);
      setError(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(false);

    fetchCidadesPorEstado(uf)
      .then((lista) => {
        if (cancelled) return;
        cidadesCache[uf] = lista;
        setCidades(lista);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [uf]);

  return { cidades, loading, error };
}

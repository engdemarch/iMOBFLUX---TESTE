'use client';

import React from 'react';
import { Property, FilterState } from '@/lib/types';
import { PropertyCardModerno } from './PropertyCardModerno';

interface PropertyCatalogModernoProps {
  properties: Property[];
  filters: FilterState;
  onSelectProperty: (property: Property) => void;
}

export const PropertyCatalogModerno: React.FC<PropertyCatalogModernoProps> = ({
  properties,
  filters,
  onSelectProperty
}) => {
  const filteredProperties = properties.filter((p) => {
    if (filters.transacao && p.transacao !== filters.transacao) return false;
    if (filters.tipo && p.tipo !== filters.tipo) return false;
    if (filters.cidade && p.cidade !== filters.cidade) return false;
    if (filters.quartos && Number(p.quartos) < Number(filters.quartos)) return false;
    return true;
  }).sort((a, b) => (Number(b.destaque) - Number(a.destaque)) || (b.createdAt - a.createdAt));

  const countText = `${filteredProperties.length} ${filteredProperties.length === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}`;

  return (
    <section className="py-14 sm:py-20" id="imoveis">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
        <div className="text-center max-w-lg mx-auto mb-12">
          <div className="inline-flex items-center px-3 py-1 mb-3 bg-[#F4F6F8] rounded-full text-[11px] font-semibold text-[var(--t-primary)] uppercase tracking-wide">
            Catálogo
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#15263A] tracking-tight">
            Imóveis disponíveis
          </h2>
          <p className="text-[#68707C] text-sm sm:text-base mt-2">{countText}</p>
        </div>

        {filteredProperties.length === 0 ? (
          <div className="p-16 text-center text-[#68707C] bg-[#F4F6F8] rounded-2xl">
            <p className="text-base font-medium">Nenhum imóvel encontrado com esses filtros.</p>
            <p className="text-sm mt-1 text-[#68707C]/80">Tente selecionar outras opções de transação, cidade ou tipo de imóvel.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((p) => (
              <PropertyCardModerno key={p.id} property={p} onSelect={onSelectProperty} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

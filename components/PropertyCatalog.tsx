'use client';

import React from 'react';
import { Property, FilterState } from '@/lib/types';
import { PropertyCard } from './PropertyCard';

interface PropertyCatalogProps {
  properties: Property[];
  filters: FilterState;
  onSelectProperty: (property: Property) => void;
}

export const PropertyCatalog: React.FC<PropertyCatalogProps> = ({
  properties,
  filters,
  onSelectProperty,
}) => {
  // Filter logic
  const filteredProperties = properties.filter(p => {
    if (filters.transacao && p.transacao !== filters.transacao) return false;
    if (filters.tipo && p.tipo !== filters.tipo) return false;
    if (filters.cidade && p.cidade !== filters.cidade) return false;
    if (filters.quartos && Number(p.quartos) < Number(filters.quartos)) return false;
    return true;
  }).sort((a, b) => (Number(b.destaque) - Number(a.destaque)) || (b.createdAt - a.createdAt));

  const countText = `${filteredProperties.length} ${
    filteredProperties.length === 1 ? 'imóvel encontrado' : 'imóveis encontrados'
  }`;

  return (
    <section className="py-12 sm:py-16" id="imoveis">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-semibold tracking-[0.12em] uppercase text-[var(--t-primary)] mb-2">
              Catálogo
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#15263A] tracking-tight">
              Imóveis disponíveis
            </h2>
            <p className="text-[#68707C] text-sm sm:text-base mt-2 max-w-lg">
              Atualizado diretamente pelo corretor — sempre com fotos e informações completas.
            </p>
          </div>
          <div className="text-xs sm:text-sm font-medium text-[#68707C] whitespace-nowrap bg-[#FFFFFF] px-3.5 py-1.5 border border-[#DEE2E7] rounded-[2px]">
            {countText}
          </div>
        </div>

        {/* Grid */}
        {filteredProperties.length === 0 ? (
          <div className="p-16 text-center text-[#68707C] bg-[#FFFFFF] border border-[#DEE2E7] rounded-[2px]">
            <p className="text-base font-medium">Nenhum imóvel encontrado com esses filtros.</p>
            <p className="text-sm mt-1 text-[#68707C]/80">Tente selecionar outras opções de transação, cidade ou tipo de imóvel.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map(p => (
              <PropertyCard key={p.id} property={p} onSelect={onSelectProperty} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

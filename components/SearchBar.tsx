'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { FilterState } from '@/lib/types';

interface SearchBarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  cities: string[];
  onSearch: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  filters,
  setFilters,
  cities,
  onSearch
}) => {
  const handleChange = (field: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="relative -mt-12 sm:-mt-14 z-30 max-w-[1180px] mx-auto px-5 sm:px-8 mb-12 sm:mb-16">
      <div className="bg-[#FFFFFF] border border-[#DEE2E7] rounded-[2px] shadow-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-[1.1fr_1.1fr_1.1fr_0.9fr_auto] gap-0 overflow-hidden">
        {/* Field 1: Transação */}
        <div className="p-4 sm:p-5 border-b sm:border-b-0 sm:border-r border-[#DEE2E7]">
          <label htmlFor="f-transacao" className="block text-[11px] font-semibold tracking-[0.08em] uppercase text-[#68707C] mb-1.5">
            Transação
          </label>
          <select
            id="f-transacao"
            value={filters.transacao}
            onChange={(e) => handleChange('transacao', e.target.value)}
            className="w-full bg-transparent border-none text-[#15263A] text-sm sm:text-base font-medium focus:outline-none cursor-pointer"
          >
            <option value="">Todas</option>
            <option value="Venda">Comprar</option>
            <option value="Aluguel">Alugar</option>
          </select>
        </div>

        {/* Field 2: Tipo de Imóvel */}
        <div className="p-4 sm:p-5 border-b sm:border-b-0 md:border-r border-[#DEE2E7]">
          <label htmlFor="f-tipo" className="block text-[11px] font-semibold tracking-[0.08em] uppercase text-[#68707C] mb-1.5">
            Tipo de imóvel
          </label>
          <select
            id="f-tipo"
            value={filters.tipo}
            onChange={(e) => handleChange('tipo', e.target.value)}
            className="w-full bg-transparent border-none text-[#15263A] text-sm sm:text-base font-medium focus:outline-none cursor-pointer"
          >
            <option value="">Todos</option>
            <option value="Casa">Casa</option>
            <option value="Apartamento">Apartamento</option>
            <option value="Casa de Condomínio">Casa de Condomínio</option>
            <option value="Terreno / Lote">Terreno / Lote</option>
            <option value="Sala Comercial">Sala Comercial</option>
            <option value="Chácara / Sítio">Chácara / Sítio</option>
          </select>
        </div>

        {/* Field 3: Cidade */}
        <div className="p-4 sm:p-5 border-b sm:border-b-0 sm:border-r border-[#DEE2E7]">
          <label htmlFor="f-cidade" className="block text-[11px] font-semibold tracking-[0.08em] uppercase text-[#68707C] mb-1.5">
            Cidade
          </label>
          <select
            id="f-cidade"
            value={filters.cidade}
            onChange={(e) => handleChange('cidade', e.target.value)}
            className="w-full bg-transparent border-none text-[#15263A] text-sm sm:text-base font-medium focus:outline-none cursor-pointer"
          >
            <option value="">Todas</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Field 4: Quartos */}
        <div className="p-4 sm:p-5 border-b lg:border-b-0 lg:border-r border-[#DEE2E7]">
          <label htmlFor="f-quartos" className="block text-[11px] font-semibold tracking-[0.08em] uppercase text-[#68707C] mb-1.5">
            Quartos
          </label>
          <select
            id="f-quartos"
            value={filters.quartos}
            onChange={(e) => handleChange('quartos', e.target.value)}
            className="w-full bg-transparent border-none text-[#15263A] text-sm sm:text-base font-medium focus:outline-none cursor-pointer"
          >
            <option value="">Qualquer</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>

        {/* Search Button */}
        <button
          type="button"
          onClick={onSearch}
          className="col-span-1 sm:col-span-2 md:col-span-4 lg:col-span-1 flex items-center justify-center gap-2 px-8 py-4 sm:py-5 bg-[#15263A] hover:bg-[#0F3D5C] text-[#F2F4F6] text-xs sm:text-sm font-semibold tracking-[0.06em] uppercase transition-colors border-none"
        >
          <Search className="w-4 h-4" />
          <span>Buscar imóveis</span>
        </button>
      </div>
    </div>
  );
};

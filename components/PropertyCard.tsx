'use client';

import React from 'react';
import { Property } from '@/lib/types';
import { formatPrice, formatRefCode } from '@/lib/storage';
import { Tag } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  onSelect: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onSelect }) => {
  const coverImage = (property.fotos && property.fotos.length > 0)
    ? property.fotos[0]
    : 'https://picsum.photos/seed/placeholder/800/600';

  const hasTags = property.tags && property.tags.length > 0;

  return (
    <div
      onClick={() => onSelect(property)}
      className="bg-[#FFFFFF] flex flex-col cursor-pointer group relative border border-[#DEE2E7]/80 hover:shadow-lg transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#e5e2d8]">
        <img
          src={coverImage}
          alt={property.titulo}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Ref Code Badge */}
        <div className="absolute top-3.5 left-3.5 bg-[#122234]/85 text-[#F4F1EA] text-[11px] px-2.5 py-1 tracking-wider font-mono uppercase rounded-[1px]">
          {formatRefCode(property.id)}
        </div>

        {/* Transaction Badge */}
        <div className="absolute top-3.5 right-3.5 bg-[#0F3D5C] text-white text-[11px] px-2.5 py-1 tracking-wider uppercase font-semibold rounded-[1px]">
          {property.transacao}
        </div>

        {/* Highlight Badge + Tags on Cover Image */}
        {(property.destaque || hasTags) && (
          <div className="absolute bottom-3.5 left-3.5 right-3.5 flex flex-wrap gap-1.5">
            {property.destaque && (
              <span className="bg-[#A8452F] text-white text-[10px] px-2 py-0.5 tracking-wider uppercase font-bold rounded-[1px]">
                Destaque
              </span>
            )}
            {hasTags && property.tags!.map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 bg-[#122234]/85 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 tracking-wider uppercase font-semibold rounded-[1px] border border-white/10"
              >
                <Tag className="w-2.5 h-2.5 opacity-80" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Card Content Body */}
      <div className="p-5 pb-0 flex-1 flex flex-col justify-between">
        <div>
          <div className="font-['Space_Grotesk'] text-xl font-bold text-[#15263A] tracking-tight">
            {formatPrice(property.preco, property.transacao)}
          </div>
          <div className="text-[#68707C] text-xs sm:text-[13.5px] mt-1 font-medium truncate">
            {property.bairro}, {property.cidade}{property.estado ? ` - ${property.estado}` : ''}
          </div>
          <h3 className="text-sm sm:text-[14.5px] mt-2 text-[#15263A] leading-snug line-clamp-2 min-h-[38px] font-medium group-hover:text-[#0F3D5C] transition-colors">
            {property.titulo}
          </h3>
        </div>
      </div>

      {/* Specs Strip */}
      <div className="m-5 mt-4 border border-[#DEE2E7] rounded-[2px] grid grid-cols-4 bg-[#F2F4F6]/50">
        <div className="py-2 px-1 text-center border-r border-[#DEE2E7]">
          <div className="mono text-sm font-semibold text-[#15263A]">{property.quartos}</div>
          <div className="text-[9.5px] tracking-widest uppercase text-[#68707C] mt-0.5 font-medium">Quartos</div>
        </div>
        <div className="py-2 px-1 text-center border-r border-[#DEE2E7]">
          <div className="mono text-sm font-semibold text-[#15263A]">{property.banheiros}</div>
          <div className="text-[9.5px] tracking-widest uppercase text-[#68707C] mt-0.5 font-medium">Banh.</div>
        </div>
        <div className="py-2 px-1 text-center border-r border-[#DEE2E7]">
          <div className="mono text-sm font-semibold text-[#15263A]">{property.vagas}</div>
          <div className="text-[9.5px] tracking-widest uppercase text-[#68707C] mt-0.5 font-medium">Vagas</div>
        </div>
        <div className="py-2 px-1 text-center">
          <div className="mono text-sm font-semibold text-[#15263A]">{property.area}</div>
          <div className="text-[9.5px] tracking-widest uppercase text-[#68707C] mt-0.5 font-medium">m²</div>
        </div>
      </div>

      {/* Corretor Agenciador Footer */}
      {property.corretorNome && (
        <div className="px-5 pb-3.5 -mt-2 text-[11px] text-[#0F3D5C] font-semibold flex items-center justify-between border-t border-[#F2F4F6] pt-2">
          <span className="flex items-center gap-1.5 truncate">
            {property.corretorFoto ? (
              <img
                src={property.corretorFoto}
                alt={property.corretorNome}
                className="w-4 h-4 rounded-full object-cover shrink-0 border border-[#CBD5E1]"
              />
            ) : (
              <span className="w-4 h-4 rounded-full bg-[#0F3D5C] text-white text-[9px] font-bold flex items-center justify-center shrink-0">
                {property.corretorNome.charAt(0)}
              </span>
            )}
            <span className="truncate">Agenciador: <strong>{property.corretorNome}</strong></span>
          </span>
          {property.corretorCreci && (
            <span className="text-[10px] text-[#68707C] font-mono shrink-0 ml-1">
              {property.corretorCreci}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

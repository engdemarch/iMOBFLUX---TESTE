'use client';

import React from 'react';
import { Property } from '@/lib/types';
import { formatPrice, formatRefCode } from '@/lib/storage';
import { BedDouble, Bath, Car, Maximize2 } from 'lucide-react';

interface PropertyCardModernoProps {
  property: Property;
  onSelect: (property: Property) => void;
}

export const PropertyCardModerno: React.FC<PropertyCardModernoProps> = ({ property, onSelect }) => {
  const coverImage = (property.fotos && property.fotos.length > 0)
    ? property.fotos[0]
    : 'https://picsum.photos/seed/placeholder/800/600';

  return (
    <div
      onClick={() => onSelect(property)}
      className="bg-white flex flex-col cursor-pointer group rounded-2xl border border-[#E8ECEF] hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#F4F6F8]">
        <img
          src={coverImage}
          alt={property.titulo}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3.5 left-3.5 bg-white/95 text-[#15263A] text-[11px] px-2.5 py-1 font-mono uppercase rounded-full shadow-sm">
          {formatRefCode(property.id)}
        </div>
        {property.destaque && (
          <div className="absolute top-3.5 right-3.5 bg-[var(--t-primary)] text-white text-[10px] px-2.5 py-1 uppercase font-bold rounded-full">
            Destaque
          </div>
        )}
        <div className="absolute bottom-3.5 left-3.5 bg-white rounded-full px-3.5 py-1.5 shadow-sm">
          <span className="font-bold text-sm text-[#15263A]">{formatPrice(property.preco, property.transacao)}</span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="text-[#68707C] text-xs font-medium truncate">
          {property.bairro}, {property.cidade}{property.estado ? ` - ${property.estado}` : ''}
        </div>
        <h3 className="text-sm mt-1.5 text-[#15263A] leading-snug line-clamp-2 min-h-[38px] font-semibold">
          {property.titulo}
        </h3>

        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-[#F0F2F4] text-[#4A5568]">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium">
            <BedDouble className="w-4 h-4 text-[var(--t-primary)]" /> {property.quartos}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium">
            <Bath className="w-4 h-4 text-[var(--t-primary)]" /> {property.banheiros}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium">
            <Car className="w-4 h-4 text-[var(--t-primary)]" /> {property.vagas}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium">
            <Maximize2 className="w-4 h-4 text-[var(--t-primary)]" /> {property.area}m²
          </span>
        </div>

        {property.corretorNome && (
          <div className="mt-3 text-[11px] text-[#68707C] truncate">
            Agenciador: <strong className="text-[#15263A]">{property.corretorNome}</strong>
          </div>
        )}
      </div>
    </div>
  );
};

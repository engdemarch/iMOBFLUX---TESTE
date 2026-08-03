'use client';

import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, MessageCircle, Calendar, Tag, CheckCircle2 } from 'lucide-react';
import { Property, SiteConfig } from '@/lib/types';
import { formatPrice, formatRefCode } from '@/lib/storage';
import { MapPin } from 'lucide-react';

interface PropertyDetailModalProps {
  property: Property | null;
  config: SiteConfig;
  onClose: () => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  config,
  onClose,
}) => {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [prevPropertyId, setPrevPropertyId] = useState<string | null>(null);

  if (property && property.id !== prevPropertyId) {
    setPrevPropertyId(property.id);
    setGalleryIndex(0);
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (property) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [property, onClose]);

  if (!property) return null;

  const photos = (property.fotos && property.fotos.length > 0)
    ? property.fotos
    : ['https://picsum.photos/seed/placeholder/1000/700'];

  const nextPhoto = () => {
    setGalleryIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setGalleryIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const targetWhats = (property.corretorWhats || config.whats || '5548999990000').replace(/\D/g, '');
  const greeting = property.corretorNome ? `Olá ${property.corretorNome.split(' ')[0]}!` : 'Olá!';
  const waMessage = encodeURIComponent(
    `${greeting} Tenho interesse no imóvel "${property.titulo}" (${formatRefCode(property.id)}).`
  );
  const waUrl = `https://wa.me/${targetWhats}?text=${waMessage}`;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 bg-[#122234]/75 backdrop-blur-sm flex items-start justify-center overflow-y-auto p-4 sm:p-6 md:p-10 animate-in fade-in duration-200"
    >
      <div className="bg-[#FFFFFF] max-w-[920px] w-full my-auto relative shadow-2xl rounded-[2px] overflow-hidden border border-[#DEE2E7]">
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#122234]/80 text-white flex items-center justify-center hover:bg-[#122234] transition-colors cursor-pointer"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gallery Slider */}
        <div className="relative aspect-[16/9] sm:aspect-[16/9] bg-[#e5e2d8] overflow-hidden">
          <img
            src={photos[galleryIndex]}
            alt={`${property.titulo} - Foto ${galleryIndex + 1}`}
            className="w-full h-full object-cover transition-all duration-300"
          />

          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={prevPhoto}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 text-[#15263A] flex items-center justify-center hover:bg-white transition-colors shadow-md cursor-pointer"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={nextPhoto}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 text-[#15263A] flex items-center justify-center hover:bg-white transition-colors shadow-md cursor-pointer"
                aria-label="Próxima foto"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Photo Counter */}
          <div className="absolute bottom-3.5 right-4 bg-[#122234]/80 text-white text-xs px-3 py-1 rounded-full font-mono">
            {galleryIndex + 1} / {photos.length}
          </div>
        </div>

        {/* Content Details */}
        <div className="p-6 sm:p-10">
          <div className="flex flex-wrap justify-between items-start gap-4">
            <div>
              <div className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[#15263A]">
                {formatPrice(property.preco, property.transacao)}
              </div>
              <div className="text-[#68707C] text-sm sm:text-base mt-1 font-medium">
                {property.bairro}, {property.cidade}{property.estado ? ` - ${property.estado}` : ''}
              </div>
            </div>
            <div className="mono text-xs font-semibold px-3 py-1 bg-[#F2F4F6] text-[#68707C] border border-[#DEE2E7] rounded-[2px]">
              {formatRefCode(property.id)}
            </div>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-[#15263A] mt-5 max-w-2xl leading-snug">
            {property.titulo}
          </h3>

          {/* Tags & Delivery Highlight Box */}
          {((property.tags && property.tags.length > 0) || property.previsaoEntrega) && (
            <div className="mt-4 p-3.5 bg-[#EAF0F6] border border-[#DEE2E7] rounded-[2px] flex flex-wrap items-center justify-between gap-3">
              {property.tags && property.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-bold text-[#0F3D5C] uppercase tracking-wider flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-[#0F3D5C]" />
                    Diferenciais:
                  </span>
                  {property.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-white text-[#0F3D5C] text-xs font-semibold rounded-[2px] border border-[#CBD5E1] shadow-2xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}

              {property.previsaoEntrega && (
                <div className="flex items-center gap-2 px-3 py-1 bg-[#122234] text-white rounded-[2px] text-xs font-semibold">
                  <Calendar className="w-4 h-4 text-[#25D366]" />
                  <span>Previsão de Entrega: <strong className="text-[#25D366]">{property.previsaoEntrega}</strong></span>
                </div>
              )}
            </div>
          )}

          {/* Specs Bar */}
          <div className="grid grid-cols-4 border border-[#DEE2E7] mt-6 rounded-[2px] bg-[#F2F4F6]/50">
            <div className="p-3 sm:p-4 text-center border-r border-[#DEE2E7]">
              <div className="mono text-base sm:text-lg font-bold text-[#15263A]">{property.quartos}</div>
              <div className="text-[10px] sm:text-[11px] tracking-wider uppercase text-[#68707C] font-semibold mt-0.5">Quartos</div>
            </div>
            <div className="p-3 sm:p-4 text-center border-r border-[#DEE2E7]">
              <div className="mono text-base sm:text-lg font-bold text-[#15263A]">{property.banheiros}</div>
              <div className="text-[10px] sm:text-[11px] tracking-wider uppercase text-[#68707C] font-semibold mt-0.5">Banheiros</div>
            </div>
            <div className="p-3 sm:p-4 text-center border-r border-[#DEE2E7]">
              <div className="mono text-base sm:text-lg font-bold text-[#15263A]">{property.vagas}</div>
              <div className="text-[10px] sm:text-[11px] tracking-wider uppercase text-[#68707C] font-semibold mt-0.5">Vagas</div>
            </div>
            <div className="p-3 sm:p-4 text-center">
              <div className="mono text-base sm:text-lg font-bold text-[#15263A]">{property.area}</div>
              <div className="text-[10px] sm:text-[11px] tracking-wider uppercase text-[#68707C] font-semibold mt-0.5">m² área</div>
            </div>
          </div>

          {/* Full Description */}
          <div className="mt-6 text-[#68707C] text-sm sm:text-base leading-relaxed whitespace-pre-line border-t border-[#DEE2E7] pt-6">
            {property.descricao || 'Sem descrição adicional para este imóvel.'}
          </div>

          {/* Location Map (approximate, by neighborhood — exact street address is kept private) */}
          {(property.bairro || property.cidade) && (
            <div className="mt-6 border-t border-[#DEE2E7] pt-6">
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#0F3D5C] mb-3">
                <MapPin className="w-3.5 h-3.5" />
                <span>Localização aproximada</span>
              </div>
              <div className="bg-[#E8ECEF] border border-[#DEE2E7] rounded-[2px] overflow-hidden h-[260px] sm:h-[320px]">
                <iframe
                  title={`Mapa - ${property.bairro}, ${property.cidade}`}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(
                    [property.bairro, property.cidade, property.estado, 'Brasil'].filter(Boolean).join(', ')
                  )}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <p className="text-[11px] text-[#68707C] mt-2">
                O endereço exato é informado pelo corretor após o contato, para preservar a privacidade do imóvel.
              </p>
            </div>
          )}

          {/* Corretor Agenciador Box */}
          {property.corretorNome && (
            <div className="mt-6 p-4 bg-[#F8FAFC] border border-[#DEE2E7] rounded-[2px] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                {property.corretorFoto ? (
                  <img
                    src={property.corretorFoto}
                    alt={property.corretorNome}
                    className="w-12 h-12 rounded-full object-cover border border-[#CBD5E1] shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-[#0F3D5C] text-white font-bold text-sm flex items-center justify-center shrink-0">
                    {property.corretorNome.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#0F3D5C]">
                    Corretor Agenciador
                  </div>
                  <div className="text-sm sm:text-base font-bold text-[#15263A]">
                    {property.corretorNome}
                  </div>
                  <div className="text-xs text-[#68707C] font-medium">
                    {property.corretorCargo || 'Corretor de Imóveis'} {property.corretorCreci ? `· ${property.corretorCreci}` : ''}
                  </div>
                </div>
              </div>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold uppercase tracking-wider rounded-[2px] inline-flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Falar com {property.corretorNome.split(' ')[0]}</span>
              </a>
            </div>
          )}

          {/* Modal Actions */}
          <div className="mt-8 pt-6 border-t border-[#DEE2E7] flex flex-wrap gap-4 items-center justify-between">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#0F3D5C] hover:bg-[#0B2C44] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-[2px] transition-colors shadow-sm"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Falar sobre este imóvel</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 text-xs sm:text-sm font-medium uppercase tracking-wider text-[#68707C] hover:text-[#15263A] transition-colors cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

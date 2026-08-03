'use client';

import React, { useState, useEffect } from 'react';
import { Testimonial } from '@/lib/types';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const filteredList = testimonials;

  // Calculate items per page (3 cards per slide)
  const itemsPerPage = 3;
  const totalPages = Math.ceil(filteredList.length / itemsPerPage) || 1;

  // Auto-advance slider every 6 seconds
  useEffect(() => {
    if (totalPages <= 1 || isPaused) return;
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 6000);
    return () => clearInterval(interval);
  }, [totalPages, isPaused]);

  // Current visible 3 items
  const startIndex = currentPage * itemsPerPage;
  const currentItems = filteredList.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const renderStars = (nota: number) => {
    const filled = Math.min(5, Math.max(1, nota));
    return (
      <div className="flex items-center gap-1 text-[#F59E0B]">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < filled ? 'fill-[#F59E0B] text-[#F59E0B]' : 'text-[#D1D5DB]'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section
      className="py-20 bg-[#F2F4F6] border-t border-[#DEE2E7]"
      id="depoimentos"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="text-xs font-semibold tracking-[0.12em] uppercase text-[#0F3D5C] mb-2 flex items-center gap-2">
              <span>Depoimentos & Avaliações</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#15263A] tracking-tight">
              O que dizem nossos clientes
            </h2>
            <p className="text-[#68707C] text-base mt-2 max-w-xl">
              Experiências reais e depoimentos verificados de quem comprou, vendeu ou alugou imóvel conosco.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  title="Anteriores"
                  className="w-10 h-10 bg-white border border-[#DEE2E7] hover:border-[#0F3D5C] hover:text-[#0F3D5C] text-[#15263A] flex items-center justify-center rounded-[2px] transition-colors shadow-xs"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-xs font-semibold text-[#68707C] px-1">
                  {currentPage + 1} / {totalPages}
                </span>
                <button
                  onClick={handleNext}
                  title="Próximos"
                  className="w-10 h-10 bg-white border border-[#DEE2E7] hover:border-[#0F3D5C] hover:text-[#0F3D5C] text-[#15263A] flex items-center justify-center rounded-[2px] transition-colors shadow-xs"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Testimonials 3-Card Grid */}
        {filteredList.length === 0 ? (
          <div className="p-12 text-center text-[#68707C] bg-white border border-[#DEE2E7] rounded-[2px]">
            Nenhum depoimento encontrado para esta categoria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentItems.map((t) => (
              <div
                key={t.id}
                className="bg-white border border-[#DEE2E7] p-7 flex flex-col justify-between rounded-[2px] shadow-xs hover:shadow-md transition-all relative group"
              >
                <Quote className="absolute top-6 right-6 w-5 h-5 opacity-20 text-[#0F3D5C]" />

                <div>
                  {/* Rating Stars */}
                  <div className="mb-4">{renderStars(t.nota)}</div>

                  {/* Text */}
                  <p className="text-[#15263A] text-sm sm:text-base leading-relaxed italic font-serif">
                    “{t.texto}”
                  </p>
                </div>

                {/* Author Info */}
                <div className="mt-6 pt-4 border-t border-[#DEE2E7] flex items-center gap-3">
                  {/* Avatar */}
                  {t.foto ? (
                    <img
                      src={t.foto}
                      alt={t.nome}
                      className="w-10 h-10 rounded-full object-cover border border-[#DEE2E7] shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#0F3D5C] text-white font-bold text-sm flex items-center justify-center shrink-0 uppercase">
                      {t.nome.charAt(0)}
                    </div>
                  )}

                  <div className="text-xs text-[#68707C] truncate">
                    <strong className="block text-[#15263A] text-sm font-bold font-sans truncate">
                      {t.nome}
                    </strong>
                    {t.local && <span className="truncate block">{t.local}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Carousel Dots */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                title={`Página ${i + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  i === currentPage
                    ? 'w-8 bg-[#0F3D5C]'
                    : 'w-2.5 bg-[#CBD5E1] hover:bg-[#94A3B8]'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

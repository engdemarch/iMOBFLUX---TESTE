'use client';

import React, { useState, useEffect } from 'react';
import { Testimonial } from '@/lib/types';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  const [filterSource, setFilterSource] = useState<'all' | 'google' | 'direto'>('all');
  const [currentPage, setCurrentPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Filter testimonials based on selected tab or active status
  const filteredList = testimonials.filter((t) => {
    if (filterSource === 'google') return t.origem === 'google';
    if (filterSource === 'direto') return t.origem === 'direto' || !t.origem;
    return true;
  });

  // Calculate items per page (3 cards per slide)
  const itemsPerPage = 3;
  const totalPages = Math.ceil(filteredList.length / itemsPerPage) || 1;

  const handleFilterChange = (source: 'all' | 'google' | 'direto') => {
    setFilterSource(source);
    setCurrentPage(0);
  };

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
              <span className="inline-flex items-center gap-1 bg-[#EA4335] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                </svg>
                Google Reviews
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#15263A] tracking-tight">
              O que dizem nossos clientes
            </h2>
            <p className="text-[#68707C] text-base mt-2 max-w-xl">
              Experiências reais e depoimentos verificados de quem comprou, vendeu ou alugou imóvel conosco.
            </p>
          </div>

          {/* Filter Tabs & Navigation */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
            {/* Filter Buttons */}
            <div className="inline-flex bg-[#E2E6EA] p-1 rounded-[2px] border border-[#DEE2E7] text-xs font-medium">
              <button
                onClick={() => handleFilterChange('all')}
                className={`px-3 py-1.5 rounded-[2px] transition-all ${
                  filterSource === 'all'
                    ? 'bg-white text-[#15263A] font-bold shadow-xs'
                    : 'text-[#68707C] hover:text-[#15263A]'
                }`}
              >
                Todos ({testimonials.length})
              </button>
              <button
                onClick={() => handleFilterChange('google')}
                className={`px-3 py-1.5 rounded-[2px] flex items-center gap-1.5 transition-all ${
                  filterSource === 'google'
                    ? 'bg-white text-[#15263A] font-bold shadow-xs'
                    : 'text-[#68707C] hover:text-[#15263A]'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#EA4335]"></span>
                Google ({testimonials.filter((t) => t.origem === 'google').length})
              </button>
              <button
                onClick={() => handleFilterChange('direto')}
                className={`px-3 py-1.5 rounded-[2px] transition-all ${
                  filterSource === 'direto'
                    ? 'bg-white text-[#15263A] font-bold shadow-xs'
                    : 'text-[#68707C] hover:text-[#15263A]'
                }`}
              >
                Diretos ({testimonials.filter((t) => t.origem === 'direto' || !t.origem).length})
              </button>
            </div>

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
                {/* Source Badge on top right */}
                {t.origem === 'google' ? (
                  <div className="absolute top-6 right-6 inline-flex items-center gap-1.5 bg-[#F8F9FA] border border-[#E5E7EB] px-2.5 py-1 rounded-full text-[11px] font-semibold text-[#3C4043] shadow-xs">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.15C3.26 21.3 7.31 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.28 14.24c-.25-.75-.38-1.55-.38-2.36s.13-1.61.38-2.36V6.37H1.29C.47 8.01 0 9.94 0 12s.47 3.99 1.29 5.63l3.99-3.39z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.37l3.99 3.39c.95-2.85 3.6-4.96 6.72-4.96z"
                      />
                    </svg>
                    <span>Google Review</span>
                  </div>
                ) : (
                  <div className="absolute top-6 right-6 inline-flex items-center gap-1 text-[#68707C] text-[11px] font-medium">
                    <Quote className="w-3.5 h-3.5 opacity-40 text-[#0F3D5C]" />
                    <span>Depoimento</span>
                  </div>
                )}

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

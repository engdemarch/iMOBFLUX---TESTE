'use client';

import React from 'react';
import { SiteConfig } from '@/lib/types';
import { MapPin, Phone, Mail, Clock, Navigation, MessageCircle } from 'lucide-react';

interface LocationMapProps {
  config: SiteConfig;
}

export const LocationMap: React.FC<LocationMapProps> = ({ config }) => {
  const addressToUse = config.enderecoAtendimento || config.endereco;

  if (!config.mostrarMapa || !addressToUse) {
    return null;
  }

  // Generate Google Maps Embed URL if not customized
  const mapEmbedUrl = config.googleMapsEmbedUrl
    ? config.googleMapsEmbedUrl
    : `https://maps.google.com/maps?q=${encodeURIComponent(addressToUse)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  const googleMapsDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressToUse)}`;

  const whatsNumber = config.whats ? config.whats.replace(/\D/g, '') : '';
  const whatsUrl = whatsNumber
    ? `https://wa.me/${whatsNumber}?text=${encodeURIComponent(`Olá! Gostaria de agendar uma visita no seu escritório (${addressToUse}).`)}`
    : '';

  return (
    <section className="py-20 bg-white border-t border-[#DEE2E7]" id="atendimento">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
        <div className="mb-10 text-center sm:text-left">
          <div className="text-xs font-semibold tracking-[0.12em] uppercase text-[var(--t-primary)] mb-2 flex items-center justify-center sm:justify-start gap-1.5">
            <MapPin className="w-4 h-4 text-[var(--t-primary)]" />
            <span>Localização e Atendimento</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#15263A] tracking-tight">
            Venha nos fazer uma visita
          </h2>
          <p className="text-[#68707C] text-base mt-2 max-w-xl">
            Atendimento exclusivo e personalizado para você encontrar ou negociar seu imóvel com total comodidade.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Info Card */}
          <div className="lg:col-span-5 bg-[#F2F4F6] border border-[#DEE2E7] p-8 flex flex-col justify-between rounded-[2px] shadow-sm">
            <div>
              <div className="inline-block bg-[var(--t-primary)] text-white text-[11px] font-bold px-2.5 py-1 rounded-[2px] uppercase tracking-wider mb-6">
                Escritório de Atendimento
              </div>

              <div className="space-y-6 text-[#15263A]">
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#FFFFFF] border border-[#DEE2E7] flex items-center justify-center text-[var(--t-primary)] shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-[#68707C] mb-0.5">
                      Endereço
                    </span>
                    <p className="text-base font-medium leading-snug">
                      {addressToUse}
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#FFFFFF] border border-[#DEE2E7] flex items-center justify-center text-[var(--t-primary)] shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-[#68707C] mb-0.5">
                      Horário de Atendimento
                    </span>
                    <p className="text-sm font-medium">
                      Segunda a Sexta: 08:30 às 18:00<br />
                      Sábado: 09:00 às 12:00 (sob agendamento)
                    </p>
                  </div>
                </div>

                {/* Contact */}
                {config.telefone && (
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-[#FFFFFF] border border-[#DEE2E7] flex items-center justify-center text-[var(--t-primary)] shrink-0 mt-0.5">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-xs font-semibold uppercase tracking-wider text-[#68707C] mb-0.5">
                        Telefone
                      </span>
                      <a
                        href={`tel:${config.telefone.replace(/\D/g, '')}`}
                        className="text-base font-semibold text-[var(--t-primary)] hover:underline"
                      >
                        {config.telefone}
                      </a>
                    </div>
                  </div>
                )}

                {config.email && (
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-[#FFFFFF] border border-[#DEE2E7] flex items-center justify-center text-[var(--t-primary)] shrink-0 mt-0.5">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-xs font-semibold uppercase tracking-wider text-[#68707C] mb-0.5">
                        E-mail
                      </span>
                      <a
                        href={`mailto:${config.email}`}
                        className="text-sm font-medium text-[#15263A] hover:underline"
                      >
                        {config.email}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-8 pt-6 border-t border-[#DEE2E7] space-y-3">
              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[var(--t-primary)] hover:bg-[var(--t-primary-dark)] text-white text-xs font-bold uppercase tracking-wider rounded-[2px] transition-colors shadow-sm"
              >
                <Navigation className="w-4 h-4" />
                <span>Como Chegar (Google Maps)</span>
              </a>

              {whatsUrl && (
                <a
                  href={whatsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold uppercase tracking-wider rounded-[2px] transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Agendar Visita no WhatsApp</span>
                </a>
              )}
            </div>
          </div>

          {/* Interactive Google Map Frame */}
          <div className="lg:col-span-7 bg-[#E8ECEF] border border-[#DEE2E7] rounded-[2px] overflow-hidden min-h-[380px] lg:min-h-[460px] relative shadow-sm">
            <iframe
              title="Mapa de Atendimento Google Maps"
              src={mapEmbedUrl}
              className="w-full h-full min-h-[380px] lg:min-h-[460px] border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

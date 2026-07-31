'use client';

import React, { useState, useSyncExternalStore } from 'react';
import { Property, FilterState } from '@/lib/types';
import {
  DEFAULT_CONFIG,
  DEMO_PROPERTIES,
  DEMO_TESTIMONIALS,
  DEMO_CORRETORES,
  getStoredConfigSnapshot,
  getStoredPropertiesSnapshot,
  getStoredTestimonialsSnapshot,
  getStoredCorretoresSnapshot,
  saveStoredConfig,
  saveStoredProperties,
  saveStoredTestimonials,
  saveStoredCorretores,
  subscribeStorage
} from '@/lib/storage';

import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { SearchBar } from '@/components/SearchBar';
import { PropertyCatalog } from '@/components/PropertyCatalog';
import { HowItWorks } from '@/components/HowItWorks';
import { BrokerPresentation } from '@/components/BrokerPresentation';
import { Testimonials } from '@/components/Testimonials';
import { LocationMap } from '@/components/LocationMap';
import { CtaBanner } from '@/components/CtaBanner';
import { Footer } from '@/components/Footer';
import { PropertyDetailModal } from '@/components/PropertyDetailModal';
import { BrokerFab } from '@/components/BrokerFab';
import { BrokerModal } from '@/components/BrokerModal';

const getServerConfig = () => DEFAULT_CONFIG;
const getServerProperties = () => DEMO_PROPERTIES;
const getServerTestimonials = () => DEMO_TESTIMONIALS;
const getServerCorretores = () => DEMO_CORRETORES;

export default function Home() {
  const config = useSyncExternalStore(subscribeStorage, getStoredConfigSnapshot, getServerConfig);
  const properties = useSyncExternalStore(subscribeStorage, getStoredPropertiesSnapshot, getServerProperties);
  const testimonials = useSyncExternalStore(subscribeStorage, getStoredTestimonialsSnapshot, getServerTestimonials);
  const corretores = useSyncExternalStore(subscribeStorage, getStoredCorretoresSnapshot, getServerCorretores);

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [brokerModalOpen, setBrokerModalOpen] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    transacao: '',
    tipo: '',
    cidade: '',
    quartos: ''
  });

  // Aggregate cities for search filter
  const availableCities = Array.from(
    new Set(properties.map(p => p.cidade).filter(Boolean))
  ).sort();

  const handleSearchClick = () => {
    const imoveisEl = document.getElementById('imoveis');
    if (imoveisEl) {
      imoveisEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Header */}
      <Header
        config={config}
        onOpenBrokerModal={() => setBrokerModalOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero config={config} />

        {/* Search / Filter Bar */}
        <SearchBar
          filters={filters}
          setFilters={setFilters}
          cities={availableCities}
          onSearch={handleSearchClick}
        />

        {/* Property Catalog Section */}
        <PropertyCatalog
          properties={properties}
          filters={filters}
          onSelectProperty={(p) => setSelectedProperty(p)}
        />

        {/* Process Section */}
        <HowItWorks />

        {/* Broker Presentation / About Section */}
        <BrokerPresentation config={config} />

        {/* Testimonials Section */}
        <Testimonials testimonials={testimonials} />

        {/* Location & Google Map Section */}
        <LocationMap config={config} />

        {/* CTA Anuncie Section */}
        <CtaBanner config={config} />
      </main>

      {/* Footer */}
      <Footer
        config={config}
        onOpenBrokerModal={() => setBrokerModalOpen(true)}
      />

      {/* Property Detail Modal */}
      <PropertyDetailModal
        property={selectedProperty}
        config={config}
        onClose={() => setSelectedProperty(null)}
      />

      {/* Floating Chat Widget & Discreet Broker Access */}
      <BrokerFab config={config} onClick={() => setBrokerModalOpen(true)} />

      {/* Broker Admin Modal */}
      <BrokerModal
        isOpen={brokerModalOpen}
        onClose={() => setBrokerModalOpen(false)}
        config={config}
        properties={properties}
        testimonials={testimonials}
        corretores={corretores}
        onUpdateConfig={(newConfig) => saveStoredConfig(newConfig)}
        onUpdateProperties={(newProperties) => saveStoredProperties(newProperties)}
        onUpdateTestimonials={(newTestimonials) => saveStoredTestimonials(newTestimonials)}
        onUpdateCorretores={(newCorretores) => saveStoredCorretores(newCorretores)}
      />
    </div>
  );
}

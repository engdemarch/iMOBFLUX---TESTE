'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { Property, SiteConfig, Testimonial, Corretor, FilterState } from '@/lib/types';
import { DEFAULT_CONFIG, DEMO_PROPERTIES, DEMO_TESTIMONIALS, DEMO_CORRETORES } from '@/lib/storage';
import {
  resolveTenantId,
  getConfig,
  getProperties,
  getTestimonials,
  getCorretores,
  getTenantStatus,
  saveConfig,
  saveProperties,
  saveTestimonials,
  saveCorretores
} from '@/lib/db';
import { supabase } from '@/lib/supabase/client';
import { getTemplate } from '@/lib/templates';

import { SiteUnavailable } from '@/components/SiteUnavailable';
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
import { HeaderModerno } from '@/components/templates/moderno/HeaderModerno';
import { HeroModerno } from '@/components/templates/moderno/HeroModerno';
import { PropertyCatalogModerno } from '@/components/templates/moderno/PropertyCatalogModerno';
import { CtaBannerModerno } from '@/components/templates/moderno/CtaBannerModerno';
import { FooterModerno } from '@/components/templates/moderno/FooterModerno';
import { PropertyDetailModal } from '@/components/PropertyDetailModal';
import { BrokerFab } from '@/components/BrokerFab';
import { BrokerModal } from '@/components/BrokerModal';

export default function Home() {
  const [tenantId, setTenantId] = useState<string | null>(null);
  const [tenantStatus, setTenantStatus] = useState<string | null>(null);
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_CONFIG);
  const [properties, setProperties] = useState<Property[]>(DEMO_PROPERTIES);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(DEMO_TESTIMONIALS);
  const [corretores, setCorretores] = useState<Corretor[]>(DEMO_CORRETORES);

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [brokerModalOpen, setBrokerModalOpen] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    transacao: '',
    tipo: '',
    cidade: '',
    quartos: ''
  });

  const loadTenantData = useCallback(async () => {
    const id = await resolveTenantId();
    setTenantId(id);
    if (!id) return;
    const [cfg, props, tests, corrs, status] = await Promise.all([
      getConfig(id),
      getProperties(id),
      getTestimonials(id),
      getCorretores(id),
      getTenantStatus(id)
    ]);
    setConfig(cfg);
    setProperties(props);
    setTestimonials(tests);
    setCorretores(corrs);
    setTenantStatus(status);
  }, []);

  useEffect(() => {
    loadTenantData();
    const { data: subscription } = supabase.auth.onAuthStateChange(() => {
      loadTenantData();
    });
    return () => subscription.subscription.unsubscribe();
  }, [loadTenantData]);

  // Login feito em /signup (domínio raiz) redireciona pra cá com ?panel=1
  // pra abrir direto no painel do corretor em vez do site público.
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('panel') === '1') {
      setBrokerModalOpen(true);
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

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

  // Assinatura pendente/cancelada/suspensa: o site sai do ar pra qualquer
  // visitante. trialing e active continuam funcionando normalmente. O acesso
  // discreto do corretor (BrokerFab/BrokerModal) permanece disponível pra ele
  // conseguir entrar e resolver o pagamento.
  const isBlocked = tenantId !== null && tenantStatus !== null &&
    ['past_due', 'canceled', 'suspended'].includes(tenantStatus);

  // Template escolhido no cadastro (config.template) decide qual conjunto de
  // componentes visuais renderiza — Header/Hero/Catálogo/CTA/Footer trocam
  // por completo, as seções do meio (busca, como funciona, sobre, depoimentos,
  // mapa, modal de detalhe, fab) são compartilhadas e seguem a cor do template
  // via --t-primary/--t-primary-dark.
  const template = getTemplate(config.template);
  const isModerno = template.id === 'moderno';
  const themeStyle = {
    '--t-primary': template.primary,
    '--t-primary-dark': template.primaryDark
  } as React.CSSProperties;

  return (
    <div className="min-h-screen flex flex-col font-sans" style={themeStyle}>
      {isBlocked ? <SiteUnavailable /> : (
      <>
      {/* Header */}
      {isModerno ? (
        <HeaderModerno config={config} onOpenBrokerModal={() => setBrokerModalOpen(true)} />
      ) : (
        <Header config={config} onOpenBrokerModal={() => setBrokerModalOpen(true)} />
      )}

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        {isModerno ? <HeroModerno config={config} /> : <Hero config={config} />}

        {/* Search / Filter Bar */}
        <SearchBar
          filters={filters}
          setFilters={setFilters}
          cities={availableCities}
          onSearch={handleSearchClick}
        />

        {/* Property Catalog Section */}
        {isModerno ? (
          <PropertyCatalogModerno
            properties={properties}
            filters={filters}
            onSelectProperty={(p) => setSelectedProperty(p)}
          />
        ) : (
          <PropertyCatalog
            properties={properties}
            filters={filters}
            onSelectProperty={(p) => setSelectedProperty(p)}
          />
        )}

        {/* Process Section */}
        <HowItWorks />

        {/* Broker Presentation / About Section */}
        <BrokerPresentation config={config} />

        {/* Testimonials Section */}
        <Testimonials testimonials={testimonials} />

        {/* Location & Google Map Section */}
        <LocationMap config={config} />

        {/* CTA Anuncie Section */}
        {isModerno ? <CtaBannerModerno config={config} /> : <CtaBanner config={config} />}
      </main>

      {/* Footer */}
      {isModerno ? (
        <FooterModerno config={config} onOpenBrokerModal={() => setBrokerModalOpen(true)} />
      ) : (
        <Footer config={config} onOpenBrokerModal={() => setBrokerModalOpen(true)} />
      )}
      </>
      )}

      {/* Property Detail Modal */}
      <PropertyDetailModal
        property={selectedProperty}
        config={config}
        onClose={() => setSelectedProperty(null)}
      />

      {/* Floating Chat Widget & Discreet Broker Access */}
      <BrokerFab config={config} onClick={() => setBrokerModalOpen(true)} />

      {/* Broker Admin Modal */}
      {tenantId && (
        <BrokerModal
          isOpen={brokerModalOpen}
          onClose={() => setBrokerModalOpen(false)}
          config={config}
          properties={properties}
          testimonials={testimonials}
          corretores={corretores}
          tenantId={tenantId}
          onUpdateConfig={(newConfig) => {
            setConfig(newConfig);
            saveConfig(tenantId, newConfig);
          }}
          onUpdateProperties={(newProperties) => {
            setProperties(newProperties);
            saveProperties(tenantId, newProperties);
          }}
          onUpdateTestimonials={(newTestimonials) => {
            setTestimonials(newTestimonials);
            saveTestimonials(tenantId, newTestimonials);
          }}
          onUpdateCorretores={(newCorretores) => {
            setCorretores(newCorretores);
            saveCorretores(tenantId, newCorretores);
          }}
        />
      )}
    </div>
  );
}

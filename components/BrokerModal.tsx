'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  Plus,
  Trash2,
  Edit2,
  Image as ImageIcon,
  Check,
  Building,
  Star,
  User,
  Settings as SettingsIcon,
  MessageSquare,
  LogOut,
  Upload,
  GripVertical,
  Search,
  CheckCircle2,
  XCircle,
  Crop,
  Save,
  Building2,
  UserCheck,
  Tag,
  Calendar
} from 'lucide-react';
import { Property, SiteConfig, Testimonial, Corretor } from '@/lib/types';
import {
  sha256,
  formatPrice,
  formatRefCode,
  resizeImageToDataUrl,
  saveStoredProperties,
  saveStoredConfig,
  saveStoredTestimonials,
  saveStoredCorretores,
  deleteStoredProperty,
  deleteStoredTestimonial,
  deleteStoredCorretor,
  getStoredCredentials,
  saveStoredCredentials
} from '@/lib/storage';
import { LogoCropModal } from './LogoCropModal';

interface BrokerModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: SiteConfig;
  properties: Property[];
  testimonials: Testimonial[];
  corretores?: Corretor[];
  onUpdateConfig: (newConfig: SiteConfig) => void;
  onUpdateProperties: (newProperties: Property[]) => void;
  onUpdateTestimonials: (newTestimonials: Testimonial[]) => void;
  onUpdateCorretores?: (newCorretores: Corretor[]) => void;
}

export const BrokerModal: React.FC<BrokerModalProps> = ({
  isOpen,
  onClose,
  config,
  properties,
  testimonials,
  corretores = [],
  onUpdateConfig,
  onUpdateProperties,
  onUpdateTestimonials,
  onUpdateCorretores
}) => {
  // Session State
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'imoveis' | 'form' | 'config' | 'testemunhos' | 'seguranca'>('imoveis');
  const [formSection, setFormSection] = useState<'imovel' | 'proprietario'>('imovel');

  // Security / Credentials State
  const [credNewUser, setCredNewUser] = useState<string>(() => getStoredCredentials().user);
  const [credCurrentPass, setCredCurrentPass] = useState('');
  const [credNewPass, setCredNewPass] = useState('');
  const [credConfirmPass, setCredConfirmPass] = useState('');
  const [credMsg, setCredMsg] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  // Property Form State
  const [editingPropId, setEditingPropId] = useState<string | null>(null);
  const [propTitulo, setPropTitulo] = useState('');
  const [propTransacao, setPropTransacao] = useState<'Venda' | 'Aluguel'>('Venda');
  const [propTipo, setPropTipo] = useState('Casa');
  const [propBairro, setPropBairro] = useState('');
  const [propCidade, setPropCidade] = useState('');
  const [propEstado, setPropEstado] = useState('SC');
  const [propEndereco, setPropEndereco] = useState('');
  const [propPreco, setPropPreco] = useState('');
  const [propQuartos, setPropQuartos] = useState('0');
  const [propBanheiros, setPropBanheiros] = useState('0');
  const [propVagas, setPropVagas] = useState('0');
  const [propArea, setPropArea] = useState('0');
  const [propDescricao, setPropDescricao] = useState('');
  const [propDestaque, setPropDestaque] = useState(false);
  const [propTags, setPropTags] = useState<string[]>([]);
  const [propPrevisaoEntrega, setPropPrevisaoEntrega] = useState('');
  const [propCustomTagInput, setPropCustomTagInput] = useState('');
  const [propFotos, setPropFotos] = useState<string[]>([]);

  // Private owner fields
  const [propProprietarioNome, setPropProprietarioNome] = useState('');
  const [propProprietarioTelefone, setPropProprietarioTelefone] = useState('');
  const [propProprietarioObs, setPropProprietarioObs] = useState('');

  const [propMsg, setPropMsg] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  // Admin Property Search & Filter State
  const [adminSearch, setAdminSearch] = useState('');
  const [adminTransacao, setAdminTransacao] = useState('');
  const [adminTipo, setAdminTipo] = useState('');
  const [adminDestaque, setAdminDestaque] = useState('');
  const [adminSort, setAdminSort] = useState('recents');

  // Deletion Confirmation States (No confirm() popup needed)
  const [deletingPropId, setDeletingPropId] = useState<string | null>(null);
  const [deletingTestimonialId, setDeletingTestimonialId] = useState<string | null>(null);

  // Config Form State
  const [cfgTipoPerfil, setCfgTipoPerfil] = useState<'corretor' | 'imobiliaria'>(config.tipoPerfil || 'corretor');
  const [cfgNome, setCfgNome] = useState(config.nome || '');
  const [cfgSubtitulo, setCfgSubtitulo] = useState(config.subtitulo || '');
  const [cfgCreci, setCfgCreci] = useState(config.creci || '');
  const [cfgTelefone, setCfgTelefone] = useState(config.telefone || '');
  const [cfgWhats, setCfgWhats] = useState(config.whats || '');
  const [cfgEmail, setCfgEmail] = useState(config.email || '');
  const [cfgEndereco, setCfgEndereco] = useState(config.endereco || '');
  const [cfgEnderecoAtendimento, setCfgEnderecoAtendimento] = useState(config.enderecoAtendimento || config.endereco || '');
  const [cfgMostrarMapa, setCfgMostrarMapa] = useState(config.mostrarMapa !== false);
  const [cfgGoogleMapsEmbedUrl, setCfgGoogleMapsEmbedUrl] = useState(config.googleMapsEmbedUrl || '');
  const [cfgMostrarNome, setCfgMostrarNome] = useState(config.mostrarNome !== false);
  const [cfgLogo, setCfgLogo] = useState(config.logo || '');
  const [cfgBanners, setCfgBanners] = useState<string[]>(config.banners || []);
  
  // Broker Presentation / About State
  const [cfgFotoCorretor, setCfgFotoCorretor] = useState(config.fotoCorretor || '');
  const [cfgSobreTitulo, setCfgSobreTitulo] = useState(config.sobreTitulo || '');
  const [cfgSobreTexto, setCfgSobreTexto] = useState(config.sobreTexto || '');
  const [cfgMostrarSobre, setCfgMostrarSobre] = useState(config.mostrarSobre !== false);
  const [cfgAnosExperiencia, setCfgAnosExperiencia] = useState(config.anosExperiencia || '10+ anos');
  const [cfgImoveisNegociados, setCfgImoveisNegociados] = useState(config.imoveisNegociados || '+350 imóveis');

  const [cfgMsg, setCfgMsg] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  // Logo & Banner Crop Modal State
  const [cropTargetSrc, setCropTargetSrc] = useState<string | null>(null);
  const [bannerCropSrc, setBannerCropSrc] = useState<string | null>(null);
  const [editingBannerIndex, setEditingBannerIndex] = useState<number | null>(null);

  // Testimonials Form State
  const [editingTestId, setEditingTestId] = useState<string | null>(null);
  const [testNome, setTestNome] = useState('');
  const [testLocal, setTestLocal] = useState('');
  const [testNota, setTestNota] = useState(5);
  const [testTexto, setTestTexto] = useState('');
  const [testOrigem, setTestOrigem] = useState<'google' | 'direto'>('google');
  const [testFoto, setTestFoto] = useState('');
  const [testCropSrc, setTestCropSrc] = useState<string | null>(null);
  const [testDestaque, setTestDestaque] = useState(true);
  const [testMsg, setTestMsg] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  // Drag and Drop Photo state
  const [photoDragSrcIndex, setPhotoDragSrcIndex] = useState<number | null>(null);

  const [prevConfig, setPrevConfig] = useState(config);
  if (config !== prevConfig) {
    setPrevConfig(config);
    setCfgTipoPerfil(config.tipoPerfil || 'corretor');
    setCfgNome(config.nome || '');
    setCfgSubtitulo(config.subtitulo || '');
    setCfgCreci(config.creci || '');
    setCfgTelefone(config.telefone || '');
    setCfgWhats(config.whats || '');
    setCfgEmail(config.email || '');
    setCfgEndereco(config.endereco || '');
    setCfgEnderecoAtendimento(config.enderecoAtendimento || config.endereco || '');
    setCfgMostrarMapa(config.mostrarMapa !== false);
    setCfgGoogleMapsEmbedUrl(config.googleMapsEmbedUrl || '');
    setCfgMostrarNome(config.mostrarNome !== false);
    setCfgLogo(config.logo || '');
    setCfgBanners(config.banners || []);
    setCfgFotoCorretor(config.fotoCorretor || '');
    setCfgSobreTitulo(config.sobreTitulo || '');
    setCfgSobreTexto(config.sobreTexto || '');
    setCfgMostrarSobre(config.mostrarSobre !== false);
    setCfgAnosExperiencia(config.anosExperiencia || '10+ anos');
    setCfgImoveisNegociados(config.imoveisNegociados || '+350 imóveis');
  }

  if (!isOpen) return null;

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const creds = getStoredCredentials();

    const passHash = await sha256(loginPass);

    if (loginUser.trim().toLowerCase() === creds.user.toLowerCase() && passHash === creds.passHash) {
      setIsLoggedIn(true);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('broker-session', '1');
      }
    } else {
      setLoginError('Usuário ou senha incorretos.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('broker-session');
    }
  };

  // Change Login & Password Handler
  const handleChangeCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setCredMsg(null);

    const newUser = credNewUser.trim();
    if (!newUser) {
      setCredMsg({ type: 'error', text: 'Informe o novo nome de usuário / login.' });
      return;
    }

    const creds = getStoredCredentials();
    const currentHash = await sha256(credCurrentPass);

    if (currentHash !== creds.passHash) {
      setCredMsg({ type: 'error', text: 'A senha atual informada está incorreta.' });
      return;
    }

    if (credNewPass.length < 4) {
      setCredMsg({ type: 'error', text: 'A nova senha deve ter no mínimo 4 caracteres.' });
      return;
    }

    if (credNewPass !== credConfirmPass) {
      setCredMsg({ type: 'error', text: 'A nova senha e a confirmação de senha não coincidem.' });
      return;
    }

    const newPassHash = await sha256(credNewPass);
    const ok = saveStoredCredentials(newUser, newPassHash);

    if (ok) {
      setCredMsg({ type: 'success', text: 'Login e senha alterados com sucesso! Utilize o novo usuário e senha nos próximos acessos.' });
      setCredCurrentPass('');
      setCredNewPass('');
      setCredConfirmPass('');
    } else {
      setCredMsg({ type: 'error', text: 'Não foi possível salvar as novas credenciais.' });
    }
  };

  // Reset Property Form
  const resetPropertyForm = () => {
    setEditingPropId(null);
    setPropTitulo('');
    setPropTransacao('Venda');
    setPropTipo('Casa');
    setPropBairro('');
    setPropCidade('');
    setPropEstado('SC');
    setPropEndereco('');
    setPropPreco('');
    setPropQuartos('0');
    setPropBanheiros('0');
    setPropVagas('0');
    setPropArea('0');
    setPropDescricao('');
    setPropDestaque(false);
    setPropTags([]);
    setPropPrevisaoEntrega('');
    setPropCustomTagInput('');
    setPropFotos([]);
    setPropProprietarioNome('');
    setPropProprietarioTelefone('');
    setPropProprietarioObs('');
    setPropMsg(null);
    setFormSection('imovel');
  };

  // Edit Property
  const handleEditProperty = (p: Property) => {
    setEditingPropId(p.id);
    setPropTitulo(p.titulo || '');
    setPropTransacao(p.transacao || 'Venda');
    setPropTipo(p.tipo || 'Casa');
    setPropBairro(p.bairro || '');
    setPropCidade(p.cidade || '');
    setPropEstado(p.estado || 'SC');
    setPropEndereco(p.endereco || '');
    setPropPreco(String(p.preco || ''));
    setPropQuartos(String(p.quartos || '0'));
    setPropBanheiros(String(p.banheiros || '0'));
    setPropVagas(String(p.vagas || '0'));
    setPropArea(String(p.area || '0'));
    setPropDescricao(p.descricao || '');
    setPropDestaque(!!p.destaque);
    setPropTags(p.tags || []);
    setPropPrevisaoEntrega(p.previsaoEntrega || '');
    setPropCustomTagInput('');
    setPropFotos([...(p.fotos || [])]);
    setPropProprietarioNome(p.proprietarioNome || '');
    setPropProprietarioTelefone(p.proprietarioTelefone || '');
    setPropProprietarioObs(p.proprietarioObs || '');
    setPropMsg(null);
    setFormSection('imovel');
    setActiveTab('form');
  };

  // Delete Property
  const executeDeleteProperty = (id: string) => {
    deleteStoredProperty(id);
    const updated = properties.filter(p => p.id !== id);
    saveStoredProperties(updated);
    onUpdateProperties(updated);
    setDeletingPropId(null);
  };

  // Photo Upload Handler for Property Form
  const handlePhotoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const remaining = 20 - propFotos.length;
    if (remaining <= 0) {
      setPropMsg({ type: 'error', text: 'Limite de 20 fotos por imóvel atingido.' });
      return;
    }

    const toProcess = files.slice(0, remaining);
    let failed = 0;
    const newPhotos: string[] = [];

    for (const file of toProcess) {
      try {
        const dataUrl = await resizeImageToDataUrl(file, 1100, 0.75);
        newPhotos.push(dataUrl);
      } catch (err) {
        failed++;
      }
    }

    if (failed > 0) {
      setPropMsg({ type: 'error', text: `${failed} foto(s) não puderam ser processadas.` });
    } else {
      setPropMsg(null);
    }

    setPropFotos(prev => [...prev, ...newPhotos]);
    e.target.value = '';
  };

  const removePhoto = (index: number) => {
    setPropFotos(prev => prev.filter((_, i) => i !== index));
  };

  // Drag and Drop Photo Reorder
  const handlePhotoDrop = (targetIndex: number) => {
    if (photoDragSrcIndex === null || photoDragSrcIndex === targetIndex) return;
    const updated = [...propFotos];
    const [moved] = updated.splice(photoDragSrcIndex, 1);
    updated.splice(targetIndex, 0, moved);
    setPropFotos(updated);
    setPhotoDragSrcIndex(null);
  };

  // Save Property Form
  const handleSaveProperty = (e: React.FormEvent) => {
    e.preventDefault();
    setPropMsg(null);

    if (propFotos.length === 0) {
      setPropMsg({ type: 'error', text: 'Adicione ao menos uma foto do imóvel.' });
      return;
    }

    const id = editingPropId || `p${Date.now()}${Math.floor(Math.random() * 1000)}`;
    const isNew = !editingPropId;

    const newProp: Property = {
      id,
      createdAt: isNew ? Date.now() : (properties.find(p => p.id === id)?.createdAt || Date.now()),
      titulo: propTitulo.toUpperCase().trim(),
      transacao: propTransacao,
      tipo: propTipo,
      bairro: propBairro.toUpperCase().trim(),
      cidade: propCidade.toUpperCase().trim(),
      estado: propEstado.toUpperCase().trim(),
      endereco: propEndereco.toUpperCase().trim(),
      preco: Number(propPreco) || 0,
      quartos: Number(propQuartos) || 0,
      banheiros: Number(propBanheiros) || 0,
      vagas: Number(propVagas) || 0,
      area: Number(propArea) || 0,
      descricao: propDescricao.toUpperCase().trim(),
      destaque: propDestaque,
      tags: propTags,
      previsaoEntrega: propPrevisaoEntrega.trim(),
      fotos: propFotos,
      proprietarioNome: propProprietarioNome.trim(),
      proprietarioTelefone: propProprietarioTelefone.trim(),
      proprietarioObs: propProprietarioObs.trim()
    };

    let updatedList: Property[];
    if (isNew) {
      updatedList = [newProp, ...properties];
    } else {
      updatedList = properties.map(p => (p.id === id ? newProp : p));
    }

    const ok = saveStoredProperties(updatedList);
    if (!ok) {
      setPropMsg({ type: 'error', text: 'Não foi possível salvar no navegador. Tente com fotos menores.' });
      return;
    }

    onUpdateProperties(updatedList);
    setPropMsg({ type: 'success', text: '✓ Alterações salvas com sucesso! O imóvel foi atualizado e já está visível no site.' });
    setTimeout(() => {
      resetPropertyForm();
      setActiveTab('imoveis');
    }, 1800);
  };

  // Logo Upload in Config
  const handleLogoFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setCropTargetSrc(reader.result as string);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Banner Upload in Config
  const handleBannerSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const remaining = 8 - cfgBanners.length;
    if (remaining <= 0) {
      setCfgMsg({ type: 'error', text: 'Limite de 8 banners atingido.' });
      return;
    }

    const toProcess = files.slice(0, remaining);
    const newBanners: string[] = [];

    for (const file of toProcess) {
      try {
        const dataUrl = await resizeImageToDataUrl(file, 1800, 0.75);
        newBanners.push(dataUrl);
      } catch (err) {}
    }

    const startIdx = cfgBanners.length;
    setCfgBanners(prev => [...prev, ...newBanners]);
    e.target.value = '';

    if (newBanners.length === 1) {
      setEditingBannerIndex(startIdx);
      setBannerCropSrc(newBanners[0]);
    }
  };

  const removeBanner = (index: number) => {
    setCfgBanners(prev => prev.filter((_, i) => i !== index));
  };

  // Broker Photo Upload Handler
  const handleBrokerPhotoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await resizeImageToDataUrl(file, 900, 0.85);
      setCfgFotoCorretor(dataUrl);
      setCfgMsg({ type: 'success', text: 'Foto do corretor selecionada com sucesso!' });
    } catch (err) {
      setCfgMsg({ type: 'error', text: 'Não foi possível carregar a foto do corretor.' });
    }
    e.target.value = '';
  };

  // Save Config Form
  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setCfgMsg(null);

    const newConfig: SiteConfig = {
      nome: cfgNome.trim() || 'Site Corretor de Imoveis',
      subtitulo: cfgSubtitulo.trim() || 'Corretor de Imóveis',
      creci: cfgCreci.trim() || 'CRECI 00000-J',
      telefone: cfgTelefone.trim() || '(48) 99999-0000',
      whats: cfgWhats.trim().replace(/\D/g, '') || '5548999990000',
      email: cfgEmail.trim() || 'contato@corretor.com.br',
      endereco: cfgEndereco.trim() || 'Rua Exemplo, 100 — Centro, Criciúma/SC',
      enderecoAtendimento: cfgEnderecoAtendimento.trim() || cfgEndereco.trim(),
      mostrarMapa: cfgMostrarMapa,
      googleMapsEmbedUrl: cfgGoogleMapsEmbedUrl.trim(),
      logo: cfgLogo,
      mostrarNome: cfgMostrarNome,
      banners: cfgBanners,
      tipoPerfil: cfgTipoPerfil,
      fotoCorretor: cfgFotoCorretor,
      sobreTitulo: cfgSobreTitulo.trim(),
      sobreTexto: cfgSobreTexto.trim(),
      mostrarSobre: cfgMostrarSobre,
      anosExperiencia: cfgAnosExperiencia.trim(),
      imoveisNegociados: cfgImoveisNegociados.trim()
    };

    const ok = saveStoredConfig(newConfig);
    if (!ok) {
      setCfgMsg({ type: 'error', text: 'Falha ao salvar configurações.' });
      return;
    }

    onUpdateConfig(newConfig);
    setCfgMsg({ type: 'success', text: '✓ Alterações salvas com sucesso! As configurações do seu site foram atualizadas.' });
    setTimeout(() => setCfgMsg(null), 4000);
  };

  // Testimonial Save
  const resetTestForm = () => {
    setEditingTestId(null);
    setTestNome('');
    setTestLocal('');
    setTestNota(5);
    setTestTexto('');
    setTestOrigem('google');
    setTestFoto('');
    setTestDestaque(true);
    setTestMsg(null);
  };

  const handleEditTestimonial = (t: Testimonial) => {
    setEditingTestId(t.id);
    setTestNome(t.nome);
    setTestLocal(t.local || '');
    setTestNota(t.nota || 5);
    setTestTexto(t.texto);
    setTestOrigem(t.origem || 'direto');
    setTestFoto(t.foto || '');
    setTestDestaque(t.destaque !== false);
    setTestMsg(null);
  };

  const executeDeleteTestimonial = (id: string) => {
    deleteStoredTestimonial(id);
    const updated = testimonials.filter(t => t.id !== id);
    saveStoredTestimonials(updated);
    onUpdateTestimonials(updated);
    setDeletingTestimonialId(null);
  };

  const handleSaveTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    setTestMsg(null);

    const id = editingTestId || `t${Date.now()}${Math.floor(Math.random() * 1000)}`;
    const isNew = !editingTestId;

    const newTest: Testimonial = {
      id,
      createdAt: isNew ? Date.now() : (testimonials.find(t => t.id === id)?.createdAt || Date.now()),
      nome: testNome.trim(),
      local: testLocal.trim(),
      nota: Number(testNota) || 5,
      texto: testTexto.trim(),
      origem: testOrigem,
      foto: testFoto.trim(),
      destaque: testDestaque
    };

    let updatedList: Testimonial[];
    if (isNew) {
      updatedList = [newTest, ...testimonials];
    } else {
      updatedList = testimonials.map(t => (t.id === id ? newTest : t));
    }

    const ok = saveStoredTestimonials(updatedList);
    if (!ok) {
      setTestMsg({ type: 'error', text: 'Erro ao salvar depoimento.' });
      return;
    }

    onUpdateTestimonials(updatedList);
    setTestMsg({ type: 'success', text: '✓ Alterações salvas com sucesso! Depoimento gravado.' });
    setTimeout(() => resetTestForm(), 1500);
  };

  const handleImportGoogleReviews = () => {
    const sampleReviews: Testimonial[] = [
      {
        id: `g_rev_1_${Date.now()}`,
        createdAt: Date.now() - 1000,
        nome: 'Mariana Silveira',
        local: 'Criciúma/SC',
        nota: 5,
        texto: 'Excelente atendimento! Profissional muito atencioso, explicou todo o processo de financiamento e nos ajudou a conquistar a casa própria.',
        origem: 'google',
        foto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
        destaque: true
      },
      {
        id: `g_rev_2_${Date.now()}`,
        createdAt: Date.now() - 2000,
        nome: 'Lucas Mendonça',
        local: 'Balneário Rincão/SC',
        nota: 5,
        texto: 'A venda do meu imóvel foi super rápida. Anúncio profissional, fotos incríveis e total suporte na documentação cartorária.',
        origem: 'google',
        foto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
        destaque: true
      },
      {
        id: `g_rev_3_${Date.now()}`,
        createdAt: Date.now() - 3000,
        nome: 'Fernanda Oliveira',
        local: 'Içara/SC',
        nota: 5,
        texto: 'Corretor altamente qualificado e ético. Encontrou um apartamento exatamente com o perfil que nossa família buscava.',
        origem: 'google',
        foto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        destaque: true
      }
    ];

    const merged = [...sampleReviews, ...testimonials];
    saveStoredTestimonials(merged);
    onUpdateTestimonials(merged);
    setTestMsg({ type: 'success', text: 'Avaliações do Google importadas com sucesso!' });
  };

  return (
    <>
      <div
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
        className="fixed inset-0 z-50 bg-[#122234]/75 backdrop-blur-sm flex items-start justify-center overflow-y-auto p-4 sm:p-6"
      >
        <div className="bg-[#FFFFFF] max-w-[960px] w-full my-auto relative shadow-2xl rounded-[2px] overflow-hidden border border-[#DEE2E7]">
          {/* Close Modal Button */}
          <button
            onClick={onClose}
            type="button"
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#F2F4F6] text-[#15263A] flex items-center justify-center hover:bg-[#DEE2E7] transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-6 sm:p-10">
            {/* LOGIN VIEW */}
            {!isLoggedIn ? (
              <div className="max-w-[420px] mx-auto py-8">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-[#F2F4F6] rounded-full text-[#0F3D5C] mb-3">
                    <Lock className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-semibold tracking-[0.12em] uppercase text-[#0F3D5C] mb-1">
                    Acesso Restrito
                  </div>
                  <h2 className="text-2xl font-bold text-[#15263A]">Área do Corretor</h2>
                </div>

                <div className="bg-[#FFFFFF] border border-[#DEE2E7] p-8 rounded-[2px]">
                  {loginError && (
                    <div className="p-3 mb-5 text-xs font-medium text-[#A8452F] bg-[#F7EAE6] border border-[#E4C3B9] rounded-[2px]">
                      {loginError}
                    </div>
                  )}

                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold tracking-wider uppercase text-[#68707C] mb-1.5">
                        Usuário
                      </label>
                      <input
                        type="text"
                        value={loginUser}
                        onChange={(e) => setLoginUser(e.target.value)}
                        placeholder="admin1"
                        required
                        className="w-full px-3.5 py-2.5 bg-[#F2F4F6] border border-[#DEE2E7] rounded-[2px] text-sm text-[#15263A] focus:outline-none focus:bg-white focus:border-[#0F3D5C]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-wider uppercase text-[#68707C] mb-1.5">
                        Senha
                      </label>
                      <input
                        type="password"
                        value={loginPass}
                        onChange={(e) => setLoginPass(e.target.value)}
                        placeholder="••••••"
                        required
                        className="w-full px-3.5 py-2.5 bg-[#F2F4F6] border border-[#DEE2E7] rounded-[2px] text-sm text-[#15263A] focus:outline-none focus:bg-white focus:border-[#0F3D5C]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#0F3D5C] hover:bg-[#0B2C44] text-white text-xs font-semibold uppercase tracking-wider rounded-[2px] transition-colors mt-2"
                    >
                      Entrar no Painel
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              /* DASHBOARD VIEW */
              <div>
                {/* Header Top */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#DEE2E7] mb-6">
                  <div>
                    <div className="text-xs font-semibold tracking-[0.12em] uppercase text-[#0F3D5C]">
                      Painel do Corretor
                    </div>
                    <h2 className="text-2xl font-bold text-[#15263A]">Gestão do Site</h2>
                  </div>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-[#DEE2E7] text-[#68707C] hover:text-[#A8452F] hover:border-[#A8452F] text-xs font-medium uppercase tracking-wider rounded-[2px] transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sair</span>
                  </button>
                </div>

                {/* Dashboard Tabs Navigation */}
                <div className="flex border-b border-[#DEE2E7] gap-2 mb-6 overflow-x-auto scrollbar-none">
                  <button
                    type="button"
                    onClick={() => setActiveTab('imoveis')}
                    className={`px-4 py-2.5 text-xs sm:text-sm font-semibold tracking-wider border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === 'imoveis'
                        ? 'border-[#0F3D5C] text-[#0F3D5C]'
                        : 'border-transparent text-[#68707C] hover:text-[#15263A]'
                    }`}
                  >
                    Imóveis ({properties.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      resetPropertyForm();
                      setActiveTab('form');
                    }}
                    className={`px-4 py-2.5 text-xs sm:text-sm font-semibold tracking-wider border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === 'form'
                        ? 'border-[#0F3D5C] text-[#0F3D5C]'
                        : 'border-transparent text-[#68707C] hover:text-[#15263A]'
                    }`}
                  >
                    {editingPropId ? 'Editar Imóvel' : '+ Novo Imóvel'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('config')}
                    className={`px-4 py-2.5 text-xs sm:text-sm font-semibold tracking-wider border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === 'config'
                        ? 'border-[#0F3D5C] text-[#0F3D5C]'
                        : 'border-transparent text-[#68707C] hover:text-[#15263A]'
                    }`}
                  >
                    Configurações
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('testemunhos')}
                    className={`px-4 py-2.5 text-xs sm:text-sm font-semibold tracking-wider border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === 'testemunhos'
                        ? 'border-[#0F3D5C] text-[#0F3D5C]'
                        : 'border-transparent text-[#68707C] hover:text-[#15263A]'
                    }`}
                  >
                    Depoimentos ({testimonials.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('seguranca')}
                    className={`px-4 py-2.5 text-xs sm:text-sm font-semibold tracking-wider border-b-2 transition-colors whitespace-nowrap inline-flex items-center gap-1.5 ${
                      activeTab === 'seguranca'
                        ? 'border-[#0F3D5C] text-[#0F3D5C]'
                        : 'border-transparent text-[#68707C] hover:text-[#15263A]'
                    }`}
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Acesso & Senha</span>
                  </button>
                </div>

                {/* TAB 1: IMOVEIS LIST */}
                {activeTab === 'imoveis' && (
                  <div className="space-y-4">
                    {/* Complete Filter Bar for Broker Area */}
                    <div className="bg-[#F2F4F6] border border-[#DEE2E7] p-3.5 rounded-[2px] space-y-3">
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                        {/* Search Input */}
                        <div className="relative flex-1">
                          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#68707C]" />
                          <input
                            type="text"
                            value={adminSearch}
                            onChange={(e) => setAdminSearch(e.target.value)}
                            placeholder="Buscar por código (ex: REF-001), título, bairro, cidade ou proprietário..."
                            className="w-full pl-9 pr-8 py-2 bg-white border border-[#DEE2E7] rounded-[2px] text-xs focus:outline-none focus:border-[#0F3D5C]"
                          />
                          {adminSearch && (
                            <button
                              type="button"
                              onClick={() => setAdminSearch('')}
                              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#68707C] hover:text-[#15263A]"
                            >
                              ✕
                            </button>
                          )}
                        </div>

                        {/* Clear Filters Button */}
                        {(adminSearch || adminTransacao || adminTipo || adminDestaque) && (
                          <button
                            type="button"
                            onClick={() => {
                              setAdminSearch('');
                              setAdminTransacao('');
                              setAdminTipo('');
                              setAdminDestaque('');
                            }}
                            className="px-3 py-2 bg-white border border-[#DEE2E7] text-[#A8452F] hover:bg-[#F7EAE6] text-xs font-semibold rounded-[2px] shrink-0"
                          >
                            Limpar Filtros
                          </button>
                        )}
                      </div>

                      {/* Dropdown filters */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-[#68707C] mb-0.5">Transação</label>
                          <select
                            value={adminTransacao}
                            onChange={(e) => setAdminTransacao(e.target.value)}
                            className="w-full px-2 py-1.5 bg-white border border-[#DEE2E7] rounded-[2px] text-xs focus:outline-none"
                          >
                            <option value="">Todas</option>
                            <option value="Venda">Venda</option>
                            <option value="Aluguel">Aluguel</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase text-[#68707C] mb-0.5">Tipo de Imóvel</label>
                          <select
                            value={adminTipo}
                            onChange={(e) => setAdminTipo(e.target.value)}
                            className="w-full px-2 py-1.5 bg-white border border-[#DEE2E7] rounded-[2px] text-xs focus:outline-none"
                          >
                            <option value="">Todos os Tipos</option>
                            <option value="Casa">Casa</option>
                            <option value="Apartamento">Apartamento</option>
                            <option value="Terreno">Terreno</option>
                            <option value="Cobertura">Cobertura</option>
                            <option value="Comercial">Comercial</option>
                            <option value="Sobrado">Sobrado</option>
                            <option value="Chácara">Chácara</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase text-[#68707C] mb-0.5">Destaque</label>
                          <select
                            value={adminDestaque}
                            onChange={(e) => setAdminDestaque(e.target.value)}
                            className="w-full px-2 py-1.5 bg-white border border-[#DEE2E7] rounded-[2px] text-xs focus:outline-none"
                          >
                            <option value="">Todos</option>
                            <option value="sim">Apenas Destaques</option>
                            <option value="nao">Sem Destaque</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase text-[#68707C] mb-0.5">Ordenar por</label>
                          <select
                            value={adminSort}
                            onChange={(e) => setAdminSort(e.target.value)}
                            className="w-full px-2 py-1.5 bg-white border border-[#DEE2E7] rounded-[2px] text-xs focus:outline-none"
                          >
                            <option value="recents">Mais Recentes</option>
                            <option value="price_asc">Menor Preço</option>
                            <option value="price_desc">Maior Preço</option>
                            <option value="title">Título (A-Z)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Result Counter */}
                    <div className="text-xs font-semibold text-[#68707C] flex items-center justify-between px-1">
                      <span>Exibindo {
                        properties.filter((p) => {
                          if (adminSearch.trim()) {
                            const q = adminSearch.toLowerCase().trim();
                            const refCode = formatRefCode(p.id).toLowerCase();
                            const matchesTitle = p.titulo?.toLowerCase().includes(q);
                            const matchesRef = refCode.includes(q) || p.id.toLowerCase().includes(q);
                            const matchesCity = p.cidade?.toLowerCase().includes(q);
                            const matchesBairro = p.bairro?.toLowerCase().includes(q);
                            const matchesOwner = p.proprietarioNome?.toLowerCase().includes(q);
                            if (!matchesTitle && !matchesRef && !matchesCity && !matchesBairro && !matchesOwner) {
                              return false;
                            }
                          }
                          if (adminTransacao && p.transacao !== adminTransacao) return false;
                          if (adminTipo && p.tipo !== adminTipo) return false;
                          if (adminDestaque === 'sim' && !p.destaque) return false;
                          if (adminDestaque === 'nao' && p.destaque) return false;
                          return true;
                        }).length
                      } de {properties.length} imóveis</span>
                    </div>

                    {properties.length === 0 ? (
                      <div className="p-10 text-center text-[#68707C] bg-[#F2F4F6] border border-[#DEE2E7] rounded-[2px]">
                        Nenhum imóvel cadastrado. Use a aba &quot;Novo Imóvel&quot; para adicionar.
                      </div>
                    ) : (
                      <div className="divide-y divide-[#DEE2E7] border border-[#DEE2E7] bg-white rounded-[2px]">
                        {properties
                          .filter((p) => {
                            if (adminSearch.trim()) {
                              const q = adminSearch.toLowerCase().trim();
                              const refCode = formatRefCode(p.id).toLowerCase();
                              const matchesTitle = p.titulo?.toLowerCase().includes(q);
                              const matchesRef = refCode.includes(q) || p.id.toLowerCase().includes(q);
                              const matchesCity = p.cidade?.toLowerCase().includes(q);
                              const matchesBairro = p.bairro?.toLowerCase().includes(q);
                              const matchesOwner = p.proprietarioNome?.toLowerCase().includes(q);
                              if (!matchesTitle && !matchesRef && !matchesCity && !matchesBairro && !matchesOwner) {
                                return false;
                              }
                            }
                            if (adminTransacao && p.transacao !== adminTransacao) return false;
                            if (adminTipo && p.tipo !== adminTipo) return false;
                            if (adminDestaque === 'sim' && !p.destaque) return false;
                            if (adminDestaque === 'nao' && p.destaque) return false;
                            return true;
                          })
                          .sort((a, b) => {
                            if (adminSort === 'price_asc') return a.preco - b.preco;
                            if (adminSort === 'price_desc') return b.preco - a.preco;
                            if (adminSort === 'title') return a.titulo.localeCompare(b.titulo);
                            return b.createdAt - a.createdAt;
                          })
                          .map((p) => (
                          <div key={p.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-4 min-w-0">
                              <img
                                src={p.fotos?.[0] || 'https://picsum.photos/seed/placeholder/200/150'}
                                alt=""
                                className="w-20 h-16 object-cover bg-[#e5e2d8] rounded-[2px] shrink-0 border border-[#DEE2E7]"
                              />
                              <div className="min-w-0">
                                <div className="text-sm font-bold text-[#15263A] truncate flex items-center gap-1.5">
                                  <span>{p.titulo}</span>
                                  {p.destaque && (
                                    <span className="text-[10px] bg-[#A8452F] text-white px-1.5 py-0.2 rounded font-mono uppercase">
                                      Destaque
                                    </span>
                                  )}
                                </div>
                                <div className="text-xs text-[#68707C] mt-0.5 truncate">
                                  <span className="mono font-semibold text-[#0F3D5C]">{formatRefCode(p.id)}</span> · {p.transacao} · {p.tipo} · {p.bairro}, {p.cidade} · {formatPrice(p.preco, p.transacao)}
                                </div>
                                {p.proprietarioNome && (
                                  <div className="text-xs text-[#0F3D5C] mt-1 font-medium italic">
                                    Proprietário: {p.proprietarioNome} {p.proprietarioTelefone ? `(${p.proprietarioTelefone})` : ''}
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Action Buttons with iFrame-safe deletion confirm */}
                            {deletingPropId === p.id ? (
                              <div className="flex items-center gap-2 bg-[#F7EAE6] p-2 rounded-[2px] border border-[#E4C3B9] shrink-0 self-end sm:self-center">
                                <span className="text-xs font-bold text-[#A8452F]">Confirma excluir?</span>
                                <button
                                  type="button"
                                  onClick={() => executeDeleteProperty(p.id)}
                                  className="px-2.5 py-1 bg-[#A8452F] text-white text-xs font-bold rounded-[2px] hover:bg-[#893826] transition-colors"
                                >
                                  Sim, Excluir
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setDeletingPropId(null)}
                                  className="px-2 py-1 bg-white text-[#68707C] text-xs font-semibold rounded-[2px] border border-[#DEE2E7] hover:bg-[#F2F4F6]"
                                >
                                  Cancelar
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                                <button
                                  type="button"
                                  onClick={() => handleEditProperty(p)}
                                  className="p-2 text-[#68707C] hover:text-[#0F3D5C] border border-[#DEE2E7] hover:border-[#0F3D5C] rounded-[2px] bg-white transition-colors"
                                  title="Editar"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setDeletingPropId(p.id)}
                                  className="p-2 text-[#68707C] hover:text-[#A8452F] border border-[#DEE2E7] hover:border-[#A8452F] rounded-[2px] bg-white transition-colors"
                                  title="Excluir"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 2: PROPERTY FORM */}
                {activeTab === 'form' && (
                  <div>
                    <h3 className="text-lg font-bold text-[#15263A] mb-4">
                      {editingPropId ? 'Editar Imóvel' : 'Cadastrar Novo Imóvel'}
                    </h3>

                    {/* Form Section Selector */}
                    <div className="flex gap-2 mb-6">
                      <button
                        type="button"
                        onClick={() => setFormSection('imovel')}
                        className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-[2px] border transition-colors ${
                          formSection === 'imovel'
                            ? 'bg-[#0F3D5C] text-white border-[#0F3D5C]'
                            : 'border-[#DEE2E7] text-[#68707C] hover:border-[#15263A]'
                        }`}
                      >
                        Dados do imóvel
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormSection('proprietario')}
                        className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-[2px] border transition-colors ${
                          formSection === 'proprietario'
                            ? 'bg-[#0F3D5C] text-white border-[#0F3D5C]'
                            : 'border-[#DEE2E7] text-[#68707C] hover:border-[#15263A]'
                        }`}
                      >
                        Proprietário / Anunciante
                      </button>
                    </div>

                    {propMsg && (
                      <div
                        className={`p-4 mb-5 text-sm font-semibold rounded-[2px] border flex items-center gap-3 transition-all ${
                          propMsg.type === 'error'
                            ? 'bg-[#F7EAE6] text-[#A8452F] border-[#E4C3B9]'
                            : 'bg-[#123E28] text-white border-[#25D366] shadow-md'
                        }`}
                      >
                        {propMsg.type === 'error' ? (
                          <XCircle className="w-5 h-5 text-[#A8452F] shrink-0" />
                        ) : (
                          <CheckCircle2 className="w-5 h-5 text-[#25D366] shrink-0" />
                        )}
                        <span>{propMsg.text}</span>
                      </div>
                    )}

                    <form onSubmit={handleSaveProperty} className="space-y-4">
                      {formSection === 'imovel' ? (
                        <>
                          <div>
                            <label className="block text-xs font-semibold tracking-wider uppercase text-[#68707C] mb-1">
                              Título do anúncio
                            </label>
                            <input
                              type="text"
                              value={propTitulo}
                              onChange={(e) => setPropTitulo(e.target.value.toUpperCase())}
                              placeholder="Ex: CASA TÉRREA COM 3 QUARTOS NO CENTRO"
                              required
                              className="w-full px-3.5 py-2.5 bg-[#F2F4F6] border border-[#DEE2E7] rounded-[2px] text-sm focus:outline-none focus:bg-white focus:border-[#0F3D5C]"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-semibold tracking-wider uppercase text-[#68707C] mb-1">
                                Transação
                              </label>
                              <select
                                value={propTransacao}
                                onChange={(e) => setPropTransacao(e.target.value as 'Venda' | 'Aluguel')}
                                className="w-full px-3.5 py-2.5 bg-[#F2F4F6] border border-[#DEE2E7] rounded-[2px] text-sm focus:outline-none focus:bg-white focus:border-[#0F3D5C]"
                              >
                                <option value="Venda">Venda</option>
                                <option value="Aluguel">Aluguel</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs font-semibold tracking-wider uppercase text-[#68707C] mb-1">
                                Tipo de imóvel
                              </label>
                              <select
                                value={propTipo}
                                onChange={(e) => setPropTipo(e.target.value)}
                                className="w-full px-3.5 py-2.5 bg-[#F2F4F6] border border-[#DEE2E7] rounded-[2px] text-sm focus:outline-none focus:bg-white focus:border-[#0F3D5C]"
                              >
                                <option value="Casa">Casa</option>
                                <option value="Apartamento">Apartamento</option>
                                <option value="Casa de Condomínio">Casa de Condomínio</option>
                                <option value="Terreno / Lote">Terreno / Lote</option>
                                <option value="Sala Comercial">Sala Comercial</option>
                                <option value="Chácara / Sítio">Chácara / Sítio</option>
                              </select>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-semibold tracking-wider uppercase text-[#68707C] mb-1">
                                Bairro
                              </label>
                              <input
                                type="text"
                                value={propBairro}
                                onChange={(e) => setPropBairro(e.target.value.toUpperCase())}
                                required
                                className="w-full px-3.5 py-2.5 bg-[#F2F4F6] border border-[#DEE2E7] rounded-[2px] text-sm focus:outline-none focus:bg-white focus:border-[#0F3D5C]"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold tracking-wider uppercase text-[#68707C] mb-1">
                                Cidade
                              </label>
                              <input
                                type="text"
                                value={propCidade}
                                onChange={(e) => setPropCidade(e.target.value.toUpperCase())}
                                required
                                className="w-full px-3.5 py-2.5 bg-[#F2F4F6] border border-[#DEE2E7] rounded-[2px] text-sm focus:outline-none focus:bg-white focus:border-[#0F3D5C]"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-semibold tracking-wider uppercase text-[#68707C] mb-1">
                                Estado (UF)
                              </label>
                              <input
                                type="text"
                                value={propEstado}
                                onChange={(e) => setPropEstado(e.target.value.toUpperCase())}
                                required
                                maxLength={2}
                                className="w-full px-3.5 py-2.5 bg-[#F2F4F6] border border-[#DEE2E7] rounded-[2px] text-sm focus:outline-none focus:bg-white focus:border-[#0F3D5C]"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold tracking-wider uppercase text-[#68707C] mb-1">
                                Preço (R$)
                              </label>
                              <input
                                type="number"
                                min="0"
                                step="1000"
                                value={propPreco}
                                onChange={(e) => setPropPreco(e.target.value)}
                                required
                                className="w-full px-3.5 py-2.5 bg-[#F2F4F6] border border-[#DEE2E7] rounded-[2px] text-sm focus:outline-none focus:bg-white focus:border-[#0F3D5C]"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold tracking-wider uppercase text-[#68707C] mb-1">
                              Endereço (Opcional - Uso Interno)
                            </label>
                            <input
                              type="text"
                              value={propEndereco}
                              onChange={(e) => setPropEndereco(e.target.value.toUpperCase())}
                              placeholder="RUA, NÚMERO, COMPLEMENTO"
                              className="w-full px-3.5 py-2.5 bg-[#F2F4F6] border border-[#DEE2E7] rounded-[2px] text-sm focus:outline-none focus:bg-white focus:border-[#0F3D5C]"
                            />
                          </div>

                          {/* Specs Grid */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <div>
                              <label className="block text-xs font-semibold tracking-wider uppercase text-[#68707C] mb-1">
                                Quartos
                              </label>
                              <input
                                type="number"
                                min="0"
                                value={propQuartos}
                                onChange={(e) => setPropQuartos(e.target.value)}
                                className="w-full px-3.5 py-2 bg-[#F2F4F6] border border-[#DEE2E7] rounded-[2px] text-sm focus:outline-none focus:bg-white focus:border-[#0F3D5C]"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold tracking-wider uppercase text-[#68707C] mb-1">
                                Banheiros
                              </label>
                              <input
                                type="number"
                                min="0"
                                value={propBanheiros}
                                onChange={(e) => setPropBanheiros(e.target.value)}
                                className="w-full px-3.5 py-2 bg-[#F2F4F6] border border-[#DEE2E7] rounded-[2px] text-sm focus:outline-none focus:bg-white focus:border-[#0F3D5C]"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold tracking-wider uppercase text-[#68707C] mb-1">
                                Vagas
                              </label>
                              <input
                                type="number"
                                min="0"
                                value={propVagas}
                                onChange={(e) => setPropVagas(e.target.value)}
                                className="w-full px-3.5 py-2 bg-[#F2F4F6] border border-[#DEE2E7] rounded-[2px] text-sm focus:outline-none focus:bg-white focus:border-[#0F3D5C]"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold tracking-wider uppercase text-[#68707C] mb-1">
                                Área (m²)
                              </label>
                              <input
                                type="number"
                                min="0"
                                value={propArea}
                                onChange={(e) => setPropArea(e.target.value)}
                                className="w-full px-3.5 py-2 bg-[#F2F4F6] border border-[#DEE2E7] rounded-[2px] text-sm focus:outline-none focus:bg-white focus:border-[#0F3D5C]"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold tracking-wider uppercase text-[#68707C] mb-1">
                              Descrição completa
                            </label>
                            <textarea
                              rows={4}
                              value={propDescricao}
                              onChange={(e) => setPropDescricao(e.target.value.toUpperCase())}
                              placeholder="DETALHES DO IMÓVEL, DIFERENCIAIS, CONDOMÍNIO, ETC."
                              className="w-full px-3.5 py-2.5 bg-[#F2F4F6] border border-[#DEE2E7] rounded-[2px] text-sm focus:outline-none focus:bg-white focus:border-[#0F3D5C]"
                            />
                          </div>

                          {/* Etiquetas e Selos do Imóvel */}
                          <div className="bg-[#EAF0F6] border border-[#DEE2E7] p-4 rounded-[2px] space-y-3">
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-[#0F3D5C] mb-1.5 flex items-center gap-1.5">
                                <Tag className="w-4 h-4 text-[#0F3D5C]" />
                                Etiquetas, Selos e Diferenciais do Imóvel
                              </label>
                              <p className="text-[11px] text-[#68707C] mb-2.5">
                                Clique nos selos abaixo para adicionar ou remover etiquetas (serão exibidas no anúncio do imóvel):
                              </p>

                              {/* Preset Tag Buttons */}
                              <div className="flex flex-wrap gap-2 mb-3">
                                {[
                                  'Aceita permuta',
                                  'Parcelamento direto',
                                  'MCMV',
                                  'Lançamento',
                                  'Na planta'
                                ].map((presetTag) => {
                                  const isSelected = propTags.includes(presetTag);
                                  return (
                                    <button
                                      key={presetTag}
                                      type="button"
                                      onClick={() => {
                                        if (isSelected) {
                                          setPropTags(propTags.filter(t => t !== presetTag));
                                        } else {
                                          setPropTags([...propTags, presetTag]);
                                        }
                                      }}
                                      className={`px-3 py-1.5 rounded-[2px] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                                        isSelected
                                          ? 'bg-[#0F3D5C] text-white border-[#0F3D5C] shadow-2xs'
                                          : 'bg-white text-[#15263A] border-[#DEE2E7] hover:border-[#0F3D5C]'
                                      }`}
                                    >
                                      <span>{isSelected ? '✓ ' : '+ '}</span>
                                      <span>{presetTag}</span>
                                    </button>
                                  );
                                })}
                              </div>

                              {/* Custom Tag Input */}
                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={propCustomTagInput}
                                  onChange={(e) => setPropCustomTagInput(e.target.value)}
                                  placeholder="Outra etiqueta personalizada (ex: Aceita Veículo, Financiável, Mobiliado)..."
                                  className="flex-1 px-3 py-1.5 bg-white border border-[#DEE2E7] rounded-[2px] text-xs focus:outline-none focus:border-[#0F3D5C]"
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      e.preventDefault();
                                      const val = propCustomTagInput.trim();
                                      if (val && !propTags.includes(val)) {
                                        setPropTags([...propTags, val]);
                                        setPropCustomTagInput('');
                                      }
                                    }
                                  }}
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const val = propCustomTagInput.trim();
                                    if (val && !propTags.includes(val)) {
                                      setPropTags([...propTags, val]);
                                      setPropCustomTagInput('');
                                    }
                                  }}
                                  className="px-3 py-1.5 bg-[#0F3D5C] text-white text-xs font-bold uppercase rounded-[2px] hover:bg-[#0B2C44] transition-colors cursor-pointer shrink-0"
                                >
                                  + Adicionar Tag
                                </button>
                              </div>

                              {/* Selected Tags Display */}
                              {propTags.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 pt-2.5 mt-2.5 border-t border-[#DEE2E7]">
                                  <span className="text-[10px] font-bold uppercase text-[#68707C] self-center mr-1">Etiquetas ativas:</span>
                                  {propTags.map((tag, idx) => (
                                    <span
                                      key={idx}
                                      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#0F3D5C] text-[#0F3D5C] text-xs font-bold rounded-[2px]"
                                    >
                                      <span>{tag}</span>
                                      <button
                                        type="button"
                                        onClick={() => setPropTags(propTags.filter((_, i) => i !== idx))}
                                        className="hover:text-[#A8452F] text-[#68707C] font-bold text-xs leading-none cursor-pointer"
                                        title="Remover etiqueta"
                                      >
                                        ×
                                      </button>
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* Previsão de Entrega (se for Na Planta ou Lançamento ou se já tiver informado) */}
                            <div className="pt-3 border-t border-[#DEE2E7]">
                              <label className="block text-xs font-bold uppercase tracking-wider text-[#15263A] mb-1 flex items-center gap-1.5">
                                <Calendar className="w-4 h-4 text-[#0F3D5C]" />
                                Previsão de Entrega da Obra (Imóveis Na Planta / Lançamento)
                              </label>
                              <input
                                type="text"
                                value={propPrevisaoEntrega}
                                onChange={(e) => setPropPrevisaoEntrega(e.target.value)}
                                placeholder="Ex: Dezembro / 2026, 2º Semestre de 2027..."
                                className="w-full px-3 py-2 bg-white border border-[#DEE2E7] rounded-[2px] text-xs focus:outline-none focus:border-[#0F3D5C]"
                              />
                              <p className="text-[11px] text-[#68707C] mt-1">
                                Informe a data ou período estimado de conclusão da obra/chaves.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 pt-1">
                            <input
                              type="checkbox"
                              id="propDestaque"
                              checked={propDestaque}
                              onChange={(e) => setPropDestaque(e.target.checked)}
                              className="w-4 h-4 accent-[#0F3D5C]"
                            />
                            <label htmlFor="propDestaque" className="text-sm font-medium text-[#15263A] cursor-pointer">
                              Marcar como imóvel em destaque
                            </label>
                          </div>

                          {/* Photos Drop */}
                          <div className="pt-2">
                            <label className="block text-xs font-semibold tracking-wider uppercase text-[#68707C] mb-2">
                              Fotos do imóvel ({propFotos.length}/20)
                            </label>
                            <label
                              htmlFor="photoInput"
                              className={`border-2 border-dashed border-[#DEE2E7] hover:border-[#0F3D5C] p-6 text-center rounded-[2px] bg-[#F2F4F6] block cursor-pointer transition-colors ${
                                propFotos.length >= 20 ? 'opacity-50 pointer-events-none' : ''
                              }`}
                            >
                              <Upload className="w-6 h-6 mx-auto text-[#68707C] mb-1" />
                              <span className="text-xs text-[#68707C]">
                                Clique para selecionar fotos (JPG ou PNG, até 20 fotos por imóvel)
                              </span>
                              <input
                                id="photoInput"
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handlePhotoSelect}
                                className="hidden"
                              />
                            </label>

                            {/* Photos preview with drag reorder */}
                            <div className="flex flex-wrap gap-2.5 mt-3">
                              {propFotos.map((src, i) => (
                                <div
                                  key={i}
                                  draggable
                                  onDragStart={() => setPhotoDragSrcIndex(i)}
                                  onDragOver={(e) => e.preventDefault()}
                                  onDrop={() => handlePhotoDrop(i)}
                                  className="relative w-24 h-20 border border-[#DEE2E7] rounded-[2px] overflow-hidden group cursor-grab active:cursor-grabbing bg-[#e5e2d8]"
                                >
                                  {i === 0 && (
                                    <span className="absolute top-1 left-1 bg-[#0F3D5C] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-[1px] uppercase z-10">
                                      Capa
                                    </span>
                                  )}
                                  <img src={src} alt="" className="w-full h-full object-cover" />
                                  <button
                                    type="button"
                                    onClick={() => removePhoto(i)}
                                    className="absolute top-1 right-1 w-5 h-5 bg-[#122234] text-white rounded-full flex items-center justify-center text-xs opacity-80 hover:opacity-100 z-10"
                                  >
                                    &times;
                                  </button>
                                </div>
                              ))}
                            </div>
                            <p className="text-[11px] text-[#68707C] mt-1.5">
                              Arraste uma foto para alterar a ordem. A primeira foto é a capa do anúncio.
                            </p>
                          </div>
                        </>
                      ) : (
                        /* PRIVATE OWNER SECTION */
                        <div className="space-y-4">
                          <p className="text-xs text-[#68707C] bg-[#F2F4F6] p-3 border border-[#DEE2E7] rounded-[2px]">
                            Essas informações são de uso estritamente interno e <strong>nunca serão exibidas no site público</strong>. Servem para identificação e contato do proprietário.
                          </p>

                          <div>
                            <label className="block text-xs font-semibold tracking-wider uppercase text-[#68707C] mb-1">
                              Nome do proprietário / anunciante
                            </label>
                            <input
                              type="text"
                              value={propProprietarioNome}
                              onChange={(e) => setPropProprietarioNome(e.target.value)}
                              placeholder="Nome do cliente proprietário"
                              className="w-full px-3.5 py-2.5 bg-[#F2F4F6] border border-[#DEE2E7] rounded-[2px] text-sm focus:outline-none focus:bg-white focus:border-[#0F3D5C]"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold tracking-wider uppercase text-[#68707C] mb-1">
                              Telefone / WhatsApp
                            </label>
                            <input
                              type="text"
                              value={propProprietarioTelefone}
                              onChange={(e) => setPropProprietarioTelefone(e.target.value)}
                              placeholder="(48) 99999-0000"
                              className="w-full px-3.5 py-2.5 bg-[#F2F4F6] border border-[#DEE2E7] rounded-[2px] text-sm focus:outline-none focus:bg-white focus:border-[#0F3D5C]"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold tracking-wider uppercase text-[#68707C] mb-1">
                              Observações internas
                            </label>
                            <textarea
                              rows={3}
                              value={propProprietarioObs}
                              onChange={(e) => setPropProprietarioObs(e.target.value)}
                              placeholder="Anotações sobre comissão, urgência, autorização de chaves, etc."
                              className="w-full px-3.5 py-2.5 bg-[#F2F4F6] border border-[#DEE2E7] rounded-[2px] text-sm focus:outline-none focus:bg-white focus:border-[#0F3D5C]"
                            />
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-4 border-t border-[#DEE2E7]">
                        <button
                          type="submit"
                          className="px-6 py-2.5 bg-[#0F3D5C] hover:bg-[#0B2C44] text-white text-xs font-semibold uppercase tracking-wider rounded-[2px] transition-colors"
                        >
                          Salvar Imóvel
                        </button>
                        <button
                          type="button"
                          onClick={resetPropertyForm}
                          className="px-4 py-2.5 border border-[#DEE2E7] text-[#68707C] hover:text-[#15263A] text-xs font-medium uppercase tracking-wider rounded-[2px]"
                        >
                          Limpar
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* TAB 3: SITE CONFIG */}
                {activeTab === 'config' && (
                  <div>
                    <h3 className="text-lg font-bold text-[#15263A] mb-4">Informações do Site</h3>

                    {cfgMsg && (
                      <div
                        className={`p-4 mb-5 text-sm font-semibold rounded-[2px] border flex items-center gap-3 transition-all ${
                          cfgMsg.type === 'error'
                            ? 'bg-[#F7EAE6] text-[#A8452F] border-[#E4C3B9]'
                            : 'bg-[#123E28] text-white border-[#25D366] shadow-md'
                        }`}
                      >
                        {cfgMsg.type === 'error' ? (
                          <XCircle className="w-5 h-5 text-[#A8452F] shrink-0" />
                        ) : (
                          <CheckCircle2 className="w-5 h-5 text-[#25D366] shrink-0" />
                        )}
                        <span>{cfgMsg.text}</span>
                      </div>
                    )}

                    <form onSubmit={handleSaveConfig} className="space-y-4">
                      {/* Profile Type Selector (Corretor vs Imobiliária) */}
                      <div className="bg-[#EAF0F6] border border-[#DEE2E7] p-4 rounded-[2px]">
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#0F3D5C] mb-2.5">
                          🏢 Identificação / Tipo de Perfil do Site
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => {
                              setCfgTipoPerfil('corretor');
                              if (!cfgSubtitulo || cfgSubtitulo === 'Imobiliária') setCfgSubtitulo('Corretor de Imóveis Licenciado');
                            }}
                            className={`p-3 border rounded-[2px] flex items-center gap-3 text-left transition-all cursor-pointer ${
                              cfgTipoPerfil === 'corretor'
                                ? 'bg-white border-[#0F3D5C] ring-2 ring-[#0F3D5C]/20 shadow-xs'
                                : 'bg-[#F2F4F6] border-[#DEE2E7] text-[#68707C] hover:border-[#15263A]'
                            }`}
                          >
                            <UserCheck className={`w-5 h-5 shrink-0 ${cfgTipoPerfil === 'corretor' ? 'text-[#0F3D5C]' : 'text-[#68707C]'}`} />
                            <div>
                              <span className="block text-xs font-bold text-[#15263A]">Corretor de Imóveis (Pessoa Física)</span>
                              <span className="block text-[11px] text-[#68707C]">Para profissionais autônomos com CRECI</span>
                            </div>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setCfgTipoPerfil('imobiliaria');
                              if (!cfgSubtitulo || cfgSubtitulo === 'Corretor de Imóveis') setCfgSubtitulo('Imobiliária & Consultoria');
                            }}
                            className={`p-3 border rounded-[2px] flex items-center gap-3 text-left transition-all cursor-pointer ${
                              cfgTipoPerfil === 'imobiliaria'
                                ? 'bg-white border-[#0F3D5C] ring-2 ring-[#0F3D5C]/20 shadow-xs'
                                : 'bg-[#F2F4F6] border-[#DEE2E7] text-[#68707C] hover:border-[#15263A]'
                            }`}
                          >
                            <Building2 className={`w-5 h-5 shrink-0 ${cfgTipoPerfil === 'imobiliaria' ? 'text-[#0F3D5C]' : 'text-[#68707C]'}`} />
                            <div>
                              <span className="block text-xs font-bold text-[#15263A]">Imobiliária (Pessoa Jurídica)</span>
                              <span className="block text-[11px] text-[#68707C]">Para empresas e imobiliárias com CRECI-J</span>
                            </div>
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold tracking-wider uppercase text-[#68707C] mb-1">
                            {cfgTipoPerfil === 'imobiliaria' ? 'Nome da Imobiliária' : 'Nome do Corretor'}
                          </label>
                          <input
                            type="text"
                            value={cfgNome}
                            onChange={(e) => setCfgNome(e.target.value)}
                            required
                            placeholder={cfgTipoPerfil === 'imobiliaria' ? 'Ex: Imobiliária Criciúma' : 'Ex: Alef Hansen'}
                            className="w-full px-3.5 py-2.5 bg-[#F2F4F6] border border-[#DEE2E7] rounded-[2px] text-sm focus:outline-none focus:bg-white focus:border-[#0F3D5C]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold tracking-wider uppercase text-[#68707C] mb-1">
                            {cfgTipoPerfil === 'imobiliaria' ? 'CRECI-J (Jurídico)' : 'CRECI (Pessoa Física)'}
                          </label>
                          <input
                            type="text"
                            value={cfgCreci}
                            onChange={(e) => setCfgCreci(e.target.value)}
                            required
                            placeholder={cfgTipoPerfil === 'imobiliaria' ? 'CRECI 00000-J' : 'CRECI 00000-F'}
                            className="w-full px-3.5 py-2.5 bg-[#F2F4F6] border border-[#DEE2E7] rounded-[2px] text-sm focus:outline-none focus:bg-white focus:border-[#0F3D5C]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold tracking-wider uppercase text-[#68707C] mb-1">
                          Legenda abaixo do nome
                        </label>
                        <input
                          type="text"
                          value={cfgSubtitulo}
                          onChange={(e) => setCfgSubtitulo(e.target.value)}
                          placeholder="Corretor de Imóveis"
                          className="w-full px-3.5 py-2.5 bg-[#F2F4F6] border border-[#DEE2E7] rounded-[2px] text-sm focus:outline-none focus:bg-white focus:border-[#0F3D5C]"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold tracking-wider uppercase text-[#68707C] mb-1">
                            Telefone
                          </label>
                          <input
                            type="text"
                            value={cfgTelefone}
                            onChange={(e) => setCfgTelefone(e.target.value)}
                            placeholder="(48) 99999-0000"
                            className="w-full px-3.5 py-2.5 bg-[#F2F4F6] border border-[#DEE2E7] rounded-[2px] text-sm focus:outline-none focus:bg-white focus:border-[#0F3D5C]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold tracking-wider uppercase text-[#68707C] mb-1">
                            WhatsApp (apenas números com DDI 55)
                          </label>
                          <input
                            type="text"
                            value={cfgWhats}
                            onChange={(e) => setCfgWhats(e.target.value)}
                            placeholder="5548999990000"
                            className="w-full px-3.5 py-2.5 bg-[#F2F4F6] border border-[#DEE2E7] rounded-[2px] text-sm focus:outline-none focus:bg-white focus:border-[#0F3D5C]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold tracking-wider uppercase text-[#68707C] mb-1">
                            E-mail de contato
                          </label>
                          <input
                            type="email"
                            value={cfgEmail}
                            onChange={(e) => setCfgEmail(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-[#F2F4F6] border border-[#DEE2E7] rounded-[2px] text-sm focus:outline-none focus:bg-white focus:border-[#0F3D5C]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold tracking-wider uppercase text-[#68707C] mb-1">
                            Endereço
                          </label>
                          <input
                            type="text"
                            value={cfgEndereco}
                            onChange={(e) => setCfgEndereco(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-[#F2F4F6] border border-[#DEE2E7] rounded-[2px] text-sm focus:outline-none focus:bg-white focus:border-[#0F3D5C]"
                          />
                        </div>
                      </div>

                      {/* Broker Presentation Card Section */}
                      <div className="bg-[#EAF0F6] border border-[#DEE2E7] p-4.5 rounded-[2px] space-y-3.5 mt-2">
                        <div className="flex items-center justify-between">
                          <label className="block text-xs font-bold tracking-wider uppercase text-[#0F3D5C]">
                            👤 Apresentação & Biografia do Corretor (Exibida no Site)
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id="cfgMostrarSobre"
                              checked={cfgMostrarSobre}
                              onChange={(e) => setCfgMostrarSobre(e.target.checked)}
                              className="w-4 h-4 accent-[#0F3D5C] cursor-pointer"
                            />
                            <label htmlFor="cfgMostrarSobre" className="text-xs font-bold text-[#15263A] cursor-pointer">
                              Exibir Apresentação no Site
                            </label>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold tracking-wider uppercase text-[#68707C] mb-1.5">
                            Foto de Apresentação do Corretor
                          </label>
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            {cfgFotoCorretor ? (
                              <div className="flex items-center gap-3">
                                <img
                                  src={cfgFotoCorretor}
                                  alt="Foto do Corretor"
                                  className="w-20 h-24 object-cover border border-[#DEE2E7] rounded-[2px] shadow-xs"
                                />
                                <button
                                  type="button"
                                  onClick={() => setCfgFotoCorretor('')}
                                  className="px-3 py-1.5 border border-[#DEE2E7] text-xs font-medium uppercase text-[#A8452F] bg-white hover:bg-[#F7EAE6]"
                                >
                                  Remover Foto
                                </button>
                              </div>
                            ) : (
                              <label className="border-2 border-dashed border-[#DEE2E7] hover:border-[#0F3D5C] p-4 text-center rounded-[2px] bg-white cursor-pointer block flex-1 w-full">
                                <span className="text-xs font-medium text-[#0F3D5C] block">
                                  📸 Clique para fazer upload da foto de apresentação do corretor
                                </span>
                                <span className="text-[11px] text-[#68707C]">
                                  (Formato vertical recomendado: JPG ou PNG)
                                </span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleBrokerPhotoSelect}
                                  className="hidden"
                                />
                              </label>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold tracking-wider uppercase text-[#68707C] mb-1">
                              Tempo de Experiência (Ex: 10+ anos)
                            </label>
                            <input
                              type="text"
                              value={cfgAnosExperiencia}
                              onChange={(e) => setCfgAnosExperiencia(e.target.value)}
                              placeholder="10+ anos de mercado"
                              className="w-full px-3 py-2 bg-white border border-[#DEE2E7] rounded-[2px] text-xs focus:outline-none focus:border-[#0F3D5C]"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold tracking-wider uppercase text-[#68707C] mb-1">
                              Imóveis Negociados (Ex: +350 imóveis)
                            </label>
                            <input
                              type="text"
                              value={cfgImoveisNegociados}
                              onChange={(e) => setCfgImoveisNegociados(e.target.value)}
                              placeholder="+350 imóveis negociados"
                              className="w-full px-3 py-2 bg-white border border-[#DEE2E7] rounded-[2px] text-xs focus:outline-none focus:border-[#0F3D5C]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold tracking-wider uppercase text-[#68707C] mb-1">
                            Título Principal da Apresentação
                          </label>
                          <input
                            type="text"
                            value={cfgSobreTitulo}
                            onChange={(e) => setCfgSobreTitulo(e.target.value)}
                            placeholder="Sua melhor consultoria na conquista do imóvel ideal"
                            className="w-full px-3.5 py-2 bg-white border border-[#DEE2E7] rounded-[2px] text-sm focus:outline-none focus:border-[#0F3D5C]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold tracking-wider uppercase text-[#68707C] mb-1">
                            Texto de Apresentação / Biografia Profissional
                          </label>
                          <textarea
                            rows={4}
                            value={cfgSobreTexto}
                            onChange={(e) => setCfgSobreTexto(e.target.value)}
                            placeholder="Escreva sobre sua história, atuação no mercado imobiliário, especialidades e compromisso com o cliente..."
                            className="w-full px-3.5 py-2 bg-white border border-[#DEE2E7] rounded-[2px] text-sm focus:outline-none focus:border-[#0F3D5C]"
                          />
                        </div>
                      </div>

                      {/* Map & Physical Office Address Card */}
                      <div className="bg-[#F2F4F6] border border-[#DEE2E7] p-4.5 rounded-[2px] space-y-3.5 mt-2">
                        <div className="flex items-center justify-between">
                          <label className="block text-xs font-bold tracking-wider uppercase text-[#0F3D5C]">
                            📍 Endereço de Atendimento & Mapa do Google
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id="cfgMostrarMapa"
                              checked={cfgMostrarMapa}
                              onChange={(e) => setCfgMostrarMapa(e.target.checked)}
                              className="w-4 h-4 accent-[#0F3D5C] cursor-pointer"
                            />
                            <label htmlFor="cfgMostrarMapa" className="text-xs font-bold text-[#15263A] cursor-pointer">
                              Exibir Mapa no Site
                            </label>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold tracking-wider uppercase text-[#68707C] mb-1">
                            Endereço Físico de Atendimento / Escritório
                          </label>
                          <input
                            type="text"
                            value={cfgEnderecoAtendimento}
                            onChange={(e) => setCfgEnderecoAtendimento(e.target.value)}
                            placeholder="Ex: Av. Centenário, 1500 — Centro, Criciúma/SC"
                            className="w-full px-3.5 py-2 bg-white border border-[#DEE2E7] rounded-[2px] text-sm focus:outline-none focus:border-[#0F3D5C]"
                          />
                          <p className="text-[11px] text-[#68707C] mt-1">
                            Este endereço é usado para carregar o mapa interativo e indicar onde seu cliente pode ser atendido presencialmente.
                          </p>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold tracking-wider uppercase text-[#68707C] mb-1">
                            Link/URL de Incorporação do Google Maps (Opcional - iFrame)
                          </label>
                          <input
                            type="text"
                            value={cfgGoogleMapsEmbedUrl}
                            onChange={(e) => setCfgGoogleMapsEmbedUrl(e.target.value)}
                            placeholder="Deixe em branco para gerar o mapa automaticamente a partir do endereço"
                            className="w-full px-3.5 py-2 bg-white border border-[#DEE2E7] rounded-[2px] text-sm focus:outline-none focus:border-[#0F3D5C]"
                          />
                        </div>
                      </div>

                      {/* Logo Section */}
                      <div className="pt-2">
                        <label className="block text-xs font-semibold tracking-wider uppercase text-[#68707C] mb-2">
                          Logo do site
                        </label>
                        <div className="flex items-center gap-4">
                          {cfgLogo ? (
                            <div className="flex items-center gap-3">
                              <img
                                src={cfgLogo}
                                alt="Logo"
                                className="h-12 w-auto border border-[#DEE2E7] p-1 crop-checkerboard-small rounded-[2px]"
                              />
                              <button
                                type="button"
                                onClick={() => setCropTargetSrc(cfgLogo)}
                                className="px-3 py-1.5 border border-[#DEE2E7] text-xs font-medium uppercase text-[#68707C] hover:text-[#15263A]"
                              >
                                Editar / Enquadrar
                              </button>
                              <button
                                type="button"
                                onClick={() => setCfgLogo('')}
                                className="px-3 py-1.5 border border-[#DEE2E7] text-xs font-medium uppercase text-[#A8452F] hover:bg-[#F7EAE6]"
                              >
                                Remover
                              </button>
                            </div>
                          ) : (
                            <label className="border-2 border-dashed border-[#DEE2E7] hover:border-[#0F3D5C] p-4 text-center rounded-[2px] bg-[#F2F4F6] cursor-pointer block flex-1">
                              <span className="text-xs text-[#68707C]">
                                Clique para escolher imagem do logo (PNG transparente recomendado)
                              </span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleLogoFileSelect}
                                className="hidden"
                              />
                            </label>
                          )}
                        </div>

                        {cfgLogo && (
                          <div className="flex items-center gap-2 mt-3">
                            <input
                              type="checkbox"
                              id="cfgMostrarNome"
                              checked={cfgMostrarNome}
                              onChange={(e) => setCfgMostrarNome(e.target.checked)}
                              className="w-4 h-4 accent-[#0F3D5C]"
                            />
                            <label htmlFor="cfgMostrarNome" className="text-sm font-medium text-[#15263A] cursor-pointer">
                              Exibir o nome ao lado da logo no topo e rodapé
                            </label>
                          </div>
                        )}
                      </div>

                      {/* Banners Section */}
                      <div className="pt-2">
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-xs font-semibold tracking-wider uppercase text-[#68707C]">
                            Banners do topo do site ({cfgBanners.length}/8)
                          </label>
                          <span className="text-[11px] text-[#68707C] hidden sm:inline">
                            Proporção recomendada: 16:9 ou 21:9 (Panorâmico)
                          </span>
                        </div>
                        <label className="border-2 border-dashed border-[#DEE2E7] hover:border-[#0F3D5C] p-4 text-center rounded-[2px] bg-[#F2F4F6] cursor-pointer block transition-colors">
                          <span className="text-xs font-medium text-[#0F3D5C] flex items-center justify-center gap-1.5">
                            <Upload className="w-4 h-4" />
                            Clique para selecionar imagens para o banner rotativo
                          </span>
                          <span className="text-[11px] text-[#68707C] block mt-0.5">
                            Envie imagens JPG ou PNG. Você poderá clicar em &quot;Editar / Enquadrar&quot; para ajustar cada foto.
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleBannerSelect}
                            className="hidden"
                          />
                        </label>

                        {cfgBanners.length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                            {cfgBanners.map((src, i) => (
                              <div key={i} className="bg-white border border-[#DEE2E7] p-2 rounded-[2px] flex flex-col gap-2 shadow-xs">
                                <div className="relative w-full h-28 bg-[#122234] rounded-[1px] overflow-hidden">
                                  <img src={src} alt={`Banner ${i + 1}`} className="w-full h-full object-cover" />
                                  <span className="absolute top-1.5 left-1.5 bg-[#122234]/80 backdrop-blur-xs text-white text-[10px] font-bold px-1.5 py-0.5 rounded-[1px]">
                                    Banner #{i + 1}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between gap-1.5 pt-1 border-t border-[#F2F4F6]">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setEditingBannerIndex(i);
                                      setBannerCropSrc(src);
                                    }}
                                    className="flex-1 py-1.5 px-2 text-[11px] font-bold uppercase tracking-wider text-[#0F3D5C] bg-[#EAF0F6] hover:bg-[#0F3D5C] hover:text-white rounded-[2px] transition-colors flex items-center justify-center gap-1 cursor-pointer"
                                  >
                                    <Crop className="w-3.5 h-3.5" />
                                    Editar / Enquadrar
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => removeBanner(i)}
                                    className="py-1.5 px-2.5 text-[11px] font-bold uppercase tracking-wider text-[#A8452F] hover:bg-[#F7EAE6] rounded-[2px] transition-colors cursor-pointer"
                                    title="Remover banner"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="pt-4 border-t border-[#DEE2E7] flex flex-wrap items-center gap-3">
                        <button
                          type="submit"
                          className="px-6 py-2.5 bg-[#0F3D5C] hover:bg-[#0B2C44] text-white text-xs font-bold uppercase tracking-wider rounded-[2px] transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                        >
                          <Save className="w-4 h-4" />
                          Salvar Configurações
                        </button>

                        {cfgMsg && cfgMsg.type === 'success' && (
                          <div className="flex items-center gap-2 px-3.5 py-2 bg-[#EAF0E4] border border-[#C9DAB9] text-[#2E5E1C] rounded-[2px] text-xs font-bold animate-fade-in shadow-xs">
                            <CheckCircle2 className="w-4.5 h-4.5 text-[#2E5E1C] shrink-0" />
                            <span>✓ Configurações salvas com sucesso!</span>
                          </div>
                        )}

                        {cfgMsg && cfgMsg.type === 'error' && (
                          <div className="flex items-center gap-2 px-3.5 py-2 bg-[#F7EAE6] border border-[#E4C3B9] text-[#A8452F] rounded-[2px] text-xs font-bold animate-fade-in shadow-xs">
                            <XCircle className="w-4.5 h-4.5 text-[#A8452F] shrink-0" />
                            <span>{cfgMsg.text}</span>
                          </div>
                        )}
                      </div>
                    </form>
                  </div>
                )}

                {/* TAB 4: TESTIMONIALS */}
                {activeTab === 'testemunhos' && (
                  <div>
                    {/* Header banner with preset import button */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5 p-4 bg-[#EAF0F6] border border-[#DEE2E7] rounded-[2px]">
                      <div>
                        <h4 className="text-sm font-bold text-[#15263A]">Depoimentos & Avaliações do Google</h4>
                        <p className="text-xs text-[#68707C]">Gerencie as opiniões dos seus clientes exibidas em carrossel (3 por vez) no site.</p>
                      </div>
                      <button
                        type="button"
                        onClick={handleImportGoogleReviews}
                        className="px-3.5 py-2 bg-white border border-[#0F3D5C] text-[#0F3D5C] hover:bg-[#0F3D5C] hover:text-white text-xs font-bold uppercase tracking-wider rounded-[2px] transition-colors shrink-0 flex items-center gap-1.5 shadow-xs"
                      >
                        <span>✨ Gerar Avaliações Exemplo do Google</span>
                      </button>
                    </div>

                    {/* Add/Edit Form */}
                    <div className="bg-[#F2F4F6] border border-[#DEE2E7] p-5 rounded-[2px] mb-6">
                      <h4 className="text-sm font-bold text-[#15263A] uppercase tracking-wider mb-3">
                        {editingTestId ? 'Editar Depoimento' : 'Adicionar Novo Depoimento'}
                      </h4>

                      {testMsg && (
                        <div
                          className={`p-3 mb-3 text-xs font-medium rounded-[2px] border ${
                            testMsg.type === 'error'
                              ? 'bg-[#F7EAE6] text-[#A8452F] border-[#E4C3B9]'
                              : 'bg-[#EAF0E4] text-[#4C6B33] border-[#C9DAB9]'
                          }`}
                        >
                          {testMsg.text}
                        </div>
                      )}

                      <form onSubmit={handleSaveTestimonial} className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold uppercase text-[#68707C] mb-1">
                              Nome do cliente
                            </label>
                            <input
                              type="text"
                              value={testNome}
                              onChange={(e) => setTestNome(e.target.value)}
                              required
                              className="w-full px-3 py-2 bg-white border border-[#DEE2E7] rounded-[2px] text-sm focus:outline-none focus:border-[#0F3D5C]"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold uppercase text-[#68707C] mb-1">
                              Cidade / Bairro (Opcional)
                            </label>
                            <input
                              type="text"
                              value={testLocal}
                              onChange={(e) => setTestLocal(e.target.value)}
                              placeholder="Ex: Criciúma/SC"
                              className="w-full px-3 py-2 bg-white border border-[#DEE2E7] rounded-[2px] text-sm focus:outline-none focus:border-[#0F3D5C]"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-xs font-semibold uppercase text-[#68707C] mb-1">
                              Origem do Depoimento
                            </label>
                            <select
                              value={testOrigem}
                              onChange={(e) => setTestOrigem(e.target.value as 'google' | 'direto')}
                              className="w-full px-3 py-2 bg-white border border-[#DEE2E7] rounded-[2px] text-sm focus:outline-none focus:border-[#0F3D5C]"
                            >
                              <option value="google">Avaliação do Google (Google Review)</option>
                              <option value="direto">Depoimento Direto</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold uppercase text-[#68707C] mb-1">
                              Nota
                            </label>
                            <select
                              value={testNota}
                              onChange={(e) => setTestNota(Number(e.target.value))}
                              className="w-full px-3 py-2 bg-white border border-[#DEE2E7] rounded-[2px] text-sm focus:outline-none focus:border-[#0F3D5C]"
                            >
                              <option value="5">★★★★★ (5 Estrelas)</option>
                              <option value="4">★★★★☆ (4 Estrelas)</option>
                              <option value="3">★★★☆☆ (3 Estrelas)</option>
                            </select>
                          </div>

                          <div className="sm:col-span-2 bg-white border border-[#DEE2E7] p-3.5 rounded-[2px]">
                            <label className="block text-xs font-semibold uppercase text-[#68707C] mb-2">
                              Foto do Cliente (Upload do Computador ou Link URL)
                            </label>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                              {testFoto ? (
                                <div className="flex items-center gap-3">
                                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#DEE2E7] shrink-0 bg-[#122234]">
                                    <img src={testFoto} alt="Avatar do cliente" className="w-full h-full object-cover" />
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <button
                                      type="button"
                                      onClick={() => setTestCropSrc(testFoto)}
                                      className="px-2.5 py-1.5 bg-[#EAF0F6] hover:bg-[#0F3D5C] hover:text-white text-[#0F3D5C] text-xs font-bold uppercase rounded-[2px] transition-colors flex items-center gap-1 cursor-pointer"
                                    >
                                      <Crop className="w-3.5 h-3.5" />
                                      Enquadrar
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setTestFoto('')}
                                      className="px-2.5 py-1.5 text-[#A8452F] hover:bg-[#F7EAE6] text-xs font-bold uppercase rounded-[2px] transition-colors cursor-pointer"
                                    >
                                      Remover
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full">
                                  <label className="px-3.5 py-2 bg-[#0F3D5C] hover:bg-[#0B2C44] text-white text-xs font-bold uppercase tracking-wider rounded-[2px] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shrink-0 shadow-xs">
                                    <Upload className="w-4 h-4" />
                                    <span>Escolher foto do computador</span>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      className="hidden"
                                      onChange={async (e) => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;
                                        try {
                                          const dataUrl = await resizeImageToDataUrl(file, 800, 0.85);
                                          setTestFoto(dataUrl);
                                        } catch (err) {}
                                        e.target.value = '';
                                      }}
                                    />
                                  </label>

                                  <span className="text-xs text-[#68707C] self-center">ou cole o link:</span>

                                  <input
                                    type="url"
                                    value={testFoto}
                                    onChange={(e) => setTestFoto(e.target.value)}
                                    placeholder="https://..."
                                    className="flex-1 px-3 py-1.5 bg-[#F2F4F6] border border-[#DEE2E7] rounded-[2px] text-xs focus:outline-none focus:bg-white focus:border-[#0F3D5C]"
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase text-[#68707C] mb-1">
                            Depoimento / Avaliação
                          </label>
                          <textarea
                            rows={3}
                            value={testTexto}
                            onChange={(e) => setTestTexto(e.target.value)}
                            required
                            className="w-full px-3 py-2 bg-white border border-[#DEE2E7] rounded-[2px] text-sm focus:outline-none focus:border-[#0F3D5C]"
                          />
                        </div>

                        <div className="flex items-center gap-2 pt-1">
                          <input
                            type="checkbox"
                            id="testDestaque"
                            checked={testDestaque}
                            onChange={(e) => setTestDestaque(e.target.checked)}
                            className="w-4 h-4 accent-[#0F3D5C] cursor-pointer"
                          />
                          <label htmlFor="testDestaque" className="text-xs font-semibold text-[#15263A] cursor-pointer">
                            Exibir este depoimento no site
                          </label>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <button
                            type="submit"
                            className="px-5 py-2 bg-[#0F3D5C] hover:bg-[#0B2C44] text-white text-xs font-semibold uppercase tracking-wider rounded-[2px]"
                          >
                            Salvar Depoimento
                          </button>
                          <button
                            type="button"
                            onClick={resetTestForm}
                            className="px-3.5 py-2 border border-[#DEE2E7] text-[#68707C] text-xs font-medium uppercase rounded-[2px]"
                          >
                            Limpar
                          </button>
                        </div>
                      </form>
                    </div>

                    {/* Testimonials List */}
                    <div className="border border-[#DEE2E7] divide-y divide-[#DEE2E7] bg-white rounded-[2px]">
                      {testimonials.length === 0 ? (
                        <div className="p-6 text-center text-xs text-[#68707C]">
                          Nenhum depoimento cadastrado.
                        </div>
                      ) : (
                        testimonials.map((t) => (
                          <div key={t.id} className="p-4 flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3">
                              {t.foto ? (
                                <img src={t.foto} alt="" className="w-9 h-9 rounded-full object-cover shrink-0 border border-[#DEE2E7]" />
                              ) : (
                                <div className="w-9 h-9 rounded-full bg-[#0F3D5C] text-white text-xs font-bold flex items-center justify-center shrink-0 uppercase">
                                  {t.nome.charAt(0)}
                                </div>
                              )}
                              <div>
                                <div className="text-sm font-bold text-[#15263A] flex items-center gap-2 flex-wrap">
                                  <span>{t.nome}</span>
                                  {t.local && <span className="text-xs text-[#68707C] font-normal">· {t.local}</span>}
                                  <span className="text-[#F59E0B] text-xs">{'★'.repeat(t.nota)}</span>
                                  {t.origem === 'google' ? (
                                    <span className="bg-[#EA4335] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase">
                                      Google Review
                                    </span>
                                  ) : (
                                    <span className="bg-[#E2E6EA] text-[#68707C] text-[9px] font-bold px-1.5 py-0.5 rounded-[2px] uppercase">
                                      Direto
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-[#68707C] mt-1 italic">“{t.texto}”</p>
                              </div>
                            </div>
                            {deletingTestimonialId === t.id ? (
                              <div className="flex items-center gap-1.5 bg-[#F7EAE6] p-1.5 rounded-[2px] border border-[#E4C3B9] shrink-0">
                                <span className="text-[11px] font-bold text-[#A8452F]">Excluir?</span>
                                <button
                                  type="button"
                                  onClick={() => executeDeleteTestimonial(t.id)}
                                  className="px-2 py-0.5 bg-[#A8452F] text-white text-[11px] font-bold rounded-[2px] hover:bg-[#893826]"
                                >
                                  Sim
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setDeletingTestimonialId(null)}
                                  className="px-1.5 py-0.5 bg-white text-[#68707C] text-[11px] rounded-[2px] border border-[#DEE2E7]"
                                >
                                  Não
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 shrink-0">
                                <button
                                  type="button"
                                  onClick={() => handleEditTestimonial(t)}
                                  className="p-1.5 text-[#68707C] hover:text-[#0F3D5C] border border-[#DEE2E7] rounded-[2px]"
                                  title="Editar"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setDeletingTestimonialId(t.id)}
                                  className="p-1.5 text-[#68707C] hover:text-[#A8452F] border border-[#DEE2E7] rounded-[2px]"
                                  title="Excluir"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {/* TAB 5: SEGURANÇA & ACESSO */}
                {activeTab === 'seguranca' && (
                  <form onSubmit={handleChangeCredentials} className="space-y-6 max-w-xl">
                    <div className="bg-[#F2F4F6] border border-[#DEE2E7] p-5 rounded-[2px] space-y-4">
                      <div className="flex items-center gap-2.5 text-[#0F3D5C] pb-3 border-b border-[#DEE2E7]">
                        <Lock className="w-5 h-5" />
                        <h3 className="font-bold text-sm tracking-wider uppercase">
                          Alterar Login e Senha de Acesso
                        </h3>
                      </div>

                      <p className="text-xs text-[#68707C] leading-relaxed">
                        Configure seu nome de usuário (login) e nova senha para acessar a Área do Corretor com total segurança.
                      </p>

                      {credMsg && (
                        <div
                          className={`p-3.5 text-xs font-semibold rounded-[2px] flex items-center gap-2.5 ${
                            credMsg.type === 'success'
                              ? 'bg-[#EAF3EC] text-[#2D6A4F] border border-[#B7E4C7]'
                              : 'bg-[#F7EAE6] text-[#A8452F] border border-[#E4C3B9]'
                          }`}
                        >
                          {credMsg.type === 'success' ? <Check className="w-4 h-4 shrink-0" /> : <X className="w-4 h-4 shrink-0" />}
                          <span>{credMsg.text}</span>
                        </div>
                      )}

                      <div>
                        <label className="block text-xs font-semibold tracking-wider uppercase text-[#68707C] mb-1.5">
                          Novo Nome de Usuário / Login
                        </label>
                        <input
                          type="text"
                          value={credNewUser}
                          onChange={(e) => setCredNewUser(e.target.value)}
                          required
                          placeholder="Ex: admin1 ou corretor.alef"
                          className="w-full px-3.5 py-2.5 bg-white border border-[#DEE2E7] rounded-[2px] text-sm text-[#15263A] focus:outline-none focus:border-[#0F3D5C]"
                        />
                        <p className="text-[11px] text-[#68707C] mt-1">
                          Este é o nome de usuário que você digitará ao fazer login no painel.
                        </p>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold tracking-wider uppercase text-[#68707C] mb-1.5">
                          Senha Atual
                        </label>
                        <input
                          type="password"
                          value={credCurrentPass}
                          onChange={(e) => setCredCurrentPass(e.target.value)}
                          required
                          placeholder="Sua senha atual"
                          className="w-full px-3.5 py-2.5 bg-white border border-[#DEE2E7] rounded-[2px] text-sm text-[#15263A] focus:outline-none focus:border-[#0F3D5C]"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold tracking-wider uppercase text-[#68707C] mb-1.5">
                            Nova Senha
                          </label>
                          <input
                            type="password"
                            value={credNewPass}
                            onChange={(e) => setCredNewPass(e.target.value)}
                            required
                            minLength={4}
                            placeholder="Nova senha"
                            className="w-full px-3.5 py-2.5 bg-white border border-[#DEE2E7] rounded-[2px] text-sm text-[#15263A] focus:outline-none focus:border-[#0F3D5C]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold tracking-wider uppercase text-[#68707C] mb-1.5">
                            Confirmar Nova Senha
                          </label>
                          <input
                            type="password"
                            value={credConfirmPass}
                            onChange={(e) => setCredConfirmPass(e.target.value)}
                            required
                            minLength={4}
                            placeholder="Repita a nova senha"
                            className="w-full px-3.5 py-2.5 bg-white border border-[#DEE2E7] rounded-[2px] text-sm text-[#15263A] focus:outline-none focus:border-[#0F3D5C]"
                          />
                        </div>
                      </div>

                      <div className="pt-3">
                        <button
                          type="submit"
                          className="w-full sm:w-auto px-6 py-2.5 bg-[#0F3D5C] hover:bg-[#0B2C44] text-white text-xs font-bold tracking-wider uppercase rounded-[2px] transition-colors"
                        >
                          Salvar Novo Login e Senha
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Logo Cropper Popup */}
      <LogoCropModal
        imageSrc={cropTargetSrc}
        title="Ajustar e Enquadrar Logo"
        onClose={() => setCropTargetSrc(null)}
        onApplyCrop={(croppedUrl) => {
          setCfgLogo(croppedUrl);
          setCropTargetSrc(null);
        }}
      />

      {/* Banner Cropper Popup */}
      <LogoCropModal
        imageSrc={bannerCropSrc}
        title="Ajustar e Enquadrar Banner"
        aspectRatios={[
          { label: 'Banner Widescreen (16:9)', w: 16, h: 9 },
          { label: 'Panorâmico (21:9)', w: 21, h: 9 },
          { label: 'Larga (3:1)', w: 3, h: 1 },
          { label: 'Retangular (2:1)', w: 2, h: 1 },
        ]}
        initialAspect={{ w: 16, h: 9 }}
        onClose={() => {
          setBannerCropSrc(null);
          setEditingBannerIndex(null);
        }}
        onApplyCrop={(croppedUrl) => {
          if (editingBannerIndex !== null) {
            setCfgBanners((prev) =>
              prev.map((b, idx) => (idx === editingBannerIndex ? croppedUrl : b))
            );
          }
          setBannerCropSrc(null);
          setEditingBannerIndex(null);
        }}
      />

      {/* Testimonial Photo Cropper Popup */}
      <LogoCropModal
        imageSrc={testCropSrc}
        title="Ajustar e Enquadrar Foto do Cliente"
        aspectRatios={[
          { label: 'Quadrado (1:1)', w: 1, h: 1 },
          { label: 'Retrato (4:5)', w: 4, h: 5 },
        ]}
        initialAspect={{ w: 1, h: 1 }}
        onClose={() => setTestCropSrc(null)}
        onApplyCrop={(croppedUrl) => {
          setTestFoto(croppedUrl);
          setTestCropSrc(null);
        }}
      />
    </>
  );
};

import Link from 'next/link';

export default function MarketingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F2F4F6] text-[#15263A] px-4 text-center">
      <div className="text-xs font-semibold tracking-[0.12em] uppercase text-[#0F3D5C] mb-3">
        ImobFlux
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold max-w-xl mb-4">
        Seu próprio site de imóveis, no ar em minutos
      </h1>
      <p className="text-sm text-[#68707C] max-w-md mb-8">
        Catálogo de imóveis, painel de gestão e endereço próprio
        (<span className="font-medium">seunome.{process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost'}</span>)
        para corretores e imobiliárias.
      </p>
      <Link
        href="/signup"
        className="px-6 py-3 bg-[#0F3D5C] hover:bg-[#0B2C44] text-white text-xs font-semibold uppercase tracking-wider rounded-[2px] transition-colors"
      >
        Criar minha conta
      </Link>
    </div>
  );
}

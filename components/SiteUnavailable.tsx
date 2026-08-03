import React from 'react';

export const SiteUnavailable: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="text-xs font-semibold tracking-[0.12em] uppercase text-[#0F3D5C] mb-3">
        ImobFlux
      </div>
      <h1 className="text-2xl font-bold text-[#15263A] max-w-md mb-3">
        Este site está temporariamente indisponível
      </h1>
      <p className="text-sm text-[#68707C] max-w-sm">
        O corretor responsável por este site precisa regularizar a assinatura para reativá-lo.
      </p>
    </div>
  );
};

import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  iconClassName?: string;
  textClassName?: string;
}

// Recriação em SVG da marca ImobFlux (casa + seta), já que não temos o
// arquivo oficial exportado. variant="dark" é pra usar sobre fundos escuros
// (texto "Flux" em branco, igual à referência); "light" é pro resto do site
// (fundo claro), onde "Flux" vira a mesma cor do "Imob" pra manter contraste.
export const Logo: React.FC<LogoProps> = ({
  variant = 'light',
  className = '',
  iconClassName = 'w-7 h-7',
  textClassName = 'text-xl'
}) => {
  const imobColor = variant === 'dark' ? '#5B8DEF' : '#0F3D5C';
  const fluxColor = variant === 'dark' ? '#FFFFFF' : '#15263A';

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 48 48" className={iconClassName} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6 22 L20 9 L34 22"
          stroke={imobColor}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M9 19 V38 H20 V26" stroke={imobColor} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path
          d="M13 34 C 18 24, 26 20, 33 19"
          stroke={imobColor}
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        <path d="M29 14 L42 19 L31 25 Z" fill={imobColor} />
      </svg>
      <span className={`font-bold tracking-tight ${textClassName}`}>
        <span style={{ color: imobColor }}>Imob</span>
        <span style={{ color: fluxColor }}>Flux</span>
      </span>
    </span>
  );
};

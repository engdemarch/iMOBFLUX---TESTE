'use client';

import type { AnchorHTMLAttributes } from 'react';
import { trackMetaEvent } from '@/lib/metaPixel';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  metaEvent?: string;
  metaParams?: Record<string, unknown>;
};

// <a> comum (ex: links externos de checkout) que dispara um evento do Meta
// Pixel antes de navegar.
export function TrackedAnchor({ metaEvent, metaParams, onClick, ...props }: Props) {
  return (
    <a
      {...props}
      onClick={(e) => {
        if (metaEvent) trackMetaEvent(metaEvent, metaParams);
        onClick?.(e);
      }}
    />
  );
}

'use client';

import Link from 'next/link';
import type { ComponentProps } from 'react';
import { trackMetaEvent } from '@/lib/metaPixel';

type Props = ComponentProps<typeof Link> & {
  metaEvent?: string;
  metaParams?: Record<string, unknown>;
};

// Link do Next.js que dispara um evento do Meta Pixel antes de navegar.
export function TrackedLink({ metaEvent, metaParams, onClick, ...props }: Props) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        if (metaEvent) trackMetaEvent(metaEvent, metaParams);
        onClick?.(e);
      }}
    />
  );
}

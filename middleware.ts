import { NextRequest, NextResponse } from 'next/server';
import { extractTenantSlug } from '@/lib/host';

export function middleware(req: NextRequest) {
  const hostname = (req.headers.get('host') || '').split(':')[0];
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost';
  const slug = extractTenantSlug(hostname, rootDomain);

  if (!slug) {
    const url = req.nextUrl.clone();
    url.pathname = '/marketing';
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/']
};

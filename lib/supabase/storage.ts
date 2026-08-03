import { supabase } from './client';

export const TENANT_MEDIA_BUCKET = 'tenant-media';

// Resize an image client-side (same canvas logic as the old resizeImageToDataUrl)
// and upload the result to Supabase Storage, returning a public https URL.
export function resizeAndUploadImage(
  file: File,
  tenantId: string,
  category: 'logo' | 'banners' | 'properties' | 'corretores' | 'testimonials',
  maxW = 1100,
  quality = 0.75
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = async () => {
        let { width, height } = img;
        if (width > maxW) {
          height = Math.round(height * (maxW / width));
          width = maxW;
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject('No canvas context');
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          async (blob) => {
            if (!blob) return reject('Falha ao gerar imagem');
            const path = `${tenantId}/${category}/${crypto.randomUUID()}.jpg`;
            const { error } = await supabase.storage
              .from(TENANT_MEDIA_BUCKET)
              .upload(path, blob, { contentType: 'image/jpeg' });
            if (error) return reject(error);
            const { data } = supabase.storage.from(TENANT_MEDIA_BUCKET).getPublicUrl(path);
            resolve(data.publicUrl);
          },
          'image/jpeg',
          quality
        );
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

// Uploads a data URL (e.g. output of a canvas crop) to Supabase Storage,
// returning a public https URL. Used by LogoCropModal's onApplyCrop, which
// produces a data URL directly instead of starting from a File.
export async function uploadDataUrl(
  dataUrl: string,
  tenantId: string,
  category: 'logo' | 'banners' | 'properties' | 'corretores' | 'testimonials'
): Promise<string> {
  const blob = await (await fetch(dataUrl)).blob();
  const ext = blob.type === 'image/png' ? 'png' : 'jpg';
  const path = `${tenantId}/${category}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage
    .from(TENANT_MEDIA_BUCKET)
    .upload(path, blob, { contentType: blob.type });
  if (error) throw error;
  const { data } = supabase.storage.from(TENANT_MEDIA_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

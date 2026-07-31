'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, ZoomIn } from 'lucide-react';

interface LogoCropModalProps {
  imageSrc: string | null;
  title?: string;
  aspectRatios?: { label: string; w: number; h: number }[];
  initialAspect?: { w: number; h: number };
  onClose: () => void;
  onApplyCrop: (croppedDataUrl: string) => void;
}

export const LogoCropModal: React.FC<LogoCropModalProps> = ({
  imageSrc,
  title = 'Ajustar imagem',
  aspectRatios,
  initialAspect,
  onClose,
  onApplyCrop,
}) => {
  const defaultRatios = [
    { label: 'Quadrado', w: 1, h: 1 },
    { label: 'Retangular (2:1)', w: 2, h: 1 },
    { label: 'Larga (3:1)', w: 3, h: 1 },
  ];

  const ratios = aspectRatios && aspectRatios.length > 0 ? aspectRatios : defaultRatios;
  const [aspect, setAspect] = useState<{ w: number; h: number }>(
    initialAspect || ratios[0] || { w: 1, h: 1 }
  );
  const [zoom, setZoom] = useState(100);
  const [isDragging, setIsDragging] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [minScale, setMinScale] = useState(1);

  const frameRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const naturalDimensions = useRef<{ w: number; h: number }>({ w: 0, h: 0 });

  const currentScale = minScale * (zoom / 100);

  const fitImage = useCallback(() => {
    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const frameW = rect.width;
    const frameH = rect.height;
    const natW = naturalDimensions.current.w || 1;
    const natH = naturalDimensions.current.h || 1;

    const calculatedMinScale = Math.max(frameW / natW, frameH / natH);
    setMinScale(calculatedMinScale);

    const initialScale = calculatedMinScale;
    const initialX = (frameW - natW * initialScale) / 2;
    const initialY = (frameH - natH * initialScale) / 2;
    setPos({ x: initialX, y: initialY });
    setZoom(100);
  }, []);

  useEffect(() => {
    if (!imageSrc) return;
    const img = new Image();
    img.onload = () => {
      naturalDimensions.current = { w: img.naturalWidth, h: img.naturalHeight };
      fitImage();
    };
    img.src = imageSrc;
  }, [imageSrc, aspect, fitImage]);

  const handleZoomChange = (newZoom: number) => {
    setZoom(newZoom);
    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    const natW = naturalDimensions.current.w;
    const natH = naturalDimensions.current.h;

    const oldScale = currentScale;
    const newScale = minScale * (newZoom / 100);

    const imgCxBefore = (cx - pos.x) / oldScale;
    const imgCyBefore = (cy - pos.y) / oldScale;

    let newX = cx - imgCxBefore * newScale;
    let newY = cy - imgCyBefore * newScale;

    // Clamp
    const minX = rect.width - natW * newScale;
    const minY = rect.height - natH * newScale;
    newX = Math.min(0, Math.max(minX, newX));
    newY = Math.min(0, Math.max(minY, newY));

    setPos({ x: newX, y: newY });
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pos.x, y: e.clientY - pos.y });
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const natW = naturalDimensions.current.w;
    const natH = naturalDimensions.current.h;

    let newX = e.clientX - dragStart.x;
    let newY = e.clientY - dragStart.y;

    const minX = rect.width - natW * currentScale;
    const minY = rect.height - natH * currentScale;
    newX = Math.min(0, Math.max(minX, newX));
    newY = Math.min(0, Math.max(minY, newY));

    setPos({ x: newX, y: newY });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handleApply = () => {
    if (!frameRef.current || !imgRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();

    const sx = -pos.x / currentScale;
    const sy = -pos.y / currentScale;
    const sW = rect.width / currentScale;
    const sH = rect.height / currentScale;

    const outW = 640;
    const outH = Math.round(640 * (rect.height / rect.width));

    const canvas = document.createElement('canvas');
    canvas.width = outW;
    canvas.height = outH;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    ctx.clearRect(0, 0, outW, outH);
    ctx.drawImage(imgRef.current, sx, sy, sW, sH, 0, 0, outW, outH);

    const croppedDataUrl = canvas.toDataURL('image/png');
    onApplyCrop(croppedDataUrl);
    onClose();
  };

  if (!imageSrc) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#122234]/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FFFFFF] max-w-[520px] w-full p-6 sm:p-8 rounded-[2px] shadow-2xl relative border border-[#DEE2E7]">
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F2F4F6] text-[#15263A] flex items-center justify-center hover:bg-[#DEE2E7] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-[#15263A] mb-1">
          {title}
        </h3>
        <p className="text-xs text-[#68707C] mb-5">
          Arraste a imagem para posicionar e use o zoom para ajustar o enquadramento.
        </p>

        {/* Aspect Ratio Buttons */}
        <div className="flex flex-wrap gap-2 mb-4">
          {ratios.map((r, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setAspect({ w: r.w, h: r.h })}
              className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-[2px] border transition-colors cursor-pointer ${
                aspect.w === r.w && aspect.h === r.h
                  ? 'bg-[#0F3D5C] text-white border-[#0F3D5C]'
                  : 'border-[#DEE2E7] text-[#68707C] hover:border-[#15263A]'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* Crop Canvas Frame */}
        <div
          ref={frameRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{ aspectRatio: `${aspect.w} / ${aspect.h}` }}
          className="relative w-full max-w-[380px] mx-auto overflow-hidden border border-[#DEE2E7] cursor-grab active:cursor-grabbing touch-none crop-checkerboard"
        >
          <img
            ref={imgRef}
            src={imageSrc}
            alt="Crop target"
            draggable={false}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              transformOrigin: '0 0',
              transform: `translate(${pos.x}px, ${pos.y}px) scale(${currentScale})`,
              userSelect: 'none',
              pointerEvents: 'none',
              maxWidth: 'none'
            }}
          />
        </div>

        {/* Zoom Controls */}
        <div className="mt-5">
          <div className="flex items-center justify-between text-xs text-[#68707C] uppercase font-semibold mb-2">
            <span className="flex items-center gap-1">
              <ZoomIn className="w-3.5 h-3.5" />
              Zoom
            </span>
            <span>{zoom}%</span>
          </div>
          <input
            type="range"
            min="100"
            max="400"
            value={zoom}
            onChange={(e) => handleZoomChange(Number(e.target.value))}
            className="w-full accent-[#0F3D5C] cursor-pointer"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={handleApply}
            className="flex-1 py-2.5 bg-[#0F3D5C] hover:bg-[#0B2C44] text-white text-xs font-semibold uppercase tracking-wider rounded-[2px] transition-colors cursor-pointer"
          >
            Aplicar
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 border border-[#DEE2E7] text-[#68707C] hover:text-[#15263A] text-xs font-medium uppercase tracking-wider rounded-[2px] cursor-pointer"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

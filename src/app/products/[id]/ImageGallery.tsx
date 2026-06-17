"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ImageGallery({ images, productName }: { images: string[], productName: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomStyle, setZoomStyle] = useState({});
  const touchStartX = useRef<number | null>(null);

  const validImages = images.filter(Boolean);
  if (validImages.length === 0) return null;

  const activeImage = validImages[activeIndex];

  // Desktop zoom on hover
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({ transformOrigin: `${x}% ${y}%`, transform: 'scale(2)' });
  };
  const handleMouseLeave = () => setZoomStyle({ transform: 'scale(1)' });

  // Mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) setActiveIndex(i => Math.min(i + 1, validImages.length - 1));
      else setActiveIndex(i => Math.max(i - 1, 0));
    }
    touchStartX.current = null;
  };

  return (
    <div className="flex flex-row gap-3">
      
      {/* ── Thumbnail Strip — DESKTOP ONLY (vertical, left side) ── */}
      {validImages.length > 1 && (
        <div className="hidden md:flex flex-col gap-2 overflow-y-auto max-h-[560px] w-20 flex-shrink-0">
          {validImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`flex-shrink-0 w-20 h-20 border-2 rounded-sm overflow-hidden transition-all ${
                activeIndex === idx
                  ? 'border-[var(--color-primary)] opacity-100'
                  : 'border-transparent opacity-55 hover:opacity-90'
              }`}
            >
              <div className="relative w-full h-full bg-white">
                <Image
                  src={img}
                  alt={`${productName} view ${idx + 1}`}
                  fill
                  className="object-contain p-1"
                  unoptimized={img.startsWith('data:')}
                />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* ── Main Image ── */}
      <div className="flex-1 relative">

        {/* Mobile: left/right arrow buttons on image */}
        {validImages.length > 1 && (
          <>
            <button
              onClick={() => setActiveIndex(i => Math.max(i - 1, 0))}
              className={`md:hidden absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow-md ${activeIndex === 0 ? 'opacity-20 pointer-events-none' : 'opacity-90'}`}
            >
              <ChevronLeft className="w-5 h-5 text-[var(--color-primary)]" />
            </button>
            <button
              onClick={() => setActiveIndex(i => Math.min(i + 1, validImages.length - 1))}
              className={`md:hidden absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow-md ${activeIndex === validImages.length - 1 ? 'opacity-20 pointer-events-none' : 'opacity-90'}`}
            >
              <ChevronRight className="w-5 h-5 text-[var(--color-primary)]" />
            </button>
          </>
        )}

        {/* Main image */}
        <div
          className="aspect-square md:aspect-[4/5] max-h-[480px] md:max-h-[650px] bg-[#f8f5ef] overflow-hidden relative cursor-zoom-in border border-[var(--color-border)] rounded-sm"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <Image
            src={activeImage}
            fill
            className="object-contain transition-transform duration-200 bg-[#f8f5ef]"
            style={zoomStyle}
            alt={productName}
            unoptimized={activeImage.startsWith('data:')}
            priority
          />
        </div>

        {/* Mobile: dot indicators INSIDE the component, not below — overlay on image bottom */}
        {validImages.length > 1 && (
          <div className="flex justify-center gap-1.5 mt-2 md:hidden">
            {validImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`rounded-full transition-all duration-200 ${
                  activeIndex === idx
                    ? 'w-5 h-1.5 bg-[var(--color-primary)]'
                    : 'w-1.5 h-1.5 bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

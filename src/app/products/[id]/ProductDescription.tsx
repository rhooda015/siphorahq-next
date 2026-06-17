"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function ProductDescription({ htmlContent }: { htmlContent: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpandable, setIsExpandable] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      // Check if content exceeds ~5-6 lines (approx 120px height based on line-height)
      if (contentRef.current.scrollHeight > 140) {
        setIsExpandable(true);
      }
    }
  }, [htmlContent]);

  return (
    <div className="relative mt-4">
      <div 
        ref={contentRef}
        className={`text-sm font-sans text-[var(--color-text-muted)] leading-relaxed prose prose-sm max-w-none prose-p:mb-3 prose-h3:font-semibold prose-h3:text-[var(--color-primary)] prose-h3:mt-4 prose-ul:list-disc prose-ul:pl-5 prose-li:mb-1 overflow-hidden transition-all duration-500 ease-in-out ${
          isExpanded ? 'max-h-[2000px]' : 'max-h-[140px]'
        }`}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
      
      {!isExpanded && isExpandable && (
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--color-bg)] to-transparent pointer-events-none" />
      )}

      {isExpandable && (
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="group mt-4 flex items-center gap-2 text-xs font-serif italic tracking-wide text-[var(--color-primary)] hover:text-[#C9A84C] transition-colors"
        >
          {isExpanded ? (
            <>
              Read Less <ChevronUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
            </>
          ) : (
            <>
              Read More <ChevronDown className="w-3 h-3 group-hover:translate-y-0.5 transition-transform" />
            </>
          )}
        </button>
      )}
    </div>
  );
}

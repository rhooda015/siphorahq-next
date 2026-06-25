'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function ShippingReturnsSummary() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-8 border-t border-b border-surface-cream/50">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex items-center justify-between text-left group"
      >
        <span className="font-headline-md text-sm text-ink-charcoal uppercase tracking-widest group-hover:text-burnished-gold transition-colors">
          Shipping & Returns
        </span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-on-surface-variant group-hover:text-burnished-gold transition-colors" />
        ) : (
          <ChevronDown className="w-4 h-4 text-on-surface-variant group-hover:text-burnished-gold transition-colors" />
        )}
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 pb-4 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="space-y-4 text-sm font-body-md text-on-surface-variant">
          <div>
            <h5 className="font-medium text-ink-charcoal mb-1">Standard Shipping</h5>
            <p>Free standard shipping on all prepaid orders. Delivery within 3-5 business days across India.</p>
          </div>
          <div>
            <h5 className="font-medium text-ink-charcoal mb-1">Cash on Delivery (COD)</h5>
            <p>Available for select pin codes with a nominal ₹99 handling fee.</p>
          </div>
          <div>
            <h5 className="font-medium text-ink-charcoal mb-1">7-Day Returns</h5>
            <p>Not completely satisfied? Return unused items in original packaging within 7 days for a full refund or exchange. Custom or personalized items are final sale.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

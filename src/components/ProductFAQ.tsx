'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

interface ProductFAQProps {
  faqs: FAQ[];
}

export default function ProductFAQ({ faqs }: ProductFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!faqs || faqs.length === 0) return null;

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="mt-8 border-t border-surface-cream/50 pt-8">
      <h3 className="font-headline-md text-xl text-ink-charcoal mb-6">Frequently Asked Questions</h3>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-surface-cream/30 pb-4">
            <button 
              onClick={() => toggleAccordion(index)}
              className="w-full flex items-start justify-between text-left group"
            >
              <span className="font-body-md text-sm font-medium text-ink-charcoal group-hover:text-burnished-gold transition-colors pr-8">
                {faq.question}
              </span>
              {openIndex === index ? (
                <ChevronUp className="w-4 h-4 mt-0.5 flex-shrink-0 text-on-surface-variant group-hover:text-burnished-gold transition-colors" />
              ) : (
                <ChevronDown className="w-4 h-4 mt-0.5 flex-shrink-0 text-on-surface-variant group-hover:text-burnished-gold transition-colors" />
              )}
            </button>
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index ? 'max-h-96 mt-3 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <p className="font-body-md text-sm text-on-surface-variant">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </div>
  );
}

import React from 'react';
import { BRAND } from '@/config/brand';
import ContactForm from '@/components/ContactForm';

export { contactMetadata as metadata } from '@/lib/metadata';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <div className="max-w-7xl mx-auto px-4 py-24 md:py-32">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Column - Contact Info */}
          <div className="w-full lg:w-5/12">
            <h1 className="text-4xl md:text-5xl font-serif text-[var(--color-primary)] mb-8 tracking-wide">Get in Touch</h1>
            <p className="text-[var(--color-text-muted)] font-sans text-sm leading-loose mb-12">
              Whether you are inquiring about a bespoke order, corporate gifting, or require assistance with an existing purchase, our Concierge team is here to help.
            </p>

            <div className="space-y-10">
              <div>
                <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] text-[var(--color-secondary)] mb-3">WhatsApp Concierge</h3>
                <a href="https://wa.me/919540027978" target="_blank" rel="noreferrer" className="font-serif text-2xl text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors">
                  +91 95400 27978
                </a>
              </div>
              
              <div>
                <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] text-[var(--color-secondary)] mb-3">Email Us</h3>
                <a href="mailto:concierge@siphorahq.in" className="font-serif text-2xl text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors">
                  concierge@siphorahq.in
                </a>
              </div>

              <div>
                <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] text-[var(--color-secondary)] mb-3">Business Hours</h3>
                <p className="font-serif text-xl text-[var(--color-primary)]">
                  Monday – Saturday<br />
                  10:00 AM – 7:00 PM (IST)
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="w-full lg:w-7/12">
            <div className="bg-[var(--color-accent-light)] p-8 md:p-12 border-[0.5px] border-[var(--color-border)]">
              <h2 className="font-serif text-3xl text-[var(--color-primary)] mb-8">Send an Inquiry</h2>
              
              <ContactForm />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
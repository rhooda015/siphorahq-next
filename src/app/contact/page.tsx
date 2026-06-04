import React from 'react';
import { BRAND } from '@/config/brand';

export const metadata = {
  title: `Contact & Concierge | ${BRAND.name}`,
};

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
              
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col">
                    <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-[var(--color-primary)] mb-3">First Name *</label>
                    <input type="text" className="bg-transparent border-b-[0.5px] border-[var(--color-border)] py-2 focus:outline-none focus:border-[var(--color-secondary)] transition-colors font-sans text-sm rounded-none" required />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-[var(--color-primary)] mb-3">Last Name</label>
                    <input type="text" className="bg-transparent border-b-[0.5px] border-[var(--color-border)] py-2 focus:outline-none focus:border-[var(--color-secondary)] transition-colors font-sans text-sm rounded-none" />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-[var(--color-primary)] mb-3">Email Address *</label>
                  <input type="email" className="bg-transparent border-b-[0.5px] border-[var(--color-border)] py-2 focus:outline-none focus:border-[var(--color-secondary)] transition-colors font-sans text-sm rounded-none" required />
                </div>

                <div className="flex flex-col">
                  <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-[var(--color-primary)] mb-3">Subject</label>
                  <select className="bg-transparent border-b-[0.5px] border-[var(--color-border)] py-2 focus:outline-none focus:border-[var(--color-secondary)] transition-colors font-sans text-sm text-[var(--color-primary)] rounded-none">
                    <option>General Inquiry</option>
                    <option>Corporate Gifting</option>
                    <option>Order Support</option>
                    <option>Press & Media</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-[var(--color-primary)] mb-3">Message *</label>
                  <textarea rows={4} className="bg-transparent border-b-[0.5px] border-[var(--color-border)] py-2 focus:outline-none focus:border-[var(--color-secondary)] transition-colors font-sans text-sm resize-none rounded-none" required></textarea>
                </div>

                <button type="button" className="w-full border-[0.5px] border-[var(--color-primary)] bg-[var(--color-primary)] text-white py-5 text-[10px] font-sans tracking-[0.2em] uppercase hover:bg-white hover:text-[var(--color-primary)] transition-colors duration-500 mt-4">
                  Submit Inquiry
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
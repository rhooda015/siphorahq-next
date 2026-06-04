"use client";

import React, { useState } from 'react';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call for the inquiry
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  if (success) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <div className="w-16 h-16 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-serif text-3xl text-[var(--color-primary)] mb-4">Inquiry Sent</h3>
        <p className="text-[var(--color-text-muted)] font-sans text-sm mb-10 leading-loose max-w-sm mx-auto">
          Thank you for reaching out to us. Our Concierge team will get back to you within 24 hours.
        </p>
        <button 
          onClick={() => setSuccess(false)}
          className="border-[0.5px] border-[var(--color-primary)] bg-transparent text-[var(--color-primary)] px-8 py-4 text-[10px] font-sans tracking-[0.2em] uppercase hover:bg-[var(--color-primary)] hover:text-white transition-colors duration-500"
        >
          Send Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
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

      <button 
        type="submit" 
        disabled={loading}
        className="w-full border-[0.5px] border-[var(--color-primary)] bg-[var(--color-primary)] text-white py-5 text-[10px] font-sans tracking-[0.2em] uppercase hover:bg-white hover:text-[var(--color-primary)] transition-colors duration-500 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? "Sending..." : "Submit Inquiry"}
      </button>
    </form>
  );
}

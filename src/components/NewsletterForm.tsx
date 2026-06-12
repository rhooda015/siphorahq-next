"use client";

import React, { useState } from 'react';

export default function NewsletterForm() {
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }, 1500);
  };

  if (subscribed) {
    return (
      <div className="text-champagne-gold text-sm font-medium tracking-wide">
        Thank you for subscribing!
      </div>
    );
  }

  return (
    <form onSubmit={handleSubscribe}>
      <div className="flex border-b border-heritage-navy/20 dark:border-porcelain-white/20 pb-2">
        <input 
          type="email" 
          placeholder="Email address" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-transparent border-none focus:ring-0 w-full placeholder:text-on-surface-variant/50 focus:outline-none"
          required
        />
        <button 
          type="submit" 
          disabled={loading}
          className="material-symbols-outlined text-heritage-navy dark:text-porcelain-white disabled:opacity-50"
          aria-label="Subscribe"
        >
          {loading ? 'hourglass_empty' : 'east'}
        </button>
      </div>
    </form>
  );
}

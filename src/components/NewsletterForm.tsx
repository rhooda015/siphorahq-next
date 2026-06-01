"use client";

import React, { useState } from 'react';

export default function NewsletterForm() {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 5000);
  };

  if (subscribed) {
    return (
      <div className="text-green-700 bg-green-50 border border-green-200 p-3 text-sm font-medium tracking-wide">
        Thank you for subscribing!
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubscribe}>
      <div className="relative">
        <input 
          type="email" 
          placeholder="Your email address" 
          className="w-full bg-white border border-[var(--color-border)] text-black px-4 py-3 focus:outline-none focus:border-[var(--color-primary)] transition-colors rounded-sm placeholder:text-gray-400"
          required
        />
        <button 
          type="submit" 
          className="absolute right-2 top-1 bottom-1 px-4 bg-[var(--color-primary)] text-white hover:bg-[var(--color-secondary)] transition-colors font-sans tracking-widest text-xs uppercase rounded-sm"
          aria-label="Subscribe"
        >
          Join
        </button>
      </div>
    </form>
  );
}

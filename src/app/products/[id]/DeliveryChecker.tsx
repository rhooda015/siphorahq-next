"use client";

import React, { useState } from 'react';

export default function DeliveryChecker() {
  const [pincode, setPincode] = useState('');
  const [result, setResult] = useState<{ date?: string; error?: string } | null>(null);

  const checkDelivery = () => {
    if (!pincode || pincode.length !== 6 || isNaN(Number(pincode))) {
      setResult({ error: 'Please enter a valid 6-digit Pincode.' });
      return;
    }

    // Mock logic for dynamic delivery dates
    const date = new Date();
    date.setDate(date.getDate() + Math.floor(Math.random() * 3) + 3); // 3-5 days
    
    setResult({
      date: date.toLocaleDateString('en-IN', { weekday: 'long', month: 'short', day: 'numeric' })
    });
  };

  return (
    <div className="mt-8 bg-[var(--color-accent-light)] p-4 border border-[var(--color-border)] flex flex-col gap-2 mb-6">
      <label className="text-sm font-sans font-medium text-[var(--color-primary)]">Check Delivery & COD</label>
      <div className="flex">
        <input 
          type="text" 
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          placeholder="Enter Pincode" 
          className="flex-1 bg-white border border-[var(--color-border)] px-3 py-2 text-sm font-sans outline-none focus:border-[#C9A84C]" 
        />
        <button 
          onClick={checkDelivery}
          className="bg-[var(--color-primary)] text-white px-4 text-xs uppercase tracking-widest font-medium hover:bg-[var(--color-secondary)] transition-colors"
        >
          Check
        </button>
      </div>
      {result?.error && <p className="text-xs text-red-600 mt-1">{result.error}</p>}
      {result?.date && (
        <p className="text-xs text-green-700 mt-1 font-medium">
          ✓ Delivery by {result.date}. COD available.
        </p>
      )}
    </div>
  );
}

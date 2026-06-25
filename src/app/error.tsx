"use client";

import { useEffect } from "react";
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-surface-cream px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-serif text-[#C9A84C] mb-4">500</h1>
        <h2 className="text-3xl font-serif text-ink-charcoal mb-6">Something went wrong</h2>
        <p className="text-on-surface-variant font-body-md mb-10">
          An unexpected error occurred. Please try again later or contact support if the issue persists.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="inline-block bg-white text-ink-charcoal border border-[#E8E1D3] font-sans text-xs uppercase tracking-widest px-8 py-4 rounded-sm hover:bg-[#Fdfbf9] transition-colors"
          >
            Try Again
          </button>
          <Link 
            href="/"
            className="inline-block bg-ink-charcoal text-white font-sans text-xs uppercase tracking-widest px-8 py-4 rounded-sm hover:bg-black transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

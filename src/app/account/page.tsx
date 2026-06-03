import React from 'react';
import Link from 'next/link';
import { BRAND } from '@/config/brand';

export const metadata = {
  title: `Account | ${BRAND.name}`,
  description: `Login or create an account with ${BRAND.name}.`,
};

export default function AccountPage() {
  return (
    <div className="min-h-[60vh] bg-[var(--color-bg)] flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full bg-white p-8 border border-[var(--color-border)] shadow-sm">
        <h1 className="text-3xl font-serif text-[var(--color-primary)] text-center mb-6">
          My Account
        </h1>
        <p className="text-center text-[var(--color-text-muted)] font-sans text-sm mb-8">
          Sign in to access your orders, saved items, and details.
        </p>

        <form className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-widest text-[var(--color-primary)] mb-2 font-semibold">
              Email Address
            </label>
            <input 
              type="email" 
              className="w-full border border-[var(--color-border)] px-4 py-3 focus:outline-none focus:border-[var(--color-primary)] transition-colors text-sm font-sans"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-[var(--color-primary)] mb-2 font-semibold">
              Password
            </label>
            <input 
              type="password" 
              className="w-full border border-[var(--color-border)] px-4 py-3 focus:outline-none focus:border-[var(--color-primary)] transition-colors text-sm font-sans"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <label className="flex items-center text-sm font-sans text-[var(--color-text-muted)]">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <Link href="#" className="text-xs text-[var(--color-primary)] hover:underline font-sans">
              Forgot password?
            </Link>
          </div>
          <button 
            type="submit" 
            className="w-full bg-[var(--color-primary)] text-white py-4 uppercase tracking-widest text-xs font-semibold hover:bg-[var(--color-secondary)] transition-colors mt-6"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[var(--color-border)] text-center">
          <p className="text-sm font-sans text-[var(--color-text-muted)] mb-4">
            Don't have an account?
          </p>
          <Link href="#" className="inline-block border border-[var(--color-primary)] text-[var(--color-primary)] py-3 px-8 uppercase tracking-widest text-xs font-semibold hover:bg-[var(--color-primary)] hover:text-white transition-colors">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}

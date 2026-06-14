"use client";

import { useState } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const trimmedEmail = email.trim();

    if (!EMAIL_RE.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 700));
      setJoined(true);
      setEmail("");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      className="relative overflow-hidden bg-[#1A2A3A] px-5 py-20 text-white"
      aria-labelledby="newsletter-heading"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#D4AF3722,transparent_38%)]" />

      <div className="relative mx-auto max-w-3xl text-center">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-[#D4AF37]">
          Siphorahq Circle
        </p>

        <h2
          id="newsletter-heading"
          className="font-serif text-3xl font-semibold leading-tight sm:text-4xl"
        >
          Get Early Access to New Luxury Collections
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/75">
          Exclusive access to new porcelain collections, early launches, premium
          gifting offers, and members-only styling inspiration.
        </p>

        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#D4AF37]/90">
          No spam. Only premium updates.
        </p>

        {joined ? (
          <div
            role="status"
            className="mx-auto mt-10 max-w-xl border border-[#D4AF37]/40 bg-white/10 p-6 text-center backdrop-blur"
          >
            <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#D4AF37] text-[#1A2A3A]">
              ✓
            </div>

            <h3 className="font-serif text-2xl font-semibold text-white">
              Welcome to Siphorahq Circle
            </h3>

            <p className="mt-3 text-sm leading-7 text-white/75">
              You now have early access to new collections, luxury gifting
              launches, and exclusive member-only offers.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            aria-label="Newsletter signup"
            className="mx-auto mt-9 flex max-w-xl flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Your email address
            </label>

            <input
              id="newsletter-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
              placeholder="Enter your email"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "newsletter-error" : "newsletter-note"}
              className="min-h-12 flex-1 border border-white/20 bg-white/10 px-5 py-3 text-sm text-white placeholder-white/45 outline-none transition focus:border-[#D4AF37] focus:bg-white/15 focus:ring-2 focus:ring-[#D4AF37]/20"
            />

            <button
              type="submit"
              disabled={!email || submitting}
              className="min-h-12 bg-[#D4AF37] px-8 py-3 text-xs font-bold uppercase tracking-[0.25em] text-[#1A2A3A] transition hover:bg-[#C5A059] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? "Joining..." : "Subscribe"}
            </button>
          </form>
        )}

        {!joined && (
          <p id="newsletter-note" className="mt-4 text-xs text-white/50">
            Members receive first access before public launch.
          </p>
        )}

        {error && (
          <p
            id="newsletter-error"
            role="alert"
            className="mt-3 text-sm text-red-300"
          >
            {error}
          </p>
        )}
      </div>
    </section>
  );
}

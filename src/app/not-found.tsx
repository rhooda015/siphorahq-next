import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-surface-cream px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-serif text-[#C9A84C] mb-4">404</h1>
        <h2 className="text-3xl font-serif text-ink-charcoal mb-6">Page Not Found</h2>
        <p className="text-on-surface-variant font-body-md mb-10">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link 
          href="/"
          className="inline-block bg-ink-charcoal text-white font-sans text-xs uppercase tracking-widest px-8 py-4 rounded-sm hover:bg-black transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

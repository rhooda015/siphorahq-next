import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-40 bg-white/90 backdrop-blur-sm border-b border-gray-200 h-20 flex items-center px-4 md:px-8">
      <Link href="/" className="font-serif text-2xl font-bold">Siphorahq</Link>
    </header>
  );
}

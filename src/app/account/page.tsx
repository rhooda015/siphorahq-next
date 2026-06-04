"use client";

import React from 'react';
import Link from 'next/link';
import { 
  Package, 
  ShieldCheck, 
  MapPin, 
  CreditCard, 
  Heart, 
  Headphones,
  Search,
  User,
  ShoppingBag
} from 'lucide-react';
import { BRAND } from '@/config/brand';
import { useCart } from '@/store/useCart';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// metadata cannot be exported from a Client Component, so we must remove it.
// To handle SEO for this route, we would normally put it in a layout.tsx file, 
// but for now removing it is the safest fix since it's an authenticated route anyway.

const accountCards = [
  {
    title: 'My Orders',
    description: 'Track, return, or view your past luxury purchases.',
    icon: Package,
    href: '/account/orders'
  },
  {
    title: 'Login & Security',
    description: 'Update your password, email, and mobile number.',
    icon: ShieldCheck,
    href: '/account/security'
  },
  {
    title: 'My Addresses',
    description: 'Manage your shipping and billing addresses.',
    icon: MapPin,
    href: '/account/addresses'
  },
  {
    title: 'Payment Methods',
    description: 'Manage saved cards, UPI, and other payment options.',
    icon: CreditCard,
    href: '/account/payments'
  },
  {
    title: 'My Wishlist',
    description: 'View and manage your saved items and collections.',
    icon: Heart,
    href: '/account/wishlist'
  },
  {
    title: 'Concierge Support',
    description: 'Premium customer service via chat or phone.',
    icon: Headphones,
    href: '/contact'
  }
];

export default function AccountDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { items, openDrawer } = useCart();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') return <div className="min-h-screen flex items-center justify-center"><p className="font-sans text-gray-400 tracking-widest text-sm">Loading...</p></div>;
  if (!session) return null;

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navbar */}
      <div className="border-b-[0.5px] border-[#1a1612]/20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          <button className="text-[#1a1612] hover:text-[#8b6914] transition-colors">
            <Search className="w-5 h-5 stroke-[1.5]" />
          </button>
          
          <Link href="/" className="text-3xl font-serif tracking-[0.2em] uppercase text-[#1a1612] hover:text-[#8b6914] transition-colors">
            {BRAND.name}
          </Link>
          
          <div className="flex items-center gap-6">
            <span className="hidden md:block font-sans text-xs tracking-[0.1em] uppercase text-[#1a1612]">
              Welcome back
            </span>
            <div className="text-[#1a1612] transition-colors">
              <User className="w-5 h-5 stroke-[1.5]" />
            </div>
            <button onClick={openDrawer} className="relative text-[#1a1612] hover:text-[#8b6914] transition-colors cursor-pointer">
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              {mounted && items.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-[#8b6914] text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-sans">
                  {items.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Nav Bar */}
      <div className="border-b-[0.5px] border-[#1a1612]/10 hidden md:block">
        <div className="max-w-7xl mx-auto px-8 h-12 flex items-center justify-center gap-12">
          <Link href="/products" className="font-sans text-[11px] uppercase tracking-[0.15em] text-[#1a1612] hover:text-[#8b6914] transition-colors">Products</Link>
          <Link href="/products?category=dinner-set" className="font-sans text-[11px] uppercase tracking-[0.15em] text-[#1a1612] hover:text-[#8b6914] transition-colors">Collections</Link>
          <Link href="/gifting" className="font-sans text-[11px] uppercase tracking-[0.15em] text-[#1a1612] hover:text-[#8b6914] transition-colors">Corporate Gifting</Link>
          <Link href="/about" className="font-sans text-[11px] uppercase tracking-[0.15em] text-[#1a1612] hover:text-[#8b6914] transition-colors">Our Story</Link>
          <Link href="/journal" className="font-sans text-[11px] uppercase tracking-[0.15em] text-[#1a1612] hover:text-[#8b6914] transition-colors">Journal</Link>
          <Link href="/contact" className="font-sans text-[11px] uppercase tracking-[0.15em] text-[#1a1612] hover:text-[#8b6914] transition-colors">Contact</Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 border-b-[0.5px] border-[#1a1612]/20 pb-8">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h1 className="text-4xl font-serif text-[var(--color-primary)] mb-4">
              Welcome, {session?.user?.name?.split(' ')[0] || 'Guest'}
            </h1>
            <p className="text-[#1a1612]/60 font-sans text-xs uppercase tracking-[0.15em]">
              Manage your {BRAND.name} experience
            </p>
          </div>
          <button onClick={() => signOut({ callbackUrl: '/login' })} className="border-[0.5px] border-[#1a1612] rounded-[3px] px-8 py-3 text-[10px] uppercase tracking-[0.2em] text-[#1a1612] hover:bg-[#1a1612] hover:text-white transition-colors duration-300">
            Sign Out
          </button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accountCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Link 
                href={card.href} 
                key={index}
                className="group block bg-white p-8 border-[0.5px] border-[#1a1612]/20 rounded-[3px] hover:border-[#8b6914] transition-colors duration-300"
              >
                <div className="flex items-start gap-5">
                  <div className="text-[#1a1612] group-hover:text-[#8b6914] transition-colors duration-300">
                    <Icon className="w-6 h-6 stroke-[1]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-serif text-[#1a1612] mb-2 group-hover:text-[#8b6914] transition-colors">
                      {card.title}
                    </h2>
                    <p className="text-xs font-sans tracking-wide text-[#1a1612]/60 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom Settings Section */}
        <div className="mt-20 pt-16 border-t-[0.5px] border-[#1a1612]/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Column 1 */}
            <div>
              <h3 className="text-lg font-serif text-[#1a1612] mb-6">Account Settings</h3>
              <ul className="space-y-4">
                <li><Link href="#" className="text-xs tracking-[0.1em] uppercase font-sans text-[#1a1612]/60 hover:text-[#8b6914] transition-colors">Default Purchase Settings</Link></li>
                <li><Link href="#" className="text-xs tracking-[0.1em] uppercase font-sans text-[#1a1612]/60 hover:text-[#8b6914] transition-colors">Communication Preferences</Link></li>
                <li><Link href="#" className="text-xs tracking-[0.1em] uppercase font-sans text-[#1a1612]/60 hover:text-[#8b6914] transition-colors">Language & Region</Link></li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h3 className="text-lg font-serif text-[#1a1612] mb-6">Email & Alerts</h3>
              <ul className="space-y-4">
                <li><Link href="#" className="text-xs tracking-[0.1em] uppercase font-sans text-[#1a1612]/60 hover:text-[#8b6914] transition-colors">Promotional Emails</Link></li>
                <li><Link href="#" className="text-xs tracking-[0.1em] uppercase font-sans text-[#1a1612]/60 hover:text-[#8b6914] transition-colors">Order Notifications (SMS)</Link></li>
                <li><Link href="#" className="text-xs tracking-[0.1em] uppercase font-sans text-[#1a1612]/60 hover:text-[#8b6914] transition-colors">Message Center</Link></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h3 className="text-lg font-serif text-[#1a1612] mb-6">Siphora Exclusives</h3>
              <ul className="space-y-4">
                <li><Link href="#" className="text-xs tracking-[0.1em] uppercase font-sans text-[#1a1612]/60 hover:text-[#8b6914] transition-colors">My Membership Benefits</Link></li>
                <li><Link href="#" className="text-xs tracking-[0.1em] uppercase font-sans text-[#1a1612]/60 hover:text-[#8b6914] transition-colors">Corporate Gifting History</Link></li>
                <li><Link href="#" className="text-xs tracking-[0.1em] uppercase font-sans text-[#1a1612]/60 hover:text-[#8b6914] transition-colors">Redeem Gift Cards</Link></li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

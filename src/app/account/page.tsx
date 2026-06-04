import React from 'react';
import Link from 'next/link';
import { 
  Package, 
  ShieldCheck, 
  MapPin, 
  CreditCard, 
  Heart, 
  Headphones,
  Settings,
  Mail,
  Gift,
  LogOut
} from 'lucide-react';
import { BRAND } from '@/config/brand';

export const metadata = {
  title: `My Account | ${BRAND.name}`,
  description: `Manage your ${BRAND.name} account, orders, and preferences.`,
};

// Define the cards for the dashboard
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
  return (
    <div className="min-h-screen bg-[var(--color-bg)] py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h1 className="text-4xl font-serif text-[var(--color-primary)] mb-2">My Account</h1>
            <p className="text-[var(--color-text-muted)] font-sans text-sm tracking-wide">
              Manage your {BRAND.name} experience
            </p>
          </div>
          <button className="flex items-center gap-2 border border-[var(--color-border)] px-6 py-3 text-xs uppercase tracking-widest text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-colors duration-300">
            <LogOut className="w-4 h-4" />
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
                className="group block bg-white p-8 border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  <div className="p-3 bg-[var(--color-bg)] text-[var(--color-primary)] group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors duration-300">
                    <Icon className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-serif text-[var(--color-primary)] mb-2 group-hover:text-[var(--color-secondary)] transition-colors">
                      {card.title}
                    </h2>
                    <p className="text-sm font-sans text-[var(--color-text-muted)] leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom Settings Section */}
        <div className="mt-20 pt-16 border-t border-[var(--color-border)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Column 1 */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Settings className="w-5 h-5 text-[var(--color-primary)]" />
                <h3 className="text-lg font-serif text-[var(--color-primary)]">Account Settings</h3>
              </div>
              <ul className="space-y-4">
                <li><Link href="#" className="text-sm font-sans text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:underline underline-offset-4 transition-all">Default Purchase Settings</Link></li>
                <li><Link href="#" className="text-sm font-sans text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:underline underline-offset-4 transition-all">Communication Preferences</Link></li>
                <li><Link href="#" className="text-sm font-sans text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:underline underline-offset-4 transition-all">Language & Region</Link></li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Mail className="w-5 h-5 text-[var(--color-primary)]" />
                <h3 className="text-lg font-serif text-[var(--color-primary)]">Email & Alerts</h3>
              </div>
              <ul className="space-y-4">
                <li><Link href="#" className="text-sm font-sans text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:underline underline-offset-4 transition-all">Promotional Emails</Link></li>
                <li><Link href="#" className="text-sm font-sans text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:underline underline-offset-4 transition-all">Order Notifications (SMS)</Link></li>
                <li><Link href="#" className="text-sm font-sans text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:underline underline-offset-4 transition-all">Message Center</Link></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Gift className="w-5 h-5 text-[var(--color-primary)]" />
                <h3 className="text-lg font-serif text-[var(--color-primary)]">Siphora Exclusives</h3>
              </div>
              <ul className="space-y-4">
                <li><Link href="#" className="text-sm font-sans text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:underline underline-offset-4 transition-all">My Membership Benefits</Link></li>
                <li><Link href="#" className="text-sm font-sans text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:underline underline-offset-4 transition-all">Corporate Gifting History</Link></li>
                <li><Link href="#" className="text-sm font-sans text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:underline underline-offset-4 transition-all">Redeem Gift Cards</Link></li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

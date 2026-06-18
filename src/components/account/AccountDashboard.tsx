"use client";
import { Search, User, Heart, ShoppingBag, Star, Truck, Award, Gift, ChevronRight, Gem, Camera, Share2, Mail, Phone, ArrowRight, Globe, MessageCircle } from 'lucide-react';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * Shape of the account data this component expects from the parent
 * page (typically fetched server-side via getServerSideProps / a
 * server component and passed down, or from a client data hook).
 */
export interface AccountUser {
  name: string;
  memberSince: number | string;
  tier: "Heritage Bronze" | "Heritage Silver" | "Heritage Gold" | "Heritage Platinum" | string;
  activeOrdersCount: number;
}

export interface AccountDashboardProps {
  user: AccountUser;
  /** Called when the user confirms sign-out. Wire this to your auth provider. */
  onSignOut: () => void | Promise<void>;
  /** Called with a validated email when the newsletter form is submitted. */
  onNewsletterSubmit: (email: string) => Promise<{ ok: boolean; message?: string }>;
}

const NAV_LINKS = [
  { href: "/products", label: "Shop" },
  { href: "/collections", label: "Collections" },
  { href: "/new-arrivals", label: "New Arrivals" },
  { href: "/best-sellers", label: "Best Sellers" },
  { href: "/gift-sets", label: "Gift Sets" },
  { href: "/our-story", label: "Our Story" },
];

const DASHBOARD_CARDS = [
  {
    icon: "package_2",
    title: "My Orders",
    description: "Track shipments, view history, and manage returns.",
    href: "/account/orders",
    cta: "View history",
    badgeKey: "activeOrders" as const,
  },
  {
    icon: "shield_person",
    title: "Login & Security",
    description: "Update passwords and secure your digital experience.",
    href: "/account/security",
    cta: "Manage access",
  },
  {
    icon: "location_on",
    title: "My Addresses",
    description: "Save and edit delivery locations for swift checkout.",
    href: "/account/addresses",
    cta: "Edit addresses",
  },
  {
    icon: "credit_card",
    title: "Payment Methods",
    description: "Securely manage your cards and Siphora credit.",
    href: "/account/payments",
    cta: "Manage wallet",
  },
  {
    icon: "favorite",
    title: "My Wishlist",
    description: "Keep track of artisanal pieces for future curation.",
    href: "/account/wishlist",
    cta: "View curation",
  },
];

const SETTINGS_LINKS = [
  {
    href: "/account/purchase-settings",
    eyebrow: "Purchasing",
    title: "Default Purchase Settings",
    description: "1-click ordering, default shipping, and currency (INR).",
  },
  {
    href: "/account/notifications",
    eyebrow: "Notifications",
    title: "Communication Preferences",
    description: "Manage how we reach you for updates and invitations.",
  },
  {
    href: "/account/language",
    eyebrow: "Localisation",
    title: "Language & Region",
    description: "English (IN) · India · IST (UTC +5:30)",
  },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AccountDashboard({
  user,
  onSignOut,
  onNewsletterSubmit,
}: AccountDashboardProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [newsletterState, setNewsletterState] = useState<{
    status: "idle" | "success" | "error";
    message: string;
  }>({ status: "idle", message: "" });

  // Email & alerts toggles
  const [promoEmails, setPromoEmails] = useState(true);
  const [msgCenter, setMsgCenter] = useState(true);

  const handleSignOutClick = () => {
    if (window.confirm("Sign out of your account?")) {
      onSignOut();
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = email.trim();

    if (!EMAIL_RE.test(trimmed)) {
      setNewsletterState({ status: "error", message: "Please enter a valid email address." });
      return;
    }

    try {
      const result = await onNewsletterSubmit(trimmed);
      if (result.ok) {
        setNewsletterState({
          status: "success",
          message: result.message ?? "You're on the list. Welcome to the Siphora circle.",
        });
        setEmail("");
      } else {
        setNewsletterState({
          status: "error",
          message: result.message ?? "Something went wrong. Please try again.",
        });
      }
    } catch {
      setNewsletterState({
        status: "error",
        message: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="bg-surface-cream dark:bg-dark-surface text-ink-charcoal dark:text-surface-cream font-sans antialiased selection:bg-burnished-gold selection:text-white min-h-screen transition-colors duration-300">
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-white focus:text-ink-charcoal focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:rounded focus:shadow-md"
      >
        Skip to main content
      </a>

      {/* Announcement bar */}
      <div
        role="banner"
        aria-label="Promotional announcement"
        className="bg-ink-charcoal dark:bg-black text-white text-center py-2 text-[11px] font-semibold uppercase tracking-widest"
      >
        Free Shipping Above ₹999 &middot; Luxury Gift Packaging &middot; WhatsApp Concierge
      </div>

      {/* Navigation */}
      <header
        id="site-header"
        className="sticky top-0 z-50 bg-surface-cream/95 dark:bg-dark-surface/95 backdrop-blur-md border-b border-muted-sand dark:border-dark-muted-sand transition-all duration-300"
      >
        <div className="flex justify-between items-center px-site-x-sm md:px-site-x py-5 w-full max-w-site mx-auto">
          {/* Logo */}
          <Link
            href="/"
            aria-label="Siphora HQ — go to homepage"
            className="font-serif text-2xl font-semibold italic tracking-tight shrink-0"
          >
            Siphora HQ
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11px] font-semibold uppercase tracking-widest text-on-surface-variant dark:text-dark-on-surface-variant hover:text-ink-charcoal dark:hover:text-surface-cream transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Icon actions */}
          <div className="flex items-center gap-5">
            <Link
              href="/search"
              aria-label="Search"
              className="hover:text-burnished-gold transition-colors hidden sm:inline-flex"><Search className="w-5 h-5" /></Link>
            <Link
              href="/account"
              aria-label="My account"
              aria-current="page"
              className="border-b-2 border-burnished-gold pb-0.5"><User className="w-5 h-5" /></Link>
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="hover:text-burnished-gold transition-colors hidden sm:inline-flex"><Heart className="w-5 h-5" /></Link>
            <Link
              href="/cart"
              aria-label="Shopping bag"
              className="hover:text-burnished-gold transition-colors"><ShoppingBag className="w-5 h-5" /></Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileNavOpen((open) => !open)}
              aria-label={mobileNavOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileNavOpen}
              aria-controls="mobile-nav"
              className="md:hidden flex flex-col gap-[5px] p-1"
            >
              <span
                className="block h-0.5 w-5 bg-ink-charcoal dark:bg-surface-cream transition-transform duration-200"
                style={{
                  transform: mobileNavOpen ? "translateY(7px) rotate(45deg)" : undefined,
                }}
              />
              <span
                className="block h-0.5 w-5 bg-ink-charcoal dark:bg-surface-cream transition-opacity duration-200"
                style={{ opacity: mobileNavOpen ? 0 : 1 }}
              />
              <span
                className="block h-0.5 w-5 bg-ink-charcoal dark:bg-surface-cream transition-transform duration-200"
                style={{
                  transform: mobileNavOpen ? "translateY(-7px) rotate(-45deg)" : undefined,
                }}
              />
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileNavOpen && (
          <nav
            id="mobile-nav"
            aria-label="Mobile navigation"
            className="border-t border-muted-sand dark:border-dark-muted-sand px-site-x-sm pb-6 pt-4 md:hidden bg-surface-cream dark:bg-dark-surface"
          >
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileNavOpen(false)}
                    className="block py-3 text-sm font-semibold uppercase tracking-widest hover:text-burnished-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-3 border-t border-muted-sand dark:border-dark-muted-sand mt-3">
                <Link
                  href="/wishlist"
                  onClick={() => setMobileNavOpen(false)}
                  className="block py-2 text-sm font-semibold uppercase tracking-widest hover:text-burnished-gold transition-colors"
                >
                  Wishlist
                </Link>
                <Link
                  href="/search"
                  onClick={() => setMobileNavOpen(false)}
                  className="block py-2 text-sm font-semibold uppercase tracking-widest hover:text-burnished-gold transition-colors"
                >
                  Search
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </header>

      <main id="main-content" className="pt-10">
        {/* Welcome Hero */}
        <section
          aria-labelledby="welcome-heading"
          className="px-site-x-sm md:px-site-x mb-20 max-w-site mx-auto"
        >
          <div className="bg-muted-sand dark:bg-dark-surface-container p-10 md:p-16 border border-outline-variant dark:border-dark-muted-sand flex flex-col md:flex-row justify-between items-end gap-8 relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-burnished-gold mb-4">
                Member since {user.memberSince}
              </p>
              <h1
                id="welcome-heading"
                className="font-serif text-5xl md:text-6xl font-semibold mb-4 leading-tight"
              >
                Welcome back, {user.name}
              </h1>
              <p className="text-lg leading-relaxed text-on-surface-variant dark:text-dark-on-surface-variant max-w-xl">
                Your sanctuary for artisanal heritage and modern luxury porcelain.
              </p>
            </div>
            <div className="relative z-10 shrink-0">
              <button
                onClick={handleSignOutClick}
                className="px-8 py-3 bg-ink-charcoal dark:bg-surface-cream text-white dark:text-ink-charcoal text-[11px] font-semibold uppercase tracking-widest hover:bg-white hover:text-ink-charcoal dark:hover:bg-transparent dark:hover:text-surface-cream border border-ink-charcoal dark:border-surface-cream transition-all duration-300"
              >
                Sign Out
              </button>
            </div>
            {/* Tier badge */}
            <div
              className="absolute top-8 right-8 opacity-20 pointer-events-none hidden lg:block"
              aria-hidden="true"
            >
              <span className="font-serif text-[180px] leading-none select-none">✦</span>
            </div>
          </div>
        </section>

        {/* Dashboard Cards */}
        <section
          aria-labelledby="dashboard-heading"
          className="px-site-x-sm md:px-site-x mb-24 max-w-site mx-auto"
        >
          <h2 id="dashboard-heading" className="sr-only">
            Account overview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DASHBOARD_CARDS.map((card) => (
              <article
                key={card.title}
                className="bg-white dark:bg-dark-surface-container border border-muted-sand dark:border-dark-muted-sand p-8 group hover:border-burnished-gold transition-all duration-500 luxury-hover flex flex-col justify-between min-h-72"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span
                      className="material-symbols-outlined text-burnished-gold"
                      style={{ fontSize: "28px" }}
                      aria-hidden="true"
                    >
                      {card.icon}
                    </span>
                    {card.badgeKey === "activeOrders" && (
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-on-tertiary-container bg-muted-sand dark:bg-dark-muted-sand dark:text-burnished-gold px-2 py-1">
                        {user.activeOrdersCount} Active
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-2xl font-medium mb-2">{card.title}</h3>
                  <p className="text-on-surface-variant dark:text-dark-on-surface-variant text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
                <Link
                  href={card.href}
                  className="text-[11px] font-semibold uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all duration-300 mt-6"
                >
                  {card.cta}{" "}
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </Link>
              </article>
            ))}

            {/* Concierge Support — accent card */}
            <article className="bg-ink-charcoal dark:bg-black p-8 group transition-all duration-500 luxury-hover flex flex-col justify-between min-h-72">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span
                    className="material-symbols-outlined text-burnished-gold"
                    style={{ fontSize: "28px" }}
                    aria-hidden="true"
                  >
                    support_agent
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-white/60">
                    24/7 Priority
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-medium text-white mb-2">
                  Concierge Support
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Connect with our luxury consultants for bespoke assistance.
                </p>
              </div>
              <a
                href="https://wa.me/919540027978?text=Hi%20Siphora%2C%20I%20need%20concierge%20assistance."
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-semibold uppercase tracking-widest text-burnished-gold flex items-center gap-2 group-hover:gap-4 transition-all duration-300 mt-6"
              >
                Start consultation{" "}
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </a>
            </article>
          </div>
        </section>

        {/* Account Settings & Preferences */}
        <section
          aria-labelledby="settings-heading"
          className="px-site-x-sm md:px-site-x mb-24 max-w-site mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* Left: Settings lists */}
          <div className="lg:col-span-8 space-y-16">
            <div>
              <h2
                id="settings-heading"
                className="font-serif text-3xl font-medium mb-8 border-b border-muted-sand dark:border-dark-muted-sand pb-4"
              >
                Account Settings
              </h2>
              <div className="divide-y divide-muted-sand dark:divide-dark-muted-sand">
                {SETTINGS_LINKS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex justify-between items-center py-5 px-4 -mx-4 group hover:bg-muted-sand/50 dark:hover:bg-dark-muted-sand/50 transition-all rounded"
                  >
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-on-surface-variant dark:text-dark-on-surface-variant mb-1">
                        {item.eyebrow}
                      </p>
                      <h4 className="font-medium text-base mb-0.5">{item.title}</h4>
                      <p className="text-sm text-on-surface-variant dark:text-dark-on-surface-variant">
                        {item.description}
                      </p>
                    </div>
                    <span
                      className="material-symbols-outlined text-outline group-hover:text-ink-charcoal dark:group-hover:text-surface-cream transition-colors shrink-0 ml-4"
                      aria-hidden="true"
                    >
                      chevron_right
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Email & Alerts */}
            <div>
              <h2 className="font-serif text-3xl font-medium mb-8 border-b border-muted-sand dark:border-dark-muted-sand pb-4">
                Email &amp; Alerts
              </h2>
              <fieldset className="space-y-6 border-0 p-0 m-0">
                <legend className="sr-only">Email notification preferences</legend>

                <div className="flex items-center justify-between gap-6">
                  <label className="flex flex-col gap-0.5 cursor-pointer" htmlFor="promo-emails">
                    <span className="font-medium text-base">Promotional Emails</span>
                    <span className="text-sm text-on-surface-variant dark:text-dark-on-surface-variant">
                      Rare collections, heritage stories, and private events.
                    </span>
                  </label>
                  <input
                    type="checkbox"
                    id="promo-emails"
                    checked={promoEmails}
                    onChange={(e) => setPromoEmails(e.target.checked)}
                    className="w-5 h-5 border-ink-charcoal text-ink-charcoal focus:ring-burnished-gold rounded cursor-pointer shrink-0"
                  />
                </div>

                <div className="flex items-center justify-between gap-6">
                  <label className="flex flex-col gap-0.5" htmlFor="order-notifs">
                    <span className="font-medium text-base">Order Notifications</span>
                    <span className="text-sm text-on-surface-variant dark:text-dark-on-surface-variant">
                      Transaction receipts and real-time shipping updates. Always on.
                    </span>
                  </label>
                  <input
                    type="checkbox"
                    id="order-notifs"
                    checked
                    disabled
                    aria-describedby="order-notifs-hint"
                    className="w-5 h-5 opacity-50 cursor-not-allowed rounded shrink-0"
                  />
                  <span id="order-notifs-hint" className="sr-only">
                    This preference is required and cannot be disabled.
                  </span>
                </div>

                <div className="flex items-center justify-between gap-6">
                  <label className="flex flex-col gap-0.5 cursor-pointer" htmlFor="msg-center">
                    <span className="font-medium text-base">Message Centre</span>
                    <span className="text-sm text-on-surface-variant dark:text-dark-on-surface-variant">
                      Direct messages from your concierge and design consultants.
                    </span>
                  </label>
                  <input
                    type="checkbox"
                    id="msg-center"
                    checked={msgCenter}
                    onChange={(e) => setMsgCenter(e.target.checked)}
                    className="w-5 h-5 border-ink-charcoal text-ink-charcoal focus:ring-burnished-gold rounded cursor-pointer shrink-0"
                  />
                </div>
              </fieldset>
            </div>
          </div>

          {/* Right: Exclusives panel */}
          <aside
            aria-label="Siphora exclusives and tier status"
            className="lg:col-span-4"
          >
            <div className="bg-muted-sand dark:bg-dark-surface-container p-10 h-full">
              <h3 className="font-serif text-2xl font-medium mb-8">Siphora Exclusives</h3>

              <div className="space-y-10">
                <Link href="/account/corporate-gifting" className="group block cursor-pointer">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-burnished-gold mb-2">
                    B2B Services
                  </p>
                  <h4 className="font-semibold text-base mb-2">Corporate Gifting History</h4>
                  <p className="text-sm text-on-surface-variant dark:text-dark-on-surface-variant mb-4 leading-relaxed">
                    Review large-scale bespoke commissions and artisanal gifts for your firm.
                  </p>
                  <div className="animate-underline" />
                </Link>

                <Link href="/account/gift-cards" className="group block cursor-pointer">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-burnished-gold mb-2">
                    Currency
                  </p>
                  <h4 className="font-semibold text-base mb-2">Redeem Gift Cards</h4>
                  <p className="text-sm text-on-surface-variant dark:text-dark-on-surface-variant mb-4 leading-relaxed">
                    Apply luxury credit or archival gift vouchers to your account balance.
                  </p>
                  <div className="animate-underline" />
                </Link>

                <div className="pt-8 border-t border-ink-charcoal/10 dark:border-surface-cream/10">
                  <div className="flex items-center gap-4 p-4 border border-ink-charcoal/10 dark:border-surface-cream/10 bg-white/60 dark:bg-black/20">
                    <span
                      className="material-symbols-outlined text-burnished-gold"
                      style={{ fontVariationSettings: "'FILL' 1", fontSize: "24px" }}
                      aria-hidden="true"
                    >
                      stars
                    </span>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-widest mb-0.5">
                        Tier Status
                      </p>
                      <p className="font-serif text-xl font-medium">{user.tier}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </section>

        {/* Aesthetic image break */}
        <section
          aria-label="Siphora porcelain artistry"
          className="mb-24 overflow-hidden h-80 md:h-96 relative"
        >
          <Image
            src="/images/our-story/porcelain-table-setting.webp"
            alt="Close-up of white porcelain tableware with delicate gold filigree details on a warm cream surface"
            fill
            sizes="100vw"
            className="object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-1000"
            priority={false}
          />
          <div
            className="absolute inset-0 flex items-center justify-center bg-black/20"
            aria-hidden="true"
          >
            <p className="font-serif text-white text-3xl md:text-5xl tracking-[0.3em] uppercase opacity-75 select-none">
              The Art of Living
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-muted-sand dark:bg-dark-surface-container w-full py-20" aria-label="Site footer">
        <div className="grid grid-cols-12 gap-6 px-site-x-sm md:px-site-x max-w-site mx-auto">
          <div className="col-span-12 lg:col-span-4 mb-10 lg:mb-0">
            <Link
              href="/"
              aria-label="Siphora HQ — home"
              className="font-serif text-2xl font-medium italic block mb-6"
            >
              Siphora HQ
            </Link>
            <p className="text-on-surface-variant dark:text-dark-on-surface-variant text-sm leading-relaxed max-w-xs mb-8">
              Crafting legacy through porcelain since 2021. Every piece tells a story of
              heritage and modern refinement.
            </p>
            <div className="flex gap-5" aria-label="Social media links">
              <a
                href="https://www.instagram.com/siphorahq"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Siphora HQ on Instagram"
                className=" hover:text-burnished-gold transition-colors"
              ><Globe className="w-5 h-5" /></a>
              <a
                href="https://wa.me/919540027978"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with us on WhatsApp"
                className=" hover:text-burnished-gold transition-colors"
              ><MessageCircle className="w-5 h-5" /></a>
              <a
                href="mailto:hello@siphorahq.in"
                aria-label="Email us at hello@siphorahq.in"
                className=" hover:text-burnished-gold transition-colors"
              ><Mail className="w-5 h-5" /></a>
            </div>
          </div>

          <div className="col-span-6 lg:col-span-2 space-y-3">
            <p className="text-[10px] font-semibold uppercase tracking-widest mb-5">Discover</p>
            <Link href="/collections" className="block text-sm text-on-surface-variant dark:text-dark-on-surface-variant hover:text-ink-charcoal dark:hover:text-surface-cream transition-colors">
              Collections
            </Link>
            <Link href="/gift-sets" className="block text-sm text-on-surface-variant dark:text-dark-on-surface-variant hover:text-ink-charcoal dark:hover:text-surface-cream transition-colors">
              Gift Sets
            </Link>
            <Link href="/our-story" className="block text-sm text-on-surface-variant dark:text-dark-on-surface-variant hover:text-ink-charcoal dark:hover:text-surface-cream transition-colors">
              Our Story
            </Link>
            <Link href="/sustainability" className="block text-sm text-on-surface-variant dark:text-dark-on-surface-variant hover:text-ink-charcoal dark:hover:text-surface-cream transition-colors">
              Sustainability
            </Link>
          </div>

          <div className="col-span-6 lg:col-span-2 space-y-3">
            <p className="text-[10px] font-semibold uppercase tracking-widest mb-5">Customer Care</p>
            <Link href="/shipping" className="block text-sm text-on-surface-variant dark:text-dark-on-surface-variant hover:text-ink-charcoal dark:hover:text-surface-cream transition-colors">
              Shipping &amp; Returns
            </Link>
            <Link href="/track" className="block text-sm text-on-surface-variant dark:text-dark-on-surface-variant hover:text-ink-charcoal dark:hover:text-surface-cream transition-colors">
              Track My Order
            </Link>
            <Link href="/contact" className="block text-sm text-on-surface-variant dark:text-dark-on-surface-variant hover:text-ink-charcoal dark:hover:text-surface-cream transition-colors">
              Contact Us
            </Link>
            <Link href="/privacy" className="block text-sm text-on-surface-variant dark:text-dark-on-surface-variant hover:text-ink-charcoal dark:hover:text-surface-cream transition-colors">
              Privacy Policy
            </Link>
          </div>

          {/* Newsletter */}
          <div className="col-span-12 lg:col-span-4 mt-10 lg:mt-0">
            <p className="text-[10px] font-semibold uppercase tracking-widest mb-5">Newsletter</p>
            <p className="text-sm text-on-surface-variant dark:text-dark-on-surface-variant mb-6 leading-relaxed">
              Join the registry for private collection access and archival stories.
            </p>
            <form aria-label="Newsletter signup" noValidate onSubmit={handleNewsletterSubmit}>
              <div className="relative">
                <label htmlFor="footer-email" className="sr-only">
                  Your email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  required
                  placeholder="Your email address"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-0 border-b border-ink-charcoal dark:border-surface-cream py-4 px-0 focus:ring-0 focus:border-burnished-gold text-[11px] uppercase tracking-widest placeholder-on-surface-variant outline-none"
                />
                <button
                  type="submit"
                  disabled={newsletterState.status === "success"}
                  className="absolute right-0 bottom-4 text-[11px] font-semibold uppercase tracking-widest text-burnished-gold hover:text-ink-charcoal dark:hover:text-surface-cream transition-colors disabled:cursor-default"
                >
                  {newsletterState.status === "success" ? "Joined" : "Join"}
                </button>
              </div>
              {newsletterState.status === "success" && (
                <p role="status" aria-live="polite" className="text-xs mt-2 text-on-surface-variant dark:text-dark-on-surface-variant">
                  {newsletterState.message}
                </p>
              )}
              {newsletterState.status === "error" && (
                <p role="alert" className="text-xs mt-2 text-error">
                  {newsletterState.message}
                </p>
              )}
            </form>
          </div>

          {/* Bottom bar */}
          <div className="col-span-12 pt-16 border-t border-ink-charcoal/10 dark:border-surface-cream/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-[10px] text-on-surface-variant dark:text-dark-on-surface-variant uppercase tracking-widest">
              &copy; {new Date().getFullYear()} Siphora HQ. All rights reserved.
            </p>
            <div className="flex gap-8">
              <Link href="/terms" className="text-[10px] text-on-surface-variant dark:text-dark-on-surface-variant hover:text-ink-charcoal dark:hover:text-surface-cream uppercase tracking-widest transition-colors">
                Terms of Service
              </Link>
              <Link href="/accessibility" className="text-[10px] text-on-surface-variant dark:text-dark-on-surface-variant hover:text-ink-charcoal dark:hover:text-surface-cream uppercase tracking-widest transition-colors">
                Accessibility
              </Link>
              <Link href="/cookies" className="text-[10px] text-on-surface-variant dark:text-dark-on-surface-variant hover:text-ink-charcoal dark:hover:text-surface-cream uppercase tracking-widest transition-colors">
                Cookie Settings
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp floating button */}
      <a
        href="https://wa.me/919540027978?text=Hi%20Siphora%2C%20I%20need%20help."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Siphora HQ concierge on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-ink-charcoal dark:bg-burnished-gold text-white dark:text-ink-charcoal px-5 py-3 rounded-full text-sm font-semibold shadow-lg hover:bg-burnished-gold dark:hover:bg-surface-cream transition-colors"
      >
        <MessageCircle className="w-5 h-5" aria-hidden="true" />
        WhatsApp
      </a>
    </div>
  );
}

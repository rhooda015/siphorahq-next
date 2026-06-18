"use client";
import { CheckCircle2, Package, Receipt } from 'lucide-react';

import Image from "next/image";
import Link from "next/link";

export type OrderStatus =
  | "confirmed"
  | "packed"
  | "quality_check"
  | "in_transit"
  | "delivered";

const STATUS_ORDER: OrderStatus[] = [
  "confirmed",
  "packed",
  "quality_check",
  "in_transit",
  "delivered",
];

export interface TimelineStep {
  status: OrderStatus;
  title: string;
  icon: string;
  timestamp: string | null;
  description: string;
}

export interface RecommendedProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  href: string;
}

export interface OrderTrackingData {
  orderId: string;
  status: OrderStatus;
  estimatedDelivery: string;
  cartItemCount: number;
  product: {
    name: string;
    collection: string;
    image: string;
    imageAlt: string;
    craftsmanship: string;
    detailing: string;
    qualityNote: string;
  };
  timeline: TimelineStep[];
  courierTrackingHref: string;
  recommendations: RecommendedProduct[];
}

export interface OrderTrackingProps {
  data: OrderTrackingData;
}

const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const dateTimeFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

function formatDate(iso: string) {
  return dateFormatter.format(new Date(iso));
}

function formatDateTime(iso: string) {
  return dateTimeFormatter.format(new Date(iso)).replace(",", " ·");
}

export default function OrderTracking({ data }: OrderTrackingProps) {
  const currentStepIndex = STATUS_ORDER.indexOf(data.status);

  return (
    <div className="bg-surface-cream dark:bg-dark-surface text-ink-charcoal dark:text-surface-cream font-sans antialiased overflow-x-hidden min-h-[calc(100vh-100px)] transition-colors duration-300">
      <main id="main-content">
        {/* Order header */}
        <section className="max-w-site mx-auto px-5 md:px-16 pt-12 md:pt-20">
          <div className="flex flex-col md:flex-row justify-between gap-8 border-b border-muted-sand dark:border-dark-muted-sand pb-8">
            <div>
              <p className="text-xs uppercase tracking-widest font-semibold text-burnished-gold mb-3">
                Tracking your masterpiece
              </p>
              <h1 className="font-serif text-4xl md:text-5xl font-medium">Order #{data.orderId}</h1>
              <p className="mt-4 text-on-surface-variant dark:text-dark-on-surface-variant max-w-xl">
                {data.timeline[currentStepIndex]?.description ??
                  "We'll update this page as your order progresses."}
              </p>
            </div>

            <div className="md:text-right">
              <p className="text-xs uppercase tracking-widest font-semibold text-on-surface-variant dark:text-dark-on-surface-variant">
                Estimated arrival
              </p>
              <p className="font-serif text-3xl text-burnished-gold mt-1">
                {formatDate(data.estimatedDelivery)}
              </p>
            </div>
          </div>
        </section>

        {/* Product + Journey */}
        <section className="max-w-site mx-auto px-5 md:px-16 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Product details */}
          <aside className="lg:col-span-5 space-y-8">
            <div className="relative overflow-hidden bg-muted-sand dark:bg-dark-surface-container aspect-[4/5]">
              <Image
                src={data.product.image}
                alt={data.product.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div>
              <h2 className="font-serif text-3xl font-medium mb-2">{data.product.name}</h2>
              <p className="text-on-surface-variant dark:text-dark-on-surface-variant italic">
                From the {data.product.collection}
              </p>

              <div className="grid grid-cols-2 gap-6 border-t border-muted-sand dark:border-dark-muted-sand mt-8 pt-8">
                <div>
                  <p className="text-xs uppercase tracking-widest font-semibold text-burnished-gold">
                    Craftsmanship
                  </p>
                  <p className="mt-2 text-sm">{data.product.craftsmanship}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest font-semibold text-burnished-gold">
                    Detailing
                  </p>
                  <p className="mt-2 text-sm">{data.product.detailing}</p>
                </div>
              </div>

              <div className="mt-8 p-6 bg-muted-sand/60 dark:bg-dark-surface-container border-l-4 border-burnished-gold">
                <p className="italic text-sm leading-relaxed">{data.product.qualityNote}</p>
                <p className="text-xs uppercase tracking-widest font-semibold mt-4">
                  — Siphora HQ Quality Team
                </p>
              </div>
            </div>
          </aside>

          {/* Timeline + actions */}
          <section className="lg:col-span-7 space-y-10" aria-labelledby="journey-title">
            <div className="bg-white dark:bg-dark-surface-container p-6 md:p-10 shadow-[0_10px_40px_rgba(26,26,26,0.04)] dark:shadow-none">
              <h3
                id="journey-title"
                className="text-xs uppercase tracking-[0.2em] font-semibold text-on-surface-variant dark:text-dark-on-surface-variant mb-10"
              >
                Order journey
              </h3>

              <ol className="relative list-none">
                <div
                  className="absolute left-[23px] top-0 bottom-0 w-px bg-muted-sand dark:bg-dark-muted-sand"
                  aria-hidden="true"
                />

                {data.timeline.map((step, index) => {
                  const isComplete = index < currentStepIndex;
                  const isCurrent = index === currentStepIndex;
                  const isPending = index > currentStepIndex;

                  return (
                    <li key={step.status} className={`relative flex gap-6 ${index < data.timeline.length - 1 ? "pb-10" : ""}`}>
                      <div
                        className={[
                          "z-10 w-12 h-12 rounded-full flex items-center justify-center shrink-0",
                          isComplete && "bg-ink-charcoal dark:bg-surface-cream text-white dark:text-ink-charcoal",
                          isCurrent && "bg-burnished-gold text-white shadow-lg",
                          isPending && "border border-outline-variant dark:border-dark-muted-sand bg-white dark:bg-dark-surface text-outline dark:text-dark-on-surface-variant",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                      >
                        <span className="material-symbols-outlined" aria-hidden="true">
                          {isComplete ? "check" : step.icon}
                        </span>
                      </div>
                      <div>
                        <h4
                          className={[
                            "font-semibold uppercase tracking-wide",
                            isCurrent && "text-burnished-gold",
                            isPending && "text-outline dark:text-dark-on-surface-variant",
                          ]
                            .filter(Boolean)
                            .join(" ")}
                        >
                          {step.title}
                          {isCurrent && <span className="sr-only"> (current step)</span>}
                        </h4>
                        <p
                          className={[
                            "text-sm mt-1",
                            isPending
                              ? "text-outline dark:text-dark-on-surface-variant italic"
                              : "text-on-surface-variant dark:text-dark-on-surface-variant",
                          ].join(" ")}
                        >
                          {step.timestamp
                            ? formatDateTime(step.timestamp)
                            : isCurrent
                              ? "In progress"
                              : `Estimated ${formatDate(data.estimatedDelivery)}`}
                        </p>
                        {!isPending && (
                          <p className="text-sm mt-2 text-on-surface-variant dark:text-dark-on-surface-variant">
                            {step.description}
                          </p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                href={data.courierTrackingHref}
                className="group bg-ink-charcoal dark:bg-dark-surface-container text-white p-8 hover:scale-[1.02] transition-transform"
              >
                <span className="material-symbols-outlined text-burnished-gold text-4xl mb-6" aria-hidden="true">
                  map
                </span>
                <h4 className="font-serif text-3xl mb-3">Track courier</h4>
                <p className="text-white/70 text-sm mb-6">View courier movement and delivery partner details.</p>
                <span className="text-xs uppercase tracking-widest font-semibold border-b border-burnished-gold pb-1 group-hover:text-burnished-gold">
                  Launch tracking
                </span>
              </Link>

              <a
                href={`https://wa.me/919540027978?text=${encodeURIComponent(
                  `Hi Siphora HQ, I need help with order ${data.orderId}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-muted-sand dark:bg-dark-surface-container p-8 border border-transparent hover:border-burnished-gold transition-colors"
              >
                <span className="material-symbols-outlined text-ink-charcoal dark:text-surface-cream text-4xl mb-6" aria-hidden="true">
                  support_agent
                </span>
                <h4 className="font-serif text-3xl mb-3">Concierge</h4>
                <p className="text-on-surface-variant dark:text-dark-on-surface-variant text-sm mb-6">
                  Speak with our support team about this order.
                </p>
                <span className="text-xs uppercase tracking-widest font-semibold border-b border-ink-charcoal dark:border-surface-cream pb-1 group-hover:text-burnished-gold group-hover:border-burnished-gold">
                  Connect now
                </span>
              </a>
            </div>
          </section>
        </section>

        {/* Recommendations */}
        {data.recommendations.length > 0 && (
          <section className="bg-muted-sand/40 dark:bg-dark-surface-container py-16 md:py-24">
            <div className="max-w-site mx-auto px-5 md:px-16">
              <p className="text-xs uppercase tracking-widest font-semibold text-burnished-gold mb-4">
                Complete the collection
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-medium mb-12">Pairs exquisitely with</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {data.recommendations.map((product) => (
                  <article key={product.id} className="bg-white dark:bg-dark-surface p-6">
                    <div className="relative w-full aspect-square mb-6">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <h3 className="font-serif text-2xl">{product.name}</h3>
                    <p className="text-burnished-gold mt-2">{currencyFormatter.format(product.price)}</p>
                    <Link
                      href={product.href}
                      className="inline-block mt-5 text-xs uppercase tracking-widest font-semibold border-b border-ink-charcoal dark:border-surface-cream"
                    >
                      View product
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

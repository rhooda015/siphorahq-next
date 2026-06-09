import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop Porcelain Dinnerware, Tea Sets & Gifting | Siphorahq',
  description: 'Browse handcrafted porcelain tea sets, dinner sets, platters, coffee mugs and luxury gift hampers. Free shipping above ₹999. Pan-India delivery.',
  alternates: { canonical: '/products' },
  openGraph: {
    title: 'Shop Porcelain Dinnerware, Tea Sets & Gifting | Siphorahq',
    description: 'Browse handcrafted porcelain tea sets, dinner sets, platters, coffee mugs and luxury gift hampers.',
    url: 'https://siphorahq.in/products',
    siteName: 'Siphorahq',
    images: [{ url: 'https://siphorahq.in/og-banner.png' }],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

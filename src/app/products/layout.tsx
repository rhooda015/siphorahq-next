import { Metadata } from 'next';
import { BRAND } from '@/config/brand';

export const metadata: Metadata = {
  title: `Shop Porcelain Dinnerware, Tea Sets & Gifting | ${BRAND.name}`,
  description: 'Browse handcrafted porcelain tea sets, dinner sets, platters, coffee mugs and luxury gift hampers. Free shipping above ₹999. Pan-India delivery.',
  alternates: { canonical: `${BRAND.domain}/products` },
  openGraph: {
    title: `Shop Porcelain Dinnerware, Tea Sets & Gifting | ${BRAND.name}`,
    description: 'Browse handcrafted porcelain tea sets, dinner sets, platters, coffee mugs and luxury gift hampers.',
    url: `${BRAND.domain}/products`,
    siteName: BRAND.name,
    images: [{ url: `${BRAND.domain}/og-banner.png` }],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from 'next';
import { BRAND } from '@/config/brand';

export const metadata: Metadata = {
  title: `Track Your Order | ${BRAND.name}`,
  description: 'Track your Siphorahq shipment status, transit updates, and delivery timelines.',
  alternates: {
    canonical: `${BRAND.domain}/track-order`,
  }
};

export default function TrackOrderLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

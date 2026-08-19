import { Metadata } from 'next';
import { BRAND } from '@/config/brand';

export const metadata: Metadata = {
  title: `Sign In or Create Account | ${BRAND.name}`,
  description: `Access your Siphorahq account, track your luxury porcelain orders, manage addresses, and view your exclusive wishlist.`,
  alternates: {
    canonical: `${BRAND.domain}/login`,
  }
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

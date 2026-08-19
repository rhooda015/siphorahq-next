import { Metadata } from 'next';
import { faqMetadata } from '@/lib/metadata';

export const metadata: Metadata = faqMetadata;

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

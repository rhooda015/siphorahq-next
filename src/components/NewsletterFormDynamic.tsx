"use client";

import dynamic from 'next/dynamic';

const NewsletterForm = dynamic(() => import('@/components/NewsletterForm'), { ssr: false });

export default function NewsletterFormDynamic() {
  return <NewsletterForm />;
}

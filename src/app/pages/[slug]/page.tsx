import React from 'react';
import { notFound } from 'next/navigation';
import dbConnect from '@/lib/db';
import Page from '@/models/Page';
import { Metadata } from 'next';
import { BRAND } from '@/config/brand';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  await dbConnect();
  const page = await Page.findOne({ slug: resolvedParams.slug, isPublished: true }).lean();
  
  if (!page) {
    return { title: 'Page Not Found' };
  }

  return {
    title: page.seoTitle || `${page.title} - ${BRAND.name}`,
    description: page.seoDescription,
  };
}

export default async function CMSPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  await dbConnect();
  const page = await Page.findOne({ slug: resolvedParams.slug, isPublished: true }).lean();

  if (!page) {
    notFound();
  }

  return (
    <div className="bg-[var(--color-bg)] min-h-screen pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <h1 className="font-serif text-4xl md:text-5xl text-[var(--color-primary)] mb-8 text-center">
          {page.title}
        </h1>
        <div 
          className="prose prose-zinc max-w-none text-[var(--color-text-muted)] prose-headings:font-serif prose-headings:text-[var(--color-primary)] prose-a:text-[var(--color-primary)] prose-a:underline-offset-4 hover:prose-a:text-black"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </div>
    </div>
  );
}

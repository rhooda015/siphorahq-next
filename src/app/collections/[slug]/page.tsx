import React from 'react';
import { notFound } from 'next/navigation';
import { collectionsData } from '@/data/collections';
import { STATIC_PRODUCTS } from '@/data/products';
import { BRAND } from '@/config/brand';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import WhySiphorahq from '@/components/WhySiphorahq';

export function generateStaticParams() {
  return Object.keys(collectionsData).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const collection = collectionsData[params.slug];
  if (!collection) return { title: 'Collection Not Found' };

  return {
    title: collection.metaTitle,
    description: collection.metaDescription,
    alternates: {
      canonical: `${BRAND.domain}/collections/${params.slug}`,
    },
    openGraph: {
      title: collection.metaTitle,
      description: collection.metaDescription,
      url: `${BRAND.domain}/collections/${params.slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: collection.metaTitle,
      description: collection.metaDescription,
    },
  };
}

export default async function CollectionPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const collection = collectionsData[params.slug];
  
  if (!collection) {
    notFound();
  }

  const products = STATIC_PRODUCTS.filter((p) => p.category === collection.categoryMatch);

  // Parse markdown-like content simply
  const parseContent = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (!line.trim()) return <br key={i} />;
      
      // Handle H2 (**)
      if (line.startsWith('**') && line.endsWith('**')) {
        return <h2 key={i} className="font-headline-md text-2xl mt-8 mb-4">{line.replace(/\*\*/g, '')}</h2>;
      }

      // Handle bold text and links within line
      const parts = line.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
      
      return (
        <p key={i} className="mb-4 text-on-surface-variant leading-relaxed">
          {parts.map((part, j) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={j} className="font-medium text-ink-charcoal">{part.replace(/\*\*/g, '')}</strong>;
            }
            if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
              const textMatch = part.match(/\[(.*?)\]/);
              const urlMatch = part.match(/\((.*?)\)/);
              if (textMatch && urlMatch) {
                return <Link key={j} href={urlMatch[1]} className="underline text-ink-charcoal hover:text-champagne-gold transition-colors">{textMatch[1]}</Link>;
              }
            }
            return <React.Fragment key={j}>{part}</React.Fragment>;
          })}
        </p>
      );
    });
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: collection.name,
    description: collection.metaDescription,
    url: `${BRAND.domain}/collections/${params.slug}`
  };

  const breadcrumbListSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BRAND.domain },
      { '@type': 'ListItem', position: 2, name: 'Collections', item: `${BRAND.domain}/collections` },
      { '@type': 'ListItem', position: 3, name: collection.name, item: `${BRAND.domain}/collections/${params.slug}` }
    ]
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: products.map((product: any, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.name,
        url: `${BRAND.domain}/products/${product.id || product.slug}`,
        image: product.image
      }
    }))
  };

  const faqSchema = collection.faqs?.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: collection.faqs.map((faq: any) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  } : null;

  return (
    <>
    <div className="bg-surface-cream min-h-screen pt-24 pb-20 px-4 md:px-margin-desktop">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      {/* Breadcrumb Visual */}
      <nav className="text-sm mb-8 text-on-surface-variant flex items-center gap-2">
        <Link href="/" className="hover:text-ink-charcoal transition-colors">Home</Link>
        <span>/</span>
        <Link href="/collections" className="hover:text-ink-charcoal transition-colors">Collections</Link>
        <span>/</span>
        <span className="text-ink-charcoal">{collection.name}</span>
      </nav>

      <div className="max-w-7xl mx-auto flex flex-col gap-12 lg:gap-16">
        
        {/* Collection Hero */}
        <div className="w-full max-w-4xl">
          <h1 className="font-headline-md text-4xl md:text-5xl lg:text-6xl mb-8 text-ink-charcoal">{collection.name}</h1>
          <div className="prose prose-stone max-w-none font-body-md text-on-surface-variant leading-relaxed">
            {parseContent(collection.content.split('\n\n').slice(0, 2).join('\n\n'))}
          </div>
        </div>

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* Left Column: Products Grid */}
          <div className="w-full lg:w-2/3">
          
          {products.length === 0 ? (
            <p className="text-on-surface-variant">No products found in this collection.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 gap-y-12">
              {products.map((product: any) => (
                <ProductCard key={product.id || product.slug} product={product} />
              ))}
            </div>
          )}
        </div>

        {/* Right Column: SEO Content & FAQs */}
        <div className="w-full lg:w-1/3 h-fit lg:sticky lg:top-24">
          <div className="bg-[#Fdfbf9] p-8 border border-[#E8E1D3] rounded-sm">
            <h3 className="font-serif text-2xl text-ink-charcoal mb-6">About this Collection</h3>
            <div className="prose prose-sm prose-stone text-on-surface-variant">
              {parseContent(collection.content.split('\n\n').slice(2).join('\n\n'))}
            </div>
          </div>
          
          {collection.faqs && collection.faqs.length > 0 && (
            <div className="mt-12 pt-8 border-t border-neutral-100">
              <h3 className="font-headline-sm text-2xl mb-6">Frequently Asked Questions</h3>
              <div className="space-y-6">
                {collection.faqs.map((faq: any, i: number) => (
                  <div key={i}>
                    <h4 className="font-medium text-ink-charcoal mb-2">{faq.question}</h4>
                    <p className="text-sm text-on-surface-variant leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
    </div>
    <WhySiphorahq />
    </>
  );
}

import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminRequest } from '@/lib/adminAuth';
import dbConnect from '@/lib/db';
import StudioProject from '@/models/StudioProject';
import GeneratedAsset from '@/models/GeneratedAsset';
import OpenAI from 'openai';
import mongoose from 'mongoose';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  const authError = await verifyAdminRequest(req);
  if (authError) return authError.error;

  await dbConnect();

  try {
    const body = await req.json();
    const { projectId, productName, productUrl } = body;

    if (!projectId || !mongoose.Types.ObjectId.isValid(projectId)) {
      return NextResponse.json({ error: 'Valid projectId is required' }, { status: 400 });
    }

    const project = await StudioProject.findById(projectId);
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const productDesc = [
      project.productType,
      project.productAttributes?.material,
      project.productAttributes?.style,
      ...(project.productAttributes?.features || []),
    ]
      .filter(Boolean)
      .join(', ');

    const name = productName || project.name || 'Premium Ceramic Product';
    const slug = (productUrl || name)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const prompt = `You are an SEO expert specializing in luxury e-commerce for Siphorahq — a premium Indian ceramics brand.

Product: ${name}
Details: ${productDesc}
Brand: Siphorahq
Website: siphorahq.in
Slug: ${slug}

Generate a complete technical SEO package. Return ONLY valid JSON:
{
  "seoTitle": "SEO-optimized title tag (max 60 chars, include primary keyword + brand)",
  "metaDescription": "Compelling meta description (max 155 chars, include CTA, USP)",
  "urlSlug": "${slug}",
  "canonicalUrl": "https://siphorahq.in/products/${slug}",
  "primaryKeyword": "main target keyword",
  "secondaryKeywords": ["keyword 2", "keyword 3", "keyword 4"],
  "openGraph": {
    "og:title": "OG title",
    "og:description": "OG description (max 200 chars)",
    "og:type": "product",
    "og:url": "https://siphorahq.in/products/${slug}",
    "og:site_name": "Siphorahq",
    "og:locale": "en_IN"
  },
  "twitterCard": {
    "twitter:card": "summary_large_image",
    "twitter:title": "Twitter title",
    "twitter:description": "Twitter description",
    "twitter:site": "@siphorahq"
  },
  "productSchema": {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "${name}",
    "brand": {"@type": "Brand", "name": "Siphorahq"},
    "description": "Product schema description",
    "sku": "SKU-placeholder",
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "seller": {"@type": "Organization", "name": "Siphorahq"}
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "47"
    }
  },
  "faqSchema": {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "FAQ question 1",
        "acceptedAnswer": {"@type": "Answer", "text": "Answer 1"}
      },
      {
        "@type": "Question",
        "name": "FAQ question 2",
        "acceptedAnswer": {"@type": "Answer", "text": "Answer 2"}
      }
    ]
  },
  "breadcrumbSchema": {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://siphorahq.in"},
      {"@type": "ListItem", "position": 2, "name": "Products", "item": "https://siphorahq.in/products"},
      {"@type": "ListItem", "position": 3, "name": "${name}", "item": "https://siphorahq.in/products/${slug}"}
    ]
  },
  "focusKeyphrase": "primary focus keyphrase for Yoast/Rank Math",
  "keywordDensityNote": "Recommended keyword density guidance",
  "internalLinkingSuggestions": ["Link to collections page", "Link to brand story"],
  "seoScore": 88,
  "seoNotes": ["SEO improvement note 1", "SEO improvement note 2"]
}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 3000,
      temperature: 0.4,
      response_format: { type: 'json_object' },
    });

    const rawContent = completion.choices[0].message.content || '{}';
    const result = JSON.parse(rawContent);

    await GeneratedAsset.create({
      projectId,
      moduleId: 'seo',
      type: 'json',
      label: 'SEO Package',
      content: rawContent,
      metadata: { productName: name, slug: result.urlSlug, seoScore: result.seoScore },
      format: 'json',
    });

    await StudioProject.findByIdAndUpdate(projectId, {
      $inc: { assetCount: 1 },
      lastGeneratedModule: 'seo',
    });

    return NextResponse.json({ success: true, ...result });
  } catch (err) {
    console.error('[Studio] SEO error:', err);
    return NextResponse.json({ error: 'SEO generation failed' }, { status: 500 });
  }
}

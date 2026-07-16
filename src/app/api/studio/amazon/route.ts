import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminRequest } from '@/lib/adminAuth';
import dbConnect from '@/lib/db';
import StudioProject from '@/models/StudioProject';
import GeneratedAsset from '@/models/GeneratedAsset';
import OpenAI from 'openai';
import mongoose from 'mongoose';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || 'dummy_key' });

export async function POST(req: NextRequest) {
  const authError = await verifyAdminRequest(req);
  if (authError) return authError.error;

  await dbConnect();

  try {
    const body = await req.json();
    const { projectId, productName, price, category } = body;

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
    const priceStr = price ? `₹${price}` : 'Premium pricing (₹1,500–₹5,000 range)';
    const cat = category || 'Home & Kitchen > Tableware > Tea Sets & Mugs';

    const prompt = `You are an Amazon India marketplace expert for Siphorahq — a premium ceramics brand.

Product: ${name}
Details: ${productDesc}
Price: ${priceStr}
Category: ${cat}
Brand: Siphorahq
Marketplace: Amazon.in

Generate a complete, Amazon policy-compliant listing optimized for ranking and conversion.
Return ONLY valid JSON:
{
  "title": "Amazon-optimized title (max 200 chars, include brand, product type, key features, material)",
  "bullets": [
    "PREMIUM QUALITY: First bullet point — lead with main benefit, all caps keyword, then detail",
    "AUTHENTIC CERAMIC: Second bullet point",
    "PERFECT GIFT: Third bullet point",
    "EASY CARE: Fourth bullet point",
    "SIPHORAHQ GUARANTEE: Fifth bullet point"
  ],
  "description": "Full Amazon product description with HTML formatting (use <b> tags), 2000+ characters, persuasive",
  "aPlusContent": {
    "headline": "A+ content main headline",
    "modules": [
      {"type": "brand_story", "content": "Brand story paragraph"},
      {"type": "feature_image", "headline": "Feature headline", "body": "Feature description"},
      {"type": "comparison", "headline": "Why Siphorahq?", "points": ["Point 1", "Point 2", "Point 3"]}
    ]
  },
  "backendKeywords": "space-separated backend search terms, max 250 bytes, no brand names, no duplicates",
  "primaryKeywords": ["keyword 1", "keyword 2", "keyword 3", "keyword 4", "keyword 5"],
  "suggestedCategory": "Amazon category path",
  "targetAudience": ["audience segment 1", "audience segment 2"],
  "listingQualityScore": 85,
  "listingQualityNotes": ["Improvement suggestion 1", "Improvement suggestion 2"],
  "pricingRecommendation": {
    "suggestedMRP": "${priceStr}",
    "competitiveRange": "Range analysis",
    "strategy": "Premium positioning strategy"
  },
  "imageSequence": [
    "Image 1: Main product on white background",
    "Image 2: Lifestyle shot in luxury setting",
    "Image 3: Feature infographic",
    "Image 4: Dimension chart",
    "Image 5: Package contents",
    "Image 6: Care instructions",
    "Image 7: Comparison chart"
  ],
  "competitorInsights": "Brief competitor analysis for this category"
}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 3500,
      temperature: 0.6,
      response_format: { type: 'json_object' },
    });

    const rawContent = completion.choices[0].message.content || '{}';
    const result = JSON.parse(rawContent);

    await GeneratedAsset.create({
      projectId,
      moduleId: 'amazon',
      type: 'json',
      label: 'Amazon Listing Package',
      content: rawContent,
      metadata: { productName: name, price: priceStr, listingQualityScore: result.listingQualityScore },
      format: 'json',
    });

    await StudioProject.findByIdAndUpdate(projectId, {
      $inc: { assetCount: 1 },
      lastGeneratedModule: 'amazon',
    });

    return NextResponse.json({ success: true, ...result });
  } catch (err) {
    console.error('[Studio] Amazon listing error:', err);
    return NextResponse.json({ error: 'Amazon listing generation failed' }, { status: 500 });
  }
}

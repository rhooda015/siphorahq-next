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
    const { projectId, productName, price } = body;

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
    const priceStr = price ? `₹${price}` : 'Premium pricing';

    const prompt = `You are a Flipkart India marketplace expert for Siphorahq — a premium ceramics brand.

Product: ${name}
Details: ${productDesc}
Price: ${priceStr}
Brand: Siphorahq
Marketplace: Flipkart.com

Generate a complete, Flipkart-optimized product listing.
Return ONLY valid JSON:
{
  "title": "Flipkart product title (max 100 chars, include brand + product type + key attribute)",
  "highlights": [
    "Highlight 1 — key selling point",
    "Highlight 2 — material/quality",
    "Highlight 3 — gifting value",
    "Highlight 4 — care/warranty",
    "Highlight 5 — Siphorahq brand promise"
  ],
  "description": "Flipkart product description, 500-1000 words, formatted with line breaks",
  "specifications": {
    "Brand": "Siphorahq",
    "Material": "value",
    "Colour": "value",
    "Pattern": "value",
    "Capacity (in ml)": "value",
    "Type": "value",
    "Ideal For": "value",
    "Occasion": "value",
    "In The Box": "value",
    "Country of Origin": "India"
  },
  "primaryKeywords": ["keyword 1", "keyword 2", "keyword 3", "keyword 4"],
  "categoryPath": "Home & Kitchen > Tableware > ...",
  "trustBadges": ["Premium Quality", "Gift Ready", "Food Safe", "Easy Returns", "Secure Packaging"],
  "imageOrder": [
    "Image 1: Main product on white",
    "Image 2: Lifestyle shot",
    "Image 3: Feature callouts",
    "Image 4: Size chart",
    "Image 5: Package contents"
  ],
  "pricingRecommendation": {
    "suggestedMRP": "${priceStr}",
    "sellingPrice": "Selling price with slight discount",
    "strategy": "Pricing strategy note"
  },
  "searchabilityScore": 80,
  "optimizationTips": ["Tip 1", "Tip 2", "Tip 3"]
}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 2500,
      temperature: 0.6,
      response_format: { type: 'json_object' },
    });

    const rawContent = completion.choices[0].message.content || '{}';
    const result = JSON.parse(rawContent);

    await GeneratedAsset.create({
      projectId,
      moduleId: 'flipkart',
      type: 'json',
      label: 'Flipkart Listing Package',
      content: rawContent,
      metadata: { productName: name, price: priceStr },
      format: 'json',
    });

    await StudioProject.findByIdAndUpdate(projectId, {
      $inc: { assetCount: 1 },
      lastGeneratedModule: 'flipkart',
    });

    return NextResponse.json({ success: true, ...result });
  } catch (err) {
    console.error('[Studio] Flipkart listing error:', err);
    return NextResponse.json({ error: 'Flipkart listing generation failed' }, { status: 500 });
  }
}

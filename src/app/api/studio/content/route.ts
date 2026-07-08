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
    const { projectId, productName } = body;

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

    const name = productName || project.name || project.productType || 'Premium Ceramic Product';

    const prompt = `You are a luxury copywriter and product expert for Siphorahq — a premium Indian ceramics brand.

Product Name: ${name}
Product Details: ${productDesc || 'Premium ceramic tableware'}
Brand: Siphorahq
Industry: Fine Ceramic, Porcelain, Luxury Tableware

Generate complete professional product content. Return ONLY valid JSON:
{
  "title": "Full product title (max 120 chars)",
  "subtitle": "Elegant subtitle",
  "shortDescription": "2-3 sentence premium product description",
  "longDescription": "5-7 paragraph detailed product story with brand heritage, craftsmanship, and luxury appeal",
  "productStory": "Brand narrative paragraph connecting product to Siphorahq heritage",
  "features": [
    "Feature 1 with benefit",
    "Feature 2 with benefit",
    "Feature 3 with benefit",
    "Feature 4 with benefit",
    "Feature 5 with benefit",
    "Feature 6 with benefit"
  ],
  "specifications": {
    "Material": "value",
    "Finish": "value",
    "Capacity": "value",
    "Dimensions": "value",
    "Weight": "value",
    "Color": "value",
    "Pattern": "value",
    "Care": "value"
  },
  "highlights": ["Highlight 1", "Highlight 2", "Highlight 3", "Highlight 4"],
  "careInstructions": ["Care instruction 1", "Care instruction 2", "Care instruction 3", "Care instruction 4"],
  "shippingInfo": "Shipping information paragraph",
  "warranty": "Warranty information",
  "returnPolicy": "Return policy statement",
  "packageContents": ["Item 1", "Item 2"],
  "faqs": [
    {"question": "FAQ question 1", "answer": "Detailed answer"},
    {"question": "FAQ question 2", "answer": "Detailed answer"},
    {"question": "FAQ question 3", "answer": "Detailed answer"},
    {"question": "FAQ question 4", "answer": "Detailed answer"},
    {"question": "FAQ question 5", "answer": "Detailed answer"},
    {"question": "FAQ question 6", "answer": "Detailed answer"},
    {"question": "FAQ question 7", "answer": "Detailed answer"},
    {"question": "FAQ question 8", "answer": "Detailed answer"},
    {"question": "FAQ question 9", "answer": "Detailed answer"},
    {"question": "FAQ question 10", "answer": "Detailed answer"}
  ],
  "buyingGuide": "Comprehensive buying guide paragraph",
  "giftingMessage": "Premium gifting occasion description"
}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 3000,
      temperature: 0.7,
      response_format: { type: 'json_object' },
    });

    const rawContent = completion.choices[0].message.content || '{}';
    const result = JSON.parse(rawContent);

    await GeneratedAsset.create({
      projectId,
      moduleId: 'content',
      type: 'json',
      label: 'Product Content Package',
      content: rawContent,
      metadata: { productName: name },
      format: 'json',
    });

    await StudioProject.findByIdAndUpdate(projectId, {
      $inc: { assetCount: 1 },
      lastGeneratedModule: 'content',
    });

    return NextResponse.json({ success: true, ...result });
  } catch (err) {
    console.error('[Studio] Content error:', err);
    return NextResponse.json({ error: 'Content generation failed' }, { status: 500 });
  }
}

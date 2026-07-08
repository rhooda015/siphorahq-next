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
    const { projectId } = body;

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
      ...(project.productAttributes?.colors || []),
    ]
      .filter(Boolean)
      .join(', ');

    const prompt = `You are a luxury product naming expert for Siphorahq — a premium Indian ceramics and tableware brand.

Product: ${productDesc || project.productType || 'Premium Ceramic Product'}
Brand: Siphorahq
Industry: Fine Ceramic, Porcelain, Luxury Tableware, Tea Sets, Coffee Mugs, Dinnerware
Target: Premium Indian consumers, luxury gifting, weddings, hotels, restaurants, lifestyle

Generate exactly 30 unique, professional product names organized across these 10 categories (3 per category):

1. LUXURY (ultra-premium, elite positioning)
2. ROYAL (Mughal-inspired, heritage, regal)
3. FLORAL (nature-inspired, garden, blooms)
4. SCANDINAVIAN (minimalist, Nordic, clean)
5. CONTEMPORARY (modern, urban, chic)
6. HERITAGE (traditional Indian craft, artisan)
7. SEO_OPTIMIZED (includes key search terms naturally)
8. INSTAGRAM_FRIENDLY (catchy, shareable, lifestyle)
9. GIFT_COLLECTION (perfect for gifting occasions)
10. EXPORT_PREMIUM (international market appeal)

Return ONLY valid JSON in this exact format:
{
  "names": [
    {
      "id": 1,
      "name": "Product Name",
      "category": "LUXURY",
      "tagline": "Short luxury tagline",
      "keywords": ["keyword1", "keyword2"],
      "useCase": "Best for: luxury e-commerce listing"
    }
  ],
  "recommended": "Most recommended name",
  "seoTitle": "Full SEO-optimized product title"
}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 2500,
      temperature: 0.8,
      response_format: { type: 'json_object' },
    });

    const rawContent = completion.choices[0].message.content || '{}';
    const result = JSON.parse(rawContent);

    // Save asset
    await GeneratedAsset.create({
      projectId,
      moduleId: 'naming',
      type: 'json',
      label: 'Product Names (30)',
      content: rawContent,
      metadata: { count: result.names?.length || 0, recommended: result.recommended },
      format: 'json',
    });

    await StudioProject.findByIdAndUpdate(projectId, {
      $inc: { assetCount: 1 },
      lastGeneratedModule: 'naming',
    });

    return NextResponse.json({ success: true, ...result });
  } catch (err) {
    console.error('[Studio] Naming error:', err);
    return NextResponse.json({ error: 'Name generation failed' }, { status: 500 });
  }
}

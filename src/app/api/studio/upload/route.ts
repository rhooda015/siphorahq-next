import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminRequest } from '@/lib/adminAuth';
import dbConnect from '@/lib/db';
import StudioProject from '@/models/StudioProject';
import GeneratedAsset from '@/models/GeneratedAsset';
import OpenAI from 'openai';
import sharp from 'sharp';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SIPHORAHQ_CONTEXT = `
You are analyzing a product image for Siphorahq — a premium Indian brand specializing in:
Fine Ceramic, Porcelain, Tea Sets, Coffee Mugs, Dinnerware, Luxury Tableware, and Gift Collections.
Target audience: Premium Indian consumers, luxury gifting buyers, wedding gifting, hotels, restaurants, and lifestyle shoppers.
`;

export async function POST(req: NextRequest) {
  const authError = await verifyAdminRequest(req);
  if (authError) return authError.error;

  await dbConnect();

  try {
    const formData = await req.formData();
    const file = formData.get('image') as File | null;
    const projectName = (formData.get('projectName') as string) || 'Untitled Product';
    const description = (formData.get('description') as string) || '';

    if (!file) {
      return NextResponse.json({ error: 'No image file provided' }, { status: 400 });
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Use JPEG, PNG, or WebP.' }, { status: 400 });
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large. Maximum 10MB.' }, { status: 400 });
    }

    // Convert to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Process with Sharp: optimize for web + analysis
    const processedBuffer = await sharp(buffer)
      .resize(1024, 1024, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 90, progressive: true })
      .toBuffer();

    const base64Image = `data:image/jpeg;base64,${processedBuffer.toString('base64')}`;

    // Analyze with GPT-4o Vision
    const visionResponse = await openai.chat.completions.create({
      model: 'gpt-4o',
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `${SIPHORAHQ_CONTEXT}

Analyze this product image and return a JSON object with these exact fields:
{
  "productType": "specific product type (e.g., Tea Cup, Coffee Mug, Dinner Plate, Tea Set)",
  "colors": ["array of dominant colors"],
  "shape": "shape description",
  "material": "detected material (ceramic, porcelain, bone china, etc.)",
  "estimatedDimensions": "estimated size if visible",
  "features": ["key visual features like gold rim, floral pattern, etc."],
  "style": "design style (Mughal, Floral, Minimalist, etc.)",
  "luxuryScore": <number 1-10>,
  "giftability": <number 1-10>,
  "suggestedName": "a premium product name",
  "marketplaces": ["Amazon", "Flipkart"],
  "confidence": <number 0-1>
}

Return ONLY valid JSON, no explanation.`,
            },
            {
              type: 'image_url',
              image_url: {
                url: base64Image,
                detail: 'high',
              },
            },
          ],
        },
      ],
    });

    let productAttributes = {
      colors: [] as string[],
      shape: 'Round',
      material: 'Ceramic',
      estimatedDimensions: 'Standard size',
      features: [] as string[],
      style: 'Premium',
    };
    let productType = 'Ceramic Product';
    let analysisMetadata: Record<string, unknown> = {};

    try {
      const rawContent = visionResponse.choices[0].message.content || '{}';
      const cleaned = rawContent.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const parsed = JSON.parse(cleaned);

      productType = parsed.productType || 'Ceramic Product';
      productAttributes = {
        colors: parsed.colors || [],
        shape: parsed.shape || 'Round',
        material: parsed.material || 'Ceramic',
        estimatedDimensions: parsed.estimatedDimensions || 'Standard',
        features: parsed.features || [],
        style: parsed.style || 'Premium',
      };
      analysisMetadata = {
        luxuryScore: parsed.luxuryScore,
        giftability: parsed.giftability,
        suggestedName: parsed.suggestedName,
        marketplaces: parsed.marketplaces,
        confidence: parsed.confidence,
      };
    } catch {
      // If parsing fails, use defaults
    }

    // Create project in MongoDB
    const project = await StudioProject.create({
      name: projectName,
      description,
      originalImage: base64Image,
      originalImageMimeType: 'image/jpeg',
      productType,
      productAttributes,
      status: 'draft',
      createdBy: 'admin',
    });

    // Save upload asset record
    await GeneratedAsset.create({
      projectId: project._id,
      moduleId: 'upload',
      type: 'json',
      label: 'Product Analysis',
      content: JSON.stringify({ productType, productAttributes, analysisMetadata }),
      metadata: analysisMetadata,
      format: 'json',
    });

    return NextResponse.json({
      success: true,
      projectId: project._id.toString(),
      project: {
        _id: project._id.toString(),
        name: project.name,
        productType,
        productAttributes,
        analysisMetadata,
        originalImage: base64Image,
        status: project.status,
        createdAt: project.createdAt,
      },
    });
  } catch (err) {
    console.error('[Studio] Upload error:', err);
    return NextResponse.json({ error: 'Upload processing failed' }, { status: 500 });
  }
}

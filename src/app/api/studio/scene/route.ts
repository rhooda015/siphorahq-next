import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminRequest } from '@/lib/adminAuth';
import dbConnect from '@/lib/db';
import StudioProject from '@/models/StudioProject';
import GeneratedAsset from '@/models/GeneratedAsset';
import OpenAI from 'openai';
import mongoose from 'mongoose';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || 'dummy_key' });

// Curated scene presets for Siphorahq luxury ceramics
export const SCENE_PRESETS = [
  {
    id: 'luxury-marble',
    name: 'Luxury Beige Marble',
    description: 'Warm beige Italian marble surface with soft natural light',
    prompt: 'Place the product on a warm beige Italian marble surface with natural sunlight streaming from the left, soft golden reflections on the marble, luxury editorial photography style, professional studio lighting, 4K quality',
    thumbnail: '🏛️',
  },
  {
    id: 'royal-gold',
    name: 'Siphorahq Royal Gold',
    description: 'Rich royal gold background with dramatic studio lighting',
    prompt: 'Place the product on a rich gold velvet surface with dramatic studio lighting creating warm golden ambiance, luxury brand photography, deep shadows, premium editorial aesthetic',
    thumbnail: '✨',
  },
  {
    id: 'modern-kitchen',
    name: 'Modern Premium Kitchen',
    description: 'Contemporary kitchen with marble countertop',
    prompt: 'Place the product on a white marble kitchen countertop in a modern luxury kitchen, natural window light, elegant home styling, lifestyle photography',
    thumbnail: '🏠',
  },
  {
    id: 'japanese-zen',
    name: 'Japanese Minimalism',
    description: 'Zen minimalist setting with soft diffused light',
    prompt: 'Place the product in a Japanese minimalist setting, bamboo mat texture, soft morning light through shoji screens, wabi-sabi aesthetic, peaceful and premium',
    thumbnail: '🌸',
  },
  {
    id: 'luxury-hotel',
    name: 'Luxury Hotel Service',
    description: 'Five-star hotel suite with premium service presentation',
    prompt: 'Place the product in a 5-star luxury hotel suite setting, white linen tablecloth, morning sunlight through curtains, premium hospitality photography',
    thumbnail: '🏨',
  },
  {
    id: 'tea-ceremony',
    name: 'Traditional Tea Ceremony',
    description: 'Elegant tea hosting with curated accessories',
    prompt: 'Place the product in an elegant tea ceremony setting, premium tea accessories, warm amber lighting, wooden tea tray, aromatic steam effect, luxury lifestyle',
    thumbnail: '🍵',
  },
  {
    id: 'editorial-magazine',
    name: 'Editorial Magazine',
    description: 'High-fashion editorial photography style',
    prompt: 'Place the product in a high-fashion editorial photography composition, dramatic lighting, luxury magazine aesthetic, bold shadows, premium brand campaign style',
    thumbnail: '📸',
  },
  {
    id: 'diwali-festive',
    name: 'Diwali Festive',
    description: 'Warm Diwali celebration with diyas and flowers',
    prompt: 'Place the product in a beautiful Diwali festive setting, golden diyas, marigold flowers, warm orange lighting, celebration atmosphere, premium Indian lifestyle',
    thumbnail: '🪔',
  },
  {
    id: 'wedding-gifting',
    name: 'Wedding Gifting',
    description: 'Elegant wedding gift presentation',
    prompt: 'Place the product in an elegant wedding gift presentation, roses and orchids, soft white and gold styling, luxury gifting photography, premium packaging aesthetic',
    thumbnail: '💍',
  },
  {
    id: 'outdoor-garden',
    name: 'Luxury Garden',
    description: 'Lush outdoor garden with natural bokeh',
    prompt: 'Place the product in a luxury outdoor garden setting, green foliage bokeh background, natural sunlight, lifestyle photography, premium garden party aesthetic',
    thumbnail: '🌿',
  },
  {
    id: 'white-infinity',
    name: 'White Infinity Studio',
    description: 'Clean white infinity background for marketplace',
    prompt: 'Place the product on a pure white infinity curve background, even professional studio lighting from both sides, no shadows visible, clean marketplace product photography, Amazon main image style',
    thumbnail: '⬜',
  },
  {
    id: 'luxury-dining',
    name: 'Premium Dining Table',
    description: 'Exquisite dining table with fine tableware',
    prompt: 'Place the product on a luxury dining table with fine linen, crystal glasses, silver cutlery, warm candlelight, premium restaurant photography, Michelin star aesthetic',
    thumbnail: '🍽️',
  },
] as const;

export async function POST(req: NextRequest) {
  const authError = await verifyAdminRequest(req);
  if (authError) return authError.error;

  await dbConnect();

  try {
    const body = await req.json();
    const { projectId, sceneId, customPrompt, size = '1024x1024' } = body;

    if (!projectId || !mongoose.Types.ObjectId.isValid(projectId)) {
      return NextResponse.json({ error: 'Valid projectId is required' }, { status: 400 });
    }

    const project = await StudioProject.findById(projectId);
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Find scene preset
    const preset = SCENE_PRESETS.find((s) => s.id === sceneId);
    if (!preset && !customPrompt) {
      return NextResponse.json({ error: 'sceneId or customPrompt required' }, { status: 400 });
    }

    // Build DALL-E prompt preserving product integrity
    const productDesc = [
      project.productType,
      project.productAttributes?.material,
      project.productAttributes?.style,
      ...(project.productAttributes?.features || []),
      ...(project.productAttributes?.colors || []),
    ]
      .filter(Boolean)
      .join(', ');

    const scenePrompt = customPrompt || preset!.prompt;

    const dallePrompt = `Professional product photography: A ${productDesc || 'premium ceramic tableware'} product.
${scenePrompt}.
CRITICAL: The product must remain 100% identical — preserve exact shape, proportions, artwork, pattern, color, ceramic texture, gold detailing, rim, and handle.
Only enhance: lighting, background, reflections, shadows, composition.
Style: Ultra-premium luxury editorial, 8K, hyperrealistic, no text.`;

    const provider = process.env.IMAGE_PROVIDER || (process.env.GEMINI_API_KEY ? 'gemini' : 'openai');
    let generatedBase64 = '';
    let revisedPrompt = '';
    let costWarning = '';

    if (provider === 'gemini') {
      if (!process.env.GEMINI_API_KEY) {
        throw new Error('GEMINI_API_KEY is not configured');
      }
      const model = process.env.GEMINI_IMAGE_MODEL || 'gemini-2.5-flash-image';
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: dallePrompt }
              ]
            }
          ],
          generationConfig: {
            response_modalities: ['IMAGE']
          }
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Gemini API error (${response.status}): ${errorText}`);
      }

      const resJson = await response.json();
      const inlineData = resJson.candidates?.[0]?.content?.parts?.[0]?.inlineData;
      if (!inlineData || !inlineData.data) {
        throw new Error('Gemini image generation returned empty or invalid data');
      }

      generatedBase64 = `data:${inlineData.mimeType || 'image/png'};base64,${inlineData.data}`;
      costWarning = `Gemini Image Generator completed. Model: ${model}`;
    } else {
      // Fallback: OpenAI (DALL-E 3)
      if (!process.env.OPENAI_API_KEY) {
        throw new Error('No API key configured for OpenAI or Gemini');
      }

      const response = await openai.images.generate({
        model: 'dall-e-3',
        prompt: dallePrompt,
        n: 1,
        size: (size === '1792x1024' || size === '1024x1792') ? size : '1024x1024',
        quality: 'standard',
        response_format: 'b64_json',
      });

      if (!response.data || response.data.length === 0) {
        return NextResponse.json({ error: 'Image generation returned no data' }, { status: 500 });
      }

      const imageData = response.data[0];
      if (!imageData?.b64_json) {
        return NextResponse.json({ error: 'Image generation failed' }, { status: 500 });
      }

      generatedBase64 = `data:image/png;base64,${imageData.b64_json}`;
      revisedPrompt = imageData.revised_prompt || '';
      costWarning = 'DALL-E 3 image generated. Estimated cost: ~$0.04';
    }

    const sceneName = preset?.name || 'Custom Scene';

    // Save as asset
    const asset = await GeneratedAsset.create({
      projectId,
      moduleId: 'scene',
      type: 'image',
      label: `Scene: ${sceneName}`,
      content: generatedBase64,
      metadata: {
        sceneId,
        sceneName,
        prompt: dallePrompt,
        revisedPrompt,
        size,
        provider,
      },
      format: 'png',
    });

    // Update project asset count
    await StudioProject.findByIdAndUpdate(projectId, {
      $inc: { assetCount: 1 },
      lastGeneratedModule: 'scene',
    });

    return NextResponse.json({
      success: true,
      image: generatedBase64,
      assetId: asset._id.toString(),
      sceneName,
      revisedPrompt,
      costWarning,
    });
  } catch (err) {
    console.error('[Studio] Scene generation error:', err);
    const message = err instanceof Error ? err.message : 'Scene generation failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// GET — return available scene presets
export async function GET(req: NextRequest) {
  const authError = await verifyAdminRequest(req);
  if (authError) return authError.error;
  return NextResponse.json({ presets: SCENE_PRESETS });
}

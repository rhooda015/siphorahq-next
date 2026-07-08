import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminRequest } from '@/lib/adminAuth';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || '' });

export async function POST(req: NextRequest) {
  const authError = await verifyAdminRequest(req);
  if (authError) return authError.error;

  try {
    const { title, description } = await req.json();

    if (!title) {
      return NextResponse.json({ error: 'Product title is required' }, { status: 400 });
    }

    const prompt = `You are a luxury copywriter for Siphorahq, an elite brand of fine ceramics and tableware.
Optimize the product description for a product named "${title}".
Current description (use this as context or clean it up if poor): "${description || ''}"

Write a compelling, premium, and luxury-focused product description.
Include:
1. An elegant, narrative intro paragraph describing the craftsmanship and aesthetic appeal.
2. A bulleted list of 4-5 "Key Features" (e.g. premium porcelain construction, hand-painted details, safety details, smooth gloss finish).
3. Care tips or gifting suitability.

Format the output strictly as clean HTML paragraphs (<p>), headings (<h3>), and lists (<ul>/<li>). Do NOT wrap in a markdown code block (like \`\`\`html). Output ONLY the HTML tags and text.`;

    let optimizedText = '';

    if (process.env.GEMINI_API_KEY) {
      // Use Gemini for text optimization
      const model = 'gemini-2.5-flash';
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`;

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        });

        if (response.ok) {
          const resJson = await response.json();
          optimizedText = resJson.candidates?.[0]?.content?.parts?.[0]?.text || '';
        }
      } catch (err) {
        console.error('Gemini error during description optimization:', err);
      }
    }

    // Fallback to OpenAI if Gemini fails or is not configured
    if (!optimizedText && process.env.OPENAI_API_KEY) {
      try {
        const completion = await openai.chat.completions.create({
          model: 'gpt-4o',
          messages: [{ role: 'user', content: prompt }],
        });
        optimizedText = completion.choices[0]?.message?.content || '';
      } catch (err) {
        console.error('OpenAI error during description optimization:', err);
      }
    }

    if (!optimizedText) {
      throw new Error('All AI providers failed to generate content');
    }

    // Clean up markdown block wraps if AI generated them anyway
    optimizedText = optimizedText
      .replace(/^```html\s*/i, '')
      .replace(/```\s*$/, '')
      .trim();

    return NextResponse.json({ optimizedHtml: optimizedText });
  } catch (err) {
    console.error('[Admin AI] Optimize error:', err);
    return NextResponse.json({ error: 'AI optimization failed' }, { status: 500 });
  }
}

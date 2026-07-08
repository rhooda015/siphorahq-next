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
    ]
      .filter(Boolean)
      .join(', ');

    const name = productName || project.name || 'Premium Ceramic Product';
    const priceStr = price ? `₹${price}` : 'Premium range';

    const prompt = `You are a luxury marketing expert and social media strategist for Siphorahq — a premium Indian ceramics brand.

Product: ${name}
Details: ${productDesc}
Price: ${priceStr}
Brand: Siphorahq
Markets: Amazon India, Flipkart, Instagram, Facebook, WhatsApp, Email

Generate a complete marketing content package. Return ONLY valid JSON:
{
  "instagram": {
    "captions": [
      {"theme": "Luxury Lifestyle", "caption": "Full Instagram caption with emojis and hashtags (150-200 words)"},
      {"theme": "Gift Occasion", "caption": "Gift-focused caption"},
      {"theme": "Product Story", "caption": "Brand heritage caption"},
      {"theme": "Festive", "caption": "Festival/celebration caption"},
      {"theme": "UGC Prompt", "caption": "User-generated content prompt caption"}
    ],
    "hashtags": {
      "primary": ["#hashtag1", "#hashtag2", "#hashtag3"],
      "secondary": ["#hashtag4", "#hashtag5"],
      "niche": ["#hashtag6", "#hashtag7", "#hashtag8"]
    },
    "reelScript": "30-60 second Instagram Reel script with scene descriptions",
    "storySequence": ["Story 1 slide description", "Story 2 slide description", "Story 3 slide description"]
  },
  "facebook": {
    "adCopy": {
      "headline": "Facebook ad headline",
      "primaryText": "Facebook ad primary text (125 chars)",
      "description": "Ad description",
      "cta": "Shop Now"
    },
    "organicPost": "Facebook organic post (200 words)",
    "groupPost": "Facebook group post for home decor communities"
  },
  "googleAds": {
    "responsiveSearchAd": {
      "headlines": ["Headline 1 (30 chars)", "Headline 2", "Headline 3", "Headline 4", "Headline 5"],
      "descriptions": ["Description 1 (90 chars)", "Description 2"]
    },
    "displayAdCopy": "Display ad copy"
  },
  "whatsapp": {
    "broadcastMessage": "WhatsApp broadcast message for customers (150 words, with emojis)",
    "statusText": "WhatsApp status text"
  },
  "email": {
    "subjectLines": ["Subject 1", "Subject 2", "Subject 3"],
    "preheader": "Email preheader text",
    "body": "Full email HTML-like body content (500 words)",
    "cta": "Shop Now — Limited Stock"
  },
  "contentCalendar": [
    {"day": 1, "platform": "Instagram", "type": "Reel", "theme": "Product Launch", "caption": "Caption preview"},
    {"day": 3, "platform": "Facebook", "type": "Post", "theme": "Lifestyle", "caption": "Caption preview"},
    {"day": 5, "platform": "Instagram", "type": "Story", "theme": "Behind the Scenes", "caption": "Caption preview"},
    {"day": 7, "platform": "WhatsApp", "type": "Broadcast", "theme": "Offer", "caption": "Message preview"},
    {"day": 10, "platform": "Email", "type": "Newsletter", "theme": "Product Feature", "caption": "Subject line"},
    {"day": 14, "platform": "Instagram", "type": "Carousel", "theme": "Features", "caption": "Caption preview"},
    {"day": 21, "platform": "Facebook", "type": "Ad", "theme": "Conversion", "caption": "Ad headline"},
    {"day": 30, "platform": "Instagram", "type": "Post", "theme": "Customer Love", "caption": "Caption preview"}
  ],
  "influencerBrief": "Influencer collaboration brief (200 words)",
  "ugcScript": "UGC creator script for product unboxing and review"
}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 4000,
      temperature: 0.8,
      response_format: { type: 'json_object' },
    });

    const rawContent = completion.choices[0].message.content || '{}';
    const result = JSON.parse(rawContent);

    await GeneratedAsset.create({
      projectId,
      moduleId: 'marketing',
      type: 'json',
      label: 'Marketing Campaign Package',
      content: rawContent,
      metadata: { productName: name },
      format: 'json',
    });

    await StudioProject.findByIdAndUpdate(projectId, {
      $inc: { assetCount: 1 },
      lastGeneratedModule: 'marketing',
    });

    return NextResponse.json({ success: true, ...result });
  } catch (err) {
    console.error('[Studio] Marketing error:', err);
    return NextResponse.json({ error: 'Marketing generation failed' }, { status: 500 });
  }
}

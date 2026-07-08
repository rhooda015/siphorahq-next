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
    ]
      .filter(Boolean)
      .join(', ');

    const name = productName || project.name || 'Premium Ceramic Product';

    const prompt = `You are a keyword research specialist for Siphorahq — a premium Indian ceramics and tableware brand.

Product: ${name}
Details: ${productDesc}
Marketplaces: Amazon India, Flipkart, Google Shopping
Brand: Siphorahq
Market: India

Generate comprehensive keyword and market intelligence research. Return ONLY valid JSON:
{
  "primaryKeywords": [
    {"keyword": "keyword 1", "searchVolume": "High/Medium/Low", "competition": "Low/Medium/High", "intent": "commercial", "cpc": "₹X"},
    {"keyword": "keyword 2", "searchVolume": "High", "competition": "Medium", "intent": "informational", "cpc": "₹X"},
    {"keyword": "keyword 3", "searchVolume": "Medium", "competition": "Low", "intent": "commercial", "cpc": "₹X"},
    {"keyword": "keyword 4", "searchVolume": "High", "competition": "High", "intent": "transactional", "cpc": "₹X"},
    {"keyword": "keyword 5", "searchVolume": "Medium", "competition": "Low", "intent": "commercial", "cpc": "₹X"}
  ],
  "longTailKeywords": [
    "long tail keyword 1 (4-6 words)",
    "long tail keyword 2",
    "long tail keyword 3",
    "long tail keyword 4",
    "long tail keyword 5",
    "long tail keyword 6",
    "long tail keyword 7",
    "long tail keyword 8"
  ],
  "backendKeywords": "amazon backend search terms string, space separated, 250 bytes max",
  "amazonKeywords": ["amazon-specific keyword 1", "amazon keyword 2", "amazon keyword 3"],
  "flipkartKeywords": ["flipkart-specific keyword 1", "flipkart keyword 2"],
  "instagramHashtags": {
    "high": ["#hashtag1 (1M+)", "#hashtag2 (800K+)"],
    "medium": ["#hashtag3 (500K)", "#hashtag4 (300K)"],
    "niche": ["#hashtag5 (50K)", "#hashtag6 (30K)", "#hashtag7 (20K)"]
  },
  "competitionAnalysis": {
    "overallCompetition": "Medium",
    "topCompetitors": ["Competitor category 1", "Competitor category 2"],
    "differentiationOpportunity": "Key opportunity description",
    "priceGap": "Price gap analysis"
  },
  "demandScore": 78,
  "marketplaceOpportunityScore": 85,
  "instagramViralityScore": 72,
  "trendAnalysis": "Current market trend analysis for this product category in India",
  "seasonalityInsights": "Peak selling seasons and festival opportunities",
  "giftingKeywords": ["gifting keyword 1", "gifting keyword 2", "gifting keyword 3"],
  "pricingRecommendation": {
    "budgetRange": "₹X - ₹Y",
    "midRange": "₹Y - ₹Z",
    "premiumRange": "₹Z+",
    "suggestedPositioning": "Premium/Mid-premium"
  }
}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 2500,
      temperature: 0.5,
      response_format: { type: 'json_object' },
    });

    const rawContent = completion.choices[0].message.content || '{}';
    const result = JSON.parse(rawContent);

    await GeneratedAsset.create({
      projectId,
      moduleId: 'keywords',
      type: 'json',
      label: 'Keyword & Market Intelligence',
      content: rawContent,
      metadata: {
        productName: name,
        demandScore: result.demandScore,
        opportunityScore: result.marketplaceOpportunityScore,
      },
      format: 'json',
    });

    await StudioProject.findByIdAndUpdate(projectId, {
      $inc: { assetCount: 1 },
      lastGeneratedModule: 'keywords',
    });

    return NextResponse.json({ success: true, ...result });
  } catch (err) {
    console.error('[Studio] Keywords error:', err);
    return NextResponse.json({ error: 'Keyword research failed' }, { status: 500 });
  }
}

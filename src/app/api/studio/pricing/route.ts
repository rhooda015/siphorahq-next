import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminRequest } from '@/lib/adminAuth';
import dbConnect from '@/lib/db';
import StudioProject from '@/models/StudioProject';
import GeneratedAsset from '@/models/GeneratedAsset';
import mongoose from 'mongoose';

// Indian marketplace fee structure (approximate)
const MARKETPLACE_FEES = {
  amazon: {
    referralFeePercent: 0.08,  // 8% for Home & Kitchen
    fixedFee: 30,              // ₹30 fixed closing fee
    fulfillmentFee: 50,        // FBA estimated
    shippingFee: 60,           // Self-ship estimated
  },
  flipkart: {
    commissionPercent: 0.10,   // 10% for Tableware
    fixedFee: 30,
    shippingFee: 55,
  },
  website: {
    paymentGatewayPercent: 0.02,  // 2% Razorpay
    shippingFee: 70,
  },
};

const GST_RATE = 0.12; // 12% GST for ceramics/tableware

export async function POST(req: NextRequest) {
  const authError = await verifyAdminRequest(req);
  if (authError) return authError.error;

  await dbConnect();

  try {
    const body = await req.json();
    const { projectId, costOfProduction, targetMarginPercent, mrp } = body;

    if (!projectId || !mongoose.Types.ObjectId.isValid(projectId)) {
      return NextResponse.json({ error: 'Valid projectId is required' }, { status: 400 });
    }

    const project = await StudioProject.findById(projectId);
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Default cost estimates if not provided
    const cost = Number(costOfProduction) || 350;
    const targetMargin = Number(targetMarginPercent) || 40;
    const suggestedMRP = Number(mrp) || Math.round(cost * 3.5);

    // GST calculations
    const costWithGST = cost * (1 + GST_RATE);
    const mrpExclGST = suggestedMRP / (1 + GST_RATE);

    // Amazon pricing
    const amazonReferral = suggestedMRP * MARKETPLACE_FEES.amazon.referralFeePercent;
    const amazonTotal =
      amazonReferral + MARKETPLACE_FEES.amazon.fixedFee + MARKETPLACE_FEES.amazon.shippingFee;
    const amazonNetMargin = suggestedMRP - costWithGST - amazonTotal;
    const amazonMarginPercent = (amazonNetMargin / suggestedMRP) * 100;

    // Flipkart pricing
    const flipkartCommission = suggestedMRP * MARKETPLACE_FEES.flipkart.commissionPercent;
    const flipkartTotal =
      flipkartCommission + MARKETPLACE_FEES.flipkart.fixedFee + MARKETPLACE_FEES.flipkart.shippingFee;
    const flipkartNetMargin = suggestedMRP - costWithGST - flipkartTotal;
    const flipkartMarginPercent = (flipkartNetMargin / suggestedMRP) * 100;

    // Website pricing
    const websiteGateway = suggestedMRP * MARKETPLACE_FEES.website.paymentGatewayPercent;
    const websiteTotal = websiteGateway + MARKETPLACE_FEES.website.shippingFee;
    const websiteNetMargin = suggestedMRP - costWithGST - websiteTotal;
    const websiteMarginPercent = (websiteNetMargin / suggestedMRP) * 100;

    // Pricing recommendations
    const minViablePrice = Math.round(costWithGST * (1 + targetMargin / 100) + MARKETPLACE_FEES.amazon.fixedFee + MARKETPLACE_FEES.amazon.shippingFee);
    const wholesalePrice = Math.round(costWithGST * 1.2);
    const promotionalPrice = Math.round(suggestedMRP * 0.85);

    const result = {
      inputs: {
        costOfProduction: cost,
        gstRate: `${GST_RATE * 100}%`,
        suggestedMRP,
        targetMarginPercent: targetMargin,
      },
      gstBreakdown: {
        costExclGST: Math.round(cost),
        gstOnCost: Math.round(cost * GST_RATE),
        costInclGST: Math.round(costWithGST),
        mrpExclGST: Math.round(mrpExclGST),
        gstOnMRP: Math.round(suggestedMRP - mrpExclGST),
        mrpInclGST: suggestedMRP,
      },
      marketplacePricing: {
        amazon: {
          recommendedSellingPrice: suggestedMRP,
          referralFee: Math.round(amazonReferral),
          fixedFee: MARKETPLACE_FEES.amazon.fixedFee,
          shippingFee: MARKETPLACE_FEES.amazon.shippingFee,
          totalMarketplaceCost: Math.round(amazonTotal),
          netProfit: Math.round(amazonNetMargin),
          netMarginPercent: Math.round(amazonMarginPercent),
          viable: amazonNetMargin > 0,
        },
        flipkart: {
          recommendedSellingPrice: suggestedMRP,
          commission: Math.round(flipkartCommission),
          fixedFee: MARKETPLACE_FEES.flipkart.fixedFee,
          shippingFee: MARKETPLACE_FEES.flipkart.shippingFee,
          totalMarketplaceCost: Math.round(flipkartTotal),
          netProfit: Math.round(flipkartNetMargin),
          netMarginPercent: Math.round(flipkartMarginPercent),
          viable: flipkartNetMargin > 0,
        },
        website: {
          recommendedSellingPrice: suggestedMRP,
          paymentGatewayFee: Math.round(websiteGateway),
          shippingFee: MARKETPLACE_FEES.website.shippingFee,
          totalCost: Math.round(websiteTotal),
          netProfit: Math.round(websiteNetMargin),
          netMarginPercent: Math.round(websiteMarginPercent),
          viable: websiteNetMargin > 0,
        },
      },
      pricingStrategy: {
        suggestedMRP,
        minViablePrice,
        wholesalePrice,
        promotionalPrice,
        premiumPositionPrice: Math.round(suggestedMRP * 1.2),
      },
      predictions: {
        conversionRate: Math.min(95, 45 + (amazonMarginPercent > 20 ? 20 : 0) + (suggestedMRP < 3000 ? 15 : 0)),
        visualAppealScore: 82,
        luxuryScore: 88,
        viralityScore: 70,
        giftabilityScore: 90,
        marketplaceSuccessProbability: Math.min(95, 60 + (amazonMarginPercent > 25 ? 20 : 0) + 15),
      },
      recommendation: amazonNetMargin > 200
        ? 'Strong margins — proceed with Amazon + Website dual-channel strategy.'
        : 'Margins tight on Amazon — consider premium positioning or cost optimization.',
    };

    await GeneratedAsset.create({
      projectId,
      moduleId: 'pricing',
      type: 'json',
      label: 'Pricing & Business Analytics',
      content: JSON.stringify(result),
      metadata: { suggestedMRP, amazonMarginPercent: Math.round(amazonMarginPercent) },
      format: 'json',
    });

    await StudioProject.findByIdAndUpdate(projectId, {
      $inc: { assetCount: 1 },
      lastGeneratedModule: 'pricing',
    });

    return NextResponse.json({ success: true, ...result });
  } catch (err) {
    console.error('[Studio] Pricing error:', err);
    return NextResponse.json({ error: 'Pricing calculation failed' }, { status: 500 });
  }
}

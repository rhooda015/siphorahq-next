import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminRequest } from '@/lib/adminAuth';
import dbConnect from '@/lib/db';
import StudioProject from '@/models/StudioProject';
import GeneratedAsset from '@/models/GeneratedAsset';
import sharp from 'sharp';
import mongoose from 'mongoose';

export async function POST(req: NextRequest) {
  const authError = await verifyAdminRequest(req);
  if (authError) return authError.error;

  await dbConnect();

  try {
    const body = await req.json();
    const { projectId, settings } = body;

    if (!projectId || !mongoose.Types.ObjectId.isValid(projectId)) {
      return NextResponse.json({ error: 'Valid projectId is required' }, { status: 400 });
    }

    const project = await StudioProject.findById(projectId);
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    if (!project.originalImage) {
      return NextResponse.json({ error: 'No image found in project' }, { status: 400 });
    }

    // Extract base64 image data
    const base64Data = project.originalImage.split(',')[1];
    if (!base64Data) {
      return NextResponse.json({ error: 'Invalid image data' }, { status: 400 });
    }
    const imageBuffer = Buffer.from(base64Data, 'base64');

    // Enhancement settings with defaults
    const {
      brightness = 1.05,
      contrast = 1.10,
      saturation = 1.08,
      sharpness = 1.5,
      removeBackground = false,
    } = settings || {};

    // Apply Sharp enhancements
    let pipeline = sharp(imageBuffer)
      .modulate({
        brightness: Math.min(Math.max(brightness, 0.5), 2.0),
        saturation: Math.min(Math.max(saturation, 0.5), 2.0),
      })
      .linear(
        Math.min(Math.max(contrast, 0.5), 2.0), // contrast multiplier
        -(128 * (contrast - 1))                 // offset to keep midtones
      )
      .sharpen(sharpness, 1.0, 2.0);

    if (removeBackground) {
      // White background composite for clean product shot
      pipeline = pipeline.flatten({ background: { r: 255, g: 255, b: 255 } });
    }

    // Auto-level whites and blacks for premium look
    const enhancedBuffer = await pipeline
      .jpeg({ quality: 95, progressive: true })
      .toBuffer();

    const enhancedBase64 = `data:image/jpeg;base64,${enhancedBuffer.toString('base64')}`;

    // Also generate a white-background version
    const whiteBackgroundBuffer = await sharp(imageBuffer)
      .modulate({ brightness: 1.05, saturation: 1.05 })
      .sharpen(1.2)
      .flatten({ background: { r: 255, g: 255, b: 255 } })
      .jpeg({ quality: 95 })
      .toBuffer();

    const whiteBackgroundBase64 = `data:image/jpeg;base64,${whiteBackgroundBuffer.toString('base64')}`;

    // Save enhanced image to project
    await StudioProject.findByIdAndUpdate(projectId, {
      enhancedImage: enhancedBase64,
    });

    // Save as assets
    const [mainAsset] = await Promise.all([
      GeneratedAsset.create({
        projectId,
        moduleId: 'enhance',
        type: 'image',
        label: 'Enhanced Product Image',
        content: enhancedBase64,
        metadata: { settings, version: 'enhanced' },
        format: 'jpg',
      }),
      GeneratedAsset.create({
        projectId,
        moduleId: 'enhance',
        type: 'image',
        label: 'White Background Product Image',
        content: whiteBackgroundBase64,
        metadata: { settings, version: 'white-bg' },
        format: 'jpg',
      }),
    ]);

    return NextResponse.json({
      success: true,
      enhanced: enhancedBase64,
      whiteBackground: whiteBackgroundBase64,
      assetId: mainAsset._id.toString(),
    });
  } catch (err) {
    console.error('[Studio] Enhance error:', err);
    return NextResponse.json({ error: 'Image enhancement failed' }, { status: 500 });
  }
}

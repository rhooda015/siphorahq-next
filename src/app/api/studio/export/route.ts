import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminRequest } from '@/lib/adminAuth';
import dbConnect from '@/lib/db';
import StudioProject from '@/models/StudioProject';
import GeneratedAsset from '@/models/GeneratedAsset';
import mongoose from 'mongoose';

export async function POST(req: NextRequest) {
  const authError = await verifyAdminRequest(req);
  if (authError) return authError.error;

  await dbConnect();

  try {
    const body = await req.json();
    const { projectId, modules } = body; // modules: optional array to filter

    if (!projectId || !mongoose.Types.ObjectId.isValid(projectId)) {
      return NextResponse.json({ error: 'Valid projectId is required' }, { status: 400 });
    }

    const [project, assets] = await Promise.all([
      StudioProject.findById(projectId).lean(),
      GeneratedAsset.find({
        projectId,
        ...(modules?.length ? { moduleId: { $in: modules } } : {}),
      })
        .sort({ moduleId: 1, createdAt: -1 })
        .lean(),
    ]);

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Build export manifest
    const manifest: Record<string, unknown[]> = {};
    const imageAssets: { label: string; base64: string; format: string }[] = [];

    for (const asset of assets) {
      if (!manifest[asset.moduleId]) manifest[asset.moduleId] = [];

      if (asset.type === 'image') {
        imageAssets.push({
          label: asset.label,
          base64: asset.content,
          format: asset.format || 'jpg',
        });
        manifest[asset.moduleId].push({
          label: asset.label,
          type: 'image',
          format: asset.format,
          note: 'Image included as base64',
        });
      } else if (asset.type === 'json') {
        try {
          manifest[asset.moduleId].push(JSON.parse(asset.content));
        } catch {
          manifest[asset.moduleId].push({ raw: asset.content });
        }
      } else {
        manifest[asset.moduleId].push({ content: asset.content, label: asset.label });
      }
    }

    // Build comprehensive export package as JSON
    const exportPackage = {
      exportedAt: new Date().toISOString(),
      brand: 'Siphorahq',
      project: {
        id: projectId,
        name: project.name,
        description: project.description,
        productType: project.productType,
        productAttributes: project.productAttributes,
        createdAt: project.createdAt,
      },
      assets: manifest,
      imageCount: imageAssets.length,
      images: imageAssets.map((img) => ({
        label: img.label,
        format: img.format,
        // base64 included only for API consumers
        data: img.base64,
      })),
      summary: {
        totalAssets: assets.length,
        modulesGenerated: Object.keys(manifest),
        generatedAt: new Date().toISOString(),
      },
    };

    const jsonString = JSON.stringify(exportPackage, null, 2);
    const exportBuffer = Buffer.from(jsonString, 'utf-8');

    return new NextResponse(exportBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="siphorahq-studio-${projectId}-export.json"`,
        'Content-Length': exportBuffer.length.toString(),
      },
    });
  } catch (err) {
    console.error('[Studio] Export error:', err);
    return NextResponse.json({ error: 'Export failed' }, { status: 500 });
  }
}

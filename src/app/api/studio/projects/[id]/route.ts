import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminRequest } from '@/lib/adminAuth';
import dbConnect from '@/lib/db';
import StudioProject from '@/models/StudioProject';
import GeneratedAsset from '@/models/GeneratedAsset';
import mongoose from 'mongoose';

// GET /api/studio/projects/[id] — get project with all assets
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await verifyAdminRequest(req);
  if (authError) return authError.error;

  await dbConnect();

  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Invalid project ID' }, { status: 400 });
  }

  const [project, assets] = await Promise.all([
    StudioProject.findById(id).lean(),
    GeneratedAsset.find({ projectId: id }).sort({ createdAt: -1 }).lean(),
  ]);

  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  // Group assets by module
  const assetsByModule: Record<string, typeof assets> = {};
  for (const asset of assets) {
    const mid = asset.moduleId;
    if (!assetsByModule[mid]) assetsByModule[mid] = [];
    assetsByModule[mid].push(asset);
  }

  return NextResponse.json({ project, assetsByModule });
}

// PATCH /api/studio/projects/[id] — update project metadata
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await verifyAdminRequest(req);
  if (authError) return authError.error;

  await dbConnect();

  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Invalid project ID' }, { status: 400 });
  }

  try {
    const body = await req.json();
    const allowedFields = ['name', 'description', 'status', 'tags', 'lastGeneratedModule'];
    const updates: Record<string, unknown> = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) updates[field] = body[field];
    }

    const project = await StudioProject.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true }
    ).lean();

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ project });
  } catch (err) {
    console.error('[Studio] Update project error:', err);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

// DELETE /api/studio/projects/[id] — delete project and all its assets
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await verifyAdminRequest(req);
  if (authError) return authError.error;

  await dbConnect();

  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Invalid project ID' }, { status: 400 });
  }

  await Promise.all([
    StudioProject.findByIdAndDelete(id),
    GeneratedAsset.deleteMany({ projectId: id }),
  ]);

  return NextResponse.json({ success: true });
}

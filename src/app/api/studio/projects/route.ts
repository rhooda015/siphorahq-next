import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminRequest } from '@/lib/adminAuth';
import dbConnect from '@/lib/db';
import StudioProject from '@/models/StudioProject';

// GET /api/studio/projects — list all projects
export async function GET(req: NextRequest) {
  const authError = await verifyAdminRequest(req);
  if (authError) return authError.error;

  await dbConnect();

  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get('page') || '1', 10);
  const limit = parseInt(url.searchParams.get('limit') || '20', 10);
  const skip = (page - 1) * limit;

  const [projects, total] = await Promise.all([
    StudioProject.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-originalImage -enhancedImage') // exclude large image data from list
      .lean(),
    StudioProject.countDocuments({}),
  ]);

  return NextResponse.json({ projects, total, page, limit });
}

// POST /api/studio/projects — create new project (name only, image uploaded separately)
export async function POST(req: NextRequest) {
  const authError = await verifyAdminRequest(req);
  if (authError) return authError.error;

  await dbConnect();

  try {
    const body = await req.json();
    const { name, description } = body;

    if (!name?.trim()) {
      return NextResponse.json({ error: 'Project name is required' }, { status: 400 });
    }

    const project = await StudioProject.create({
      name: name.trim(),
      description: description?.trim(),
      originalImage: '',
      originalImageMimeType: 'image/jpeg',
      createdBy: 'admin',
      status: 'draft',
    });

    return NextResponse.json({ project }, { status: 201 });
  } catch (err) {
    console.error('[Studio] Create project error:', err);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}

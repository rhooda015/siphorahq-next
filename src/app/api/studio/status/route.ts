import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminRequest } from '@/lib/adminAuth';

export async function GET(req: NextRequest) {
  const authError = await verifyAdminRequest(req);
  if (authError) return authError.error;

  return NextResponse.json({
    geminiConfigured: !!process.env.GEMINI_API_KEY,
    openaiConfigured: !!process.env.OPENAI_API_KEY,
    imageProvider: process.env.IMAGE_PROVIDER || 'gemini',
    imageModel: process.env.GEMINI_IMAGE_MODEL || 'gemini-2.5-flash-image',
  });
}

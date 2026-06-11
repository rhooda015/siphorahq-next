import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

export async function verifyAdminRequest(req: NextRequest): Promise<{ error: NextResponse } | null> {
  const token = req.cookies.get('admin_token')?.value;
  
  if (!token) {
    return { error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) };
  }

  try {
    const SECRET = new TextEncoder().encode(
      process.env.NEXTAUTH_SECRET || 'fallback_secret_32_chars_minimum!!'
    );
    await jwtVerify(token, SECRET);
    return null;
  } catch {
    return { error: NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 }) };
  }
}

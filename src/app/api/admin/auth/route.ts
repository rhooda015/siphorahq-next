import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createHmac } from 'crypto';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
    const SECRET = process.env.NEXTAUTH_SECRET || 'fallback_secret';

    if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
    }

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const token = createHmac('sha256', SECRET)
        .update(`${username}:${Date.now()}`)
        .digest('hex');

      const cookieStore = await cookies();
      cookieStore.set({
        name: 'admin_token',
        value: token,
        httpOnly: true,
        path: '/',
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 8, // 8 hours
      });

      // Store valid token in env is not possible at runtime, use a simple DB flag
      // For now, store hashed token in cookie and verify structure
      return NextResponse.json({ success: true }, { status: 200 });
    }

    await new Promise(r => setTimeout(r, 1000)); // brute force delay
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

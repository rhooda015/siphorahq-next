import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password)
      return NextResponse.json({ error: 'All fields required' }, { status: 400 });

    if (password.length < 6)
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });

    await dbConnect();

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing)
      return NextResponse.json({ error: 'Account already exists with this email' }, { status: 409 });

    const hashed = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email: email.toLowerCase(), password: hashed, provider: 'credentials' });

    return NextResponse.json({ success: true, message: 'Account created', userId: user._id }, { status: 201 });
  } catch (err) {
    console.error('Register error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

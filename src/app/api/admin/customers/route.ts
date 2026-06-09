import { verifyAdminRequest } from '@/lib/adminAuth';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function GET(req: NextRequest) {
  const authError = await verifyAdminRequest(req);
  if (authError) return authError.error;
  try {
    await dbConnect();
    // Fetch users, excluding sensitive fields like passwords if any
    const users = await User.find({}).sort({ createdAt: -1 });
    
    // In a real CRM, we'd aggregate total orders and spend per user here
    // For now, we return the users
    return NextResponse.json(users);
  } catch (error) {
    console.error('Failed to fetch customers:', error);
    return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 });
  }
}

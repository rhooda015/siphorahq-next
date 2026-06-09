import { verifyAdminRequest } from '@/lib/adminAuth';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Return from '@/models/Return';

export async function GET(req: NextRequest) {
  const authError = await verifyAdminRequest(req);
  if (authError) return authError.error;
  try {
    await dbConnect();
    const returns = await Return.find({}).sort({ createdAt: -1 });
    return NextResponse.json(returns);
  } catch (error) {
    console.error('Failed to fetch returns:', error);
    return NextResponse.json({ error: 'Failed to fetch returns' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await dbConnect();
    const data = await req.json();
    const { _id, status } = data;

    if (!_id || !status) {
      return NextResponse.json({ error: 'Return ID and status are required' }, { status: 400 });
    }

    const updatedReturn = await Return.findByIdAndUpdate(
      _id,
      { $set: { status } },
      { new: true }
    );

    if (!updatedReturn) {
      return NextResponse.json({ error: 'Return request not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, returnRequest: updatedReturn });
  } catch (error) {
    console.error('Failed to update return:', error);
    return NextResponse.json({ error: 'Failed to update return' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/db';
import User from '@/models/User';
import mongoose from 'mongoose';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { fullName, street, city, state, pincode, mobile, isDefault } = body;

    // Validate mobile number
    if (!mobile || !/^\d{10}$/.test(mobile.replace(/\D/g, ''))) {
      return NextResponse.json({ error: 'Valid 10-digit mobile number is required' }, { status: 400 });
    }

    if (!fullName || !street || !city || !state || !pincode) {
      return NextResponse.json({ error: 'All address fields are required' }, { status: 400 });
    }

    await connectDB();
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Initialize addresses array if not present
    if (!user.addresses) {
      user.addresses = [];
    }

    // If this is the first address or set to default, make others non-default
    if (isDefault || user.addresses.length === 0) {
      user.addresses.forEach((addr: any) => {
        addr.isDefault = false;
      });
    }

    const newAddress = {
      _id: new mongoose.Types.ObjectId().toString(),
      fullName,
      street,
      city,
      state,
      pincode,
      mobile,
      isDefault: isDefault || user.addresses.length === 0
    };

    user.addresses.push(newAddress);
    await user.save();

    return NextResponse.json({ message: 'Address added successfully', address: newAddress }, { status: 201 });
  } catch (error) {
    console.error('Error adding address:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

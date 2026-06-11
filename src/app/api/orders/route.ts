import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import { authenticateShiprocket, createShiprocketOrder } from '@/lib/shiprocket';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    
    const email = session.user.email;
    const orders = await Order.find({
      $or: [
        { customerEmail: email },
        { 'customerDetails.email': email }
      ]
    }).sort({ createdAt: -1 }).limit(50);
    
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const data = await req.json();
    
    // Validate required fields
    if (!data.amount || !data.customer || !data.items) {
      return NextResponse.json({ error: 'Missing required order details' }, { status: 400 });
    }

    const orderId = `order_${Math.random().toString(36).substr(2, 9)}`;

    const newOrder = await Order.create({
      orderId: orderId,
      amount: data.amount,
      status: 'pending_confirmation', // Specific status for COD
      customerDetails: data.customer,
      items: data.items,
      lineItems: data.items.map((i: any) => ({
        productId: i.id || i._id,
        productName: i.name || i.title,
        quantity: i.quantity || 1,
        price: i.price,
        size: i.size || 'N/A'
      })),
      shippingAddress: data.shippingAddress || {
        name: data.customer.firstName || "Customer",
        addressLine1: data.customer.address || "Address",
        city: data.customer.city || "City",
        state: data.customer.state || "State",
        pincode: data.customer.pincode || "000000"
      },
      customerEmail: data.customer.email,
      paymentMethod: data.method || 'cod'
    });

    // Shiprocket push happens only after admin confirms — not automatically on COD
    // Admin can trigger dispatch from /admin → Orders → Manage

    return NextResponse.json({ 
      success: true, 
      id: newOrder.orderId,
      message: 'Order created successfully' 
    });
  } catch (error) {
    console.error('Failed to create order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}

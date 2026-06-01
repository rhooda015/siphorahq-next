import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';

export async function GET() {
  try {
    await dbConnect();
    
    // Fetch orders from MongoDB, sort by newest first
    const orders = await Order.find({}).sort({ createdAt: -1 }).limit(50);
    
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
      paymentMethod: data.method || 'cod'
    });

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

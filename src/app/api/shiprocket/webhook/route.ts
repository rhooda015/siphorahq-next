import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Verify payload exists
    if (!data.order_id && !data.awb) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    await dbConnect();

    // Find the order either by our custom orderId or Shiprocket's internal order_id
    const order = await Order.findOne({
      $or: [
        { orderId: data.order_id },
        { shiprocketOrderId: data.order_id }
      ]
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Map Shiprocket Status to our DB Status
    let newStatus = order.status;
    const srStatus = (data.current_status || '').toUpperCase();
    
    if (srStatus === 'SHIPPED') newStatus = 'Shipped';
    else if (srStatus === 'OUT FOR DELIVERY') newStatus = 'Out for Delivery';
    else if (srStatus === 'DELIVERED') newStatus = 'Delivered';
    else if (srStatus === 'CANCELED' || srStatus === 'CANCELLED') newStatus = 'Cancelled';
    else if (srStatus === 'PROCESSING') newStatus = 'Processing';

    // Update fields
    if (data.awb) order.awb = data.awb;
    if (data.courier_name) order.courier = data.courier_name;
    order.status = newStatus;

    await order.save();

    return NextResponse.json({ success: true, message: 'Webhook received and order updated' });
  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

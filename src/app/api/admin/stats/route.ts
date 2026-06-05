import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
// Authentication can be added here if needed

export async function GET() {
  try {
    await dbConnect();

    // Aggregate Orders for Total Revenue and Total Orders
    const orders = await Order.find({});
    
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + (order.amount || 0), 0);
    const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;
    
    // Calculate pending dispatch
    const pendingDispatch = orders.filter(o => o.status === 'pending_payment' || o.status === 'pending_confirmation' || o.status === 'Processing').length;

    // Last 7 days revenue for Chart
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentOrders = await Order.find({ createdAt: { $gte: sevenDaysAgo } });
    
    const chartData = [0, 0, 0, 0, 0, 0, 0];
    const today = new Date();
    
    recentOrders.forEach(order => {
      const orderDate = new Date(order.createdAt);
      const diffTime = Math.abs(today.getTime() - orderDate.getTime());
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays < 7) {
        chartData[6 - diffDays] += order.amount || 0;
      }
    });

    return NextResponse.json({
      revenue: totalRevenue,
      orders: totalOrders,
      avgOrderValue,
      pendingDispatch,
      chartData
    });

  } catch (error) {
    console.error('Failed to fetch admin stats:', error);
    return NextResponse.json({ error: 'Failed to fetch admin stats' }, { status: 500 });
  }
}

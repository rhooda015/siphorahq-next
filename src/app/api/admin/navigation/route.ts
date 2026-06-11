import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Navigation from '@/models/Navigation';

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const menuId = searchParams.get('menuId');

    if (menuId) {
      const nav = await Navigation.findOne({ menuId });
      return NextResponse.json(nav || { menuId, name: menuId, links: [] });
    }

    const navs = await Navigation.find();
    return NextResponse.json(navs);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { menuId } = body;
    
    if (!menuId) return NextResponse.json({ error: 'menuId is required' }, { status: 400 });

    const nav = await Navigation.findOneAndUpdate(
      { menuId },
      body,
      { new: true, upsert: true }
    );
    
    return NextResponse.json(nav);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

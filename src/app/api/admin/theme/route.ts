import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import ThemeSettings from '@/models/ThemeSettings';

export async function GET() {
  try {
    await dbConnect();
    let theme = await ThemeSettings.findOne();
    if (!theme) {
      theme = await ThemeSettings.create({});
    }
    return NextResponse.json(theme);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    let theme = await ThemeSettings.findOne();
    if (!theme) {
      theme = await ThemeSettings.create(body);
    } else {
      theme = await ThemeSettings.findOneAndUpdate({}, body, { new: true });
    }
    return NextResponse.json(theme);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

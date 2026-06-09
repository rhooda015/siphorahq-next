import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import StoreSettings from '@/models/StoreSettings';

export async function GET() {
  try {
    await dbConnect();
    let settings = await StoreSettings.findOne();
    if (!settings) {
      settings = await StoreSettings.create({});
    }
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();
    
    let settings = await StoreSettings.findOne();
    if (!settings) {
      settings = new StoreSettings(data);
    } else {
      // Iterate over keys and update
      Object.keys(data).forEach((key) => {
        (settings as any)[key] = data[key];
      });
    }
    
    await settings.save();
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}

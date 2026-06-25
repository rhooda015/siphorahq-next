import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import StoreSettings from '@/models/StoreSettings';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const settings = await StoreSettings.findOne();
    return NextResponse.json({
      zohoClientId: settings?.zohoClientId || '',
      zohoClientSecret: settings?.zohoClientSecret || '',
      zohoRefreshToken: settings?.zohoRefreshToken || '',
      zohoRegion: settings?.zohoRegion || '.in',
    });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    await dbConnect();
    
    let settings = await StoreSettings.findOne();
    if (!settings) {
      settings = new StoreSettings();
    }
    
    settings.zohoClientId = data.zohoClientId;
    settings.zohoClientSecret = data.zohoClientSecret;
    settings.zohoRefreshToken = data.zohoRefreshToken;
    settings.zohoRegion = data.zohoRegion || '.in';
    
    await settings.save();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

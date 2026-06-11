import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Homepage from '@/models/Homepage';

export async function GET() {
  try {
    await dbConnect();
    // Default to getting the draft version for the admin panel, or published version for storefront
    // In a real scenario, you'd pass a query param ?version=draft or ?version=published
    let homepage = await Homepage.findOne({ version: 'draft' });
    if (!homepage) {
      homepage = await Homepage.create({ version: 'draft', sections: [] });
    }
    return NextResponse.json(homepage);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    let homepage = await Homepage.findOne({ version: 'draft' });
    if (!homepage) {
      homepage = await Homepage.create({ version: 'draft', sections: body.sections });
    } else {
      homepage = await Homepage.findOneAndUpdate({ version: 'draft' }, { sections: body.sections }, { new: true });
    }
    return NextResponse.json(homepage);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

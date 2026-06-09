import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Collection from '@/models/Collection';

export async function GET() {
  try {
    await dbConnect();
    const collections = await Collection.find({}).sort({ createdAt: -1 });
    return NextResponse.json(collections);
  } catch (error) {
    console.error('Failed to fetch collections:', error);
    return NextResponse.json({ error: 'Failed to fetch collections' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const data = await req.json();
    
    if (!data.title || !data.handle) {
      return NextResponse.json({ error: 'Title and handle are required' }, { status: 400 });
    }

    const newCollection = await Collection.create(data);
    return NextResponse.json(newCollection);
  } catch (error: any) {
    console.error('Failed to create collection:', error);
    if (error.code === 11000) {
      return NextResponse.json({ error: 'Collection handle already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create collection' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await dbConnect();
    const data = await req.json();
    const { _id, ...updateData } = data;

    if (!_id) {
      return NextResponse.json({ error: 'Collection ID is required' }, { status: 400 });
    }

    const updatedCollection = await Collection.findByIdAndUpdate(
      _id,
      { $set: updateData },
      { new: true }
    );

    return NextResponse.json(updatedCollection);
  } catch (error) {
    console.error('Failed to update collection:', error);
    return NextResponse.json({ error: 'Failed to update collection' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Collection ID is required' }, { status: 400 });
    }

    await Collection.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete collection:', error);
    return NextResponse.json({ error: 'Failed to delete collection' }, { status: 500 });
  }
}

import React from 'react';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import { STATIC_PRODUCTS } from '@/data/products';
import HomeClient from '@/components/HomeClient';

export const revalidate = 60; // Use ISR

export default async function HomePage() {
  await dbConnect();
  
  // Fetch live products from DB
  const dbProducts = await Product.find({ status: 'Live' }).sort({ createdAt: -1 }).lean();
  
  const mappedProducts = dbProducts.map((p: any) => ({
    id: p.handle || p._id.toString(),
    slug: p.handle || p._id.toString(),
    name: p.title,
    price: p.price,
    salePrice: p.price, 
    category: p.category,
    image: p.images?.[0]?.url || '/images/dinnerware.webp',
  }));

  const productsNew = [...mappedProducts, ...STATIC_PRODUCTS].slice(0, 4);

  return <HomeClient products={productsNew} />;
}

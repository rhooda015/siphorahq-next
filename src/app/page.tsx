import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { STATIC_PRODUCTS } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export const revalidate = 60; // Use ISR

export default async function HomePage() {
  await dbConnect();
  
  // Fetch live products from DB
  const dbProducts = await Product.find({ status: 'Live' }).sort({ createdAt: -1 }).lean();
  
  const mappedProducts = dbProducts.map((p: any) => ({
    id: p.handle || p._id.toString(),
    name: p.title,
    price: p.price,
    salePrice: p.price, 
    category: p.category,
    image: p.images?.[0]?.url || '/images/dinnerware.webp',
  }));

  const productsNew = [...mappedProducts, ...STATIC_PRODUCTS].slice(0, 4);

  return (
    <main className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[500px] h-[70vh] max-h-[850px] w-full overflow-hidden flex items-center px-margin-desktop">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjKFOZSacyg5S9aewoF3p5oBtjy_Q6nHjK8fbYWNIEQ3LSTzg57OIL9Xx8kgOKA3TaHabGVUW5M7MxrG3Pa6wcW0jutvTnX9A2m0Dy_Mgnq0FH1H2YbQAJzDywwfuPRN7nCM2qoxAGBJnml4nkufhGUF0yRZjQqLwTotipfqv95Uu2K72OnDAR4D0pMGx4tR3hzakgB_9ZslgeKvzBCkeYXLKZd5IbwxK2x2TE9WDOYHDU_WMBW-Rvpn9CTc7WHhg6deAZq7lKEgM"
            alt="Luxury Dining Experience" 
            fill
            priority
            sizes="100vw"
            className="object-cover object-center" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-heritage-navy/40 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-2xl text-porcelain-white">
          <span className="font-label-caps text-label-caps tracking-widest block mb-4 animate-[reveal_1.2s_ease_forwards]">POETRY IN PORCELAIN</span>
          <h1 className="font-display-lg text-display-lg mb-6 leading-tight">Elevate Everyday Dining</h1>
          <p className="font-body-lg text-body-lg mb-10 text-porcelain-white/90">Premium Porcelain &amp; Timeless Tableware Crafted For Elegant Homes. Rediscover the art of hosting with curated collections.</p>
          <div className="flex gap-4">
            <Link href="/products" className="bg-heritage-navy text-porcelain-white px-8 py-4 font-label-caps text-label-caps rounded-sm hover:bg-champagne-gold transition-colors duration-500">
              SHOP COLLECTION
            </Link>
            <Link href="/products" className="border border-porcelain-white text-porcelain-white px-8 py-4 font-label-caps text-label-caps rounded-sm hover:bg-porcelain-white hover:text-heritage-navy transition-all duration-500">
              EXPLORE BESTSELLERS
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Cards */}
      <section className="bg-bone-gray py-12 px-margin-desktop">
        <div className="max-w-container-max mx-auto grid grid-cols-2 md:grid-cols-4 gap-gutter">
          <div className="flex flex-col items-center text-center p-6 bg-porcelain-white rounded-lg shadow-[0_10px_30px_-10px_rgba(26,42,58,0.08)] animate-[reveal_0.8s_ease_forwards]">
            <span className="material-symbols-outlined text-champagne-gold mb-3 !text-3xl">workspace_premium</span>
            <h3 className="font-label-caps text-label-caps text-heritage-navy mb-1">Premium Porcelain</h3>
            <p className="text-[11px] uppercase tracking-wider text-on-surface-variant">Unmatched Quality</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-porcelain-white rounded-lg shadow-[0_10px_30px_-10px_rgba(26,42,58,0.08)] animate-[reveal_0.8s_ease_forwards]">
            <span className="material-symbols-outlined text-champagne-gold mb-3 !text-3xl">verified_user</span>
            <h3 className="font-label-caps text-label-caps text-heritage-navy mb-1">Food Safe &amp; Durable</h3>
            <p className="text-[11px] uppercase tracking-wider text-on-surface-variant">Non-Toxic Finish</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-porcelain-white rounded-lg shadow-[0_10px_30px_-10px_rgba(26,42,58,0.08)] animate-[reveal_0.8s_ease_forwards]">
            <span className="material-symbols-outlined text-champagne-gold mb-3 !text-3xl">feature_search</span>
            <h3 className="font-label-caps text-label-caps text-heritage-navy mb-1">Luxury Packaging</h3>
            <p className="text-[11px] uppercase tracking-wider text-on-surface-variant">Gift Ready Boxes</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-porcelain-white rounded-lg shadow-[0_10px_30px_-10px_rgba(26,42,58,0.08)] animate-[reveal_0.8s_ease_forwards]">
            <span className="material-symbols-outlined text-champagne-gold mb-3 !text-3xl">lock_open</span>
            <h3 className="font-label-caps text-label-caps text-heritage-navy mb-1">Secure Payments</h3>
            <p className="text-[11px] uppercase tracking-wider text-on-surface-variant">PCI Compliant</p>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-stack-xl px-margin-desktop max-w-container-max mx-auto">
        <div className="flex justify-between items-end mb-stack-md">
          <div>
            <h2 className="font-display-lg text-headline-lg text-heritage-navy mb-2">Most Loved by 1,000+ Homes</h2>
            <p className="text-on-surface-variant font-body-md">Our signature pieces that define modern elegance.</p>
          </div>
          <Link href="/products" className="font-label-caps text-label-caps text-heritage-navy underline decoration-champagne-gold underline-offset-4">
            VIEW ALL
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
          {productsNew.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-stack-xl bg-surface px-margin-desktop">
        <div className="max-w-container-max mx-auto">
          <h2 className="font-display-lg text-headline-lg text-heritage-navy text-center mb-stack-lg">Discover Our Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            {/* Dinnerware */}
            <Link href="/products?category=dinnerware" className="md:col-span-8 relative group overflow-hidden cursor-pointer h-[500px] block">
              <Image 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3GBTydQlxarnLPajPmnE-88plwUTPWD6r3-XXeyflLlD0Pa2pEcAILz8oRTLU0c1HcAdD18dAceBbPnqh1YS_j5Hs2JC7n_rnfVQff7e5WphwncUlkSTOc5YOTip_tjSt8vjC7Gd_6zWLU2GJPuGYYLcgnqIzt8IZIaR3UpFtM23QKtYS1nK9QzNlsdIEynCvJoj7jhK8F-NOzg9nMZWDEGd0pJo7WaqEuBXur_qHuRPEvflqhpjxqbDLmwwKeP2vJk094VLVDm8"
                alt="Dinnerware Collection"
                fill
                className="object-cover transition-transform duration-[2s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-heritage-navy/20 group-hover:bg-heritage-navy/30 transition-colors"></div>
              <div className="absolute bottom-10 left-10 text-porcelain-white">
                <h3 className="font-display-lg text-display-lg-mobile md:text-headline-lg mb-2">Dinnerware</h3>
                <p className="font-label-caps text-label-caps border-b border-porcelain-white pb-1 inline-block">SHOP NOW</p>
              </div>
            </Link>
            {/* Cups & Mugs */}
            <Link href="/products?category=drinkware" className="md:col-span-4 relative group overflow-hidden cursor-pointer h-[500px] block">
              <Image 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBg5HNEEm3B9ORr5c8H6Fs0MDBr9QYThhbMt8ceiPXRrmu8Fva6uPOGe-JCJgcyNrcXDEnGwHG1-3LWwHw13mlpyfwPfveQSsxvi1YfdCmXMvyHJjtolgBXzcdXofcu_A8jWetOrD6rFqBKnu7zzrh9kctC4c3fwQAs7W74QDri3VmHWy6V8IWCweehwlcistiE3lZjrA8bbo7isjGQNiNM1ELAhWHquA9WOX5_4YXdLIAOazXF3NG5UE48qow4K56lyqITuhSmnA0"
                alt="Cups & Mugs Collection"
                fill
                className="object-cover transition-transform duration-[2s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-heritage-navy/10 group-hover:bg-heritage-navy/20 transition-colors"></div>
              <div className="absolute bottom-10 left-10 text-porcelain-white">
                <h3 className="font-display-lg text-headline-md mb-2">Cups &amp; Mugs</h3>
                <p className="font-label-caps text-label-caps border-b border-porcelain-white pb-1 inline-block">EXPLORE</p>
              </div>
            </Link>
            {/* Tea Sets */}
            <Link href="/products?category=tea-set" className="md:col-span-4 relative group overflow-hidden cursor-pointer h-[500px] block">
              <Image 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC03i7C9OgwRSB5t2qO4XdWo1FiQ-Wgc4E4S8Y3-DQPNgoIVIZgPOc78cVrcTxFkspfIcQuxZ_cBAL4J50-Ln_RVEfTABCsxmT7I_RsZVFLXAr73reJCRvYlH1evM_4Lt5RyisnMJn9WzLV12_R8_IkiddYl6KPs8m8ydrxPKOKCfZu_5dV_3mPAVzfl7IPGZo8fbXJq1aC5QQ1Na7Z3ExFKGhsOPSIVnptt1PylF9vtXJCJ8v8RohubWsSme_F1nmixkF6OJaC1Xg"
                alt="Tea Sets Collection"
                fill
                className="object-cover transition-transform duration-[2s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-heritage-navy/10 group-hover:bg-heritage-navy/20 transition-colors"></div>
              <div className="absolute bottom-10 left-10 text-porcelain-white">
                <h3 className="font-display-lg text-headline-md mb-2">Tea Sets</h3>
                <p className="font-label-caps text-label-caps border-b border-porcelain-white pb-1 inline-block">SHOP TEAWARE</p>
              </div>
            </Link>
            {/* Luxury Gifting */}
            <Link href="/gifting" className="md:col-span-8 relative group overflow-hidden cursor-pointer h-[500px] block">
              <Image 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2gnGhw8lMvKB5VhqcGC0iKEJcsdjl5zMILCGfM70HJ9tnUcAZJ-3kiVo9YSyXBoYSMC7IP4PtKd6QGf4jgfi1__dyCF1d7VBwOgVV1UpnPJwSl_PLC9o5FjdpEVH89rHfPBH5NLjAEcep8cBCws48gkzmuKVR4dmU2UGjRLNkIsuWjGocnW6UuSOEt-VpqSOD35QiAwVZhpR7gZFJQfA5m6ISHssI6rM0i5DvSWsX0C-BNv3JGHwJZAbU3QBFiQdHBTFP-BRszqw"
                alt="Luxury Gifting"
                fill
                className="object-cover transition-transform duration-[2s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-heritage-navy/20 group-hover:bg-heritage-navy/30 transition-colors"></div>
              <div className="absolute bottom-10 left-10 text-porcelain-white">
                <h3 className="font-display-lg text-headline-lg mb-2">Luxury Gifting</h3>
                <p className="font-label-caps text-label-caps border-b border-porcelain-white pb-1 inline-block">GIFTING MENU</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-stack-xl bg-bone-gray px-margin-desktop">
        <div className="max-w-container-max mx-auto">
          <div className="flex justify-between items-end mb-stack-md">
            <div>
              <h2 className="font-display-lg text-headline-lg text-heritage-navy mb-2">New Arrivals</h2>
              <p className="text-on-surface-variant font-body-md">The latest additions to our artisanal library.</p>
            </div>
            <Link href="/products?sort=newest" className="font-label-caps text-label-caps text-heritage-navy underline decoration-champagne-gold underline-offset-4">
              VIEW ALL
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
            {productsNew.map((product) => <ProductCard key={`new-${product.id}`} product={product} />)}
          </div>
        </div>
      </section>

      {/* Lifestyle Section */}
      <section className="relative h-[819px] flex items-center">
        <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2">
          <div className="hidden md:block relative overflow-hidden">
            <Image 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5sOyMLVnDrSruXWNnWHydJmdGuD28oVWENEA_En23iVjN-kPAqku1x_0xotLCF8K1ZDojbN67wla2qOX6XMZmaPPqygN0QnlqAcAyAwbuTwYgw2HABXR80e_K6Xw3_sfNMaevzOj0F4ziQJuRX46cVj_JnK1y4ET0EfyLp33lPbrk6Z_m-MFTm9hqtLvdtKRETSoZLKDWuPvpgBHh98nn1hJ4IgYmO98mM3zu8hksuGdvORrrIbFIygfufGnXXR-jGPCoWCX5t_A"
              alt="The Dining Experience"
              fill
              className="object-cover"
            />
          </div>
          <div className="bg-heritage-navy flex flex-col justify-center px-12 md:px-24">
            <span className="font-label-caps text-label-caps text-champagne-gold tracking-[0.3em] mb-6">SIPHORAHQ PHILOSOPHY</span>
            <h2 className="font-display-lg text-display-lg-mobile md:text-headline-lg text-porcelain-white mb-8">More Than Utensils — A Dining Experience</h2>
            <p className="text-porcelain-white/80 font-body-lg mb-10 leading-relaxed">
              Siphorahq was created to bring timeless elegance to modern homes. We believe that every meal is a meaningful moment, and the tableware you use should reflect the beauty of those shared experiences. 
            </p>
            <p className="text-porcelain-white/80 font-body-lg mb-12 leading-relaxed">
              From our handcrafted porcelain to our meticulous detailing, every piece is designed to be cherished for generations.
            </p>
            <Link href="/about" className="inline-flex items-center text-champagne-gold font-label-caps text-label-caps group">
              DISCOVER OUR STORY 
              <span className="material-symbols-outlined ml-2 transition-transform group-hover:translate-x-2">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-stack-xl px-margin-desktop max-w-4xl mx-auto">
        <h2 className="font-display-lg text-headline-lg text-heritage-navy text-center mb-stack-lg">Why Choose Siphorahq?</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-bone-gray">
                <th className="py-6 text-left font-label-caps text-label-caps text-on-surface-variant">FEATURES</th>
                <th className="py-6 text-center font-label-caps text-label-caps text-heritage-navy bg-bone-gray/30">SIPHORAHQ</th>
                <th className="py-6 text-center font-label-caps text-label-caps text-on-surface-variant">LOCAL MARKET</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-bone-gray/50">
                <td className="py-6 font-body-md text-heritage-navy font-semibold">Premium Finish</td>
                <td className="py-6 text-center text-champagne-gold"><span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span></td>
                <td className="py-6 text-center text-on-surface-variant"><span className="material-symbols-outlined">cancel</span></td>
              </tr>
              <tr className="border-b border-bone-gray/50">
                <td className="py-6 font-body-md text-heritage-navy font-semibold">Gift Ready Packaging</td>
                <td className="py-6 text-center text-champagne-gold"><span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span></td>
                <td className="py-6 text-center text-on-surface-variant"><span className="material-symbols-outlined">cancel</span></td>
              </tr>
              <tr className="border-b border-bone-gray/50">
                <td className="py-6 font-body-md text-heritage-navy font-semibold">Bone China Quality</td>
                <td className="py-6 text-center text-champagne-gold"><span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span></td>
                <td className="py-6 text-center text-on-surface-variant"><span className="material-symbols-outlined">error</span></td>
              </tr>
              <tr>
                <td className="py-6 font-body-md text-heritage-navy font-semibold">Design Exclusivity</td>
                <td className="py-6 text-center text-champagne-gold"><span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span></td>
                <td className="py-6 text-center text-on-surface-variant"><span className="material-symbols-outlined">cancel</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-stack-xl bg-bone-gray/30 px-margin-desktop overflow-hidden">
        <div className="max-w-container-max mx-auto">
          <div className="text-center mb-stack-lg">
            <h2 className="font-display-lg text-headline-lg text-heritage-navy mb-2">Real Stories</h2>
            <div className="flex justify-center items-center gap-2 text-champagne-gold mb-4">
              {[1,2,3,4,5].map(star => <span key={star} className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>star</span>)}
              <span className="text-heritage-navy font-label-caps ml-2">4.8/5 STARS — TRUSTED BY 2,500+ HOMES</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Review 1 */}
            <div className="bg-porcelain-white p-8 rounded-lg shadow-[0_10px_30px_-10px_rgba(26,42,58,0.08)] animate-[reveal_0.8s_ease_forwards]">
              <div className="flex gap-1 text-champagne-gold mb-4">
                {[1,2,3,4,5].map(star => <span key={star} className="material-symbols-outlined !text-sm" style={{fontVariationSettings: "'FILL' 1"}}>star</span>)}
              </div>
              <p className="font-body-md italic mb-6">"The quality of the porcelain is absolutely breathtaking. It completely transformed our dinner parties. Siphorahq truly understands luxury."</p>
              <div className="flex items-center gap-4">
                <Image width={48} height={48} alt="Anjali M." className="w-12 h-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsT344idLRvpmQa7x6iEDf4AZeqq5GnVu--1ed8AYiXZJQcWzi-4B6KuE1hw6jg6Otv0QmeVpk1Zldwh2rMA72nA1JFvnyjAWok1zA6P2dShMwxw3BroYkSrbuhCmiMymyN3udG7NADaAxv04vGAAYnP6F8rmjNMA0Hg2tAmuV0KrxzmIE8BoiyaxiZtjKdBddY6SqgeM9FUiBF2uen6Sh8qFcGCCvM27PPG7lTjiQsO9Huhnml6DcbiQzefJSKS3JqhB2gBi0YEA" />
                <div>
                  <p className="font-label-caps text-label-caps text-heritage-navy">ANJALI M.</p>
                  <p className="text-[10px] text-on-surface-variant">VERIFIED BUYER</p>
                </div>
              </div>
            </div>
            {/* Review 2 */}
            <div className="bg-porcelain-white p-8 rounded-lg shadow-[0_10px_30px_-10px_rgba(26,42,58,0.08)] animate-[reveal_0.8s_ease_forwards]">
              <div className="flex gap-1 text-champagne-gold mb-4">
                {[1,2,3,4,5].map(star => <span key={star} className="material-symbols-outlined !text-sm" style={{fontVariationSettings: "'FILL' 1"}}>star</span>)}
              </div>
              <p className="font-body-md italic mb-6">"Gifted a set to my sister for her wedding. The packaging itself was a statement. Highly recommend for special occasions."</p>
              <div className="flex items-center gap-4">
                <Image width={48} height={48} alt="Rahul S." className="w-12 h-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJyUDSRPJA5RdLBMi4cH9Pxnodh-fM5oA2qis6Z9QQZlPuXxEwnlishzqK01W37PeNqmVuvzWVL5YpELWfGYOgX7Nkq2Yy42LWOLSvP_ln_QzaEi9NvugqweWUJosw3V_TIcPJsUxMMZ8JCvAomAEffpgxahoYVvcZG4-VgZI7hGpOb87tEfTx_pv9OuCchq4wAUxIXREXhGkKfLewmNvAQpZOA3_qYq35GFFQD4HhGTJHO4wficjbAotA-8KS1UpYgbhK6asSoAY" />
                <div>
                  <p className="font-label-caps text-label-caps text-heritage-navy">RAHUL S.</p>
                  <p className="text-[10px] text-on-surface-variant">VERIFIED BUYER</p>
                </div>
              </div>
            </div>
            {/* Review 3 */}
            <div className="bg-porcelain-white p-8 rounded-lg shadow-[0_10px_30px_-10px_rgba(26,42,58,0.08)] animate-[reveal_0.8s_ease_forwards]">
              <div className="flex gap-1 text-champagne-gold mb-4">
                {[1,2,3,4,5].map(star => <span key={star} className="material-symbols-outlined !text-sm" style={{fontVariationSettings: "'FILL' 1"}}>star</span>)}
              </div>
              <p className="font-body-md italic mb-6">"Fast delivery and exceptional customer support. One cup arrived chipped and they replaced it within 48 hours. Phenomenal service."</p>
              <div className="flex items-center gap-4">
                <Image width={48} height={48} alt="Priya K." className="w-12 h-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5QNlOWlOmBxwcJlN9vjAJBnUWR2c7WQi6_e1zV9ildXSEtEIkDTIGEBt7mXj__z5i-4BBF5n3v2v-UkaViK9oloKRUh0y4fRl8oeP1TpUMbXCqKgCq0iYgkSm_922amg2-UohGbZdJFVdRITf9li4jv0kpjq1Oi6CtpdhaF-pPtHYuw-AH83oCE8VyAPnmj3bxuw7FX_pvjkyzEEqfRGXhpvmyBBwMfpo-kRFukLFZONDPB-k64rRqvzyfn54FO2U92C0Abmh4WM" />
                <div>
                  <p className="font-label-caps text-label-caps text-heritage-navy">PRIYA K.</p>
                  <p className="text-[10px] text-on-surface-variant">VERIFIED BUYER</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seen In */}
      <section className="py-12 px-margin-desktop border-y border-bone-gray">
        <div className="max-w-container-max mx-auto flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all">
          <span className="font-display-lg text-headline-md italic">Architectural Digest</span>
          <span className="font-display-lg text-headline-md italic">Elle Decor</span>
          <span className="font-display-lg text-headline-md italic">Vogue Home</span>
          <span className="font-display-lg text-headline-md italic">Better Homes</span>
        </div>
      </section>
    </main>
  );
}

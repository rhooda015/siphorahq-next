export const STATIC_PRODUCTS = [
  {
    id: 'premium-dinner-set-46',
    name: 'Siphorahq 46-Piece Dinner Set | Aesthetic Gold Pattern',
    price: 35000,
    salePrice: 25500,
    category: 'dinner-set',
    tag: 'gifts',
    image: '/images/dinnerware.png',
    badge: 'Bestseller',
    reviews: 4.8,
    reviewCount: 124,
    description: 'Crafted from the finest bone china porcelain, this 46-piece dinner set features a timeless baroque gold pattern. It perfectly balances aesthetic appeal with exceptional durability.',
    care: 'Hand wash recommended. Do not use abrasive scrubbers. Not microwave safe due to real gold accents.'
  },
  {
    id: 'premium-tea-set-17',
    name: 'Siphorahq Blue Rose Tea Set of 17 Pcs',
    price: 12000,
    salePrice: 8500,
    category: 'tea-set',
    tag: 'gifts',
    image: '/images/teaset.png',
    badge: 'New Arrival',
    reviews: 4.9,
    reviewCount: 86,
    description: 'A luxurious 17-piece tea set adorned with elegant blue rose motifs. Perfect for hosting high tea and elevating your daily rituals.',
    care: 'Dishwasher safe on gentle cycle. Microwave safe.'
  },
  {
    id: 'leatherette-serving-tray',
    name: 'Siphorahq Premium Serving Tray Set of 2',
    price: 5000,
    salePrice: 3600,
    category: 'serveware',
    tag: '',
    image: '/images/prod1.png',
    badge: '',
    reviews: 4.5,
    reviewCount: 42,
    description: 'A set of 2 premium leatherette serving trays with gold handles, offering a sophisticated way to serve drinks and snacks.',
    care: 'Wipe clean with a damp cloth. Do not submerge in water.'
  },
  {
    id: 'designer-gift-box',
    name: 'Siphorahq Designer Gift Box',
    price: 6500,
    salePrice: 5000,
    category: 'gifting',
    tag: 'gifts',
    image: '/images/prod2.png',
    badge: 'Popular',
    reviews: 5.0,
    reviewCount: 210,
    description: 'The ultimate luxury gift box featuring handpicked porcelain pieces, beautifully packaged with a ribbon and premium gift tag.',
    care: 'Keep packaging dry.'
  },
  {
    id: 'luxury-bowl-set',
    name: 'Siphorahq Premium Serving Bowl Set of 3',
    price: 3000,
    salePrice: 2200,
    category: 'serveware',
    tag: '',
    image: '/images/serveware.png',
    badge: '',
    reviews: 4.7,
    reviewCount: 55,
    description: 'Three versatile serving bowls featuring a minimalist white glaze and subtle gold rims.',
    care: 'Hand wash recommended to preserve the gold rim.'
  },
  {
    id: 'opal-glass-dinner-set',
    name: 'Beautiful Translucent Opal Glass Dinnerware',
    price: 24000,
    salePrice: 18000,
    category: 'dinner-set',
    tag: '',
    image: '/images/cat_opalglass.png',
    badge: '',
    reviews: 4.6,
    reviewCount: 93,
    description: 'Ultra-lightweight yet highly durable translucent opal glass dinnerware for an ethereal dining aesthetic.',
    care: 'Dishwasher and microwave safe.'
  },
  {
    id: 'porcelain-side-plates',
    name: 'Luxury Porcelain Dinner Plates (Set of 6)',
    price: 6000,
    salePrice: 4500,
    category: 'plates',
    tag: '',
    image: '/images/cat_plates.png',
    badge: '',
    reviews: 4.8,
    reviewCount: 112,
    description: 'Set of 6 pure white luxury porcelain dinner plates. Scratch-resistant and perfect for everyday elegance.',
    care: 'Dishwasher and microwave safe.'
  },
  {
    id: 'coffee-mugs-gold',
    name: 'Luxury White & Gold Floral Coffee Mugs',
    price: 2500,
    salePrice: 1800,
    category: 'mugs',
    tag: '',
    image: '/images/cat_mugs.png',
    badge: '',
    reviews: 4.9,
    reviewCount: 245,
    description: 'Start your morning with poetry. These floral coffee mugs are finished with 24k gold detailing.',
    care: 'Hand wash only. Not microwave safe.'
  }
];

export function getProductById(id: string) {
  return STATIC_PRODUCTS.find(product => product.id === id) || null;
}

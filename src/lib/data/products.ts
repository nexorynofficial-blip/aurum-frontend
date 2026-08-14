import { Product, ProductVariantGroup, ProductDetailSection } from '@/types';
import { PLACEHOLDER } from '@/lib/constants';

// One image per product. Categories with supplied assets are mapped below;
// timepieces & objects fall back to a single placeholder.
const img = [PLACEHOLDER];

const sizeVariant = (): ProductVariantGroup => ({
  name: 'Size',
  type: 'chip',
  options: ['48', '50', '52', '54', '56'].map((v) => ({
    label: v,
    value: v,
    available: v !== '48',
  })),
});

const metalVariant = (): ProductVariantGroup => ({
  name: 'Metal',
  type: 'swatch',
  options: [
    { label: 'Yellow Gold', value: 'yellow-gold', swatch: '#C7A34E' },
    { label: 'White Gold', value: 'white-gold', swatch: '#D9D9D6' },
    { label: 'Rose Gold', value: 'rose-gold', swatch: '#C98F79' },
  ],
});

const commonDetails = (
  material: string,
  extra: ProductDetailSection[] = []
): ProductDetailSection[] => [
  {
    title: 'Craftsmanship',
    body: 'Modelled, cast and finished entirely within our atelier. Each piece passes through the hands of a single master before it is hallmarked, so no two are ever quite identical.',
  },
  {
    title: 'Materials',
    body: `Struck in ${material}, responsibly sourced and fully traceable to origin. Stones, where present, are selected individually for cut and clarity.`,
  },
  ...extra,
  {
    title: 'Shipping & Care',
    body: 'Delivered insured in our signature lacquered case with a certificate of authenticity. Complimentary lifetime cleaning and servicing at any AURUM atelier.',
  },
  {
    title: 'Returns',
    body: 'Unworn pieces may be returned within 30 days for exchange or credit. Engraved and bespoke commissions are final sale.',
  },
];

export const products: Product[] = [
  // ---------------- RINGS ----------------
  {
    id: 'p-aurum-signet',
    sku: 'AU-1101',
    name: 'Aurum Signet',
    slug: 'aurum-signet',
    description:
      'A weighted signet in solid gold, its face left plain for engraving or worn simply as it is.',
    story:
      'The signet is the oldest object in our repertoire — a seal, a signature, a mark of belonging. Ours is turned from a single ingot and finished with a soft satin face that catches light without shouting for it.',
    price: 3200,
    images: img,
    category: 'rings',
    material: 'Yellow Gold',
    color: 'gold',
    stoneType: 'None',
    weightGrams: 12.4,
    stock: 6,
    availability: 'in-stock',
    isNew: true,
    collections: ['rings', 'archive'],
    variants: [metalVariant(), sizeVariant()],
    details: commonDetails('18-karat yellow gold', [
      {
        title: 'Engraving',
        body: 'Hand-engraving is offered at no charge — a monogram, coordinate or date, cut by our engraver in a serif of your choosing.',
      },
    ]),
  },
  {
    id: 'p-solstice-solitaire',
    sku: 'AU-1108',
    name: 'Solstice Solitaire',
    slug: 'solstice-solitaire',
    description:
      'A 1.4-carat brilliant held in a fine four-claw setting above a knife-edge band.',
    story:
      'Restraint is the whole idea. A single stone, lifted just enough to let light travel beneath it, on a band drawn so thin it nearly disappears against the skin.',
    price: 9800,
    images: img,
    category: 'rings',
    material: 'Platinum',
    color: 'white',
    stoneType: 'Diamond',
    weightGrams: 4.1,
    stock: 2,
    availability: 'limited',
    collections: ['rings', 'bridal'],
    variants: [sizeVariant()],
    details: commonDetails('950 platinum', [
      {
        title: 'The Stone',
        body: 'A GIA-certified brilliant, F colour, VS1 clarity, cut to ideal proportions for maximum return of light.',
      },
    ]),
  },
  {
    id: 'p-meridian-band',
    sku: 'AU-1115',
    name: 'Meridian Band',
    slug: 'meridian-band',
    description:
      'A wide court-profile band with a brushed centre and polished edges.',
    price: 1650,
    images: img,
    category: 'rings',
    material: 'White Gold',
    color: 'white',
    stoneType: 'None',
    weightGrams: 7.8,
    stock: 10,
    availability: 'in-stock',
    collections: ['rings', 'bridal'],
    variants: [metalVariant(), sizeVariant()],
    details: commonDetails('18-karat white gold'),
  },

  // ---------------- NECKLACES ----------------
  {
    id: 'p-thread-pendant',
    sku: 'AU-2203',
    name: 'Thread Pendant',
    slug: 'thread-pendant',
    description:
      'A single graduated diamond suspended on a whisper-fine cable chain.',
    story:
      'Named for our house signature — the gold thread. A lone stone travels the neckline, catching light with the smallest movement.',
    price: 2400,
    images: img,
    category: 'necklaces',
    material: 'Yellow Gold',
    color: 'gold',
    stoneType: 'Diamond',
    weightGrams: 2.2,
    stock: 8,
    availability: 'in-stock',
    isNew: true,
    collections: ['necklaces'],
    variants: [metalVariant()],
    details: commonDetails('18-karat yellow gold'),
  },
  {
    id: 'p-cascade-necklace',
    sku: 'AU-2210',
    name: 'Cascade Necklace',
    slug: 'cascade-necklace',
    description:
      'An articulated collar of graduated links that falls like liquid metal.',
    story:
      'Forty-one links, each individually cast and hand-assembled, engineered to move as one continuous ribbon around the throat.',
    price: 12600,
    images: img,
    category: 'necklaces',
    material: 'Yellow Gold',
    color: 'gold',
    stoneType: 'None',
    weightGrams: 48.0,
    stock: 1,
    availability: 'limited',
    collections: ['necklaces', 'archive'],
    details: commonDetails('18-karat yellow gold'),
  },
  {
    id: 'p-sable-sautoir',
    sku: 'AU-2218',
    name: 'Sable Sautoir',
    slug: 'sable-sautoir',
    description:
      'A long onyx and gold sautoir that may be worn doubled or full length.',
    price: 4300,
    images: img,
    category: 'necklaces',
    material: 'Yellow Gold',
    color: 'black',
    stoneType: 'None',
    weightGrams: 22.5,
    stock: 4,
    availability: 'in-stock',
    collections: ['necklaces'],
    details: commonDetails('18-karat yellow gold and onyx'),
  },

  // ---------------- EARRINGS ----------------
  {
    id: 'p-eclipse-studs',
    sku: 'AU-3302',
    name: 'Eclipse Studs',
    slug: 'eclipse-studs',
    description: 'Domed studs in polished gold — the quietest possible statement.',
    price: 980,
    images: img,
    category: 'earrings',
    material: 'Rose Gold',
    color: 'rose',
    stoneType: 'None',
    weightGrams: 3.0,
    stock: 14,
    availability: 'in-stock',
    collections: ['earrings'],
    variants: [metalVariant()],
    details: commonDetails('18-karat rose gold'),
  },
  {
    id: 'p-lumen-drops',
    sku: 'AU-3309',
    name: 'Lumen Drops',
    slug: 'lumen-drops',
    description:
      'Elongated drops set with a line of pavé diamonds that taper to a point.',
    story:
      'Movement is the luxury here. The drops swing a few degrees with the turn of a head, scattering light along the jaw.',
    price: 5600,
    images: img,
    category: 'earrings',
    material: 'White Gold',
    color: 'white',
    stoneType: 'Diamond',
    weightGrams: 5.4,
    stock: 3,
    availability: 'limited',
    isNew: true,
    collections: ['earrings'],
    details: commonDetails('18-karat white gold'),
  },
  {
    id: 'p-arc-hoops',
    sku: 'AU-3315',
    name: 'Arc Hoops',
    slug: 'arc-hoops',
    description: 'Substantial tubular hoops with a hidden hinged closure.',
    price: 1450,
    images: img,
    category: 'earrings',
    material: 'Yellow Gold',
    color: 'gold',
    stoneType: 'None',
    weightGrams: 6.8,
    stock: 9,
    availability: 'in-stock',
    collections: ['earrings'],
    variants: [metalVariant()],
    details: commonDetails('18-karat yellow gold'),
  },

  // ---------------- BRACELETS ----------------
  {
    id: 'p-monolith-cuff',
    sku: 'AU-4401',
    name: 'Monolith Cuff',
    slug: 'monolith-cuff',
    description:
      'A sculptural open cuff turned from a solid block of gold, satin-finished.',
    story:
      'Deliberately architectural — a single unbroken plane of metal that opens just enough to slip over the wrist and closes to a whisper of a gap.',
    price: 7400,
    images: img,
    category: 'bracelets',
    material: 'Yellow Gold',
    color: 'gold',
    stoneType: 'None',
    weightGrams: 41.0,
    stock: 2,
    availability: 'limited',
    collections: ['bracelets', 'archive'],
    details: commonDetails('18-karat yellow gold'),
  },
  {
    id: 'p-tether-chain',
    sku: 'AU-4408',
    name: 'Tether Chain Bracelet',
    slug: 'tether-chain-bracelet',
    description: 'A flat curb-link chain with a signature engraved toggle.',
    price: 2100,
    images: img,
    category: 'bracelets',
    material: 'White Gold',
    color: 'white',
    stoneType: 'None',
    weightGrams: 16.2,
    stock: 7,
    availability: 'in-stock',
    isNew: true,
    collections: ['bracelets'],
    variants: [metalVariant()],
    details: commonDetails('18-karat white gold'),
  },
  {
    id: 'p-halo-bangle',
    sku: 'AU-4414',
    name: 'Halo Bangle',
    slug: 'halo-bangle',
    description: 'A slim, perfectly round bangle set with a single flush diamond.',
    price: 1900,
    images: img,
    category: 'bracelets',
    material: 'Rose Gold',
    color: 'rose',
    stoneType: 'Diamond',
    weightGrams: 9.1,
    stock: 5,
    availability: 'in-stock',
    collections: ['bracelets'],
    variants: [metalVariant()],
    details: commonDetails('18-karat rose gold'),
  },

  // ---------------- TIMEPIECES ----------------
  {
    id: 'p-atelier-automatic',
    sku: 'AU-5501',
    name: 'Atelier Automatic',
    slug: 'atelier-automatic',
    description:
      'A 38mm mechanical dress watch with an in-house movement and lacquered dial.',
    story:
      'Three years in development. A slim automatic calibre visible through a sapphire case-back, cased in a 38mm form that reads equally at a desk or under a cuff.',
    price: 18500,
    images: img,
    category: 'timepieces',
    material: 'Platinum',
    color: 'white',
    stoneType: 'None',
    weightGrams: 96.0,
    stock: 1,
    availability: 'limited',
    collections: ['timepieces', 'archive'],
    details: commonDetails('950 platinum with sapphire crystal', [
      {
        title: 'Movement',
        body: 'Calibre A.01 — automatic, 4Hz, 72-hour power reserve, finished with Côtes de Genève and hand-bevelled bridges.',
      },
    ]),
  },
  {
    id: 'p-meridian-chronometer',
    sku: 'AU-5508',
    name: 'Meridian Chronometer',
    slug: 'meridian-chronometer',
    description:
      'A certified chronometer in steel and gold on an integrated bracelet.',
    price: 14200,
    images: img,
    category: 'timepieces',
    material: 'Yellow Gold',
    color: 'gold',
    stoneType: 'None',
    weightGrams: 132.0,
    stock: 2,
    availability: 'limited',
    isNew: true,
    collections: ['timepieces'],
    details: commonDetails('steel and 18-karat gold', [
      {
        title: 'Movement',
        body: 'COSC-certified automatic, accurate to −4/+6 seconds per day, with a 60-hour reserve.',
      },
    ]),
  },

  // ---------------- OBJECTS ----------------
  {
    id: 'p-desk-seal',
    sku: 'AU-6601',
    name: 'Desk Seal',
    slug: 'desk-seal',
    description:
      'A weighted brass and gold wax seal for correspondence, engraved to order.',
    price: 720,
    images: img,
    category: 'objects',
    material: 'Titanium',
    color: 'gold',
    stoneType: 'None',
    weightGrams: 140.0,
    stock: 12,
    availability: 'in-stock',
    collections: ['objects'],
    details: commonDetails('brass with gold inlay'),
  },
  {
    id: 'p-vanity-tray',
    sku: 'AU-6608',
    name: 'Vanity Tray',
    slug: 'vanity-tray',
    description:
      'A hand-spun tray in brushed metal to hold the pieces you remove each night.',
    price: 540,
    images: img,
    category: 'objects',
    material: 'Sterling Silver',
    color: 'silver',
    stoneType: 'None',
    weightGrams: 220.0,
    stock: 15,
    availability: 'in-stock',
    isNew: true,
    collections: ['objects'],
    details: commonDetails('sterling silver'),
  },
  {
    id: 'p-monocle-loupe',
    sku: 'AU-6614',
    name: 'Collector’s Loupe',
    slug: 'collectors-loupe',
    description:
      'A 10× jeweller’s loupe in a folding gold case — the collector’s companion.',
    price: 890,
    images: img,
    category: 'objects',
    material: 'Yellow Gold',
    color: 'gold',
    stoneType: 'None',
    weightGrams: 55.0,
    stock: 6,
    availability: 'in-stock',
    collections: ['objects', 'archive'],
    details: commonDetails('18-karat gold-plated brass'),
  },
];

/* ---------------- Product imagery ---------------- */
// One cover image per product — category assets map one-to-one to the products
// in that category. Used everywhere the product appears (cards, detail gallery,
// cart, wishlist, search, related, recently viewed).
const CATEGORY_IMAGES: Record<string, string[]> = {
  rings: ['/images/ring-1.png', '/images/ring-2.png', '/images/ring-3.png'],
  necklaces: [
    '/images/necklace-1.png',
    '/images/necklace-2.png',
    '/images/necklace-3.png',
  ],
  bracelets: [
    '/images/bracelet-1.png',
    '/images/bracelet-2.png',
    '/images/bracelet-3.png',
  ],
  earrings: [
    '/images/earring-1.png',
    '/images/earring-2.png',
    '/images/earring-3.png',
  ],
  timepieces: ['/images/timepiece-1.png', '/images/timepiece-2.png'],
  objects: [
    '/images/object-1.png',
    '/images/object-2.png',
    '/images/object-3.png',
  ],
};

const categoryCursor: Record<string, number> = {};
for (const product of products) {
  const set = CATEGORY_IMAGES[product.category];
  if (!set) continue;
  const index = categoryCursor[product.category] ?? 0;
  categoryCursor[product.category] = index + 1;
  // Exactly one cover image per product.
  product.images = [set[index % set.length]];
}

// Keep displayed inventory realistic — a single-digit count for every piece.
for (const product of products) {
  if (product.stock >= 10) product.stock = (product.stock % 9) + 1;
}

/* ---------------- Query helpers ---------------- */

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'all') return products;
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(count = 8): Product[] {
  return products.filter((p) => p.isNew).slice(0, count);
}

export function getEditorsPicks(count = 3): Product[] {
  return [
    'solstice-solitaire',
    'cascade-necklace',
    'atelier-automatic',
  ]
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is Product => Boolean(p))
    .slice(0, count);
}

export function getRelatedProducts(product: Product, count = 4): Product[] {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .concat(products.filter((p) => p.category !== product.category))
    .slice(0, count);
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.material.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q)
  );
}

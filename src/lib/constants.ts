/** Single placeholder asset used site-wide until final media is delivered. */
export const PLACEHOLDER = '/images/placeholder.jpg';

export const SITE = {
  name: 'AURUM',
  tagline: 'Objects of quiet permanence.',
  description:
    'AURUM is a private atelier of fine jewellery, timepieces and objets — crafted in limited number, held to standards without compromise.',
  email: 'atelier@aurum.luxury',
  phone: '+1 (212) 555 0140',
  address: '17 Rue de la Paix · New York · Genève',
  founded: 1926,
} as const;

/** Primary navigation (§16). */
export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Collections', href: '/collections' },
  { label: 'Shop', href: '/collections/all' },
  { label: 'About', href: '/about' },
  { label: 'Journal', href: '/journal' },
] as const;

export const FILTER_MATERIALS = [
  'Yellow Gold',
  'White Gold',
  'Rose Gold',
  'Platinum',
  'Sterling Silver',
  'Titanium',
] as const;

export const FILTER_STONES = [
  'Diamond',
  'Sapphire',
  'Emerald',
  'Ruby',
  'Pearl',
  'None',
] as const;

export const PRICE_RANGES = [
  { label: 'Under $2,500', min: 0, max: 2500 },
  { label: '$2,500 – $5,000', min: 2500, max: 5000 },
  { label: '$5,000 – $10,000', min: 5000, max: 10000 },
  { label: '$10,000 & above', min: 10000, max: Infinity },
] as const;

export const SORT_OPTIONS = [
  { label: 'Curated', value: 'curated' },
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
] as const;

export const SHIPPING_METHODS = [
  {
    id: 'standard',
    name: 'Signature Delivery',
    description: 'Insured · 5–7 business days',
    cost: 0,
  },
  {
    id: 'express',
    name: 'Private Courier',
    description: 'Insured · hand-delivered · 2–3 business days',
    cost: 65,
  },
] as const;

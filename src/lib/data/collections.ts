import { Collection } from '@/types';

export const collections: Collection[] = [
  {
    slug: 'rings',
    name: 'Rings',
    tagline: 'Signets, solitaires & bands',
    description:
      'A circle without beginning — our rings are conceived as heirlooms, set by hand and finished to survive generations.',
    image: '/images/rings-updated.png',
  },
  {
    slug: 'necklaces',
    name: 'Necklaces',
    tagline: 'Pendants & chains',
    description:
      'Weighted, articulated, and drawn to fall exactly. Each chain is assembled link by link in our atelier.',
    image: '/images/necklace-updated.png',
  },
  {
    slug: 'earrings',
    name: 'Earrings',
    tagline: 'Studs, drops & hoops',
    description:
      'Considered proportion and quiet movement. Designed to be worn from morning to midnight.',
    image: '/images/earrings-updated.png',
  },
  {
    slug: 'bracelets',
    name: 'Bracelets',
    tagline: 'Cuffs & bangles',
    description:
      'Sculptural forms in solid metal — the reassuring weight of something made properly.',
    image: '/images/bracelet-1.png',
  },
  {
    slug: 'timepieces',
    name: 'Timepieces',
    tagline: 'Mechanical watches',
    description:
      'Mechanical measures of time, cased in precious metal. Precision as a discipline, not a feature.',
    image: '/images/timepiece-1.png',
  },
  {
    slug: 'objects',
    name: 'Objects',
    tagline: 'Objets for the interior',
    description:
      'Desk and vanity objects turned from the same materials as our jewellery — useful, and made to last.',
    image: '/images/object-1.png',
  },
];

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

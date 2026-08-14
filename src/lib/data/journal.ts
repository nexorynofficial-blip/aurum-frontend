import { JournalPost, Testimonial } from '@/types';

export const journalPosts: JournalPost[] = [
  {
    slug: 'the-weight-of-gold',
    title: 'The Weight of Gold',
    excerpt:
      'Why we cast solid, never plate — and what a few extra grams say about intention.',
    category: 'Craft',
    readTime: 6,
    date: '2026-06-28',
    image: '/images/journal-weight-of-gold.png',
    author: 'Hélène Marchetti',
    body: [
      'There is a moment, when you first hold a piece of solid gold, where the object corrects an assumption. It is heavier than the eye promised. That correction is the whole argument for how we work.',
      'Plating is a shortcut dressed as a finish. It photographs identically and behaves entirely differently — wearing thin at the edges within a season, revealing the base metal beneath. We have never made a plated object and we never will.',
      'To cast solid is to accept cost and permanence in equal measure. The metal you buy is the metal you keep. It can be melted, re-worked, passed down, and it will still be gold in a hundred years.',
    ],
  },
  {
    slug: 'a-conversation-with-our-engraver',
    title: 'A Conversation With Our Engraver',
    excerpt:
      'Forty years, one graver, and the case for cutting a monogram by hand.',
    category: 'Atelier',
    readTime: 8,
    date: '2026-06-12',
    image: '/images/journal-engraver.png',
    author: 'The Editors',
    body: [
      'Marco has engraved for AURUM since before most of our clients were born. His bench faces a north window — the only light, he insists, that tells the truth about a cut.',
      'Machine engraving is faster and flawless, which is precisely its problem. A hand-cut letter carries the almost imperceptible variation of a person, and that variation is what the eye reads as warmth.',
    ],
  },
  {
    slug: 'on-buying-less',
    title: 'On Buying Less',
    excerpt:
      'A quiet manifesto for the single considered object over the many forgettable ones.',
    category: 'Philosophy',
    readTime: 5,
    date: '2026-05-30',
    image: '/images/journal-buying-less.png',
    author: 'Hélène Marchetti',
    body: [
      'The most sustainable object is the one you never replace. Our entire practice is organised around that single, unfashionable idea.',
    ],
  },
  {
    slug: 'the-anatomy-of-a-setting',
    title: 'The Anatomy of a Setting',
    excerpt:
      'How four slender claws hold a stone still while letting light move through it.',
    category: 'Craft',
    readTime: 7,
    date: '2026-05-14',
    image: '/images/journal-anatomy.png',
    author: 'The Editors',
    body: [
      'A setting has one impossible job: to hold a stone absolutely still while appearing to barely touch it at all.',
    ],
  },
];

export function getPost(slug: string): JournalPost | undefined {
  return journalPosts.find((p) => p.slug === slug);
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'The signet arrived in a case I have kept. It is the first piece I have owned that I intend to leave to someone.',
    author: 'Alexandra R.',
    location: 'New York',
  },
  {
    quote:
      'Nothing about the experience felt like shopping. It felt like being received.',
    author: 'Marcus D.',
    location: 'Los Angeles',
  },
  {
    quote:
      'I researched for a year before buying. The quality exceeded even a year of expectation.',
    author: 'Yuki T.',
    location: 'London',
  },
];

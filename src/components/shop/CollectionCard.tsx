import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Collection } from '@/types';
import { cn } from '@/lib/utils';

interface CollectionCardProps {
  collection: Collection;
  ratio?: 'portrait' | 'landscape' | 'square';
  priority?: boolean;
  className?: string;
}

const ratios = {
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
  square: 'aspect-square',
};

export function CollectionCard({
  collection,
  ratio = 'portrait',
  priority,
  className,
}: CollectionCardProps) {
  return (
    <Link
      href={`/collections/${collection.slug}`}
      className={cn('group relative block overflow-hidden rounded-image', className)}
    >
      <div className={cn('relative bg-charcoal', ratios[ratio])}>
        <Image
          src={collection.image}
          alt={collection.name}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-900 ease-luxe group-hover:scale-105"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-obsidian/10 to-transparent"
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-8">
        <div>
          <p className="font-mono text-micro uppercase tracking-luxe text-brass">
            {collection.tagline}
          </p>
          <h3 className="mt-2 font-display text-h3 font-light text-ivory">
            {collection.name}
          </h3>
        </div>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ivory/30 text-ivory transition-all duration-350 ease-luxe group-hover:border-brass group-hover:bg-brass group-hover:text-obsidian">
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </div>
    </Link>
  );
}

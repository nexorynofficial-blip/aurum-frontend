import Image from 'next/image';
import Link from 'next/link';
import { JournalPost } from '@/types';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface JournalCardProps {
  post: JournalPost;
  featured?: boolean;
  className?: string;
}

export function JournalCard({ post, featured, className }: JournalCardProps) {
  return (
    <article className={cn('group', className)}>
      <Link href={`/journal/${post.slug}`} className="block">
        <div
          className={cn(
            'media-zoom relative overflow-hidden rounded-image bg-charcoal',
            featured ? 'aspect-[16/10]' : 'aspect-[4/3]'
          )}
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes={featured ? '100vw' : '(max-width: 768px) 100vw, 33vw'}
            className="object-cover"
          />
        </div>
        <div className="mt-6 flex items-center gap-4 font-mono text-micro uppercase tracking-luxe text-brass">
          <span>{post.category}</span>
          <span className="text-stone">·</span>
          <span className="text-stone">{post.readTime} min read</span>
        </div>
        <h3
          className={cn(
            'mt-4 font-display font-light leading-tight text-ivory transition-colors duration-220 group-hover:text-brass',
            featured ? 'text-h2' : 'text-h4'
          )}
        >
          {post.title}
        </h3>
        <p className="mt-3 max-w-prose font-body text-body text-stone">
          {post.excerpt}
        </p>
        <p className="mt-4 font-body text-caption text-stone/70">
          {post.author} · {formatDate(post.date)}
        </p>
      </Link>
    </article>
  );
}

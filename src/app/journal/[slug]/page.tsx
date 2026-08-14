import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { JournalCard } from '@/components/journal/JournalCard';
import { SectionHeading } from '@/components/common/SectionHeading';
import { journalPosts, getPost } from '@/lib/data/journal';
import { formatDate } from '@/lib/utils';

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return journalPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getPost(params.slug);
  if (!post) return { title: 'Not found' };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: 'article' },
  };
}

export default function JournalPostPage({ params }: PageProps) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const more = journalPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <article>
      {/* Header */}
      <div className="shell py-12 md:py-16">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Journal', href: '/journal' },
            { label: post.title },
          ]}
        />
        <div className="mx-auto mt-12 max-w-3xl text-center">
          <div className="flex items-center justify-center gap-4 font-mono text-micro uppercase tracking-luxe text-brass">
            <span>{post.category}</span>
            <span className="text-stone">·</span>
            <span className="text-stone">{post.readTime} min read</span>
          </div>
          <h1 className="mt-6 font-display text-h1 font-light leading-tight text-ivory md:text-hero">
            {post.title}
          </h1>
          <p className="mt-8 font-body text-caption text-stone">
            {post.author} · {formatDate(post.date)}
          </p>
        </div>
      </div>

      {/* Lead image */}
      <div className="shell">
        <div className="relative aspect-[16/9] overflow-hidden rounded-image bg-charcoal">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
          />
        </div>
      </div>

      {/* Body */}
      <div className="shell py-16 md:py-24">
        <div className="mx-auto max-w-prose">
          {post.excerpt && (
            <p className="mb-10 font-display text-h4 font-light italic leading-relaxed text-ivory">
              {post.excerpt}
            </p>
          )}
          <div className="flex flex-col gap-8 font-body text-body-lg leading-relaxed text-stone">
            {(post.body ?? []).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="mt-16 border-t border-graphite pt-8">
            <Link
              href="/journal"
              className="link-underline font-mono text-micro uppercase tracking-luxe text-stone hover:text-brass"
            >
              ← All journal entries
            </Link>
          </div>
        </div>
      </div>

      {/* More */}
      <section className="shell border-t border-graphite py-24 md:py-32">
        <SectionHeading kicker="Keep Reading" title="More from the journal" className="mb-16" />
        <div className="grid gap-12 md:grid-cols-3 md:gap-8">
          {more.map((p) => (
            <JournalCard key={p.slug} post={p} />
          ))}
        </div>
      </section>
    </article>
  );
}

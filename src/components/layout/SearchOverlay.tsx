'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { searchCatalog } from '@/lib/api/catalog';
import type { Product } from '@/types';
import { Price } from '@/components/common/Price';

const POPULAR = ['Signet', 'Solitaire', 'Gold', 'Watch', 'Cuff'];
const EASE = [0.16, 1, 0.3, 1] as const;

export function SearchOverlay() {
  const { searchOpen, closeSearch } = useUIStore();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [suggested, setSuggested] = useState<Product[]>([]);

  // Debounced backend search.
  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setResults([]);
      return;
    }
    const t = setTimeout(() => {
      searchCatalog(q).then((r) => setResults(r.slice(0, 6))).catch(() => setResults([]));
    }, 200);
    return () => clearTimeout(t);
  }, [query]);

  // A few suggestions when the field is empty.
  useEffect(() => {
    if (searchOpen && suggested.length === 0) {
      searchCatalog('gold').then((r) => setSuggested(r.slice(0, 3))).catch(() => undefined);
    }
  }, [searchOpen, suggested.length]);

  useEffect(() => {
    if (!searchOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeSearch();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [searchOpen, closeSearch]);

  useEffect(() => {
    if (!searchOpen) setQuery('');
  }, [searchOpen]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    closeSearch();
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="fixed inset-0 z-modal bg-obsidian/95 backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          aria-label="Search"
        >
          <div className="shell flex h-full flex-col pt-[var(--nav-height)]">
            <div className="flex justify-end py-6">
              <button
                onClick={closeSearch}
                aria-label="Close search"
                className="flex items-center gap-2 font-mono text-micro uppercase tracking-luxe text-stone transition-colors hover:text-ivory"
              >
                Close <X className="h-4 w-4" />
              </button>
            </div>

            <motion.form
              onSubmit={submit}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.05 }}
              className="flex items-center gap-4 border-b border-graphite pb-6"
            >
              <Search className="h-6 w-6 shrink-0 text-brass" />
              {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the atelier…"
                aria-label="Search products"
                className="w-full bg-transparent font-display text-h3 font-light text-ivory placeholder-stone/50 focus:outline-none md:text-h2"
              />
            </motion.form>

            <div className="grid flex-1 gap-12 overflow-y-auto py-10 md:grid-cols-[1fr_2fr]">
              {/* Popular */}
              <div>
                <p className="kicker mb-5">Popular searches</p>
                <ul className="flex flex-col gap-3">
                  {POPULAR.map((term) => (
                    <li key={term}>
                      <button
                        onClick={() => setQuery(term)}
                        className="link-underline font-display text-h4 font-light italic text-stone transition-colors hover:text-ivory"
                      >
                        {term}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Suggestions */}
              <div>
                <p className="kicker mb-5">
                  {query ? `Results for “${query}”` : 'Suggested for you'}
                </p>
                {query && results.length === 0 ? (
                  <p className="font-body text-body text-stone">
                    No pieces match “{query}”. Try a material or category.
                  </p>
                ) : (
                  <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3">
                    {(query ? results : suggested).map(
                      (product) => (
                        <li key={product.id}>
                          <Link
                            href={`/product/${product.slug}`}
                            onClick={closeSearch}
                            className="group block"
                          >
                            <div className="relative aspect-[4/5] overflow-hidden rounded-image bg-charcoal">
                              <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                sizes="200px"
                                className="object-cover transition-transform duration-700 ease-luxe group-hover:scale-105"
                              />
                            </div>
                            <p className="mt-3 font-display text-body font-light italic text-ivory group-hover:text-brass">
                              {product.name}
                            </p>
                            <Price
                              value={product.price}
                              className="mt-1 block text-caption text-stone"
                            />
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

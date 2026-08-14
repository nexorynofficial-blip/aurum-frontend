'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { SearchX } from 'lucide-react';
import { searchCatalog } from '@/lib/api/catalog';
import type { Product } from '@/types';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { EmptyState } from '@/components/common/EmptyState';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

export function SearchResults() {
  const params = useSearchParams();
  const query = params.get('q') ?? '';
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    searchCatalog(query).then(setResults).catch(() => setResults([]));
  }, [query]);

  return (
    <div className="shell py-16 md:py-20">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Search' }]} />

      <header className="mt-10">
        <p className="kicker mb-4">Search</p>
        <h1 className="font-display text-h1 font-light text-ivory md:text-hero">
          {query ? (
            <>
              Results for <span className="italic text-brass">“{query}”</span>
            </>
          ) : (
            'Search the atelier'
          )}
        </h1>
        {query && (
          <p className="mt-6 font-mono text-micro uppercase tracking-luxe text-stone">
            {results.length} {results.length === 1 ? 'piece' : 'pieces'} found
          </p>
        )}
      </header>

      <div className="mt-16">
        {query && results.length === 0 ? (
          <EmptyState
            icon={<SearchX className="h-6 w-6" />}
            title="No pieces found"
            message={`We couldn't find anything matching “${query}”. Try a material, a category, or a piece name.`}
            action={{ label: 'Browse everything', href: '/collections/all' }}
          />
        ) : results.length > 0 ? (
          <ProductGrid products={results} columns={4} />
        ) : (
          <EmptyState
            title="Begin a search"
            message="Search by piece, material, or collection to find exactly what you're looking for."
            action={{ label: 'Browse the collection', href: '/collections/all' }}
          />
        )}
      </div>
    </div>
  );
}

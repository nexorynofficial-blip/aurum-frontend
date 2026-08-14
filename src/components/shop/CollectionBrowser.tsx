'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SlidersHorizontal, X, Check } from 'lucide-react';
import { Product } from '@/types';
import { ProductCard } from './ProductCard';
import { Reveal } from '@/components/common/Reveal';
import { EmptyState } from '@/components/common/EmptyState';
import { Button } from '@/components/common/Button';
import {
  FILTER_MATERIALS,
  FILTER_STONES,
  PRICE_RANGES,
  SORT_OPTIONS,
} from '@/lib/constants';
import { cn } from '@/lib/utils';

interface CollectionBrowserProps {
  products: Product[];
  /** Shop page only — widen the desktop grid to five products per row. */
  fiveColumns?: boolean;
}

interface Filters {
  materials: string[];
  stones: string[];
  priceIndex: number | null;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export function CollectionBrowser({ products, fiveColumns }: CollectionBrowserProps) {
  const [filters, setFilters] = useState<Filters>({
    materials: [],
    stones: [],
    priceIndex: null,
  });
  const [sort, setSort] = useState<string>('curated');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const toggle = (key: 'materials' | 'stones', value: string) =>
    setFilters((f) => ({
      ...f,
      [key]: f[key].includes(value)
        ? f[key].filter((v) => v !== value)
        : [...f[key], value],
    }));

  const activeCount =
    filters.materials.length +
    filters.stones.length +
    (filters.priceIndex !== null ? 1 : 0);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (filters.materials.length && !filters.materials.includes(p.material))
        return false;
      if (
        filters.stones.length &&
        !filters.stones.includes(p.stoneType ?? 'None')
      )
        return false;
      if (filters.priceIndex !== null) {
        const range = PRICE_RANGES[filters.priceIndex];
        if (p.price < range.min || p.price > range.max) return false;
      }
      return true;
    });

    switch (sort) {
      case 'price-asc':
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        list = [...list].sort(
          (a, b) => Number(b.isNew ?? 0) - Number(a.isNew ?? 0)
        );
        break;
    }
    return list;
  }, [products, filters, sort]);

  const clearAll = () =>
    setFilters({ materials: [], stones: [], priceIndex: null });

  const FilterGroups = (
    <div className="flex flex-col gap-10">
      <FilterGroup title="Material">
        {FILTER_MATERIALS.map((m) => (
          <CheckRow
            key={m}
            label={m}
            checked={filters.materials.includes(m)}
            onChange={() => toggle('materials', m)}
          />
        ))}
      </FilterGroup>
      <FilterGroup title="Stone">
        {FILTER_STONES.map((s) => (
          <CheckRow
            key={s}
            label={s}
            checked={filters.stones.includes(s)}
            onChange={() => toggle('stones', s)}
          />
        ))}
      </FilterGroup>
      <FilterGroup title="Price">
        {PRICE_RANGES.map((r, i) => (
          <CheckRow
            key={r.label}
            label={r.label}
            radio
            checked={filters.priceIndex === i}
            onChange={() =>
              setFilters((f) => ({
                ...f,
                priceIndex: f.priceIndex === i ? null : i,
              }))
            }
          />
        ))}
      </FilterGroup>
    </div>
  );

  return (
    <div className="grid gap-12 lg:grid-cols-[240px_1fr] lg:gap-16">
      {/* Desktop sidebar — sticky (§19) */}
      <aside className="hidden lg:block">
        <div className="sticky top-[calc(var(--nav-height)+2rem)]">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-mono text-micro uppercase tracking-luxe text-ivory">
              Filter
            </h2>
            {activeCount > 0 && (
              <button
                onClick={clearAll}
                className="font-body text-caption text-stone transition-colors hover:text-brass"
              >
                Clear ({activeCount})
              </button>
            )}
          </div>
          {FilterGroups}
        </div>
      </aside>

      <div>
        {/* Toolbar */}
        <div className="mb-8 flex items-center justify-between gap-4 border-b border-graphite pb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="inline-flex items-center gap-2 font-body text-caption uppercase tracking-wide text-ivory transition-colors hover:text-brass lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filter{activeCount > 0 && ` (${activeCount})`}
            </button>
            <p className="font-mono text-micro uppercase tracking-luxe text-stone">
              {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}
            </p>
          </div>

          <label className="flex items-center gap-3">
            <span className="hidden font-mono text-micro uppercase tracking-luxe text-stone sm:inline">
              Sort
            </span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sort products"
              className="cursor-pointer appearance-none rounded-full border border-graphite bg-transparent px-4 py-2 font-body text-caption text-ivory transition-colors hover:border-brass focus:border-brass focus:outline-none"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value} className="bg-charcoal">
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <EmptyState
            title="No pieces match"
            message="Try relaxing a filter or two — our releases are small by design."
            action={{ label: 'Clear filters', href: '#' }}
            className="py-24"
          />
        ) : (
          <div
            className={cn(
              'grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16',
              fiveColumns && 'xl:grid-cols-5'
            )}
          >
            {filtered.map((product, i) => (
              <Reveal key={product.id} delay={(i % 3) * 60}>
                <ProductCard product={product} priority={i < 3} />
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {/* Mobile filter drawer — full-screen (§44) */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-modal lg:hidden" role="dialog" aria-modal="true">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
              aria-label="Close filters"
              className="absolute inset-0 bg-obsidian/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.5, ease: EASE }}
              className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-modal border-t border-graphite bg-charcoal p-6"
            >
              <div className="mb-8 flex items-center justify-between">
                <h2 className="font-display text-h4 font-light text-ivory">Filter</h2>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  aria-label="Close"
                  className="text-stone hover:text-ivory"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              {FilterGroups}
              <div className="mt-10 flex gap-3">
                <Button variant="outline" size="md" fullWidth onClick={clearAll}>
                  Clear
                </Button>
                <Button size="md" fullWidth onClick={() => setMobileFiltersOpen(false)}>
                  Show {filtered.length}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-4 font-mono text-micro uppercase tracking-luxe text-brass">
        {title}
      </h3>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}

function CheckRow({
  label,
  checked,
  onChange,
  radio,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
  radio?: boolean;
}) {
  return (
    <label className="group flex cursor-pointer items-center gap-3 font-body text-small text-stone transition-colors hover:text-ivory">
      <span
        className={cn(
          'flex h-4 w-4 shrink-0 items-center justify-center border transition-colors duration-220',
          radio ? 'rounded-full' : 'rounded-[4px]',
          checked ? 'border-brass bg-brass text-obsidian' : 'border-graphite group-hover:border-stone'
        )}
      >
        {checked && <Check className="h-3 w-3" strokeWidth={3} />}
      </span>
      <input
        type={radio ? 'radio' : 'checkbox'}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      {label}
    </label>
  );
}

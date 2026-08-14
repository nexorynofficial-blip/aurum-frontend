import { Product } from '@/types';
import { ProductCard } from './ProductCard';
import { Reveal } from '@/components/common/Reveal';
import { cn } from '@/lib/utils';

interface ProductGridProps {
  products: Product[];
  columns?: 3 | 4;
  className?: string;
  priorityCount?: number;
}

/** Responsive product grid — mobile 2, tablet 3, desktop 4 (§20). Gap 40px. */
export function ProductGrid({
  products,
  columns = 4,
  className,
  priorityCount = 4,
}: ProductGridProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16',
        columns === 4 ? 'xl:grid-cols-4' : 'xl:grid-cols-3',
        className
      )}
    >
      {products.map((product, i) => (
        <Reveal key={product.id} delay={(i % 4) * 60} as="div">
          <ProductCard product={product} priority={i < priorityCount} />
        </Reveal>
      ))}
    </div>
  );
}

import { Suspense } from 'react';
import { SearchResults } from './SearchResults';

export const metadata = {
  title: 'Search',
};

export default function SearchPage() {
  return (
    <Suspense
      fallback={<div className="shell min-h-[60vh] py-20" aria-busy />}
    >
      <SearchResults />
    </Suspense>
  );
}

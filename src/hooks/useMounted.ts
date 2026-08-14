'use client';

import { useEffect, useState } from 'react';

/**
 * Returns true only after client mount — used to guard persisted-store reads
 * (cart, wishlist) so server and first client render stay identical.
 */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

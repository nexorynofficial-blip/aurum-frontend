'use client';

import { useEffect, useState } from 'react';

/**
 * The Gold Thread (§15) — a 2px vertical brass line pinned to the left margin
 * that fills as the page scrolls, acting as reading progress.
 * Opacity travels 20% → 100%. Never glows, pulses, or loops.
 */
export function GoldThread() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const scrollable =
          document.documentElement.scrollHeight - window.innerHeight;
        const pct = scrollable > 0 ? window.scrollY / scrollable : 0;
        setProgress(Math.min(1, Math.max(0, pct)));
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-2 top-[var(--nav-height)] bottom-6 z-sticky hidden w-px bg-graphite/50 lg:block"
    >
      <div
        className="w-px origin-top bg-brass transition-transform duration-220 ease-luxe"
        style={{
          height: '100%',
          transform: `scaleY(${progress})`,
          opacity: 0.2 + progress * 0.8,
        }}
      />
    </div>
  );
}

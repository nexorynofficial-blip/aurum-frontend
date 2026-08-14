'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Expand, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;

export function ImageGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const go = (dir: 1 | -1) =>
    setActive((i) => (i + dir + images.length) % images.length);

  return (
    <div className="flex flex-col-reverse gap-4 md:flex-row">
      {/* Thumbnail strip */}
      <div className="flex gap-3 md:flex-col">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`View image ${i + 1}`}
            aria-current={i === active}
            className={cn(
              'relative aspect-[4/5] w-16 shrink-0 overflow-hidden rounded-[12px] border transition-colors duration-220 md:w-20',
              i === active ? 'border-brass' : 'border-graphite hover:border-stone'
            )}
          >
            <Image src={src} alt="" fill sizes="80px" className="object-cover" />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="relative flex-1">
        <div className="group relative aspect-[4/5] overflow-hidden rounded-image bg-charcoal">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="absolute inset-0"
            >
              <Image
                src={images[active]}
                alt={`${name} — view ${active + 1}`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-luxe group-hover:scale-105"
              />
            </motion.div>
          </AnimatePresence>

          <button
            onClick={() => setLightbox(true)}
            aria-label="View fullscreen"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-ivory/30 bg-obsidian/50 text-ivory backdrop-blur transition-colors hover:border-brass hover:text-brass"
          >
            <Expand className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-modal flex items-center justify-center bg-obsidian/95 p-6 backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-label={`${name} gallery`}
            onClick={() => setLightbox(false)}
          >
            <button
              onClick={() => setLightbox(false)}
              aria-label="Close"
              className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-graphite text-ivory transition-colors hover:text-brass"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              aria-label="Previous"
              className="absolute left-6 flex h-12 w-12 items-center justify-center rounded-full border border-graphite text-ivory transition-colors hover:text-brass"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <div
              className="relative aspect-[4/5] h-[80vh] max-w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[active]}
                alt={`${name} — view ${active + 1}`}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              aria-label="Next"
              className="absolute right-6 flex h-12 w-12 items-center justify-center rounded-full border border-graphite text-ivory transition-colors hover:text-brass"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

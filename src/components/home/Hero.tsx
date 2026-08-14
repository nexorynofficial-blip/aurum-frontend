'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/common/Button';
import { SITE } from '@/lib/constants';

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section className="relative flex h-[calc(100dvh-var(--nav-height))] min-h-[600px] items-end overflow-hidden">
      {/* Background video — full-bleed, autoplay, muted, looped, plays inline */}
      <video
        className="absolute inset-0 h-full w-full object-cover object-[62%_center] md:object-center"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/hero.png"
        aria-hidden
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Readability veil — keeps the left-aligned text legible over the video */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-obsidian/75 via-obsidian/25 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-obsidian/55 via-transparent to-transparent"
      />
      {/* Corner veil — softly hides the source watermark in the lower-right of the footage */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 13% 19% at 90% 86%, rgba(11,11,13,1) 0%, rgba(11,11,13,1) 45%, rgba(11,11,13,0.5) 70%, transparent 88%)',
        }}
      />

      {/* Text block — hugged to the left, lifted upward, kept clear of the subject */}
      <div className="relative z-raised w-full px-6 pb-24 md:px-10 md:pb-32 lg:px-16 lg:pb-40 xl:px-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          className="kicker mb-6"
        >
          The Atelier · Est. {SITE.founded}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.22 }}
          className="max-w-lg font-display text-[14vw] font-light leading-[0.95] text-ivory sm:text-[4.5rem] md:max-w-xl md:text-[6rem] lg:text-[6.5rem]"
        >
          Objects of quiet
          <span className="block italic text-brass">permanence.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.34 }}
          className="mt-8 max-w-md font-body text-body text-stone"
        >
          Fine jewellery cast in solid precious metal, made in limited number and
          finished entirely by hand.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.46 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Button href="/collections/all" size="lg" className="h-16 text-black">
            Explore the collection
          </Button>
          <Button href="/about" variant="outline" size="lg" className="h-16">
            The house
          </Button>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="absolute bottom-8 right-8 hidden items-center gap-3 lg:flex"
        aria-hidden
      >
        <span className="font-mono text-micro uppercase tracking-luxe text-stone">
          Scroll
        </span>
        <span className="h-10 w-px bg-gradient-to-b from-brass to-transparent" />
      </motion.div>
    </section>
  );
}

import Image from 'next/image';
import { Reveal } from '@/components/common/Reveal';
import { PLACEHOLDER } from '@/lib/constants';
import { cn } from '@/lib/utils';

/**
 * Per-cell 1px graphite dividers for the four principles. Drawn as real borders
 * (not gap bleed) so no hairline drops to subpixel rounding — every cell is
 * separated identically at 1 / 2 / 4 columns, box 3↔4 included.
 */
const DIVIDERS = [
  '', // 01 — top-left in every layout, no leading divider
  'border-t border-graphite md:border-t-0 md:border-l', // 02
  'border-t border-graphite lg:border-t-0 lg:border-l', // 03
  'border-t border-graphite md:border-l lg:border-t-0', // 04
];

const pillars = [
  {
    index: '01',
    title: 'Solid, never plated',
    body: 'Every piece is cast in solid precious metal — the material you buy is the material you keep, for a lifetime and beyond.',
  },
  {
    index: '02',
    title: 'One master, one piece',
    body: 'A single craftsperson carries each object from wax to hallmark, so no two are ever quite identical.',
  },
  {
    index: '03',
    title: 'Traceable to origin',
    body: 'Metals and stones are responsibly sourced and fully documented, from the mine to your hand.',
  },
  {
    index: '04',
    title: 'Serviced for life',
    body: 'Complimentary cleaning and servicing at any AURUM atelier, for as long as the piece exists.',
  },
];

/** Craftsmanship — full-bleed editorial image with four principles (§18). */
export function Craftsmanship() {
  return (
    <section className="relative overflow-hidden bg-charcoal py-24 md:py-40">
      <Image
        src={PLACEHOLDER}
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="object-cover opacity-15"
      />
      <div aria-hidden className="absolute inset-0 bg-obsidian/70" />

      <div className="shell relative">
        <Reveal className="max-w-2xl">
          <p className="kicker mb-6">The Making</p>
          <h2 className="font-display text-h2 font-light leading-tight text-ivory md:text-h1">
            Craft is a series of
            <span className="italic text-brass"> refusals.</span>
          </h2>
          <p className="mt-6 max-w-prose font-body text-body text-stone">
            What we choose not to do defines us as much as what we make. Four
            principles hold, without exception.
          </p>
        </Reveal>

        <div className="mt-16 grid overflow-hidden rounded-image border border-graphite md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal
              key={p.index}
              delay={i * 80}
              className={cn(
                'flex flex-col gap-6 bg-obsidian/80 p-8 backdrop-blur-sm md:p-10',
                DIVIDERS[i]
              )}
            >
              <span className="font-mono text-caption text-brass">{p.index}</span>
              <h3 className="font-display text-h4 font-light text-ivory">
                {p.title}
              </h3>
              <p className="font-body text-caption leading-relaxed text-stone">
                {p.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

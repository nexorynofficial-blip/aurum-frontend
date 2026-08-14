import Image from 'next/image';
import { Reveal } from '@/components/common/Reveal';
import { Button } from '@/components/common/Button';
import { SITE } from '@/lib/constants';

/** Brand story — editorial two-column, image + narrative (§18). */
export function BrandStory() {
  return (
    <section className="shell py-24 md:py-40">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
        <Reveal className="order-2 lg:order-1">
          <p className="kicker mb-6">Since {SITE.founded}</p>
          <h2 className="font-display text-h2 font-light leading-tight text-ivory md:text-h1">
            A house built on the
            <span className="italic text-brass"> discipline of less.</span>
          </h2>
          <div className="mt-8 flex flex-col gap-6 font-body text-body text-stone">
            <p>
              AURUM began in a single room with a single bench. A century later we
              still work the same way — one master to a piece, no shortcuts, no
              plating, nothing made in a hurry.
            </p>
            <p>
              We release in limited number because craft cannot be rushed, and we
              believe an object you keep for a lifetime is worth waiting for.
            </p>
          </div>
          <Button href="/about" variant="ghost" size="md" className="mt-10 px-0">
            Read our story →
          </Button>
        </Reveal>

        <Reveal delay={120} className="order-1 lg:order-2">
          <div className="media-zoom relative aspect-[4/5] overflow-hidden rounded-image bg-charcoal">
            <Image
              src="/images/brand-story.png"
              alt="A portrait in fine AURUM bridal jewellery"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

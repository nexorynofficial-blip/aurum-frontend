import { Breadcrumb } from '@/components/layout/Breadcrumb';

export interface PolicySection {
  heading: string;
  paragraphs: string[];
}

export function PolicyPage({
  title,
  intro,
  updated,
  sections,
}: {
  title: string;
  intro?: string;
  updated?: string;
  sections: PolicySection[];
}) {
  return (
    <div className="shell py-16 md:py-20">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: title }]} />

      <header className="mt-10 max-w-3xl">
        <h1 className="font-display text-h1 font-light text-ivory md:text-hero">
          {title}
        </h1>
        {intro && (
          <p className="mt-8 max-w-prose font-body text-body-lg text-stone">
            {intro}
          </p>
        )}
        {updated && (
          <p className="mt-6 font-mono text-micro uppercase tracking-luxe text-stone">
            Last updated · {updated}
          </p>
        )}
      </header>

      <div className="mt-16 max-w-prose">
        {sections.map((section) => (
          <section key={section.heading} className="border-t border-graphite py-10">
            <h2 className="font-display text-h4 font-light text-ivory">
              {section.heading}
            </h2>
            <div className="mt-4 flex flex-col gap-4">
              {section.paragraphs.map((p, i) => (
                <p key={i} className="font-body text-body leading-relaxed text-stone">
                  {p}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

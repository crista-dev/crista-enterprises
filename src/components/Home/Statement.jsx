import { ChevronRight, Dumbbell, Lightbulb, ShieldCheck } from 'lucide-react';
import Reveal from '../Common/Reveal';
import { useQuote } from '../../context/QuoteContext';

const ICONS = [
  { Icon: Lightbulb, label: 'LED lighting' },
  { Icon: Dumbbell, label: 'Outdoor gym equipment' },
  { Icon: ShieldCheck, label: 'Built for outdoor use' },
];

/** Large statement band below the hero, on the page (grey) background. */
export default function Statement() {
  const { openQuote } = useQuote();

  return (
    <section aria-labelledby="statement-title" className="bg-paper py-20 lg:py-28">
      <div className="wrap">
        <Reveal className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-6">
            <h2
              id="statement-title"
              className="font-display text-[2.1rem] font-normal uppercase leading-[1.08] tracking-[-0.005em] text-ink sm:text-[2.75rem] lg:text-[3.4rem]"
            >
              Built to light.
              <br />
              Built to last.
            </h2>
            <p className="mt-7 max-w-xl text-[17px] leading-relaxed text-ink/85">
              LED street and flood lights, outdoor gym stations and playground equipment for roads, parks, campuses and
              facilities. Specified, supplied and installed for every project.
            </p>
          </div>

          <ul className="flex gap-7 text-ink lg:col-span-3 lg:pt-3" aria-label="What we supply">
            {ICONS.map(({ Icon, label }) => (
              <li key={label} title={label}>
                <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
                <span className="sr-only">{label}</span>
              </li>
            ))}
          </ul>

          <div className="lg:col-span-3 lg:flex lg:justify-end">
            <button
              type="button"
              onClick={() => openQuote()}
              className="group inline-flex h-[52px] items-center gap-3 rounded-md border border-ink px-6 text-[14px] font-semibold uppercase tracking-[0.08em] text-ink transition-colors duration-200 hover:bg-ink hover:text-white"
            >
              <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2.25} aria-hidden="true" />
              Request a quote
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

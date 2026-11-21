import { ChevronDown } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import Button from '../components/Buttons/Button';
import { faqGroups } from '../data/faq';

export default function Faq() {
  return (
    <section className="wrap py-14 lg:py-20">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'FAQs' }]} />

      <div className="mt-10 max-w-3xl">
        <h1 className="display-lg">Frequently Asked Questions</h1>
        <p className="mt-6 text-[17px] leading-relaxed text-charcoal/80">
          Answers about Crista LED lights, outdoor gym and playground equipment, corporate gifting, quotations and orders.
        </p>
      </div>

      <div className="mt-12 max-w-3xl space-y-12">
        {faqGroups.map((g) => (
          <section key={g.title} aria-labelledby={`faq-${g.title}`}>
            <h2 id={`faq-${g.title}`} className="font-display text-[22px] font-semibold text-ink">{g.title}</h2>
            <div className="mt-4 border-t border-line">
              {g.items.map((f) => (
                <details key={f.q} className="group border-b border-line">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[16px] font-medium text-ink [&::-webkit-details-marker]:hidden">
                    <h3 className="font-medium">{f.q}</h3>
                    <ChevronDown className="h-5 w-5 shrink-0 text-muted transition-transform duration-200 group-open:rotate-180" strokeWidth={1.75} aria-hidden="true" />
                  </summary>
                  <p className="pb-6 pr-10 text-[15px] leading-relaxed text-charcoal/80">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-14 max-w-3xl border-l-2 border-accent bg-white p-6">
        <p className="text-[15px] text-ink">Have a question that isn&rsquo;t answered here?</p>
        <Button to="/contact" variant="outline" className="mt-4">Contact us</Button>
      </div>
    </section>
  );
}

import { Boxes, BadgeCheck, ClipboardList, Headset, Layers, Scale } from 'lucide-react';
import Reveal from '../Common/Reveal';

export const REASONS = [
  { icon: Layers, title: 'Products for business use', text: 'Lights and equipment chosen for commercial, municipal and institutional sites.' },
  { icon: Boxes, title: 'Bulk orders', text: 'Project quantities, phased deliveries and repeat orders.' },
  { icon: Scale, title: 'Pricing by quotation', text: 'Prices are based on your specification and quantity, not a fixed retail list.' },
  { icon: BadgeCheck, title: 'Made for outdoor use', text: 'IP66 lights and galvanised, powder-coated gym equipment with a 2-year warranty on lights.' },
  { icon: ClipboardList, title: 'Help choosing products', text: 'We help you pick the right wattage, light colour or equipment mix.' },
  { icon: Headset, title: 'Quick replies', text: 'Email us your questions about products, quantities or delivery.' },
];

export default function WhyCrista() {
  return (
    <section className="border-y border-line bg-white py-20 lg:py-28" aria-labelledby="why-title">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <Reveal className="lg:sticky lg:top-[calc(var(--header-h)+40px)]">
            <h2 id="why-title" className="display-md mt-8">Why work with us</h2>
            <p className="mt-5 text-[15px] leading-relaxed text-muted">
              We keep the process simple for business buyers: clear product information, honest quotations and responsive
              support from enquiry to supply.
            </p>
          </Reveal>
        </div>
        <ol className="grid border-l border-t border-line sm:grid-cols-2 lg:col-span-8">
          {REASONS.map((r, i) => (
            <Reveal as="li" key={r.title} delay={(i % 2) * 0.06} className="group relative border-b border-r border-line p-7 transition-colors duration-300 hover:bg-paper sm:p-9">
              <div className="flex items-start justify-between">
                <r.icon className="h-6 w-6 text-ink" strokeWidth={1.25} aria-hidden="true" />
              </div>
              <h3 className="mt-10 font-display text-[19px] font-medium leading-snug tracking-[-0.015em]">{r.title}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-muted">{r.text}</p>
              <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-accent transition-transform duration-500 ease-brand group-hover:scale-x-100" aria-hidden="true" />
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

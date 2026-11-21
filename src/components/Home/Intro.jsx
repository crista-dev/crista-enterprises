import SmartImage from '../Common/SmartImage';
import Reveal from '../Common/Reveal';
import Button from '../Buttons/Button';
import { ArrowRight } from 'lucide-react';

const points = [
  { t: 'Two product ranges', d: 'Crista Lights and Crista Gym Equipment, supplied by one team.' },
  { t: 'Quotes for business orders', d: 'Prices are quoted on your product, quantity and delivery location.' },
  { t: 'Any order size', d: 'From a few units to project and dealer quantities.' },
  { t: 'Based in Bhopal', d: 'Email us with your requirement and we will send a quotation.' },
];

export default function Intro() {
  return (
    <section className="bg-white py-20 lg:py-32" aria-labelledby="intro-title">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-10">
        <Reveal className="relative lg:col-span-5">
          <SmartImage image="warehouseStock" className="aspect-[4/5] w-full" sizes="(min-width:1024px) 40vw, 100vw" />
          <SmartImage image="construction" className="absolute -bottom-10 right-[-6%] hidden aspect-square w-[46%] border-[6px] border-white sm:block" sizes="20vw" />
        </Reveal>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-6">
          <Reveal>
            <h2 id="intro-title" className="display-lg">About Crista Enterprises</h2>
            <p className="mt-6 text-[17px] leading-relaxed text-charcoal/80">
              Crista Enterprises is a B2B supplier based in Bhopal, Madhya Pradesh. We supply Crista LED street and flood lights,
              outdoor gym and playground equipment, and corporate gift hampers to contractors, municipalities, institutions,
              housing societies and dealers.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <dl className="mt-12 grid gap-px bg-line sm:grid-cols-2">
              {points.map((p) => (
                <div key={p.t} className="bg-white py-6 sm:pr-6 [&:nth-child(even)]:sm:pl-6">
                  <dt className="font-display text-[17px] font-medium text-ink">{p.t}</dt>
                  <dd className="mt-2 text-[14px] leading-relaxed text-muted">{p.d}</dd>
                </div>
              ))}
            </dl>
            <Button to="/about" variant="link" icon={ArrowRight} className="mt-10 text-[14px]">More about our approach</Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

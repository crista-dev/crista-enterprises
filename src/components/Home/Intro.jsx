import { ArrowRight } from 'lucide-react';
import SmartImage from '../Common/SmartImage';
import Reveal from '../Common/Reveal';
import Button from '../Buttons/Button';
import { products } from '../../data/products';
import { hampers } from '../../data/gifting';

/* Facts are counted from the product data, so they stay accurate as products are added. */
const lights = products.filter((p) => p.division === 'lighting');
const gym = products.filter((p) => p.division === 'gym' && !['playground', 'combo'].includes(p.category));
const play = products.filter((p) => ['playground', 'combo'].includes(p.category));
const sets = play.filter((p) => p.category === 'combo').length;

const FACTS = [
  { k: 'Based in', v: 'Bhopal, Madhya Pradesh' },
  { k: 'LED lights', v: `${lights.map((p) => `${p.wattage}W`).join(', ')} · IP66, 2-year warranty` },
  { k: 'Outdoor gym', v: `${gym.length} stations · cardio, strength, core and bodyweight` },
  { k: 'Playground', v: `${play.length} items, including ${sets} play sets` },
  { k: 'Corporate gifting', v: `${hampers.length} hampers for festivals, onboarding and clients` },
  { k: 'Order size', v: 'Single units to bulk, project and dealer quantities' },
];

export default function Intro() {
  return (
    <section className="bg-white py-20 lg:py-28" aria-labelledby="intro-title">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
        <Reveal className="relative lg:col-span-5">
          <SmartImage image="warehouseStock" className="aspect-[4/5] w-full" sizes="(min-width:1024px) 40vw, 100vw" />
        </Reveal>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal>
            <h2 id="intro-title" className="display-lg">About Crista Enterprises</h2>
            <p className="mt-6 text-[17px] leading-relaxed text-charcoal/80">
              Crista Enterprises is a B2B supplier based in Bhopal, Madhya Pradesh. We supply Crista LED street and flood lights,
              outdoor gym and playground equipment, and corporate gift hampers to contractors, municipalities, institutions,
              housing societies and dealers.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <dl className="mt-10 border-t border-line">
              {FACTS.map((f) => (
                <div key={f.k} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[180px_1fr] sm:gap-6">
                  <dt className="text-[13px] font-medium uppercase tracking-[0.1em] text-muted">{f.k}</dt>
                  <dd className="text-[15px] text-ink">{f.v}</dd>
                </div>
              ))}
            </dl>
            <Button to="/about" variant="link" icon={ArrowRight} className="mt-8 text-[14px]">More about us</Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

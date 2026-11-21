import SmartImage from '../Common/SmartImage';
import Reveal from '../Common/Reveal';
import Button from '../Buttons/Button';
import { ArrowRight } from 'lucide-react';

export default function Intro() {
  return (
    <section className="bg-white py-20 lg:py-32" aria-labelledby="intro-title">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-10">
        <Reveal className="relative lg:col-span-5">
          <SmartImage image="warehouseStock" className="aspect-[4/5] w-full" sizes="(min-width:1024px) 40vw, 100vw" />
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
            <Button to="/about" variant="link" icon={ArrowRight} className="mt-8 text-[14px]">More about us</Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

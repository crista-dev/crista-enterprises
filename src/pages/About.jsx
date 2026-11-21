import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import usePageMeta from '../hooks/usePageMeta';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import SmartImage from '../components/Common/SmartImage';
import Reveal from '../components/Common/Reveal';
import SectionHeader from '../components/Common/SectionHeader';
import IndustriesShowcase from '../components/Home/IndustriesShowcase';
import EnquiryCTA from '../components/Home/EnquiryCTA';
import { productMenu } from '../data/navigation';

const APPROACH = [
  { t: 'Understand the requirement', d: 'We start with your site, usage, quantity and timeline, not a product list.' },
  { t: 'Recommend products', d: 'We suggest the wattage, light colour or equipment mix that suits the project.' },
  { t: 'Send a quotation', d: 'You get a written quotation with prices, specifications and delivery terms.' },
  { t: 'Supply and delivery', d: 'We confirm the order and arrange delivery to your site.' },
];

export default function About() {
  usePageMeta('About Us', 'Crista Enterprises is a B2B supplier of commercial LED lighting and outdoor gym and playground equipment. Learn about our approach, divisions and the industries we serve.');
  return (
    <>
      <section className="border-b border-line">
        <div className="wrap pt-10 lg:pt-14">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'About Us' }]} />
          <div className="grid gap-12 py-14 lg:grid-cols-12 lg:py-20">
            <div className="lg:col-span-7">
                            <h1 className="display-xl !text-[2.5rem] sm:!text-6xl lg:!text-[4.5rem]">About Crista Enterprises</h1>
            </div>
            <div className="flex flex-col justify-end lg:col-span-4 lg:col-start-9">
              <p className="text-[17px] leading-relaxed text-charcoal/80">
                Crista Enterprises is a business-to-business supplier with two focused divisions: <strong className="font-medium text-ink">Crista Lights</strong>,
                for commercial and industrial LED lighting, and <strong className="font-medium text-ink">Crista Gym Equipment</strong>, for outdoor gym and playground equipment.
              </p>
            </div>
          </div>
        </div>
        <div className="wrap pb-16 lg:pb-24">
          <div className="grid grid-cols-12 gap-3 lg:gap-4">
            <SmartImage image="warehouse" eager className="col-span-12 aspect-[16/9] md:col-span-8 md:aspect-auto md:h-[520px]" sizes="66vw" />
            <div className="col-span-12 grid grid-cols-2 gap-3 md:col-span-4 md:grid-cols-1 lg:gap-4">
              <SmartImage image="streetNight" className="aspect-square md:aspect-auto md:h-[253px]" sizes="33vw" />
              <SmartImage image="gymStrength" className="aspect-square md:aspect-auto md:h-[253px]" sizes="33vw" />
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 lg:py-28">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
          </Reveal>
          <Reveal className="space-y-6 text-[18px] leading-relaxed text-charcoal/85 lg:col-span-7 lg:col-start-6" delay={0.05}>
            <p className="font-display text-[26px] font-medium leading-snug tracking-[-0.02em] text-ink sm:text-[30px]">
              We supply LED lighting and outdoor gym equipment to contractors, facilities, institutions and dealers,
              quoted for the size of each order.
            </p>
            <p>
              Our customers include construction and infrastructure contractors, municipalities, factories, schools, housing
              societies and distributors. They need products built for daily outdoor and commercial use, and clear answers
              on specifications and quantities.
            </p>
            <p>
              We do not sell retail. Each enquiry gets a quotation based on the specification, quantity and timeline you
              share with us.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Approach */}
      <section className="bg-ink py-20 text-white lg:py-28">
        <div className="wrap">
          <SectionHeader tone="light" title="How we work" />
          <ol className="mt-14 grid border-t border-white/15 md:grid-cols-2 lg:grid-cols-4">
            {APPROACH.map((a, i) => (
              <Reveal as="li" key={a.t} delay={i * 0.06} className={`border-b border-white/15 py-8 md:pr-8 lg:border-b-0 ${i ? 'lg:border-l lg:pl-8' : ''} ${i % 2 ? 'md:border-l md:pl-8 lg:pl-8' : ''}`}>
                <h3 className="font-display text-xl font-medium text-white">{a.t}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-white/60">{a.d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Divisions */}
      <section className="py-20 lg:py-28">
        <div className="wrap">
          <SectionHeader title="Our product ranges" />
          <div className="mt-14 space-y-4">
            {productMenu.map((d, i) => (
              <Reveal key={d.id} className="grid overflow-hidden border border-line bg-white md:grid-cols-12">
                <SmartImage image={d.image} className={`aspect-[16/9] md:col-span-5 md:aspect-auto md:min-h-[320px] ${i % 2 ? 'md:order-2' : ''}`} sizes="40vw" />
                <div className="flex flex-col justify-between p-7 sm:p-10 md:col-span-7">
                  <div>
                    <h3 className="font-display text-[30px] font-medium tracking-[-0.025em]">{d.title}</h3>
                    <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-muted">{d.description}</p>
                  </div>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {d.links.map((l) => (
                      <Link key={l.label} to={l.to} className="rounded-sm border border-line px-3 py-2 text-[13px] text-charcoal transition-colors hover:border-ink hover:text-ink">{l.label}</Link>
                    ))}
                  </div>
                  <Link to={d.to} className="mt-8 inline-flex items-center gap-2 text-[14px] font-medium text-ink hover:text-accent-ink">{d.cta} <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-line bg-white">
        <IndustriesShowcase />
      </div>

      <EnquiryCTA image="industrial" />
    </>
  );
}

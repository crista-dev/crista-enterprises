import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ease = [0.2, 0.7, 0.2, 1];

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="bg-paper p-2.5 sm:p-4">
      <div className="relative isolate overflow-hidden rounded-2xl bg-ink text-white sm:rounded-3xl">
        {/* Background: phone image below 768px, desktop image above */}
        <picture className="absolute inset-0 -z-20">
          <source media="(max-width: 767px)" srcSet="/crista-enterprises-bg-phone.png" />
          <img
            src="/crista-enterprises-bg.png"
            alt=""
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover object-center"
          />
        </picture>

        {/* Soft overlays so text stays readable */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/70 via-black/20 to-transparent" aria-hidden="true" />
        <div className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-black/40 via-transparent to-black/30 md:block" aria-hidden="true" />

        <div className="flex min-h-[calc(100svh-var(--header-h)-16px)] flex-col justify-end px-6 pb-10 pt-32 sm:px-12 sm:pb-14 lg:min-h-[min(880px,calc(100svh-var(--header-h)-24px))] lg:px-20 lg:pb-20">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <motion.h1
              id="hero-title"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
              className="font-display text-[2rem] font-normal uppercase leading-[1.08] tracking-[-0.005em] text-white sm:text-[2.75rem] lg:col-span-7 lg:text-[3.5rem]"
            >
              Powering spaces
              <br />
              that perform
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.2 }}
              className="lg:col-span-5 lg:pl-6"
            >
              <p className="max-w-md text-[16px] leading-relaxed text-white/90 sm:text-[17px]">
                Commercial lighting, outdoor gym and playground equipment for businesses,
                institutions and public projects. One partner from planning to installation.
              </p>
              <Link
                to="/products"
                className="group mt-7 inline-flex h-[52px] items-center gap-3 rounded-md bg-accent px-7 text-[14px] font-semibold uppercase tracking-[0.08em] text-ink transition-colors duration-200 hover:bg-[#45d27c]"
              >
                <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2.25} aria-hidden="true" />
                Explore products
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

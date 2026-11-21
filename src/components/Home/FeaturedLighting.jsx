import { useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import SectionHeader from '../Common/SectionHeader';
import ProductGrid from '../ProductGrid/ProductGrid';
import Button from '../Buttons/Button';
import { getFeatured } from '../../data/products';

export default function FeaturedLighting() {
  const featured = useMemo(() => getFeatured('lighting', 8), []);

  return (
    <section className="py-20 lg:py-28" aria-labelledby="featured-title">
      <div className="wrap">
        <SectionHeader
          eyebrow="Featured lighting products"
          title={<span id="featured-title">Crista LED lights</span>}
          lede="Crista LED street and flood lights for roads, campuses, grounds and yards. IP66 protected, surge protected and backed by a 2-year warranty."
          aside={<Button to="/products/lighting" variant="outline" icon={ArrowRight}>All lights</Button>}
        />
        <ProductGrid products={featured} cols="sm:grid-cols-2 lg:grid-cols-3" className="mt-12" />
      </div>
    </section>
  );
}

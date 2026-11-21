import { useState } from 'react';
import { ImageOff } from 'lucide-react';
import ProductRender from './ProductRender';
import cn from '../../utils/cn';

/**
 * Shows a product's photo when it has one (`product.image`), otherwise its
 * drawn render. If the photo file is missing, shows a neutral placeholder.
 */
export default function ProductVisual({ product: p, tone, view, className, imgClassName }) {
  const [failed, setFailed] = useState(false);

  if (!p.image) {
    return <ProductRender kind={p.render.kind} size={p.render.size} view={view} label={p.name} tone={tone} className={className} />;
  }

  if (failed) {
    return (
      <div className={cn('flex h-full w-full flex-col items-center justify-center gap-2 text-ink/35', className)} role="img" aria-label={p.name}>
        <ImageOff className="h-8 w-8" strokeWidth={1.25} aria-hidden="true" />
        <span className="text-[11px] font-medium uppercase tracking-[0.14em]">Image coming soon</span>
      </div>
    );
  }

  return (
    <img
      src={p.image}
      alt={p.name}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={cn('h-full w-full object-contain', className, imgClassName)}
    />
  );
}

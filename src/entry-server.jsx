/**
 * Build-time renderer. scripts/prerender.mjs calls render(url) for every page
 * and writes the HTML into dist/, so crawlers that don't run JavaScript
 * (many AI crawlers) still see the full page content.
 */
import { StrictMode } from 'react';
import { Writable } from 'node:stream';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';

export { getRoutes, NOT_FOUND } from './seo/routes';
export { products } from './data/products';
export { hampers, collectionName } from './data/gifting';
export { faqGroups } from './data/faq';
export { site } from './data/site';

export function render(url) {
  return new Promise((resolve, reject) => {
    let html = '';
    const sink = new Writable({
      write(chunk, _enc, cb) {
        html += chunk.toString();
        cb();
      },
      final(cb) {
        resolve(html);
        cb();
      },
    });
    const stream = renderToPipeableStream(
      <StrictMode>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </StrictMode>,
      {
        onAllReady() {
          stream.pipe(sink);
        },
        onShellError: reject,
        onError(err) {
          reject(err);
        },
      },
    );
  });
}

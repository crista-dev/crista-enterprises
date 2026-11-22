/**
 * Post-build SEO step (runs automatically as part of `npm run build`).
 *  1. Renders every page to static HTML with its own title, meta, canonical,
 *     Open Graph and JSON-LD  → dist/<path>.html
 *  2. Writes sitemap.xml, robots.txt, llms.txt, llms-full.txt and 404.html
 * Page meta comes from src/seo/routes.js; page content comes from the app itself.
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');
const entry = fs.readdirSync(ssrDir).find((f) => /^entry-server\.(m?js)$/.test(f));
const ssr = await import(pathToFileURL(path.join(ssrDir, entry)).href);
const { render, getRoutes, NOT_FOUND, products, hampers, collectionName, faqGroups, site } = ssr;

const SITE = site.url;
const today = new Date().toISOString().slice(0, 10);
const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const hasFile = (p) => !!p && fs.existsSync(path.join(dist, decodeURI(p)));

/* Logo used in Organization structured data */
const logoSrc = path.join(root, 'src/assets/brand/crista-logo.png');
if (fs.existsSync(logoSrc)) fs.copyFileSync(logoSrc, path.join(dist, 'crista-logo.png'));

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
  .replace(/<title>[\s\S]*?<\/title>\s*/, '')
  .replace(/<meta\s+name="description"[\s\S]*?\/>\s*/, '');

function head(m) {
  const url = m.canonical ?? `${SITE}${m.path}`;
  const image = `${SITE}${m.image}`;
  const isProduct = m.path.startsWith('/products/') && !['/products/lighting', '/products/gym-equipment'].includes(m.path);
  const tags = [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}" />`,
    `<meta name="robots" content="${m.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}" />`,
    m.noindex ? '' : `<link rel="canonical" href="${esc(url)}" />`,
    `<meta property="og:type" content="${isProduct ? 'product' : 'website'}" />`,
    `<meta property="og:site_name" content="${esc(site.name)}" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta property="og:title" content="${esc(m.title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:image" content="${esc(image)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(m.title)}" />`,
    `<meta name="twitter:description" content="${esc(m.description)}" />`,
    `<meta name="twitter:image" content="${esc(image)}" />`,
  ];
  if (m.path === '/') {
    if (hasFile('/crista-enterprises-bg.png')) tags.push('<link rel="preload" as="image" href="/crista-enterprises-bg.png" media="(min-width: 768px)" fetchpriority="high" />');
    if (hasFile('/crista-enterprises-bg-phone.png')) tags.push('<link rel="preload" as="image" href="/crista-enterprises-bg-phone.png" media="(max-width: 767px)" fetchpriority="high" />');
  }
  if (m.jsonLd) tags.push(`<script type="application/ld+json" id="ld-json">${JSON.stringify(m.jsonLd).replace(/</g, '\\u003c')}</script>`);
  return tags.filter(Boolean).map((t) => `    ${t}`).join('\n');
}

function write(file, html) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}

async function page(m, url) {
  const body = await render(url);
  return template
    .replace('</head>', `${head(m)}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
}

/* 1. Pages */
const routes = getRoutes({ hasFile });
for (const r of routes) {
  const html = await page(r, r.path);
  write(r.path === '/' ? path.join(dist, 'index.html') : path.join(dist, `${r.path}.html`), html);
}
write(path.join(dist, '404.html'), await page(NOT_FOUND, '/404-not-found'));

/* 2. sitemap.xml */
const imageTags = (r) => {
  const p = products.find((x) => x.url === r.path);
  return p?.image && hasFile(p.image)
    ? `\n    <image:image><image:loc>${esc(SITE + p.image)}</image:loc><image:title>${esc(p.name)}</image:title></image:image>`
    : '';
};
write(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${routes.map((r) => `  <url>
    <loc>${esc(r.canonical)}</loc>
    <lastmod>${today}</lastmod>
    <priority>${r.priority ?? 0.5}</priority>${imageTags(r)}
  </url>`).join('\n')}
</urlset>
`,
);

/* 3. robots.txt — search engines and AI assistants are welcome */
write(
  path.join(dist, 'robots.txt'),
  `User-agent: *
Allow: /

# AI search and assistant crawlers
User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Claude-SearchBot
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: Applebot-Extended
Allow: /
User-agent: Bingbot
Allow: /

Sitemap: ${SITE}/sitemap.xml
`,
);

/* 4. llms.txt (summary) and llms-full.txt (full detail) for AI assistants */
const contact = `- Email: ${site.contact.email.value}\n- Location: ${site.contact.address.value}, India\n- Hours: ${site.contact.hours.value}`;
const groups = [
  ['LED lights (brand: Crista Lights)', products.filter((p) => p.division === 'lighting')],
  ['Outdoor gym equipment', products.filter((p) => p.division === 'gym' && !['playground', 'combo'].includes(p.category))],
  ['Playground equipment and play sets', products.filter((p) => ['playground', 'combo'].includes(p.category))],
];
const intro = `# ${site.name}

> ${site.name} is a business-to-business (B2B) supplier based in Bhopal, Madhya Pradesh, India. It supplies Crista LED street lights and LED flood lights, outdoor gym equipment, playground equipment and corporate gift hampers to contractors, municipalities, institutions, residential societies, schools, facilities and dealers. All prices are provided by quotation.

## Contact
${contact}
- Request a quote: ${SITE}/contact
`;
const pagesList = `## Key pages
- [Home](${SITE}/)
- [All products](${SITE}/products)
- [Crista Lights: LED street & flood lights](${SITE}/products/lighting)
- [Outdoor gym & playground equipment](${SITE}/products/gym-equipment)
- [Corporate gifting](${SITE}/corporate-gifting)
- [FAQs](${SITE}/faq)
- [About](${SITE}/about)
- [Contact](${SITE}/contact)
`;
const short = [
  intro,
  ...groups.map(([t, list]) => `## ${t}\n${list.map((p) => `- [${p.name}](${SITE}${p.url})${p.model ? ` (model ${p.model})` : ''}${p.priceLabel ? `, ${p.priceLabel}` : ''}: ${p.summary}`).join('\n')}\n`),
  `## Corporate gift hampers\n${hampers.map((h) => `- ${h.name} (${collectionName(h.collection)}): ${h.contents.join(', ')}`).join('\n')}\n`,
  pagesList,
  `## More detail\n- [Full product specifications and FAQs](${SITE}/llms-full.txt)\n`,
].join('\n');
write(path.join(dist, 'llms.txt'), short);

const full = [
  intro,
  ...groups.map(([t, list]) => `## ${t}\n\n${list.map((p) => `### ${p.name}\nURL: ${SITE}${p.url}\n${p.description}\n\nSpecifications:\n${p.specs.map((s) => `- ${s.label}: ${s.value}`).join('\n')}${p.features?.length ? `\n\nFeatures:\n${p.features.map((f) => `- ${f}`).join('\n')}` : ''}${p.applications?.length ? `\n\nApplications: ${p.applications.join(', ')}` : ''}\n`).join('\n')}`),
  `## Corporate gift hampers\n\n${hampers.map((h) => `### ${h.name}\nCollection: ${collectionName(h.collection)}\nContents: ${h.contents.join(', ')}\n`).join('\n')}`,
  `## Frequently asked questions\n\n${faqGroups.map((g) => `### ${g.title}\n\n${g.items.map((f) => `**${f.q}**\n${f.a}\n`).join('\n')}`).join('\n')}`,
  pagesList,
].join('\n');
write(path.join(dist, 'llms-full.txt'), full);

fs.rmSync(ssrDir, { recursive: true, force: true });
console.log(`SEO: pre-rendered ${routes.length} pages + 404, wrote sitemap.xml, robots.txt, llms.txt, llms-full.txt`);

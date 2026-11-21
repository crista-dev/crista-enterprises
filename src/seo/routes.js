/**
 * Single source of truth for page titles, descriptions, canonical URLs and
 * structured data (JSON-LD).
 *  - At build time, scripts/prerender.mjs uses it to write a real HTML file
 *    per page (so Google, Bing and AI crawlers see full content).
 *  - In the browser, <SeoManager> uses it to update tags on navigation.
 * To change how a page appears in search, edit it here.
 */
import { site } from '../data/site';
import { products, LIGHTING_CATEGORIES, GYM_CATEGORIES } from '../data/products';
import { hampers, collectionName } from '../data/gifting';
import { industries } from '../data/industries';
import { faqs } from '../data/faq';

export const SITE_URL = site.url;
export const DEFAULT_IMAGE = '/crista-enterprises-bg.png';
const LOGO = '/crista-logo.png';
const abs = (p) => (p.startsWith('http') ? p : `${SITE_URL}${p}`);
const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

/* ---------- Site-wide entities ---------- */
const organization = {
  '@type': ['Organization', 'LocalBusiness'],
  '@id': ORG_ID,
  name: site.name,
  alternateName: ['Crista', 'Crista Lights', 'Crista Gym Equipment'],
  slogan: site.tagline,
  description:
    'Crista Enterprises is a B2B supplier in Bhopal, Madhya Pradesh, India, of Crista LED street lights and flood lights, outdoor gym equipment, playground equipment and corporate gift hampers.',
  url: `${SITE_URL}/`,
  logo: abs(LOGO),
  image: abs(DEFAULT_IMAGE),
  email: site.contact.email.value,
  telephone: site.contact.phone.href.replace('tel:', ''),
  address: { '@type': 'PostalAddress', addressLocality: 'Bhopal', addressRegion: 'Madhya Pradesh', addressCountry: 'IN' },
  areaServed: { '@type': 'Country', name: 'India' },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: site.contact.email.value,
    telephone: site.contact.phone.href.replace('tel:', ''),
    areaServed: 'IN',
    availableLanguage: ['English', 'Hindi'],
  },
  brand: [
    { '@type': 'Brand', name: 'Crista Lights' },
    { '@type': 'Brand', name: 'Crista Gym Equipment' },
  ],
  knowsAbout: ['LED street lights', 'LED flood lights', 'Outdoor gym equipment', 'Playground equipment', 'Corporate gifting'],
};

const website = {
  '@type': 'WebSite',
  '@id': SITE_ID,
  url: `${SITE_URL}/`,
  name: site.name,
  inLanguage: 'en-IN',
  publisher: { '@id': ORG_ID },
};

const crumbs = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [{ name: 'Home', path: '/' }, ...items].map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    item: abs(c.path),
  })),
});

const page = (type, path, title, description) => ({
  '@type': type,
  '@id': `${abs(path)}#webpage`,
  url: abs(path),
  name: title,
  description,
  isPartOf: { '@id': SITE_ID },
  about: { '@id': ORG_ID },
  inLanguage: 'en-IN',
});

const itemList = (list) => ({
  '@type': 'ItemList',
  numberOfItems: list.length,
  itemListElement: list.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(p.url), name: p.name })),
});

/* ---------- Product pages ---------- */
function productEntry(p, hasFile) {
  const isLight = p.division === 'lighting';
  const brand = isLight ? 'Crista Lights' : 'Crista Gym Equipment';
  const image = p.image && hasFile(p.image) ? p.image : null;
  const spec = (label) => p.specs.find((s) => s.label === label)?.value;

  const title = isLight
    ? `${p.name} ${p.model ? `(${p.model}) ` : ''}– IP66, ${spec('Lumen output (nominal)')?.replace('≈ ', '')} | Crista Lights`
    : `${p.name} – Outdoor ${p.category === 'playground' || p.category === 'combo' ? 'Playground' : 'Gym'} Equipment | Crista`;
  const description = isLight
    ? `${p.name} by Crista: ${spec('Luminous efficacy')}, ${spec('Light colour') ?? spec('Colour temperature')}, IP66 die-cast aluminium, ${spec('Surge protection')} surge protection, 2-year warranty. ${p.sensor ? 'Automatic dusk-to-dawn sensor. ' : ''}Request a quote from Crista Enterprises, Bhopal.`
    : `${p.name}: ${p.summary.replace(/\.$/, '')}. ${p.usage ? `For ${p.usage.toLowerCase()}. ` : ''}ISI-marked GI pipe, weather-resistant powder coating. Request a quote from Crista Enterprises, Bhopal.`;

  const divisionPath = isLight ? '/products/lighting' : '/products/gym-equipment';
  const divisionName = isLight ? 'Crista Lights' : 'Crista Gym Equipment';

  return {
    path: p.url,
    title,
    description,
    image: image ?? DEFAULT_IMAGE,
    priority: 0.8,
    jsonLd: [
      page('ItemPage', p.url, title, description),
      {
        '@type': 'Product',
        '@id': `${abs(p.url)}#product`,
        name: p.name,
        description: p.description,
        ...(image && { image: abs(image) }),
        ...(p.model && { sku: p.model, mpn: p.model }),
        brand: { '@type': 'Brand', name: brand },
        manufacturer: { '@id': ORG_ID },
        category: p.categoryName,
        url: abs(p.url),
        additionalProperty: p.specs.map((s) => ({ '@type': 'PropertyValue', name: s.label, value: s.value })),
      },
      crumbs([{ name: divisionName, path: divisionPath }, { name: p.name, path: p.url }]),
    ],
  };
}

/* ---------- All routes ---------- */
export function getRoutes({ hasFile = () => true } = {}) {
  const lights = products.filter((p) => p.division === 'lighting');
  const gym = products.filter((p) => p.division === 'gym');

  const routes = [
    {
      path: '/',
      title: 'Crista Enterprises | LED Street Lights, Flood Lights & Outdoor Gym Equipment, Bhopal',
      description:
        'Crista Enterprises, Bhopal: supplier of Crista LED street lights and flood lights (IP66, 2-year warranty), outdoor gym and playground equipment, and corporate gift hampers for businesses, institutions and projects across India.',
      priority: 1,
      jsonLd: [page('WebPage', '/', 'Crista Enterprises', site.description)],
    },
    {
      path: '/products',
      title: 'All Products – LED Lights, Outdoor Gym & Playground Equipment | Crista',
      description: `Browse ${products.length} products from Crista Enterprises: LED street and flood lights, outdoor gym stations, playground equipment and play combination sets. Request a quote online.`,
      priority: 0.9,
      jsonLd: [page('CollectionPage', '/products', 'All products', ''), itemList(products), crumbs([{ name: 'Products', path: '/products' }])],
    },
    {
      path: '/products/lighting',
      title: 'LED Street Lights & Flood Lights – 50W, 100W, 200W | Crista Lights',
      description: `Crista LED street lights (50W, 100W) with dusk-to-dawn sensors and a 200W LED flood light. IP66 die-cast aluminium, up to 130 lm/W, surge protected, 2-year warranty. ${LIGHTING_CATEGORIES.map((c) => c.name).join(', ')}.`,
      priority: 0.9,
      jsonLd: [page('CollectionPage', '/products/lighting', 'Crista Lights', ''), itemList(lights), crumbs([{ name: 'Crista Lights', path: '/products/lighting' }])],
    },
    {
      path: '/products/gym-equipment',
      title: 'Outdoor Gym & Playground Equipment Supplier | Crista Enterprises',
      description: `${gym.length} outdoor gym and playground products: ${GYM_CATEGORIES.map((c) => c.name.toLowerCase()).join(', ')}. ISI-marked GI pipe, SKF bearings, powder-coated finish. For parks, societies and schools.`,
      priority: 0.9,
      jsonLd: [page('CollectionPage', '/products/gym-equipment', 'Outdoor gym & playground equipment', ''), itemList(gym), crumbs([{ name: 'Crista Gym Equipment', path: '/products/gym-equipment' }])],
    },
    ...products.map((p) => productEntry(p, hasFile)),
    {
      path: '/corporate-gifting',
      title: 'Corporate Gift Hampers – Diwali, New Year & Welcome Kits | Crista',
      description: `Corporate gift hampers from Crista Enterprises: ${[...new Set(hampers.map((h) => collectionName(h.collection)))].join(', ')}. Logo branding, personalised cards and bulk dispatch.`,
      image: hampers[0]?.image && hasFile(hampers[0].image) ? hampers[0].image : DEFAULT_IMAGE,
      priority: 0.8,
      jsonLd: [
        page('CollectionPage', '/corporate-gifting', 'Corporate gifting', ''),
        {
          '@type': 'ItemList',
          numberOfItems: hampers.length,
          itemListElement: hampers.map((h, i) => ({ '@type': 'ListItem', position: i + 1, name: h.name, description: h.contents.join(', ') })),
        },
        crumbs([{ name: 'Corporate Gifting', path: '/corporate-gifting' }]),
      ],
    },
    {
      path: '/industries',
      title: 'Industries We Serve – Infrastructure, Parks, Industry & More | Crista',
      description: `Lighting and outdoor equipment for ${industries.map((i) => i.name.toLowerCase()).join(', ')}. Crista Enterprises, Bhopal.`,
      priority: 0.7,
      jsonLd: [page('WebPage', '/industries', 'Industries we serve', ''), crumbs([{ name: 'Industries', path: '/industries' }])],
    },
    {
      path: '/about',
      title: 'About Crista Enterprises – B2B Lighting & Outdoor Equipment Supplier, Bhopal',
      description: 'About Crista Enterprises: a Bhopal-based B2B supplier of Crista LED lights, outdoor gym and playground equipment, and corporate gifting for contractors, institutions, facilities and dealers.',
      priority: 0.7,
      jsonLd: [page('AboutPage', '/about', 'About Crista Enterprises', ''), crumbs([{ name: 'About', path: '/about' }])],
    },
    {
      path: '/faq',
      title: 'FAQs – LED Lights, Outdoor Gym Equipment & Ordering | Crista Enterprises',
      description: 'Answers about Crista LED street and flood lights, outdoor gym and playground equipment, warranty, quotations, bulk orders and dealership.',
      priority: 0.7,
      jsonLd: [
        page('FAQPage', '/faq', 'Frequently asked questions', ''),
        {
          '@type': 'FAQPage',
          '@id': `${abs('/faq')}#faq`,
          mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
        },
        crumbs([{ name: 'FAQs', path: '/faq' }]),
      ],
    },
    {
      path: '/contact',
      title: 'Contact Crista Enterprises – Request a Quote, Bhopal',
      description: `Contact Crista Enterprises in Bhopal for quotations, bulk and project orders or dealership. Email ${site.contact.email.value} or call ${site.contact.phone.value}.`,
      priority: 0.7,
      jsonLd: [page('ContactPage', '/contact', 'Contact Crista Enterprises', ''), crumbs([{ name: 'Contact', path: '/contact' }])],
    },
    {
      path: '/privacy-policy',
      title: 'Privacy Policy | Crista Enterprises',
      description: 'How Crista Enterprises collects, uses and protects personal data, in line with the Digital Personal Data Protection Act, 2023.',
      priority: 0.3,
      jsonLd: [page('WebPage', '/privacy-policy', 'Privacy Policy', '')],
    },
    {
      path: '/terms',
      title: 'Terms & Conditions | Crista Enterprises',
      description: 'Terms governing use of the Crista Enterprises website and the supply of products: quotations, payment, delivery, warranty and returns.',
      priority: 0.3,
      jsonLd: [page('WebPage', '/terms', 'Terms & Conditions', '')],
    },
  ];

  return routes.map((r) => ({
    image: DEFAULT_IMAGE,
    ...r,
    canonical: abs(r.path === '/' ? '/' : r.path),
    jsonLd: { '@context': 'https://schema.org', '@graph': [organization, website, ...r.jsonLd] },
  }));
}

export const NOT_FOUND = {
  path: '/404',
  title: 'Page not found | Crista Enterprises',
  description: 'The page you are looking for could not be found.',
  image: DEFAULT_IMAGE,
  noindex: true,
};

/** Meta for a pathname (used in the browser on navigation). */
let cache;
export function getRouteMeta(pathname) {
  cache ??= getRoutes();
  const clean = pathname !== '/' ? pathname.replace(/\/+$/, '') : '/';
  return cache.find((r) => r.path === clean) ?? NOT_FOUND;
}

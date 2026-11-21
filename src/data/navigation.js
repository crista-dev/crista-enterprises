export const mainNav = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Products', to: '/products', mega: true },
  { label: 'Industries', to: '/industries' },
  { label: 'Contact Us', to: '/contact' },
];

/** Corporate Gifting vertical — shown as a distinct button, kept out of mainNav. */
export const giftingNav = {
  label: 'Gifting',
  to: '/corporate-gifting',
  description: 'Corporate & festival gifting',
};

/** Mega menu columns — one per division. */
export const productMenu = [
  {
    id: 'lighting',
    title: 'Crista Lights',
    kicker: 'Division 01',
    description: 'Commercial and industrial LED lighting for roads, sites and facilities.',
    to: '/products/lighting',
    cta: 'Explore lighting',
    image: 'heroNight',
    links: [
      { label: 'LED Street Lights', to: '/products/lighting?category=street', note: '50W · 100W' },
      { label: 'LED Flood Lights', to: '/products/lighting?category=flood', note: '200W' },
    ],
  },
  {
    id: 'gym',
    title: 'Crista Gym Equipment',
    kicker: 'Division 02',
    description: 'Outdoor gym and playground equipment for parks, societies and schools.',
    to: '/products/gym-equipment',
    cta: 'Explore gym equipment',
    image: 'gymFloor',
    links: [
      { label: 'Cardio Stations', to: '/products/gym-equipment?category=cardio', note: 'Walkers, cycles, rowers' },
      { label: 'Strength Stations', to: '/products/gym-equipment?category=strength', note: 'Press & pull stations' },
      { label: 'Core & Flexibility', to: '/products/gym-equipment?category=core', note: 'Twisters, wheels' },
      { label: 'Playground Equipment', to: '/products/gym-equipment?category=playground', note: 'Slides, swings & sets' },
    ],
  },
];

export const footerNav = {
  products: [
    { label: 'Crista Lights', to: '/products/lighting' },
    { label: 'LED Street Lights', to: '/products/lighting?category=street' },
    { label: 'LED Flood Lights', to: '/products/lighting?category=flood' },
    { label: 'Crista Gym Equipment', to: '/products/gym-equipment' },
    { label: 'Playground Equipment', to: '/products/gym-equipment?category=playground' },
  ],
  company: [
    { label: 'About Us', to: '/about' },
    { label: 'Our Products', to: '/products' },
    { label: 'Industries', to: '/industries' },
    { label: 'Contact Us', to: '/contact' },
  ],
  support: [
    { label: 'Request a Quote', quote: true },
    { label: 'Bulk Orders', to: '/contact?type=bulk' },
    { label: 'Become a Dealer', to: '/contact?type=dealer' },
    { label: 'Product Enquiries', to: '/contact?type=product' },
  ],
};

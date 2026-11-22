/**
 * Frequently asked questions. Shown on /faq and published as FAQPage
 * structured data, so answers are written to be quoted directly by search
 * engines and AI assistants. Keep every answer factual.
 */
export const faqGroups = [
  {
    title: 'About Crista Enterprises',
    items: [
      {
        q: 'What does Crista Enterprises supply?',
        a: 'Crista Enterprises is a business-to-business supplier based in Bhopal, Madhya Pradesh. It supplies Crista LED street lights and LED flood lights, outdoor gym equipment, playground equipment and corporate gift hampers to contractors, municipalities, institutions, residential societies, schools and dealers.',
      },
      {
        q: 'Where is Crista Enterprises located?',
        a: 'Crista Enterprises is based in Bhopal, Madhya Pradesh, India. You can reach the team by email at contact@cristaenterprises.com, Monday to Saturday during business hours.',
      },
      {
        q: 'How do I get a price or quotation?',
        a: 'Crista LED lights have listed prices: the 50W street light is ₹2,500, the 100W street light is ₹4,000 and the 200W flood light is ₹7,000, all plus GST. Outdoor gym and playground equipment is priced by quotation, based on the product, quantity, specification and delivery location. Use the Request a Quote button on any product or the contact form, and the team will prepare a quotation. Unless stated otherwise, quoted prices are exclusive of GST, freight and installation.',
      },
      {
        q: 'Do you take bulk and project orders?',
        a: 'Yes. Crista Enterprises supplies everything from single units to bulk and project quantities, including phased deliveries and repeat supply. Choose “Bulk / project order” on the contact form to start.',
      },
      {
        q: 'Can I become a Crista dealer or distributor?',
        a: 'Yes. Select “Become a dealer / distributor” on the contact form with your company details and region, and the team will get in touch.',
      },
    ],
  },
  {
    title: 'LED street and flood lights',
    items: [
      {
        q: 'Which LED lights does Crista offer?',
        a: 'The Crista Lights range includes the 50W LED Street Light (model CLCE50A), the 100W LED Street Light (model CLCE100A) and the 200W LED Flood Light (model CLCE200A). All three have IP66 pressure die-cast aluminium bodies, a power factor above 0.90, CRI above 80 and a 2-year warranty.',
      },
      {
        q: 'Do Crista street lights switch on automatically at night?',
        a: 'Yes. The 50W and 100W Crista LED street lights have a built-in photocell sensor that switches the light on at dusk and off at dawn, so no timer or manual switch is needed.',
      },
      {
        q: 'What is the difference between the 50W and 100W street lights?',
        a: 'The 50W street light gives around 6,000 lumens of warm white light and suits lanes, colonies, campuses and parks. The 100W street light gives around 12,000 lumens of cool white light for main roads, industrial estates and larger parking areas. Both run at 120 lumens per watt.',
      },
      {
        q: 'Are Crista LED lights waterproof?',
        a: 'Yes. All Crista street and flood lights are rated IP66, which means they are dust-tight and protected against powerful water jets, so they are suited to outdoor installation in rain and dust.',
      },
      {
        q: 'Will the lights work with voltage fluctuations?',
        a: 'Crista lights accept a wide input range (110–270V AC on the 100W and 200W models, 120–270V AC on the 50W) and include surge protection of 6 kV on the street lights and 10 kV on the 200W flood light.',
      },
      {
        q: 'What warranty do Crista LED lights have?',
        a: 'Crista LED street lights and flood lights carry a 2-year warranty against manufacturing defects. The 100W street light and 200W flood light are rated for 50,000 burning hours.',
      },
    ],
  },
  {
    title: 'Outdoor gym and playground equipment',
    items: [
      {
        q: 'What outdoor gym equipment does Crista supply?',
        a: 'Crista supplies cardio stations (air walker, sky walker, cross trainer, rower, cycle), strength stations (chest press, shoulder press, leg press, pull-down), core and flexibility stations (twisters, shoulder wheel, tai chi spinner), bodyweight bars, playground equipment and play combination sets.',
      },
      {
        q: 'What is Crista outdoor gym equipment made of?',
        a: 'Outdoor gym stations are built on ISI-marked galvanised iron (GI) pipe, typically with a 4.5-inch main post and 3.5 mm wall thickness, SKF bearings in moving parts, and a weather-resistant powder-coated finish for outdoor use.',
      },
      {
        q: 'Is outdoor gym equipment suitable for senior citizens?',
        a: 'Yes. Most outdoor gym stations use the user’s own body weight with no weight plates to adjust, and stations such as the air walker, leg extension, shoulder wheel, tai chi spinner and seated twisters offer gentle, low-impact movement suited to seniors.',
      },
      {
        q: 'Where is outdoor gym equipment installed?',
        a: 'Outdoor gym and playground equipment is typically installed in public parks, residential societies, schools and colleges, and municipal open-air gyms. Stations are fixed on a concrete foundation with anchor bolts.',
      },
    ],
  },
  {
    title: 'Corporate gifting',
    items: [
      {
        q: 'Does Crista Enterprises offer corporate gift hampers?',
        a: 'Yes. Crista offers corporate gift hampers for Diwali, New Year and Holi, employee welcome kits, client and partner gifts, and wellness boxes, with contents adjusted to your budget.',
      },
      {
        q: 'Can corporate gift hampers be customised with our logo?',
        a: 'Yes. Hampers can include logo branding on boxes and suitable items, personalised message cards, mix-and-match contents, and bulk dispatch to one or several locations.',
      },
    ],
  },
];

export const faqs = faqGroups.flatMap((g) => g.items);

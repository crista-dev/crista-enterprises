/**
 * Product catalogue (frontend data source).
 * ------------------------------------------------------------
 * Shaped so it can later be replaced 1:1 by an API response.
 *
 * Lighting specs come from Crista product specification sheets; gym specs
 * from the standard model catalogue.
 */

export const DIVISIONS = {
  lighting: {
    id: 'lighting',
    name: 'Crista Lights',
    path: '/products/lighting',
    tagline: 'Commercial & industrial LED lighting',
  },
  gym: {
    id: 'gym',
    name: 'Crista Gym Equipment',
    path: '/products/gym-equipment',
    tagline: 'Outdoor gym & playground equipment',
  },
};

export const LIGHTING_CATEGORIES = [
  { slug: 'street', name: 'LED Street Lights' },
  { slug: 'flood', name: 'LED Flood Lights' },
  // Add more categories here when products are added (e.g. solar, industrial)
];

export const GYM_CATEGORIES = [
  { slug: 'cardio', name: 'Cardio Stations' },
  { slug: 'strength', name: 'Strength Stations' },
  { slug: 'core', name: 'Core & Flexibility' },
  { slug: 'bodyweight', name: 'Bodyweight Bars' },
  { slug: 'playground', name: 'Playground Equipment' },
  { slug: 'combo', name: 'Play Combination Sets' },
];

/* ---------- Lighting helpers ---------- */
/*
 * Crista Lights range. Specifications are taken from the Crista product
 * specification sheets. Product photos live in public/lighting/.
 * To add a product: copy one entry below and change its values.
 */
const COMMON_LIGHT = {
  thd: '10%',
  pf: '> 0.90',
  frequency: '50Hz ± 3%',
  ip: 'IP66 (water & dust proof)',
  body: 'Pressure die-cast aluminium',
  temp: '−30°C to 50°C',
  cri: '> 80',
  cert: 'ISO certified',
  warranty: '2 years',
};

const light = (p) => {
  const c = { ...COMMON_LIGHT, ...p };
  const lumens = (c.wattage * c.efficacy).toLocaleString('en-IN');
  const specs = [
    { label: 'Model no.', value: c.model },
    { label: 'Power', value: `${c.wattage}W` },
    { label: 'LED type', value: c.ledType },
    { label: 'No. of LEDs', value: c.ledCount },
    { label: 'Luminous efficacy', value: `${c.efficacy} lm/W` },
    { label: 'Lumen output (nominal)', value: `≈ ${lumens} lm` },
    { label: c.cct ? 'Colour temperature' : 'Light colour', value: c.cct ?? c.colour },
    { label: 'Colour rendering (CRI)', value: c.cri },
    c.sensor && { label: 'Sensor', value: 'Photocell sensor (automatic dusk-to-dawn ON/OFF)' },
    { label: 'Rated supply voltage', value: c.rated },
    { label: 'Input voltage range', value: c.inputRange },
    { label: 'Input frequency', value: c.frequency },
    { label: 'Power factor', value: c.pf },
    { label: 'Total harmonic distortion', value: c.thd },
    { label: 'Surge protection', value: c.surge },
    { label: 'IP protection', value: c.ip },
    c.ik && { label: 'Impact resistance', value: c.ik },
    { label: 'Body material', value: c.body },
    { label: 'Working temperature', value: c.temp },
    c.life && { label: 'Rated life', value: c.life },
    { label: 'LED make', value: c.ledMake },
    { label: 'Certification', value: c.cert },
    { label: 'Warranty', value: c.warranty },
  ].filter(Boolean);

  return {
    division: 'lighting',
    render: { kind: c.category === 'flood' ? 'flood' : 'street', size: c.wattage },
    ...c,
    specs,
    highlights: [
      { label: 'Output', value: `≈ ${lumens} lm` },
      { label: 'Protection', value: 'IP66' },
      { label: 'Warranty', value: '2 years' },
    ],
  };
};

export const lightingProducts = [
  light({
    slug: '50w-led-street-light',
    name: '50W LED Street Light',
    model: 'CLCE50A',
    category: 'street',
    type: 'Pole mount',
    wattage: 50,
    featured: 1,
    image: '/lighting/Crista_50W_Street_Light.webp',
    photo: 'streetNight',
    ledType: '1W ultra-bright high-power SMD single-chip LED',
    ledCount: '50 or more',
    efficacy: 120,
    colour: 'Warm white',
    sensor: true,
    rated: '220–240V AC, 50Hz',
    inputRange: '120–270V AC',
    surge: '6 kV',
    ik: 'IK08',
    ledMake: 'MS / Philips / Osram / Wipro LEDs',
    summary: 'Warm-white street light with automatic dusk-to-dawn sensor for lanes, campuses and colonies.',
    description:
      'The Crista 50W LED Street Light delivers around 6,000 lumens of warm white light from 50+ high-power SMD LEDs at 120 lm/W. A built-in photocell sensor switches it on at dusk and off at dawn, so no timer or manual switching is needed. The pressure die-cast aluminium body is IP66 sealed against water and dust and IK08 rated against impact, and a wide 120–270V input range with 6 kV surge protection keeps it running reliably on fluctuating supply.',
    features: [
      'Automatic dusk-to-dawn operation with built-in photocell sensor',
      'Warm white light, comfortable for residential streets and campuses',
      'Wide 120–270V AC input range for unstable supply',
      'IP66 water and dust protection with IK08 impact resistance',
      'Branded LEDs (MS / Philips / Osram / Wipro) with CRI above 80',
      '2-year warranty',
    ],
    applications: ['Residential colonies and lanes', 'Campus and township roads', 'Parks and pathways', 'Parking areas'],
  }),
  light({
    slug: '100w-led-street-light',
    name: '100W LED Street Light',
    model: 'CLCE100A',
    category: 'street',
    type: 'Pole mount',
    wattage: 100,
    featured: 2,
    image: '/lighting/Crista_100W_Street_Light.webp',
    photo: 'heroNight',
    ledType: '1W high-power LED',
    ledCount: 'More than 100',
    efficacy: 120,
    colour: 'Cool white',
    sensor: true,
    rated: '230V AC, 50Hz',
    inputRange: '110–270V AC',
    surge: '6 kV',
    life: '50,000 burning hours',
    ledMake: 'MS / Philips / Osram / Wipro LEDs',
    summary: 'Cool-white street light with dusk-to-dawn sensor for main roads and industrial estates.',
    description:
      'The Crista 100W LED Street Light produces around 12,000 lumens of cool white light from over 100 high-power LEDs at 120 lm/W, giving bright, even coverage for wider roads. A built-in photocell sensor handles automatic dusk-to-dawn switching. Its IP66 die-cast aluminium body, 110–270V input range and 6 kV surge protection are built for continuous outdoor duty, with a rated life of 50,000 burning hours.',
    features: [
      'Automatic dusk-to-dawn operation with built-in photocell sensor',
      'Cool white light for high visibility on main roads',
      'Rated life of 50,000 burning hours',
      'Wide 110–270V AC input range with 6 kV surge protection',
      'IP66 pressure die-cast aluminium body',
      'Branded LEDs (MS / Philips / Osram / Wipro), 2-year warranty',
    ],
    applications: ['Main and arterial roads', 'Industrial estates', 'Highways and service roads', 'Large parking areas'],
  }),
  light({
    slug: '200w-led-flood-light',
    name: '200W LED Flood Light',
    model: 'CLCE200A',
    category: 'flood',
    type: 'Bracket mount',
    wattage: 200,
    featured: 3,
    image: '/lighting/Crista_200W_Flood_Light.webp',
    photo: 'stadium',
    ledType: '5W 5050 high-power LED',
    ledCount: 'More than 70',
    efficacy: 130,
    cct: '5700K (cool daylight)',
    rated: '230V AC, 50Hz',
    inputRange: '110–270V AC',
    surge: '10 kV',
    life: '50,000 burning hours',
    ledMake: 'Manlux LEDs',
    summary: 'High-output 5700K flood light for grounds, yards, façades and perimeter security.',
    description:
      'The Crista 200W LED Flood Light delivers around 26,000 lumens of crisp 5700K daylight from 5W 5050 high-power LEDs at 130 lm/W. It is designed for large areas that need strong, uniform light, such as sports grounds, yards, building façades and perimeters. Heavy 10 kV surge protection, an IP66 die-cast aluminium body and a 50,000-hour rated life make it suited to demanding outdoor sites.',
    features: [
      'High 130 lm/W efficacy, around 26,000 lumens',
      '5700K cool daylight for clear visibility over large areas',
      'Heavy-duty 10 kV surge protection',
      'IP66 pressure die-cast aluminium body',
      'Rated life of 50,000 burning hours',
      '2-year warranty',
    ],
    applications: ['Sports grounds and stadiums', 'Yards and loading areas', 'Building façades', 'Perimeter and security lighting'],
  }),
];

/* ---------- Gym helpers ---------- */
/*
 * Outdoor gym & playground range. Construction data is the standard model
 * specification; site-specific dimensions and colours are confirmed per quote.
 * Product photos: public/gym-equipments/<slug>.webp (falls back to a placeholder).
 */
const BUILD = {
  bearings: 'SKF bearings',
  finish: 'Weather-resistant powder coating',
  pipe: 'GI pipe with ISI mark',
};

const STD_FEATURES = [
  'SKF bearings for smooth, low-maintenance movement',
  'ISI-marked galvanised iron (GI) pipe frame',
  'Weather-resistant powder-coated finish for outdoor use',
];

const gym = (p) => {
  const { users, post = '4.5″ GI pipe', wall = '3.5 mm', bearings = true, material = BUILD.pipe, muscles, equipType } = p;
  const specs = [
    { label: 'Equipment type', value: equipType },
    users && { label: 'Users at a time', value: String(users) },
    muscles && { label: 'Target areas', value: muscles },
    { label: 'Frame material', value: material },
    post && { label: 'Main post', value: post },
    wall && { label: 'Pipe wall thickness', value: wall },
    bearings && { label: 'Bearings', value: BUILD.bearings },
    { label: 'Finish', value: BUILD.finish },
    { label: 'Installation', value: p.install ?? 'Concrete foundation with anchor bolts' },
    { label: 'Suitable for', value: p.usage },
  ].filter(Boolean);

  const highlights = p.highlights ?? [
    { label: 'Users', value: users ? String(users) : 'Multi' },
    { label: 'Frame', value: post ? post.replace(' GI pipe', ' GI') : 'GI pipe' },
    bearings ? { label: 'Bearings', value: 'SKF' } : { label: 'Finish', value: 'Powder coat' },
  ];

  return {
    division: 'gym',
    image: `/gym-equipments/${p.slug}.webp`,
    render: { kind: 'none' },
    ...p,
    specs,
    highlights,
    features: [...(p.extra ?? []), ...(bearings ? STD_FEATURES : STD_FEATURES.slice(1))],
  };
};

const OUTDOOR_APPS = ['Public parks', 'Residential societies', 'Schools & colleges', 'Municipal open-air gyms'];
const PLAY_APPS = ['Public parks', 'Schools & play schools', 'Residential societies', 'Resorts & townships'];

/* Outdoor gym defaults */
const og = (p) => gym({ usage: 'Adults & seniors', applications: OUTDOOR_APPS, ...p });
/* Playground defaults — no 4.5″ post / wall spec in the standard model */
const pg = (p) => gym({ usage: 'Children', post: null, wall: null, applications: PLAY_APPS, ...p });

export const gymProducts = [
  /* ----- Cardio stations ----- */
  og({
    slug: 'air-walker', name: 'Air Walker', category: 'cardio', type: 'Single user', users: 1, featured: 1,
    equipType: 'Outdoor cardio station', muscles: 'Legs, hips, cardiovascular',
    summary: 'Free-swinging walking station for low-impact outdoor cardio.',
    description: 'Users stand on the foot pedals and swing their legs forward and back in a smooth walking motion while holding the fixed handlebar. A gentle, joint-friendly workout that improves leg strength, balance and circulation for all fitness levels.',
    extra: ['Low-impact walking motion, easy on knees and joints', 'Fixed safety handlebar for balance'],
  }),
  og({
    slug: 'sky-walker', name: 'Sky Walker', category: 'cardio', type: 'Two user', users: 2,
    equipType: 'Outdoor cardio station', muscles: 'Legs, hips, core, cardiovascular',
    summary: 'Twin walking station with longer stride swing for two users.',
    description: 'A double walking station where two users exercise side by side on independent swinging pedals. The longer stride works the hips and thighs harder than a standard walker while staying low-impact.',
    extra: ['Two independent stations on one central post', 'Long-stride swing for hip mobility'],
  }),
  og({
    slug: 'double-stepper', name: 'Double Stepper', category: 'cardio', type: 'Two user', users: 2,
    equipType: 'Outdoor cardio station', muscles: 'Thighs, calves, glutes',
    summary: 'Stair-climbing motion for two users at the same time.',
    description: 'Alternating step pedals recreate a stair-climbing action to build leg strength and endurance. Two stations share one post, making it a space-efficient cardio choice for busy parks.',
    extra: ['Alternating step pedals with anti-slip footplates', 'Handlebar support for stable stepping'],
  }),
  og({
    slug: 'rower', name: 'Rower', category: 'cardio', type: 'Single user', users: 1,
    equipType: 'Outdoor cardio station', muscles: 'Back, arms, legs, core',
    summary: 'Seated rowing station for a full-body outdoor workout.',
    description: 'A seated rowing action that combines a leg push with an arm pull, working the back, shoulders, arms and legs together. Builds endurance and upper-body strength using the user’s own body weight.',
    extra: ['Full-body push-and-pull rowing motion', 'Contoured seat and footrests'],
  }),
  og({
    slug: 'horse-rider', name: 'Horse Rider', category: 'cardio', type: 'Single user', users: 1,
    equipType: 'Outdoor cardio station', muscles: 'Arms, back, thighs, core',
    summary: 'Riding-motion trainer that works arms and legs together.',
    description: 'Users sit and push the footrests while pulling the handlebars, lifting their own body weight in a riding motion. Strengthens the arms, back and thighs and improves coordination.',
    extra: ['Body-weight resistance, no adjustment needed', 'Combined arm pull and leg push'],
  }),
  og({
    slug: 'outdoor-cycle', name: 'Outdoor Exercise Cycle', category: 'cardio', type: 'Single user', users: 1,
    equipType: 'Outdoor cardio station', muscles: 'Thighs, calves, cardiovascular',
    summary: 'Stationary pedal cycle built for open-air installation.',
    description: 'A fixed outdoor exercise cycle with a sealed flywheel and comfortable seat. Pedalling improves leg strength, knee mobility and heart health, and suits users of every age.',
    extra: ['Enclosed flywheel for smooth pedalling', 'Comfortable fixed seat and handlebar'],
  }),
  og({
    slug: 'cross-trainer', name: 'Cross Trainer', category: 'cardio', type: 'Single user', users: 1, featured: 2,
    equipType: 'Outdoor cardio station', muscles: 'Full body, cardiovascular',
    summary: 'Elliptical-style trainer with moving arms for full-body cardio.',
    description: 'An outdoor elliptical trainer that pairs a gliding foot motion with moving handlebars. Delivers a full-body cardio workout with minimal impact on the joints.',
    extra: ['Elliptical stride with synchronised arm movement', 'Large anti-slip foot pedals'],
  }),
  og({
    slug: 'twister-stepper', name: 'Twister + Stepper', category: 'cardio', type: 'Two user', users: 2,
    equipType: 'Combination cardio station', muscles: 'Waist, hips, thighs, calves',
    summary: 'Two-in-one station combining a waist twister and a stepper.',
    description: 'One post carries a twister disc and a stepper, so two users can train at once: one twisting for waist and core mobility, the other stepping for leg strength and endurance.',
    extra: ['Two exercises on one compact footprint'],
  }),

  /* ----- Strength stations ----- */
  og({
    slug: 'double-shoulder-press', name: 'Double Shoulder Press', category: 'strength', type: 'Two user', users: 2, featured: 3,
    equipType: 'Outdoor strength station', muscles: 'Shoulders, triceps, upper back',
    summary: 'Seated overhead press for two users using body weight.',
    description: 'Two seated stations where users push the handles upward, lifting their own body weight. Builds shoulder and arm strength and improves upper-body posture.',
    extra: ['Body-weight resistance, safe for beginners', 'Backrest support on both seats'],
  }),
  og({
    slug: 'double-chest-press', name: 'Double Chest Press', category: 'strength', type: 'Two user', users: 2, featured: 4,
    equipType: 'Outdoor strength station', muscles: 'Chest, shoulders, triceps',
    summary: 'Twin seated chest press for upper-body strength.',
    description: 'Users sit with back support and push the handles forward against their own body weight. Strengthens the chest, shoulders and arms on two independent stations.',
    extra: ['Two independent pressing stations', 'Backrest support on both seats'],
  }),
  og({
    slug: 'shoulder-cum-chest-press', name: 'Shoulder cum Chest Press', category: 'strength', type: 'Two user', users: 2,
    equipType: 'Combination strength station', muscles: 'Chest, shoulders, arms',
    summary: 'Chest press and shoulder press on one shared post.',
    description: 'A two-station combination with a chest press on one side and a shoulder press on the other. Covers the main upper-body pushing movements in a single installation.',
    extra: ['Two different exercises on one station'],
  }),
  og({
    slug: 'double-seated-puller', name: 'Double Seated Puller', category: 'strength', type: 'Two user', users: 2,
    equipType: 'Outdoor strength station', muscles: 'Back, biceps, shoulders',
    summary: 'Twin seated pull-down station for back and arm strength.',
    description: 'Users sit and pull the overhead handles down, lifting their body weight. Works the upper back, shoulders and biceps and helps improve posture.',
    extra: ['Pull-down motion against body weight', 'Two seats on one central post'],
  }),
  og({
    slug: 'single-pull-down', name: 'Single Pull Down', category: 'strength', type: 'Single user', users: 1,
    equipType: 'Outdoor strength station', muscles: 'Lats, upper back, biceps',
    summary: 'Seated lat pull-down station for one user.',
    description: 'A single seated station where the user pulls the lever arm down, lifting their own body weight. Strengthens the lats, upper back and arms.',
    extra: ['Lever-arm pull-down motion', 'Contoured seat with back support'],
  }),
  og({
    slug: 'double-leg-press', name: 'Double Leg Press', category: 'strength', type: 'Two user', users: 2, featured: 5,
    equipType: 'Outdoor strength station', muscles: 'Quadriceps, hamstrings, glutes',
    summary: 'Seated leg press for two users, powered by body weight.',
    description: 'Users sit and push the footplate away, raising their own body weight. Strengthens the thighs and glutes and supports knee and hip mobility.',
    extra: ['Large anti-slip footplates', 'Backrest support on both seats'],
  }),
  og({
    slug: 'leg-extension-knee-chair', name: 'Leg Extension / Knee Chair', category: 'strength', type: 'Single user', users: 1,
    equipType: 'Outdoor strength station', muscles: 'Quadriceps, knees',
    summary: 'Seated leg extension for knee strength and mobility.',
    description: 'Users sit and raise the padded leg bar, strengthening the quadriceps and supporting the knee joint. Popular with senior citizens for knee care and rehabilitation-style exercise.',
    extra: ['Padded leg roller', 'Gentle range of motion, suits seniors'],
  }),
  og({
    slug: 'pec-deck-fly', name: 'Pec Deck Fly', category: 'strength', type: 'Two user', users: 2,
    equipType: 'Outdoor strength station', muscles: 'Chest, front shoulders',
    summary: 'Seated chest fly station for two users.',
    description: 'Users bring the arm pads together in front of the chest in a fly motion. Isolates the chest muscles and improves shoulder mobility on two independent seats.',
    extra: ['Chest fly motion with padded arms', 'Two independent seats'],
  }),

  /* ----- Core & flexibility ----- */
  og({
    slug: 'twister-seating-standing', name: 'Twister (Seating + Standing)', category: 'core', type: 'Two user', users: 2,
    equipType: 'Outdoor flexibility station', muscles: 'Waist, lower back, hips',
    summary: 'Waist twister with one seated and one standing station.',
    description: 'Rotating discs let one user twist while seated and another while standing. Improves waist flexibility and lower-back mobility, and suits all ages.',
    extra: ['Seated and standing options on one post'],
  }),
  og({
    slug: 'triple-standing-twister', name: 'Triple Standing Twister', category: 'core', type: 'Three user', users: 3,
    equipType: 'Outdoor flexibility station', muscles: 'Waist, hips, lower back',
    summary: 'Three standing twist discs around one central post.',
    description: 'Three users stand on rotating discs and twist the waist while holding the central handle. Improves core flexibility, balance and hip mobility.',
    extra: ['Three rotating discs on one post', 'Central handle for balance'],
  }),
  og({
    slug: 'triple-seating-twister', name: 'Triple Seating Twister', category: 'core', type: 'Three user', users: 3,
    equipType: 'Outdoor flexibility station', muscles: 'Waist, obliques, lower back',
    summary: 'Three seated rotating stations for waist mobility.',
    description: 'Three rotating seats let users twist the upper body while seated. A gentle core and waist workout well suited to seniors.',
    extra: ['Three rotating seats on one post', 'Seated use, suitable for seniors'],
  }),
  og({
    slug: 'double-shoulder-wheel', name: 'Double Shoulder Wheel', category: 'core', type: 'Two user', users: 2,
    equipType: 'Outdoor mobility station', muscles: 'Shoulders, arms, upper back',
    summary: 'Twin rotating wheels for shoulder mobility.',
    description: 'Users turn the large wheels in circular motions to loosen the shoulder joints and improve arm flexibility. Often used for shoulder stiffness and gentle rehabilitation exercise.',
    extra: ['Two large rotating wheels', 'Gentle, low-effort shoulder mobility'],
  }),
  og({
    slug: 'abs-board-duo', name: 'Abs Board Duo', category: 'core', type: 'Two user', users: 2,
    equipType: 'Outdoor core station', muscles: 'Abdominals, hip flexors',
    summary: 'Double sit-up board for abdominal training.',
    description: 'Two inclined sit-up boards with foot holds for crunches and sit-ups. Strengthens the abdominal and core muscles.',
    extra: ['Two inclined sit-up boards', 'Secure foot holds'],
  }),
  og({
    slug: 'double-surf-board', name: 'Double Surf Board', category: 'core', type: 'Two user', users: 2,
    equipType: 'Outdoor core station', muscles: 'Waist, hips, thighs',
    summary: 'Side-to-side swinging platforms for two users.',
    description: 'Users stand on swinging footplates and move side to side in a surfing motion. Works the waist, hips and thighs and improves balance and coordination.',
    extra: ['Side-to-side swing motion', 'Handlebar support for balance'],
  }),
  og({
    slug: 'surf-board-cum-twister', name: 'Surf Board cum Twister', category: 'core', type: 'Two user', users: 2,
    equipType: 'Combination core station', muscles: 'Waist, hips, thighs',
    summary: 'Surf board and waist twister on one station.',
    description: 'A combination station with a swinging surf board on one side and a twister disc on the other, giving two users balance and waist-mobility exercise together.',
    extra: ['Two different exercises on one station'],
  }),
  og({
    slug: 'tai-chi-spinner', name: 'Tai Chi Spinner', category: 'core', type: 'Multi-user', users: null, featured: 6,
    equipType: 'Outdoor mobility station', muscles: 'Shoulders, arms, wrists',
    summary: 'Multiple hand wheels for shoulder and arm mobility.',
    description: 'Users rotate the hand wheels in slow, flowing circles to improve shoulder, arm and wrist mobility. A calm, low-effort station popular with senior citizens.',
    extra: ['Several hand wheels on one post', 'Slow, flowing movement for seniors'],
  }),
  og({
    slug: 'leg-stretcher', name: 'Leg Stretcher', category: 'core', type: 'Multi-user', users: null, bearings: false,
    equipType: 'Outdoor stretching station', muscles: 'Hamstrings, calves, hips',
    summary: 'Multi-height bars for leg stretching and warm-up.',
    description: 'Bars at different heights let users rest a leg and stretch the hamstrings, calves and hips. Ideal for warm-ups and cool-downs before and after walking or jogging.',
    extra: ['Bars at multiple heights', 'No moving parts, minimal maintenance'],
  }),

  /* ----- Bodyweight bars ----- */
  og({
    slug: 'parallel-bar', name: 'Parallel Bar', category: 'bodyweight', type: 'Multi-user', users: null, post: null,
    equipType: 'Bodyweight station', muscles: 'Triceps, chest, shoulders, core',
    summary: 'Angled bars for dips, push-ups and stretching.',
    description: 'Angled parallel bars arranged around a central post for dips, incline push-ups and supported stretching. Builds upper-body and core strength using body weight.',
    extra: ['Supports dips, push-ups and stretches'],
  }),
  og({
    slug: 'double-bar', name: 'Double Bar', category: 'bodyweight', type: 'Multi-user', users: null,
    equipType: 'Bodyweight station', muscles: 'Back, arms, core',
    summary: 'Twin horizontal bars at two heights for pull-ups and hangs.',
    description: 'Two horizontal bars at different heights for pull-ups, hanging and supported stretches. Suits both beginners and experienced users.',
    extra: ['Two bar heights for different users'],
  }),
  og({
    slug: 'chin-up-dipping', name: 'Chin Up & Dipping Station', category: 'bodyweight', type: 'Single user', users: 1, featured: 7,
    equipType: 'Bodyweight station', muscles: 'Back, biceps, triceps, chest',
    summary: 'Combined pull-up and dip station.',
    description: 'A tower with a chin-up bar on top and dip handles below, covering the two key bodyweight upper-body exercises in one station.',
    extra: ['Chin-up bar and dip handles in one frame'],
  }),
  og({
    slug: 'monkey-bar', name: 'Monkey Bar', category: 'bodyweight', type: 'Multi-user', users: null, post: null, usage: 'All ages',
    equipType: 'Overhead ladder', muscles: 'Grip, shoulders, back, arms',
    summary: 'Overhead ladder for hanging and traversing.',
    description: 'An overhead horizontal ladder for hanging, swinging and traversing hand over hand. Builds grip, shoulder and arm strength and is popular with children and adults alike.',
    extra: ['Overhead ladder with access steps'],
  }),

  /* ----- Playground equipment ----- */
  pg({
    slug: 'standing-merry-go-round', name: 'Standing Merry-Go-Round', category: 'playground', type: 'Multi-user', users: null,
    equipType: 'Merry-go-round (standing)',
    summary: 'Rotating platform with handrails for standing play.',
    description: 'A sturdy rotating platform with handrails where children stand and spin together. Encourages group play, balance and coordination.',
    extra: ['Smooth-rotating platform', 'Handrails all around'],
  }),
  pg({
    slug: 'six-seater-merry-go-round', name: 'Six-Seater Merry-Go-Round', category: 'playground', type: 'Multi-user', users: 6, featured: 8,
    equipType: 'Merry-go-round (seated)',
    summary: 'Seated merry-go-round for up to six children.',
    description: 'A rotating merry-go-round with six seats and a central steering wheel. A classic park favourite built for daily outdoor use.',
    extra: ['Six seats with backrests', 'Central wheel for safe rotation'],
  }),
  pg({
    slug: 'roller-slide', name: 'Roller Slide', category: 'playground', type: 'Multi-user', users: null,
    equipType: 'Roller slide',
    summary: 'Long slide fitted with rolling bars for a smooth ride.',
    description: 'A long slide surface made of free-rolling bars, giving children a fun, controlled ride. Includes a ladder with handrails for safe access.',
    extra: ['Free-rolling bar surface', 'Ladder with side handrails'],
  }),
  pg({
    slug: 'frp-spiral-slide', name: 'FRP Spiral Slide', category: 'playground', type: 'Multi-user', users: null, material: 'GI pipe with ISI mark, FRP slide',
    equipType: 'Spiral slide',
    summary: 'Curved spiral slide in durable fibre-reinforced plastic.',
    description: 'A spiral slide moulded in fibre-reinforced plastic (FRP) on a GI pipe structure with a safety ladder. Smooth, rounded edges and bright colours for outdoor play areas.',
    extra: ['Seamless FRP slide body', 'Enclosed platform and safety ladder'],
  }),
  pg({
    slug: 'triple-wave-slide', name: 'Triple Wave Slide', category: 'playground', type: 'Multi-user', users: 3, material: 'GI pipe with ISI mark, FRP slide',
    equipType: 'Wave slide (3 lanes)',
    summary: 'Three side-by-side wave slides on one platform.',
    description: 'Three wavy FRP slides share one climbing platform, so several children can slide at once. Ideal for busy parks and school play areas.',
    extra: ['Three FRP wave slide lanes', 'Shared climbing frame and platform'],
  }),
  pg({
    slug: 'four-seater-see-saw', name: 'Four-Seater See Saw', category: 'playground', type: 'Multi-user', users: 4,
    equipType: 'See saw',
    summary: 'Double see saw with seats for four children.',
    description: 'A double see saw with four seats and handles, letting four children play together. Built on a fixed base for outdoor installation.',
    extra: ['Four seats with handles'],
  }),
  pg({
    slug: 'spring-rider', name: 'Spring Rider', category: 'playground', type: 'Single user', users: 1, post: null,
    equipType: 'Spring rider (animal design)',
    summary: 'Animal-shaped rider on a heavy-duty spring.',
    description: 'A bright animal-shaped rider mounted on a heavy-duty coil spring. Children rock in every direction, building balance and motor skills.',
    extra: ['Heavy-duty coil spring', 'Handles and footrests'],
  }),
  pg({
    slug: 'double-swing', name: 'Double Swing', category: 'playground', type: 'Two user', users: 2, wall: '3.5 mm',
    equipType: 'Swing (2 seats)',
    summary: 'A-frame swing with two seats.',
    description: 'A classic A-frame swing set with two seats on a GI pipe frame. Bearing-mounted hangers give a smooth, quiet swing.',
    extra: ['A-frame structure for stability', 'Two seats with chains'],
  }),
  pg({
    slug: 'cast-iron-bench', name: 'Cast Iron Park Bench', category: 'playground', type: 'Park furniture', users: null, usage: 'All ages', bearings: false,
    material: 'Cast iron legs with GI frame', equipType: 'Park bench',
    highlights: [{ label: 'Legs', value: 'Cast iron' }, { label: 'Use', value: 'Outdoor' }, { label: 'Finish', value: 'Powder coat' }],
    summary: 'Classic park bench with decorative cast iron legs.',
    description: 'A sturdy outdoor bench with ornamental cast iron side frames and slatted seat and backrest. A durable seating option for parks, gardens and walkways.',
    extra: ['Ornamental cast iron side frames', 'Slatted seat and backrest'],
    applications: ['Public parks', 'Gardens & walkways', 'Residential societies', 'Campuses'],
  }),

  /* ----- Play combination sets ----- */
  ...[
    { slug: 'twin-slide-loop-ring-combo', name: 'Twin Slide & Loop Ring Combo', parts: ['Double FRP slide', 'Hanging loop rings', 'Double-seater swing', 'One canopy'] },
    { slug: 'swing-slide-combo', name: 'Swing & Slide Combo', parts: ['Double-seater swing', 'FRP straight slide', 'Two cartoon pole covers'] },
    { slug: 'tunnel-spiral-slide-combo', name: 'Tunnel & Spiral Slide Combo', parts: ['Tunnel slide', 'Spiral slide', 'Two flower décor panels', 'Butterfly décor'] },
    { slug: 'triple-slide-swing-combo', name: 'Triple Slide & Swing Combo', parts: ['Spiral slide', 'Straight slide', 'Wave slide', 'Two canopies', 'Double-seater swing'] },
    { slug: 'spiral-slide-play-tower', name: 'Spiral Slide Play Tower', parts: ['Spiral slide', 'Straight slide', 'Hanging loop rings', 'Top cover', 'Play board'] },
    { slug: 'mega-play-combo', name: 'Mega Play Combo', parts: ['Double straight slide', 'Wave slide', 'Tunnel slide', 'Flower & butterfly décor', 'Double-seater swing'] },
  ].map((c) => {
    const lc = (x) => (/^[A-Z][a-z]/.test(x) ? x.charAt(0).toLowerCase() + x.slice(1) : x);
    const list = c.parts.map(lc).join(', ');
    return pg({
    slug: c.slug, name: c.name, category: 'combo', type: 'Combination set', users: null,
    material: 'GI pipe with ISI mark, FRP slides', bearings: false, install: 'Concrete foundation; installed on site',
    equipType: `Playground combination set (${c.parts.length} elements)`,
    highlights: [{ label: 'Elements', value: String(c.parts.length) }, { label: 'Slides', value: 'FRP' }, { label: 'Frame', value: 'GI pipe' }],
    summary: `Multi-play set: ${list}.`,
    description: `A complete play structure that brings several activities together in one installation: ${list}. Designed to keep many children engaged at once in parks, schools and residential societies.`,
    extra: c.parts.map((x) => `Includes ${lc(x)}`),
    });
  }),
];

/* ---------- Shared ---------- */
const withMeta = (p) => ({
  ...p,
  specStatus: 'datasheet',
  categoryName: [...LIGHTING_CATEGORIES, ...GYM_CATEGORIES].find((c) => c.slug === p.category)?.name ?? '',
  url: `/products/${p.slug}`,
  features: p.features ?? [],
});

export const products = [...lightingProducts, ...gymProducts].map(withMeta);

export const getProduct = (slug) => products.find((p) => p.slug === slug);

export const getByDivision = (division) => products.filter((p) => p.division === division);

export const getFeatured = (division, n = 8) =>
  getByDivision(division)
    .filter((p) => p.featured)
    .sort((a, b) => a.featured - b.featured)
    .slice(0, n);

export const getRelated = (product, n = 4) => {
  const pool = getByDivision(product.division).filter((p) => p.slug !== product.slug);
  const same = pool.filter((p) => p.category === product.category);
  const rest = pool.filter((p) => p.category !== product.category);
  return [...same, ...rest].slice(0, n);
};

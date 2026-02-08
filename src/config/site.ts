/**
 * Honeydew Homes V3 - Site Configuration
 */

export const ASSET_PREFIX = '/honeydew-homes-v3-';

export const BOOK_URL = 'https://book.housecallpro.com/book/HoneyDew-Homes/1a8cf53602dc4a05b78968e265bb487d?v2=true';

export const siteConfig = {
  businessName: 'Honeydew Homes',
  tagline: 'Make-ready construction in Austin, Texas.',
  phone: '(512) 555-0134',
  email: 'hello@honeydew.co',
  bookingUrl: BOOK_URL,

  // Core make-ready services
  coreServices: [
    {
      id: 'punch-lists',
      title: 'Make-Ready Punch Lists',
      description: 'Complete pre-listing preparation. Every item addressed, every detail checked.',
    },
    {
      id: 'paint',
      title: 'Interior Paint + Patch',
      description: 'Clean lines, neutral tones, photographer-ready walls.',
    },
    {
      id: 'flooring',
      title: 'Flooring Refresh',
      description: 'Repairs, refinishing, or full replacement. Back underfoot in days, not weeks.',
    },
    {
      id: 'landscaping',
      title: 'Landscaping + Curb Appeal',
      description: 'First impressions that sell. Beds, lawn, mulch, and walkways.',
    },
    {
      id: 'cleaning',
      title: 'Deep Clean + Haul-Off',
      description: 'Move-in ready from floor to ceiling. Every trace of the old owner, gone.',
    },
    {
      id: 'carpentry',
      title: 'Light Carpentry + Repairs',
      description: 'Doors, trim, fixtures — the details buyers notice first.',
    },
  ],

  // Add-on services
  addOnServices: [
    {
      id: 'staging-prep',
      title: 'Staging Prep',
      description: 'Coordinated with your stager. Walls prepped, fixtures updated, timeline synced.',
    },
    {
      id: 'pressure-washing',
      title: 'Pressure Washing',
      description: 'Driveways, walkways, and siding looking brand new.',
    },
    {
      id: 'window-cleaning',
      title: 'Window Cleaning',
      description: 'Interior and exterior. Crystal clear, streak-free.',
    },
  ],

  // Process steps
  processSteps: [
    {
      number: '01',
      title: 'Walkthrough',
      description: 'We meet at the property. You show us the scope.',
      detail: '24–48 hour scheduling',
    },
    {
      number: '02',
      title: 'Scope + Estimate',
      description: 'Clear line items. No surprises.',
      detail: 'Sent same day',
    },
    {
      number: '03',
      title: 'Schedule + Crew',
      description: 'We lock in dates and assign your team.',
      detail: 'Single point of contact',
    },
    {
      number: '04',
      title: 'Daily Updates',
      description: 'Photo check-ins every day until done.',
      detail: 'Text or email',
    },
    {
      number: '05',
      title: 'Final Walkthrough',
      description: 'Punch list closed. Keys ready.',
      detail: 'Photo-ready handoff',
    },
  ],

  // FAQ items
  faqs: [
    {
      question: 'How fast can you start?',
      answer: 'Most projects start within 3–5 business days of the walkthrough. Rush jobs available for an additional fee.',
    },
    {
      question: 'Do you work with occupied homes?',
      answer: 'Yes. We coordinate access with tenants and keep work areas clean. We have done hundreds of occupied turnovers.',
    },
    {
      question: 'How do payments work?',
      answer: '50% deposit to schedule, 50% on completion. We accept check, card, and ACH. Net-30 available for established accounts.',
    },
    {
      question: 'Do you do estimates from photos?',
      answer: 'We can provide rough ballparks, but accurate estimates require a walkthrough. Too many surprises in photos.',
    },
    {
      question: 'What is your service area?',
      answer: 'Austin, Round Rock, Cedar Park, Georgetown, Pflugerville, Lakeway, Bee Cave, and surrounding areas.',
    },
    {
      question: 'Are you licensed and insured?',
      answer: 'Yes. Fully licensed in Texas, $1M general liability, workers comp on all crews.',
    },
    {
      question: 'Can you coordinate with my stager or photographer?',
      answer: 'Absolutely. We work with stagers and photographers regularly. Just let us know the schedule.',
    },
    {
      question: 'What if something comes up mid-project?',
      answer: 'We will call you immediately with options and pricing. No work happens without your approval.',
    },
  ],

  // Proof points (outcomes, not features)
  proofPoints: [
    'Photo-ready finishes',
    'Realtor timelines',
    'One crew, one contact',
  ],

  // Values (short statements)
  values: [
    { title: 'Clear scopes', description: 'You'll know exactly what we're doing and what it costs.' },
    { title: 'Fast turnarounds', description: 'We understand realtor timelines. We hit them, every time.' },
    { title: 'Jobsite respect', description: 'Clean work areas. Professional crews. No surprises.' },
  ],

  serviceAreas: ['Austin', 'Round Rock', 'Cedar Park', 'Georgetown', 'Pflugerville', 'Lakeway', 'Bee Cave'],

  navLinks: [
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Process', href: '/process' },
  ],

  social: {
    instagram: '#',
    facebook: '#',
  },

  // Footer services list
  footerServices: [
    'Make-ready punch lists',
    'Interior paint + patch',
    'Flooring refresh',
    'Landscaping',
    'Deep clean + haul-off',
    'Light carpentry',
  ],

  // Licensing note
  licensingNote: 'Licensed in Texas. $1M general liability. Workers' comp on every crew.',
};

export type SiteConfig = typeof siteConfig;

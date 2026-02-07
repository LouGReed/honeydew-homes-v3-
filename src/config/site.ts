/**
 * Honeydew Homes V3 - Site Configuration
 */

export const BOOK_URL = 'PUT_HOUSECALLPRO_URL_HERE';

export const siteConfig = {
  businessName: 'Honeydew',
  tagline: 'Austin make-ready for realtors.',
  phone: '(512) 555-0134',
  email: 'hello@honeydew.co',
  bookingUrl: BOOK_URL,

  services: [
    {
      title: 'Make-Ready + Turnovers',
      description: 'Complete pre-listing preparation for beautiful photos and faster sales.',
    },
    {
      title: 'Punch Lists + Repairs',
      description: 'Swift execution of inspection items with clear daily updates.',
    },
    {
      title: 'Paint + Finish Work',
      description: 'Clean lines and neutral tones that let the home shine.',
    },
    {
      title: 'Light Remodels',
      description: 'Targeted updates that move listings without full renovation timelines.',
    },
    {
      title: 'Deep Cleaning',
      description: 'Move-in ready surfaces from floor to ceiling.',
    },
    {
      title: 'Staging Prep',
      description: 'Walls patched, fixtures updated, ready for the stager.',
    },
  ],

  proofPoints: [
    { label: 'Realtor-ready punch lists', icon: '✓' },
    { label: 'Daily photo updates', icon: '📷' },
    { label: 'Fast timelines', icon: '⚡' },
    { label: 'Austin-local crews', icon: '🤠' },
  ],

  serviceAreas: ['Austin', 'Round Rock', 'Cedar Park', 'Georgetown', 'Pflugerville'],

  navLinks: [
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
  ],

  social: {
    instagram: '#',
    facebook: '#',
  },
};

export type SiteConfig = typeof siteConfig;

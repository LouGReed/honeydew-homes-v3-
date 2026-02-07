/**
 * Honeydew Homes V3 - Asset Configuration
 *
 * Centralized asset paths for easy swapping.
 * All paths are relative to /public.
 */

export interface ImageAsset {
  src: string;
  alt: string;
  orientation?: 'horizontal' | 'vertical';
}

// ─── Hero Video ────────────────────────────────────────────────────────
// Replace with actual .mp4/.webm when available
// For now, falls back to a static image
export const HERO_VIDEO_SRC = '/video/hero.mp4';
export const HERO_FALLBACK_IMAGE = '/img/pexels/gallery-shuraeva-full.jpg';

// ─── Brand Assets ──────────────────────────────────────────────────────
export const LOGO_SRC = '/img/brand/honeydewlogo.png';

// ─── Slideshow Images (curated, people-focused) ────────────────────────
export const SLIDESHOW_IMAGES: ImageAsset[] = [
  { src: '/img/pexels/gallery-shuraeva.jpg', alt: 'Family settling into new home', orientation: 'horizontal' },
  { src: '/img/pexels/gallery-abayev-5637755.jpg', alt: 'Moving day excitement', orientation: 'vertical' },
  { src: '/img/pexels/gallery-abayev-5638605.jpg', alt: 'Home tour with family', orientation: 'horizontal' },
  { src: '/img/pexels/gallery-karpovich.jpg', alt: 'Everyday home scene', orientation: 'horizontal' },
  { src: '/img/pexels/gallery-lach-8657206.jpg', alt: 'Lifestyle moment at home', orientation: 'vertical' },
  { src: '/img/pexels/gallery-lach-10044378.jpg', alt: 'Comfortable living space', orientation: 'horizontal' },
  { src: '/img/pexels/gallery-lach-10397939.jpg', alt: 'Warm home interior', orientation: 'vertical' },
  { src: '/img/pexels/gallery-ioanamtc-943.jpg', alt: 'Minimalist interior', orientation: 'horizontal' },
];

// ─── About Page Images (editorial layout) ──────────────────────────────
export const ABOUT_IMAGES: ImageAsset[] = [
  { src: '/img/pexels/gallery-shuraeva-full.jpg', alt: 'Family in sunlit home', orientation: 'horizontal' },
  { src: '/img/pexels/gallery-abayev-5637755-full.jpg', alt: 'New homeowners', orientation: 'vertical' },
  { src: '/img/pexels/gallery-karpovich-full.jpg', alt: 'Home life moment', orientation: 'horizontal' },
  { src: '/img/pexels/gallery-lach-10044378-full.jpg', alt: 'Living room lifestyle', orientation: 'horizontal' },
  { src: '/img/pexels/gallery-ioanamtc-079-full.jpg', alt: 'Modern interior', orientation: 'vertical' },
];

// ─── Services Page Images ──────────────────────────────────────────────
export const SERVICES_IMAGES: ImageAsset[] = [
  { src: '/img/pexels/gallery-ioanamtc-943.jpg', alt: 'Clean interior', orientation: 'horizontal' },
  { src: '/img/pexels/gallery-ioanamtc-079.jpg', alt: 'Modern space', orientation: 'horizontal' },
  { src: '/img/pexels/gallery-lach-8657206.jpg', alt: 'Home detail', orientation: 'vertical' },
];

// ─── Validation Logos ──────────────────────────────────────────────────
export const VALIDATION_LOGOS = [
  { src: '/img/validation/compass.png', alt: 'Compass', href: 'https://www.compass.com/' },
  { src: '/img/validation/texas-realtors.png', alt: 'Texas Realtors', href: 'https://www.texasrealestate.com/' },
];

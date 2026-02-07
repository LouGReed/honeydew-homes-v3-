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
  type?: 'image' | 'video';
}

// ─── Hero Video ────────────────────────────────────────────────────────
// Replace with actual .mp4/.webm when available
// For now, falls back to a static image
export const HERO_VIDEO_SRC = '/video/hero.mp4';
export const HERO_FALLBACK_IMAGE = '/picandvideocontentforslideshow/slide-outdoor-2.jpg';

// ─── Brand Assets ──────────────────────────────────────────────────────
export const LOGO_SRC = '/img/brand/honeydewlogo.png';

// ─── Slideshow Images (from picandvideocontentforslideshow folder) ─────
// Single source of truth - ordered list of slideshow items
export const SLIDESHOW_IMAGES: ImageAsset[] = [
  { src: '/picandvideocontentforslideshow/slide-family-1.jpg', alt: 'Family enjoying new home', orientation: 'horizontal', type: 'image' },
  { src: '/picandvideocontentforslideshow/slide-family-2.jpg', alt: 'Family moment together', orientation: 'horizontal', type: 'image' },
  { src: '/picandvideocontentforslideshow/slide-family-3.jpg', alt: 'Happy homeowners', orientation: 'horizontal', type: 'image' },
  { src: '/picandvideocontentforslideshow/slide-home-1.jpg', alt: 'Beautiful home interior', orientation: 'horizontal', type: 'image' },
  { src: '/picandvideocontentforslideshow/slide-outdoor-1.jpg', alt: 'Austin neighborhood', orientation: 'horizontal', type: 'image' },
  { src: '/picandvideocontentforslideshow/slide-outdoor-2.jpg', alt: 'Texas landscape', orientation: 'horizontal', type: 'image' },
  { src: '/picandvideocontentforslideshow/slide-work-1.png', alt: 'Make-ready in progress', orientation: 'horizontal', type: 'image' },
  { src: '/picandvideocontentforslideshow/slide-work-2.png', alt: 'Completed project', orientation: 'horizontal', type: 'image' },
  { src: '/picandvideocontentforslideshow/couplefieldbw.png', alt: 'Couple in field', orientation: 'horizontal', type: 'image' },
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

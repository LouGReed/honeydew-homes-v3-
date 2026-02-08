/**
 * Honeydew Homes V3 - Asset Configuration
 *
 * Centralized asset paths for easy swapping.
 * All paths are relative to /public.
 */

import { ASSET_PREFIX } from './site';

export interface ImageAsset {
  src: string;
  alt: string;
  orientation?: 'horizontal' | 'vertical';
  type?: 'image' | 'video';
}

// ─── Background Videos (rotating hero) ─────────────────────────────────
// MP4 files for cross-browser support (H.264)
export const BACKGROUND_VIDEOS: string[] = [
  `${ASSET_PREFIX}/picandvideocontentforslideshow/video-1.mp4`,
  `${ASSET_PREFIX}/picandvideocontentforslideshow/video-4.mp4`,
  `${ASSET_PREFIX}/picandvideocontentforslideshow/video-2.mp4`,
  `${ASSET_PREFIX}/picandvideocontentforslideshow/video-3.mp4`,
];

export const HERO_FALLBACK_IMAGE = `${ASSET_PREFIX}/picandvideocontentforslideshow/hero-poster.jpg`;

// Video rotation settings
export const VIDEO_ROTATION_INTERVAL = 6000; // 6 seconds between transitions
export const VIDEO_CROSSFADE_DURATION = 1500; // 1.5s smooth crossfade

// ─── Brand Assets ──────────────────────────────────────────────────────
export const LOGO_SRC = `${ASSET_PREFIX}/img/brand/honeydewlogo.png`;

// ─── Slideshow Items (mixed media: images + videos) ────────────────────
// Single source of truth - ordered list of slideshow items
// Only existing video files: video-1.mp4 and video-4.mp4
export const SLIDESHOW_IMAGES: ImageAsset[] = [
  { src: `${ASSET_PREFIX}/picandvideocontentforslideshow/video-1.mp4`, alt: 'Austin property showcase', orientation: 'horizontal', type: 'video' },
  { src: `${ASSET_PREFIX}/img/pexels/slide-family-1.jpg`, alt: 'Family enjoying new home', orientation: 'horizontal', type: 'image' },
  { src: `${ASSET_PREFIX}/picandvideocontentforslideshow/video-4.mp4`, alt: 'Home walkthrough', orientation: 'horizontal', type: 'video' },
  { src: `${ASSET_PREFIX}/img/pexels/slide-family-2.jpg`, alt: 'Family moment together', orientation: 'horizontal', type: 'image' },
  { src: `${ASSET_PREFIX}/img/pexels/slide-home-1.jpg`, alt: 'Beautiful home interior', orientation: 'horizontal', type: 'image' },
  { src: `${ASSET_PREFIX}/img/pexels/slide-outdoor-1.jpg`, alt: 'Austin neighborhood', orientation: 'horizontal', type: 'image' },
  { src: `${ASSET_PREFIX}/picandvideocontentforslideshow/couplefieldbw.png`, alt: 'Couple in field', orientation: 'horizontal', type: 'image' },
];

// ─── About Page Images (editorial layout) ──────────────────────────────
export const ABOUT_IMAGES: ImageAsset[] = [
  { src: `${ASSET_PREFIX}/img/pexels/gallery-shuraeva-full.jpg`, alt: 'Family in sunlit home', orientation: 'horizontal' },
  { src: `${ASSET_PREFIX}/img/pexels/gallery-abayev-5637755-full.jpg`, alt: 'New homeowners', orientation: 'vertical' },
  { src: `${ASSET_PREFIX}/img/pexels/gallery-karpovich-full.jpg`, alt: 'Home life moment', orientation: 'horizontal' },
  { src: `${ASSET_PREFIX}/img/pexels/gallery-lach-10044378-full.jpg`, alt: 'Living room lifestyle', orientation: 'horizontal' },
  { src: `${ASSET_PREFIX}/img/pexels/gallery-ioanamtc-079-full.jpg`, alt: 'Modern interior', orientation: 'vertical' },
];

// ─── Services Page Images ──────────────────────────────────────────────
export const SERVICES_IMAGES: ImageAsset[] = [
  { src: `${ASSET_PREFIX}/img/pexels/gallery-ioanamtc-943.jpg`, alt: 'Clean interior', orientation: 'horizontal' },
  { src: `${ASSET_PREFIX}/img/pexels/gallery-ioanamtc-079.jpg`, alt: 'Modern space', orientation: 'horizontal' },
  { src: `${ASSET_PREFIX}/img/pexels/gallery-lach-8657206.jpg`, alt: 'Home detail', orientation: 'vertical' },
];

// ─── Validation Logos ──────────────────────────────────────────────────
export const VALIDATION_LOGOS = [
  { src: `${ASSET_PREFIX}/img/validation/compass.png`, alt: 'Compass', href: 'https://www.compass.com/' },
  { src: `${ASSET_PREFIX}/img/validation/texas-realtors.png`, alt: 'Texas Realtors', href: 'https://www.texasrealestate.com/' },
];

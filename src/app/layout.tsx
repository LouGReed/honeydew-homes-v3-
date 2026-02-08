import type { Metadata } from 'next';
import './globals.css';

const ASSET_PREFIX = '/honeydew-homes-v3-';
const SITE_URL = 'https://lougreed.github.io/honeydew-homes-v3-';
const OG_IMAGE = `${SITE_URL}/img/pexels/gallery-lach-10397939-full.jpg`;

export const metadata: Metadata = {
  title: 'Honeydew Homes | Austin Make-Ready for Realtors',
  description: 'Premium make-ready services for Austin realtors. Get listings photo-ready fast with Honeydew Homes. Fast turnarounds, clear communication, finishes that photograph beautifully.',
  keywords: ['Austin', 'make-ready', 'realtor', 'Compass', 'home preparation', 'punch list', 'pre-listing', 'Texas', 'contractor'],
  authors: [{ name: 'Honeydew Homes' }],
  creator: 'Honeydew Homes',
  publisher: 'Honeydew Homes',
  metadataBase: new URL(SITE_URL),

  // Open Graph (Facebook, LinkedIn, iMessage, etc.)
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Honeydew Homes',
    title: 'Honeydew Homes | Austin Make-Ready for Realtors',
    description: 'Premium make-ready services for Austin realtors. Get listings photo-ready fast.',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Honeydew Homes - Austin Make-Ready Construction',
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Honeydew Homes | Austin Make-Ready for Realtors',
    description: 'Premium make-ready services for Austin realtors. Get listings photo-ready fast.',
    images: [OG_IMAGE],
  },

  // Additional SEO
  robots: {
    index: true,
    follow: true,
  },

  // Icons
  icons: {
    icon: `${ASSET_PREFIX}/favicon.ico`,
    apple: `${ASSET_PREFIX}/apple-touch-icon.png`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://book.housecallpro.com" />

        {/* Preload critical fonts */}
        <link
          rel="preload"
          href={`${ASSET_PREFIX}/fonts/montreal/Montreal-Regular.ttf`}
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href={`${ASSET_PREFIX}/fonts/montreal/Montreal-Bold.ttf`}
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href={`${ASSET_PREFIX}/fonts/canela/Canela-Medium-Trial.otf`}
          as="font"
          type="font/opentype"
          crossOrigin="anonymous"
        />

        {/* Preload hero fallback image for faster LCP */}
        <link
          rel="preload"
          href={`${ASSET_PREFIX}/img/pexels/gallery-lach-10397939-full.jpg`}
          as="image"
        />

        {/* Preload hero video */}
        <link
          rel="preload"
          href={`${ASSET_PREFIX}/picandvideocontentforslideshow/herovideoslide.MOV`}
          as="video"
          type="video/quicktime"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

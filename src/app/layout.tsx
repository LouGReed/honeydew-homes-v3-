import type { Metadata } from 'next';
import './globals.css';

const ASSET_PREFIX = '/honeydew-homes-v3-';

export const metadata: Metadata = {
  title: 'Honeydew Homes | Austin Make-Ready for Realtors',
  description: 'Premium make-ready services for Austin realtors. Get listings photo-ready fast with Honeydew Homes.',
  keywords: ['Austin', 'make-ready', 'realtor', 'Compass', 'home preparation', 'punch list'],
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

        {/* Preload hero video poster for faster LCP */}
        <link
          rel="preload"
          href={`${ASSET_PREFIX}/picandvideocontentforslideshow/hero-poster.jpg`}
          as="image"
        />

        {/* Preload first video */}
        <link
          rel="preload"
          href={`${ASSET_PREFIX}/picandvideocontentforslideshow/video-1.mp4`}
          as="video"
          type="video/mp4"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

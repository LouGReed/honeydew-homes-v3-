import type { Metadata } from 'next';
import './globals.css';

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
      <body>{children}</body>
    </html>
  );
}

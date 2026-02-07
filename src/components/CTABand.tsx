import Link from 'next/link';
import { BOOK_URL } from '@/config/site';

export function CTABand() {
  return (
    <section className="cta-band">
      <div className="container">
        <div className="cta-band-content">
          <h2 className="cta-band-title">Ready to Get Started?</h2>
          <p className="cta-band-subtitle">
            Book a walkthrough and we'll scope your project together.
          </p>
          <Link href={BOOK_URL} className="btn btn-secondary">
            Book a Walkthrough
          </Link>
        </div>
      </div>
    </section>
  );
}

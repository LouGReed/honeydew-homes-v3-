import Link from 'next/link';
import { SiteHeader, SiteFooter, FAQAccordion } from '@/components';
import { BOOK_URL } from '@/config/site';

export default function FAQPage() {
  return (
    <main>
      <SiteHeader variant="solid" />

      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <h1 className="page-hero-title">FAQ</h1>
          <p className="page-hero-subtitle">
            Common questions about working with Honeydew Homes.
          </p>
        </div>
      </section>

      {/* FAQ List */}
      <section className="section section-cream">
        <div className="container">
          <FAQAccordion />
        </div>
      </section>

      {/* Still have questions */}
      <section className="section section-sand">
        <div className="container">
          <div className="section-header-centered">
            <h2 className="section-title">Still have questions?</h2>
            <p className="section-subtitle">
              Book a walkthrough and we'll answer everything in person.
              No pressure, no commitment.
            </p>
            <div style={{ marginTop: '32px' }}>
              <Link href={BOOK_URL} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                Book a Walkthrough
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

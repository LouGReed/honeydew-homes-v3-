import Link from 'next/link';
import { SiteHeader, SiteFooter } from '@/components';
import { siteConfig, BOOK_URL } from '@/config/site';

export default function ProcessPage() {
  return (
    <main>
      <SiteHeader />

      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <h1 className="page-hero-title">Our Process</h1>
          <p className="page-hero-subtitle">
            Simple, transparent, and built around realtor timelines.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="section section-cream">
        <div className="container">
          <div className="two-col" style={{ alignItems: 'flex-start' }}>
            <div className="process-timeline">
              {siteConfig.processSteps.map((step) => (
                <div key={step.number} className="process-timeline-item">
                  <div className="process-timeline-number">{step.number}</div>
                  <div className="process-timeline-content">
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                    <p className="process-timeline-detail">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="two-col-text">
              <div className="info-block" style={{ marginTop: 0 }}>
                <h4>How we work with realtors</h4>
                <ul>
                  <li>Lockbox or key access — we'll coordinate</li>
                  <li>Occupied homes OK — we've done hundreds</li>
                  <li>Daily photo updates via text or email</li>
                  <li>Single point of contact, start to finish</li>
                  <li>Flexible scheduling around showings</li>
                  <li>Photo-ready finishes, every time</li>
                </ul>
              </div>

              <div className="info-block">
                <h4>Communication cadence</h4>
                <p>
                  You'll hear from us every day your project is active.
                  Photos of progress, any issues that come up, and
                  confirmation when we're done.
                </p>
                <p style={{ marginTop: '12px' }}>
                  Prefer text? Email? Phone calls? Just tell us.
                </p>
              </div>

              <div className="info-block">
                <h4>Access + logistics</h4>
                <p>
                  We work with lockboxes, codes, keys — whatever makes
                  sense for the property. For occupied homes, we coordinate
                  directly with tenants or through you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-fullbleed">
        <div className="container">
          <h2 className="cta-fullbleed-title">
            Ready to get started?
          </h2>
          <Link href={BOOK_URL} className="btn">
            Book a Walkthrough
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

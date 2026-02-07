import Link from 'next/link';
import { HeroVideo } from '@/components';
import { siteConfig, BOOK_URL } from '@/config/site';

export default function HomePage() {
  const currentYear = new Date().getFullYear();

  return (
    <main>
      {/* Hero Section */}
      <section className="hero hero-fixed">
        <HeroVideo />
      </section>

      {/* What We Do - Two Column */}
      <section className="section section-cream">
        <div className="container">
          <div className="two-col">
            <div className="two-col-text">
              <h2 className="section-title">Make-ready construction for Austin realtors</h2>
              <p className="body-lg">
                We get listings photo-ready, fast. One crew, one contact,
                no excuses.
              </p>
              <ul className="outcome-list">
                {siteConfig.proofPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
            <div className="two-col-image">
              <img
                src="/img/pexels/gallery-shuraeva-full.jpg"
                alt="Austin home ready for photos"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services - Editorial List */}
      <section className="section section-sand">
        <div className="container">
          <div className="section-header">
            <p className="section-eyebrow">Services</p>
            <h2 className="section-title">What we do</h2>
          </div>
          <ul className="editorial-list">
            {siteConfig.coreServices.map((service) => (
              <Link key={service.id} href={`/services#${service.id}`}>
                <li className="editorial-list-item">
                  <span className="editorial-list-title">{service.title}</span>
                  <span className="editorial-list-desc">{service.description}</span>
                </li>
              </Link>
            ))}
          </ul>
          <div style={{ marginTop: '48px', textAlign: 'center' }}>
            <Link href="/services" className="btn btn-primary">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section section-cream">
        <div className="container">
          <div className="section-header-centered">
            <p className="section-eyebrow">Process</p>
            <h2 className="section-title">Walkthrough. Plan. Done.</h2>
          </div>
          <div className="process-steps">
            <div className="process-step">
              <div className="process-step-number">01</div>
              <div>
                <h3 className="process-step-title">Walkthrough</h3>
                <p className="process-step-desc">
                  We meet at the property. You show us the scope.
                </p>
                <p className="process-step-detail">24–48 hr scheduling</p>
              </div>
            </div>
            <div className="process-step">
              <div className="process-step-number">02</div>
              <div>
                <h3 className="process-step-title">Plan + Estimate</h3>
                <p className="process-step-desc">
                  Clear line items. Timeline locked. Crew assigned.
                </p>
                <p className="process-step-detail">Daily photo updates</p>
              </div>
            </div>
            <div className="process-step">
              <div className="process-step-number">03</div>
              <div>
                <h3 className="process-step-title">Done</h3>
                <p className="process-step-desc">
                  Final walkthrough. Punch list closed. Keys ready.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="cta-fullbleed">
        <div className="container">
          <h2 className="cta-fullbleed-title">
            Schedule a Walkthrough
          </h2>
          <Link href={BOOK_URL} className="btn">
            Request Appointment
          </Link>
        </div>
      </section>

      {/* Institutional Footer */}
      <footer className="landing-footer">
        <div className="container">
          <div className="landing-footer-inner">
            <div className="landing-footer-primary">
              <p className="landing-footer-brand">Honeydew Homes</p>
              <p className="landing-footer-location">Austin, Texas</p>
            </div>
            <div className="landing-footer-secondary">
              <p className="landing-footer-service">Serving Austin-area real estate professionals</p>
            </div>
            <div className="landing-footer-tertiary">
              <p className="landing-footer-legal">Licensed and insured in Texas</p>
              <p className="landing-footer-copyright">&copy; {currentYear} Honeydew Homes</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

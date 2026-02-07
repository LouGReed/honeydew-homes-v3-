import Link from 'next/link';
import { HeroVideo, SiteFooter } from '@/components';
import { siteConfig, BOOK_URL } from '@/config/site';

export default function HomePage() {
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

      {/* Services Preview - Editorial List */}
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

      {/* Process - 3 Steps */}
      <section className="section section-cream">
        <div className="container">
          <div className="section-header-centered">
            <p className="section-eyebrow">How It Works</p>
            <h2 className="section-title">Walkthrough. Plan. Done.</h2>
            <p className="section-subtitle">
              Simple process, clear communication, no surprises.
            </p>
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
                <p className="process-step-detail">Daily photo check-ins</p>
              </div>
            </div>
            <div className="process-step">
              <div className="process-step-number">03</div>
              <div>
                <h3 className="process-step-title">Done</h3>
                <p className="process-step-desc">
                  Final walkthrough. Punch list closed. Keys ready.
                </p>
                <p className="process-step-detail">Photo-ready handoff</p>
              </div>
            </div>
          </div>
          <div style={{ marginTop: '64px', textAlign: 'center' }}>
            <Link href="/process" className="btn btn-primary">
              See Full Process
            </Link>
          </div>
        </div>
      </section>

      {/* Proof / Reassurance */}
      <section className="section section-sand">
        <div className="container">
          <div className="proof-section">
            <h2 className="proof-headline">Built for Austin realtors</h2>
            <p className="proof-text">
              We understand realtor timelines. Fast turnarounds, clear communication,
              and finishes that photograph beautifully. Your reputation is our priority.
            </p>
            <div className="testimonial-grid">
              <div className="testimonial">
                <p className="testimonial-text">
                  "They finished a 3-bed turnover in 4 days. Photos were scheduled
                  for day 5. Perfect."
                </p>
                <p className="testimonial-author">— Compass Agent, Austin</p>
              </div>
              <div className="testimonial">
                <p className="testimonial-text">
                  "Daily photo updates meant I could keep my seller informed without
                  driving to the property."
                </p>
                <p className="testimonial-author">— Keller Williams, Round Rock</p>
              </div>
              <div className="testimonial">
                <p className="testimonial-text">
                  "Professional crews, clean jobsite, no callbacks. That's rare
                  in this market."
                </p>
                <p className="testimonial-author">— RE/MAX, Cedar Park</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="cta-fullbleed">
        <div className="container">
          <h2 className="cta-fullbleed-title">
            Ready to get your listing photo-ready?
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

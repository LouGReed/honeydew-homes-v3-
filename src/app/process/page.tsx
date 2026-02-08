import Link from 'next/link';
import { SiteHeader, SiteFooter } from '@/components';
import { siteConfig, BOOK_URL, ASSET_PREFIX } from '@/config/site';

export default function ProcessPage() {
  return (
    <main>
      <SiteHeader variant="solid" />

      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <h1 className="page-hero-title">Our Process</h1>
          <p className="page-hero-subtitle">
            Simple, transparent, and built around realtor timelines.
          </p>
        </div>
      </section>

      {/* Step 01 - Walkthrough */}
      <section className="section section-cream">
        <div className="container">
          <div className="process-editorial-step">
            <div className="process-editorial-number">01</div>
            <div className="process-editorial-content">
              <h2 className="process-editorial-title">Walkthrough</h2>
              <p className="process-editorial-desc">
                We meet at the property. You show us the scope. We take notes,
                ask questions, and get aligned on priorities.
              </p>
              <p className="process-editorial-detail">24–48 hour scheduling</p>
            </div>
          </div>
        </div>
      </section>

      {/* Work Image Band */}
      <section className="editorial-image-band-wide">
        <img
          src={`${ASSET_PREFIX}/img/pexels/slide-work-1.png`}
          alt="Work in progress"
          loading="lazy"
          className="editorial-image-wide"
        />
      </section>

      {/* Step 02 - Scope + Estimate */}
      <section className="section section-sand">
        <div className="container">
          <div className="process-editorial-step">
            <div className="process-editorial-number">02</div>
            <div className="process-editorial-content">
              <h2 className="process-editorial-title">Scope + Estimate</h2>
              <p className="process-editorial-desc">
                Clear line items. No surprises. You see exactly what we are doing
                and what it costs before we start.
              </p>
              <p className="process-editorial-detail">Sent same day</p>
            </div>
          </div>
        </div>
      </section>

      {/* Step 03 - Schedule + Crew */}
      <section className="section section-cream">
        <div className="container">
          <div className="process-editorial-step">
            <div className="process-editorial-number">03</div>
            <div className="process-editorial-content">
              <h2 className="process-editorial-title">Schedule + Crew</h2>
              <p className="process-editorial-desc">
                We lock in dates and assign your team. One point of contact
                from start to finish.
              </p>
              <p className="process-editorial-detail">Single point of contact</p>
            </div>
          </div>
        </div>
      </section>

      {/* Work Image Band */}
      <section className="editorial-image-band-wide">
        <img
          src={`${ASSET_PREFIX}/img/pexels/gallery-ioanamtc-943.jpg`}
          alt="Completed work"
          loading="lazy"
          className="editorial-image-wide"
        />
      </section>

      {/* Step 04 - Daily Updates */}
      <section className="section section-sand">
        <div className="container">
          <div className="process-editorial-step">
            <div className="process-editorial-number">04</div>
            <div className="process-editorial-content">
              <h2 className="process-editorial-title">Daily Updates</h2>
              <p className="process-editorial-desc">
                Photo check-ins every day until done. You always know where
                we are and what is happening.
              </p>
              <p className="process-editorial-detail">Text or email</p>
            </div>
          </div>
        </div>
      </section>

      {/* Step 05 - Final Walkthrough */}
      <section className="section section-cream">
        <div className="container">
          <div className="process-editorial-step">
            <div className="process-editorial-number">05</div>
            <div className="process-editorial-content">
              <h2 className="process-editorial-title">Final Walkthrough</h2>
              <p className="process-editorial-desc">
                Punch list closed. Keys ready. Your listing is photo-ready
                and market-ready.
              </p>
              <p className="process-editorial-detail">Photo-ready handoff</p>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work Info */}
      <section className="section section-sand">
        <div className="container">
          <div className="editorial-block">
            <div className="editorial-block-header">
              <h2 className="editorial-title">Working with realtors</h2>
            </div>
            <div className="editorial-block-body">
              <ul className="process-features-list">
                <li>Lockbox or key access — we coordinate</li>
                <li>Occupied homes OK — we have done hundreds</li>
                <li>Daily photo updates via text or email</li>
                <li>Single point of contact, start to finish</li>
                <li>Flexible scheduling around showings</li>
                <li>Photo-ready finishes, every time</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Quiet Lifestyle Image - Before CTA */}
      <section className="editorial-image-quiet">
        <img
          src={`${ASSET_PREFIX}/img/pexels/gallery-shuraeva-full.jpg`}
          alt="Austin home"
          loading="lazy"
          className="editorial-image-mono editorial-image-color"
        />
      </section>

      {/* CTA */}
      <section className="cta-fullbleed">
        <div className="container">
          <h2 className="cta-fullbleed-title">
            Ready to get started?
          </h2>
          <Link href={BOOK_URL} className="btn" target="_blank" rel="noopener noreferrer">
            Book a Walkthrough
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

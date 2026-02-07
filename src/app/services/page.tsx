import Link from 'next/link';
import { SiteHeader, SiteFooter } from '@/components';
import { siteConfig, BOOK_URL } from '@/config/site';

export default function ServicesPage() {
  return (
    <main>
      <SiteHeader variant="solid" />

      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <h1 className="page-hero-title">Services</h1>
          <p className="page-hero-subtitle">
            Make-ready construction, end-to-end. From punch lists to full turnovers.
          </p>
        </div>
      </section>

      {/* Core Services */}
      <section className="section section-cream">
        <div className="container">
          <div className="service-group">
            <p className="service-group-title">Core Make-Ready</p>
            <ul className="editorial-list">
              {siteConfig.coreServices.map((service) => (
                <li key={service.id} id={service.id} className="editorial-list-item">
                  <span className="editorial-list-title">{service.title}</span>
                  <span className="editorial-list-desc">{service.description}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Large Editorial Image - Left Aligned */}
      <section className="editorial-image-asymmetric">
        <div className="editorial-image-asymmetric-left">
          <img
            src="/img/pexels/gallery-lach-10397939-full.jpg"
            alt="Interior work"
            loading="lazy"
          />
        </div>
      </section>

      {/* Add-On Services */}
      <section className="section section-sand">
        <div className="container">
          <div className="service-group">
            <p className="service-group-title">Add-Ons</p>
            <ul className="editorial-list">
              {siteConfig.addOnServices.map((service) => (
                <li key={service.id} id={service.id} className="editorial-list-item">
                  <span className="editorial-list-title">{service.title}</span>
                  <span className="editorial-list-desc">{service.description}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Large Editorial Image - Right Aligned */}
      <section className="editorial-image-asymmetric">
        <div className="editorial-image-asymmetric-right">
          <img
            src="/img/pexels/gallery-lach-8657206-full.jpg"
            alt="Exterior work"
            loading="lazy"
          />
        </div>
      </section>

      {/* Timelines + What We Don't Do */}
      <section className="section section-cream">
        <div className="container">
          <div className="editorial-block">
            <div className="editorial-block-header">
              <h2 className="editorial-title">Typical timelines</h2>
            </div>
            <div className="editorial-block-body">
              <ul className="process-features-list">
                <li>Light punch list: 1–2 days</li>
                <li>Paint + patch: 2–4 days</li>
                <li>Full make-ready: 5–10 days</li>
                <li>Turnover + deep clean: 3–5 days</li>
              </ul>
              <p style={{ marginTop: '24px', color: 'var(--text-secondary)' }}>
                Timelines depend on scope and crew availability. We will give you
                a firm schedule at the walkthrough.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-sand">
        <div className="container">
          <div className="editorial-block">
            <div className="editorial-block-header">
              <h2 className="editorial-title">What we don't do</h2>
            </div>
            <div className="editorial-block-body">
              <p>
                We are make-ready specialists, not general contractors. We focus
                on what we do best:
              </p>
              <ul className="process-features-list" style={{ marginTop: '16px' }}>
                <li>No structural work</li>
                <li>No HVAC, plumbing, or electrical</li>
                <li>No full kitchen/bath remodels</li>
                <li>No roofing or foundation</li>
              </ul>
              <p style={{ marginTop: '24px', color: 'var(--text-secondary)' }}>
                Need a referral for bigger projects? We know good people. Just ask.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quiet Lifestyle Image - Before CTA */}
      <section className="editorial-image-quiet">
        <img
          src="/img/pexels/slide-family-3.jpg"
          alt="Austin family home"
          loading="lazy"
          className="editorial-image-mono"
        />
      </section>

      {/* CTA */}
      <section className="cta-fullbleed">
        <div className="container">
          <h2 className="cta-fullbleed-title">
            Ready to scope your project?
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

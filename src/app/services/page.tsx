import Link from 'next/link';
import { SiteHeader, SiteFooter } from '@/components';
import { siteConfig, BOOK_URL } from '@/config/site';

export default function ServicesPage() {
  return (
    <main>
      <SiteHeader />

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

      {/* Timelines + What We Don't Do */}
      <section className="section section-sand">
        <div className="container">
          <div className="two-col">
            <div className="two-col-text">
              <h2 className="section-title">Typical timelines</h2>
              <ul className="outcome-list">
                <li>Light punch list: 1–2 days</li>
                <li>Paint + patch: 2–4 days</li>
                <li>Full make-ready: 5–10 days</li>
                <li>Turnover + deep clean: 3–5 days</li>
              </ul>
              <p className="body-base" style={{ marginTop: '24px', color: 'var(--text-secondary)' }}>
                Timelines depend on scope and crew availability. We'll give you
                a firm schedule at the walkthrough.
              </p>
            </div>
            <div className="two-col-text">
              <h2 className="section-title">What we don't do</h2>
              <p className="body-base">
                We're make-ready specialists, not general contractors. We focus
                on what we do best:
              </p>
              <ul className="outcome-list" style={{ marginTop: '16px' }}>
                <li>No structural work</li>
                <li>No HVAC, plumbing, or electrical</li>
                <li>No full kitchen/bath remodels</li>
                <li>No roofing or foundation</li>
              </ul>
              <p className="body-base" style={{ marginTop: '24px', color: 'var(--text-secondary)' }}>
                Need a referral for bigger projects? We know good people. Just ask.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-fullbleed">
        <div className="container">
          <h2 className="cta-fullbleed-title">
            Ready to scope your project?
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

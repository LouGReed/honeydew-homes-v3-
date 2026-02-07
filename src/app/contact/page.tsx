'use client';

import { SiteHeader, SiteFooter } from '@/components';
import { siteConfig } from '@/config/site';

export default function ContactPage() {
  return (
    <main>
      <SiteHeader />

      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <h1 className="page-hero-title">Book a Walkthrough</h1>
          <p className="page-hero-subtitle">
            Tell us about your project. We'll be in touch within 24 hours.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section section-cream">
        <div className="container">
          <div className="two-col" style={{ alignItems: 'flex-start' }}>
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Your name</label>
                <input
                  type="text"
                  id="name"
                  className="form-input"
                  placeholder="Jane Smith"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="brokerage">Brokerage</label>
                <input
                  type="text"
                  id="brokerage"
                  className="form-input"
                  placeholder="Compass, KW, RE/MAX, etc."
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  placeholder="jane@brokerage.com"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  className="form-input"
                  placeholder="(512) 555-0123"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="address">Property address</label>
                <input
                  type="text"
                  id="address"
                  className="form-input"
                  placeholder="123 Main St, Austin, TX 78701"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="timeline">Timeline</label>
                <select id="timeline" className="form-select">
                  <option value="">When do you need this done?</option>
                  <option value="asap">ASAP (rush)</option>
                  <option value="1-2-weeks">1–2 weeks</option>
                  <option value="2-4-weeks">2–4 weeks</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="scope">Scope notes</label>
                <textarea
                  id="scope"
                  className="form-textarea"
                  placeholder="What needs to be done? Paint, flooring, punch list items, etc."
                />
                <p className="form-hint">
                  The more detail, the better. We can also discuss at the walkthrough.
                </p>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="photos">Photos (optional)</label>
                <input
                  type="file"
                  id="photos"
                  className="form-input"
                  multiple
                  accept="image/*"
                />
                <p className="form-hint">
                  Upload photos of the property or specific problem areas.
                </p>
              </div>

              <button type="submit" className="btn btn-primary" style={{ marginTop: '16px' }}>
                Request Walkthrough
              </button>
            </form>

            <div className="two-col-text">
              <div className="info-block" style={{ marginTop: 0 }}>
                <h4>We respond within 24 hours</h4>
                <p>
                  Usually much faster. We'll confirm receipt of your request
                  and reach out to schedule the walkthrough.
                </p>
              </div>

              <div className="info-block">
                <h4>Service area</h4>
                <p>
                  {siteConfig.serviceAreas.join(', ')}, and surrounding areas.
                </p>
              </div>

              <div className="info-block">
                <h4>Prefer to call?</h4>
                <p>
                  <a href={`tel:${siteConfig.phone.replace(/\D/g, '')}`} style={{ color: 'var(--color-green)', fontWeight: 500 }}>
                    {siteConfig.phone}
                  </a>
                </p>
                <p style={{ marginTop: '8px' }}>
                  <a href={`mailto:${siteConfig.email}`} style={{ color: 'var(--color-green)', fontWeight: 500 }}>
                    {siteConfig.email}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

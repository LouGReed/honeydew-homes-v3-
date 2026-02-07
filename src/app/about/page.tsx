import Link from 'next/link';
import { SiteHeader, SiteFooter } from '@/components';
import { siteConfig, BOOK_URL } from '@/config/site';

export default function AboutPage() {
  return (
    <main>
      <SiteHeader />

      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <h1 className="page-hero-title">About Honeydew</h1>
          <p className="page-hero-subtitle">
            Austin-based make-ready specialists. Realtor-first since day one.
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="section section-cream">
        <div className="container">
          <div className="two-col">
            <div className="two-col-text">
              <h2 className="section-title">Built for this market</h2>
              <p className="body-lg">
                We started Honeydew because Austin realtors deserved better.
                Too many contractors miss deadlines, skip details, or disappear
                mid-project.
              </p>
              <p className="body-base" style={{ marginTop: '16px' }}>
                We're a team of Austin locals who understand what's at stake
                when a listing hits the market. Your reputation. Your client's
                timeline. The sale itself.
              </p>
              <p className="body-base" style={{ marginTop: '16px' }}>
                So we built a company around realtor needs: fast turnarounds,
                clear communication, and finishes that photograph beautifully.
              </p>
            </div>
            <div className="two-col-image">
              <img
                src="/img/pexels/gallery-shuraeva-full.jpg"
                alt="Honeydew team at work"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section section-sand">
        <div className="container">
          <div className="section-header-centered">
            <h2 className="section-title">How we work</h2>
          </div>
          <div className="values-grid">
            {siteConfig.values.map((value, index) => (
              <div key={index} className="value-item">
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="section section-cream">
        <div className="container">
          <div className="two-col">
            <div className="two-col-image">
              <img
                src="/img/pexels/gallery-karpovich-full.jpg"
                alt="Austin neighborhood"
                loading="lazy"
              />
            </div>
            <div className="two-col-text">
              <h2 className="section-title">Austin and beyond</h2>
              <p className="body-lg">
                We serve {siteConfig.serviceAreas.join(', ')}, and surrounding communities.
              </p>
              <p className="body-base" style={{ marginTop: '16px' }}>
                We know these neighborhoods because we live in them. Local crews,
                local accountability, local pride.
              </p>
              <div className="info-block">
                <h4>Licensed & Insured</h4>
                <p>{siteConfig.licensingNote}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-fullbleed">
        <div className="container">
          <h2 className="cta-fullbleed-title">
            Let's talk about your next listing
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

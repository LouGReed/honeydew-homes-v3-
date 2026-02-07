import Link from 'next/link';
import { SiteHeader, SiteFooter } from '@/components';
import { siteConfig, BOOK_URL } from '@/config/site';

export default function AboutPage() {
  return (
    <main className="about-page">
      <SiteHeader variant="solid" />

      {/* Hero Section - Dot Matrix Texas */}
      <section className="about-texas-hero">
        <div className="about-texas-hero-content">
          {/* Typography Above Map */}
          <div className="about-texas-header">
            <h1 className="about-texas-headline">Built for Texas</h1>
          </div>

          {/* Texas Map Image */}
          <div className="about-texas-map-container">
            <div className="about-texas-map-wrapper">
              <img
                src="/texasmap/IMG_1452.PNG"
                alt="Texas state map"
                className="about-texas-map-image"
              />
              {/* Austin Marker Overlay */}
              <div className="austin-marker">
                <svg
                  className="austin-star"
                  viewBox="0 0 100 100"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polygon points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35" />
                </svg>
                <span className="austin-label">AUSTIN</span>
              </div>
            </div>
          </div>

          {/* Typography Below Map */}
          <div className="about-texas-narrative">
            <p className="about-texas-statement">
              We started HONEYDEW because Austin realtors deserved better.
            </p>
            <p className="about-texas-body">
              Too many contractors miss deadlines, skip details, or disappear
              mid-project. We built a company around what actually matters:
              fast turnarounds, clear communication, and finishes that
              photograph beautifully.
            </p>
          </div>
        </div>
      </section>

      {/* Service Area Section */}
      <section className="about-service-section">
        <div className="container">
          <div className="about-service-inner">
            <div className="about-service-header">
              <p className="about-service-location">Austin</p>
              <span className="about-service-number">01</span>
            </div>
            <div className="about-service-content">
              <h2 className="about-service-title">Austin and beyond</h2>
              <div className="about-service-cities">
                {siteConfig.serviceAreas.map((area, index) => (
                  <span key={index} className="about-service-city">{area}</span>
                ))}
                <span className="about-service-city about-service-more">+ surrounding communities</span>
              </div>
              <p className="about-service-tagline">
                Local crews. Local accountability. Local pride.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="about-work-section">
        <div className="container">
          <div className="about-work-header">
            <span className="about-work-number">02</span>
            <h2 className="about-work-title">How we work</h2>
          </div>
          <div className="about-work-grid">
            {siteConfig.values.map((value, index) => (
              <div key={index} className="about-work-item">
                <span className="about-work-item-index">0{index + 1}</span>
                <h3 className="about-work-item-title">{value.title}</h3>
                <p className="about-work-item-desc">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="about-credentials-section">
        <div className="container">
          <div className="about-credentials-inner">
            <span className="about-credentials-number">03</span>
            <div className="about-credentials-content">
              <h2 className="about-credentials-title">Licensed and insured</h2>
              <p className="about-credentials-text">{siteConfig.licensingNote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Validation */}
      <section className="about-validation-section">
        <div className="container">
          <div className="about-validation-content">
            <p className="about-validation-eyebrow">Trusted Partners</p>
            <h2 className="about-validation-headline">
              Austin's leading brokerages trust Honeydew
            </h2>
            <div className="about-validation-logos">
              <a
                href="https://www.compass.com"
                target="_blank"
                rel="noopener noreferrer"
                className="about-validation-logo-link"
              >
                <img src="/img/validation/compass.png" alt="Compass" />
              </a>
              <a
                href="https://www.sicaradesign.com"
                target="_blank"
                rel="noopener noreferrer"
                className="about-validation-logo-link"
              >
                <img src="/img/validation/sicara.PNG" alt="Sicara Design" />
              </a>
              <a
                href="https://www.texasrealestate.com"
                target="_blank"
                rel="noopener noreferrer"
                className="about-validation-logo-link"
              >
                <img src="/img/validation/texas-realtors.png" alt="Texas Realtors" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta-section">
        <div className="container">
          <div className="about-cta-content">
            <p className="about-cta-lead">
              We are Texas-built, Austin-centered, and designed around realtor timelines.
            </p>
            <Link href={BOOK_URL} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
              Book a Walkthrough
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

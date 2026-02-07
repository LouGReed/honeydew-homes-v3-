import Link from 'next/link';
import { PageNav, CTABand, Footer } from '@/components';
import { SERVICES_IMAGES } from '@/config/assets';
import { BOOK_URL, siteConfig } from '@/config/site';

export default function ServicesPage() {
  return (
    <main>
      <PageNav />

      {/* Hero */}
      <section className="services-hero">
        <div className="container">
          <h1>Our Services</h1>
          <p>
            From quick punch lists to complete turnovers, we handle every detail
            so your listings shine.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="services-list">
        <div className="container">
          {siteConfig.services.map((service, index) => (
            <div key={index} className="services-list-item">
              <h3 className="services-list-title">{service.title}</h3>
              <p className="services-list-description">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Photo Strip */}
      <section className="section-compact">
        <div className="container">
          <div className="services-photo-strip">
            {SERVICES_IMAGES.map((image, index) => (
              <img
                key={index}
                src={image.src}
                alt={image.alt}
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </section>

      <CTABand />
      <Footer />
    </main>
  );
}

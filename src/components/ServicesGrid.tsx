import { siteConfig } from '@/config/site';

export function ServicesGrid() {
  return (
    <section className="services-section section">
      <div className="container">
        <header className="services-header">
          <h2 className="services-title">What We Do</h2>
        </header>
        <div className="services-grid">
          {siteConfig.services.map((service, index) => (
            <article key={index} className="service-card">
              <h3 className="service-card-title">{service.title}</h3>
              <p className="service-card-description">{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

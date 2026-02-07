import Link from 'next/link';
import { siteConfig, BOOK_URL } from '@/config/site';

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-col-brand">
            <h3>Honeydew Homes</h3>
            <p>
              Make-ready construction for Austin realtors.
              Photo-ready finishes, realtor timelines.
            </p>
          </div>

          {/* Services Column */}
          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              {siteConfig.footerServices.map((service, index) => (
                <li key={index}>
                  <Link href="/services">{service}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li>
                <a href={`tel:${siteConfig.phone.replace(/\D/g, '')}`}>
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </li>
              <li>
                <span>Austin & surrounding areas</span>
              </li>
              <li style={{ marginTop: '16px' }}>
                <Link href={BOOK_URL} className="btn btn-primary" style={{ display: 'inline-block' }}>
                  Book a Walkthrough
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-legal">
            &copy; {currentYear} {siteConfig.businessName}. All rights reserved.
          </p>
          <p className="footer-legal">
            {siteConfig.licensingNote}
          </p>
        </div>
      </div>
    </footer>
  );
}

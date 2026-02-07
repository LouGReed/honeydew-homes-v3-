import Link from 'next/link';
import { siteConfig } from '@/config/site';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">Honeydew</div>

          <div className="footer-contact">
            <a href={`tel:${siteConfig.phone.replace(/\D/g, '')}`}>
              {siteConfig.phone}
            </a>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </div>

          <div className="footer-links">
            {siteConfig.navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="btn-link">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {currentYear} {siteConfig.businessName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

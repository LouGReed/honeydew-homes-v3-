import Link from 'next/link';
import { siteConfig, BOOK_URL } from '@/config/site';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          {/* Left: Brand */}
          <div className="footer-brand">
            <h3 className="footer-wordmark">Honeydew Homes</h3>
            <p className="footer-tagline">Make-ready construction in Austin.</p>
          </div>

          {/* Right: Contact */}
          <div className="footer-contact">
            <a href={`tel:${siteConfig.phone.replace(/\D/g, '')}`} className="footer-contact-item">
              {siteConfig.phone}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="footer-contact-item">
              {siteConfig.email}
            </a>
            <span className="footer-contact-item">Austin & surrounding areas</span>
            <Link
              href={BOOK_URL}
              className="footer-cta"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a Walkthrough →
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom-bar">
        <div className="container">
          <p className="footer-fine-print">
            © 2025 Honeydew Homes. Licensed in Texas. $1M general liability. Workers comp on all crews.
          </p>
        </div>
      </div>
    </footer>
  );
}

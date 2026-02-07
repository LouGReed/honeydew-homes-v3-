'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { siteConfig, BOOK_URL } from '@/config/site';

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="site-header-inner">
            <Link href="/" className="site-header-brand">
              Honeydew Homes
            </Link>

            <nav className="site-header-nav">
              {siteConfig.navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="site-header-link">
                  {link.label}
                </Link>
              ))}
              <Link href={BOOK_URL} className="site-header-cta">
                Book a Walkthrough
              </Link>
            </nav>

            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <>
          <div
            className="mobile-nav-overlay"
            style={{ display: 'block' }}
            onClick={() => setMobileMenuOpen(false)}
          />
          <nav className="mobile-nav" style={{ display: 'block', transform: 'translateX(0)' }}>
            <div className="mobile-nav-links">
              {siteConfig.navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="btn-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={BOOK_URL}
                className="btn btn-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book a Walkthrough
              </Link>
            </div>
          </nav>
        </>
      )}
    </>
  );
}

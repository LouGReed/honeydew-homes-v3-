'use client';

import Link from 'next/link';
import { useState } from 'react';
import { siteConfig, BOOK_URL } from '@/config/site';

export function PageNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="page-nav">
        <div className="container">
          <div className="page-nav-inner">
            <Link href="/" className="page-nav-brand">
              Honeydew
            </Link>

            <nav className="page-nav-links">
              {siteConfig.navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="page-nav-link">
                  {link.label}
                </Link>
              ))}
              <Link href={BOOK_URL} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
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
              <Link
                href="/"
                className="btn-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
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
                target="_blank"
                rel="noopener noreferrer"
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

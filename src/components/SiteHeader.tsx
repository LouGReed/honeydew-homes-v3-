'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { siteConfig, BOOK_URL, ASSET_PREFIX } from '@/config/site';

interface SiteHeaderProps {
  variant?: 'transparent' | 'solid';
}

export function SiteHeader({ variant = 'transparent' }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerClasses = [
    'site-header',
    scrolled ? 'scrolled' : '',
    variant === 'solid' ? 'site-header-solid' : '',
  ].filter(Boolean).join(' ');

  return (
    <>
      <header className={headerClasses}>
        <div className="container">
          <div className="site-header-inner">
            <Link href="/" className="site-header-brand">
              <Image
                src={`${ASSET_PREFIX}/img/brand/honeydewlogo.png`}
                alt="Honeydew Homes"
                width={200}
                height={44}
                priority
                className="site-header-logo"
                style={{ height: '44px', width: 'auto' }}
              />
            </Link>

            <nav className="site-header-nav">
              {siteConfig.navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="site-header-link">
                  {link.label}
                </Link>
              ))}
              <Link href={BOOK_URL} className="site-header-cta" target="_blank" rel="noopener noreferrer">
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

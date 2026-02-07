'use client';

import Link from 'next/link';
import { siteConfig, BOOK_URL } from '@/config/site';
import { VideoRotator } from './VideoRotator';
import { useState } from 'react';

export function HeroVideo() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <section className="hero hero-fixed">
      {/* Layer 1: Background Rotating Videos */}
      <VideoRotator />

      {/* Layer 2: Duotone Color Overlay (green/gold tint) */}
      <div className="hero-color-overlay" />

      {/* Layer 3: Top-to-mid Gradient Overlay for legibility */}
      <div className="hero-gradient-overlay" />

      {/* Layer 4: Film Grain + Vignette Overlay */}
      <div className="hero-grain" />

      {/* Layer 5: Content */}
      <div className="hero-content">
        {/* Navigation - Top Right */}
        <nav className="hero-nav">
          <div className="hero-nav-links">
            {siteConfig.navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="btn-link">
                {link.label}
              </Link>
            ))}
            <Link href={BOOK_URL} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
              Book a Walkthrough
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </nav>
      </div>

      {/* Layer 6: Hero Lockup - Top Left */}
      <div className="hero-lockup">
        <h1 className="hero-lockup-wordmark">Honeydew Homes</h1>
        <p className="hero-lockup-tagline">
          Make-ready construction in Austin.<br />
          Done before the Texas sun sets.
        </p>
        <Link href={BOOK_URL} className="hero-lockup-cta" target="_blank" rel="noopener noreferrer">
          Book a walkthrough →
        </Link>
      </div>

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
    </section>
  );
}

'use client';

import Link from 'next/link';
import { siteConfig, BOOK_URL } from '@/config/site';
import { VideoRotator } from './VideoRotator';
import { HeroSlideshow } from './HeroSlideshow';
import { useState } from 'react';

export function HeroVideo() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <section className="hero hero-fixed">
      {/* Layer 1: Background Rotating Videos */}
      <VideoRotator />

      {/* Layer 2: Dark Gradient Overlay for legibility */}
      <div className="hero-overlay" />

      {/* Layer 3: Film Grain Overlay */}
      <div className="hero-grain" />

      {/* Layer 4-5: Content (slideshow, nav, logo, CTA) */}
      <div className="hero-content">
        {/* Navigation - Top Right */}
        <nav className="hero-nav">
          <div className="hero-nav-links">
            {siteConfig.navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="btn-link">
                {link.label}
              </Link>
            ))}
            <Link href={BOOK_URL} className="btn btn-primary">
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

        {/* Main hero layout: branding left, slideshow right */}
        <div className="hero-main">
          {/* Branding - Bottom Left */}
          <div className="hero-branding">
            <h1 className="hero-logo">Honeydew</h1>
            <p className="hero-tagline">{siteConfig.tagline}</p>
            <span className="hero-stamp">Show-Ready</span>
          </div>

          {/* Slideshow - Right Side */}
          <div className="hero-slideshow-wrapper">
            <HeroSlideshow />
          </div>
        </div>
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

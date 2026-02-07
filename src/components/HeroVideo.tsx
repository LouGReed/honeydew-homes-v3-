'use client';

import Link from 'next/link';
import { siteConfig, BOOK_URL } from '@/config/site';
import { HERO_VIDEO_SRC, HERO_FALLBACK_IMAGE } from '@/config/assets';
import { useState } from 'react';

export function HeroVideo() {
  const [videoError, setVideoError] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <section className="hero">
      {/* Background Video or Fallback Image */}
      {!videoError ? (
        <video
          className="hero-media"
          autoPlay
          loop
          muted
          playsInline
          poster={HERO_FALLBACK_IMAGE}
          onError={() => setVideoError(true)}
        >
          <source src={HERO_VIDEO_SRC} type="video/mp4" />
        </video>
      ) : (
        <img
          className="hero-media"
          src={HERO_FALLBACK_IMAGE}
          alt="Austin home interior"
        />
      )}

      {/* Gradient Overlay */}
      <div className="hero-overlay" />

      {/* Content */}
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

        {/* Branding - Bottom Left */}
        <div className="hero-branding">
          <h1 className="hero-logo">Honeydew</h1>
          <p className="hero-tagline">{siteConfig.tagline}</p>
          <span className="hero-stamp">Show-Ready</span>
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

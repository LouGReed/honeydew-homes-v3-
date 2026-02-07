import Link from 'next/link';
import { PageNav, TexasMap, CTABand, Footer } from '@/components';
import { ABOUT_IMAGES } from '@/config/assets';
import { BOOK_URL, siteConfig } from '@/config/site';

export default function AboutPage() {
  return (
    <main>
      <PageNav />

      {/* Hero with Texas Map */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <div className="about-map-container">
              <TexasMap />
            </div>
            <div className="about-hero-text">
              <h1>Austin's Make-Ready Partner</h1>
              <p>
                We're a team of Austin locals who understand what it takes to get a home
                show-ready. From punch lists to full turnovers, we handle the details
                so you can focus on your clients.
              </p>
              <p>
                Serving Austin, Round Rock, Cedar Park, Georgetown, and Pflugerville—we
                know these neighborhoods because we live in them.
              </p>
              <Link href={BOOK_URL} className="btn btn-primary">
                Book a Walkthrough
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Sections */}
      <section className="about-editorial">
        <div className="container">
          {/* Block 1 */}
          <div className="about-editorial-block">
            <div className="about-editorial-image">
              {ABOUT_IMAGES[0] && (
                <img
                  src={ABOUT_IMAGES[0].src}
                  alt={ABOUT_IMAGES[0].alt}
                  loading="lazy"
                />
              )}
            </div>
            <div className="about-editorial-text">
              <h2>Built for Realtors</h2>
              <p>
                We get it—your reputation rides on every listing. That's why we treat
                every project like it's our own. Clear communication, daily photo updates,
                and timelines you can trust.
              </p>
              <p>
                Whether it's a quick punch list or a complete turnover, we're here to
                make you look good.
              </p>
            </div>
          </div>

          {/* Block 2 */}
          <div className="about-editorial-block">
            <div className="about-editorial-image">
              {ABOUT_IMAGES[1] && (
                <img
                  src={ABOUT_IMAGES[1].src}
                  alt={ABOUT_IMAGES[1].alt}
                  loading="lazy"
                />
              )}
            </div>
            <div className="about-editorial-text">
              <h2>Trusted by Compass</h2>
              <p>
                We're proud to work with some of Austin's top Compass agents. Our
                track record speaks for itself—on-time delivery, clean finishes,
                and homes that photograph beautifully.
              </p>
            </div>
          </div>

          {/* Block 3 */}
          <div className="about-editorial-block">
            <div className="about-editorial-image">
              {ABOUT_IMAGES[2] && (
                <img
                  src={ABOUT_IMAGES[2].src}
                  alt={ABOUT_IMAGES[2].alt}
                  loading="lazy"
                />
              )}
            </div>
            <div className="about-editorial-text">
              <h2>Local Crews, Real Accountability</h2>
              <p>
                No subcontractor roulette. Our crews are Austin-based, background-checked,
                and accountable. You'll have a single point of contact from walkthrough
                to final sweep.
              </p>
            </div>
          </div>

          {/* Block 4 */}
          <div className="about-editorial-block">
            <div className="about-editorial-image">
              {ABOUT_IMAGES[3] && (
                <img
                  src={ABOUT_IMAGES[3].src}
                  alt={ABOUT_IMAGES[3].alt}
                  loading="lazy"
                />
              )}
            </div>
            <div className="about-editorial-text">
              <h2>Photo-Ready Every Time</h2>
              <p>
                We know what photographers look for. Every surface, every detail,
                every corner—we prep homes to show their best. Because first
                impressions close deals.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTABand />
      <Footer />
    </main>
  );
}

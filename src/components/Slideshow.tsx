'use client';

import { useState, useEffect } from 'react';
import { SLIDESHOW_IMAGES } from '@/config/assets';

export function Slideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.ceil(SLIDESHOW_IMAGES.length / 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getVisibleImages = () => {
    const startIndex = currentIndex * 3;
    return SLIDESHOW_IMAGES.slice(startIndex, startIndex + 3);
  };

  const visibleImages = getVisibleImages();
  const totalSlides = Math.ceil(SLIDESHOW_IMAGES.length / 3);

  return (
    <section className="slideshow-section section">
      <div className="container">
        <header className="slideshow-header">
          <h2 className="slideshow-title">Homes We've Transformed</h2>
        </header>

        <div className="slideshow-container">
          <div className="slideshow-main">
            {/* Primary large image */}
            <div className="slideshow-primary">
              {visibleImages[0] && (
                <img
                  src={visibleImages[0].src}
                  alt={visibleImages[0].alt}
                  loading="lazy"
                />
              )}
            </div>

            {/* Secondary stacked images */}
            <div className="slideshow-secondary">
              {visibleImages[1] && (
                <div className="slideshow-secondary-item">
                  <img
                    src={visibleImages[1].src}
                    alt={visibleImages[1].alt}
                    loading="lazy"
                  />
                </div>
              )}
              {visibleImages[2] && (
                <div className="slideshow-secondary-item">
                  <img
                    src={visibleImages[2].src}
                    alt={visibleImages[2].alt}
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Navigation dots */}
          <div className="slideshow-nav">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                className={`slideshow-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

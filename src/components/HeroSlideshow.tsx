'use client';

import { useState, useEffect, useCallback, TouchEvent } from 'react';
import { SLIDESHOW_IMAGES } from '@/config/assets';

export function HeroSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const totalSlides = SLIDESHOW_IMAGES.length;

  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [totalSlides, isTransitioning]);

  const goToPrev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [totalSlides, isTransitioning]);

  // Auto-advance every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, [isPaused, goToNext]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
    setTouchStart(null);
  };

  const currentImage = SLIDESHOW_IMAGES[currentIndex];

  return (
    <div
      className="hero-slideshow"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slideshow frame */}
      <div className="hero-slideshow-frame">
        {/* Images with crossfade */}
        {SLIDESHOW_IMAGES.map((image, index) => (
          <div
            key={image.src}
            className={`hero-slideshow-slide ${index === currentIndex ? 'active' : ''}`}
          >
            <img
              src={image.src}
              alt={image.alt}
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </div>

      {/* Caption */}
      <div className="hero-slideshow-caption">
        <span className="hero-slideshow-counter">
          {String(currentIndex + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
        </span>
      </div>

      {/* Navigation dots */}
      <div className="hero-slideshow-dots">
        {SLIDESHOW_IMAGES.map((_, index) => (
          <button
            key={index}
            className={`hero-slideshow-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => {
              if (!isTransitioning) {
                setIsTransitioning(true);
                setCurrentIndex(index);
                setTimeout(() => setIsTransitioning(false), 600);
              }
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

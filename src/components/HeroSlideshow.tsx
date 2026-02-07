'use client';

import { useState, useEffect, useCallback, useRef, TouchEvent } from 'react';
import { SLIDESHOW_IMAGES, ImageAsset } from '@/config/assets';

const SLIDE_INTERVAL = 3000; // 3 seconds

export function HeroSlideshow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Video resume tracking
  const resumeTimesRef = useRef<Record<string, number>>({});
  const videoRefsMap = useRef<Record<string, HTMLVideoElement | null>>({});
  const advanceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasLoggedMount = useRef(false);

  const items = SLIDESHOW_IMAGES;
  const totalSlides = items.length;
  const currentItem = items[activeIndex];

  // One-time mount logging
  useEffect(() => {
    if (!hasLoggedMount.current) {
      console.log('SLIDESHOW', items.map(x => x.src));
      hasLoggedMount.current = true;
    }
  }, [items]);

  // Log on index change
  useEffect(() => {
    console.log('ACTIVE', activeIndex, items[activeIndex]?.src);
  }, [activeIndex, items]);

  // Save video position before leaving
  const saveVideoPosition = useCallback((item: ImageAsset) => {
    if (item.type === 'video') {
      const videoEl = videoRefsMap.current[item.src];
      if (videoEl && !isNaN(videoEl.currentTime)) {
        resumeTimesRef.current[item.src] = videoEl.currentTime;
        videoEl.pause();
      }
    }
  }, []);

  // Handle video canPlay - apply resume time and play
  const handleVideoCanPlay = useCallback((src: string) => {
    const videoEl = videoRefsMap.current[src];
    if (!videoEl) return;

    // Only apply resume for the active video
    const activeItem = items[activeIndex];
    if (activeItem?.src !== src) return;

    // Get saved time
    const savedTime = resumeTimesRef.current[src] || 0;
    const duration = videoEl.duration || Infinity;

    // Apply resume time if we have one, with tiny offset for fresh start
    if (savedTime > 0.1) {
      const resumeTime = Math.min(savedTime, Math.max(0, duration - 0.25));
      videoEl.currentTime = resumeTime;
    } else if (videoEl.currentTime < 0.01) {
      videoEl.currentTime = 0.03;
    }

    videoEl.play().catch(() => {});
  }, [items, activeIndex]);

  // Advance to next slide
  const goToNext = useCallback(() => {
    if (isTransitioning) return;

    const current = items[activeIndex];
    if (current) {
      saveVideoPosition(current);
    }

    setIsTransitioning(true);
    setActiveIndex((i) => (i + 1) % totalSlides);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [activeIndex, totalSlides, isTransitioning, saveVideoPosition, items]);

  // Go to previous slide
  const goToPrev = useCallback(() => {
    if (isTransitioning) return;

    const current = items[activeIndex];
    if (current) {
      saveVideoPosition(current);
    }

    setIsTransitioning(true);
    setActiveIndex((i) => (i - 1 + totalSlides) % totalSlides);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [activeIndex, totalSlides, isTransitioning, saveVideoPosition, items]);

  // Go to specific slide
  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === activeIndex) return;

    const current = items[activeIndex];
    if (current) {
      saveVideoPosition(current);
    }

    setIsTransitioning(true);
    setActiveIndex(index);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [activeIndex, isTransitioning, saveVideoPosition, items]);

  // Handle video ended - reset saved time
  const handleVideoEnded = useCallback((src: string) => {
    resumeTimesRef.current[src] = 0;
  }, []);

  // Auto-advance timer
  useEffect(() => {
    if (isPaused) return;

    if (advanceTimeoutRef.current) {
      clearTimeout(advanceTimeoutRef.current);
    }

    advanceTimeoutRef.current = setTimeout(() => {
      goToNext();
    }, SLIDE_INTERVAL);

    return () => {
      if (advanceTimeoutRef.current) {
        clearTimeout(advanceTimeoutRef.current);
      }
    };
  }, [isPaused, activeIndex, goToNext]);

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

  // Store video ref
  const setVideoRef = useCallback((src: string, el: HTMLVideoElement | null) => {
    videoRefsMap.current[src] = el;
  }, []);

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
        {items.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={`slide-${item.src}`}
              className={`hero-slideshow-slide ${isActive ? 'active' : ''}`}
            >
              {item.type === 'video' ? (
                <video
                  key={`video-${item.src}`}
                  ref={(el) => setVideoRef(item.src, el)}
                  src={item.src}
                  autoPlay={isActive}
                  muted
                  playsInline
                  loop
                  preload="auto"
                  onCanPlay={() => handleVideoCanPlay(item.src)}
                  onEnded={() => handleVideoEnded(item.src)}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                />
              ) : (
                <img
                  key={`img-${item.src}`}
                  src={item.src}
                  alt={item.alt}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Caption */}
      <div className="hero-slideshow-caption">
        <span className="hero-slideshow-counter">
          {String(activeIndex + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
        </span>
      </div>

      {/* Navigation dots */}
      <div className="hero-slideshow-dots">
        {items.map((item, index) => (
          <button
            key={`dot-${item.src}`}
            className={`hero-slideshow-dot ${index === activeIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

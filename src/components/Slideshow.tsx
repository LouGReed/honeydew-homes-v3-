'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { SLIDESHOW_IMAGES, ImageAsset } from '@/config/assets';

const SLIDE_INTERVAL = 3000; // 3 seconds

export function Slideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Video resume tracking
  const resumeTimesRef = useRef<Record<string, number>>({});
  const videoRefsMap = useRef<Record<string, HTMLVideoElement | null>>({});
  const advanceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasLoggedMount = useRef(false);

  const items = SLIDESHOW_IMAGES;
  const totalSlides = Math.ceil(items.length / 3);

  const getVisibleImages = useCallback(() => {
    const startIndex = currentIndex * 3;
    return items.slice(startIndex, startIndex + 3);
  }, [currentIndex, items]);

  const visibleImages = getVisibleImages();

  // One-time mount logging
  useEffect(() => {
    if (!hasLoggedMount.current) {
      console.log('SLIDESHOW (grid)', items.map(x => x.src));
      hasLoggedMount.current = true;
    }
  }, [items]);

  // Log on index change
  useEffect(() => {
    console.log('ACTIVE GROUP', currentIndex, visibleImages.map(x => x.src));
  }, [currentIndex, visibleImages]);

  // Save video positions before leaving
  const saveVideoPositions = useCallback((slideItems: ImageAsset[]) => {
    slideItems.forEach((item) => {
      if (item.type === 'video') {
        const videoEl = videoRefsMap.current[item.src];
        if (videoEl && !isNaN(videoEl.currentTime)) {
          resumeTimesRef.current[item.src] = videoEl.currentTime;
          videoEl.pause();
        }
      }
    });
  }, []);

  // Handle video canPlay
  const handleVideoCanPlay = useCallback((src: string) => {
    const videoEl = videoRefsMap.current[src];
    if (!videoEl) return;

    // Get saved time
    const savedTime = resumeTimesRef.current[src] || 0;
    const duration = videoEl.duration || Infinity;

    // Apply resume time or tiny offset
    if (savedTime > 0.1) {
      const resumeTime = Math.min(savedTime, Math.max(0, duration - 0.25));
      videoEl.currentTime = resumeTime;
    } else if (videoEl.currentTime < 0.01) {
      videoEl.currentTime = 0.03;
    }

    videoEl.play().catch(() => {});
  }, []);

  // Advance to next slide group
  const goToNext = useCallback(() => {
    saveVideoPositions(getVisibleImages());
    setCurrentIndex((i) => (i + 1) % totalSlides);
  }, [totalSlides, getVisibleImages, saveVideoPositions]);

  // Handle video ended
  const handleVideoEnded = useCallback((src: string) => {
    resumeTimesRef.current[src] = 0;
  }, []);

  // Auto-advance timer
  useEffect(() => {
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
  }, [currentIndex, goToNext]);

  // Store video ref
  const setVideoRef = useCallback((src: string, el: HTMLVideoElement | null) => {
    videoRefsMap.current[src] = el;
  }, []);

  // Render media item
  const renderMediaItem = (item: ImageAsset, loading: 'eager' | 'lazy' = 'lazy') => {
    if (item.type === 'video') {
      return (
        <video
          key={`video-${item.src}`}
          ref={(el) => setVideoRef(item.src, el)}
          src={item.src}
          autoPlay
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
      );
    }
    return (
      <img
        key={`img-${item.src}`}
        src={item.src}
        alt={item.alt}
        loading={loading}
      />
    );
  };

  return (
    <section className="slideshow-section section">
      <div className="container">
        <header className="slideshow-header">
          <h2 className="slideshow-title">Homes We've Transformed</h2>
        </header>

        <div className="slideshow-container">
          <div className="slideshow-main">
            <div className="slideshow-primary" key={`primary-${visibleImages[0]?.src}`}>
              {visibleImages[0] && renderMediaItem(visibleImages[0], 'eager')}
            </div>

            <div className="slideshow-secondary">
              {visibleImages[1] && (
                <div className="slideshow-secondary-item" key={`sec1-${visibleImages[1].src}`}>
                  {renderMediaItem(visibleImages[1])}
                </div>
              )}
              {visibleImages[2] && (
                <div className="slideshow-secondary-item" key={`sec2-${visibleImages[2].src}`}>
                  {renderMediaItem(visibleImages[2])}
                </div>
              )}
            </div>
          </div>

          <div className="slideshow-nav">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={`dot-${index}`}
                className={`slideshow-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => {
                  saveVideoPositions(getVisibleImages());
                  setCurrentIndex(index);
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

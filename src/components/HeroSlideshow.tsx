'use client';

import { useState, useEffect, useCallback, useRef, TouchEvent } from 'react';
import { SLIDESHOW_IMAGES, ImageAsset } from '@/config/assets';

const SLIDE_INTERVAL = 3000; // 3 seconds

export function HeroSlideshow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [canAdvance, setCanAdvance] = useState(true);

  // Video resume tracking
  const resumeTimesRef = useRef<Record<string, number>>({});
  const activatedAtRef = useRef<number>(Date.now());
  const videoRefsMap = useRef<Record<string, HTMLVideoElement | null>>({});
  const advanceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const minTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasLoggedMount = useRef(false);

  const items = SLIDESHOW_IMAGES;
  const totalSlides = items.length;

  // Get current item
  const currentItem = items[activeIndex];
  const isCurrentVideo = currentItem?.type === 'video';

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

  // Advance to next slide
  const goToNext = useCallback(() => {
    if (isTransitioning) return;

    const current = items[activeIndex];

    // Check if we need to wait for minimum 3 seconds on video
    if (current?.type === 'video' && !canAdvance) {
      // Wait for canAdvance to become true
      return;
    }

    // Save current video position before leaving
    if (current) {
      saveVideoPosition(current);
    }

    setIsTransitioning(true);
    setCanAdvance(false);

    setActiveIndex((i) => (i + 1) % totalSlides);
    activatedAtRef.current = Date.now();

    setTimeout(() => setIsTransitioning(false), 600);
  }, [activeIndex, totalSlides, isTransitioning, saveVideoPosition, canAdvance, items]);

  // Go to previous slide
  const goToPrev = useCallback(() => {
    if (isTransitioning) return;

    const current = items[activeIndex];
    if (current) {
      saveVideoPosition(current);
    }

    setIsTransitioning(true);
    setCanAdvance(false);

    setActiveIndex((i) => (i - 1 + totalSlides) % totalSlides);
    activatedAtRef.current = Date.now();

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
    setCanAdvance(false);

    setActiveIndex(index);
    activatedAtRef.current = Date.now();

    setTimeout(() => setIsTransitioning(false), 600);
  }, [activeIndex, isTransitioning, saveVideoPosition, items]);

  // Handle video becoming active (resume from saved position)
  useEffect(() => {
    if (!isCurrentVideo || !currentItem) return;

    const videoEl = videoRefsMap.current[currentItem.src];
    if (!videoEl) return;

    const savedTime = resumeTimesRef.current[currentItem.src] || 0;
    const duration = videoEl.duration || Infinity;

    // Clamp to duration - 0.25s to avoid ending immediately
    const resumeTime = Math.min(savedTime, Math.max(0, duration - 0.25));
    videoEl.currentTime = resumeTime;

    // Play the video
    const playPromise = videoEl.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay blocked, that's ok
      });
    }
  }, [activeIndex, isCurrentVideo, currentItem]);

  // Handle video ended - reset saved time
  const handleVideoEnded = useCallback((src: string) => {
    resumeTimesRef.current[src] = 0;
  }, []);

  // Minimum 3-second timer before allowing advance
  useEffect(() => {
    // Clear previous timer
    if (minTimeoutRef.current) {
      clearTimeout(minTimeoutRef.current);
    }

    // Set canAdvance to false initially
    setCanAdvance(false);

    // After 3 seconds, allow advance
    minTimeoutRef.current = setTimeout(() => {
      setCanAdvance(true);
    }, SLIDE_INTERVAL);

    return () => {
      if (minTimeoutRef.current) {
        clearTimeout(minTimeoutRef.current);
      }
    };
  }, [activeIndex]);

  // Auto-advance timer
  useEffect(() => {
    if (isPaused || !canAdvance) {
      return;
    }

    // Clear any existing timeout
    if (advanceTimeoutRef.current) {
      clearTimeout(advanceTimeoutRef.current);
    }

    // Set up advance timer - advance immediately since canAdvance is true
    advanceTimeoutRef.current = setTimeout(() => {
      goToNext();
    }, 100); // Small delay to ensure state is settled

    return () => {
      if (advanceTimeoutRef.current) {
        clearTimeout(advanceTimeoutRef.current);
      }
    };
  }, [isPaused, canAdvance, goToNext]);

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
        {/* Media items with crossfade */}
        {items.map((item, index) => (
          <div
            key={`slide-${item.src}`}
            className={`hero-slideshow-slide ${index === activeIndex ? 'active' : ''}`}
          >
            {item.type === 'video' ? (
              <video
                key={`video-${item.src}`}
                ref={(el) => setVideoRef(item.src, el)}
                src={item.src}
                muted
                playsInline
                loop
                preload="metadata"
                onEnded={() => handleVideoEnded(item.src)}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
        ))}
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

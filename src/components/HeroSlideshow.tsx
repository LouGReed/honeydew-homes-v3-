'use client';

import { useState, useEffect, useCallback, useRef, TouchEvent } from 'react';
import { SLIDESHOW_IMAGES, ImageAsset } from '@/config/assets';

const SLIDE_INTERVAL = 3000; // 3 seconds

export function HeroSlideshow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [canAdvance, setCanAdvance] = useState(false);

  // Video readiness tracking
  const [readyVideos, setReadyVideos] = useState<Set<string>>(new Set());

  // Video resume tracking
  const resumeTimesRef = useRef<Record<string, number>>({});
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

  // Mark video as ready
  const markVideoReady = useCallback((src: string) => {
    setReadyVideos((prev) => {
      const next = new Set(prev);
      next.add(src);
      return next;
    });
  }, []);

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

  // Handle video canplay - apply resume time and start playing
  const handleVideoCanPlay = useCallback((src: string) => {
    const videoEl = videoRefsMap.current[src];
    if (!videoEl) return;

    // Check if this video is the active one
    const activeItem = items[activeIndex];
    if (activeItem?.src !== src) return;

    // Get saved time or use tiny offset
    const savedTime = resumeTimesRef.current[src] || 0;
    const duration = videoEl.duration || Infinity;

    // Apply resume time (clamped) or tiny offset
    if (savedTime > 0) {
      const resumeTime = Math.min(savedTime, Math.max(0, duration - 0.25));
      videoEl.currentTime = resumeTime;
    } else if (videoEl.currentTime === 0) {
      // Tiny offset to avoid black frame / decoder glitch
      videoEl.currentTime = 0.03;
    }

    // Mark as ready
    markVideoReady(src);

    // Play the video
    videoEl.play().catch(() => {});
  }, [items, activeIndex, markVideoReady]);

  // Advance to next slide
  const goToNext = useCallback(() => {
    if (isTransitioning) return;

    const current = items[activeIndex];

    // Check if we need to wait for minimum 3 seconds on video
    if (current?.type === 'video' && !canAdvance) {
      return;
    }

    // Save current video position before leaving
    if (current) {
      saveVideoPosition(current);
    }

    setIsTransitioning(true);
    setCanAdvance(false);

    setActiveIndex((i) => (i + 1) % totalSlides);

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

    setTimeout(() => setIsTransitioning(false), 600);
  }, [activeIndex, isTransitioning, saveVideoPosition, items]);

  // Handle video ended - reset saved time
  const handleVideoEnded = useCallback((src: string) => {
    resumeTimesRef.current[src] = 0;
  }, []);

  // Minimum 3-second timer before allowing advance
  // For videos: start timer only when video is ready
  // For images: start timer immediately
  useEffect(() => {
    if (minTimeoutRef.current) {
      clearTimeout(minTimeoutRef.current);
    }

    setCanAdvance(false);

    const current = items[activeIndex];
    const isVideo = current?.type === 'video';

    if (isVideo) {
      // For videos, wait until ready before starting timer
      const checkReady = () => {
        if (readyVideos.has(current.src)) {
          minTimeoutRef.current = setTimeout(() => {
            setCanAdvance(true);
          }, SLIDE_INTERVAL);
        } else {
          // Check again shortly
          minTimeoutRef.current = setTimeout(checkReady, 100);
        }
      };
      checkReady();
    } else {
      // For images, start timer immediately
      minTimeoutRef.current = setTimeout(() => {
        setCanAdvance(true);
      }, SLIDE_INTERVAL);
    }

    return () => {
      if (minTimeoutRef.current) {
        clearTimeout(minTimeoutRef.current);
      }
    };
  }, [activeIndex, items, readyVideos]);

  // Auto-advance timer
  useEffect(() => {
    if (isPaused || !canAdvance) {
      return;
    }

    if (advanceTimeoutRef.current) {
      clearTimeout(advanceTimeoutRef.current);
    }

    advanceTimeoutRef.current = setTimeout(() => {
      goToNext();
    }, 100);

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

  // Check if a video is ready to show
  const isVideoReady = useCallback((src: string) => {
    return readyVideos.has(src);
  }, [readyVideos]);

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
        {items.map((item, index) => {
          const isActive = index === activeIndex;
          const isVideo = item.type === 'video';
          const videoReady = isVideo ? isVideoReady(item.src) : true;

          return (
            <div
              key={`slide-${item.src}`}
              className={`hero-slideshow-slide ${isActive ? 'active' : ''}`}
              style={{
                // For videos: only show when ready to avoid jerk
                opacity: isActive ? (videoReady ? 1 : 0) : 0,
                transition: 'opacity 0.6s ease-in-out',
              }}
            >
              {isVideo ? (
                <video
                  key={`video-${item.src}`}
                  ref={(el) => setVideoRef(item.src, el)}
                  src={item.src}
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
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
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

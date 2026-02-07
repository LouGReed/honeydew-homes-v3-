'use client';

import { useState, useEffect, useCallback, useRef, TouchEvent } from 'react';
import { SLIDESHOW_IMAGES, ImageAsset } from '@/config/assets';

const SLIDE_INTERVAL = 3000; // 3 seconds
const DEBUG = false; // Set to true for debug logging

function debugLog(...args: unknown[]) {
  if (DEBUG) {
    console.log('[Slideshow]', ...args);
  }
}

export function HeroSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Video resume tracking
  const resumeTimesRef = useRef<Record<string, number>>({});
  const lastActivatedAtRef = useRef<number>(Date.now());
  const videoRefsMap = useRef<Record<string, HTMLVideoElement | null>>({});
  const advanceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = SLIDESHOW_IMAGES.length;

  // Get current item
  const currentItem = SLIDESHOW_IMAGES[currentIndex];
  const isCurrentVideo = currentItem?.type === 'video';

  // Save video position before leaving
  const saveVideoPosition = useCallback((item: ImageAsset) => {
    if (item.type === 'video') {
      const videoEl = videoRefsMap.current[item.src];
      if (videoEl && !isNaN(videoEl.currentTime)) {
        resumeTimesRef.current[item.src] = videoEl.currentTime;
        debugLog(`Saved position for ${item.src}: ${videoEl.currentTime.toFixed(2)}s`);
        videoEl.pause();
      }
    }
  }, []);

  // Advance to next slide
  const goToNext = useCallback(() => {
    if (isTransitioning) return;

    const currentItem = SLIDESHOW_IMAGES[currentIndex];

    // Check if we need to wait for minimum 3 seconds on video
    if (currentItem?.type === 'video') {
      const elapsed = Date.now() - lastActivatedAtRef.current;
      if (elapsed < SLIDE_INTERVAL) {
        debugLog(`Video hasn't played 3s yet (${elapsed}ms elapsed), waiting...`);
        // Schedule advance after remaining time
        if (advanceTimeoutRef.current) {
          clearTimeout(advanceTimeoutRef.current);
        }
        advanceTimeoutRef.current = setTimeout(() => {
          goToNext();
        }, SLIDE_INTERVAL - elapsed);
        return;
      }
    }

    // Save current video position before leaving
    if (currentItem) {
      saveVideoPosition(currentItem);
    }

    setIsTransitioning(true);
    const nextIndex = (currentIndex + 1) % totalSlides;
    setCurrentIndex(nextIndex);
    lastActivatedAtRef.current = Date.now();
    debugLog(`Advancing to slide ${nextIndex}`);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [currentIndex, totalSlides, isTransitioning, saveVideoPosition]);

  // Go to previous slide
  const goToPrev = useCallback(() => {
    if (isTransitioning) return;

    const currentItem = SLIDESHOW_IMAGES[currentIndex];
    if (currentItem) {
      saveVideoPosition(currentItem);
    }

    setIsTransitioning(true);
    const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    setCurrentIndex(prevIndex);
    lastActivatedAtRef.current = Date.now();
    debugLog(`Going back to slide ${prevIndex}`);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [currentIndex, totalSlides, isTransitioning, saveVideoPosition]);

  // Go to specific slide
  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === currentIndex) return;

    const currentItem = SLIDESHOW_IMAGES[currentIndex];
    if (currentItem) {
      saveVideoPosition(currentItem);
    }

    setIsTransitioning(true);
    setCurrentIndex(index);
    lastActivatedAtRef.current = Date.now();
    debugLog(`Jumping to slide ${index}`);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [currentIndex, isTransitioning, saveVideoPosition]);

  // Handle video becoming active (resume from saved position)
  useEffect(() => {
    if (!isCurrentVideo) return;

    const videoEl = videoRefsMap.current[currentItem.src];
    if (!videoEl) return;

    const savedTime = resumeTimesRef.current[currentItem.src] || 0;
    const duration = videoEl.duration || Infinity;

    // Clamp to duration - 0.25s to avoid ending immediately
    const resumeTime = Math.min(savedTime, Math.max(0, duration - 0.25));
    videoEl.currentTime = resumeTime;

    debugLog(`Resuming video ${currentItem.src} at ${resumeTime.toFixed(2)}s`);

    // Play the video
    const playPromise = videoEl.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        debugLog(`Play failed for ${currentItem.src}:`, err);
      });
    }
  }, [currentIndex, isCurrentVideo, currentItem]);

  // Handle video ended - reset saved time
  const handleVideoEnded = useCallback((src: string) => {
    debugLog(`Video ended: ${src}, resetting saved time to 0`);
    resumeTimesRef.current[src] = 0;
  }, []);

  // Auto-advance timer
  useEffect(() => {
    if (isPaused) {
      if (advanceTimeoutRef.current) {
        clearTimeout(advanceTimeoutRef.current);
      }
      return;
    }

    // Clear any existing timeout
    if (advanceTimeoutRef.current) {
      clearTimeout(advanceTimeoutRef.current);
    }

    // Set up advance timer
    advanceTimeoutRef.current = setTimeout(() => {
      goToNext();
    }, SLIDE_INTERVAL);

    return () => {
      if (advanceTimeoutRef.current) {
        clearTimeout(advanceTimeoutRef.current);
      }
    };
  }, [isPaused, currentIndex, goToNext]);

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
        {SLIDESHOW_IMAGES.map((item, index) => (
          <div
            key={item.src}
            className={`hero-slideshow-slide ${index === currentIndex ? 'active' : ''}`}
          >
            {item.type === 'video' ? (
              <video
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
          {String(currentIndex + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
        </span>
      </div>

      {/* Navigation dots */}
      <div className="hero-slideshow-dots">
        {SLIDESHOW_IMAGES.map((_, index) => (
          <button
            key={index}
            className={`hero-slideshow-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

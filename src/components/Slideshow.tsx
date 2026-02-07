'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { SLIDESHOW_IMAGES, ImageAsset } from '@/config/assets';

const SLIDE_INTERVAL = 3000; // 3 seconds
const DEBUG = false; // Set to true for debug logging

function debugLog(...args: unknown[]) {
  if (DEBUG) {
    console.log('[Slideshow]', ...args);
  }
}

export function Slideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Video resume tracking
  const resumeTimesRef = useRef<Record<string, number>>({});
  const lastActivatedAtRef = useRef<number>(Date.now());
  const videoRefsMap = useRef<Record<string, HTMLVideoElement | null>>({});
  const advanceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = Math.ceil(SLIDESHOW_IMAGES.length / 3);

  const getVisibleImages = useCallback(() => {
    const startIndex = currentIndex * 3;
    return SLIDESHOW_IMAGES.slice(startIndex, startIndex + 3);
  }, [currentIndex]);

  const visibleImages = getVisibleImages();

  // Check if any visible item is a video
  const hasActiveVideo = visibleImages.some((item) => item.type === 'video');

  // Save video positions before leaving
  const saveVideoPositions = useCallback((items: ImageAsset[]) => {
    items.forEach((item) => {
      if (item.type === 'video') {
        const videoEl = videoRefsMap.current[item.src];
        if (videoEl && !isNaN(videoEl.currentTime)) {
          resumeTimesRef.current[item.src] = videoEl.currentTime;
          debugLog(`Saved position for ${item.src}: ${videoEl.currentTime.toFixed(2)}s`);
          videoEl.pause();
        }
      }
    });
  }, []);

  // Advance to next slide group
  const goToNext = useCallback(() => {
    const currentItems = getVisibleImages();
    const hasVideo = currentItems.some((item) => item.type === 'video');

    // Check if we need to wait for minimum 3 seconds on video
    if (hasVideo) {
      const elapsed = Date.now() - lastActivatedAtRef.current;
      if (elapsed < SLIDE_INTERVAL) {
        debugLog(`Video hasn't played 3s yet (${elapsed}ms elapsed), waiting...`);
        if (advanceTimeoutRef.current) {
          clearTimeout(advanceTimeoutRef.current);
        }
        advanceTimeoutRef.current = setTimeout(() => {
          goToNext();
        }, SLIDE_INTERVAL - elapsed);
        return;
      }
    }

    // Save current video positions before leaving
    saveVideoPositions(currentItems);

    const nextIndex = (currentIndex + 1) % totalSlides;
    setCurrentIndex(nextIndex);
    lastActivatedAtRef.current = Date.now();
    debugLog(`Advancing to slide group ${nextIndex}`);
  }, [currentIndex, totalSlides, getVisibleImages, saveVideoPositions]);

  // Handle videos becoming active (resume from saved position)
  useEffect(() => {
    visibleImages.forEach((item) => {
      if (item.type === 'video') {
        const videoEl = videoRefsMap.current[item.src];
        if (!videoEl) return;

        const savedTime = resumeTimesRef.current[item.src] || 0;
        const duration = videoEl.duration || Infinity;

        // Clamp to duration - 0.25s to avoid ending immediately
        const resumeTime = Math.min(savedTime, Math.max(0, duration - 0.25));
        videoEl.currentTime = resumeTime;

        debugLog(`Resuming video ${item.src} at ${resumeTime.toFixed(2)}s`);

        const playPromise = videoEl.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            debugLog(`Play failed for ${item.src}:`, err);
          });
        }
      }
    });
  }, [currentIndex, visibleImages]);

  // Handle video ended - reset saved time
  const handleVideoEnded = useCallback((src: string) => {
    debugLog(`Video ended: ${src}, resetting saved time to 0`);
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

  // Render media item (image or video)
  const renderMediaItem = (item: ImageAsset, loading: 'eager' | 'lazy' = 'lazy') => {
    if (item.type === 'video') {
      return (
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
      );
    }
    return (
      <img
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
            {/* Primary large media */}
            <div className="slideshow-primary">
              {visibleImages[0] && renderMediaItem(visibleImages[0], 'eager')}
            </div>

            {/* Secondary stacked media */}
            <div className="slideshow-secondary">
              {visibleImages[1] && (
                <div className="slideshow-secondary-item">
                  {renderMediaItem(visibleImages[1])}
                </div>
              )}
              {visibleImages[2] && (
                <div className="slideshow-secondary-item">
                  {renderMediaItem(visibleImages[2])}
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
                onClick={() => {
                  saveVideoPositions(getVisibleImages());
                  setCurrentIndex(index);
                  lastActivatedAtRef.current = Date.now();
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

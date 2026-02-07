'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  BACKGROUND_VIDEOS,
  HERO_FALLBACK_IMAGE,
  VIDEO_ROTATION_INTERVAL,
  VIDEO_CROSSFADE_DURATION,
} from '@/config/assets';

export function VideoRotator() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isCrossfading, setIsCrossfading] = useState(false);
  const [allVideosFailed, setAllVideosFailed] = useState(false);
  const [failedVideos, setFailedVideos] = useState<Set<number>>(new Set());

  // Track readiness per video
  const [readyVideos, setReadyVideos] = useState<Set<number>>(new Set());
  const [visibleVideos, setVisibleVideos] = useState<Set<number>>(new Set());

  const currentVideoRef = useRef<HTMLVideoElement>(null);
  const nextVideoRef = useRef<HTMLVideoElement>(null);
  const rotationTimerRef = useRef<NodeJS.Timeout | null>(null);

  const totalVideos = BACKGROUND_VIDEOS.length;

  // Mark a video as ready (can play)
  const markReady = useCallback((index: number) => {
    setReadyVideos((prev) => {
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  }, []);

  // Mark a video as visible (after ready)
  const markVisible = useCallback((index: number) => {
    setVisibleVideos((prev) => {
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  }, []);

  // Handle video error
  const handleVideoError = useCallback((index: number) => {
    console.error(`Video ${index} failed to load:`, BACKGROUND_VIDEOS[index]);
    setFailedVideos((prev) => {
      const next = new Set(prev);
      next.add(index);
      if (next.size >= totalVideos) {
        setAllVideosFailed(true);
      }
      return next;
    });
  }, [totalVideos]);

  // Handle video canplay - set tiny offset and mark ready
  const handleCanPlay = useCallback((index: number, videoEl: HTMLVideoElement | null) => {
    if (!videoEl) return;

    // Set tiny offset to avoid black frame / decoder glitch
    if (videoEl.currentTime === 0) {
      videoEl.currentTime = 0.03;
    }

    markReady(index);

    // Start playing
    videoEl.play().catch(() => {});

    // After a brief moment, mark visible (fade in)
    setTimeout(() => {
      markVisible(index);
    }, 50);
  }, [markReady, markVisible]);

  // Calculate next valid index
  const getNextValidIndex = useCallback((fromIndex: number): number => {
    let next = (fromIndex + 1) % totalVideos;
    let attempts = 0;
    while (failedVideos.has(next) && attempts < totalVideos) {
      next = (next + 1) % totalVideos;
      attempts++;
    }
    return attempts >= totalVideos ? -1 : next;
  }, [totalVideos, failedVideos]);

  // Rotation logic
  useEffect(() => {
    if (allVideosFailed || totalVideos <= 1) return;

    // Wait for current video to be ready before starting rotation
    if (!readyVideos.has(currentIndex)) return;

    // Clear any existing timer
    if (rotationTimerRef.current) {
      clearTimeout(rotationTimerRef.current);
    }

    rotationTimerRef.current = setTimeout(() => {
      const next = getNextValidIndex(currentIndex);
      if (next === -1) {
        setAllVideosFailed(true);
        return;
      }

      setNextIndex(next);

      // Wait for next video to be ready before crossfading
      const checkAndCrossfade = () => {
        if (readyVideos.has(next)) {
          // Next video is ready, start crossfade
          setIsCrossfading(true);

          // After crossfade completes, swap
          setTimeout(() => {
            setCurrentIndex(next);
            setIsCrossfading(false);

            // Restart current video from tiny offset
            if (currentVideoRef.current) {
              currentVideoRef.current.currentTime = 0.03;
              currentVideoRef.current.play().catch(() => {});
            }
          }, VIDEO_CROSSFADE_DURATION);
        } else {
          // Next video not ready yet, check again shortly
          setTimeout(checkAndCrossfade, 100);
        }
      };

      checkAndCrossfade();
    }, VIDEO_ROTATION_INTERVAL);

    return () => {
      if (rotationTimerRef.current) {
        clearTimeout(rotationTimerRef.current);
      }
    };
  }, [currentIndex, totalVideos, allVideosFailed, failedVideos, readyVideos, getNextValidIndex]);

  // Fallback if all videos fail
  if (allVideosFailed) {
    return (
      <div className="video-rotator">
        <img
          className="video-rotator-fallback"
          src={HERO_FALLBACK_IMAGE}
          alt="Austin landscape"
        />
      </div>
    );
  }

  const isCurrentVisible = visibleVideos.has(currentIndex);
  const isNextVisible = visibleVideos.has(nextIndex);

  return (
    <div className="video-rotator">
      {/* Current Video */}
      <video
        ref={currentVideoRef}
        key={`current-${currentIndex}`}
        className={`video-rotator-video ${isCurrentVisible ? 'active' : ''} ${isCrossfading ? 'fading-out' : ''}`}
        muted
        playsInline
        loop
        preload="auto"
        poster={HERO_FALLBACK_IMAGE}
        onError={() => handleVideoError(currentIndex)}
        onCanPlay={() => handleCanPlay(currentIndex, currentVideoRef.current)}
      >
        <source src={BACKGROUND_VIDEOS[currentIndex]} type="video/mp4" />
      </video>

      {/* Next Video (preloaded, fades in during crossfade) */}
      <video
        ref={nextVideoRef}
        key={`next-${nextIndex}`}
        className={`video-rotator-video ${isNextVisible && isCrossfading ? 'fading-in' : ''}`}
        muted
        playsInline
        loop
        preload="auto"
        poster={HERO_FALLBACK_IMAGE}
        onError={() => handleVideoError(nextIndex)}
        onCanPlay={() => handleCanPlay(nextIndex, nextVideoRef.current)}
      >
        <source src={BACKGROUND_VIDEOS[nextIndex]} type="video/mp4" />
      </video>
    </div>
  );
}

'use client';

import { useState, useEffect, useRef } from 'react';
import {
  BACKGROUND_VIDEOS,
  HERO_FALLBACK_IMAGE,
  VIDEO_ROTATION_INTERVAL,
  VIDEO_CROSSFADE_DURATION,
} from '@/config/assets';

export function VideoRotator() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [showNext, setShowNext] = useState(false);
  const [allVideosFailed, setAllVideosFailed] = useState(false);
  const [failedVideos, setFailedVideos] = useState<Set<number>>(new Set());

  const currentVideoRef = useRef<HTMLVideoElement>(null);
  const nextVideoRef = useRef<HTMLVideoElement>(null);

  const totalVideos = BACKGROUND_VIDEOS.length;

  // Handle video error - try next video
  const handleVideoError = (index: number) => {
    console.error(`Video ${index} failed to load:`, BACKGROUND_VIDEOS[index]);
    const newFailed = new Set(failedVideos);
    newFailed.add(index);
    setFailedVideos(newFailed);

    if (newFailed.size >= totalVideos) {
      console.error('All videos failed to load');
      setAllVideosFailed(true);
    }
  };

  // Handle video loaded successfully
  const handleVideoLoaded = (index: number) => {
    console.log(`Video ${index} loaded successfully:`, BACKGROUND_VIDEOS[index]);
  };

  // Rotation timer
  useEffect(() => {
    if (allVideosFailed || totalVideos <= 1) return;

    const rotationTimer = setInterval(() => {
      // Calculate next index, skipping failed videos
      let next = (currentIndex + 1) % totalVideos;
      let attempts = 0;
      while (failedVideos.has(next) && attempts < totalVideos) {
        next = (next + 1) % totalVideos;
        attempts++;
      }

      if (attempts >= totalVideos) {
        setAllVideosFailed(true);
        return;
      }

      setNextIndex(next);

      // Start crossfade
      setShowNext(true);

      // After crossfade completes, swap
      setTimeout(() => {
        setCurrentIndex(next);
        setShowNext(false);

        // Play the current video
        if (currentVideoRef.current) {
          currentVideoRef.current.currentTime = 0;
          currentVideoRef.current.play().catch(() => {});
        }
      }, VIDEO_CROSSFADE_DURATION);
    }, VIDEO_ROTATION_INTERVAL);

    return () => clearInterval(rotationTimer);
  }, [currentIndex, totalVideos, allVideosFailed, failedVideos]);

  // Initial play
  useEffect(() => {
    if (currentVideoRef.current) {
      currentVideoRef.current.play().catch((e) => {
        console.error('Initial video play failed:', e);
      });
    }
  }, []);

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

  return (
    <div className="video-rotator">
      {/* Current Video - always visible unless transitioning */}
      <video
        ref={currentVideoRef}
        key={`current-${currentIndex}`}
        className={`video-rotator-video active ${showNext ? 'fading-out' : ''}`}
        autoPlay
        muted
        playsInline
        loop
        poster={HERO_FALLBACK_IMAGE}
        onError={() => handleVideoError(currentIndex)}
        onLoadedData={() => handleVideoLoaded(currentIndex)}
      >
        <source src={BACKGROUND_VIDEOS[currentIndex]} type="video/mp4" />
      </video>

      {/* Next Video (preloaded, fades in during transition) */}
      <video
        ref={nextVideoRef}
        key={`next-${nextIndex}`}
        className={`video-rotator-video ${showNext ? 'fading-in' : ''}`}
        autoPlay
        muted
        playsInline
        loop
        poster={HERO_FALLBACK_IMAGE}
        onError={() => handleVideoError(nextIndex)}
        onLoadedData={() => handleVideoLoaded(nextIndex)}
      >
        <source src={BACKGROUND_VIDEOS[nextIndex]} type="video/mp4" />
      </video>
    </div>
  );
}

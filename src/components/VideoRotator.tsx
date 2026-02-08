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
  const [isLoaded, setIsLoaded] = useState(false);

  const currentVideoRef = useRef<HTMLVideoElement>(null);
  const nextVideoRef = useRef<HTMLVideoElement>(null);

  const totalVideos = BACKGROUND_VIDEOS.length;

  // Mark as loaded when first video can play
  const handleCanPlay = () => {
    if (!isLoaded) {
      setIsLoaded(true);
      if (currentVideoRef.current) {
        currentVideoRef.current.play().catch(() => {});
      }
    }
  };

  // Preload next video
  useEffect(() => {
    if (nextVideoRef.current && isLoaded) {
      nextVideoRef.current.load();
    }
  }, [nextIndex, isLoaded]);

  // Rotation timer - only start after loaded
  useEffect(() => {
    if (totalVideos <= 1 || !isLoaded) return;

    const timer = setInterval(() => {
      // Start the next video playing before fade
      if (nextVideoRef.current) {
        nextVideoRef.current.play().catch(() => {});
      }

      // Trigger crossfade
      setShowNext(true);

      // After crossfade completes, swap videos
      setTimeout(() => {
        setCurrentIndex(nextIndex);
        setNextIndex((nextIndex + 1) % totalVideos);
        setShowNext(false);

        // Ensure current video is playing
        if (currentVideoRef.current) {
          currentVideoRef.current.play().catch(() => {});
        }
      }, VIDEO_CROSSFADE_DURATION + 100);

    }, VIDEO_ROTATION_INTERVAL);

    return () => clearInterval(timer);
  }, [totalVideos, nextIndex, isLoaded]);

  return (
    <div className="video-rotator">
      {/* Current Video */}
      <video
        ref={currentVideoRef}
        key={`current-${currentIndex}`}
        className="video-rotator-video"
        src={BACKGROUND_VIDEOS[currentIndex]}
        autoPlay
        muted
        playsInline
        loop
        preload="auto"
        poster={HERO_FALLBACK_IMAGE}
        onCanPlayThrough={handleCanPlay}
        style={{
          opacity: showNext ? 0 : 1,
          zIndex: 2,
        }}
      />

      {/* Next Video (preloaded, fades in) */}
      {isLoaded && (
        <video
          ref={nextVideoRef}
          key={`next-${nextIndex}`}
          className="video-rotator-video"
          src={BACKGROUND_VIDEOS[nextIndex]}
          muted
          playsInline
          loop
          preload="auto"
          poster={HERO_FALLBACK_IMAGE}
          style={{
            opacity: showNext ? 1 : 0,
            zIndex: 1,
          }}
        />
      )}
    </div>
  );
}

'use client';

import { useEffect, useRef, useCallback } from 'react';
import {
  BACKGROUND_VIDEOS,
  HERO_FALLBACK_IMAGE,
} from '@/config/assets';

export function VideoRotator() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const playVideo = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {});
    }
  }, []);

  // Seamless loop - reset before video ends to avoid pause
  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (video && video.duration > 0) {
      // Reset 0.15 seconds before end for seamless loop
      if (video.currentTime >= video.duration - 0.15) {
        video.currentTime = 0;
      }
    }
  }, []);

  // Autoplay on mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    playVideo();

    // Handle visibility change (tab switch)
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        playVideo();
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [playVideo]);

  return (
    <div className="video-rotator">
      <video
        ref={videoRef}
        className="video-rotator-video"
        src={BACKGROUND_VIDEOS[0]}
        autoPlay
        muted
        playsInline
        preload="auto"
        poster={HERO_FALLBACK_IMAGE}
        onCanPlay={playVideo}
        onLoadedData={playVideo}
        onTimeUpdate={handleTimeUpdate}
        style={{ opacity: 1 }}
      />
    </div>
  );
}

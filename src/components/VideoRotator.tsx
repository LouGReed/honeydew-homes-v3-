'use client';

import { useEffect, useRef } from 'react';
import {
  BACKGROUND_VIDEOS,
  HERO_FALLBACK_IMAGE,
} from '@/config/assets';

export function VideoRotator() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Play video on mount
  useEffect(() => {
    const playVideo = () => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    };

    playVideo();
    // Retry for autoplay policies
    const timer = setTimeout(playVideo, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="video-rotator">
      <video
        ref={videoRef}
        className="video-rotator-video"
        src={BACKGROUND_VIDEOS[0]}
        autoPlay
        muted
        playsInline
        loop
        preload="auto"
        poster={HERO_FALLBACK_IMAGE}
        style={{ opacity: 1 }}
      />
    </div>
  );
}

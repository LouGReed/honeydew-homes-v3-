'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  BACKGROUND_VIDEOS,
  HERO_FALLBACK_IMAGE,
  VIDEO_ROTATION_INTERVAL,
  VIDEO_CROSSFADE_DURATION,
} from '@/config/assets';

export function VideoRotator() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [videoSupported, setVideoSupported] = useState(true);

  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const [activeSlot, setActiveSlot] = useState<'A' | 'B'>('A');

  const totalVideos = BACKGROUND_VIDEOS.length;

  // Check video support on mount
  useEffect(() => {
    const video = document.createElement('video');
    const canPlayMov = video.canPlayType('video/quicktime') !== '';
    const canPlayMp4 = video.canPlayType('video/mp4') !== '';
    setVideoSupported(canPlayMov || canPlayMp4);
  }, []);

  // Preload next video
  const preloadNext = useCallback((index: number) => {
    const nextVideo = activeSlot === 'A' ? videoBRef.current : videoARef.current;
    if (nextVideo) {
      nextVideo.src = BACKGROUND_VIDEOS[index];
      nextVideo.load();
    }
  }, [activeSlot]);

  // Rotation logic
  useEffect(() => {
    if (!videoSupported || totalVideos <= 1) return;

    const rotationTimer = setInterval(() => {
      const next = (activeIndex + 1) % totalVideos;
      setNextIndex(next);
      preloadNext(next);

      // Start transition
      setIsTransitioning(true);

      // After crossfade, swap active slot
      setTimeout(() => {
        setActiveSlot(prev => prev === 'A' ? 'B' : 'A');
        setActiveIndex(next);
        setIsTransitioning(false);

        // Start playing the new active video
        const newActiveVideo = activeSlot === 'A' ? videoBRef.current : videoARef.current;
        if (newActiveVideo) {
          newActiveVideo.play().catch(() => {});
        }
      }, VIDEO_CROSSFADE_DURATION);
    }, VIDEO_ROTATION_INTERVAL);

    return () => clearInterval(rotationTimer);
  }, [activeIndex, activeSlot, preloadNext, totalVideos, videoSupported]);

  // Initial video setup
  useEffect(() => {
    if (videoARef.current && BACKGROUND_VIDEOS[0]) {
      videoARef.current.src = BACKGROUND_VIDEOS[0];
      videoARef.current.play().catch(() => setVideoSupported(false));
    }
    if (videoBRef.current && BACKGROUND_VIDEOS[1]) {
      videoBRef.current.src = BACKGROUND_VIDEOS[1];
      videoBRef.current.load();
    }
  }, []);

  // Fallback to images if video not supported
  if (!videoSupported) {
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
      {/* Video A */}
      <video
        ref={videoARef}
        className={`video-rotator-video ${activeSlot === 'A' && !isTransitioning ? 'active' : ''} ${activeSlot === 'A' && isTransitioning ? 'fading-out' : ''} ${activeSlot === 'B' && isTransitioning ? 'fading-in' : ''}`}
        autoPlay
        muted
        playsInline
        loop
        poster={HERO_FALLBACK_IMAGE}
      />

      {/* Video B */}
      <video
        ref={videoBRef}
        className={`video-rotator-video ${activeSlot === 'B' && !isTransitioning ? 'active' : ''} ${activeSlot === 'B' && isTransitioning ? 'fading-out' : ''} ${activeSlot === 'A' && isTransitioning ? 'fading-in' : ''}`}
        autoPlay
        muted
        playsInline
        loop
        poster={HERO_FALLBACK_IMAGE}
      />
    </div>
  );
}

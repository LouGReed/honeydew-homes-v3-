'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  BACKGROUND_VIDEOS,
  HERO_FALLBACK_IMAGE,
  VIDEO_ROTATION_INTERVAL,
  VIDEO_CROSSFADE_DURATION,
} from '@/config/assets';

export function VideoRotator() {
  // Track which video slot (A or B) is active
  const [activeSlot, setActiveSlot] = useState<'A' | 'B'>('A');
  const [videoIndexA, setVideoIndexA] = useState(0);
  const [videoIndexB, setVideoIndexB] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slotAReady, setSlotAReady] = useState(false);
  const [slotBReady, setSlotBReady] = useState(false);

  const videoRefA = useRef<HTMLVideoElement>(null);
  const videoRefB = useRef<HTMLVideoElement>(null);

  const totalVideos = BACKGROUND_VIDEOS.length;

  // Handle video ready - always try to play
  const handleCanPlayA = useCallback(() => {
    setSlotAReady(true);
    if (videoRefA.current) {
      videoRefA.current.play().catch(() => {});
    }
  }, []);

  const handleCanPlayB = useCallback(() => {
    setSlotBReady(true);
    if (videoRefB.current) {
      videoRefB.current.play().catch(() => {});
    }
  }, []);

  // Rotation timer
  useEffect(() => {
    if (totalVideos <= 1 || isTransitioning) return;

    const timer = setTimeout(() => {
      // Determine which slot to transition TO
      const nextSlot = activeSlot === 'A' ? 'B' : 'A';
      const currentIndex = activeSlot === 'A' ? videoIndexA : videoIndexB;
      const nextIndex = (currentIndex + 1) % totalVideos;

      // Set up the next video in the inactive slot
      if (nextSlot === 'A') {
        setVideoIndexA(nextIndex);
        setSlotAReady(false);
      } else {
        setVideoIndexB(nextIndex);
        setSlotBReady(false);
      }

      // Start transition after a brief delay to let the new video load
      setTimeout(() => {
        setIsTransitioning(true);

        // Play the new active video BEFORE switching opacity for smoother transition
        const newActiveRef = nextSlot === 'A' ? videoRefA : videoRefB;
        const oldActiveRef = nextSlot === 'A' ? videoRefB : videoRefA;

        if (newActiveRef.current) {
          newActiveRef.current.play().catch(() => {});
        }

        // Small delay then switch active slot for crossfade
        setTimeout(() => {
          setActiveSlot(nextSlot);
        }, 100);

        // After transition completes, pause the old video
        setTimeout(() => {
          setIsTransitioning(false);
          if (oldActiveRef.current) {
            oldActiveRef.current.pause();
            oldActiveRef.current.currentTime = 0;
          }
        }, VIDEO_CROSSFADE_DURATION + 200);
      }, 800); // Wait 800ms for preload
    }, VIDEO_ROTATION_INTERVAL);

    return () => clearTimeout(timer);
  }, [activeSlot, videoIndexA, videoIndexB, totalVideos, isTransitioning]);

  // Initial play on mount
  useEffect(() => {
    // Try to play immediately on mount
    const playFirstVideo = () => {
      if (videoRefA.current) {
        videoRefA.current.play().catch(() => {});
      }
    };

    // Try immediately and after a short delay
    playFirstVideo();
    const timer = setTimeout(playFirstVideo, 100);

    return () => clearTimeout(timer);
  }, []);

  const isAActive = activeSlot === 'A';
  const isBActive = activeSlot === 'B';

  return (
    <div className="video-rotator">
      {/* Video Slot A */}
      <video
        ref={videoRefA}
        className="video-rotator-video"
        src={BACKGROUND_VIDEOS[videoIndexA]}
        autoPlay
        muted
        playsInline
        loop
        preload="auto"
        poster={HERO_FALLBACK_IMAGE}
        onCanPlay={handleCanPlayA}
        style={{
          opacity: isAActive ? 1 : 0,
          transition: `opacity ${VIDEO_CROSSFADE_DURATION}ms ease-in-out`,
          zIndex: isAActive ? 2 : 1,
        }}
      />

      {/* Video Slot B */}
      <video
        ref={videoRefB}
        className="video-rotator-video"
        src={BACKGROUND_VIDEOS[videoIndexB]}
        muted
        playsInline
        loop
        preload="auto"
        poster={HERO_FALLBACK_IMAGE}
        onCanPlay={handleCanPlayB}
        style={{
          opacity: isBActive ? 1 : 0,
          transition: `opacity ${VIDEO_CROSSFADE_DURATION}ms ease-in-out`,
          zIndex: isBActive ? 2 : 1,
        }}
      />
    </div>
  );
}

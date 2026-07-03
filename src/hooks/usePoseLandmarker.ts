'use client';

import { useEffect, useRef, useState } from 'react';
import { detectPose } from '@/lib/mediapipe';
import type { PoseResult } from '@/lib/types';

export function usePoseLandmarker(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  isReady: boolean
) {
  const [result, setResult] = useState<PoseResult | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!isReady) return;

    let lastTs = -1;
    let running = true;

    const loop = async () => {
      if (!running) return;
      const video = videoRef.current;
      if (video && video.readyState >= 2) {
        const ts = performance.now();
        if (ts !== lastTs) {
          lastTs = ts;
          const r = await detectPose(video, ts);
          if (running) setResult(r);
        }
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, [videoRef, isReady]);

  return result;
}

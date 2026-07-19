'use client';

import { useEffect, useRef } from 'react';
import { detectPose } from '@/lib/mediapipe';
import type { PoseResult } from '@/lib/types';

export function usePoseLandmarker(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  isReady: boolean,
  onPoseDetected: (result: PoseResult) => void,
  onError?: (err: Error) => void
) {
  const rafRef = useRef<number>(0);
  const onPoseDetectedRef = useRef(onPoseDetected);
  const onErrorRef = useRef(onError);
  onPoseDetectedRef.current = onPoseDetected;
  onErrorRef.current = onError;

  useEffect(() => {
    if (!isReady) return;

    let running = true;
    let detecting = false;

    const loop = () => {
      if (!running) return;

      const video = videoRef.current;
      if (video && video.readyState >= 2 && !detecting) {
        detecting = true;
        const ts = performance.now();

        // ✅ non-blocking: ไม่ await, ใช้ then/catch + flag
        detectPose(video, ts)
          .then((r) => {
            detecting = false;
            if (running && r) {
              onPoseDetectedRef.current(r);
            }
          })
          .catch((err) => {
            detecting = false;
            console.error('❌ detectPose error:', err);
            if (onErrorRef.current) {
              onErrorRef.current(err instanceof Error ? err : new Error(String(err)));
            }
          });
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    // ✅ Visibility handling — หยุด RAF เมื่อ tab ซ่อน
    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafRef.current);
      } else {
        rafRef.current = requestAnimationFrame(loop);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [videoRef, isReady]);
}

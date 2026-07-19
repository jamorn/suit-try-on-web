'use client';

import { useRef, useState, useCallback, useEffect } from 'react';

export function useCamera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = useCallback(async () => {
    // ป้องกันการเรียกซ้ำ
    if (streamRef.current) return;

    console.log('📷 useCamera: Setting up camera...');

    try {
      console.log('📷 Requesting camera access...');

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user',
        },
        audio: false,
      });

      streamRef.current = stream;

      console.log('✅ Camera stream obtained');

      const video = videoRef.current;
      if (!video) {
        console.error('❌ Video element not found');
        setError('Video element not ready');
        return;
      }

      video.srcObject = stream;
      video.muted = true;
      video.playsInline = true;

      try {
        await video.play();
        console.log('▶️ Video playing');
        setIsReady(true);
      } catch (playError) {
        console.error('❌ Play failed:', playError);
        video.onloadedmetadata = async () => {
          try {
            await video.play();
            console.log('▶️ Video playing (after metadata)');
            setIsReady(true);
          } catch (e) {
            console.error('❌ Play failed again:', e);
            setError('ไม่สามารถเล่นวิดีโอได้');
          }
        };
      }
    } catch (err) {
      console.error('❌ Camera error:', err);
      if (err instanceof Error) {
        setError(`กล้อง error: ${err.message}`);
      } else {
        setError('ไม่สามารถเปิดกล้องได้');
      }
    }
  }, []);

  // ✅ Cleanup เมื่อ component unmount
  useEffect(() => {
    return () => {
      console.log('🛑 Cleaning up camera');
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, []);

  return { videoRef, isReady, error, startCamera };
}

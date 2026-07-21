// src/hooks/useCamera.ts
'use client';

import { useRef, useState, useCallback, useEffect } from 'react';

export interface UseCameraReturn {
  /** Ref สำหรับ video element */
  videoRef: React.RefObject<HTMLVideoElement | null>;
  /** กล้องพร้อมใช้งานแล้ว */
  isReady: boolean;
  /** ข้อความ error ถ้ามี */
  error: string | null;
  /** เริ่มกล้อง */
  startCamera: () => Promise<void>;
  /** ปิดกล้อง */
  stopCamera: () => void;
}

/**
 * Hook สำหรับจัดการกล้องเว็บแคม
 * รองรับ cleanup เมื่อ unmount และการหยุดกล้องด้วยตนเอง
 */
export function useCamera(): UseCameraReturn {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      stopCameraInternal();
    };
  }, []);

  const stopCameraInternal = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
        console.log('🛑 Track stopped:', track.kind);
      });
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsReady(false);
  }, []);

  const startCamera = useCallback(async (): Promise<void> => {
    if (streamRef.current) {
      console.log('📷 Camera already running');
      return;
    }

    console.log('📷 useCamera: Setting up camera...');

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user',
        },
        audio: false,
      });

      if (!mountedRef.current) {
        // Component unmount ระหว่าง getUserMedia
        stream.getTracks().forEach((t) => t.stop());
        return;
      }

      streamRef.current = stream;
      console.log('✅ Camera stream obtained');

      const video = videoRef.current;
      if (!video) {
        console.error('❌ Video element not found');
        setError('Video element not ready');
        stopCameraInternal();
        return;
      }

      video.srcObject = stream;
      video.muted = true;
      video.playsInline = true;

      // รอให้ video พร้อมเล่น
      await new Promise<void>((resolve, reject) => {
        const onCanPlay = () => {
          video.removeEventListener('canplay', onCanPlay);
          resolve();
        };
        const onError = () => {
          video.removeEventListener('error', onError);
          reject(new Error('Video load error'));
        };
        video.addEventListener('canplay', onCanPlay);
        video.addEventListener('error', onError);
        
        // Timeout 5 วินาที
        setTimeout(() => {
          video.removeEventListener('canplay', onCanPlay);
          reject(new Error('Video load timeout'));
        }, 5000);
      });

      if (!mountedRef.current) return;

      await video.play();
      console.log('▶️ Video playing');
      setIsReady(true);
      setError(null);
    } catch (err) {
      if (!mountedRef.current) return;
      
      console.error('❌ Camera error:', err);
      if (err instanceof Error) {
        setError(`กล้อง error: ${err.message}`);
      } else {
        setError('ไม่สามารถเปิดกล้องได้');
      }
      stopCameraInternal();
    }
  }, [stopCameraInternal]);

  const stopCamera = useCallback((): void => {
    stopCameraInternal();
    setError(null);
  }, [stopCameraInternal]);

  return { videoRef, isReady, error, startCamera, stopCamera };
}
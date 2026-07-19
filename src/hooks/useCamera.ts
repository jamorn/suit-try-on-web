'use client';

import { useEffect, useRef, useState } from 'react';

export function useCamera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('📷 useCamera: Setting up camera...');
    let activeStream: MediaStream | null = null; // 👈 เก็บ stream ไว้ใน closure

    async function setupCamera() {
      try {
        console.log('📷 Requesting camera access...');
        
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { 
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: 'user'
          },
          audio: false
        });

        activeStream = stream; // 👈 ผูกค่าไว้ใน closure
        
        console.log('✅ Camera stream obtained');
        
        const video = videoRef.current;
        if (!video) {
          console.error('❌ Video element not found');
          setError('Video element not ready');
          // ไม่ return activeStream ไว้ เพื่อให้ cleanup ปิด stream ได้
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
    }

    setupCamera();

    return () => {
      console.log('🛑 Cleaning up camera');
      // ✅ ปิด stream จากตัวแปรใน closure โดยตรง —ปลอดภัย ไม่พึ่งพา DOM ref
      if (activeStream) {
        activeStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return { videoRef, isReady, error };
}
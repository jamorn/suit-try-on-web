'use client';

import { PoseLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';
import type { Landmark } from '@/lib/types';

let poseLandmarker: PoseLandmarker | null = null;
let initPromise: Promise<PoseLandmarker> | null = null;

export async function initPoseLandmarker(): Promise<PoseLandmarker> {
  if (poseLandmarker) return poseLandmarker;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    const vision = await FilesetResolver.forVisionTasks('/wasm');

    // ✅ ลอง GPU ก่อน, fallback ไป CPU
    const delegates: ('GPU' | 'CPU')[] = ['GPU', 'CPU'];
    for (const delegate of delegates) {
      try {
        poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: '/assets/pose_landmarker_lite.task',
            delegate,
          },
          runningMode: 'VIDEO',
          numPoses: 1,
        });
        console.log(`✅ PoseLandmarker initialized with ${delegate} delegate`);
        return poseLandmarker;
      } catch (e) {
        console.warn(`⚠️ ${delegate} delegate failed:`, e);
      }
    }

    // ทั้ง GPU และ CPU ล้มเหลว
    throw new Error('ไม่สามารถเริ่มต้น PoseLandmarker ได้ (GPU และ CPU ล้มเหลว)');
  })();

  return initPromise;
}

export async function detectPose(
  video: HTMLVideoElement,
  timestamp: number
): Promise<{ landmarks: Landmark[][] } | null> {
  try {
    const detector = await initPoseLandmarker();
    const result = detector.detectForVideo(video, timestamp);

    if (!result || !result.landmarks || result.landmarks.length === 0) {
      return null;
    }

    return {
      landmarks: result.landmarks as unknown as Landmark[][],
    };
  } catch (err) {
    console.error('❌ detectPose error:', err);
    throw err;
  }
}

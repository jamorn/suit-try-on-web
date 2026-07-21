// src/lib/mediapipe.ts

import { PoseLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';
import type { PoseResult } from '@/lib/types';
import { VISIBILITY_THRESHOLD } from '@/lib/types';

let poseLandmarker: PoseLandmarker | null = null;
let initPromise: Promise<PoseLandmarker> | null = null;

/**
 * เริ่มต้น PoseLandmarker
 * ใช้ Singleton pattern ป้องกัน initialize ซ้ำ
 * Fallback: GPU → CPU
 */
export async function initPoseLandmarker(): Promise<PoseLandmarker> {
  if (poseLandmarker) return poseLandmarker;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    const vision = await FilesetResolver.forVisionTasks('/wasm');

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

    throw new Error('ไม่สามารถเริ่มต้น PoseLandmarker ได้ (GPU และ CPU ล้มเหลว)');
  })();

  return initPromise;
}

/**
 * ปิดและลบ PoseLandmarker
 * ควรเรียกเมื่อ component unmount หรือเปลี่ยนหน้า
 */
export function disposePoseLandmarker(): void {
  if (poseLandmarker) {
    try {
      poseLandmarker.close();
    } catch (e) {
      console.warn('⚠️ Error closing PoseLandmarker:', e);
    }
    poseLandmarker = null;
    initPromise = null;
    console.log('🗑️ PoseLandmarker disposed');
  }
}

/**
 * ตรวจจับท่าทางจาก video
 * @returns PoseResult หรือ null ถ้าไม่พบ หรือ video ไม่พร้อม
 */
export async function detectPose(
  video: HTMLVideoElement,
  timestamp: number
): Promise<PoseResult | null> {
  // ตรวจสอบ video พร้อมเล่นหรือยัง
  if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
    console.warn('⏳ Video not ready (readyState:', video.readyState, ')');
    return null;
  }

  // ตรวจสอบ video หยุดชั่วคราวหรือจบแล้ว
  if (video.paused || video.ended) {
    return null;
  }

  try {
    const landmarker = await initPoseLandmarker();
    const results = landmarker.detectForVideo(video, timestamp);

    if (results.landmarks && results.landmarks.length > 0) {
      return {
        landmarks: results.landmarks.map((pose) =>
          pose.map((lm) => ({
            x: lm.x,
            y: lm.y,
            z: lm.z,
            visibility: lm.visibility,
          }))
        ),
      };
    }

    return null;
  } catch (err) {
    console.error('❌ detectPose error:', err);
    // Graceful degradation: return null แทน throw
    return null;
  }
}

/** ตรวจสอบว่า PoseLandmarker พร้อมใช้งานหรือไม่ */
export function isPoseLandmarkerReady(): boolean {
  return poseLandmarker !== null;
}
import { PoseLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';
import type { PoseResult } from './types';

let poseLandmarker: PoseLandmarker | null = null;

export async function initPoseLandmarker(): Promise<PoseLandmarker> {
  if (poseLandmarker) return poseLandmarker;

  const vision = await FilesetResolver.forVisionTasks('/wasm');

  poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: '/assets/pose_landmarker_lite.task',
      delegate: 'GPU',
    },
    runningMode: 'VIDEO',
    numPoses: 1,
  });

  return poseLandmarker;
}

export async function detectPose(
  video: HTMLVideoElement,
  timestamp: number
): Promise<PoseResult | null> {
  try {
    const landmarker = await initPoseLandmarker();
    const results = landmarker.detectForVideo(video, timestamp);
    if (results.landmarks && results.landmarks.length > 0) {
      return {
        landmarks: results.landmarks.map((pose) =>
          pose.map((lm) => ({ x: lm.x, y: lm.y, z: lm.z, visibility: lm.visibility }))
        ),
      };
    }
    return null;
  } catch (e) {
    console.error('Pose detection error:', e);
    return null;
  }
}

import type { Landmark, SuitConfig } from '@/lib/types';

export interface SuitRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

// MediaPipe Pose landmark indices
const LEFT_SHOULDER = 11;
const RIGHT_SHOULDER = 12;
const LEFT_HIP = 23;
const RIGHT_HIP = 24;

export function calculateSuitRect(
  landmarks: Landmark[],
  canvasWidth: number,
  canvasHeight: number,
  config: SuitConfig,
  suitImage: HTMLImageElement
): SuitRect | null {
  const leftShld = landmarks[LEFT_SHOULDER];
  const rightShld = landmarks[RIGHT_SHOULDER];
  const leftHip = landmarks[LEFT_HIP];
  const rightHip = landmarks[RIGHT_HIP];

  // ✅ Validation — visibility ต่ำหรือไม่มี landmark
  if (!leftShld || !rightShld) return null;
  if (leftShld.visibility !== undefined && leftShld.visibility < 0.3) return null;
  if (rightShld.visibility !== undefined && rightShld.visibility < 0.3) return null;

  const shoulderCenterX = ((leftShld.x + rightShld.x) / 2) * canvasWidth;
  const shoulderCenterY = ((leftShld.y + rightShld.y) / 2) * canvasHeight;

  const shoulderWidth = Math.abs(rightShld.x - leftShld.x) * canvasWidth;
  const baseSuitWidth = shoulderWidth * 3.5;
  const suitWidth = baseSuitWidth * config.stretchX;

  // คำนวณความสูงของลำตัว ถ้า hip landmark พร้อม
  let bodyHeight = suitWidth * (suitImage.height / suitImage.width) * config.stretchY;
  if (leftHip && rightHip && leftHip.visibility && leftHip.visibility > 0.3) {
    const hipCenterY = ((leftHip.y + rightHip.y) / 2) * canvasHeight;
    const torsoHeight = Math.abs(hipCenterY - shoulderCenterY);
    bodyHeight = torsoHeight * 2.5 * config.stretchY;
  }

  const centerY = shoulderCenterY + bodyHeight * 0.35;
  const x = shoulderCenterX - suitWidth / 2 + config.xOffset;
  const y = centerY - bodyHeight / 2 + config.yOffset;

  return { x, y, width: suitWidth, height: bodyHeight };
}

export function drawSuit(
  ctx: CanvasRenderingContext2D,
  suitImage: HTMLImageElement,
  rect: SuitRect
) {
  ctx.drawImage(suitImage, rect.x, rect.y, rect.width, rect.height);
}

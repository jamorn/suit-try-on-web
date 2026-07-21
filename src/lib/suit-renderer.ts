// src/lib/suit-renderer.ts
import type { Landmark, SuitConfig, SuitRect } from '@/lib/types';
import { VISIBILITY_THRESHOLD } from '@/lib/types';

const LEFT_SHOULDER = 11;
const RIGHT_SHOULDER = 12;

export function calculateSuitRect(
  landmarks: Landmark[],
  canvasWidth: number,
  canvasHeight: number,
  config: SuitConfig,
  suitImage: HTMLImageElement
): SuitRect | null {
  if (!suitImage.complete || suitImage.naturalWidth === 0) {
    console.warn('🖼️ Suit image not loaded yet:', config.path);
    return null;
  }

  const leftShld = landmarks[LEFT_SHOULDER];
  const rightShld = landmarks[RIGHT_SHOULDER];

  if (!leftShld || !rightShld) {
    console.warn('👤 Shoulder landmarks missing');
    return null;
  }

  if (
    leftShld.visibility !== undefined &&
    leftShld.visibility < VISIBILITY_THRESHOLD
  ) {
    console.warn('👤 Left shoulder not visible enough:', leftShld.visibility);
    return null;
  }

  if (
    rightShld.visibility !== undefined &&
    rightShld.visibility < VISIBILITY_THRESHOLD
  ) {
    console.warn('👤 Right shoulder not visible enough:', rightShld.visibility);
    return null;
  }

  const shoulderDistance = Math.abs(leftShld.x - rightShld.x);

  // ✅ ไม่มี depthScale — ใช้ scaleFactor ตรงๆ
  const baseWidth =
    shoulderDistance * canvasWidth * config.scaleFactor;
  const aspect = suitImage.naturalHeight / suitImage.naturalWidth;

  const suitWidth = Math.max(1, baseWidth * config.stretchX);
  const suitHeight = Math.max(1, baseWidth * aspect * config.stretchY);

  const shoulderCenterX = ((leftShld.x + rightShld.x) / 2) * canvasWidth;
  const shoulderCenterY = ((leftShld.y + rightShld.y) / 2) * canvasHeight;

  const xOffsetPx = config.xOffsetPercent * canvasWidth;
  const yOffsetPx = config.yOffsetPercent * canvasHeight;

  const topEdge =
    shoulderCenterY - suitHeight * config.anchorY + yOffsetPx;
  const centerY = topEdge + suitHeight / 2;
  const centerX = shoulderCenterX + xOffsetPx;

  const rect: SuitRect = {
    x: centerX,
    y: centerY,
    width: suitWidth,
    height: suitHeight,
  };

  if (!isValidRect(rect)) {
    console.warn('📐 Invalid suit rect calculated:', rect);
    return null;
  }

  return rect;
}

export function drawSuit(
  ctx: CanvasRenderingContext2D,
  suitImage: HTMLImageElement,
  rect: SuitRect
): void {
  if (!isValidRect(rect)) {
    console.warn('🎨 Invalid rect in drawSuit:', rect);
    return;
  }

  if (!suitImage.complete || suitImage.naturalWidth === 0) {
    console.warn('🎨 Image not ready in drawSuit');
    return;
  }

  ctx.drawImage(
    suitImage,
    rect.x - rect.width / 2,
    rect.y - rect.height / 2,
    rect.width,
    rect.height
  );
}

function isValidRect(rect: SuitRect): boolean {
  return (
    Number.isFinite(rect.x) &&
    Number.isFinite(rect.y) &&
    Number.isFinite(rect.width) &&
    Number.isFinite(rect.height) &&
    rect.width > 0 &&
    rect.height > 0
  );
}

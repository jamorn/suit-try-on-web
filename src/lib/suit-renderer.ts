// src/lib/suit-renderer.ts
import type { Landmark, SuitConfig, SuitRect } from '@/lib/types';
import { VISIBILITY_THRESHOLD } from '@/lib/types';

const LEFT_SHOULDER = 11;
const RIGHT_SHOULDER = 12;

/** ระยะห่างไหล่ที่ถือว่า "ปกติ" (normalized 0-1) */
const NORMAL_SHOULDER_DISTANCE = 0.25;

/**
 * คำนวณขนาดและตำแหน่งสำหรับวาดเสื้อสูท
 * รองรับ responsive ด้วย percent-based offset
 * และปรับ scale ตามระยะห่างจากกล้อง
 */
export function calculateSuitRect(
  landmarks: Landmark[],
  canvasWidth: number,
  canvasHeight: number,
  config: SuitConfig,
  suitImage: HTMLImageElement
): SuitRect | null {
  // ตรวจสอบรูปภาพโหลดเสร็จแล้ว
  if (!suitImage.complete || suitImage.naturalWidth === 0) {
    console.warn('🖼️ Suit image not loaded yet:', config.path);
    return null;
  }

  const leftShld = landmarks[LEFT_SHOULDER];
  const rightShld = landmarks[RIGHT_SHOULDER];

  // Validation — ตรวจสอบว่า landmarks มีอยู่และมองเห็นได้
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

  // คำนวณระยะห่างไหล่ (ใช้เป็น proxy สำหรับระยะห่างจากกล้อง)
  const shoulderDistance = Math.abs(leftShld.x - rightShld.x);
  
  // ปรับ scaleFactor ตามระยะห่างจากกล้อง
  // ถ้ายืนใกล้ (shoulderDistance ใหญ่) → scale ลดลง
  // ถ้ายืนไกล (shoulderDistance เล็ก) → scale เพิ่มขึ้น
  const depthScale = NORMAL_SHOULDER_DISTANCE / Math.max(shoulderDistance, 0.1);
  const adjustedScaleFactor = config.scaleFactor * Math.min(depthScale, 2.0);

  // คำนวณขนาดเสื้อ
  const baseWidth =
    shoulderDistance * canvasWidth * adjustedScaleFactor;
  const aspect = suitImage.naturalHeight / suitImage.naturalWidth;
  
  const suitWidth = Math.max(1, baseWidth * config.stretchX);
  const suitHeight = Math.max(1, baseWidth * aspect * config.stretchY);

  // คำนวณตำแหน่ง (ใช้ percent-based offset สำหรับ responsive)
  const shoulderCenterX = ((leftShld.x + rightShld.x) / 2) * canvasWidth;
  const shoulderCenterY = ((leftShld.y + rightShld.y) / 2) * canvasHeight;
  
  const xOffsetPx = config.xOffsetPercent * canvasWidth;
  const yOffsetPx = config.yOffsetPercent * canvasHeight;
  
  const topEdge =
    shoulderCenterY - suitHeight * config.anchorY + yOffsetPx;
  const centerY = topEdge + suitHeight / 2;
  const centerX = shoulderCenterX + xOffsetPx;

  // Validation ผลลัพธ์
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

/**
 * วาดเสื้อสูทลงบน canvas
 * ใช้ center anchor (rect.x, rect.y เป็นจุดกึ่งกลาง)
 */
export function drawSuit(
  ctx: CanvasRenderingContext2D,
  suitImage: HTMLImageElement,
  rect: SuitRect
): void {
  // Validation ก่อนวาด
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

/** ตรวจสอบว่า SuitRect ถูกต้อง */
function isValidRect(rect: SuitRect): boolean {
  return (
    Number.isFinite(rect.x) &&
    Number.isFinite(rect.y) &&
    Number.isFinite(rect.width) &&
    Number.isFinite(rect.height) &&
    rect.width > 0 &&
    rect.height > 0 &&
    rect.x >= -rect.width &&  // อนุญาตให้ล้นออกขอบเล็กน้อย
    rect.y >= -rect.height &&
    rect.x <= 10000 &&  // sanity check
    rect.y <= 10000
  );
}
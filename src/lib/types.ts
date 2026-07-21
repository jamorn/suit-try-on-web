// src/lib/types.ts

/**
 * ค่าคงที่สำหรับการตรวจสอบ visibility ของ landmarks
 * ค่า 0.5 = ต้องมองเห็นชัดเจนถึงจะใช้ได้
 */
export const VISIBILITY_THRESHOLD = 0.5;

/**
 * ค่าคงที่สำหรับการ throttle ปุ่ม (ms)
 */
export const THROTTLE_MS = 350;

/**
 * ค่าคงที่สำหรับการ throttle การปรับตำแหน่ง (ms)
 */
export const ADJUST_THROTTLE_MS = 100;

/**
 * ค่าคงที่สำหรับการ throttle keyboard (ms)
 */
export const KEYBOARD_THROTTLE_MS = 80;

/**
 * ค่าคงที่สำหรับการ skip frame ใน pose detection
 * ตรวจจับทุก 2 frame เพื่อประสิทธิภาพ
 */
export const POSE_DETECTION_SKIP_FRAMES = 2;

/** ข้อมูลการตั้งค่าเสื้อสูท */
export interface SuitConfig {
  /** Path รูปภาพเสื้อสูท */
  path: string;
  /** ลำดับการแสดงผล */
  order: number;
  /** เพศที่เหมาะสม: M = ชาย, F = หญิง */
  sex: 'M' | 'F';
  /** จุด anchor จากบนลงล่าง (0-1) */
  anchorY: number;
  /** ตัวคูณขนาดพื้นฐาน */
  scaleFactor: number;
  /** ปรับตำแหน่งแนวนอน (เปอร์เซ็นต์ของความกว้าง canvas) */
  xOffsetPercent: number;
  /** ปรับตำแหน่งแนวตั้ง (เปอร์เซ็นต์ของความสูง canvas) */
  yOffsetPercent: number;
  /** ยืด/หดแนวนอน */
  stretchX: number;
  /** ยืด/หดแนวตั้ง */
  stretchY: number;
}

/** Landmark จาก MediaPipe Pose */
export interface Landmark {
  x: number;
  y: number;
  z: number;
  /** ความมั่นใจว่ามองเห็นได้ (0-1) */
  visibility?: number;
}

/** ผลลัพธ์จากการตรวจจับท่าทาง */
export interface PoseResult {
  landmarks: Landmark[][];
}

/** ขนาดและตำแหน่งสำหรับวาดเสื้อสูท */
export interface SuitRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

/** หน้า HUD */
export type HUDPage = 'basic' | 'tuning';

/** ข้อมูลสำหรับ throttle */
export interface ThrottleState {
  lastCall: number;
}

/** สถานะการโหลดรูปภาพ */
export type ImageLoadStatus = 'loading' | 'loaded' | 'error';

/** ข้อมูลรูปภาพที่โหลด */
export interface LoadedImage {
  image: HTMLImageElement;
  status: ImageLoadStatus;
}
// src/lib/config.ts
import type { SuitConfig } from './types';

/**
 * ข้อมูลเสื้อสูททั้งหมด
 * ใช้ `as const` เพื่อป้องกันการแก้ไข runtime
 * และ `satisfies` เพื่อตรวจสอบ type
 */
export const SUIT_DATA = [
  {
    path: '/assets/male_suit_1.png',
    order: 1,
    sex: 'M' as const,
    anchorY: 0.28,
    scaleFactor: 1.5,
    xOffsetPercent: 0.008,  // ~5px ที่ 640px
    yOffsetPercent: 0,
    stretchX: 1.0,
    stretchY: 1.0,
  },
  {
    path: '/assets/male_suit_2.png',
    order: 2,
    sex: 'M' as const,
    anchorY: 0.30,
    scaleFactor: 1.5,
    xOffsetPercent: 0.008,
    yOffsetPercent: 0,
    stretchX: 1.0,
    stretchY: 1.0,
  },
  {
    path: '/assets/female_suit_1.png',
    order: 1,
    sex: 'F' as const,
    anchorY: 0.12,
    scaleFactor: 1.6,
    xOffsetPercent: 0,
    yOffsetPercent: 0,
    stretchX: 1.0,
    stretchY: 1.0,
  },
  {
    path: '/assets/female_suit_2.png',
    order: 2,
    sex: 'F' as const,
    anchorY: 0.10,
    scaleFactor: 1.7,
    xOffsetPercent: 0,
    yOffsetPercent: 0,
    stretchX: 1.0,
    stretchY: 1.0,
  },
] as const satisfies readonly SuitConfig[];

/** เพศเริ่มต้น */
export const DEFAULT_SEX: 'M' | 'F' = 'M';

/** ตรวจสอบว่า order ไม่ซ้ำกัน (run once ตอน init) */
function validateSuitData(): void {
  const orders = SUIT_DATA.map((s) => s.order);
  const uniqueOrders = new Set(orders);
  if (uniqueOrders.size !== orders.length) {
    console.warn('⚠️ Duplicate suit orders detected:', SUIT_DATA);
  }
  
  // ตรวจสอบ path ไม่ซ้ำ
  const paths = SUIT_DATA.map((s) => s.path);
  const uniquePaths = new Set(paths);
  if (uniquePaths.size !== paths.length) {
    console.warn('⚠️ Duplicate suit paths detected:', SUIT_DATA);
  }
}

validateSuitData();

/** ดึงเสื้อสูทตามเพศ */
export function getSuitsBySex(sex: 'M' | 'F'): readonly SuitConfig[] {
  return SUIT_DATA.filter((s) => s.sex === sex);
}

/** ดึง index แรกของเสื้อสูทตามเพศ */
export function getFirstSuitIndex(sex: 'M' | 'F'): number {
  return SUIT_DATA.findIndex((s) => s.sex === sex);
}
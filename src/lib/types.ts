// src/lib/types.ts
export interface SuitConfig {
  path: string;
  order: number;
  sex: 'M' | 'F';
  anchorY: number;
  scaleFactor: number;
  xOffset: number;
  yOffset: number;
  stretchX: number;
  stretchY: number;
}

export interface Landmark {
  x: number;
  y: number;
  z: number;
  visibility?: number;
}

export interface PoseResult {
  landmarks: Landmark[][];
}

export interface SuitRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type HUDPage = 'basic' | 'tuning';

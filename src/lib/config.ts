// src/lib/config.ts
import type { SuitConfig } from './types';

export const SUIT_DATA: SuitConfig[] = [
  {
    path: '/assets/male_suit_1.png',
    order: 1, sex: 'M',
    anchorY: 0.28, scaleFactor: 1.5,
    xOffset: 5, yOffset: 0,
    stretchX: 1.0, stretchY: 1.0,
  },
  {
    path: '/assets/male_suit_2.png',
    order: 2, sex: 'M',
    anchorY: 0.30, scaleFactor: 1.5,
    xOffset: 5, yOffset: 0,
    stretchX: 1.0, stretchY: 1.0,
  },
  {
    path: '/assets/female_suit_1.png',
    order: 1, sex: 'F',
    anchorY: 0.12, scaleFactor: 1.6,
    xOffset: 0, yOffset: 0,
    stretchX: 1.0, stretchY: 1.0,
  },
  {
    path: '/assets/female_suit_2.png',
    order: 2, sex: 'F',
    anchorY: 0.10, scaleFactor: 1.7,
    xOffset: 0, yOffset: 0,
    stretchX: 1.0, stretchY: 1.0,
  },
];

export const DEFAULT_SEX: 'M' | 'F' = 'M';

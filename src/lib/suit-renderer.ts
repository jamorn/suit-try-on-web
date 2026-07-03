import type { Landmark, SuitConfig, SuitRect } from './types';

const LEFT_SHOULDER = 11;
const RIGHT_SHOULDER = 12;

export function calculateSuitRect(
  landmarks: Landmark[],
  canvasWidth: number,
  canvasHeight: number,
  config: SuitConfig,
  suitImage: HTMLImageElement
): SuitRect {
  const leftShld = landmarks[LEFT_SHOULDER];
  const rightShld = landmarks[RIGHT_SHOULDER];

  const baseWidth = Math.abs(leftShld.x - rightShld.x) * canvasWidth * config.scaleFactor;
  const aspect = suitImage.naturalHeight / suitImage.naturalWidth;

  const suitWidth = Math.max(1, baseWidth * config.stretchX);
  const suitHeight = Math.max(1, baseWidth * aspect * config.stretchY);

  const shoulderCenterX = ((leftShld.x + rightShld.x) / 2) * canvasWidth + config.xOffset;
  const shoulderCenterY = ((leftShld.y + rightShld.y) / 2) * canvasHeight;

  const topEdge = shoulderCenterY - suitHeight * config.anchorY + config.yOffset;
  const centerY = topEdge + suitHeight / 2;

  return { x: shoulderCenterX, y: centerY, width: suitWidth, height: suitHeight };
}

export function drawSuit(
  ctx: CanvasRenderingContext2D,
  suitImage: HTMLImageElement,
  rect: SuitRect
): void {
  ctx.drawImage(
    suitImage,
    rect.x - rect.width / 2,
    rect.y - rect.height / 2,
    rect.width,
    rect.height
  );
}

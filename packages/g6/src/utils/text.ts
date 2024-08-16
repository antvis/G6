import { AABB } from '@antv/g';
import type { Point } from '../types';
import { distance } from './vector';

/**
 * Get WordWrapWidth for a text according the the length of the label and 'maxWidth'.
 * @param length  - length
 * @param maxWidth - maxWidth
 * @returns wordWrapWidth
 */
export function getWordWrapWidthWithBase(length: number, maxWidth: string | number): number {
  let wordWrapWidth = 2 * length;
  if (typeof maxWidth === 'string') {
    wordWrapWidth = (length * Number(maxWidth.replace('%', ''))) / 100;
  } else if (typeof maxWidth === 'number') {
    wordWrapWidth = maxWidth;
  }
  if (isNaN(wordWrapWidth)) wordWrapWidth = 2 * length;
  return wordWrapWidth;
}

/**
 * Get the proper wordWrapWidth for a labelShape according the the 'maxWidth' of keyShape.
 * @param keyShapeBox - keyShapeBox
 * @param maxWidth - maxWidth
 * @param zoom - zoom
 * @param enableBalanceShape - enableBalanceShape
 * @returns Get WordWrapWidth by bbox
 */
export function getWordWrapWidthByBox(
  keyShapeBox: AABB,
  maxWidth: string | number,
  zoom = 1,
  enableBalanceShape = false,
): number {
  const balanceZoom = enableBalanceShape ? zoom : 1;
  const keyShapeWidth = (keyShapeBox.max[0] - keyShapeBox.min[0]) * balanceZoom;
  return getWordWrapWidthWithBase(keyShapeWidth, maxWidth);
}

/**
 * Get the proper wordWrapWidth for a labelShape according the the distance between two end points and 'maxWidth'.
 * @param points - points
 * @param maxWidth - maxWidth
 * @param zoom - zoom
 * @returns - wordWrapWidth for text
 */
export function getWordWrapWidthByEnds(points: [Point, Point], maxWidth: string | number, zoom = 1): number {
  const dist = distance(points[0], points[1]) * zoom;
  return getWordWrapWidthWithBase(dist, maxWidth);
}

import { AABB } from '@antv/g';
import { getEuclideanDistance } from '@antv/layout';
import { Point } from 'types/common';

/**
 * Get the proper wordWrapWidth for a labelShape according the the 'maxWidth' of keyShape.
 * @param keyShapeBox
 * @param maxWidth
 * @param zoom
 * @returns
 */
export const getWordWrapWidthByBox = (
  keyShapeBox: AABB,
  maxWidth: string | number,
  zoom: number = 1,
) => {
  const keyShapeWidth = (keyShapeBox.max[0] - keyShapeBox.min[0]) * zoom;
  const wordWrapWidth = 2 * keyShapeWidth;
  return getWordWrapWidthWithBase(wordWrapWidth, maxWidth);
};

/**
 * Get the proper wordWrapWidth for a labelShape according the the distance between two end points and 'maxWidth'.
 * @param points
 * @param maxWidth
 * @param zoom
 * @returns
 */
export const getWordWrapWidthByEnds = (
  points: Point[],
  maxWidth: string | number,
  zoom: number = 1,
) => {
  const dist = getEuclideanDistance(points[0], points[1]) * zoom;
  return getWordWrapWidthWithBase(dist, maxWidth);
};

const getWordWrapWidthWithBase = (
  length: number,
  maxWidth: string | number,
) => {
  let wordWrapWidth = 2 * length;
  if (typeof maxWidth === 'string') {
    wordWrapWidth = (length * Number(maxWidth.replace('%', ''))) / 100;
  } else if (typeof maxWidth === 'number') {
    wordWrapWidth = maxWidth;
  }
  if (isNaN(wordWrapWidth)) wordWrapWidth = 2 * length;
  return wordWrapWidth;
};

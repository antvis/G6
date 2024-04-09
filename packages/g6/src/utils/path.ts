import type { PathArray } from '@antv/util';
import type { Points } from '../types';

/**
 * <zh/> points 转化为 path 路径
 *
 * <en/> points transfrom path.
 * @param points Point[]
 * @param isClose boolean
 * @returns path string[][]
 */
export function pointsToPath(points: Points, isClose = true): PathArray {
  const path = [];

  points.forEach((point, index) => {
    path.push([index === 0 ? 'M' : 'L', ...point]);
  });

  if (isClose) {
    path.push(['Z']);
  }
  return path as PathArray;
}

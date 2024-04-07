import type { PathArray } from '@antv/util';
import type { Point } from '../../types';

/**
 * Generate smooth closed curves.
 * @param points points of the curves.
 */
export const getClosedSpline = (points: Point[]): PathArray => {
  if (points.length < 2) {
    throw new Error(`point length must larges than 2, now it's ${points.length}`);
  }
  const first = points[0];
  const second = points[1];
  const last = points[points.length - 1];
  const lastSecond = points[points.length - 2];

  points.unshift(last);
  points.unshift(lastSecond);
  points.push(first);
  points.push(second);

  const closedPath = [['M', last[0], last[1]]];
  for (let i = 1; i < points.length - 2; i += 1) {
    const [x0, y0] = points[i - 1];
    const [x1, y1] = points[i];
    const [x2, y2] = points[i + 1];
    const [x3, y3] = i !== points.length - 2 ? points[i + 2] : [x2, y2];

    const cp1x = x1 + (x2 - x0) / 6;
    const cp1y = y1 + (y2 - y0) / 6;
    const cp2x = x2 - (x3 - x1) / 6;
    const cp2y = y2 - (y3 - y1) / 6;
    closedPath.push(['C', cp1x, cp1y, cp2x, cp2y, x2, y2]);
  }

  return closedPath as PathArray;
};

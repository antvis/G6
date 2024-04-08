import type { AABB, TextStyleProps } from '@antv/g';
import { isEqual, type PathArray } from '@antv/util';
import type { Point } from '../../types';
import { pathToPoints } from '../../utils/path';
import { findNearestLine, findNearestPointOnLine } from '../../utils/point';
import { getXYByPlacement } from '../../utils/position';
import { HullStyleProps } from './shape';

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

/**
 * <zh/> 计算文本位置样式
 *
 * <en/> Calculate text position style
 * @param type - <zh/> Hull 类型 | <en/> hull type
 * @param contourBounds - <zh/> 外包围盒 | <en/> contour bounds
 * @param placement - <zh/> 位置 | <en/> placement
 * @param offsetX - <zh/> x轴偏移 | <en/> x-axis offset
 * @param offsetY - <zh/> y轴偏移 | <en/> y-axis offset
 * @param closeToContour - <zh/> 标签位置是否贴合轮廓 | <en/> whether the label position is close to the contour
 * @param contourPath - <zh/> 路径 | <en/> path
 * @param autoRotate - <zh/> 是否跟随轮廓旋转 | <en/> whether to rotate with the contour
 * @returns <zh/> 文本样式 | <en/> text style
 */
export function getHullTextStyleByPlacement(
  contourBounds: AABB,
  placement: HullStyleProps['labelPlacement'],
  offsetX: number,
  offsetY: number,
  closeToContour: boolean,
  contourPath: PathArray | string,
  autoRotate: boolean,
) {
  const [x, y] = getXYByPlacement(contourBounds, placement);
  const style: Partial<TextStyleProps> = {
    x,
    y,
    textAlign: placement === 'left' ? 'right' : placement === 'right' ? 'left' : 'center',
    textBaseline: placement === 'top' ? 'bottom' : placement === 'bottom' ? 'top' : 'middle',
    transform: 'none',
  };
  if (placement === 'center' || !closeToContour) return style;

  const points = pathToPoints(contourPath);

  const lines = points
    .map((point, index) => {
      const p1 = point;
      const p2 = points[(index + 1) % points.length];
      if (isEqual(p1, p2)) return null;
      return [p1, p2];
    })
    .filter(Boolean) as [Point, Point][];
  const line = findNearestLine([x, y], lines);
  const intersection = findNearestPointOnLine([x, y], line);

  if (intersection && line) {
    style.x = intersection[0];
    style.y = intersection[1];
    if (autoRotate) {
      const angle = Math.atan((line[0][1] - line[1][1]) / (line[0][0] - line[1][0]));
      style.transform = `rotate(${(angle / Math.PI) * 180}deg)`;
      style.textAlign = 'center';
      if (placement === 'right' || placement === 'left') {
        if (angle > 0) {
          style.textBaseline = placement === 'right' ? 'bottom' : 'top';
        } else {
          style.textBaseline = placement === 'right' ? 'top' : 'bottom';
        }
      }
    }
  }
  (style.x as number) += offsetX;
  (style.y as number) += offsetY;
  return style;
}

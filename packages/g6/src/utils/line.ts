import type { Point } from '../types';
import { isBetween } from './math';
import { cross, subtract } from './vector';

export type LineSegment = [Point, Point];

/**
 * <zh/> 判断两条线段是否平行
 *
 * <en/> Judge whether two line segments are parallel
 * @param l1 - <zh/> 第一条线段 | <en/> the first line segment
 * @param l2 - <zh/> 第二条线段 | <en/> the second line segment
 * @returns <zh/> 是否平行 | <en/> whether parallel or not
 */
export function isLinesParallel(l1: LineSegment, l2: LineSegment): boolean {
  const [p1, p2] = l1;
  const [p3, p4] = l2;
  const v1 = subtract(p1, p2);
  const v2 = subtract(p3, p4);
  return cross(v1, v2).every((v) => v === 0);
}

/**
 * <zh/> 获取两条线段的交点
 *
 * <en/> Get the intersection of two line segments
 * @param l1 - <zh/> 第一条线段 | <en/> the first line segment
 * @param l2 - <zh/> 第二条线段 | <en/> the second line segment
 * @param extended - <zh/> 是否包含延长线上的交点 | <en/> whether to include the intersection on the extension line
 * @returns <zh/> 交点 | <en/> intersection
 */
export function getLinesIntersection(l1: LineSegment, l2: LineSegment, extended = false): Point | undefined {
  if (isLinesParallel(l1, l2)) return undefined;

  const [p1, p2] = l1;
  const [p3, p4] = l2;

  const t =
    ((p1[0] - p3[0]) * (p3[1] - p4[1]) - (p1[1] - p3[1]) * (p3[0] - p4[0])) /
    ((p1[0] - p2[0]) * (p3[1] - p4[1]) - (p1[1] - p2[1]) * (p3[0] - p4[0]));

  const u =
    p4[0] - p3[0]
      ? (p1[0] - p3[0] + t * (p2[0] - p1[0])) / (p4[0] - p3[0])
      : (p1[1] - p3[1] + t * (p2[1] - p1[1])) / (p4[1] - p3[1]);

  if (!extended && (!isBetween(t, 0, 1) || !isBetween(u, 0, 1))) return undefined;

  return [p1[0] + t * (p2[0] - p1[0]), p1[1] + t * (p2[1] - p1[1])];
}

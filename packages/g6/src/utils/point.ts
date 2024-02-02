import type { Point as IPoint } from '@antv/util';
import type { Point } from '../types';
import { isVector2, isVector3 } from './is';
import { crossVec2, crossVec3, subtract } from './vector';

/**
 * <zh/> 判断两个点是否在同一水平线上
 *
 * <en/> whether two points are on the same horizontal line
 * @param p1 - <zh/> 第一个点 | <en/> the first point
 * @param p2 - <zh/> 第二个点 | <en/> the second point
 * @returns <zh/> 返回两个点是否在同一水平线上 | <en/> is horizontal or not
 */
export function isHorizontal(p1: Point, p2: Point): boolean {
  return p1[1] === p2[1];
}

/**
 * <zh/> 判断两个点是否在同一垂直线上
 *
 * <en/> whether two points are on the same vertical line
 * @param p1 - <zh/> 第一个点 | <en/> the first point
 * @param p2 - <zh/> 第二个点 | <en/> the second point
 * @returns <zh/> 返回两个点是否在同一垂直线上 | <en/> is vertical or not
 */
export function isVertical(p1: Point, p2: Point): boolean {
  return p1[0] === p2[0];
}

/**
 * <zh/> 判断是否三点共线
 *
 * <en/> Judge whether three points are collinear
 * @param p1 - <zh/> 第一个点 | <en/> the first point
 * @param p2 - <zh/> 第二个点 | <en/> the second point
 * @param p3 - <zh/> 第三个点 | <en/> the third point
 * @returns <zh/> 是否三点共线 | <en/> whether three points are collinear
 */
export function isCollinear(p1: Point, p2: Point, p3: Point): boolean {
  const v1 = subtract(p1, p2);
  const v2 = subtract(p3, p2);
  if (isVector2(v1) && isVector2(v2)) {
    return crossVec2(v1, v2) === 0;
  } else if (isVector3(v1) && isVector3(v2)) {
    return crossVec3(v1, v2).every((v) => v === 0);
  }
  return false;
}

/**
 * <zh/> 将点对象转换为向量
 * <en/> Convert a point object to a vector
 * @param point - <zh/> 点对象 | <en/> point object
 * @returns <zh/> 向量 | <en/> vector
 */
export function parsePoint(point: IPoint): Point {
  return [point.x, point.y];
}

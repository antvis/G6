import type { AABB } from '@antv/g';
import type { Point as IPoint } from '@antv/util';
import type { Point } from '../types';
import { getBBoxWidth } from './bbox';
import { getXYByPosition } from './element';
import { isBetween } from './math';
import { add, angle, cross, distance, exactEquals, subtract } from './vector';

/**
 * <zh/> 将点对象转换为向量
 * <en/> Convert a point object to a vector
 * @param point - <zh/> 点对象 | <en/> point object
 * @returns <zh/> 向量 | <en/> vector
 */
export function parsePoint(point: IPoint): Point {
  return [point.x, point.y];
}

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
  return isLinesParallel(p1, p2, p2, p3);
}

/**
 * <zh/> 判断两个点是否相同
 *
 * <en/> Judge whether two points are the same
 * @param p1 - <zh/> 第一个点 | <en/> the first point
 * @param p2 - <zh/> 第二个点 | <en/> the second point
 * @returns <zh/> 是否相同 | <en/> whether the same or not
 */
export function isSamePoint(p1: Point, p2: Point): boolean {
  return exactEquals(p1, p2);
}

/**
 * <zh/> 判断两条线段是否平行
 *
 * <en/> Judge whether two line segments are parallel
 * @param p1 - <zh/> 第一条线段的起点 | <en/> the start point of the first line segment
 * @param p2 - <zh/> 第一条线段的终点 | <en/> the end point of the first line segment
 * @param p3 - <zh/> 第二条线段的起点 | <en/> the start point of the second line segment
 * @param p4 - <zh/> 第二条线段的终点 | <en/> the end point of the second line segment
 * @returns <zh/> 是否平行 | <en/> whether parallel or not
 */
export function isLinesParallel(p1: Point, p2: Point, p3: Point, p4: Point): boolean {
  const v1 = subtract(p1, p2);
  const v2 = subtract(p3, p4);
  return cross(v1, v2).every((v) => v === 0);
}

/**
 * <zh/> 获取两条线段的交点
 *
 * <en/> Get the intersection of two line segments
 * @param p1 - <zh/> 第一条线段的起点 | <en/> the start point of the first line segment
 * @param p2 - <zh/> 第一条线段的终点 | <en/> the end point of the first line segment
 * @param p3 - <zh/> 第二条线段的起点 | <en/> the start point of the second line segment
 * @param p4 - <zh/> 第二条线段的终点 | <en/> the end point of the second line segment
 * @returns <zh/> 交点 | <en/> intersection
 */
export function getLinesIntersection(p1: Point, p2: Point, p3: Point, p4: Point): Point | undefined {
  if (isLinesParallel(p1, p2, p3, p4)) return undefined;

  const t =
    ((p1[0] - p3[0]) * (p3[1] - p4[1]) - (p1[1] - p3[1]) * (p3[0] - p4[0])) /
    ((p1[0] - p2[0]) * (p3[1] - p4[1]) - (p1[1] - p2[1]) * (p3[0] - p4[0]));

  const u =
    p4[0] - p3[0]
      ? (p1[0] - p3[0] + t * (p2[0] - p1[0])) / (p4[0] - p3[0])
      : (p1[1] - p3[1] + t * (p2[1] - p1[1])) / (p4[1] - p3[1]);

  if (!isBetween(t, 0, 1) || !isBetween(u, 0, 1)) return undefined;

  return [p1[0] + t * (p2[0] - p1[0]), p1[1] + t * (p2[1] - p1[1])];
}

/**
 * <zh/> 获取从多边形中心到给定点的连线与多边形边缘的交点
 *
 * <en/> Gets the intersection point between the line from the center of a polygon to a given point and the polygon's edge
 * @param p - <zh/> 从多边形中心到多边形边缘的连线的外部点 | <en/> The point outside the polygon from which the line to the polygon's center is drawn
 * @param center - <zh/> 多边形中心 | <en/> the center of the polygon
 * @param points - <zh/> 多边形顶点 | <en/> the vertices of the polygon
 * @param isRelativePos - <zh/> 顶点坐标是否相对中心点 | <en/> whether the vertex coordinates are relative to the center point
 * @returns <zh/> 交点 | <en/> intersection
 */
export function getPolygonIntersectPoint(p: Point, center: Point, points: Point[], isRelativePos = true): Point {
  for (let i = 0; i < points.length; i++) {
    let start = points[i];
    let end = points[(i + 1) % points.length];

    if (isRelativePos) {
      start = add(center, start);
      end = add(center, end);
    }

    const intersect = getLinesIntersection(center, p, start, end);
    if (intersect) return intersect;
  }
  return center;
}

/**
 * <zh/> 获取从矩形中心到给定点的连线与矩形边缘的交点
 *
 * <en/> Gets the intersection point between the line from the center of a rectangle to a given point and the rectangle's edge
 * @param p - <zh/> 从矩形中心到矩形边缘的连线的外部点 | <en/> The point outside the rectangle from which the line to the rectangle's center is drawn
 * @param bbox - <zh/> 矩形包围盒 | <en/> the bounding box of the rectangle
 * @returns <zh/> 交点 | <en/> intersection
 */
export function getRectIntersectPoint(p: Point, bbox: AABB): Point {
  const center = getXYByPosition(bbox, 'center');
  const corners = [
    getXYByPosition(bbox, 'left-top'),
    getXYByPosition(bbox, 'right-top'),
    getXYByPosition(bbox, 'right-bottom'),
    getXYByPosition(bbox, 'left-bottom'),
  ];
  return getPolygonIntersectPoint(p, center, corners, false);
}

/**
 * <zh/> 获取从椭圆中心到给定点的连线与椭圆边缘的交点
 *
 * <en/> Gets the intersection point between the line from the center of an ellipse to a given point and the ellipse's edge
 * @param p - <zh/> 从椭圆中心到椭圆边缘的连线的外部点 | <en/> The point outside the ellipse from which the line to the ellipse's center is drawn
 * The point outside the ellipse from which the line to the ellipse's center is drawn.
 * @param bbox - <zh/> 椭圆包围盒 | <en/> the bounding box of the ellipse
 * @returns <zh/> 交点 | <en/> intersection
 */
export function getEllipseIntersectPoint(p: Point, bbox: AABB): Point {
  const rx = getBBoxWidth(bbox) / 2;
  const ry = getBBoxWidth(bbox) / 2;
  const center = bbox.center;

  const vec = subtract(p, center);

  let radians = angle(vec, [1, 0, 0]);
  if (radians < 0) radians += Math.PI * 2;
  return [
    center[0] + Math.abs(rx * Math.cos(radians)) * Math.sign(vec[0]),
    center[1] + Math.abs(ry * Math.sin(radians)) * Math.sign(vec[1]),
  ];
}

/**
 * <zh/> 从两组点中找到距离最近的两个点
 * @param group1 - <zh/> 第一组点 | <en/> the first group of points
 * @param group2 - <zh/> 第二组点 | <en/> the second group of points
 * @returns <zh/> 距离最近的两个点 | <en/> the nearest two points
 */
export function findNearestPoints(group1: Point[], group2: Point[]): [Point, Point] {
  let minDistance = Infinity;
  let nearestPoints: [Point, Point] = [group1[0], group2[0]];
  group1.forEach((p1) => {
    group2.forEach((p2) => {
      const dist = distance(p1, p2);
      if (dist < minDistance) {
        minDistance = dist;
        nearestPoints = [p1, p2];
      }
    });
  });
  return nearestPoints;
}

import type { AABB, PointLike } from '@antv/g';
import type { Point } from '../types';
import { getBBoxHeight, getBBoxWidth } from './bbox';
import { isBetween } from './math';
import { getXYByPlacement } from './position';
import { add, cross, distance, normalize, subtract, toVector2 } from './vector';

/**
 * <zh/> 将对象坐标转换为数组坐标
 * <en/> Convert object coordinates to array coordinates
 * @param point - <zh/> 对象坐标 | <en/> object coordinates
 * @returns <zh/> 数组坐标 | <en/> array coordinates
 */
export function parsePoint(point: PointLike): Point {
  return [point.x, point.y];
}

/**
 * <zh/> 将数组坐标转换为对象坐标
 *
 * <en/> Convert array coordinates to object coordinates
 * @param point - <zh/> 数组坐标 | <en/> array coordinates
 * @returns <zh/> 对象坐标 | <en/> object coordinates
 */
export function toPointObject(point: Point): PointLike {
  return { x: point[0], y: point[1] };
}

/**
 * <zh/> 根据 X 轴坐标排序
 * <en/> Sort by X-axis coordinates
 * @param points - <zh/> 点集 | <en/> point set
 * @returns <zh/> 排序后的点集 | <en/> sorted point set
 */
export function sortByX(points: Point[]): Point[] {
  return points.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
}

/**
 * <zh/> 点集去重
 *
 * <en/> Deduplicate point set
 * @param points - <zh/> 点集 | <en/> pointset
 * @returns <zh/> 去重后的点集 | <en/> deduplicated pointset
 */
export function deduplicate(points: Point[]): Point[] {
  const set = new Set<string>();
  return points.filter((p) => {
    const key = p.join(',');
    if (set.has(key)) return false;
    set.add(key);
    return true;
  });
}

/**
 * <zh/> 对点格式化，精确到 `digits` 位的数字
 *
 * <en/> Round the point to the given precision
 * @param point - <zh/> 要舍入的点 | <en/> the point to round
 * @param digits - <zh/> 小数点后的位数 | <en/> the number of digits after the decimal point
 * @returns <zh/> 舍入后的点 | <en/> the rounded point
 */
export function round(point: Point, digits = 0): Point {
  return point.map((p) => parseFloat(p.toFixed(digits))) as Point;
}

/**
 * <zh/> 移动点，将点朝向参考点移动一定的距离
 *
 * <en/> Move `p` point along the line starting from `ref` to this point by a certain `distance`
 * @param p - <zh/> 要移动的点 | <en/> the point to move
 * @param ref - <zh/> 参考点 | <en/> the reference point
 * @param distance - <zh/> 移动的距离 | <en/> the distance to move
 * @param reverse
 * @returns <zh/> 移动后的点 | <en/> the moved point
 */
export function moveTo(p: Point, ref: Point, distance: number, reverse = false): Point {
  const direction = reverse ? subtract(p, ref) : subtract(ref, p);
  const normalizedDirection = normalize(direction);
  const moveVector: Point = [normalizedDirection[0] * distance, normalizedDirection[1] * distance];
  return add(toVector2(p), moveVector);
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
 * <zh/> 判断两个点是否正交，即是否在同一水平线或垂直线上
 *
 * <en/> Judges whether two points are orthogonal, that is, whether they are on the same horizontal or vertical line
 * @param p1 - <zh/> 第一个点 | <en/> the first point
 * @param p2 - <zh/> 第二个点 | <en/> the second point
 * @returns <zh/> 是否正交 | <en/> whether orthogonal or not
 */
export function isOrthogonal(p1: Point, p2: Point): boolean {
  return isHorizontal(p1, p2) || isVertical(p1, p2);
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
  return isLinesParallel([p1, p2], [p2, p3]);
}

/**
 * <zh/> 判断两条线段是否平行
 *
 * <en/> Judge whether two line segments are parallel
 * @param l1 - <zh/> 第一条线段 | <en/> the first line segment
 * @param l2 - <zh/> 第二条线段 | <en/> the second line segment
 * @returns <zh/> 是否平行 | <en/> whether parallel or not
 */
export function isLinesParallel(l1: [Point, Point], l2: [Point, Point]): boolean {
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
export function getLinesIntersection(l1: [Point, Point], l2: [Point, Point], extended = false): Point | undefined {
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

    const intersect = getLinesIntersection([center, p], [start, end]);
    if (intersect) return intersect;
  }
  return center;
}

/**
 * <en/> Whether point is inside the polygon (ray algo)
 * @param point
 * @param polygon
 * @param points
 */
export function isPointInPolygon(point: Point, points: Point[]): boolean {
  const [x, y] = point;
  let isHit = false;
  const n = points.length;
  // 判断两个double在eps精度下的大小关系
  const tolerance = 1e-6;
  /**
   *
   * @param xValue
   */
  function dcmp(xValue) {
    if (Math.abs(xValue) < tolerance) {
      return 0;
    }
    return xValue < 0 ? -1 : 1;
  }
  if (n <= 2) {
    // svg 中点小于 3 个时，不显示，也无法被拾取
    return false;
  }
  for (let i = 0; i < n; i++) {
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    if (isCollinear(p1, p2, point)) {
      // 点在多边形一条边上
      return true;
    }
    // 前一个判断min(p1[1],p2[1])<P.y<=max(p1[1],p2[1])
    // 后一个判断被测点 在 射线与边交点 的左边
    if (
      dcmp(p1[1] - y) > 0 !== dcmp(p2[1] - y) > 0 &&
      dcmp(x - ((y - p1[1]) * (p1[0] - p2[0])) / (p1[1] - p2[1]) - p1[0]) < 0
    ) {
      isHit = !isHit;
    }
  }
  return isHit;
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
  const center = getXYByPlacement(bbox, 'center');
  const corners = [
    getXYByPlacement(bbox, 'left-top'),
    getXYByPlacement(bbox, 'right-top'),
    getXYByPlacement(bbox, 'right-bottom'),
    getXYByPlacement(bbox, 'left-bottom'),
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
  const center = bbox.center;
  const vec = subtract(p, bbox.center);
  const angle = Math.atan2(vec[1], vec[0]);
  if (isNaN(angle)) return center;

  const rx = getBBoxWidth(bbox) / 2;
  const ry = getBBoxHeight(bbox) / 2;
  const intersectX = center[0] + rx * Math.cos(angle);
  const intersectY = center[1] + ry * Math.sin(angle);

  return [intersectX, intersectY];
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

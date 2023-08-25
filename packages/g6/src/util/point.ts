import { Point } from '../types/common';
import { isBetween } from './math';

/**
 * Find the nearest on in points to the curPoint.
 * @param points
 * @param curPoint
 * @returns
 */
export const getNearestPoint = (
  points: Point[],
  curPoint: Point,
): {
  index: number;
  nearestPoint: Point;
} => {
  let index = 0;
  let nearestPoint = points[0];
  let minDistance = distance(points[0], curPoint);
  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    const dis = distance(point, curPoint);
    if (dis < minDistance) {
      nearestPoint = point;
      minDistance = dis;
      index = i;
    }
  }
  return {
    index,
    nearestPoint,
  };
};

/**
 * Get distance by two points.
 * @param p1 first point
 * @param p2 second point
 */
export const distance = (p1: Point, p2: Point): number => {
  const vx = p1.x - p2.x;
  const vy = p1.y - p2.y;
  return Math.sqrt(vx * vx + vy * vy);
};

/**
 * Get point and circle intersect point.
 * @param {ICircle} circle Circle's center x,y and radius r
 * @param {Point} point Point x,y
 * @return {Point} calculated intersect point
 */
export const getCircleIntersectByPoint = (
  circleProps: { x: number; y: number; r: number },
  point: Point,
): Point | null => {
  const { x: cx, y: cy, r } = circleProps;
  const { x, y } = point;

  const dx = x - cx;
  const dy = y - cy;
  if (dx * dx + dy * dy < r * r) {
    return null;
  }
  const angle = Math.atan(dy / dx);
  return {
    x: cx + Math.abs(r * Math.cos(angle)) * Math.sign(dx),
    y: cy + Math.abs(r * Math.sin(angle)) * Math.sign(dy),
  };
};

/**
 * Get point and ellipse inIntersect.
 * @param {Object} ellipse ellipse center x,y and radius rx,ry
 * @param {Object} point Point x,y
 * @return {object} calculated intersect point
 */
export const getEllipseIntersectByPoint = (
  ellipseProps: {
    rx: number;
    ry: number;
    x: number;
    y: number;
  },
  point: Point,
): Point => {
  const { rx: a, ry: b, x: cx, y: cy } = ellipseProps;

  const dx = point.x - cx;
  const dy = point.y - cy;
  // The angle will be in range [-PI, PI]
  let angle = Math.atan2(dy / b, dx / a);

  if (angle < 0) {
    // transfer to [0, 2*PI]
    angle += 2 * Math.PI;
  }

  return {
    x: cx + a * Math.cos(angle),
    y: cy + b * Math.sin(angle),
  };
};

/**
 * Point and rectangular intersection point.
 * @param  {IRect} rect  rect
 * @param  {Point} point point
 * @return {PointPoint} rst;
 */
export const getRectIntersectByPoint = (
  rectProps: { x: number; y: number; width: number; height: number },
  point: Point,
): Point | null => {
  const { x, y, width, height } = rectProps;
  const cx = x + width / 2;
  const cy = y + height / 2;
  const points: Point[] = [];
  const center: Point = {
    x: cx,
    y: cy,
  };
  points.push({
    x,
    y,
  });
  points.push({
    x: x + width,
    y,
  });
  points.push({
    x: x + width,
    y: y + height,
  });
  points.push({
    x,
    y: y + height,
  });
  points.push({
    x,
    y,
  });
  let rst: Point | null = null;
  for (let i = 1; i < points.length; i++) {
    rst = getLineIntersect(points[i - 1], points[i], center, point);
    if (rst) {
      break;
    }
  }
  return rst;
};

/**
 * Get the intersect point of two lines.
 * @param  {Point}  p0 The start point of the first line.
 * @param  {Point}  p1 The end point of the first line.
 * @param  {Point}  p2 The start point of the second line.
 * @param  {Point}  p3 The end point of the second line.
 * @return {Point}  Calculated intersect point.
 */
export const getLineIntersect = (
  p0: Point,
  p1: Point,
  p2: Point,
  p3: Point,
): Point | null => {
  const tolerance = 0.0001;

  const E: Point = {
    x: p2.x - p0.x,
    y: p2.y - p0.y,
  };
  const D0: Point = {
    x: p1.x - p0.x,
    y: p1.y - p0.y,
  };
  const D1: Point = {
    x: p3.x - p2.x,
    y: p3.y - p2.y,
  };
  const kross: number = D0.x * D1.y - D0.y * D1.x;
  const sqrKross: number = kross * kross;
  const invertKross: number = 1 / kross;
  const sqrLen0: number = D0.x * D0.x + D0.y * D0.y;
  const sqrLen1: number = D1.x * D1.x + D1.y * D1.y;
  if (sqrKross > tolerance * sqrLen0 * sqrLen1) {
    const s = (E.x * D1.y - E.y * D1.x) * invertKross;
    const t = (E.x * D0.y - E.y * D0.x) * invertKross;
    if (!isBetween(s, 0, 1) || !isBetween(t, 0, 1)) return null;
    return {
      x: p0.x + s * D0.x,
      y: p0.y + s * D0.y,
    };
  }
  return null;
};

/**
 * Determine if three points are bending (not lie on a straight line)
 * @param p0 the first 2d point
 * @param p1 the second 2d point
 * @param p2 the third 2d point
 * @returns
 */
export const isBending = (p0: Point, p1: Point, p2: Point): boolean =>
  !((p0.x === p1.x && p1.x === p2.x) || (p0.y === p1.y && p1.y === p2.y));

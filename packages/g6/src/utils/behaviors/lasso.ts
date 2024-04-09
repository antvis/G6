import { AABB } from '@antv/g';
import { isBetween } from '../math';

import type { ID } from '@antv/graphlib';
import type { Graph } from '../../runtime/graph';
import type { Point, Points } from '../../types';

/**
 * <zh/> 元素中心是否在 path 中
 *
 * <en/> Element center in path.
 * @param graph Graph
 * @param id ID
 * @param points Points
 * @returns boolean
 */
export const isBBoxIntersectPolygon = (graph: Graph, id: ID, points: Points) => {
  const bbox = graph.getElementRenderBounds(id);
  if (!bbox) return false;
  const shapePoints = [
    [bbox.min[0], bbox.min[1]],
    [bbox.max[0], bbox.min[1]],
    [bbox.max[0], bbox.max[1]],
    [bbox.min[0], bbox.max[1]],
  ] as Points;

  return isPolygonsIntersect(points, shapePoints);
};

/**
 * <zh/> 两个多边形是否存在相交.
 *
 * <en/> Whether two polygons intersect.
 * @param points1 Points
 * @param points2 Points
 * @returns boolean
 */
const isPolygonsIntersect = (points1: Points, points2: Points): boolean => {
  const getBBox = (points: Points): Partial<AABB> => {
    const xArr = points.map((p) => p[0]);
    const yArr = points.map((p) => p[1]);
    return {
      min: [Math.min.apply(null, xArr), Math.min.apply(null, yArr), 0],
      max: [Math.max.apply(null, xArr), Math.max.apply(null, yArr), 0],
    };
  };

  const parseToLines = (points: Points) => {
    const lines = [];
    const count = points.length;
    for (let i = 0; i < count - 1; i++) {
      const point = points[i];
      const next = points[i + 1];
      lines.push([point, next]);
    }
    if (lines.length > 1) {
      const first = points[0];
      const last = points[count - 1];
      lines.push([last, first]);
    }
    return lines;
  };

  // 空数组，或者一个点返回 false
  if (points1.length < 2 || points2.length < 2) {
    return false;
  }

  const bbox1 = getBBox(points1);
  const bbox2 = getBBox(points2);
  // 判定包围盒是否相交，比判定点是否在多边形内要快的多，可以筛选掉大多数情况
  if (!intersectBBox(bbox1, bbox2)) {
    return false;
  }

  let isIn = false;
  // 判定点是否在多边形内部，一旦有一个点在另一个多边形内，则返回
  points2.forEach((point) => {
    if (isPointInPolygon(points1, point)) {
      isIn = true;
      return false;
    }
  });
  if (isIn) {
    return true;
  }
  points1.forEach((point) => {
    if (isPointInPolygon(points2, point)) {
      isIn = true;
      return false;
    }
  });
  if (isIn) {
    return true;
  }

  const lines1 = parseToLines(points1);
  const lines2 = parseToLines(points2);
  let isIntersect = false;
  lines2.forEach((line) => {
    if (lineIntersectPolygon(lines1, line)) {
      isIntersect = true;
      return false;
    }
  });
  return isIntersect;
};

const intersectBBox = (box1: Partial<AABB>, box2: Partial<AABB>) => {
  if (!box2?.min || !box1?.min || !box2?.max || !box1?.max) return false;
  return (
    box2.min[0] <= box1.max[0] && box2.max[0] >= box1.min[0] && box2.min[1] <= box1.max[1] && box2.max[1] >= box1.min[1]
  );
};

/**
 * <zh/> 点是否在多边形内.
 *
 * <en/> Whether the point is inside the polygon.
 * @param points Points
 * @param point Point
 * @returns boolean
 */
const isPointInPolygon = (points: Points, point: Point): boolean => {
  let isHit = false;
  const n = points.length;
  const [x, y] = point;
  // 判断两个double在eps精度下的大小关系
  const tolerance = 1e-6;

  /**
   *
   * @param xValue
   */
  function dcmp(xValue: number) {
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
    if (onSegment(p1, p2, point)) {
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
};

const onSegment = (p1: Point, p2: Point, q: Point) => {
  if (
    (q[0] - p1[0]) * (p2[1] - p1[1]) === (p2[0] - p1[0]) * (q[1] - p1[1]) &&
    Math.min(p1[0], p2[0]) <= q[0] &&
    q[0] <= Math.max(p1[0], p2[0]) &&
    Math.min(p1[1], p2[1]) <= q[1] &&
    q[1] <= Math.max(p1[1], p2[1])
  ) {
    return true;
  }
  return false;
};

const lineIntersectPolygon = (lines: Points[], line: Points) => {
  let isIntersect = false;
  lines.forEach((l) => {
    if (getLinesIntersect(l, line)) {
      isIntersect = true;
      return false;
    }
  });
  return isIntersect;
};

/**
 * <zh/> 获取两线相交的点.
 *
 * <en/> Get lines Intersect point.
 * @param line1Points Points
 * @param line2Points Points
 * @returns Point
 */
export const getLinesIntersect = (line1Points: Points, line2Points: Points): Point | boolean => {
  const tolerance = 0.0001;

  const [p0, p1] = line1Points;
  const [p2, p3] = line2Points;

  const E: Point = [p2[0] - p0[0], p2[1] - p0[1]];

  const D0: Point = [p1[0] - p0[0], p1[1] - p0[1]];

  const D1: Point = [p3[0] - p2[0], p3[1] - p2[1]];

  const kross: number = D0[0] * D1[1] - D0[1] * D1[0];
  const sqrKross: number = kross * kross;
  const invertKross: number = 1 / kross;
  const sqrLen0: number = D0[0] * D0[0] + D0[1] * D0[1];
  const sqrLen1: number = D1[0] * D1[0] + D1[1] * D1[1];
  if (sqrKross > tolerance * sqrLen0 * sqrLen1) {
    const s = (E[0] * D1[1] - E[1] * D1[0]) * invertKross;
    const t = (E[0] * D0[1] - E[1] * D0[0]) * invertKross;
    if (!isBetween(s, 0, 1) || !isBetween(t, 0, 1)) return false;
    return [p0[0] + s * D0[0], p0[1] + s * D0[1]];
  }
  return false;
};

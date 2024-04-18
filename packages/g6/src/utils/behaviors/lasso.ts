import { AABB } from '@antv/g';
import { getLinesIntersection } from '../line';
import { isPointInPolygon } from '../point';

import type { Graph } from '../../runtime/graph';
import type { ID, Points } from '../../types';
import type { LineSegment } from '../line';

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
    if (isPointInPolygon(point, points1)) {
      isIn = true;
      return false;
    }
  });
  if (isIn) {
    return true;
  }
  points1.forEach((point) => {
    if (isPointInPolygon(point, points2)) {
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

const lineIntersectPolygon = (lines: Points[], line: Points) => {
  let isIntersect = false;
  lines.forEach((l) => {
    if (l.length > 1 && line.length > 1 && getLinesIntersection(l as LineSegment, line as LineSegment)) {
      isIntersect = true;
      return false;
    }
  });
  return isIntersect;
};

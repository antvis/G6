import type { Point } from '../../../types';
import type { BBox, FormatTuple } from './format';
import { formatUtil } from './format';
import type { Grid } from './grid_handle';
import { grid } from './grid_handle';
import { monotoneConvexHull2D as convexHull } from './monotone-convex-hull-2d';
import { segmentsIntersect as intersect } from './robust-segment-intersect';

function _filterDuplicates(pointset: Point[]) {
  const unique = [pointset[0]];
  let lastPoint = pointset[0];
  for (let i = 1; i < pointset.length; i++) {
    const currentPoint = pointset[i];
    if (lastPoint[0] !== currentPoint[0] || lastPoint[1] !== currentPoint[1]) {
      unique.push(currentPoint);
    }
    lastPoint = currentPoint;
  }
  return unique;
}

function _sortByX(pointset: Point[]) {
  return pointset.sort(function (a, b) {
    return a[0] - b[0] || a[1] - b[1];
  });
}

function _sqLength(a: Point, b: Point) {
  return Math.pow(b[0] - a[0], 2) + Math.pow(b[1] - a[1], 2);
}

function _cos(o: Point, a: Point, b: Point) {
  const aShifted = [a[0] - o[0], a[1] - o[1]],
    bShifted = [b[0] - o[0], b[1] - o[1]],
    sqALen = _sqLength(o, a),
    sqBLen = _sqLength(o, b),
    dot = aShifted[0] * bShifted[0] + aShifted[1] * bShifted[1];

  return dot / Math.sqrt(sqALen * sqBLen);
}

function _intersect(segment: [Point, Point], pointset: Point[]) {
  for (let i = 0; i < pointset.length - 1; i++) {
    const seg = [pointset[i], pointset[i + 1]];
    if (
      (segment[0][0] === seg[0][0] && segment[0][1] === seg[0][1]) ||
      (segment[0][0] === seg[1][0] && segment[0][1] === seg[1][1])
    ) {
      continue;
    }
    if (intersect(segment[0], segment[1], seg[0], seg[1])) {
      return true;
    }
  }
  return false;
}

function _occupiedArea(pointset: Point[]) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (let i = pointset.length - 1; i >= 0; i--) {
    if (pointset[i][0] < minX) {
      minX = pointset[i][0];
    }
    if (pointset[i][1] < minY) {
      minY = pointset[i][1];
    }
    if (pointset[i][0] > maxX) {
      maxX = pointset[i][0];
    }
    if (pointset[i][1] > maxY) {
      maxY = pointset[i][1];
    }
  }

  return [
    maxX - minX, // width
    maxY - minY, // height
  ];
}

function _bBoxAround(edge: [Point, Point]): BBox {
  return [
    Math.min(edge[0][0], edge[1][0]), // left
    Math.min(edge[0][1], edge[1][1]), // top
    Math.max(edge[0][0], edge[1][0]), // right
    Math.max(edge[0][1], edge[1][1]), // bottom
  ];
}

function _midPoint(edge: [Point, Point], innerPoints: Point[], convex: Point[]) {
  let point = null,
    angle1Cos = MAX_CONCAVE_ANGLE_COS,
    angle2Cos = MAX_CONCAVE_ANGLE_COS,
    a1Cos,
    a2Cos;

  for (let i = 0; i < innerPoints.length; i++) {
    a1Cos = _cos(edge[0], edge[1], innerPoints[i]);
    a2Cos = _cos(edge[1], edge[0], innerPoints[i]);

    if (
      a1Cos > angle1Cos &&
      a2Cos > angle2Cos &&
      !_intersect([edge[0], innerPoints[i]], convex) &&
      !_intersect([edge[1], innerPoints[i]], convex)
    ) {
      angle1Cos = a1Cos;
      angle2Cos = a2Cos;
      point = innerPoints[i];
    }
  }

  return point;
}

function _concave(
  convex: Point[],
  maxSqEdgeLen: number,
  maxSearchArea: [number, number],
  grid: Grid,
  edgeSkipList: Set<string>,
) {
  let midPointInserted = false;

  for (let i = 0; i < convex.length - 1; i++) {
    const edge: [Point, Point] = [convex[i], convex[i + 1]];
    // generate a key in the format X0,Y0,X1,Y1
    const keyInSkipList = edge[0][0] + ',' + edge[0][1] + ',' + edge[1][0] + ',' + edge[1][1];

    if (_sqLength(edge[0], edge[1]) < maxSqEdgeLen || edgeSkipList.has(keyInSkipList)) {
      continue;
    }

    let scaleFactor = 0;
    let bBoxAround = _bBoxAround(edge);
    let bBoxWidth;
    let bBoxHeight;
    let midPoint;
    do {
      bBoxAround = grid.extendBbox(bBoxAround, scaleFactor);
      bBoxWidth = bBoxAround[2] - bBoxAround[0];
      bBoxHeight = bBoxAround[3] - bBoxAround[1];

      midPoint = _midPoint(edge, grid.rangePoints(bBoxAround), convex);
      scaleFactor++;
    } while (midPoint === null && (maxSearchArea[0] > bBoxWidth || maxSearchArea[1] > bBoxHeight));

    if (bBoxWidth >= maxSearchArea[0] && bBoxHeight >= maxSearchArea[1]) {
      edgeSkipList.add(keyInSkipList);
    }

    if (midPoint !== null) {
      convex.splice(i + 1, 0, midPoint);
      grid.removePoint(midPoint);
      midPointInserted = true;
    }
  }

  if (midPointInserted) {
    return _concave(convex, maxSqEdgeLen, maxSearchArea, grid, edgeSkipList);
  }

  return convex;
}

export function hull(pointset: Point[], concavity: number, format?: FormatTuple): Point[] {
  const maxEdgeLen = concavity || 20;

  const points = _filterDuplicates(_sortByX(formatUtil.toXy(pointset, format) as Point[]));

  if (points.length < 4) {
    const concave = points.concat([points[0]]);
    return (format ? formatUtil.fromXy(concave, format) : concave) as Point[];
  }

  const occupiedArea = _occupiedArea(points);
  const maxSearchArea: [number, number] = [
    occupiedArea[0] * MAX_SEARCH_BBOX_SIZE_PERCENT,
    occupiedArea[1] * MAX_SEARCH_BBOX_SIZE_PERCENT,
  ];

  const convex = convexHull(points)
    .reverse()
    .map((idx: number) => points[idx]); // ccw -> cw, indices -> points
  convex.push(convex[0]);

  const innerPoints = points.filter(function (pt) {
    return convex.indexOf(pt) < 0;
  });

  const cellSize = Math.ceil(1 / (points.length / (occupiedArea[0] * occupiedArea[1])));

  const concave = _concave(convex, Math.pow(maxEdgeLen, 2), maxSearchArea, grid(innerPoints, cellSize), new Set());

  return (format ? formatUtil.fromXy(concave, format) : concave) as Point[];
}

const MAX_CONCAVE_ANGLE_COS = Math.cos(90 / (180 / Math.PI)); // angle = 90 deg
const MAX_SEARCH_BBOX_SIZE_PERCENT = 0.6;

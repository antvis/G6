import { vec2 } from '@antv/matrix-util';
import { Bounds, Point } from '../../../types/common';
import { ID, IGraph } from 'types';
import { AABB } from '@antv/g';
import { getLineIntersect } from '../../../util/shape';

/**
 * Generate smooth closed curves.
 * @param points points of the curves.
 */
export const getClosedSpline = (points: Point[]) => {
  if (points.length < 2) {
    throw new Error(
      `point length must largn than 2, now it's ${points.length}`,
    );
  }
  const first = points[0];
  const second = points[1];
  const last = points[points.length - 1];
  const lastSecond = points[points.length - 2];

  points.unshift(last);
  points.unshift(lastSecond);
  points.push(first);
  points.push(second);

  const closedPath = [];
  for (let i = 1; i < points.length - 2; i += 1) {
    const x0 = points[i - 1].x;
    const y0 = points[i - 1].y;
    const x1 = points[i].x;
    const y1 = points[i].y;
    const x2 = points[i + 1].x;
    const y2 = points[i + 1].y;
    const x3 = i !== points.length - 2 ? points[i + 2].x : x2;
    const y3 = i !== points.length - 2 ? points[i + 2].y : y2;

    const cp1x = x1 + (x2 - x0) / 6;
    const cp1y = y1 + (y2 - y0) / 6;
    const cp2x = x2 - (x3 - x1) / 6;
    const cp2y = y2 - (y3 - y1) / 6;
    closedPath.push(['C', cp1x, cp1y, cp2x, cp2y, x2, y2]);
  }
  closedPath.unshift(['M', last.x, last.y]);
  return closedPath;
};

/**
 * The incoming node is used as the vertices of the polygon to generate a polygon with rounded corners.
 * @param polyPoints vertex points of the polygon.
 * @param padding Increase the blank space between the final outline and the original polygon on the basis of the original polygon.
 */
export function roundedHull(polyPoints: vec2[], padding: number) {
  // The rounded hull path around a single point
  const roundedHull1 = (points: vec2[]) => {
    const p1 = [points[0][0], points[0][1] - padding];
    const p2 = [points[0][0], points[0][1] + padding];

    return `M ${p1} A ${padding},${padding},0,0,0,${p2} A ${padding},${padding},0,0,0,${p1}`;
  };

  // The rounded hull path around two points
  const roundedHull2 = (points: vec2[]) => {
    const offsetVector = vec2.scale(
      [0, 0],
      unitNormal(points[0], points[1]),
      padding,
    );
    const invOffsetVector = vec2.scale([0, 0], offsetVector, -1);

    const p0 = vec2.add([0, 0], points[0], offsetVector);
    const p1 = vec2.add([0, 0], points[1], offsetVector);
    const p2 = vec2.add([0, 0], points[1], invOffsetVector);
    const p3 = vec2.add([0, 0], points[0], invOffsetVector);

    return `M ${p0} L ${p1} A ${[padding, padding, '0,0,0', p2].join(
      ',',
    )} L ${p3} A ${[padding, padding, '0,0,0', p0].join(',')}`;
  };

  // Special case handling: the number of nodes is less than or equal to 2
  if (!polyPoints || polyPoints.length < 1) return '';
  if (polyPoints.length === 1) return roundedHull1(polyPoints);
  if (polyPoints.length === 2) return roundedHull2(polyPoints);

  let segments = new Array(polyPoints.length);

  // Calculate each offset (outwards) segment of the convex hull.
  for (let segmentIndex = 0; segmentIndex < segments.length; ++segmentIndex) {
    const p0 =
      segmentIndex === 0
        ? polyPoints[polyPoints.length - 1]
        : polyPoints[segmentIndex - 1];
    const p1 = polyPoints[segmentIndex];

    // Compute the offset vector for the line segment, with length = padding.
    const offset = vec2.scale([0, 0], unitNormal(p0, p1), padding);

    segments[segmentIndex] = [
      vec2.add([0, 0], p0, offset),
      vec2.add([0, 0], p1, offset),
    ];
  }

  const arcData = `A ${[padding, padding, '0,0,0,'].join(',')}`;

  segments = segments.map((segment, index) => {
    let pathFragment = '';
    if (index === 0) {
      pathFragment = `M ${segments[segments.length - 1][1]} `;
    }
    pathFragment += `${arcData + segment[0]} L ${segment[1]}`;
    return pathFragment;
  });

  return segments.join(' ');
}

/**
 * The incoming nodes are used as polygon vertices to generate a smooth closed polygon
 * @param polyPoints vertex points of the polygon.
 * @param padding Increase the blank space between the final outline and the original polygon on the basis of the original polygon.
 */
export function paddedHull(polyPoints: vec2[], padding: number) {
  const pointCount = polyPoints.length;

  const smoothHull1 = (points) => {
    // Returns the path for a circular hull around a single point.

    const p1 = [points[0][0], points[0][1] - padding];
    const p2 = [points[0][0], points[0][1] + padding];

    return `M ${p1} A ${[padding, padding, '0,0,0', p2].join(',')} A ${[
      padding,
      padding,
      '0,0,0',
      p1,
    ].join(',')}`;
  };

  // Returns the path for a rounded hull around two points.
  const smoothHull2 = (points) => {
    const v = vecFrom(points[0], points[1]);
    const extensionVec = vecScaleTo(v, padding);

    const extension0 = vec2.add(
      [0, 0],
      points[0],
      vec2.scale([0, 0], extensionVec, -1),
    );
    const extension1 = vec2.add([0, 0], points[1], extensionVec);

    const tangentHalfLength = 1.2 * padding;
    const controlDelta = vecScaleTo(
      vec2.normalize([0, 0], v),
      tangentHalfLength,
    );
    const invControlDelta = vec2.scale([0, 0], controlDelta, -1);

    const control0 = vec2.add([0, 0], extension0, invControlDelta);
    const control1 = vec2.add([0, 0], extension1, invControlDelta);
    const control3 = vec2.add([0, 0], extension0, controlDelta);

    return `M ${extension0} C ${[control0, control1, extension1].join(
      ',',
    )} S ${[control3, extension0].join(',')} Z`;
  };

  // Handle special cases
  if (!polyPoints || pointCount < 1) return '';
  if (pointCount === 1) return smoothHull1(polyPoints);
  if (pointCount === 2) return smoothHull2(polyPoints);

  const hullPoints = polyPoints.map((point, index) => {
    const pNext = polyPoints[(index + 1) % pointCount];
    return {
      p: point,
      v: vec2.normalize([0, 0], vecFrom(point, pNext)),
    };
  });

  // Compute the expanded hull points, and the nearest prior control point for each.
  for (let i = 0; i < hullPoints.length; ++i) {
    const priorIndex = i > 0 ? i - 1 : pointCount - 1;
    const extensionVec = vec2.normalize(
      [0, 0],
      vec2.add(
        [0, 0],
        hullPoints[priorIndex].v,
        vec2.scale([0, 0], hullPoints[i].v, -1),
      ),
    );
    hullPoints[i].p = vec2.add(
      [0, 0],
      hullPoints[i].p as vec2,
      vec2.scale([0, 0], extensionVec, padding),
    );
  }

  return hullPoints.map((obj) => {
    const point = obj.p;
    return { x: point[0], y: point[1] };
  });
}

const unitNormal = (p0: vec2, p1: vec2): vec2 => {
  // Returns the unit normal to the line segment from p0 to p1.
  const n = [p0[1] - p1[1], p1[0] - p0[0]];
  const nLength = Math.sqrt(n[0] * n[0] + n[1] * n[1]);
  if (nLength === 0) {
    throw new Error('p0 should not be equal to p1');
  }
  return [n[0] / nLength, n[1] / nLength];
};

const vecFrom = (p0: vec2, p1: vec2): vec2 => {
  // Vector from p0 to p1
  return [p1[0] - p0[0], p1[1] - p0[1]] as vec2;
};

const vecScaleTo = (v: vec2, length: number) => {
  // Vector with direction of v with specified length
  return vec2.scale([0, 0], vec2.normalize([0, 0], v), length);
};

export const pointLineSquareDist = (point: Point, line: LineStructure) => {
  const x1 = line.x1;
  const y1 = line.y1;
  const x2 = line.x2 - x1;
  const y2 = line.y2 - y1;
  let px = point.x - x1;
  let py = point.y - y1;
  let dotprod = px * x2 + py * y2;
  let projlenSq;
  if (dotprod <= 0) {
    projlenSq = 0;
  } else {
    px = x2 - px;
    py = y2 - py;
    dotprod = px * x2 + py * y2;
    if (dotprod <= 0) {
      projlenSq = 0;
    } else {
      projlenSq = (dotprod * dotprod) / (x2 * x2 + y2 * y2);
    }
  }
  let lenSq = px * px + py * py - projlenSq;
  if (lenSq < 0) {
    lenSq = 0;
  }
  return lenSq;
};

export class LineStructure {
  public x1: number;

  public y1: number;

  public x2: number;

  public y2: number;

  constructor(x1: number, y1: number, x2: number, y2: number) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  public getBBox() {
    const minX = Math.min(this.x1, this.x2);
    const minY = Math.min(this.y1, this.y2);
    const maxX = Math.max(this.x1, this.x2);
    const maxY = Math.max(this.y1, this.y2);
    const res = {
      min: [minX, minY],
      max: [maxX, maxY],
      center: [(minX + maxX) / 2, (minY + maxY) / 2],
      halfExtents: [(maxX - minX) / 2, (maxY - minY) / 2],
    };
    return res as Bounds;
  }
}

export const getPointsCenter = (points: Point[]): Point => {
  let centerX = 0;
  let centerY = 0;
  if (points.length > 0) {
    for (const point of points) {
      centerX += point.x;
      centerY += point.y;
    }
    centerX /= points.length;
    centerY /= points.length;
  }
  return { x: centerX, y: centerY };
};

export const squareDist = (a: Point, b: Point): number => {
  return (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
};

export const fractionToLine = (
  graph: IGraph,
  itemId: ID,
  line: LineStructure,
) => {
  const directions = ['top', 'left', 'bottom', 'right'];
  const bbox = graph.getRenderBBox(itemId);
  if (!bbox) return Infinity;
  let minDistance = Number.POSITIVE_INFINITY;
  let countIntersections = 0;
  for (let i = 0; i < 4; i++) {
    const [x1, y1, x2, y2] = getBBoxBoundLine(bbox, directions[i]);
    let testDistance = fractionAlongLineA(
      line,
      new LineStructure(x1, y1, x2, y2),
    );
    testDistance = Math.abs(testDistance - 0.5);
    if (testDistance >= 0 && testDistance <= 1) {
      countIntersections += 1;
      minDistance = testDistance < minDistance ? testDistance : minDistance;
    }
  }

  if (countIntersections === 0) return -1;
  return minDistance;
};

export const getBBoxBoundLine = (bbox: AABB, direction: string) => {
  const bounds = {
    top: [bbox.min[0], bbox.min[1], bbox.max[0], bbox.min[1]],
    left: [bbox.min[0], bbox.min[1], bbox.min[0], bbox.max[1]],
    bottom: [bbox.min[0], bbox.max[1], bbox.max[0], bbox.max[1]],
    right: [bbox.max[0], bbox.min[1], bbox.max[0], bbox.max[1]],
  };
  return bounds[direction];
};

/**
 * When calculating the intersection of two line segments, the division ratio of the intersection point to the first line segment.
 */
const fractionAlongLineA = (la: LineStructure, lb: LineStructure) => {
  const uaT =
    (lb.x2 - lb.x1) * (la.y1 - lb.y1) - (lb.y2 - lb.y1) * (la.x1 - lb.x1);
  const ubT =
    (la.x2 - la.x1) * (la.y1 - lb.y1) - (la.y2 - la.y1) * (la.x1 - lb.x1);
  const uB =
    (lb.y2 - lb.y1) * (la.x2 - la.x1) - (lb.x2 - lb.x1) * (la.y2 - la.y1);
  if (uB) {
    const ua = uaT / uB;
    const ub = ubT / uB;
    if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
      return ua;
    }
  }
  return Number.POSITIVE_INFINITY;
};

export const isPointsOverlap = (p1, p2, e = 1e-3) => {
  return (p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2 < e ** 2;
};

export const itemIntersectByLine = (
  graph: IGraph,
  itemId: ID,
  line: LineStructure,
): [Point[], number] => {
  const directions = ['top', 'left', 'bottom', 'right'];
  const bbox = graph.getRenderBBox(itemId);
  if (!bbox) return;
  let countIntersections = 0;
  const intersections = [];

  for (let i = 0; i < 4; i++) {
    const [x1, y1, x2, y2] = getBBoxBoundLine(bbox, directions[i]);
    intersections[i] = getLineIntersect(
      { x: line.x1, y: line.y1 },
      { x: line.x2, y: line.y2 },
      { x: x1, y: y1 },
      { x: x2, y: y2 },
    );
    if (intersections[i]) {
      countIntersections += 1;
    }
  }
  return [intersections, countIntersections];
};

/**
 * The square of the distance from the point to the rectangle: the distance from the point inside the rectangle is 0, if the projection of the point outside falls on the side of the rectangle, it is the nearest vertical distance from the point to the side of the rectangle, otherwise it is the distance from the point to the vertex of the rectangle.
 * @param point Point
 * @param rect Rect
 */
export const pointRectSquareDist = (
  point: Point,
  rect: { width: number; height: number; x: number; y: number },
) => {
  const isLeft = point.x < rect.x;
  const isRight = point.x > rect.x + rect.width;
  const isTop = point.y > rect.y + rect.height;
  const isBottom = point.y < rect.y;

  const isPointOutside = isLeft || isRight || isTop || isBottom;
  if (!isPointOutside) {
    return 0;
  }
  if (isTop && !isLeft && !isRight) {
    return (rect.y + rect.height - point.y) ** 2;
  }
  if (isBottom && !isLeft && !isRight) {
    return (point.y - rect.y) ** 2;
  }
  if (isLeft && !isTop && !isBottom) {
    return (rect.x - point.x) ** 2;
  }
  if (isRight && !isTop && !isBottom) {
    return (rect.x + rect.width - point.x) ** 2;
  }
  const dx = Math.min(
    Math.abs(rect.x - point.x),
    Math.abs(rect.x + rect.width - point.x),
  );
  const dy = Math.min(
    Math.abs(rect.y - point.y),
    Math.abs(rect.y + rect.height - point.y),
  );
  return dx * dx + dy * dy;
};

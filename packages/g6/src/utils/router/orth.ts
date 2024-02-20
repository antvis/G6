import type { AABB } from '@antv/g';
import { difference, isEqual } from '@antv/util';
import type { Node, Padding, Point } from '../../types';
import {
  getBBoxHeight,
  getBBoxWidth,
  getExpandedBBox,
  getNearestPointToPoint,
  getPointBBox,
  isPointInBBox,
  isPointOutsideBBox,
  union,
} from '../bbox';
import { isPoint } from '../is';
import { isOrthogonal, moveTo, round } from '../point';
import { angle, distance, subtract, toVector3 } from '../vector';

export type Direction = 'N' | 'S' | 'W' | 'E' | null;

type Route = {
  points: Point[];
  direction: Direction;
};

/**
 *
 * @param node
 * @param padding
 */
export function getNodeBBox(node: Point | Node, padding?: Padding): AABB {
  const bbox = isPoint(node) ? getPointBBox(node) : node.getKey().getBounds();
  return padding ? getExpandedBBox(bbox, padding) : bbox;
}

/**
 * Returns a route with orthogonal line segments.
 * @param sourcePoint
 * @param targetPoint
 * @param sourceBBox
 * @param targetBBox
 * @param controlPoints
 * @param padding
 */
export function orth(
  sourcePoint: Point,
  targetPoint: Point,
  sourceBBox: AABB,
  targetBBox: AABB,
  controlPoints: Point[],
  padding: Padding,
) {
  const points: Point[] = [sourcePoint, ...controlPoints, targetPoint];

  // direction of previous route segment
  let direction: Direction = null;
  const result: Point[] = [];

  for (let fromIdx = 0, len = points.length; fromIdx < len - 1; fromIdx++) {
    const toIdx = fromIdx + 1;
    const from = points[fromIdx];
    const to = points[toIdx];
    const isOrth = isOrthogonal(from, to);

    let route = null;

    if (fromIdx === 0) {
      if (toIdx === len - 1) {
        // source -> target
        if (sourceBBox.intersects(targetBBox)) {
          route = insideNode(from, to, sourceBBox, targetBBox);
        } else if (!isOrth) {
          route = nodeToNode(from, to, sourceBBox, targetBBox);
        }
      } else {
        // source -> point
        if (isPointInBBox(to, sourceBBox)) {
          route = insideNode(from, to, sourceBBox, getNodeBBox(to, padding), direction);
        } else if (!isOrth) {
          route = nodeToPoint(from, to, sourceBBox);
        }
      }
    } else if (toIdx === len - 1) {
      // point -> target
      if (isPointInBBox(from, targetBBox)) {
        route = insideNode(from, to, getNodeBBox(from, padding), targetBBox, direction);
      } else if (!isOrth) {
        route = pointToNode(from, to, targetBBox, direction);
      }
    } else if (!isOrth) {
      // point -> point
      route = pointToPoint(from, to, direction);
    }

    // set direction for next iteration
    if (route) {
      result.push(...route.points);
      direction = route.direction;
    } else {
      // orthogonal route and not looped
      direction = getDirection(from, to);
    }

    if (toIdx < len - 1) result.push(to);
  }

  return result;
}

/**
 *  Direction to opposites direction map
 */
const opposites = {
  N: 'S',
  S: 'N',
  W: 'E',
  E: 'W',
};

/**
 * Direction to radians map
 */
const radians = {
  N: -Math.PI / 2,
  S: Math.PI / 2,
  E: 0,
  W: Math.PI,
};

/**
 *
 * @param from
 * @param to
 */
export function getDirection(from: Point, to: Point): Direction | null {
  const [fx, fy] = from;
  const [tx, ty] = to;
  if (fx === tx) {
    return fy > ty ? 'N' : 'S';
  }
  if (fy === ty) {
    return fx > tx ? 'W' : 'E';
  }
  return null;
}

/**
 *
 * @param bbox
 * @param direction
 */
export function getBBoxSize(bbox: AABB, direction: Direction): number {
  return direction === 'N' || direction === 'S' ? getBBoxHeight(bbox) : getBBoxWidth(bbox);
}

/**
 *
 * @param from
 * @param to
 * @param direction
 */
export function pointToPoint(from: Point, to: Point, direction: Direction): Route {
  const p1: Point = [from[0], to[1]];
  const p2: Point = [to[0], from[1]];
  const d1 = getDirection(from, p1);
  const d2 = getDirection(from, p2);
  const opposite = direction ? opposites[direction] : null;
  const p = d1 === direction || (d1 !== opposite && d2 !== direction) ? p1 : p2;

  return { points: [p], direction: getDirection(p, to) };
}

/**
 *
 * @param from
 * @param to
 * @param fromBBox
 */
export function nodeToPoint(from: Point, to: Point, fromBBox: AABB): Route {
  const p = freeJoin(from, to, fromBBox);

  return { points: [p], direction: getDirection(p, to) };
}

/**
 *
 * @param from
 * @param to
 * @param toBBox
 * @param direction
 */
export function pointToNode(from: Point, to: Point, toBBox: AABB, direction: Direction): Route {
  const points: Point[] = [
    [to[0], from[1]],
    [from[0], to[1]],
  ];
  const freePoints = points.filter((p) => isPointOutsideBBox(p, toBBox));
  const freeDirectionPoints = freePoints.filter((p) => getDirection(p, from) !== direction);

  if (freeDirectionPoints.length > 0) {
    // Pick a point which bears the same direction as the previous segment.
    const p = freeDirectionPoints.find((p) => getDirection(from, p) === direction) || freeDirectionPoints[0];
    return {
      points: [p],
      direction: getDirection(p, to),
    };
  } else {
    // Here we found only points which are either contained in the element or they would create
    // a link segment going in opposites direction from the previous one.
    // We take the point inside element and move it outside the element in the direction the
    // route is going. Now we can join this point with the current end (using freeJoin).
    const p = difference(points, freePoints)[0];
    const p2 = moveTo(to, p, -getBBoxSize(toBBox, direction) / 2);
    const p1 = freeJoin(p2, from, toBBox);
    return {
      points: [p1, p2],
      direction: getDirection(p2, to),
    };
  }
}

/**
 *
 * @param from
 * @param to
 * @param fromBBox
 * @param toBBox
 */
export function nodeToNode(from: Point, to: Point, fromBBox: AABB, toBBox: AABB): Route {
  let route = nodeToPoint(from, to, fromBBox);
  const p1 = toVector3(route.points[0]);

  if (isPointInBBox(p1, toBBox)) {
    route = nodeToPoint(to, from, toBBox);
    const p2 = toVector3(route.points[0]);

    if (isPointInBBox(p2, fromBBox)) {
      const fromBorder = moveTo(from, p2, -getBBoxSize(fromBBox, getDirection(from, p2)) / 2);
      const toBorder = moveTo(to, p1, -getBBoxSize(toBBox, getDirection(to, p1)) / 2);
      const midPoint: Point = [(fromBorder[0] + toBorder[0]) / 2, (fromBorder[1] + toBorder[1]) / 2];

      const startRoute = nodeToPoint(from, midPoint, fromBBox);
      const endRoute = pointToNode(midPoint, to, toBBox, startRoute.direction);

      route.points = [startRoute.points[0], endRoute.points[0]];
      route.direction = endRoute.direction;
    }
  }
  return route;
}

/**
 *
 * @param from
 * @param to
 * @param fromBBox
 * @param toBBox
 * @param direction
 */
export function insideNode(from: Point, to: Point, fromBBox: AABB, toBBox: AABB, direction?: Direction): Route {
  const DEFAULT_OFFSET = 0.01;
  const boundary = union(fromBBox, toBBox);
  const reversed = distance(to, boundary.center) > distance(from, boundary.center);
  const [start, end] = reversed ? [to, from] : [from, to];
  const halfPerimeter = getBBoxHeight(boundary) + getBBoxWidth(boundary);

  let p1: Point;
  if (direction) {
    const ref: Point = [
      start[0] + halfPerimeter * Math.cos(radians[direction]),
      start[1] + halfPerimeter * Math.sin(radians[direction]),
    ];
    // `getNearestPointToPoint` returns a point on the boundary, so we need to move it a bit to ensure it's outside the element and then get the correct `p2` via `freeJoin`.
    p1 = moveTo(getNearestPointToPoint(boundary, ref), ref, -DEFAULT_OFFSET);
  } else {
    p1 = moveTo(getNearestPointToPoint(boundary, start), start, DEFAULT_OFFSET);
  }

  let p2 = freeJoin(p1, end, boundary);

  let points = [p1, p2];

  if (isEqual(round(p1), round(p2))) {
    const rad = angle(subtract(p1, start), [1, 0, 0]) + Math.PI / 2;
    p2 = [end[0] + halfPerimeter * Math.cos(rad), end[1] + halfPerimeter * Math.sin(rad)];
    p2 = moveTo(getNearestPointToPoint(boundary, p2), end, DEFAULT_OFFSET);
    const p3 = freeJoin(p1, p2, boundary);
    points = [p1, p3, p2];
  }

  return {
    points: reversed ? points.reverse() : points,
    direction: reversed ? getDirection(p1, to) : getDirection(p2, to),
  };
}

/**
 * Returns a point `p` where lines p,p1 and p,p2 are perpendicular
 * and p is not contained in the given box
 * @param p1
 * @param p2
 * @param bbox
 */
function freeJoin(p1: Point, p2: Point, bbox: AABB): Point {
  let p: Point = [p1[0], p2[1]];
  if (isPointInBBox(p, bbox)) {
    p = [p2[0], p1[1]];
  }
  return p;
}

import { ComboModel, NodeModel } from 'types';
import { Point } from '../../../types/common';

/**
 * Use cross product to judge the direction of the turn.
 * Returns a positive value, if OAB makes a clockwise turn,
 * negative for counter-clockwise turn, and zero if the points are collinear.
 */
export const cross = (a: Point, b: Point, o: Point) => {
  return (a.y - o.y) * (b.x - o.x) - (a.x - o.x) * (b.y - o.y);
};

/**
 * Generate a convex hull of given points. Andrew's monotone chain algorithm.
 * @param points An array of [x, y] representing the coordinates of points.
 * @return a list of vertices of the convex hull in counter-clockwise order,
 */
export const genConvexHull = (models: (NodeModel | ComboModel)[]) => {
  const points: Point[] = models.map(
    (model) =>
      ({
        x: model.data.x,
        y: model.data.y,
      } as Point),
  );
  points.sort((a, b) => {
    return a.x === b.x ? a.y - b.y : a.x - b.x;
  });
  // remove duplicate points
  const pointMap = {};
  for (let i = points.length - 1; i >= 0; i--) {
    const { x, y } = points[i];
    if (pointMap[`${x}-${y}`]) points.splice(i, 1);
    pointMap[`${x}-${y}`] = true;
  }

  if (points.length === 1) {
    return points;
  }

  // build the lower hull
  const lower = [];
  for (let i = 0; i < points.length; i++) {
    while (
      lower.length >= 2 &&
      cross(lower[lower.length - 2], lower[lower.length - 1], points[i]) <= 0
    ) {
      lower.pop();
    }
    lower.push(points[i]);
  }

  // build the upper hull
  const upper = [];
  for (let i = points.length - 1; i >= 0; i--) {
    while (
      upper.length >= 2 &&
      cross(upper[upper.length - 2], upper[upper.length - 1], points[i]) <= 0
    ) {
      upper.pop();
    }
    upper.push(points[i]);
  }
  upper.pop();
  lower.pop();
  const strictHull = lower.concat(upper);
  return strictHull;
};

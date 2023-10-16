import { AABB, Canvas } from '@antv/g';
import { Point, PolyPoint } from 'types/common';

/**
 * Retrieve the width of a bounding box
 * @param bbox a bounding box
 * @returns width of bbox
 */
export const getBBoxWidth = (bbox: AABB) => bbox.max[0] - bbox.min[0];

/**
 * Retrieve the height of a bounding box
 * @param bbox a bounding box
 * @returns height of box
 */
export const getBBoxHeight = (bbox: AABB) => bbox.max[1] - bbox.min[1];

/**
 * Calculate the bounding box of point
 * @param point a 2d point
 * @returns the bounding box of the given point
 */
export const getBBoxFromPoint = (point: PolyPoint): AABB => {
  const { x, y } = point;
  const bbox = new AABB();
  bbox.setMinMax([x, y, 0], [x, y, 0]);
  return bbox;
};

/**
 * Calculate the bounding box for a list of 2d points
 * @param points a list of 2d points
 * @returns bbox encompassing all the given points
 */
export const getBBoxFromPoints = (points: PolyPoint[] = []): AABB => {
  const xs: number[] = [];
  const ys: number[] = [];
  points.forEach((p) => {
    xs.push(p.x);
    ys.push(p.y);
  });
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const bbox = new AABB();
  bbox.setMinMax([minX, minY, 0], [maxX, maxY, 0]);
  return bbox;
};

/**
 * Expand the given bounding box by a specified offset
 * @param bbox
 * @param offset
 * @returns
 */
export const getExpandedBBox = (bbox: AABB, offset: number): AABB => {
  const {
    max: [maxX, maxY],
    min: [minX, minY],
  } = bbox;
  const expandBBox = new AABB();
  if (getBBoxWidth(bbox) || getBBoxHeight(bbox)) {
    expandBBox.setMinMax(
      [minX - offset, minY - offset, 0],
      [maxX + offset, maxY + offset, 0],
    );
  }
  return expandBBox;
};

/**
 * Merge two bboxes into a single bbox that encompasses both
 * @param b1 the first bbox
 * @param b2 the second bbox
 * @returns a whole bbox
 */
export const mergeBBox = (b1: AABB, b2: AABB): AABB => {
  const minX = Math.min(b1.min[0], b2.min[0]);
  const minY = Math.min(b1.min[1], b2.min[1]);
  const maxX = Math.max(b1.max[0], b2.max[0]);
  const maxY = Math.max(b1.max[1], b2.max[1]);
  const bbox = new AABB();
  bbox.setMinMax([minX, minY, 0], [maxX, maxY, 0]);
  return bbox;
};

/**
 * Retrieve the four corners of a bounding box
 * @param bbox a bounding box
 * @returns a list containing four tuples representing the corners in anticlockwise order
 */
export const getBBoxPoints = (bbox: AABB): PolyPoint[] => {
  return [
    {
      x: bbox.min[0],
      y: bbox.min[1],
    },
    {
      x: bbox.max[0],
      y: bbox.min[1],
    },
    {
      x: bbox.max[0],
      y: bbox.max[1],
    },
    {
      x: bbox.min[0],
      y: bbox.max[1],
    },
  ];
};

/**
 * Determine if a given point is outside of the bounding box
 * @param point 2D point
 * @param bbox a bounding box
 * @returns True if the point is outside of box. False otherwise.
 */
export const isPointOutsideBBox = (point: PolyPoint, bbox: AABB): boolean => {
  const { x, y } = point;
  return (
    x < bbox.min[0] || x > bbox.max[0] || y < bbox.min[1] || y > bbox.max[1]
  );
};

/**
 * Retrieve two points where a vertical line at a specific x-coordinate intersects with a bbox
 * @param bbox a bounding box
 * @param x x-coord of the vertical line
 * @returns two intersection points or none
 */
export const getBBoxXCrossPoints = (bbox: AABB, x: number): PolyPoint[] => {
  if (x < bbox.min[0] || x > bbox.max[0]) {
    return [];
  }
  return [
    {
      x,
      y: bbox.min[1],
    },
    {
      x,
      y: bbox.max[1],
    },
  ];
};

/**
 * Retrieve two points where a horizontal line at a specific x-coordinate intersects with a bbox
 * @param bbox a bounding box
 * @param y y-coord of the horizontal line
 * @returns two intersection points or none
 */
export const getBBoxYCrossPoints = (bbox: AABB, y: number): PolyPoint[] => {
  if (y < bbox.min[1] || y > bbox.max[1]) {
    return [];
  }
  return [
    {
      x: bbox.min[0],
      y,
    },
    {
      x: bbox.max[0],
      y,
    },
  ];
};

/**
 * Retrieve points where the horizontal and vertical line passing through a specific 2d point intersects with a bbox
 * @param bbox a bounding box
 * @param point a 2d point
 * @returns intersection points
 */
export const getBBoxCrossPointsByPoint = (
  bbox: AABB,
  point: PolyPoint,
): PolyPoint[] =>
  getBBoxXCrossPoints(bbox, point.x).concat(getBBoxYCrossPoints(bbox, point.y));

/**
 * Determine whether the given point is a point in the horizontal direction
 * @param point a 2d point
 * @param bbox a bounding box
 * @returns 0 if the point is in the center; True if the point is closer to the horizontal axis; False otherwise.
 */
export const isHorizontalPoint = (
  point: PolyPoint,
  bbox: AABB,
): boolean | number => {
  const dx = Math.abs(point.x - bbox.center[0]);
  const dy = Math.abs(point.y - bbox.center[1]);
  if (dx === 0 && dy === 0) return 0;
  return dx / getBBoxWidth(bbox) > dy / getBBoxHeight(bbox);
};

/**
 * Retrieve the anchor point of bbox
 * @param bbox the expanded bbox of original node bbox by offset, and formatted by gridSize
 * @param point anchorPoint of position formatted by gridSize
 * @param anotherPoint anotherPoint
 * @returns the anchor point of bbox
 */
export const getExpandedBBoxPoint = (
  bbox: AABB,
  point: PolyPoint,
  anotherPoint: PolyPoint,
): PolyPoint => {
  const isHorizontal = isHorizontalPoint(point, bbox);
  if (isHorizontal === 0) {
    // Explain that the anchor point is the node center (linkCenter: true)
    // Determine the direction based on the relative relationship between the two points
    let x = bbox.center[0];
    let y = bbox.center[1];
    if (anotherPoint.y < point.y) {
      // If another point is at the top left/right of the point, goes up
      y = bbox.min[1];
    } else if (anotherPoint.x > point.x) {
      // If another point is at the bottom right, goes right
      x = bbox.max[0];
    } else if (anotherPoint.x < point.x) {
      // If another point is at the bottom left, the direction goes left
      x = bbox.min[0];
    } else if (anotherPoint.x === point.x) {
      // If another point is directly below the point, the direction goes down
      y = bbox.max[1];
    }
    return { x, y };
  }
  if (isHorizontal) {
    return {
      x: point.x > bbox.center[0] ? bbox.max[0] : bbox.min[0],
      y: point.y,
    };
  }
  return {
    x: point.x,
    y: point.y > bbox.center[1] ? bbox.max[1] : bbox.min[1],
  };
};

/**
 * Determine if two line segments defined by p0 p1 and p2 p3 intersect
 * @param p0 Endpoint of the first line segment
 * @param p1 Endpoint of the first line segment
 * @param p2 Endpoint of the second line segment
 * @param p3 Endpoint of the second line segment
 * @returns True if the line segments intersect, False otherwise
 */
export const isSegmentsIntersected = (
  p0: PolyPoint,
  p1: PolyPoint,
  p2: PolyPoint,
  p3: PolyPoint,
): boolean => {
  const v1x = p2.x - p0.x;
  const v1y = p2.y - p0.y;
  const v2x = p3.x - p0.x;
  const v2y = p3.y - p0.y;
  const v3x = p2.x - p1.x;
  const v3y = p2.y - p1.y;
  const v4x = p3.x - p1.x;
  const v4y = p3.y - p1.y;

  const pd1 = v1x * v2y - v1y * v2x;
  const pd2 = v3x * v4y - v3y * v4x;
  const pd3 = v1x * v3y - v1y * v3x;
  const pd4 = v2x * v4y - v2y * v4x;

  return pd1 * pd2 <= 0 && pd3 * pd4 <= 0;
};

/**
 * Determine if a line segment intersects with a bounding box
 * @param p1 endpoint of the line segment
 * @param p2 endpoint of the line segment
 * @param bbox a bounding box
 * @returns True if the line segment intersects with bbox, False otherwise
 */
export const isSegmentCrossingBBox = (
  p1: PolyPoint,
  p2: PolyPoint,
  bbox: AABB,
): boolean => {
  if (getBBoxWidth(bbox) || getBBoxHeight(bbox)) {
    const [pa, pb, pc, pd] = getBBoxPoints(bbox);
    return (
      isSegmentsIntersected(p1, p2, pa, pb) ||
      isSegmentsIntersected(p1, p2, pa, pd) ||
      isSegmentsIntersected(p1, p2, pb, pc) ||
      isSegmentsIntersected(p1, p2, pc, pd)
    );
  }
  return false;
};

/**
  Determines whether a given point is inside a given bounding box.
  @param {Point} point - The point to be checked.
  @param {AABB} bbox - The bounding box.
  @returns {boolean} - Returns true if the point is inside the bounding box, false otherwise.
*/
export const isPointInBBox = (point: Point, bbox: AABB) => {
  const { x, y } = point;
  return (
    x > bbox.min[0] && x < bbox.max[0] && y > bbox.min[1] && y < bbox.max[1]
  );
};

/**
  Determines whether a given sub-bounding box is fully contained within a given bounding box.
  @param {AABB} subBBox - The sub-bounding box to be checked.
  @param {AABB} bbox - The bounding box.
  @param {number} [scale] - Optional scaling factor to adjust the size of the bounding box.
  @returns {boolean} - Returns true if the sub-bounding box is fully contained within the bounding box, false otherwise.
*/
export const isBBoxInBBox = (subBBox: AABB, bbox: AABB, scale?: number) => {
  if (scale) {
    return (
      subBBox.min[0] > bbox.min[0] - bbox.halfExtents[0] * scale &&
      subBBox.max[0] < bbox.max[0] + bbox.halfExtents[0] * scale &&
      subBBox.min[1] > bbox.min[1] - bbox.halfExtents[1] * scale &&
      subBBox.max[1] < bbox.max[1] + bbox.halfExtents[1] * scale
    );
  }
  return (
    subBBox.min[0] > bbox.min[0] &&
    subBBox.max[0] < bbox.max[0] &&
    subBBox.min[1] > bbox.min[1] &&
    subBBox.max[1] < bbox.max[1]
  );
};

export const getCombinedCanvasesBounds = (canvases: Canvas[]) => {
  const combinedBounds = {
    min: [Infinity, Infinity, Infinity],
    max: [-Infinity, -Infinity, -Infinity],
    center: [0, 0, 0],
    halfExtents: [0, 0, 0],
  };
  canvases.forEach((canvas) => {
    const bounds = canvas.document.documentElement.getBounds();
    combinedBounds.min = combinedBounds.min.map((val, i) =>
      Math.min(val || Infinity, bounds.min[i]),
    );
    combinedBounds.max = combinedBounds.max.map((val, i) =>
      Math.max(val || -Infinity, bounds.max[i]),
    );
  });
  combinedBounds.center = combinedBounds.center.map(
    (_, i) => (combinedBounds.max[i] + combinedBounds.min[i]) / 2,
  );
  combinedBounds.halfExtents = combinedBounds.halfExtents.map(
    (_, i) => (combinedBounds.max[i] - combinedBounds.min[i]) / 2,
  );
  return combinedBounds;
};

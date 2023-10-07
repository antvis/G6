import { AABB } from '@antv/g';
import { each } from '@antv/util';
import { ID } from '@antv/graphlib';
import Node from '../item/node';
import { Point, PolyPoint } from '../types/common';
import {
  getBBoxFromPoint,
  getBBoxFromPoints,
  getExpandedBBox,
  getBBoxPoints,
  getExpandedBBoxPoint,
  mergeBBox,
  getBBoxCrossPointsByPoint,
  isPointOutsideBBox,
  isSegmentCrossingBBox,
} from './bbox';
import { manhattanDist } from './math';
import { RouterCfg } from './router';
import { isBending } from './point';

// class PolylineHistory {
//   private pathMap: Map<ID, Point[]>;

//   constructor() {
//     this.pathMap = new Map<ID, Point[]>();
//   }

//   public addPath(edgeId: ID, points: Point[]): void {
//     this.pathMap.set(edgeId, points);
//   }

//   public getPointsById(edgeId: ID): Point[] | undefined {
//     return this.pathMap.get(edgeId);
//   }
// }

// const polylineHistory = new PolylineHistory();

/**
 * Simplify points of polyline by removing duplicated points
 * @param points list of 2d points
 * @returns unique set of points
 */
export const simplifyPolylinePoints = (points: PolyPoint[]): PolyPoint[] => {
  const result: PolyPoint[] = [];
  const map = {};
  each(points, (p) => {
    p.id = `${p.x}|||${p.y}`;
    if (!map[p.id]) {
      map[p.id] = p;
      result.push(p);
    }
  });
  return result;
};

/**
 * Use the A* path-finding algorithm to obtain the shortest path.
 * Considering that there is no need to implement automatic obstacle avoidance, use waypoints to plan the path.
 */
export const simplePathFinder = (
  start: PolyPoint,
  end: PolyPoint,
  startNode: Node,
  endNode: Node,
  cfg: RouterCfg,
) => {
  return simplifyPolylinePoints(
    getPolylinePoints(start, end, cfg.offset, startNode, endNode),
  );
};

/**
 * 如果 points 中的一个节点 x 与 p 相等，则消耗 -2。y 同
 * 即优先选择和 points 在同一水平线 / 垂直线上的点
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const _costByPoints = (p: PolyPoint, points: PolyPoint[]): number => {
  const offset = -2;
  let result = 0;
  points.forEach((point) => {
    if (point) {
      if (p.x === point.x) {
        result += offset;
      }
      if (p.y === point.y) {
        result += offset;
      }
    }
  });
  return result;
};

/**
 * ps 经过 p 到 pt 的距离，减去其他路过节点造成的消耗
 */
export const heuristicCostEstimate = (
  p: PolyPoint,
  ps: PolyPoint,
  pt: PolyPoint,
  source?: PolyPoint,
  target?: PolyPoint,
): number =>
  manhattanDist(p, ps) +
  manhattanDist(p, pt) +
  _costByPoints(p, [ps, pt, source!, target!]);

export const reconstructPath = (
  pathPoints: PolyPoint[],
  pointById: any,
  cameFrom: any,
  currentId: ID,
  iterator = 0,
) => {
  pathPoints.unshift(pointById[currentId]);
  if (
    cameFrom[currentId] &&
    cameFrom[currentId] !== currentId &&
    iterator <= 100
  ) {
    reconstructPath(
      pathPoints,
      pointById,
      cameFrom,
      cameFrom[currentId],
      iterator + 1,
    );
  }
};

/**
 * 从 arr 中删去 item
 */
export const removeFrom = (arr: PolyPoint[], item: PolyPoint) => {
  const index = arr.indexOf(item);
  if (index > -1) {
    arr.splice(index, 1);
  }
};

/**
 * 在 points 中找到满足 x 或 y 和 point 的 x 或 y 相等，且与 point 连线不经过 bbox1 与 bbox2 的点
 */
export const getNeighborPoints = (
  points: PolyPoint[],
  point: PolyPoint,
  bbox1: AABB,
  bbox2: AABB,
): PolyPoint[] => {
  const neighbors: Point[] = [];
  points.forEach((p) => {
    if (p === point) return;
    if (p.x === point.x || p.y === point.y) {
      if (
        isSegmentCrossingBBox(p, point, bbox1) ||
        isSegmentCrossingBBox(p, point, bbox2)
      ) {
        return;
      }
      neighbors.push(p);
    }
  });
  return simplifyPolylinePoints(neighbors);
};

/** A-Star Algorithm using waypoints */
export const pathFinderUsingWaypoints = (
  points: PolyPoint[],
  start: PolyPoint,
  goal: PolyPoint,
  sBBox: AABB,
  tBBox: AABB,
  os: any,
  ot: any,
): PolyPoint[] => {
  // A-Star Algorithm
  const closedSet = [];
  const openSet = {
    [start.id]: start,
  };
  const cameFrom: {
    [key: string]: any;
  } = {};

  const gScore: {
    [key: string]: number;
  } = {}; // all default values are Infinity

  const fScore: {
    [key: string]: number;
  } = {}; // all default values are Infinity

  gScore[start.id] = 0;
  fScore[start.id] = heuristicCostEstimate(start, goal, start);
  const sortedOpenSet = new SortedArray();
  sortedOpenSet.add({
    id: start.id,
    value: fScore[start.id],
  });

  const pointById: {
    [key: string]: PolyPoint;
  } = {};

  points.forEach((p) => {
    pointById[p.id] = p;
  });

  let current;
  while (Object.keys(openSet).length) {
    const minId = sortedOpenSet.minId(false);
    if (minId) {
      current = openSet[minId];
    } else {
      break;
    }

    // point with the smallest fScore in openSet is the end
    if (current.id === goal.id) {
      // ending condition
      const pathPoints: any = [];
      reconstructPath(pathPoints, pointById, cameFrom, goal.id);
      return pathPoints;
    }

    delete openSet[current.id];
    sortedOpenSet.remove(current.id);
    closedSet.push(current);

    const neighborPoints = getNeighborPoints(points, current, sBBox, tBBox);
    const iterateNeighbors = (items) => {
      items.forEach((neighbor) => {
        if (closedSet.indexOf(neighbor) !== -1) {
          return;
        }

        const neighborId = neighbor.id;
        if (!openSet[neighborId]) {
          openSet[neighborId] = neighbor;
        }

        const tentativeGScore =
          fScore[current.id] + manhattanDist(current, neighbor); // + manhattanDist(neighbor, goal);
        if (gScore[neighborId] && tentativeGScore >= gScore[neighborId]) {
          sortedOpenSet.add({
            id: neighborId,
            value: fScore[neighborId],
          });
          return;
        }

        cameFrom[neighborId] = current.id;
        gScore[neighborId] = tentativeGScore;
        fScore[neighborId] =
          gScore[neighborId] +
          heuristicCostEstimate(neighbor, goal, start, os, ot);
        sortedOpenSet.add({
          id: neighborId,
          value: fScore[neighborId],
        });
      });
    };
    iterateNeighbors(neighborPoints);
  }

  return [start, goal];
};

/**
 * Calculate the two points necessary to draw a rounded corner between three points, given a radius.
 */
export const getBorderRadiusPoints = (
  p0: Point,
  p1: Point,
  p2: Point,
  r: number,
): Point[] => {
  const d0 = manhattanDist(p0, p1);
  const d1 = manhattanDist(p2, p1);
  const maxR = Math.min(d0, d1) / 2; // calculate the minimum possible radius
  r = Math.min(r, maxR); // use the smaller value between the given radius and the minimum radius
  const ps = {
    x: p1.x - (r / d0) * (p1.x - p0.x),
    y: p1.y - (r / d0) * (p1.y - p0.y),
  } as Point;
  const pt = {
    x: p1.x - (r / d1) * (p1.x - p2.x),
    y: p1.y - (r / d1) * (p1.y - p2.y),
  } as Point;
  return [ps, pt];
};

/** Draw a polyline path */
export const pointsToPolyline = (
  points: Point[],
  borderRadius?: number,
  z?: boolean,
): string => {
  const pathSegments: string[] = [];
  const startPoint = points[0];
  pathSegments.push(`M ${startPoint.x} ${startPoint.y}`);
  each(points, (p, i) => {
    const p1 = points[i + 1];
    const p2 = points[i + 2];
    if (p1 && p2) {
      if (isBending(p, p1, p2) && borderRadius) {
        const [ps, pt] = getBorderRadiusPoints(p, p1, p2, borderRadius);
        pathSegments.push(`L ${ps.x} ${ps.y}`);
        pathSegments.push(`Q ${p1.x} ${p1.y} ${pt.x} ${pt.y}`);
        pathSegments.push(`L ${pt.x} ${pt.y}`);
      } else {
        pathSegments.push(`L ${p1.x} ${p1.y}`);
      }
    } else if (p1) {
      pathSegments.push(`L ${p1.x} ${p1.y}`);
    }
  });
  if (z) {
    pathSegments.push('Z');
  }
  return pathSegments.join(' ');
};

/**
 * Get polyline path
 * @param id current edge id
 * @param points list of vertices
 * @param radius radius of the corner
 * @param z  whether is closed from the last point to the first point
 * @returns
 */
export const getPolylinePath = (
  id: ID,
  points: Point[],
  radius?: number,
  z?: boolean,
): string => {
  if (!points || points.length < 2) {
    return 'M 0 0 L 0 0'; // Cannot draw a single point
  }

  const newPoints = removeRedundantPoint(points);

  // Record polyline points
  // polylineHistory.addPath(id, newPoints);

  return pointsToPolyline(newPoints, radius, z);
};

/**
 * Get key waypoints between two points
 * @param start 2d start point
 * @param end 2d end point
 * @param offset offset
 * @param sNode source node
 * @param tNode target node
 * @returns key waypoints between two points
 */
export const getPolylinePoints = (
  start: PolyPoint,
  end: PolyPoint,
  offset: number,
  sNode?: Node,
  tNode?: Node,
): PolyPoint[] => {
  let sBBox: AABB, tBBox: AABB;

  // todo: combo
  if (!sNode || !sNode.getType()) {
    sBBox = getBBoxFromPoint(start);
  } else {
    sBBox = sNode?.getBBox();
  }

  if (!tNode || !tNode.getType()) {
    tBBox = getBBoxFromPoint(end);
  } else {
    tBBox = tNode?.getBBox();
  }

  const sxBBox = getExpandedBBox(sBBox, offset);
  const txBBox = getExpandedBBox(tBBox, offset);

  const sPoint = getExpandedBBoxPoint(sxBBox, start, end);
  const tPoint = getExpandedBBoxPoint(txBBox, end, start);
  const lineBBox = getBBoxFromPoints([sPoint, tPoint]);
  const sMixBBox = mergeBBox(sxBBox, lineBBox);
  const tMixBBox = mergeBBox(txBBox, lineBBox);
  let connectPoints: any = [];
  connectPoints = connectPoints
    .concat(
      getBBoxPoints(sMixBBox), // .filter(p => !isPointIntersectBBox(p, txBBox))
    )
    .concat(
      getBBoxPoints(tMixBBox), // .filter(p => !isPointIntersectBBox(p, sxBBox))
    );
  const centerPoint = {
    x: (start.x + end.x) / 2,
    y: (start.y + end.y) / 2,
  };
  [lineBBox, sMixBBox, tMixBBox].forEach((bbox: AABB) => {
    connectPoints = connectPoints.concat(
      getBBoxCrossPointsByPoint(bbox, centerPoint).filter(
        (p) => isPointOutsideBBox(p, sxBBox) && isPointOutsideBBox(p, txBBox),
      ),
    );
  });
  [
    {
      x: sPoint.x,
      y: tPoint.y,
    },
    {
      x: tPoint.x,
      y: sPoint.y,
    },
  ].forEach((p) => {
    // impossible!!
    if (
      isPointOutsideBBox(p, sxBBox) &&
      isPointOutsideBBox(p, txBBox) // &&
      // isPointInsideBBox(p, sMixBBox) && isPointInsideBBox(p, tMixBBox)
    ) {
      connectPoints.push(p);
    }
  });
  connectPoints.unshift(sPoint);
  connectPoints.push(tPoint);
  connectPoints = simplifyPolylinePoints(connectPoints);
  const pathPoints = pathFinderUsingWaypoints(
    connectPoints,
    sPoint,
    tPoint,
    sBBox,
    tBBox,
    start,
    end,
  );
  pathPoints.unshift(start);
  pathPoints.push(end);

  return simplifyPolylinePoints(pathPoints);
};

/**
 * Remove the intermediate points that are consecutively the same as x and different from y; remove the intermediate points that are consecutively the same as y but different from x
 * @param points list of 2d points
 * @returns
 */
export const removeRedundantPoint = (points: Point[]) => {
  if (!points?.length) return points;
  const beginPoint = points[points.length - 1];
  const current = {
    x: beginPoint.x,
    y: beginPoint.y,
  };
  let continueSameX = [beginPoint];
  let continueSameY = [beginPoint];
  for (let i = points.length - 2; i >= 0; i--) {
    const point = points[i];
    if (point.x === current.x) {
      continueSameX.push(point);
    } else {
      continueSameX = [point];
      current.x = point.x;
    }
    if (point.y === current.y) {
      continueSameY.push(point);
    } else {
      continueSameY = [point];
      current.y = point.y;
    }

    if (continueSameX.length > 2) {
      const removeIdx = points.indexOf(continueSameX[1]);
      if (removeIdx > -1) points.splice(removeIdx, 1);
      continue;
    }
    if (continueSameY.length > 2) {
      const removeIdx = points.indexOf(continueSameY[1]);
      if (removeIdx > -1) points.splice(removeIdx, 1);
    }
  }
  return points;
};

/**
 * sorted array ascendly
 * add new item to proper index when calling add
 */
export class SortedArray {
  public arr: {
    id: string;
    value: number;
  }[] = [];
  private map: {
    [id: string]: boolean;
  } = {};
  constructor() {
    this.arr = [];
    this.map = {};
  }
  private _innerAdd(item, length) {
    const idxRange = [0, length - 1];
    while (idxRange[1] - idxRange[0] > 1) {
      const midIdx = Math.floor((idxRange[0] + idxRange[1]) / 2);
      if (this.arr[midIdx].value > item.value) {
        idxRange[1] = midIdx;
      } else if (this.arr[midIdx].value < item.value) {
        idxRange[0] = midIdx;
      } else {
        this.arr.splice(midIdx, 0, item);
        this.map[item.id] = true;
        return;
      }
    }
    this.arr.splice(idxRange[1], 0, item);
    this.map[item.id] = true;
  }
  public add(item) {
    // 已经存在，先移除
    delete this.map[item.id];

    const length = this.arr.length;
    if (!length) {
      this.arr.push(item);
      this.map[item.id] = true;
      return;
    }

    // 比最后一个大，加入尾部
    if (this.arr[length - 1].value < item.value) {
      this.arr.push(item);
      this.map[item.id] = true;
      return;
    }
    this._innerAdd(item, length);
  }
  // only remove from the map to avoid cost
  // clear the invalid (not in the map) item when calling minId(true)
  public remove(id) {
    if (!this.map[id]) return;
    delete this.map[id];
  }
  private _clearAndGetMinId() {
    let res;
    for (let i = this.arr.length - 1; i >= 0; i--) {
      if (this.map[this.arr[i].id]) res = this.arr[i].id;
      else this.arr.splice(i, 1);
    }
    return res;
  }
  private _findFirstId() {
    while (this.arr.length) {
      const first = this.arr.shift();
      if (this.map[first.id]) return first.id;
    }
  }
  public minId(clear) {
    if (clear) {
      return this._clearAndGetMinId();
    } else {
      return this._findFirstId();
    }
  }
}

interface ComputedEdge {
  id: ID;
  p1: Point;
  p2: Point;
  bbox: AABB;
}

/** Define a quadtree */
export class QuadTree {
  private readonly capacity: number;
  private edges: ComputedEdge[] = [];
  private divided = false;
  private northwest?: QuadTree;
  private northeast?: QuadTree;
  private southwest?: QuadTree;
  private southeast?: QuadTree;

  constructor(public boundary: AABB, capacity: number) {
    this.capacity = capacity;
  }

  // Insert a new edge
  insert(edge: ComputedEdge) {
    if (!this.boundary.intersects(edge.bbox)) {
      return false;
    }

    if (this.edges.length < this.capacity) {
      this.edges.push(edge);
      return true;
    }

    if (!this.divided) {
      this.subdivide();
    }

    return (
      this.northeast?.insert(edge) ||
      this.northwest?.insert(edge) ||
      this.southeast?.insert(edge) ||
      this.southwest?.insert(edge) ||
      false
    );
  }

  // Divide the quadtree into four subtrees
  subdivide() {
    const x = this.boundary.center[0];
    const y = this.boundary.center[1];
    const hw = this.boundary.halfExtents[0] / 2;
    const hh = this.boundary.halfExtents[1] / 2;

    const nwBoundary = new AABB();
    nwBoundary.setMinMax([x - 2 * hw, y - 2 * hh, 0], [x, y, 0]);
    this.northwest = new QuadTree(nwBoundary, this.capacity);

    const neBoundary = new AABB();
    neBoundary.setMinMax([x, y - 2 * hh, 0], [x + 2 * hw, y, 0]);
    this.northeast = new QuadTree(neBoundary, this.capacity);

    const swBoundary = new AABB();
    swBoundary.setMinMax([x - 2 * hw, y, 0], [x, y + 2 * hh, 0]);
    this.southwest = new QuadTree(swBoundary, this.capacity);

    const seBoundary = new AABB();
    seBoundary.setMinMax([x, y, 0], [x + 2 * hw, y + 2 * hh, 0]);
    this.southeast = new QuadTree(seBoundary, this.capacity);

    this.divided = true;
  }

  // Query all edges within the specified range
  queryRange(range: AABB): ComputedEdge[] {
    if (!range.intersects(this.boundary)) {
      return [];
    }

    let found = this.edges.filter((edge) => edge.bbox.intersects(range));

    if (this.divided) {
      found = found.concat(
        this.northeast?.queryRange(range) || [],
        this.northwest?.queryRange(range) || [],
        this.southeast?.queryRange(range) || [],
        this.southwest?.queryRange(range) || [],
      );
    }

    return found;
  }
}

/** Collision detector */
export class EdgeCollisionChecker {
  private quadTree: QuadTree;

  constructor(quadTree: QuadTree) {
    this.quadTree = quadTree;
  }

  /** Check if node and edge intersect */
  getCollidingEdges(nodeBBox: AABB): ComputedEdge[] {
    // Get edge's bounding box intersects moving node's bounding box
    const potentialCollisions = this.quadTree.queryRange(nodeBBox);

    // todo: edge intersects node bbox

    return potentialCollisions;
  }
}

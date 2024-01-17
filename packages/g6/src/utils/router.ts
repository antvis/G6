import { deepMix, map } from '@antv/util';
import Node from '../item/node';
import { ID } from '../types';
import { Point, PolyPoint } from '../types/common';
import { getBBoxHeight, getBBoxWidth, getExpandedBBox, getExpandedBBoxPoint, isSegmentCrossingBBox } from './bbox';
import { eulerDist, manhattanDist } from './math';
import { getNearestPoint } from './point';
import { SortedArray, simplePathFinder } from './polyline';
import { getLineIntersect } from './shape';

export interface RouterCfg {
  name: 'orth' | 'er';
  /** Spacing between lines and points */
  offset?: number;
  /** Grid size */
  gridSize?: number;
  /** Maximum allowable rotation angle (radian) */
  maxAllowedDirectionChange?: number;
  /** Allowed edge directions */
  directions?: any[];
  /** Penalties */
  penalties?: Record<string, any>;
  /** Determine if use simple router for polyline when no obstacles */
  simple?: boolean;
  /** Function to calculate the distance between two points */
  distFunc?: (p1: PolyPoint, p2: PolyPoint) => number;
  /** Simplified function to find path */
  fallbackRoute?: (p1: PolyPoint, p2: PolyPoint, startNode?: Node, endNode?: Node, cfg?: RouterCfg) => PolyPoint[];
  /** Maximum loops */
  maximumLoops?: number;
  /**
   * Whether to automatically avoid other nodes (obstacles) on the path
   * Defaults to false.
   */
  enableObstacleAvoidance?: boolean;
}

const defaultCfg: RouterCfg = {
  name: 'orth',
  enableObstacleAvoidance: false,
  offset: 2,
  maxAllowedDirectionChange: Math.PI / 2,
  maximumLoops: 2000,
  gridSize: 10,
  directions: [
    { stepX: 1, stepY: 0 }, // right
    { stepX: -1, stepY: 0 }, // left
    { stepX: 0, stepY: 1 }, // bottom
    { stepX: 0, stepY: -1 }, // top
  ],
  get penalties() {
    return {
      0: 0,
      45: this.gridSize / 2,
      90: this.gridSize / 2,
    };
  },
  distFunc: manhattanDist,
  fallbackRoute: simplePathFinder,
};

const straightPath = (start: PolyPoint, end: PolyPoint): PolyPoint[] => {
  return [start, end];
};

export const octolinearCfg: RouterCfg = {
  name: 'er',
  maxAllowedDirectionChange: Math.PI / 4,
  directions: [
    { stepX: 1, stepY: 0 },
    { stepX: 1, stepY: 1 },
    { stepX: 0, stepY: 1 },
    { stepX: -1, stepY: 1 },
    { stepX: -1, stepY: 0 },
    { stepX: -1, stepY: -1 },
    { stepX: 0, stepY: -1 },
    { stepX: 1, stepY: -1 },
  ],
  distFunc: eulerDist,
  fallbackRoute: simplePathFinder,
};

/**
 * Calculates the index of a position in a grid based on grid size.
 * @param pos position
 * @param gridSize size of grid
 * @returns index of the position in the grid
 */
const pos2GridIx = (pos: number, gridSize: number) => {
  const gridIx = Math.round(Math.abs(pos / gridSize));
  const sign = pos < 0 ? -1 : 1;
  return gridIx < 0 ? 0 : sign * gridIx;
};

const getObstacleMap = (items: Map<ID, Node>, gridSize: number, offset: number) => {
  const obstacleMap = {};
  items.forEach((item: Node) => {
    if (!item || !item.isVisible()) return;
    const bbox = getExpandedBBox(item.getBBox(), offset);
    for (let x = pos2GridIx(bbox.min[0], gridSize); x <= pos2GridIx(bbox.max[0], gridSize); x += 1) {
      for (let y = pos2GridIx(bbox.min[1], gridSize); y <= pos2GridIx(bbox.max[1], gridSize); y += 1) {
        obstacleMap[`${x}|||${y}`] = true;
      }
    }
  });

  return obstacleMap;
};

/**
 * Calculate angle between the ray from p1 to p2 (clockwise)
 * @param p1
 * @param p2
 */
const getDirectionAngle = (p1: PolyPoint, p2: PolyPoint) => {
  const deltaX = p2.x - p1.x;
  const deltaY = p2.y - p1.y;
  if (deltaX || deltaY) {
    return Math.atan2(deltaY, deltaX);
  }
  return 0;
};

/**
 * Get changed direction angle and make sure less than 180 degrees
 * @param angle1
 * @param angle2
 */
const getAngleDiff = (angle1: number, angle2: number) => {
  const directionChange = Math.abs(angle1 - angle2);
  return directionChange > Math.PI ? 2 * Math.PI - directionChange : directionChange;
};

/**
 * estimated cost from the starting point to the end point after passing through the current point
 * @param from
 * @param endPoints
 * @param distFunc
 */
const estimateCost = (from: PolyPoint, endPoints: PolyPoint[], distFunc) => {
  let min = Infinity;
  for (let i = 0, len = endPoints.length; i < len; i++) {
    const cost = distFunc(from, endPoints[i]);
    if (cost < min) {
      min = cost;
    }
  }
  return min;
};

/**
 * Calculate the connection points on the expanded BBox
 * @param point anchorPoint of the position formatted by gridSize
 * @param oriPoint anchorPoint of the position not formatted by gridSize
 * @param node original node
 * @param anotherPoint another point which position is formatted
 * @param cfg router config
 * @returns
 */
const getBoxPoints = (
  point: PolyPoint,
  oriPoint: PolyPoint,
  node: Node,
  anotherPoint: PolyPoint,
  cfg: RouterCfg,
): PolyPoint[] => {
  const points = [];
  // create-edge 生成边的过程中，endNode 为 null
  if (!node) {
    return [point];
  }

  const { directions, offset } = cfg;
  const bbox = node.getBBox();
  const isInside =
    oriPoint.x > bbox.min[0] && oriPoint.x < bbox.max[0] && oriPoint.y > bbox.min[1] && oriPoint.y < bbox.max[1];

  const expandBBox = getExpandedBBox(bbox, offset);

  for (const i in expandBBox) {
    expandBBox[i] = map(expandBBox[i], (item: number) => pos2GridIx(item, cfg.gridSize));
  }

  if (isInside) {
    // If the anchorPoint is inside the node, allow the first line to pass through the node
    for (const dir of directions) {
      const bounds = [
        [
          {
            x: expandBBox.min[0],
            y: expandBBox.min[1],
          },
          {
            x: expandBBox.max[0],
            y: expandBBox.min[1],
          },
        ],
        [
          {
            x: expandBBox.min[0],
            y: expandBBox.min[1],
          },
          {
            x: expandBBox.min[0],
            y: expandBBox.max[1],
          },
        ],
        [
          {
            x: expandBBox.max[0],
            y: expandBBox.min[1],
          },
          {
            x: expandBBox.max[0],
            y: expandBBox.max[1],
          },
        ],
        [
          {
            x: expandBBox.min[0],
            y: expandBBox.max[1],
          },
          {
            x: expandBBox.max[0],
            y: expandBBox.max[1],
          },
        ],
      ];
      for (let i = 0; i < 4; i++) {
        const boundLine = bounds[i];
        const intersectP = getLineIntersect(
          point,
          {
            x: point.x + dir.stepX * getBBoxWidth(expandBBox),
            y: point.y + dir.stepY * getBBoxHeight(expandBBox),
          },
          boundLine[0],
          boundLine[1],
        ) as PolyPoint;
        if (intersectP && !isSegmentCrossingBBox(point, intersectP, bbox)) {
          intersectP.id = `${intersectP.x}|||${intersectP.y}`;
          points.push(intersectP);
        }
      }
    }
    return points;
  }
  // If the anchorPoint is on the node, there is only one optional direction
  const intersectP = getExpandedBBoxPoint(expandBBox, point, anotherPoint);
  intersectP.id = `${intersectP.x}|||${intersectP.y}`;
  return [intersectP];
};

const getDirectionChange = (
  current: PolyPoint,
  neighbor: PolyPoint,
  cameFrom: {
    [key: string]: {
      id: string;
      x: number;
      y: number;
    };
  },
  scaleStartPoint: PolyPoint,
): number => {
  const directionAngle = getDirectionAngle(current, neighbor);
  const currentCameFrom = cameFrom[current.id];
  if (!currentCameFrom) {
    const startAngle = getDirectionAngle(scaleStartPoint, current);
    return getAngleDiff(startAngle, directionAngle);
  }
  const prevDirectionAngle = getDirectionAngle(
    {
      x: currentCameFrom.x,
      y: currentCameFrom.y,
    },
    current,
  );
  return getAngleDiff(prevDirectionAngle, directionAngle);
};

const getControlPoints = (current, cameFrom, scaleStartPoint, endPoint, startPoints, scaleEndPoint, gridSize) => {
  const controlPoints = [];
  let pointZero = endPoint;
  let currentId = current.id;
  let currentX = current.x;
  let currentY = current.y;
  const lastPoint = {
    x: currentX,
    y: currentY,
    id: currentId,
  };
  // append endPoint
  pointZero = {
    x: scaleEndPoint.x === endPoint.x ? endPoint.x : lastPoint.x * gridSize,
    y: scaleEndPoint.y === endPoint.y ? endPoint.y : lastPoint.y * gridSize,
  };
  controlPoints.unshift(pointZero);

  let currentCameFrom = cameFrom[currentId];
  while (currentCameFrom && currentCameFrom.id !== currentId) {
    const point = {
      x: currentX,
      y: currentY,
      id: currentId,
    };
    const prePoint = {
      x: currentCameFrom.x,
      y: currentCameFrom.y,
      id: currentCameFrom.id,
    };
    const directionChange = getDirectionChange(prePoint, point, cameFrom, scaleStartPoint);
    if (directionChange) {
      pointZero = {
        x: prePoint.x === point.x ? pointZero.x : prePoint.x * gridSize,
        y: prePoint.y === point.y ? pointZero.y : prePoint.y * gridSize,
      };
      controlPoints.unshift(pointZero);
    }

    currentId = prePoint.id;
    currentX = prePoint.x;
    currentY = prePoint.y;
    currentCameFrom = cameFrom[currentId];
  }

  // append startPoint
  const realStartPoints = startPoints.map((point) => ({
    x: point.x * gridSize,
    y: point.y * gridSize,
  }));
  const startPoint = getNearestPoint(realStartPoints, pointZero).nearestPoint;
  controlPoints.unshift(startPoint);
  return controlPoints;
};

/**
 * Find the shortest path computed by A* routing algorithm
 * @param points
 * @param sourceNodeId
 * @param targetNodeId
 * @param nodeMap
 * @param routerCfg
 */
export const pathFinder = (
  points: Point[],
  sourceNodeId: ID,
  targetNodeId: ID,
  nodeMap: Map<ID, Node>,
  routerCfg?: RouterCfg,
): PolyPoint[] => {
  const startNode = nodeMap.get(sourceNodeId);
  const endNode = nodeMap.get(targetNodeId);

  const startPoint: PolyPoint = startNode?.getPosition() || points[0];
  const endPoint: PolyPoint = endNode?.getPosition() || points[points.length - 1];

  if (isNaN(startPoint.x) || isNaN(endPoint.x)) return [];

  const defaultCfgs = routerCfg.name === 'orth' ? defaultCfg : deepMix(defaultCfg, octolinearCfg);

  const cfg: RouterCfg = deepMix(defaultCfgs, routerCfg);

  if (!cfg.enableObstacleAvoidance) {
    return cfg.fallbackRoute(startPoint, endPoint, startNode, endNode, cfg);
  }

  const { penalties, gridSize } = cfg;

  const obstacleMap = getObstacleMap(nodeMap, gridSize, cfg.offset);

  const scaleStartPoint = {
    x: pos2GridIx(startPoint.x, gridSize),
    y: pos2GridIx(startPoint.y, gridSize),
  };
  const scaleEndPoint = {
    x: pos2GridIx(endPoint.x, gridSize),
    y: pos2GridIx(endPoint.y, gridSize),
  };

  startPoint.id = `${scaleStartPoint.x}|||${scaleStartPoint.y}`;
  endPoint.id = `${scaleEndPoint.x}|||${scaleEndPoint.y}`;
  const startPoints = getBoxPoints(scaleStartPoint, startPoint, startNode, scaleEndPoint, cfg);
  const endPoints = getBoxPoints(scaleEndPoint, endPoint, endNode, scaleStartPoint, cfg);
  startPoints.forEach((point) => {
    delete obstacleMap[point.id];
  });
  endPoints.forEach((point) => {
    delete obstacleMap[point.id];
  });
  const openSet = {};
  const closedSet = {};
  const cameFrom: {
    [key: string]: {
      id: string;
      x: number;
      y: number;
    };
  } = {};

  // cost generated from the starting point to the current point, default: Infinity
  const gScore: {
    [key: string]: number;
  } = {};

  // estimated cost from the starting point to the end point after passing through the current point, default: Infinity
  const fScore: {
    [key: string]: number;
  } = {};

  const sortedOpenSet = new SortedArray();

  // initialize
  for (let i = 0; i < startPoints.length; i++) {
    const firstStep = startPoints[i];
    openSet[firstStep.id] = firstStep;
    gScore[firstStep.id] = 0;
    fScore[firstStep.id] = estimateCost(firstStep, endPoints, cfg.distFunc);
    sortedOpenSet.add({
      id: firstStep.id,
      value: fScore[firstStep.id],
    });
  }
  let remainLoops = cfg.maximumLoops;
  let current, direction, neighbor, neighborCost, costFromStart, directionChange;
  let curCost = Infinity;
  const endPointMap = {};
  endPoints.forEach((point) => {
    endPointMap[`${point.x}|||${point.y}`] = true;
  });
  Object.keys(openSet).forEach((key) => {
    const id = openSet[key].id;
    if (fScore[id] <= curCost) {
      curCost = fScore[id];
      current = openSet[id];
    }
  });
  while (Object.keys(openSet).length > 0 && remainLoops > 0) {
    const minId = sortedOpenSet.minId((remainLoops + 1) % 30 === 0);
    if (minId) {
      current = openSet[minId];
    } else {
      break;
    }

    // If the point with the smallest fScore is the endpoint
    if (endPointMap[`${current.x}|||${current.y}`]) {
      return getControlPoints(current, cameFrom, scaleStartPoint, endPoint, startPoints, scaleEndPoint, gridSize);
    }

    delete openSet[current.id];
    sortedOpenSet.remove(current.id);
    closedSet[current.id] = true;

    // Get the candidate points of the next step
    // Take a step in the direction of the candidate point
    for (let i = 0; i < cfg.directions.length; i++) {
      direction = cfg.directions[i];
      const neighborId = `${Math.round(current.x) + direction.stepX}|||${Math.round(current.y) + direction.stepY}`;
      neighbor = {
        x: current.x + direction.stepX,
        y: current.y + direction.stepY,
        id: neighborId,
      };

      if (closedSet[neighborId]) continue;
      directionChange = getDirectionChange(current, neighbor, cameFrom, scaleStartPoint);
      if (directionChange > cfg.maxAllowedDirectionChange) continue;
      if (obstacleMap[neighborId]) continue; // skip if intersects

      // Add candidate points to openSet, and calculate the cost of each candidate point
      if (!openSet[neighborId]) {
        openSet[neighborId] = neighbor;
      }

      const directionPenalties = penalties[directionChange];
      neighborCost = cfg.distFunc(current, neighbor) + (isNaN(directionPenalties) ? gridSize : directionPenalties);
      costFromStart = gScore[current.id] + neighborCost;
      const neighborGScore = gScore[neighborId];
      if (neighborGScore && costFromStart >= neighborGScore) {
        continue;
      }

      cameFrom[neighborId] = current;
      gScore[neighborId] = costFromStart;
      fScore[neighborId] = costFromStart + estimateCost(neighbor, endPoints, cfg.distFunc);

      sortedOpenSet.add({
        id: neighborId,
        value: fScore[neighborId],
      });
    }
    remainLoops -= 1;
  }
  return cfg.fallbackRoute(startPoint, endPoint, startNode, endNode, cfg);
};

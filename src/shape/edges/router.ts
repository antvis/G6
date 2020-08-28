/**
 * 通过配置不同的 costFunc, distFunc, constraints 可以得到不同效果的 router
 * generalRouter: 不限制搜索时的移动方向，避开障碍即可
 * orthogonal: 线必须沿着竖直或水平方向（4个方向）
 * octolinearRouter: 线沿着竖直、水平、对角线方向（8个方向）
 */
import { INode } from '../../interface/item';
import { Item } from '../../types';
import deepMix from '@antv/util/lib/deep-mix';
import { getLineIntersect } from '../../util/math';
import {
  getExpandedBBox,
  getExpandedBBoxPoint,
  PolyPoint,
  getPolylinePoints,
  simplifyPolyline,
  isSegmentCrossingBBox,
} from './polyline-util';

export interface RouterCfg {
  offset?: number; // 连线和点的间距
  gridSize?: number;
  obstacles?: Item[];
  maxAllowedDirectionChange?: number; // 允许的最大转角
  directions?: any[]; // 允许的边的方向
  startDirections?: string[]; // 边从点出发的方向（e.g. 从上拐 / 从下拐）
  penalties?: {}; // 附加的分数
  distFunc?: (p1: PolyPoint, p2: PolyPoint) => number;
  fallbackRoute?: (
    p1: PolyPoint,
    p2: PolyPoint,
    startNode?: INode,
    endNode?: INode,
    cfg?: RouterCfg,
  ) => PolyPoint[]; // 若找不到符合要求的路径时的退化路径方案
  maximumLoops?: number;
}

const manhattanDist = (p1: PolyPoint, p2: PolyPoint): number =>
  Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);

const eucliDist = (p1: PolyPoint, p2: PolyPoint): number =>
  Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);

const straightPath = (start: PolyPoint, end: PolyPoint): PolyPoint[] => {
  // console.warn('fallbackRoute: straight path');
  return [start, end];
};

const simplePolyline = (
  start: PolyPoint,
  end: PolyPoint,
  startNode: INode,
  endNode: INode,
  cfg: RouterCfg,
) => {
  // console.warn('fallbackRoute: simple polyline path');
  return simplifyPolyline(getPolylinePoints(start, end, startNode, endNode, cfg.offset));
};
// getPolylinePoints

const defaultCfg: RouterCfg = {
  offset: 20,
  maxAllowedDirectionChange: 90,
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
  fallbackRoute: simplePolyline,
};

export const octolinearCfg: RouterCfg = {
  maxAllowedDirectionChange: 45,
  // 8 个方向: 上下左右 + 45度斜线方向
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
  distFunc: eucliDist,
  fallbackRoute: straightPath,
};

const pos2GridIx = (pos: number, gridSize: number) => {
  const gridIx = Math.floor(pos / gridSize);
  return gridIx < 0 ? 0 : gridIx;
};

const getObstacleMap = (items: Item[], gridSize: number, offset: number) => {
  const map = {};
  items.forEach((item: Item) => {
    const bbox = getExpandedBBox(item.getBBox(), offset);
    for (let x = pos2GridIx(bbox.minX, gridSize); x <= pos2GridIx(bbox.maxX, gridSize); x += 1) {
      for (let y = pos2GridIx(bbox.minY, gridSize); y <= pos2GridIx(bbox.maxY, gridSize); y += 1) {
        const gridKey = `${x}-${y}`;
        map[gridKey] = true;
      }
    }
  });
  return map;
};

/**
 * 方向角：计算从 p1 到 p2 的射线与水平线形成的夹角度数（顺时针从右侧0°转到该射线的角度）
 * @param p1 PolyPoint
 * @param p2 PolyPoint
 */
const getDirectionAngle = (p1: PolyPoint, p2: PolyPoint) => {
  const deltaX = p2.x - p1.x;
  const deltaY = p2.y - p1.y;
  if (!deltaX && !deltaY) return 0;
  const angle = (360 + (Math.atan2(deltaY, deltaX) * 180) / Math.PI) % 360;
  return angle;
};

/**
 * 方向角的改变，取小于180度角
 * @param angle1
 * @param angle2
 */
const getAngleDiff = (angle1: number, angle2: number) => {
  const directionChange = Math.abs(angle1 - angle2);
  return directionChange > 180 ? 360 - directionChange : directionChange;
};

// Path finder //
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

// 计算考虑 offset 后的 BBox 上的连接点
const getBoxPoints = (point: PolyPoint, node: INode, cfg: RouterCfg): PolyPoint[] => {
  const points = [];
  const { directions, offset } = cfg;
  const bbox = node.getBBox();
  const expandBBox = getExpandedBBox(node.getBBox(), offset);
  for (const i in expandBBox) {
    expandBBox[i] = pos2GridIx(expandBBox[i], cfg.gridSize);
  }
  const isInside =
    point.x > pos2GridIx(bbox.minX, cfg.gridSize) &&
    point.x < pos2GridIx(bbox.maxX, cfg.gridSize) &&
    point.y > pos2GridIx(bbox.minY, cfg.gridSize) &&
    point.y < pos2GridIx(bbox.maxY, cfg.gridSize);

  if (isInside) {
    // 如果 anchorPoint 在节点内部，允许第一段线穿过节点
    for (const dir of directions) {
      const bounds = [
        [
          {
            x: expandBBox.minX,
            y: expandBBox.minY,
          },
          {
            x: expandBBox.maxX,
            y: expandBBox.minY,
          },
        ],
        [
          {
            x: expandBBox.minX,
            y: expandBBox.minY,
          },
          {
            x: expandBBox.minX,
            y: expandBBox.maxY,
          },
        ],
        [
          {
            x: expandBBox.maxX,
            y: expandBBox.minY,
          },
          {
            x: expandBBox.maxX,
            y: expandBBox.maxY,
          },
        ],
        [
          {
            x: expandBBox.minX,
            y: expandBBox.maxY,
          },
          {
            x: expandBBox.maxX,
            y: expandBBox.maxY,
          },
        ],
      ];
      for (let i = 0; i < 4; i++) {
        const boundLine = bounds[i];
        const insterctP = getLineIntersect(
          point,
          { x: point.x + dir.stepX * expandBBox.width, y: point.y + dir.stepY * expandBBox.height },
          boundLine[0],
          boundLine[1],
        ) as PolyPoint;
        if (insterctP && !isSegmentCrossingBBox(point, insterctP, node.getBBox())) {
          insterctP.id = `${insterctP.x}-${insterctP.y}`;
          points.push(insterctP);
        }
      }
    }
  } else {
    // 如果 anchorPoint 在节点上，只有一个可选方向
    const insterctP = getExpandedBBoxPoint(expandBBox, point);
    insterctP.id = `${insterctP.x}-${insterctP.y}`;
    points.push(insterctP);
  }

  return points;
};

export const pathFinder = (
  startPoint: PolyPoint,
  endPoint: PolyPoint,
  startNode: INode,
  endNode: INode,
  routerCfg?: RouterCfg,
): PolyPoint[] => {
  const cfg: RouterCfg = deepMix(defaultCfg, routerCfg);
  cfg.obstacles = cfg.obstacles || [];
  const map = getObstacleMap(cfg.obstacles.concat([startNode, endNode]), cfg.gridSize, cfg.offset);
  // console.log(map);

  const scaleStartPoint = {
    x: pos2GridIx(startPoint.x, cfg.gridSize),
    y: pos2GridIx(startPoint.y, cfg.gridSize),
  };
  const scaleEndPoint = {
    x: pos2GridIx(endPoint.x, cfg.gridSize),
    y: pos2GridIx(endPoint.y, cfg.gridSize),
  };

  startPoint.id = `${scaleStartPoint.x}-${scaleStartPoint.y}`;
  endPoint.id = `${scaleEndPoint.x}-${scaleEndPoint.y}`;
  const startPoints = getBoxPoints(scaleStartPoint, startNode, cfg);
  const endPoints = getBoxPoints(scaleEndPoint, endNode, cfg);
  // console.log(startPoints, startNode.getBBox(), endNode.getBBox(), endPoints);
  startPoints.forEach((point) => {
    delete map[point.id];
  });
  endPoints.forEach((point) => {
    delete map[point.id];
  });

  const openSet = {};
  const closedSet = {};
  const cameFrom: {
    [key: string]: string;
  } = {};

  // 从起点到当前点已产生的 cost, default: Infinity
  const gScore: {
    [key: string]: number;
  } = {};

  // 起点经过当前点到达终点预估的 cost, default: Infinity
  const fScore: {
    [key: string]: number;
  } = {};

  // initialize
  for (let i = 0; i < startPoints.length; i++) {
    const firstStep = startPoints[i];
    openSet[firstStep.id] = firstStep;
    // cameFrom[firstStep.id] = startPoint.id;
    gScore[firstStep.id] = 0;
    fScore[firstStep.id] = estimateCost(firstStep, endPoints, cfg.distFunc);
  }

  const getDirectionChange = (current: PolyPoint, neighbor: PolyPoint): number => {
    const directionAngle = getDirectionAngle(current, neighbor);
    let directionChange: number;
    if (!cameFrom[current.id]) {
      const startAngle = getDirectionAngle(scaleStartPoint, current);
      directionChange = getAngleDiff(startAngle, directionAngle);
    } else {
      const prevDirectionAngle = getDirectionAngle(
        {
          x: parseFloat(cameFrom[current.id].split('-')[0]),
          y: parseFloat(cameFrom[current.id].split('-')[1]),
        },
        current,
      );
      directionChange = getAngleDiff(prevDirectionAngle, directionAngle);
    }
    return directionChange;
  };

  const getControlPoints = (currentId: string) => {
    const controlPoints = [endPoint];
    const lastPoint = {
      x: parseFloat(currentId.split('-')[0]),
      y: parseFloat(currentId.split('-')[1]),
      id: currentId,
    };
    if (getDirectionChange(lastPoint, scaleEndPoint)) {
      controlPoints.unshift({
        x: lastPoint.x === scaleEndPoint.x ? endPoint.x : lastPoint.x * cfg.gridSize,
        y: lastPoint.y === scaleEndPoint.y ? endPoint.y : lastPoint.y * cfg.gridSize,
      });
    }
    while (cameFrom[currentId] && cameFrom[currentId] !== currentId) {
      const point = {
        x: parseFloat(currentId.split('-')[0]),
        y: parseFloat(currentId.split('-')[1]),
        id: currentId,
      };
      const preId = cameFrom[currentId];
      const prePoint = {
        x: parseFloat(preId.split('-')[0]),
        y: parseFloat(preId.split('-')[1]),
        id: preId,
      };
      const directionChange = getDirectionChange(prePoint, point);
      if (directionChange) {
        controlPoints.unshift({
          x: prePoint.x === point.x ? controlPoints[0].x : prePoint.x * cfg.gridSize,
          y: prePoint.y === point.y ? controlPoints[0].y : prePoint.y * cfg.gridSize,
        });
      }

      currentId = preId;
    }

    // 和startNode对齐
    const firstPoint = {
      x: parseFloat(currentId.split('-')[0]),
      y: parseFloat(currentId.split('-')[1]),
      id: currentId,
    };
    controlPoints[0].x = firstPoint.x === scaleStartPoint.x ? startPoint.x : controlPoints[0].x;
    controlPoints[0].y = firstPoint.y === scaleStartPoint.y ? startPoint.y : controlPoints[0].y;
    controlPoints.unshift(startPoint);
    return controlPoints;
  };

  let remainLoops = cfg.maximumLoops;
  while (Object.keys(openSet).length > 0 && remainLoops > 0) {
    let current;
    let curCost = Infinity;

    // 找到 openSet 中 fScore 最小的点
    for (const id in openSet) {
      if (fScore[id] <= curCost) {
        curCost = fScore[id];
        current = openSet[id];
      }
    }
    if (!current) break;

    // console.log('cur: ', current.id, curCost, gScore[current.id]);

    // 如果 fScore 最小的点就是终点
    if (endPoints.findIndex((point) => point.x === current.x && point.y === current.y) > -1) {
      const controlPoints = getControlPoints(current.id);
      return controlPoints;
    }

    delete openSet[current.id];
    closedSet[current.id] = true;

    // 获取符合条件的下一步的候选连接点
    // 沿候选方向走一步
    for (let i = 0; i < cfg.directions.length; i++) {
      const direction = cfg.directions[i];
      const neighbor = {
        x: current.x + direction.stepX,
        y: current.y + direction.stepY,
        id: `${current.x + direction.stepX}-${current.y + direction.stepY}`,
      };

      // console.log(neighbor.id, current.x, direction.stepX);
      if (closedSet[neighbor.id]) continue;
      const directionChange = getDirectionChange(current, neighbor);
      if (directionChange > cfg.maxAllowedDirectionChange) continue;
      if (map[neighbor.id]) continue; // 如果交叉则跳过

      // 将候选点加入 openSet, 并计算每个候选点的 cost
      if (!openSet[neighbor.id]) {
        openSet[neighbor.id] = neighbor;
      }
      const neighborCost =
        cfg.distFunc(current, neighbor) +
        (isNaN(cfg.penalties[directionChange]) ? cfg.gridSize : cfg.penalties[directionChange]);
      const costFromStart = gScore[current.id] + neighborCost;
      // console.log(current.id, neighbor.id, directionChange);
      if (gScore[neighbor.id] && costFromStart >= gScore[neighbor.id]) {
        continue;
      }

      cameFrom[neighbor.id] = current.id;
      gScore[neighbor.id] = costFromStart;
      fScore[neighbor.id] = costFromStart + estimateCost(neighbor, endPoints, cfg.distFunc);
    }

    remainLoops -= 1;
  }

  return cfg.fallbackRoute(startPoint, endPoint, startNode, endNode, cfg);
};

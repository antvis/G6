import { isNumber } from '@antv/util';
import type { Direction, ID, Node, Point, ShortestPathRouterOptions } from '../../types';
import { getBBoxSegments, getBBoxSize, getExpandedBBox, isPointInBBox, isPointOnBBoxBoundary } from '../bbox';
import { getLinesIntersection } from '../line';
import { add, manhattanDistance, toVector2 } from '../vector';

const defaultCfg: ShortestPathRouterOptions = {
  enableObstacleAvoidance: false,
  offset: 10,
  maxAllowedDirectionChange: Math.PI / 2,
  maximumLoops: 3000,
  gridSize: 5,
  startDirections: ['top', 'right', 'bottom', 'left'],
  endDirections: ['top', 'right', 'bottom', 'left'],
  directionMap: {
    right: { stepX: 1, stepY: 0 },
    left: { stepX: -1, stepY: 0 },
    bottom: { stepX: 0, stepY: 1 },
    top: { stepX: 0, stepY: -1 },
  },
  penalties: { 0: 0, 90: 0 },
  distFunc: manhattanDistance,
};

const keyOf = (point: Point) => `${Math.round(point[0])}|||${Math.round(point[1])}`;

function alignToGrid(p: Point, gridSize: number): Point;
function alignToGrid(p: number, gridSize: number): number;
/**
 * <zh/> 将坐标对齐到网格
 *
 * <en/> Align to the grid
 * @param p - <zh/> 坐标 | <en/> point
 * @param gridSize - <zh/> 网格大小 | <en/> grid size
 * @returns <zh/> 对齐后的坐标 | <en/> aligned point
 */
function alignToGrid(p: number | Point, gridSize: number): number | Point {
  const align = (value: number) => Math.round(value / gridSize);
  if (isNumber(p)) return align(p);
  return p.map(align) as Point;
}

/**
 * <zh/> 获取两个角度的变化方向，并确保小于 180 度
 *
 * <en/ >Get changed direction angle and make sure less than 180 degrees
 * @param angle1 - <zh/> 第一个角度 | <en/> the first angle
 * @param angle2 - <zh/> 第二个角度 | <en/> the second angle
 * @returns <zh/> 两个角度的变化方向 | <en/> changed direction angle
 */
function getAngleDiff(angle1: number, angle2: number) {
  const directionChange = Math.abs(angle1 - angle2);
  return directionChange > Math.PI ? 2 * Math.PI - directionChange : directionChange;
}

/**
 * <zh/> 获取从 p1 指向 p2 的向量与 x 轴正方向之间的夹角，单位为弧度
 *
 * <en/> Get the angle between the vector from p1 to p2 and the positive direction of the x-axis, in radians
 * @param p1 - <zh/> 点 p1 | <en/> point p1
 * @param p2 - <zh/> 点 p2 | <en/> point p2
 * @returns <zh/> 夹角 | <en/> angle
 */
function getDirectionAngle(p1: Point, p2: Point) {
  const deltaX = p2[0] - p1[0];
  const deltaY = p2[1] - p1[1];

  if (!deltaX && !deltaY) return 0;

  return Math.atan2(deltaY, deltaX);
}

/**
 * <zh/> 获取两个点之间的方向变化
 *
 * <en/> Get direction change between two points
 * @param current - <zh/> 当前点 | <en/> current point
 * @param neighbor - <zh/> 邻居点 | <en/> neighbor point
 * @param cameFrom - <zh/> 来源点 | <en/> source point
 * @param scaleStartPoint - <zh/> 缩放后的起点 | <en/> scaled start point
 * @returns <zh/> 方向变化 | <en/> direction change
 */
function getDirectionChange(
  current: Point,
  neighbor: Point,
  cameFrom: Record<string, Point>,
  scaleStartPoint: Point,
): number {
  const directionAngle = getDirectionAngle(current, neighbor);

  const currentCameFrom = cameFrom[keyOf(current)];
  const prev = !currentCameFrom ? scaleStartPoint : currentCameFrom;
  const prevDirectionAngle = getDirectionAngle(prev, current);

  return getAngleDiff(prevDirectionAngle, directionAngle);
}

/**
 * <zh/> 获取障碍物地图
 *
 * <en/> Get obstacle map
 * @param nodes - <zh/> 图上所有节点 | <en/> all nodes on the graph
 * @param options - <zh/> 路由配置 | <en/> router options
 * @returns <zh/> 障碍物地图 | <en/> obstacle map
 */
const getObstacleMap = (nodes: Node[], options: Required<ShortestPathRouterOptions>) => {
  const { offset, gridSize } = options;
  const obstacleMap: Record<string, boolean> = {};

  nodes.forEach((item: Node) => {
    if (!item || item.destroyed || !item.isVisible()) return;
    const bbox = getExpandedBBox(item.getRenderBounds(), offset);
    for (let x = alignToGrid(bbox.min[0], gridSize); x <= alignToGrid(bbox.max[0], gridSize); x += 1) {
      for (let y = alignToGrid(bbox.min[1], gridSize); y <= alignToGrid(bbox.max[1], gridSize); y += 1) {
        obstacleMap[`${x}|||${y}`] = true;
      }
    }
  });
  return obstacleMap;
};

/**
 * <zh/> 估算从起点到多个锚点的最小代价
 *
 * <en/> Estimate minimum cost from the starting point to multiple anchor points
 * @param from - <zh/> 起点 | <en/> source point
 * @param anchors - <zh/> 锚点 | <en/> anchor points
 * @param distFunc - <zh/> 距离函数 | <en/> distance function
 * @returns <zh/> 最小成本 | <en/> minimum cost
 */
export function estimateCost(from: Point, anchors: Point[], distFunc: (p1: Point, p2: Point) => number) {
  return Math.min(...anchors.map((anchor) => distFunc(from, anchor)));
}

/**
 * <zh/> 已知一个点集与一个参考点，从点集中找到距离参考点最近的点
 *
 * <en/> Given a set of points and a reference point, find the point closest to the reference point from the set of points
 * @param points - <zh/> 点集 | <en/> set of points
 * @param refPoint - <zh/> 参考点 | <en/> reference point
 * @param distFunc - <zh/> 距离函数 | <en/> distance function
 * @returns <zh/> 最近的点 | <en/> nearest point
 */
export function getNearestPoint(points: Point[], refPoint: Point, distFunc: (p1: Point, p2: Point) => number): Point {
  let nearestPoint = points[0];
  let minDistance = distFunc(points[0], refPoint);
  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    const dis = distFunc(point, refPoint);
    if (dis < minDistance) {
      nearestPoint = point;
      minDistance = dis;
    }
  }
  return nearestPoint;
}

/**
 * Calculate the connection points on the expanded BBox
 * @param point
 * @param node
 * @param directions
 * @param options
 */
const getBoxPoints = (
  point: Point,
  node: Node,
  directions: Direction[],
  options: Required<ShortestPathRouterOptions>,
): Point[] => {
  // create-edge 生成边的过程中，endNode 为 null
  if (!node) return [point];

  const { directionMap, offset } = options;
  const expandedBBox = getExpandedBBox(node.getRenderBounds(), offset);

  const points = (Object.keys(directionMap) as Direction[]).reduce<Point[]>((res, directionKey) => {
    if (directions.includes(directionKey)) {
      const direction = directionMap[directionKey];
      const [width, height] = getBBoxSize(expandedBBox);
      const otherPoint: Point = [point[0] + direction.stepX * width, point[1] + direction.stepY * height];
      const segments = getBBoxSegments(expandedBBox);
      for (let i = 0; i < segments.length; i++) {
        const intersectP = getLinesIntersection([point, otherPoint], segments[i]);
        if (intersectP && isPointOnBBoxBoundary(intersectP, expandedBBox)) {
          res.push(intersectP);
        }
      }
    }

    return res;
  }, []);

  if (!isPointInBBox(point, expandedBBox)) {
    points.push(point);
  }

  return points.map((point) => alignToGrid(point, options.gridSize));
};

const getControlPoints = (
  current: Point,
  cameFrom: Record<ID, Point>,
  scaleStartPoint: Point,
  endPoint: Point,
  startPoints: Point[],
  scaleEndPoint: Point,
  gridSize: number,
) => {
  const controlPoints: Point[] = [];

  // append endPoint
  let pointZero: Point = [
    scaleEndPoint[0] === endPoint[0] ? endPoint[0] : current[0] * gridSize,
    scaleEndPoint[1] === endPoint[1] ? endPoint[1] : current[1] * gridSize,
  ];
  controlPoints.unshift(pointZero);

  let _current = current;
  let _currentCameFrom = cameFrom[keyOf(_current)];

  while (_currentCameFrom) {
    const prePoint = _currentCameFrom;
    const point = _current;
    const directionChange = getDirectionChange(prePoint, point, cameFrom, scaleStartPoint);

    if (directionChange) {
      pointZero = [
        prePoint[0] === point[0] ? pointZero[0] : prePoint[0] * gridSize,
        prePoint[1] === point[1] ? pointZero[1] : prePoint[1] * gridSize,
      ];
      controlPoints.unshift(pointZero);
    }
    _currentCameFrom = cameFrom[keyOf(prePoint)];
    _current = prePoint;
  }

  // append startPoint
  const realStartPoints = startPoints.map((point) => [point[0] * gridSize, point[1] * gridSize] as Point);
  const startPoint = getNearestPoint(realStartPoints, pointZero, manhattanDistance);

  controlPoints.unshift(startPoint);

  return controlPoints;
};

/**
 * Find the shortest path between a given source node to a destination node according to A* Search Algorithm：https://www.geeksforgeeks.org/a-search-algorithm/
 * @param sourceNode - <zh/> 源节点 | <en/> source node
 * @param targetNode - <zh/> 目标节点 | <en/> target node
 * @param nodes - <zh/> 图上所有节点 | <en/> all nodes on the graph
 * @param config - <zh/> 路由配置 | <en/> router options
 * @returns <zh/> 控制点数组 | <en/> control point array
 */
export function aStarSearch(
  sourceNode: Node,
  targetNode: Node,
  nodes: Node[],
  config: ShortestPathRouterOptions,
): Point[] {
  const startPoint = toVector2(sourceNode.getCenter());
  const endPoint = toVector2(targetNode.getCenter());

  const options = Object.assign(defaultCfg, config) as Required<ShortestPathRouterOptions>;

  const { gridSize } = options;

  const obstacles = options.enableObstacleAvoidance ? nodes : [sourceNode, targetNode];
  const obstacleMap = getObstacleMap(obstacles, options);

  const scaleStartPoint = alignToGrid(startPoint, gridSize);
  const scaleEndPoint = alignToGrid(endPoint, gridSize);

  const startPoints = getBoxPoints(startPoint, sourceNode, options.startDirections, options);
  const endPoints = getBoxPoints(endPoint, targetNode, options.endDirections, options);

  startPoints.forEach((point) => delete obstacleMap[keyOf(point)]);
  endPoints.forEach((point) => delete obstacleMap[keyOf(point)]);

  const openList: Record<string, Point> = {};
  const closedList: Record<string, boolean> = {};
  const cameFrom: Record<string, Point> = {};

  // The movement cost to move from the starting point to the current point on the grid.
  const gScore: Record<string, number> = {};

  // The estimated movement cost to move from the starting point to the end point after passing through the current point.
  // f = g + h
  const fScore: Record<string, number> = {};

  const sortedOpenSet = new SortedArray();

  for (let i = 0; i < startPoints.length; i++) {
    const firstStep = startPoints[i];
    const key = keyOf(firstStep);
    openList[key] = firstStep;
    gScore[key] = 0;
    fScore[key] = estimateCost(firstStep, endPoints, options.distFunc);

    // Push start point to sortedOpenSet
    sortedOpenSet.add({
      id: key,
      value: fScore[key],
    });
  }

  const endPointsKeys = endPoints.map((point) => keyOf(point));

  let remainLoops = options.maximumLoops;
  let current: Point;
  let curCost = Infinity;

  for (const [id, value] of Object.entries(openList)) {
    if (fScore[id] <= curCost) {
      curCost = fScore[id];
      current = value;
    }
  }

  while (Object.keys(openList).length > 0 && remainLoops > 0) {
    const minId = sortedOpenSet.minId(false);
    if (minId) {
      current = openList[minId];
    } else {
      break;
    }
    const key = keyOf(current);

    // If currentNode is final, return the successful path
    if (endPointsKeys.includes(key)) {
      return getControlPoints(current, cameFrom, scaleStartPoint, endPoint, startPoints, scaleEndPoint, gridSize);
    }

    // Set currentNode as closed
    delete openList[key];
    sortedOpenSet.remove(key);
    closedList[key] = true;

    // Get the neighbor points of the next step
    for (const dir of Object.values(options.directionMap)) {
      const neighbor = add(current, [dir.stepX, dir.stepY]);
      const neighborId = keyOf(neighbor);
      if (closedList[neighborId]) continue;

      const directionChange = getDirectionChange(current, neighbor, cameFrom, scaleStartPoint);
      if (directionChange > options.maxAllowedDirectionChange) continue;

      if (obstacleMap[neighborId]) continue; // skip if intersects

      // Add neighbor points to openList, and calculate the cost of each neighbor point
      if (!openList[neighborId]) {
        openList[neighborId] = neighbor;
      }

      const directionPenalties = options.penalties[directionChange];
      const neighborCost =
        options.distFunc(current, neighbor) + (isNaN(directionPenalties) ? gridSize : directionPenalties);
      const costFromStart = gScore[key] + neighborCost;
      const neighborGScore = gScore[neighborId];

      if (neighborGScore && costFromStart >= neighborGScore) continue;

      cameFrom[neighborId] = current;
      gScore[neighborId] = costFromStart;
      fScore[neighborId] = costFromStart + estimateCost(neighbor, endPoints, options.distFunc);

      sortedOpenSet.add({
        id: neighborId,
        value: fScore[neighborId],
      });
    }
    remainLoops -= 1;
  }

  return [];
}

type Item = {
  id: string;
  value: number;
};

/**
 * <zh/> 有序数组，按升序排列
 *
 * <en/> Sorted array, sorted in ascending order
 */
export class SortedArray {
  public arr: Item[] = [];

  private map: Record<string, boolean> = {};

  constructor() {
    this.arr = [];
    this.map = {};
  }

  private _innerAdd(item: Item, length: number) {
    let low = 0,
      high = length - 1;
    while (high - low > 1) {
      const mid = Math.floor((low + high) / 2);
      if (this.arr[mid].value > item.value) {
        high = mid;
      } else if (this.arr[mid].value < item.value) {
        low = mid;
      } else {
        this.arr.splice(mid, 0, item);
        this.map[item.id] = true;
        return;
      }
    }
    this.arr.splice(high, 0, item);
    this.map[item.id] = true;
  }

  /**
   * <zh/> 将新项添加到适当的索引位置
   *
   * <en/> Add the new item to the appropriate index
   * @param item - <zh/> 新项 | <en/> new item
   */
  public add(item: Item) {
    // 已经存在，先移除
    // If exists, remove it
    delete this.map[item.id];

    const length = this.arr.length;
    // 如果为空或者最后一个元素小于当前元素，直接添加到最后
    // If empty or the last element is less than the current element, add to the end
    if (!length || this.arr[length - 1].value < item.value) {
      this.arr.push(item);
      this.map[item.id] = true;
      return;
    }

    // 按照升序排列，找到合适的位置插入
    // Find the appropriate position to insert in ascending order
    this._innerAdd(item, length);
  }

  public remove(id: string) {
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
      const first = this.arr.shift()!;
      if (this.map[first.id]) return first.id;
    }
  }

  public minId(clear: boolean) {
    if (clear) {
      return this._clearAndGetMinId();
    } else {
      return this._findFirstId();
    }
  }
}

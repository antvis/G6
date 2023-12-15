import { Point, IGroup } from '@antv/g-base';
import { mat3, vec3, ext, vec2 } from '@antv/matrix-util';
import { isArray, each } from '@antv/util';
import {
  GraphData,
  ICircle,
  IEllipse,
  IRect,
  Matrix,
  EdgeConfig,
  NodeIdxMap,
  IBBox,
  Item,
  IPoint,
  GraphAnimateConfig
} from '../types';

const transform = ext.transform;

/**
 * 对比对象，用于对象数组排序
 * @param   {string}       attributeName  排序依据的字段名称
 * @param   {number}       min    最小值
 * @param   {number}       max    最大值
 * @return  {boolean}      bool   布尔
 */
export const compare = (attributeName: string) => {
  return (m, n) => {
    return m[attributeName] - n[attributeName];
  };
};

/**
 * 是否在区间内
 * @param   {number}       value  值
 * @param   {number}       min    最小值
 * @param   {number}       max    最大值
 * @return  {boolean}      bool   布尔
 */
const isBetween = (value: number, min: number, max: number) => value >= min && value <= max;

/**
 * 获取两条线段的交点
 * @param  {Point}  p0 第一条线段起点
 * @param  {Point}  p1 第一条线段终点
 * @param  {Point}  p2 第二条线段起点
 * @param  {Point}  p3 第二条线段终点
 * @return {Point}  交点
 */
export const getLineIntersect = (p0: Point, p1: Point, p2: Point, p3: Point): Point | null => {
  const tolerance = 0.0001;

  const E: Point = {
    x: p2.x - p0.x,
    y: p2.y - p0.y,
  };
  const D0: Point = {
    x: p1.x - p0.x,
    y: p1.y - p0.y,
  };
  const D1: Point = {
    x: p3.x - p2.x,
    y: p3.y - p2.y,
  };
  const kross: number = D0.x * D1.y - D0.y * D1.x;
  const sqrKross: number = kross * kross;
  const invertKross: number = 1 / kross;
  const sqrLen0: number = D0.x * D0.x + D0.y * D0.y;
  const sqrLen1: number = D1.x * D1.x + D1.y * D1.y;
  if (sqrKross > tolerance * sqrLen0 * sqrLen1) {
    const s = (E.x * D1.y - E.y * D1.x) * invertKross;
    const t = (E.x * D0.y - E.y * D0.x) * invertKross;
    if (!isBetween(s, 0, 1) || !isBetween(t, 0, 1)) return null;
    return {
      x: p0.x + s * D0.x,
      y: p0.y + s * D0.y,
    };
  }
  return null;
};

/**
 * point and rectangular intersection point
 * @param  {IRect} rect  rect
 * @param  {Point} point point
 * @return {PointPoint} rst;
 */
export const getRectIntersectByPoint = (rect: IRect, point: Point): Point | null => {
  const { x, y, width, height } = rect;
  const cx = x + width / 2;
  const cy = y + height / 2;
  const points: Point[] = [];
  const center: Point = {
    x: cx,
    y: cy,
  };
  points.push({
    x,
    y,
  });
  points.push({
    x: x + width,
    y,
  });
  points.push({
    x: x + width,
    y: y + height,
  });
  points.push({
    x,
    y: y + height,
  });
  points.push({
    x,
    y,
  });
  let rst: Point | null = null;
  for (let i = 1; i < points.length; i++) {
    rst = getLineIntersect(points[i - 1], points[i], center, point);
    if (rst) {
      break;
    }
  }
  return rst;
};

/**
 * get point and circle inIntersect
 * @param {ICircle} circle 圆点，x,y,r
 * @param {Point} point 点 x,y
 * @return {Point} applied point
 */
export const getCircleIntersectByPoint = (circle: ICircle, point: Point): Point | null => {
  const { x: cx, y: cy, r } = circle;
  const { x, y } = point;

  const dx = x - cx;
  const dy = y - cy;
  if (dx * dx + dy * dy < r * r) {
    return null;
  }
  const angle = Math.atan(dy / dx);
  return {
    x: cx + Math.abs(r * Math.cos(angle)) * Math.sign(dx),
    y: cy + Math.abs(r * Math.sin(angle)) * Math.sign(dy),
  };
};

/**
 * get point and ellipse inIntersect
 * @param {Object} ellipse 椭圆 x,y,rx,ry
 * @param {Object} point 点 x,y
 * @return {object} applied point
 */
export const getEllipseIntersectByPoint = (ellipse: IEllipse, point: Point): Point => {
  const a = ellipse.rx;
  const b = ellipse.ry;
  const cx = ellipse.x;
  const cy = ellipse.y;

  const dx = point.x - cx;
  const dy = point.y - cy;
  // 直接通过 x,y 求夹角，求出来的范围是 -PI, PI
  let angle = Math.atan2(dy / b, dx / a);

  if (angle < 0) {
    angle += 2 * Math.PI; // 转换到 0，2PI
  }

  return {
    x: cx + a * Math.cos(angle),
    y: cy + b * Math.sin(angle),
  };
};

/**
 * coordinate matrix transformation
 * @param  {number} point   coordinate
 * @param  {Matrix} matrix  matrix
 * @param  {number} tag     could be 0 or 1
 * @return {Point} transformed point
 */
export const applyMatrix = (point: Point, matrix: Matrix, tag: 0 | 1 = 1): Point => {
  const vector: vec3 = [point.x, point.y, tag];
  if (!matrix || isNaN(matrix[0])) {
    matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  }

  vec3.transformMat3(vector, vector, matrix as mat3);

  return {
    x: vector[0],
    y: vector[1],
  };
};

/**
 * coordinate matrix invert transformation
 * @param  {number} point   coordinate
 * @param  {number} matrix  matrix
 * @param  {number} tag     could be 0 or 1
 * @return {object} transformed point
 */
export const invertMatrix = (point: Point, matrix: Matrix, tag: 0 | 1 = 1): Point => {
  if (!matrix || isNaN(matrix[0])) {
    matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  }

  let inversedMatrix = mat3.invert([1, 0, 0, 0, 1, 0, 0, 0, 1], matrix as mat3);
  if (!inversedMatrix) {
    inversedMatrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  }
  const vector: vec3 = [point.x, point.y, tag];
  vec3.transformMat3(vector, vector, inversedMatrix);

  return {
    x: vector[0],
    y: vector[1],
  };
};

/**
 *
 * @param p1 First coordinate
 * @param p2 second coordinate
 * @param p3 three coordinate
 */
export const getCircleCenterByPoints = (p1: Point, p2: Point, p3: Point): Point => {
  const a = p1.x - p2.x;
  const b = p1.y - p2.y;
  const c = p1.x - p3.x;
  const d = p1.y - p3.y;
  const e = (p1.x * p1.x - p2.x * p2.x - p2.y * p2.y + p1.y * p1.y) / 2;
  const f = (p1.x * p1.x - p3.x * p3.x - p3.y * p3.y + p1.y * p1.y) / 2;
  const denominator = b * c - a * d;
  return {
    x: -(d * e - b * f) / denominator,
    y: -(a * f - c * e) / denominator,
  };
};

/**
 * get distance by two points
 * @param p1 first point
 * @param p2 second point
 */
export const distance = (p1: Point, p2: Point): number => {
  const vx = p1.x - p2.x;
  const vy = p1.y - p2.y;
  return Math.sqrt(vx * vx + vy * vy);
};

/**
 * scale matrix
 * @param matrix [ [], [], [] ]
 * @param ratio
 */
export const scaleMatrix = (matrix: Matrix[], ratio: number) => {
  const result: Matrix[] = [];
  matrix.forEach(row => {
    const newRow: number[] = [];
    row.forEach(v => {
      newRow.push(v * ratio);
    });
    result.push(newRow);
  });
  return result;
};

/**
 * Floyd Warshall algorithm for shortest path distances matrix
 * @param  {array} adjMatrix   adjacency matrix
 * @return {array} distances   shortest path distances matrix
 */
export const floydWarshall = (adjMatrix: Matrix[]): Matrix[] => {
  // initialize
  const dist: Matrix[] = [];
  const size = adjMatrix.length;
  for (let i = 0; i < size; i += 1) {
    dist[i] = [];
    for (let j = 0; j < size; j += 1) {
      if (i === j) {
        dist[i][j] = 0;
      } else if (adjMatrix[i][j] === 0 || !adjMatrix[i][j]) {
        dist[i][j] = Infinity;
      } else {
        dist[i][j] = adjMatrix[i][j];
      }
    }
  }
  // floyd
  for (let k = 0; k < size; k += 1) {
    for (let i = 0; i < size; i += 1) {
      for (let j = 0; j < size; j += 1) {
        if (dist[i][j] > dist[i][k] + dist[k][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
        }
      }
    }
  }
  return dist;
};

/**
 * get adjacency matrix
 * @param data graph data
 * @param directed whether it's a directed graph
 */
export const getAdjMatrix = (data: GraphData, directed: boolean): Matrix[] => {
  const { nodes, edges } = data;
  const matrix: Matrix[] = [];
  // map node with index in data.nodes
  const nodeMap: {
    [key: string]: number;
  } = {};

  if (!nodes) {
    throw new Error('invalid nodes data!');
  }
  if (nodes) {
    nodes.forEach((node, i) => {
      nodeMap[node.id] = i;
      const row: number[] = [];
      matrix.push(row);
    });
  }

  if (edges) {
    edges.forEach(e => {
      const { source, target } = e;
      const sIndex = nodeMap[source as string];
      const tIndex = nodeMap[target as string];
      matrix[sIndex][tIndex] = 1;
      if (!directed) {
        matrix[tIndex][sIndex] = 1;
      }
    });
  }

  return matrix;
};

/**
 * 平移group
 * @param group Group 实例
 * @param vec 移动向量
 */
export const translate = (group: IGroup, vec: Point) => {
  group.translate(vec.x, vec.y);
};

/**
 * 移动到指定坐标点
 * @param group Group 实例
 * @param point 移动到的坐标点
 */
export const move = (group: IGroup, point: Point, animate?: boolean, animateCfg: GraphAnimateConfig = { duration: 500 }) => {
  let matrix: Matrix = group.getMatrix();
  if (!matrix) {
    matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  }
  const bbox = group.getCanvasBBox();
  const vx = point.x - bbox.minX;
  const vy = point.y - bbox.minY;

  if (animate) {
    const dx = vx * matrix[0];
    const dy = vy * matrix[4];
    let lastX = 0;
    let lastY = 0;
    let newX = 0;
    let newY = 0;
    group.animate((ratio) => {
      newX = dx * ratio;
      newY = dy * ratio;
      matrix = transform(matrix, [['t', newX - lastX, newY - lastY]]);
      lastX = newX;
      lastY = newY;
      return { matrix };
    }, animateCfg);
  } else {
    const movedMatrix = transform(matrix, [['t', vx, vy]]);
    group.setMatrix(movedMatrix);
  }
};

/**
 * 缩放 group
 * @param group Group 实例
 * @param point 在x 和 y 方向上的缩放比例
 */
export const scale = (group: IGroup, ratio: number | number[]) => {
  let matrix: Matrix = group.getMatrix();
  if (!matrix) {
    matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  }

  let scaleXY = ratio;
  if (!isArray(ratio)) {
    scaleXY = [ratio, ratio];
  }

  if (isArray(ratio) && ratio.length === 1) {
    scaleXY = [ratio[0], ratio[0]];
  }

  matrix = transform(matrix, [['s', (scaleXY as number[])[0], (scaleXY as number[])[1]]]);

  group.setMatrix(matrix);
};

/**
 *
 * @param group Group 实例
 * @param ratio 选择角度
 */
export const rotate = (group: IGroup, angle: number) => {
  let matrix: Matrix = group.getMatrix();
  if (!matrix) {
    matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  }
  matrix = transform(matrix, [['r', angle]]);

  group.setMatrix(matrix);
};

export const getDegree = (n: number, nodeIdxMap: NodeIdxMap, edges: EdgeConfig[]): number[] => {
  const degrees: number[] = [];
  for (let i = 0; i < n; i++) {
    degrees[i] = 0;
  }
  edges.forEach(e => {
    if (e.source) {
      degrees[nodeIdxMap[e.source]] += 1;
    }
    if (e.target) {
      degrees[nodeIdxMap[e.target]] += 1;
    }
  });
  return degrees;
};

// 判断点Q是否在p1和p2的线段上
function onSegment(p1, p2, q) {
  if (
    (q[0] - p1[0]) * (p2[1] - p1[1]) === (p2[0] - p1[0]) * (q[1] - p1[1]) &&
    Math.min(p1[0], p2[0]) <= q[0] &&
    q[0] <= Math.max(p1[0], p2[0]) &&
    Math.min(p1[1], p2[1]) <= q[1] &&
    q[1] <= Math.max(p1[1], p2[1])
  ) {
    return true;
  }
  return false;
}

/**
 * 判断点P在多边形内-射线法. Borrow from https://github.com/antvis/util/blob/master/packages/path-util/src/point-in-polygon.ts
 * @param points
 * @param x
 * @param y
 */
export const isPointInPolygon = (points: number[][], x: number, y: number) => {
  let isHit = false;
  const n = points.length;
  // 判断两个double在eps精度下的大小关系
  const tolerance = 1e-6;
  function dcmp(xValue) {
    if (Math.abs(xValue) < tolerance) {
      return 0;
    }
    return xValue < 0 ? -1 : 1;
  }
  if (n <= 2) {
    // svg 中点小于 3 个时，不显示，也无法被拾取
    return false;
  }
  for (let i = 0; i < n; i++) {
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    if (onSegment(p1, p2, [x, y])) {
      // 点在多边形一条边上
      return true;
    }
    // 前一个判断min(p1[1],p2[1])<P.y<=max(p1[1],p2[1])
    // 后一个判断被测点 在 射线与边交点 的左边
    if (
      dcmp(p1[1] - y) > 0 !== dcmp(p2[1] - y) > 0 &&
      dcmp(x - ((y - p1[1]) * (p1[0] - p2[0])) / (p1[1] - p2[1]) - p1[0]) < 0
    ) {
      isHit = !isHit;
    }
  }
  return isHit;
};

// 判断两个BBox是否相交
export const intersectBBox = (box1: Partial<IBBox>, box2: Partial<IBBox>) => {
  return !(
    box2.minX > box1.maxX ||
    box2.maxX < box1.minX ||
    box2.minY > box1.maxY ||
    box2.maxY < box1.minY
  );
};

const lineIntersectPolygon = (lines, line) => {
  let isIntersect = false;
  each(lines, l => {
    if (getLineIntersect(l.from, l.to, line.from, line.to)) {
      isIntersect = true;
      return false;
    }
  });
  return isIntersect;
};

/**
 * 判断两个polygon是否相交。
 * borrow from @antv/path-util
 * @param points1 polygon1的顶点数组
 * @param points2 polygon2的顶点数组
 */
export const isPolygonsIntersect = (points1: number[][], points2: number[][]): boolean => {
  type BBox = Partial<IBBox>;
  const getBBox = (points): BBox => {
    const xArr = points.map(p => p[0]);
    const yArr = points.map(p => p[1]);
    return {
      minX: Math.min.apply(null, xArr),
      maxX: Math.max.apply(null, xArr),
      minY: Math.min.apply(null, yArr),
      maxY: Math.max.apply(null, yArr),
    };
  };

  const parseToLines = (points: number[][]) => {
    const lines = [];
    const count = points.length;
    for (let i = 0; i < count - 1; i++) {
      const point = points[i];
      const next = points[i + 1];
      lines.push({
        from: {
          x: point[0],
          y: point[1],
        },
        to: {
          x: next[0],
          y: next[1],
        },
      });
    }
    if (lines.length > 1) {
      const first = points[0];
      const last = points[count - 1];
      lines.push({
        from: {
          x: last[0],
          y: last[1],
        },
        to: {
          x: first[0],
          y: first[1],
        },
      });
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
  each(points2, point => {
    if (isPointInPolygon(points1, point[0], point[1])) {
      isIn = true;
      return false;
    }
  });
  if (isIn) {
    return true;
  }
  each(points1, point => {
    if (isPointInPolygon(points2, point[0], point[1])) {
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
  each(lines2, line => {
    if (lineIntersectPolygon(lines1, line)) {
      isIntersect = true;
      return false;
    }
  });
  return isIntersect;
};

export class Line {
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
      x: minX,
      y: minY,
      minX,
      minY,
      maxX,
      maxY,
      width: maxX - minX,
      height: maxY - minY,
    };
    return res;
  }
}

export const getBBoxBoundLine = (bbox: IBBox, direction: string) => {
  const bounds = {
    top: [bbox.minX, bbox.minY, bbox.maxX, bbox.minY],
    left: [bbox.minX, bbox.minY, bbox.minX, bbox.maxY],
    bottom: [bbox.minX, bbox.maxY, bbox.maxX, bbox.maxY],
    right: [bbox.maxX, bbox.minY, bbox.maxX, bbox.maxY],
  };
  return bounds[direction];
};

/**
 * 计算两条线段相交时，相交点对第一条线段上的分割比例
 */
const fractionAlongLineA = (la: Line, lb: Line) => {
  const uaT = (lb.x2 - lb.x1) * (la.y1 - lb.y1) - (lb.y2 - lb.y1) * (la.x1 - lb.x1);
  const ubT = (la.x2 - la.x1) * (la.y1 - lb.y1) - (la.y2 - la.y1) * (la.x1 - lb.x1);
  const uB = (lb.y2 - lb.y1) * (la.x2 - la.x1) - (lb.x2 - lb.x1) * (la.y2 - la.y1);
  if (uB) {
    const ua = uaT / uB;
    const ub = ubT / uB;
    if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
      return ua;
    }
  }
  return Number.POSITIVE_INFINITY;
};

export const itemIntersectByLine = (item: Item, line: Line): [IPoint[], number] => {
  const directions = ['top', 'left', 'bottom', 'right'];
  const bbox = item.getBBox();
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

export const fractionToLine = (item: Item, line: Line) => {
  const directions = ['top', 'left', 'bottom', 'right'];
  const bbox = item.getBBox();
  let minDistance = Number.POSITIVE_INFINITY;
  let countIntersections = 0;
  for (let i = 0; i < 4; i++) {
    const [x1, y1, x2, y2] = getBBoxBoundLine(bbox, directions[i]);
    let testDistance = fractionAlongLineA(line, new Line(x1, y1, x2, y2));
    testDistance = Math.abs(testDistance - 0.5);
    if (testDistance >= 0 && testDistance <= 1) {
      countIntersections += 1;
      minDistance = testDistance < minDistance ? testDistance : minDistance;
    }
  }

  if (countIntersections === 0) return -1;
  return minDistance;
};

export const getPointsCenter = (points: IPoint[]): IPoint => {
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

export const squareDist = (a: IPoint, b: IPoint): number => {
  return (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
};

export const pointLineSquareDist = (point: IPoint, line: Line) => {
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

export const isPointsOverlap = (p1, p2, e = 1e-3) => {
  return (p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2 < e ** 2;
};

/**
 * 点到矩形的距离的平方：矩形内部点视作距离为0，外部的点若投影落在矩形边上则为点到矩形边的最近的垂直距离，否则为点到矩形顶点的距离，
 * @param point IPoint
 * @param rect IRect
 */
export const pointRectSquareDist = (point: Point, rect: IRect) => {
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
  const dx = Math.min(Math.abs(rect.x - point.x), Math.abs(rect.x + rect.width - point.x));
  const dy = Math.min(Math.abs(rect.y - point.y), Math.abs(rect.y + rect.height - point.y));
  return dx * dx + dy * dy;
};

/**
 * point to line distance
 * @param  {array} line 线的四个顶点 [x1, y1, x2, y2]
 * @param  {object} point 坐标点 {x, y}
 * @return {Number|NaN} distance
 */
export const pointLineDistance = (line, point) => {
  const [x1, y1, x2, y2] = line;
  const { x, y } = point;
  const d = [x2 - x1, y2 - y1];
  if (vec2.exactEquals(d as any, [0, 0])) {
    return NaN;
  }

  const u = [-d[1], d[0]];
  // @ts-ignore
  vec2.normalize(u, u);
  const a = [x - x1, y - y1];
  // @ts-ignore
  return Math.abs(vec2.dot(a, u));
};


/**
 * Linearly interpolate between start and end, where alpha is the percent distance along the line.
 * alpha = 0 will be start, and alpha = 1 will be end.
 * @param {number} start
 * @param {number} end
 * @param {number} alpha interpolation factor, typically in the closed interval [0, 1]
 * @returns {number}
 */
export const lerp = (start: number, end: number, alpha: number): number => {
  return start + (end - start) * alpha;
}

/**
 * Linearly interpolate between start and end arrays, where alpha is the percent distance along the line.
 * alpha = 0 will be start, and alpha = 1 will be end.
 * @param {number[]} start
 * @param {number[]} end
 * @param {number} alpha interpolation factor, typically in the closed interval [0, 1]
 * @returns {number[]}
 */
export const lerpArray = (start: number[], end: number[], alpha: number): number[] => {
  const len = Math.min(start.length, end.length);
  const out = new Array(len);
  for (let i = 0; i < len; i++) {
    out[i] = lerp(start[i], end[i], alpha);
  }
  return out;
}


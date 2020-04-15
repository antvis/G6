import { Point } from '@antv/g-base/lib/types';
import { IGroup } from '@antv/g-canvas/lib/interfaces';
import { mat3, transform, vec3 } from '@antv/matrix-util';
import isArray from '@antv/util/lib/is-array';
import { GraphData, ICircle, IEllipse, IRect, Matrix, EdgeConfig, NodeIdxMap } from '../types';

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
const getLineIntersect = (p0: Point, p1: Point, p2: Point, p3: Point): Point | null => {
  const tolerance = 0.001;

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
  const sqrLen0: number = D0.x * D0.x + D0.y * D0.y;
  const sqrLen1: number = D1.x * D1.x + D1.y * D1.y;
  let point: Point | null = null;
  if (sqrKross > tolerance * sqrLen0 * sqrLen1) {
    const s = (E.x * D1.y - E.y * D1.x) / kross;
    const t = (E.x * D0.y - E.y * D0.x) / kross;
    if (isBetween(s, 0, 1) && isBetween(t, 0, 1)) {
      point = {
        x: p0.x + s * D0.x,
        y: p0.y + s * D0.y,
      };
    }
  }
  return point;
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
  const d = Math.sqrt(dx * dx + dy * dy);
  if (d < r) {
    return null;
  }
  const signX = Math.sign(dx);
  const signY = Math.sign(dy);
  const angle = Math.atan(dy / dx);
  return {
    x: cx + Math.abs(r * Math.cos(angle)) * signX,
    y: cy + Math.abs(r * Math.sin(angle)) * signY,
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
  const vector = [point.x, point.y, tag];
  if (!matrix || matrix[0] === NaN) {
    matrix = mat3.create();
  }

  vec3.transformMat3(vector, vector, matrix);

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
  if (!matrix || matrix[0] === NaN) {
    matrix = mat3.create();
  }

  let inversedMatrix = mat3.invert([], matrix);
  if (!inversedMatrix) {
    inversedMatrix = mat3.create();
  }
  const vector = [point.x, point.y, tag];
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
  let matrix: Matrix = group.getMatrix();
  if (!matrix) {
    matrix = mat3.create();
  }
  matrix = transform(matrix, [['t', vec.x, vec.y]]);
  group.setMatrix(matrix);
};

/**
 * 移动到指定坐标点
 * @param group Group 实例
 * @param point 移动到的坐标点
 */
export const move = (group: IGroup, point: Point) => {
  let matrix: Matrix = group.getMatrix();
  if (!matrix) {
    matrix = mat3.create();
  }
  const bbox = group.getCanvasBBox();
  const vx = point.x - bbox.minX;
  const vy = point.y - bbox.minY;

  const movedMatrix = transform(matrix, [['t', vx, vy]]);
  group.setMatrix(movedMatrix);
};

/**
 * 缩放 group
 * @param group Group 实例
 * @param point 在x 和 y 方向上的缩放比例
 */
export const scale = (group: IGroup, ratio: number | number[]) => {
  let matrix: Matrix = group.getMatrix();
  if(!matrix) {
    matrix = mat3.create();
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
  if(!matrix) {
    matrix = mat3.create();
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

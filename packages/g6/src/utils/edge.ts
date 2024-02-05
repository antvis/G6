import type { Circle as GCircle } from '@antv/g';
import type { PathArray } from '@antv/util';
import { isEqual, isNumber } from '@antv/util';
import type { EdgeKey, EdgeLabelPosition, EdgeLabelStyleProps, LoopEdgePosition, Node, Point, Vector2 } from '../types';
import { getBBoxHeight, getBBoxWidth } from './bbox';
import { getEllipseIntersectPoint, isCollinear, isHorizontal, parsePoint } from './point';
import {
  add,
  distance,
  manhattanDistance,
  multiply,
  normalize,
  perpendicular,
  scaleAndAdd,
  subtract,
  toVector3,
} from './vector';

/**
 * <zh/> 获取标签的位置样式
 *
 * <en/> Get the style of the label's position
 * @param key - <zh/> 边对象 | <en/> The edge object
 * @param position - <zh/> 标签位置 | <en/> Position of the label
 * @param autoRotate - <zh/> 是否自动旋转 | <en/> Whether to auto-rotate
 * @param offsetX - <zh/> 标签相对于边的水平偏移量 | <en/> Horizontal offset of the label relative to the edge
 * @param offsetY - <zh/> 标签相对于边的垂直偏移量 | <en/> Vertical offset of the label relative to the edge
 * @returns <zh/> 标签的位置样式 | <en/> Returns the style of the label's position
 */
export function getLabelPositionStyle(
  key: EdgeKey,
  position: EdgeLabelPosition,
  autoRotate: boolean,
  offsetX: number,
  offsetY: number,
): Partial<EdgeLabelStyleProps> {
  const START_RATIO = 0;
  const MIDDLE_RATIO = 0.5;
  const END_RATIO = 0.99;

  let ratio = typeof position === 'number' ? position : MIDDLE_RATIO;
  if (position === 'start') ratio = START_RATIO;
  if (position === 'end') ratio = END_RATIO;

  const point = parsePoint(key.getPoint(ratio));
  const pointOffset = parsePoint(key.getPoint(ratio + 0.01));

  let textAlign: 'left' | 'right' | 'center' = position === 'start' ? 'left' : position === 'end' ? 'right' : 'center';

  if (isHorizontal(point, pointOffset) || !autoRotate) {
    const [x, y] = getXYByPosition(key, ratio, offsetX, offsetY);
    return { x, y, textAlign };
  }

  let angle = Math.atan2(pointOffset[1] - point[1], pointOffset[0] - point[0]);

  const isRevert = pointOffset[0] < point[0];
  if (isRevert) {
    textAlign = textAlign === 'center' ? textAlign : textAlign === 'left' ? 'right' : 'left';
    offsetX! *= -1;
    angle += Math.PI;
  }

  const [x, y] = getXYByPosition(key, ratio, offsetX, offsetY, angle);
  const transform = `rotate(${(angle / Math.PI) * 180}deg)`;

  return {
    x,
    y,
    textAlign,
    transform,
  };
}

/**
 * <zh/> 获取给定边上的指定位置的坐标
 *
 * <en/> Get the coordinates at the specified position on the given edge
 * @param key - <zh/> 边实例 | <en/> Edge instance
 * @param ratio - <zh/> 位置比率 | <en/> Position ratio
 * @param offsetX - <zh/> 水平偏移量 | <en/> Horizontal offset
 * @param offsetY - <zh/> 垂直偏移量 | <en/> Vertical offset
 * @param angle - <zh/> 旋转角度 | <en/> Rotation angle
 * @returns <zh/> 坐标 | <en/> Coordinates
 */
function getXYByPosition(key: EdgeKey, ratio: number, offsetX: number, offsetY: number, angle?: number) {
  const [pointX, pointY] = parsePoint(key.getPoint(ratio));
  let actualOffsetX = offsetX;
  let actualOffsetY = offsetY;

  if (angle) {
    actualOffsetX = offsetX * Math.cos(angle) - offsetY * Math.sin(angle);
    actualOffsetY = offsetX * Math.sin(angle) + offsetY * Math.cos(angle);
  }

  return [pointX + actualOffsetX, pointY + actualOffsetY];
}

/** ==================== Quadratic Edge =========================== */

/**
 * <zh/> 获取二次贝塞尔曲线绘制路径
 *
 * <en/> Calculate the path for drawing a quadratic Bessel curve
 * @param sourcePoint - <zh/> 边的起点 | <en/> Source point
 * @param targetPoint - <zh/> 边的终点 | <en/> Target point
 * @param curvePosition - <zh/> 控制点在连线上的相对位置（取值范围为 0-1） | <en/> The relative position of the control point on the line (value range from 0 to 1)
 * @param curveOffset - <zh/> 控制点距离两端点连线的距离 | <en/> The distance between the control point and the line
 * @param controlPoint - <zh/> 控制点 | <en/> Control point
 * @returns <zh/> 返回绘制曲线的路径 | <en/> Returns curve path
 */
export function getQuadraticPath(
  sourcePoint: Point,
  targetPoint: Point,
  curvePosition: number,
  curveOffset: number,
  controlPoint?: Point,
): PathArray {
  const actualControlPoint =
    controlPoint || calculateControlPoint(sourcePoint, targetPoint, curvePosition, curveOffset);

  return [
    ['M', sourcePoint[0], sourcePoint[1]],
    ['Q', actualControlPoint[0], actualControlPoint[1], targetPoint[0], targetPoint[1]],
  ];
}

/**
 * <zh/> 计算曲线的控制点
 *
 * <en/> Calculate the control point of Quadratic Bessel curve
 * @param sourcePoint - <zh/> 起点 | <en/> Source point
 * @param targetPoint - <zh/> 终点 | <en/> Target point
 * @param curvePosition - <zh/> 控制点在连线上的相对位置（取值范围为 0-1） | <en/> The relative position of the control point on the line (value range from 0 to 1)
 * @param curveOffset - <zh/> 控制点距离两端点连线的距离 | <en/> The distance between the control point and the line
 * @returns <zh/> 控制点 | <en/> Control points
 */
export function calculateControlPoint(
  sourcePoint: Point,
  targetPoint: Point,
  curvePosition: number,
  curveOffset: number,
): Point {
  const lineVector = subtract(targetPoint, sourcePoint);
  const controlPoint: Point = [
    sourcePoint[0] + curvePosition * lineVector[0],
    sourcePoint[1] + curvePosition * lineVector[1],
  ];
  const perpVector = normalize(perpendicular(lineVector as Vector2));
  controlPoint[0] += curveOffset * perpVector[0];
  controlPoint[1] += curveOffset * perpVector[1];
  return controlPoint;
}

/** ==================== Cubic Edge =========================== */

/**
 * <zh/> 解析控制点距离两端点连线的距离 `curveOffset`
 *
 * <en/> parse the distance of the control point from the line `curveOffset`
 * @param curveOffset - <zh/> curveOffset | <en/> curveOffset
 * @returns <zh/> 标准 curveOffset | <en/> standard curveOffset
 */
export function parseCurveOffset(curveOffset: number | [number, number]): [number, number] {
  if (isNumber(curveOffset)) return [curveOffset, -curveOffset];
  return curveOffset;
}

/**
 * <zh/> 解析控制点在两端点连线上的相对位置 `curvePosition`，范围为`0-1`
 *
 * <en/> parse the relative position of the control point on the line `curvePosition`
 * @param curvePosition - <zh/> curvePosition | <en/> curvePosition
 * @returns <zh/> 标准 curvePosition | <en/> standard curvePosition
 */
export function parseCurvePosition(curvePosition: number | [number, number]): [number, number] {
  if (isNumber(curvePosition)) return [curvePosition, 1 - curvePosition];
  return curvePosition;
}

/**
 * <zh/> 获取三次贝塞尔曲线绘制路径
 *
 * <en/> Calculate the path for drawing a cubic Bessel curve
 * @param sourcePoint - <zh/> 边的起点 | <en/> Source point
 * @param targetPoint - <zh/> 边的终点 | <en/> Target point
 * @param controlPoints - <zh/> 控制点 | <en/> Control point
 * @returns <zh/> 返回绘制曲线的路径 | <en/> Returns curve path
 */
export function getCubicPath(sourcePoint: Point, targetPoint: Point, controlPoints: [Point, Point]): PathArray {
  return [
    ['M', sourcePoint[0], sourcePoint[1]],
    [
      'C',
      controlPoints[0][0],
      controlPoints[0][1],
      controlPoints[1][0],
      controlPoints[1][1],
      targetPoint[0],
      targetPoint[1],
    ],
  ];
}

/** ==================== Polyline Edge =========================== */

/**
 * <zh/> 获取折线的绘制路径
 *
 * <en/> Calculates the path for drawing a polyline
 * @param sourcePoint - <zh/> 边的起点 | <en/> Source point
 * @param targetPoint - <zh/> 边的终点 | <en/> Target point
 * @param controlPoints - <zh/> 控制点 | <en/> Control point
 * @param radius - <zh/> 圆角半径 | <en/> Radius of the rounded corner
 * @returns <zh/> 返回绘制折线的路径 | <en/> Returns the path for drawing a polyline
 */
export function getPolylinePath(
  sourcePoint: Point,
  targetPoint: Point,
  controlPoints: Point[],
  radius: number,
): PathArray {
  const pathArray: PathArray = [['M', sourcePoint[0], sourcePoint[1]]];
  controlPoints.forEach((midPoint, i) => {
    const prevPoint = controlPoints[i - 1] || sourcePoint;
    const nextPoint = controlPoints[i + 1] || targetPoint;
    if (!isCollinear(prevPoint, midPoint, nextPoint) && radius) {
      const [ps, pt] = getBorderRadiusPoints(prevPoint, midPoint, nextPoint, radius);
      pathArray.push(['L', ps[0], ps[1]], ['Q', midPoint[0], midPoint[1], pt[0], pt[1]], ['L', pt[0], pt[1]]);
    } else {
      pathArray.push(['L', midPoint[0], midPoint[1]]);
    }
  });
  pathArray.push(['L', targetPoint[0], targetPoint[1]]);
  return pathArray;
}

/**
 * <zh/> 根据给定的半径计算出不共线的三点生成贝塞尔曲线的控制点，以模拟接近圆弧
 *
 * <en/> Calculates the control points of the Bezier curve generated by three non-collinear points according to the given radius to simulate an arc
 * @param prevPoint - <zh/> 前一个点 | <en/> Previous point
 * @param midPoint - <zh/> 中间点 | <en/> Middle point
 * @param nextPoint - <zh/> 后一个点 | <en/> Next point
 * @param radius - <zh/> 圆角半径 | <en/> Radius of the rounded corner
 * @returns <zh/> 返回控制点 | <en/> Returns control points
 */
function getBorderRadiusPoints(prevPoint: Point, midPoint: Point, nextPoint: Point, radius: number): [Point, Point] {
  const d0 = manhattanDistance(prevPoint, midPoint);
  const d1 = manhattanDistance(nextPoint, midPoint);
  // 取给定的半径和最小半径之间的较小值 | use the smaller value between the given radius and the minimum radius
  const r = Math.min(radius, Math.min(d0, d1) / 2);
  const ps: Point = [
    midPoint[0] - (r / d0) * (midPoint[0] - prevPoint[0]),
    midPoint[1] - (r / d0) * (midPoint[1] - prevPoint[1]),
  ];
  const pt: Point = [
    midPoint[0] - (r / d1) * (midPoint[0] - nextPoint[0]),
    midPoint[1] - (r / d1) * (midPoint[1] - nextPoint[1]),
  ];
  return [ps, pt];
}

/** ==================== Loop Edge =========================== */

const QUARTER_PI = Math.PI / 8;

const radians: Record<LoopEdgePosition, [number, number]> = {
  top: [-5 * QUARTER_PI, -3 * QUARTER_PI],
  'top-right': [-3 * QUARTER_PI, -QUARTER_PI],
  'right-top': [-3 * QUARTER_PI, -QUARTER_PI],
  right: [-QUARTER_PI, QUARTER_PI],
  'bottom-right': [QUARTER_PI, 3 * QUARTER_PI],
  'right-bottom': [QUARTER_PI, 3 * QUARTER_PI],
  bottom: [3 * QUARTER_PI, 5 * QUARTER_PI],
  'bottom-left': [5 * QUARTER_PI, 7 * QUARTER_PI],
  'left-bottom': [5 * QUARTER_PI, 7 * QUARTER_PI],
  left: [7 * QUARTER_PI, 9 * QUARTER_PI],
  'top-left': [-7 * QUARTER_PI, -5 * QUARTER_PI],
  'left-top': [-7 * QUARTER_PI, -5 * QUARTER_PI],
};

/**
 * <zh/> 获取环形边的起点和终点
 *
 * <en/> Get the start and end points of the loop edge
 * @param node - <zh/> 节点实例 | <en/> Node instance
 * @param position - <zh/> 环形边的位置 | <en/> The position of the loop edge
 * @param clockwise - <zh/> 是否顺时针 | <en/> Whether to draw the loop clockwise
 * @param sourceAnchor - <zh/> 起点锚点 | <en/> Source anchor
 * @param targetAnchor - <zh/> 终点锚点 | <en/> Target anchor
 * @param rawSourcePoint - <zh/> 起点 | <en/> Source point
 * @param rawTargetPoint - <zh/> 终点 | <en/> Target point
 * @returns <zh/> 起点和终点 | <en/> Start and end points
 */
export function getLoopEndpoints(
  node: Node,
  position: LoopEdgePosition,
  clockwise: boolean,
  sourceAnchor?: GCircle,
  targetAnchor?: GCircle,
  rawSourcePoint?: Point,
  rawTargetPoint?: Point,
): [Point, Point] {
  const bbox = node.getKey().getBounds();
  const center = node.getCenter();

  let sourcePoint = rawSourcePoint || sourceAnchor?.getPosition();
  let targetPoint = rawTargetPoint || targetAnchor?.getPosition();

  if (!sourcePoint || !targetPoint) {
    const angle1 = radians[position][0];
    const angle2 = radians[position][1];
    const r = Math.max(getBBoxWidth(bbox), getBBoxHeight(bbox));
    const point1: Point = add(center, [r * Math.cos(angle1), r * Math.sin(angle1), 0]);
    const point2: Point = add(center, [r * Math.cos(angle2), r * Math.sin(angle2), 0]);

    sourcePoint = node.getIntersectPoint(point1);
    targetPoint = node.getIntersectPoint(point2);

    if (!clockwise) {
      [sourcePoint, targetPoint] = [targetPoint, sourcePoint];
    }
  }

  return [sourcePoint, targetPoint];
}

/**
 * <zh/> 获取环形边的控制点
 *
 * <en/> Get the control points of the loop edge
 * @param node - <zh/> 节点实例 | <en/> Node instance
 * @param sourcePoint - <zh/> 起点 | <en/> Source point
 * @param targetPoint - <zh/> 终点 | <en/> Target point
 * @param dist - <zh/> 从节点 keyShape 边缘到自环顶部的距离 | <en/> The distance from the edge of the node keyShape to the top of the self-loop
 * @returns <zh/> 控制点 | <en/> Control points
 */
export function getLoopControlPoints(
  node: Node,
  sourcePoint: Point,
  targetPoint: Point,
  dist?: number,
): [Point, Point] {
  const bbox = node.getKey().getBounds();
  const center = node.getCenter();
  const offset = dist || Math.max(getBBoxWidth(bbox), getBBoxHeight(bbox));

  const extendVector = (from: Point, to: Point, s: number) => {
    to = toVector3(to);
    const v = subtract(to, from);
    const st = 1 + s / distance(to, from);
    return scaleAndAdd(from, v, st);
  };

  if (isEqual(sourcePoint, targetPoint)) {
    const direction = subtract(sourcePoint, center);
    const adjustment: Point = [
      offset * Math.sign(direction[0]) || offset / 2,
      offset * Math.sign(direction[1]) || -offset / 2,
      0,
    ];
    return [add(sourcePoint, adjustment), add(targetPoint, multiply(adjustment, [1, -1, 1]))];
  }

  return [extendVector(center, sourcePoint, offset), extendVector(center, targetPoint, offset)];
}

/**
 * <zh/> 若存在起点或终点的锚点，则调整起点或终点位置
 *
 * <en/> Adjust the start or end point position if there is an anchor point
 * @param sourcePoint - <zh/> 起点 | <en/> Source point
 * @param targetPoint - <zh/> 终点 | <en/> Target point
 * @param controlPoints - <zh/> 控制点 | <en/> Control point
 * @param sourceAnchor - <zh/> 起点锚点 | <en/> Source anchor
 * @param targetAnchor - <zh/> 终点锚点 | <en/> Target anchor
 * @returns <zh/> 调整后的起点和终点 | <en/> Adjusted start and end points
 */
export function adjustLoopEndpointsIfNeed(
  sourcePoint: Point,
  targetPoint: Point,
  controlPoints: [Point, Point],
  sourceAnchor?: GCircle,
  targetAnchor?: GCircle,
) {
  if (sourceAnchor) {
    sourcePoint = getEllipseIntersectPoint(controlPoints[0], sourceAnchor.getBounds());
  }

  if (targetAnchor) {
    targetPoint = getEllipseIntersectPoint(controlPoints[1], targetAnchor.getBounds());
  }
  return [sourcePoint, targetPoint];
}

/**
 * <zh/> 获取自环边的起点、终点和控制点
 *
 * <en/> Get the start, end, and control points of the self-loop edge
 * @param node - <zh/> 节点实例 | <en/> Node instance
 * @param sourceAnchorKey - <zh/> 起点锚点 key | <en/> Source anchor key
 * @param targetAnchorKey - <zh/> 终点锚点 key | <en/> Target anchor key
 * @param rawSourcePoint - <zh/> 起点 | <en/> Source point
 * @param rawTargetPoint - <zh/> 终点 | <en/> Target point
 * @param position - <zh/> 环形边的位置 | <en/> The position of the loop edge
 * @param clockwise - <zh/> 是否顺时针 | <en/> Whether to draw the loop clockwise
 * @param dist - <zh/> 从节点 keyShape 边缘到自环顶部的距离 | <en/> The distance from the edge of the node keyShape to the top of the self-loop
 * @returns <zh/> 起点、终点和控制点 | <en/> Start, end, and control points
 */
export function getLoopPoints(
  node: Node,
  sourceAnchorKey: string,
  targetAnchorKey: string,
  rawSourcePoint: Point,
  rawTargetPoint: Point,
  position: LoopEdgePosition,
  clockwise: boolean,
  dist?: number,
): {
  sourcePoint: Point;
  targetPoint: Point;
  controlPoints: [Point, Point];
} {
  const sourceAnchor = node.getAnchors()[sourceAnchorKey || targetAnchorKey];
  const targetAnchor = node.getAnchors()[targetAnchorKey || sourceAnchorKey];

  let [sourcePoint, targetPoint] = getLoopEndpoints(
    node,
    position,
    clockwise,
    sourceAnchor,
    targetAnchor,
    rawSourcePoint,
    rawTargetPoint,
  );

  const controlPoints = getLoopControlPoints(node, sourcePoint, targetPoint, dist);

  [sourcePoint, targetPoint] = adjustLoopEndpointsIfNeed(
    sourcePoint,
    targetPoint,
    controlPoints,
    sourceAnchor,
    targetAnchor,
  );

  return { sourcePoint, targetPoint, controlPoints };
}

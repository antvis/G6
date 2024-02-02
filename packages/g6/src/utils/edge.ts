import type { PathArray } from '@antv/util';
import { isNumber, pick } from '@antv/util';
import type { Point, Vector2 } from '../types';
import type { EdgeKey, EdgeLabelPosition, EdgeLabelStyleProps } from '../types/edge';
import { isCollinear, isHorizontal, pointObjectToVector } from './point';
import { manhattanDistance, normalize, perpendicular, subtract } from './vector';

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
  offsetX?: number,
  offsetY?: number,
): Partial<EdgeLabelStyleProps> {
  const START_RATIO = 0;
  const MIDDLE_RATIO = 0.5;
  const END_RATIO = 0.99;

  let ratio = typeof position === 'number' ? position : MIDDLE_RATIO;
  if (position === 'start') ratio = START_RATIO;
  if (position === 'end') ratio = END_RATIO;

  const positionStyle: Partial<EdgeLabelStyleProps> = {
    textAlign: position === 'start' ? 'left' : position === 'end' ? 'right' : 'center',
    offsetX,
    offsetY,
  };
  adjustLabelPosition(key, positionStyle, ratio);

  if (autoRotate) applyAutoRotation(key, positionStyle, ratio);

  return pick(positionStyle, ['x', 'y', 'textAlign', 'transform']);
}

/**
 * <zh/> 根据边主体、位置样式、比例和角度计算标签的精确位置
 *
 * <en/> Calculate the precise position of the label based on the edge body, position style, ratio, and angle
 * @param key - <zh/> 边对象 | <en/> The edge object
 * @param positionStyle - <zh/> 标签的位置样式 | <en/> The style of the label's position
 * @param ratio - <zh/> 沿边的比例位置 | <en/> Ratio along the edge
 * @param angle - <zh/> 旋转角度 | <en/> Rotation angle
 */
function adjustLabelPosition(key: EdgeKey, positionStyle: Partial<EdgeLabelStyleProps>, ratio: number, angle?: number) {
  const [pointX, pointY] = pointObjectToVector(key.getPoint(ratio));
  const { offsetX = 0, offsetY = 0 } = positionStyle;

  let actualOffsetX = offsetX;
  let actualOffsetY = offsetY;

  if (angle) {
    actualOffsetX = offsetX * Math.cos(angle) - offsetY * Math.sin(angle);
    actualOffsetY = offsetX * Math.sin(angle) + offsetY * Math.cos(angle);
  }

  positionStyle.x = pointX + actualOffsetX;
  positionStyle.y = pointY + actualOffsetY;
}

/**
 * <zh/> 根据边的方向计算并应用标签的旋转角度
 *
 * <en/> Calculate and apply the rotation angle of the label based on the direction of the edge
 * @param key - <zh/> 边对象 | <en/> The edge object
 * @param positionStyle - <zh/> 标签的位置样式 | <en/> The style of the label's position
 * @param ratio - <zh/> 沿边的比例位置 | <en/> ratio along the edge
 */
function applyAutoRotation(key: EdgeKey, positionStyle: Partial<EdgeLabelStyleProps>, ratio: number) {
  const { textAlign } = positionStyle;
  const point = pointObjectToVector(key.getPoint(ratio));
  const pointOffset = pointObjectToVector(key.getPoint(ratio + 0.01));

  if (isHorizontal(point, pointOffset)) return;

  let angle = Math.atan2(pointOffset[1] - point[1], pointOffset[0] - point[0]);

  const isRevert = pointOffset[0] < point[0];
  if (isRevert) {
    positionStyle.textAlign = textAlign === 'center' ? textAlign : textAlign === 'left' ? 'right' : 'left';
    positionStyle.offsetX! *= -1;
    angle += Math.PI;
  }

  adjustLabelPosition(key, positionStyle, ratio, angle);
  positionStyle.transform = `rotate(${(angle / Math.PI) * 180}deg)`;
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

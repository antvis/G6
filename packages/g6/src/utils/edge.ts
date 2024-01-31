import type { PathArray } from '@antv/util';
import { pick } from '@antv/util';
import type { Point, Vector2 } from '../types';
import type { EdgeKey, EdgeLabelPosition, EdgeLabelStyleProps } from '../types/edge';
import { isHorizontal } from './point';
import { normalize, perpendicular, subtract } from './vector';

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
  const { x: pointX, y: pointY } = key.getPoint(ratio);
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
  const point = key.getPoint(ratio);
  const pointOffset = key.getPoint(ratio + 0.01);

  if (isHorizontal(point, pointOffset)) return;

  let angle = Math.atan2(pointOffset.y - point.y, pointOffset.x - point.x);

  const isRevert = pointOffset.x < point.x;
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
function calculateControlPoint(
  sourcePoint: Point,
  targetPoint: Point,
  curvePosition: number,
  curveOffset: number,
): Point {
  const lineVector = subtract(targetPoint as Vector2, sourcePoint as Vector2);
  const controlPoint: Point = [
    sourcePoint[0] + curvePosition * lineVector[0],
    sourcePoint[1] + curvePosition * lineVector[1],
  ];
  const perpVector = normalize(perpendicular(lineVector));
  controlPoint[0] += curveOffset * perpVector[0];
  controlPoint[1] += curveOffset * perpVector[1];
  return controlPoint;
}

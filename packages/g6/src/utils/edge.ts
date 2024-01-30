import { pick } from '@antv/util';
import type { EdgeKey, EdgeLabelPosition, EdgeLabelStyleProps } from '../types/edge';

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
) {
  const START_RATIO = 0;
  const MIDDLE_RATIO = 0.5;
  const END_RATIO = 0.99;

  let ratio = typeof position === 'number' ? position : MIDDLE_RATIO;
  if (position === 'start') ratio = START_RATIO;
  if (position === 'end') ratio = END_RATIO;

  const positionStyle = initLabelPositionStyle(position!, offsetX, offsetY);
  adjustLabelPosition(key, positionStyle, ratio);

  if (autoRotate) applyAutoRotation(key, positionStyle, ratio);

  return pick(positionStyle, ['x', 'y', 'textAlign', 'transform']);
}

/**
 * <zh/> 基于提供的位置、水平和垂直偏移量设置默认的文本对齐和偏移。
 *
 * <en/> Set the default text alignment and offsets based on the provided position, horizontal, and vertical offsets
 * @param position - <zh/> 标签位置 | <en/> Position of the label
 * @param offsetX - <zh/> 标签相对于边的水平偏移量 | <en/> Horizontal offset of the label relative to the edge
 * @param offsetY - <zh/> 标签相对于边的垂直偏移量 | <en/> Vertical offset of the label relative to the edge
 * @returns
 */
function initLabelPositionStyle(
  position: EdgeLabelPosition,
  offsetX?: number,
  offsetY?: number,
): Partial<EdgeLabelStyleProps> {
  const DEFAULT_OFFSET = 4;
  return {
    textAlign: position === 'start' ? 'left' : position === 'end' ? 'right' : 'center',
    offsetX: offsetX ?? DEFAULT_OFFSET,
    offsetY: offsetY ?? DEFAULT_OFFSET,
  };
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

  if (angle) {
    positionStyle.x = pointX + offsetX * Math.cos(angle) - offsetY * Math.sin(angle);
    positionStyle.y = pointY + offsetX * Math.sin(angle) + offsetY * Math.cos(angle);
  } else {
    positionStyle.x = pointX + offsetX;
    positionStyle.y = pointY + offsetY;
  }
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
  let angle = Math.atan2(pointOffset.y - point.y, pointOffset.x - point.x);

  if (isNaN(angle)) angle = 0;

  const isRevert = pointOffset.x < point.x;
  if (isRevert) {
    positionStyle.textAlign = textAlign === 'center' ? textAlign : textAlign === 'left' ? 'right' : 'left';
    positionStyle.offsetX! *= -1;
    angle += Math.PI;
  }

  if (angle % Math.PI === 0) return;

  adjustLabelPosition(key, positionStyle, ratio, angle);
  positionStyle.transform = `rotate(${(angle / Math.PI) * 180}deg)`;
}

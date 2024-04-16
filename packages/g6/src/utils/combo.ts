import { AABB } from '@antv/g';
import type { BaseComboStyleProps } from '../elements/combos/base-combo';
import type { Point, Position, Size } from '../types';
import { getXYByAnchor } from './position';
import { parseSize } from './size';

/**
 * <zh/> 获取矩形 Combo 收起时原点的相对位置
 *
 * <en/> Get the relative position of the origin when Rect Combo is collapsed
 * @param collapsedOrigin - <zh/> 收起时的原点 | <en/> origin when collapsed
 * @param collapsedSize - <zh/> 收起尺寸 | <en/> collapsed size
 * @param expandedSize - <zh/> 展开尺寸 | <en/> expanded size
 * @returns <zh/> 收起时的原点 | <en/> origin when collapsed
 */
export function getRectCollapsedOrigin(
  collapsedOrigin: BaseComboStyleProps['collapsedOrigin'],
  collapsedSize: Size,
  expandedSize: Size,
): Position {
  if (Array.isArray(collapsedOrigin)) return collapsedOrigin;
  const [expandedWidth, expandedHeight] = parseSize(expandedSize);
  const [collapsedWidth, collapsedHeight] = parseSize(collapsedSize);
  const widthRatio = collapsedWidth / 2 / expandedWidth;
  const heightRatio = collapsedHeight / 2 / expandedHeight;
  switch (collapsedOrigin) {
    case 'top':
      return [0.5, heightRatio];
    case 'bottom':
      return [0.5, 1 - heightRatio];
    case 'left':
      return [widthRatio, 0.5];
    case 'right':
      return [1 - widthRatio, 0.5];
    case 'top-left':
    case 'left-top':
      return [widthRatio, heightRatio];
    case 'top-right':
    case 'right-top':
      return [1 - widthRatio, heightRatio];
    case 'bottom-left':
    case 'left-bottom':
      return [widthRatio, 1 - heightRatio];
    case 'bottom-right':
    case 'right-bottom':
      return [1 - widthRatio, 1 - heightRatio];
    default:
      return [0.5, 0.5];
  }
}

/**
 * <zh/> 获取圆形 Combo 收起时原点的相对位置
 *
 * <en/> Get the relative position of the origin when Circle Combo is collapsed
 * @param collapsedOrigin - <zh/> 收起时的原点 | <en/> origin when collapsed
 * @param collapsedSize - <zh/> 收起尺寸 | <en/> collapsed size
 * @param expandedSize - <zh/> 展开尺寸 | <en/> expanded size
 * @returns <zh/> 收起时的原点 | <en/> origin when collapsed
 */
export function getCircleCollapsedOrigin(
  collapsedOrigin: BaseComboStyleProps['collapsedOrigin'],
  collapsedSize: Size,
  expandedSize: Size,
): Position {
  if (Array.isArray(collapsedOrigin)) return collapsedOrigin;
  const expandedWidth = parseSize(expandedSize)[0];
  const expandedR = expandedWidth / 2;
  const collapsedR = parseSize(collapsedSize)[0] / 2;
  const ratio = collapsedR / expandedWidth;
  switch (collapsedOrigin) {
    case 'top':
      return [0.5, ratio];
    case 'bottom':
      return [0.5, 1 - ratio];
    case 'left':
      return [ratio, 0.5];
    case 'right':
      return [1 - ratio, 0.5];
    default:
      break;
  }
  // 收起时原点到中心的正交距离
  const orthDist = (expandedR - collapsedR) * (Math.sqrt(2) / 2);
  const orthRatio = orthDist / expandedWidth;
  switch (collapsedOrigin) {
    case 'top-left':
    case 'left-top':
      return [0.5 - orthRatio, 0.5 - orthRatio];
    case 'top-right':
    case 'right-top':
      return [0.5 + orthRatio, 0.5 - orthRatio];
    case 'bottom-left':
    case 'left-bottom':
      return [0.5 - orthRatio, 0.5 + orthRatio];
    case 'bottom-right':
    case 'right-bottom':
      return [0.5 + orthRatio, 0.5 + orthRatio];
    default:
      return [0.5, 0.5];
  }
}

/**
 * <zh/> 计算 Combo 收起时原点的实际位置
 *
 * <en/> Calculate the actual position of the origin after the Combo is collapsed
 * @param collapsedOrigin - <zh/> 收起时的原点 | <en/> origin when collapsed
 * @param center - <zh/> 中心点 | <en/> center
 * @param collapsedSize - <zh/> 折叠尺寸 | <en/> folding size
 * @param expandedSize - <zh/> 展开尺寸 | <en/> expanded size
 * @param getCollapsedOrigin - <zh/> 获取原点相对位置的函数 | <en/> function to get the relative position of the origin
 * @returns <zh/> 原点实际位置 | <en/> actual position of the origin
 */
export function getXYByCollapsedOrigin(
  collapsedOrigin: BaseComboStyleProps['collapsedOrigin'],
  center: Point,
  collapsedSize: Size,
  expandedSize: Size,
  getCollapsedOrigin: (
    collapsedOrigin: BaseComboStyleProps['collapsedOrigin'],
    collapsedSize: Size,
    expandedSize: Size,
  ) => Position = getRectCollapsedOrigin,
): Position {
  const origin = getCollapsedOrigin(collapsedOrigin, collapsedSize, expandedSize);
  const [expandedWidth, expandedHeight] = parseSize(expandedSize);
  const expandedBBox = new AABB();
  expandedBBox.setMinMax(
    [center[0] - expandedWidth / 2, center[1] - expandedHeight / 2, 0],
    [center[0] + expandedWidth / 2, center[1] + expandedHeight / 2, 0],
  );
  return getXYByAnchor(expandedBBox, origin);
}

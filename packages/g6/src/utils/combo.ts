import { AABB } from '@antv/g';
import { isFunction } from '@antv/util';
import type { CollapsedMarkerStyleProps } from '../elements/combos/base-combo';
import type { BaseComboProps, Combo, Node, Point, Position, Size } from '../types';
import type { STDAnchor } from '../types/anchor';
import { getXYByAnchor } from './anchor';
import { isNode } from './element';
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
  collapsedOrigin: BaseComboProps['collapsedOrigin'],
  collapsedSize: Size,
  expandedSize: Size,
): Position {
  if (Array.isArray(collapsedOrigin)) return collapsedOrigin;
  const [expandedWidth, expandedHeight] = parseSize(expandedSize);
  const [collapsedWidth, collapsedHeight] = parseSize(collapsedSize);
  const map: Record<string, STDAnchor> = {
    top: [0.5, collapsedHeight / 2 / expandedHeight],
    bottom: [0.5, 1 - collapsedHeight / 2 / expandedHeight],
    left: [collapsedWidth / 2 / expandedWidth, 0.5],
    right: [1 - collapsedWidth / 2 / expandedWidth, 0.5],
    center: [0.5, 0.5],
    'top-left': [collapsedWidth / 2 / expandedWidth, collapsedHeight / 2 / expandedHeight],
    'top-right': [1 - collapsedWidth / 2 / expandedWidth, collapsedHeight / 2 / expandedHeight],
    'bottom-left': [collapsedWidth / 2 / expandedWidth, 1 - collapsedHeight / 2 / expandedHeight],
    'bottom-right': [1 - collapsedWidth / 2 / expandedWidth, 1 - collapsedHeight / 2 / expandedHeight],
  };
  return map[collapsedOrigin as string] || map.center;
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
  collapsedOrigin: BaseComboProps['collapsedOrigin'],
  collapsedSize: Size,
  expandedSize: Size,
): Position {
  if (Array.isArray(collapsedOrigin)) return collapsedOrigin;
  const expandedR = parseSize(expandedSize)[0] / 2;
  const collapsedR = parseSize(collapsedSize)[0] / 2;
  // 收起时原点到中心的正交距离
  const dist = (expandedR - collapsedR) / Math.sqrt(2);
  const map: Record<string, Position> = {
    top: [0.5, collapsedR / (2 * expandedR)],
    bottom: [0.5, 1 - collapsedR / (2 * expandedR)],
    left: [collapsedR / (2 * expandedR), 0.5],
    right: [1 - collapsedR / (2 * expandedR), 0.5],
    'top-left': [0.5 - dist / (2 * expandedR), 0.5 - dist / (2 * expandedR)],
    'top-right': [0.5 + dist / (2 * expandedR), 0.5 - dist / (2 * expandedR)],
    'bottom-left': [0.5 - dist / (2 * expandedR), 0.5 + dist / (2 * expandedR)],
    'bottom-right': [0.5 + dist / (2 * expandedR), 0.5 + dist / (2 * expandedR)],
  };
  return map[collapsedOrigin as string] || [0.5, 0.5];
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
  collapsedOrigin: BaseComboProps['collapsedOrigin'],
  center: Point,
  collapsedSize: Size,
  expandedSize: Size,
  getCollapsedOrigin: (
    collapsedOrigin: BaseComboProps['collapsedOrigin'],
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

/**
 * <zh/> 获取收起时标记的文本
 *
 * <en/> Get the text of the collapsed marker
 * @param type - <zh/> 收起时标记类型 | <en/> type of the collapsed marker
 * @param children - <zh/> 子元素 | <en/> children
 * @returns <zh/> 收起时标记文本 | <en/> text of the collapsed marker
 */
export function getCollapsedMarkerText(type: CollapsedMarkerStyleProps['type'], children: (Node | Combo)[]) {
  if (type === 'descendant-count') {
    return getDescendantCount(children).toString();
  } else if (type === 'child-count') {
    return children.length.toString();
  } else if (type === 'node-count') {
    return getDescendantCount(children, true).toString();
  } else if (isFunction(type)) {
    return type(children);
  }
  return '';
}

/**
 * <zh/> 获取子孙节点数量
 *
 * <en/> Get the number of descendant nodes
 * @param children - <zh/> 子元素 | <en/> children
 * @param onlyNode - <zh/> 是否只统计 Node 类型的子孙节点| <en/> Whether to only count the descendant nodes of the Node type
 * @returns <zh/> 子孙节点数量 | <en/> number of descendant nodes
 */
export function getDescendantCount(children: (Node | Combo)[], onlyNode = false): number {
  let count = 0;
  for (const child of children) {
    if (!onlyNode || isNode(child)) {
      count += 1;
    }
    if ('children' in child.attributes) {
      count += getDescendantCount(child.attributes.children as (Node | Combo)[], onlyNode);
    }
  }
  return count;
}

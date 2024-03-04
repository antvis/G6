import { AABB } from '@antv/g';
import type { CollapsedMarkerStyleProps } from '../elements/combos/base-combo';
import type { Combo, Node, Point, Size, Vector2 } from '../types';
import { getXYByAnchor } from './anchor';
import { isNode } from './element';
import { parseSize } from './size';

/**
 * <zh/> 计算 Combo 收起后原点的相对位置
 *
 * <en/> Calculate the relative position of the origin after the Combo is collapsed
 * @param collapsedOrigin - <zh/> 收起时的原点 | <en/> origin when collapsed
 * @param collapsedSize - <zh/> 折叠尺寸 | <en/> folding size
 * @param expandedSize - <zh/> 展开尺寸 | <en/> expanded size
 * @returns <zh/> 折叠后的原点 | <en/> origin after folding
 */
export function calculateCollapsedOrigin(
  collapsedOrigin: string | [number, number],
  collapsedSize: Size,
  expandedSize: Size,
): Vector2 {
  if (Array.isArray(collapsedOrigin)) return collapsedOrigin;
  const [expandedWidth, expandedHeight] = parseSize(expandedSize);
  const [collapsedWidth, collapsedHeight] = parseSize(collapsedSize);
  const map: Record<string, [number, number]> = {
    top: [0.5, collapsedHeight / 2 / expandedHeight],
    bottom: [0.5, 1 - collapsedHeight / 2 / expandedHeight],
    left: [collapsedWidth / 2 / expandedWidth, 0.5],
    right: [1 - collapsedWidth / 2 / expandedWidth, 0.5],
    center: [0.5, 0.5],
  };
  return map[collapsedOrigin] || map.center;
}

/**
 * <zh/> 计算 Combo 收起后原点的实际位置
 *
 * <en/> Calculate the actual position of the origin after the Combo is collapsed
 * @param collapsedOrigin - <zh/> 收起时的原点 | <en/> origin when collapsed
 * @param center - <zh/> 中心点 | <en/> center
 * @param collapsedSize - <zh/> 折叠尺寸 | <en/> folding size
 * @param expandedSize - <zh/> 展开尺寸 | <en/> expanded size
 * @returns <zh/> 原点实际位置 | <en/> actual position of the origin
 */
export function getXYByCollapsedOrigin(
  collapsedOrigin: string | [number, number],
  center: Point,
  collapsedSize: Size,
  expandedSize: Size,
): Vector2 {
  const origin = calculateCollapsedOrigin(collapsedOrigin, collapsedSize, expandedSize);
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
  if (type === 'descendantCount') {
    return getDescendantCount(children).toString();
  } else if (type === 'childCount') {
    return children.length.toString();
  } else if (type === 'nodeCount') {
    return getDescendantCount(children, true).toString();
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

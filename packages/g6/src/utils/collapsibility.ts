import type { NodeLikeData } from '../types';

/**
 * <zh/> 判断节点/组合是否收起
 *
 * <en/> Determine whether the node/combo is collapsed
 * @param nodeLike - <zh/>节点/组合数据 | <en/>Node/Combo data
 * @returns <zh/>是否收起 | <en/>Whether it is collapsed
 */
export function isCollapsed(nodeLike: NodeLikeData) {
  return !!nodeLike.style?.collapsed;
}

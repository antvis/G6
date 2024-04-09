import type { AABB } from '@antv/g';
import type { Anchor, NodeLikeData, Placement, Points, Position, RelativePlacement } from '../types';
import { parseAnchor } from './anchor';
import { parsePlacement } from './placement';

/**
 * <zh/> 获取节点/ combo 的位置坐标
 *
 * <en/> Get the position of node/combo
 * @param datum - <zh/> 节点/ combo 的数据 | <en/> data of node/combo
 * @returns - <zh/> 坐标 | <en/> position
 */
export function positionOf(datum: NodeLikeData): Position {
  const { x = 0, y = 0, z = 0 } = datum.style || {};
  return [+x, +y, +z];
}

/**
 * <zh/> 获取相对位置坐标
 *
 * <en/> Get position by relative placement
 * @param bbox - <zh/> 元素包围盒 | <en/> element bounding box
 * @param placement - <zh/> 相对于元素的位置 | <en/> Position relative to element
 * @returns - <zh/> 坐标 | <en/> position
 */
export function getXYByRelativePlacement(bbox: AABB, placement: RelativePlacement): Position {
  const [x, y] = placement;
  const { min, max } = bbox;
  return [min[0] + x * (max[0] - min[0]), min[1] + y * (max[1] - min[1])];
}

/**
 * <zh/> 获取位置坐标
 *
 * <en/> Get position by placement
 * @param bbox - <zh/> 元素包围盒 | <en/> element bounding box
 * @param placement - <zh/> 相对于元素的位置 | <en/> Position relative to element
 * @returns - <zh/> 坐标 | <en/> position
 */
export function getXYByPlacement(bbox: AABB, placement: Placement = 'center'): Position {
  const relativePlacement = parsePlacement(placement);
  return getXYByRelativePlacement(bbox, relativePlacement);
}

/**
 * <zh/> 获取锚点坐标
 *
 * <en/> Get anchor position
 * @param bbox - <zh/> 元素包围盒 | <en/> element bounding box
 * @param anchor - <zh/> 锚点位置 | <en/> Anchor
 * @returns - <zh/> 坐标 | <en/> position
 */
export function getXYByAnchor(bbox: AABB, anchor: Anchor): Position {
  const parsedAnchor = parseAnchor(anchor);
  return getXYByRelativePlacement(bbox, parsedAnchor as RelativePlacement);
}

/**
 * <zh/> 通过 rect points 路径点获取 position 方位配置.
 *
 * <en/> The rect points command is used to obtain the position and orientation configuration.
 * @param points Points
 * @returns `{ left: number; right: number; top: number; bottom: number }`
 */
export const getPositionByRectPoints = (points: Points) => {
  const [p1, p2] = points;
  return {
    left: Math.min(p1[0], p2[0]),
    right: Math.max(p1[0], p2[0]),
    top: Math.min(p1[1], p2[1]),
    bottom: Math.max(p1[1], p2[1]),
  };
};

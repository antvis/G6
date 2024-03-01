import type { AABB } from '@antv/g';
import type { Anchor, STDAnchor } from '../types/anchor';
import { isBetween } from './math';

/**
 * <zh/> 解析原点（锚点）
 *
 * <en/> Parse the origin/anchor
 * @param anchor - <zh/> 原点 | <en/> Anchor
 * @returns <zh/> 标准原点 | <en/> Standard anchor
 */
export function parseAnchor(anchor: Anchor): STDAnchor {
  const parsedAnchor = (
    typeof anchor === 'string' ? anchor.split(' ').map((v) => parseFloat(v)) : anchor.slice(0, 2)
  ) as [number, number];
  if (!isBetween(parsedAnchor[0], 0, 1) || !isBetween(parsedAnchor[1], 0, 1)) {
    return [0.5, 0.5];
  }
  return parsedAnchor;
}

/**
 * <zh/> 获取锚点在 Canvas 坐标系下的位置
 *
 * <en/> Get the position of the anchor in the Canvas coordinate system
 * @param bbox - <zh/> 包围盒 | <en/> Bounding box
 * @param anchor - <zh/> 锚点 | <en/> Anchor
 * @returns <zh/> 在画布上的位置 | <en/> The position on the canvas
 */
export function getXYByAnchor(bbox: AABB, anchor: Anchor): STDAnchor {
  const [anchorX, anchorY] = parseAnchor(anchor);
  const { min, max } = bbox;
  return [min[0] + anchorX * (max[0] - min[0]), min[1] + anchorY * (max[1] - min[1])];
}

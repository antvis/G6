import type { AABB } from '@antv/g';

/**
 * <zh/> 获取包围盒的宽度
 *
 * <en/> Retrieves the width of a bounding box
 * @param bbox - <zh/> 包围盒 | <en/> Bounding box
 * @returns <zh/> 包围盒的宽度 | <en/> Width of box
 */
export function getBBoxWidth(bbox: AABB) {
  return bbox.max[0] - bbox.min[0];
}

/**
 * <zh/> 获取包围盒的高度
 *
 * <en/> Retrieve the height of a bounding box
 * @param bbox - <zh/> 包围盒 | <en/> Bounding box
 * @returns <zh/> 包围盒的高度 | <en/> Height of box
 */
export function getBBoxHeight(bbox: AABB) {
  return bbox.max[1] - bbox.min[1];
}

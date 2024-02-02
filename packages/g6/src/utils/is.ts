import type { EdgeData } from '../spec';
import type { Point, Vector2, Vector3 } from '../types';
import type { ElementData } from '../types/data';

/**
 * <zh/> 判断是否为边数据
 *
 * <en/> judge whether the data is edge data
 * @param data - <zh/> 元素数据 | <en/> element data
 * @returns - <zh/> 是否为边数据 | <en/> whether the data is edge data
 */
export function isEdgeData(data: Partial<ElementData>): data is EdgeData {
  if ('source' in data && 'target' in data) return true;
  return false;
}

/**
 * <zh/> 判断是否为二维向量
 *
 * <en/> Judge whether the vector is 2d
 * @param vector - <zh/> 向量 | <en/> vector
 * @returns <zh/> 是否为二维向量 | <en/> whether the vector is 2d
 */
export function isVector2(vector: Point): vector is Vector2 {
  return vector.length === 2;
}

/**
 * <zh/> 判断是否为三维向量
 *
 * <en/> Judge whether the vector is 3d
 * @param vector - <zh/> 向量 | <en/> vector
 * @returns <zh/> 是否为三维向量 | <en/> whether the vector is 3d
 */
export function isVector3(vector: Point): vector is Vector3 {
  return vector.length === 3;
}

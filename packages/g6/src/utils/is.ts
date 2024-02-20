import type { EdgeData } from '../spec';
import type { ElementDatum, Point, Vector2, Vector3 } from '../types';

/**
 * <zh/> 判断是否为边数据
 *
 * <en/> judge whether the data is edge data
 * @param data - <zh/> 元素数据 | <en/> element data
 * @returns - <zh/> 是否为边数据 | <en/> whether the data is edge data
 */
export function isEdgeData(data: Partial<ElementDatum>): data is EdgeData {
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

/**
 * <zh/> 判断是否为点
 *
 * <en/> Judge whether the point is valid
 * @param p - <zh/> 点 | <en/> point
 * @returns <zh/> 是否为点 | <en/> whether the point is valid
 */
export function isPoint(p: any): p is Point {
  if (p instanceof Float32Array) return true;

  if (Array.isArray(p) && (p.length === 2 || p.length === 3)) {
    return p.every((elem) => typeof elem === 'number');
  }

  return false;
}

import type { Point } from '../types';

/**
 * <zh/> 创建两点之间的向量
 *
 * <en/> Creates a vector between two points
 * @param from - <zh/> 起点 | <en/> The starting point
 * @param to - <zh/> 终点 | <en/> The ending point
 * @returns <zh/> 表示从起点到终点的向量 | <en/> A vector representing the direction from the start point to the end point
 */
export function createVector(from: Point, to: Point): Point {
  return [to[0] - from[0], to[1] - from[1]];
}

/**
 * <zh/> 将向量标准化（长度为 1）
 *
 * <en/> Normalizes a vector (length of 1)
 * @param vector - <zh> 待标准化的向量 | <en/> The vector to be normalized
 * @returns - <zh/> 标准化后的向量，其长度为1 | <en/> The normalized vector with a length of 1
 */
export function normalizeVector(vector: Point): Point {
  const length = Math.sqrt(vector[0] * vector[0] + vector[1] * vector[1]);
  if (length === 0) return [0, 0];
  return [vector[0] / length, vector[1] / length];
}

/**
 * <zh/> 计算向量的垂直向量
 *
 * <en/> Calculates the perpendicular vector to a given vector
 * @param vector - <zh/> 原始向量 | <en/> The original vector
 * @returns <zh/>原始向量的垂直向量 | <en/> The perpendicular vector to the original vector
 */
export function perpendicularVector(vector: Point): Point {
  return [-vector[1], vector[0]];
}

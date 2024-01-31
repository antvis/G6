import type { Vector2, Vector3 } from '../types';

export function add(a: Vector2, b: Vector2): Vector2;
export function add(a: Vector3, b: Vector3): Vector3;
/**
 * <zh/> 两个向量求和
 *
 * <en/> Adds two vectors
 * @param a - <zh/> 第一个向量 | <en/> The first vector
 * @param b - <zh/> 第二个向量 | <en/> The second vector
 * @returns <zh/> 两个向量的和 | <en/> The sum of the two vectors
 */
export function add(a: Vector2 | Vector3, b: Vector2 | Vector3): Vector2 | Vector3 {
  return a.map((v, i) => v + b[i]) as Vector2 | Vector3;
}

export function subtract(a: Vector2, b: Vector2): Vector2;
export function subtract(a: Vector3, b: Vector3): Vector3;
/**
 * <zh/> 两个向量求差
 *
 * <en/> Subtracts two vectors
 * @param a - <zh/> 第一个向量 | <en/> The first vector
 * @param b - <zh/> 第二个向量 | <en/> The second vector
 * @returns <zh/> 两个向量的差 | <en/> The difference of the two vectors
 */
export function subtract(a: Vector2 | Vector3, b: Vector2 | Vector3): Vector2 | Vector3 {
  return a.map((v, i) => v - b[i]) as Vector2 | Vector3;
}

export function multiply(a: Vector2, b: Vector2): Vector2;
export function multiply(a: Vector3, b: Vector3): Vector3;
/**
 * <zh/> 两个向量求积
 *
 * <en/> Multiplies two vectors
 * @param a - <zh/> 第一个向量 | <en/> The first vector
 * @param b - <zh/> 第二个向量 | <en/> The second vector
 * @returns <zh/> 两个向量的积 | <en/> The product of the two vectors
 */
export function multiply(a: Vector2 | Vector3, b: Vector2 | Vector3): Vector2 | Vector3 {
  return a.map((v, i) => v * b[i]) as Vector2 | Vector3;
}

export function divide(a: Vector2, b: Vector2): Vector2;
export function divide(a: Vector3, b: Vector3): Vector3;
/**
 * <zh/> 两个向量求商
 *
 * <en/> Divides two vectors
 * @param a - <zh/> 第一个向量 | <en/> The first vector
 * @param b - <zh/> 第二个向量 | <en/> The second vector
 * @returns <zh/> 两个向量的商 | <en/> The quotient of the two vectors
 */
export function divide(a: Vector2 | Vector3, b: Vector2 | Vector3): Vector2 | Vector3 {
  return a.map((v, i) => v / b[i]) as Vector2 | Vector3;
}

export function distance(a: Vector2, b: Vector2): number;
export function distance(a: Vector3, b: Vector3): number;
/**
 * <zh/> 计算两个向量间的欧几里得距离
 *
 * <en/> Calculates the Euclidean distance between two vectors
 * @param a - <zh/> 第一个向量 | <en/> The first vector
 * @param b - <zh/> 第二个向量 | <en/> The second vector
 * @returns <zh/> 两个向量间的距离 | <en/> The distance between the two vectors
 */
export function distance(a: Vector2 | Vector3, b: Vector2 | Vector3): number {
  let sum = 0;
  a.forEach((v, i) => (sum += (v - b[i]) ** 2));
  return Math.sqrt(sum);
}

export function normalize(a: Vector2): Vector2;
export function normalize(a: Vector3): Vector3;
/**
 * <zh/> 标准化向量（使长度为 1）
 *
 * <en/> Normalizes a vector (making its length 1)
 * @param a - <zh/> 要标准化的向量 | <en/> The vector to normalize
 * @returns <zh/> 标准化后的向量 | <en/> The normalized vector
 */
export function normalize(a: Vector2 | Vector3): Vector2 | Vector3 {
  let length = 0;
  a.forEach((v) => (length += v ** 2));
  return a.map((v) => v / Math.sqrt(length)) as Vector2 | Vector3;
}

/**
 * <zh/> 计算向量的垂直向量
 *
 * <en/> Calculates the perpendicular vector to a given vector
 * @param a - <zh/> 原始向量 | <en/> The original vector
 * @returns <zh/> 原始向量的垂直向量 | <en/> The perpendicular vector to the original vector
 */
export function perpendicular(a: Vector2): Vector2 {
  return [-a[1], -a[0]];
}

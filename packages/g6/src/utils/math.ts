import { Point, PolyPoint } from '../types/common';

/**
 * Whether the value is between the range of [min, max]
 * @param   {number}       value  the value to be judged
 * @param   {number}       min    the min of the range
 * @param   {number}       max    the max of the range
 * @returns  {boolean}      bool   the result boolean
 */
export const isBetween = (value: number, min: number, max: number) => value >= min && value <= max;

/**
 * Calculate the manhattan distance between two points
 * @param p1 the first 2d point
 * @param p2 the second 2d point
 * @returns Sum of the absolute coordinate differences of two points
 */
export const manhattanDist = (p1: Point | PolyPoint, p2: Point | PolyPoint): number =>
  Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);

/**
 *
 * @param p1
 * @param p2
 * @returns
 */
export const eulerDist = (p1: Point | PolyPoint, p2: Point | PolyPoint): number =>
  Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);

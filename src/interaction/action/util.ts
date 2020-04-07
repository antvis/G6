import {Point} from '../../types/index';

/**
 * 允许移动的最小位移，防止错误触发
 */
export const TOLERENCE_MOVE = 5;

export function distance(p1: Point, p2: Point) {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function canavsDistance(p1: Point, p2: Point) {
  const dx = p2.canvasX - p1.canvasX;
  const dy = p2.canvasY - p1.canvasY;
  return Math.sqrt(dx * dx + dy * dy);
}

export function allowMove(p1: Point, p2: Point): boolean {
  return canavsDistance(p1, p2) >= TOLERENCE_MOVE;
}
import type { Point } from '../../../types';
import orient from './robust-orientation';

function checkCollinear(a0: Point, a1: Point, b0: Point, b1: Point): boolean {
  for (let d = 0; d < 2; ++d) {
    const x0 = a0[d];
    const y0 = a1[d];
    const [l0, h0] = [Math.min(x0, y0), Math.max(x0, y0)];

    const x1 = b0[d];
    const y1 = b1[d];
    const [l1, h1] = [Math.min(x1, y1), Math.max(x1, y1)];
    if (h1 < l0 || h0 < l1) return false;
  }
  return true;
}

export function segmentsIntersect(a0: Point, a1: Point, b0: Point, b1: Point): boolean {
  const x0 = orient(a0, b0, b1);
  const y0 = orient(a1, b0, b1);
  if ((x0 > 0 && y0 > 0) || (x0 < 0 && y0 < 0)) return false;
  const x1 = orient(b0, a0, a1);
  const y1 = orient(b1, a0, a1);
  if ((x1 > 0 && y1 > 0) || (x1 < 0 && y1 < 0)) return false;
  if (x0 === 0 && y0 === 0 && x1 === 0 && y1 === 0) {
    return checkCollinear(a0, a1, b0, b1);
  }
  return true;
}

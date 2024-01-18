import { isBetween, manhattanDist, eulerDist } from '../../../src/utils/math';

describe('math', () => {
  it('isBetween', () => {
    expect(isBetween(1, 0, 1)).toBe(true);
    expect(isBetween(1, 1, 2)).toBe(true);
    expect(isBetween(1, -1, 1)).toBe(true);
    expect(isBetween(1, 1, -1)).toBe(false);
    expect(isBetween(1, -1, -2)).toBe(false);
  });

  it('manhattanDist', () => {
    expect(manhattanDist({ x: 1, y: 1 }, { x: 3, y: 3 })).toBe(4);
  });

  it('eulerDist', () => {
    expect(eulerDist({ x: 1, y: 1 }, { x: 3, y: 3 })).toBe(Math.sqrt(8));
  });
});

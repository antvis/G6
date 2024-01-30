import { isHorizontal } from '../../../src/utils/point';

describe('Point Functions', () => {
  it('isHorizontal function', () => {
    expect(isHorizontal({ x: 100, y: 100 }, { x: 50, y: 100 })).toEqual(true);
    expect(isHorizontal({ x: 100, y: 100 }, { x: 50, y: 150 })).toEqual(false);
  });
});

import { getClosedSpline } from '@/src/utils/path';
import type { PathArray } from '@antv/util';

describe('path', () => {
  const EMPTY_PATH: PathArray = [
    ['M', 0, 0],
    ['L', 0, 0],
  ];

  it('getClosedSpline', () => {
    expect(getClosedSpline([])).toEqual(EMPTY_PATH);
    expect(
      getClosedSpline([
        [0, 0],
        [6, 6],
      ]),
    ).toEqual([
      ['M', 6, 6],
      ['C', -1, -1, -1, -1, 0, 0],
      ['C', 1, 1, 6, 6, 6, 6],
      ['C', 6, 6, 0, 0, 0, 0],
    ]);
  });
});

import { getClosedSpline, parsePath, pathToPoints } from '@/src/utils/path';
import type { PathArray } from '@antv/util';

describe('path', () => {
  const EMPTY_PATH: PathArray = [
    ['M', 0, 0],
    ['L', 0, 0],
  ];

  it('parsePath', () => {
    expect(parsePath('M 0 0 L 0 0')).toEqual([
      ['M', 0, 0],
      ['L', 0, 0],
    ]);
    expect(parsePath('M 0 0 L 0 0 Z')).toEqual([['M', 0, 0], ['L', 0, 0], ['Z']]);
    // Arc
    expect(parsePath('M 0 0 A 1 1 0 0 0 0 0')).toEqual([
      ['M', 0, 0],
      ['A', 1, 1, 0, 0, 0, 0, 0],
    ]);
    // Q
    expect(parsePath('M 0 0 Q 1 1 0 0')).toEqual([
      ['M', 0, 0],
      ['Q', 1, 1, 0, 0],
    ]);
  });

  it('pathToPoints', () => {
    expect(pathToPoints('M 0 0 L 0 0')).toEqual([
      [0, 0, 0],
      [0, 0, 0],
    ]);
    expect(pathToPoints('M 0 0 L 0 0 Z')).toEqual([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
    expect(pathToPoints('M 0 0 A 1 1 0 0 0 0 0')).toEqual([
      [0, 0, 0],
      [0, 0, 0],
    ]);
    expect(pathToPoints('M 0 0 A 1 1 0 0 0 1 1')).toEqual([
      [0, 0, 0],
      [1, 1, 0],
    ]);
    expect(pathToPoints('M 0 0 Q 1 1 0 0')).toEqual([
      [0, 0, 0],
      [1, 1, 0],
      [0, 0, 0],
    ]);
  });

  it('getClosedSpline', () => {
    expect(getClosedSpline([])).toEqual(EMPTY_PATH);
    expect(
      getClosedSpline([
        [0, 0],
        [6, 6],
      ]),
    ).toEqual([
      ['M', 6, 6],
      ['C', 6, 6, 0, 0, 0, 0],
      ['C', 0, 0, 6, 6, 6, 6],
      ['C', 6, 6, 0, 0, 0, 0],
    ]);
  });
});

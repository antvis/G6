import { computeHullPath } from '@/src/plugins/hull/util';

describe('util', () => {
  it('computeHullPath', () => {
    expect(computeHullPath([[10, 10]], 0, 'rounded')).toEqual([
      ['M', 10, 10],
      ['A', 0, 0, 0, 0, 0, 10, 10],
      ['A', 0, 0, 0, 0, 0, 10, 10],
    ]);
    expect(computeHullPath([[10, 10]], 0, 'sharp')).toEqual([
      ['M', 10, 10],
      ['L', 10, 10],
      ['L', 10, 10],
      ['L', 10, 10],
      ['Z'],
    ]);
    expect(computeHullPath([[10, 10]], 0, 'smooth')).toEqual([
      ['M', 10, 10],
      ['A', 0, 0, 0, 0, 0, 10, 10],
      ['A', 0, 0, 0, 0, 0, 10, 10],
    ]);
    expect(
      computeHullPath(
        [
          [10, 10],
          [20, 20],
        ],
        0,
        'rounded',
      ),
    ).toEqual([
      ['M', 10, 10],
      ['L', 20, 20],
      ['A', 0, 0, 0, 0, 0, 20, 20],
      ['L', 10, 10],
      ['A', 0, 0, 0, 0, 0, 10, 10],
    ]);
  });
  expect(
    computeHullPath(
      [
        [10, 10],
        [20, 20],
      ],
      0,
      'sharp',
    ),
  ).toEqual([['M', 10, 10], ['L', 20, 20], ['L', 20, 20], ['L', 10, 10], ['Z']]);
  expect(
    computeHullPath(
      [
        [10, 10],
        [20, 20],
      ],
      0,
      'smooth',
    ),
  ).toEqual([
    ['M', 10, 10],
    ['L', 20, 20],
    ['A', 0, 0, 0, 0, 0, 20, 20],
    ['L', 10, 10],
    ['A', 0, 0, 0, 0, 0, 10, 10],
  ]);

  it('computeHullPath with a point on an edge', () => {
    // (1, 2) lies on the edge from (0, 0) to (2, 4). The two edge directions are
    // parallel, and the angle between them used to come out as NaN.
    const path = computeHullPath(
      [
        [0, 0],
        [2, 4],
        [42, -36],
        [40, -40],
        [1, 2],
      ],
      10,
      'smooth',
    );
    path.forEach((segment) => segment.slice(1).forEach((value) => expect(Number.isFinite(value)).toBe(true)));
  });
});

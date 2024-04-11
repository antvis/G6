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
});

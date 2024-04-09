import { computeHullPath } from '@/src/plugins/hull/util';

describe('util', () => {
  it('computeHullPath', () => {
    expect(computeHullPath([[10, 10]], 0, 'rounded')).toEqual([
      ['M', 10, 10],
      ['A', 0, 0, 0, 0, 0, 10, 10],
      ['A', 0, 0, 0, 0, 0, 10, 10],
    ]);
  });
});

import {
  diffSet,
  intersectSet,
  isArrayOverlap,
  parseArrayLike,
  replaceElements,
  unionSet,
  uniqBy,
} from '../../../src/utils/array';

describe('array', () => {
  it('isArrayOverlap', () => {
    expect(isArrayOverlap([], [3, 4])).toBe(false);
    expect(isArrayOverlap([1, 2], [])).toBe(false);
    expect(isArrayOverlap([1, 2], [3, 4])).toBe(false);
    expect(isArrayOverlap([1, 2], [2, 3])).toBe(true);
  });

  it('diffSet', () => {
    expect(diffSet([1, 2], [3, 4])).toEqual([1, 2]);
    expect(diffSet([1, 2], [2, 3])).toEqual([1]);
    expect(diffSet(['1', '2'], ['2', '3'])).toEqual(['1']);

    expect(diffSet([{ a: 1 }, { a: 2 }], [{ a: 3 }, { a: 4 }])).toEqual([{ a: 1 }, { a: 2 }]);
    expect(diffSet([{ a: 1 }, { a: 2 }], [{ a: 2 }, { a: 3 }])).toEqual([{ a: 1 }]);
  });

  it('unionSet', () => {
    expect(unionSet([1, 2], [3, 4])).toEqual([1, 2, 3, 4]);
    expect(unionSet([1, 2], [2, 3])).toEqual([1, 2, 3]);
  });

  it('intersectSet', () => {
    expect(intersectSet([1, 2], [3, 4])).toEqual([]);
    expect(intersectSet([1, 2], [2, 3])).toEqual([2]);
  });

  it('replaceElements', () => {
    expect(replaceElements([1, 2], 2, 3)).toEqual([1, 3]);
    expect(replaceElements([1, 2], 3, 4)).toEqual([1, 2]);
  });

  it('uniqBy', () => {
    expect(uniqBy([{ a: 1 }, { a: 2 }, { a: 1 }], 'a')).toEqual([{ a: 1 }, { a: 2 }]);
    expect(uniqBy([{ a: 1 }, { a: 2 }], 'a')).toEqual([{ a: 1 }, { a: 2 }]);
  });

  it('parseArrayLike', () => {
    expect(parseArrayLike()).toBe(undefined);
    expect(parseArrayLike([1, 2, 3])).toEqual([1, 2, 3]);
    expect(parseArrayLike(1)).toEqual([1]);
  });
});

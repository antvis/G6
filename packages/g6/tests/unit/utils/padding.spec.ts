import { parsePadding } from '../../../src/utils/padding';

describe('padding', () => {
  it('parsePadding', () => {
    expect(parsePadding(1)).toEqual([1, 1, 1, 1]);
    expect(parsePadding([1, 2])).toEqual([1, 2, 1, 2]);
    expect(parsePadding([1, 2, 3])).toEqual([1, 2, 3, 2]);
    expect(parsePadding([1, 2, 3, 4])).toEqual([1, 2, 3, 4]);
  });
});

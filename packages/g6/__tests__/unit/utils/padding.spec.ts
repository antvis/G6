import { parsePadding } from '../../../src/utils/padding';

describe('padding', () => {
  it('parsePadding', () => {
    expect(parsePadding()).toEqual([0, 0, 0, 0]);

    expect(parsePadding([])).toEqual([0, 0, 0, 0]);

    expect(parsePadding(10)).toEqual([10, 10, 10, 10]);

    expect(parsePadding([10, 20])).toEqual([10, 20, 10, 20]);

    expect(parsePadding([10, 20, 30])).toEqual([10, 20, 30, 20]);

    expect(parsePadding([10, 20, 30, 40])).toEqual([10, 20, 30, 40]);
  });
});

import { getHorizontalPadding, getVerticalPadding, parsePadding } from '@/src/utils/padding';

describe('padding', () => {
  it('parsePadding', () => {
    expect(parsePadding()).toEqual([0, 0, 0, 0]);

    expect(parsePadding([])).toEqual([0, 0, 0, 0]);

    expect(parsePadding(10)).toEqual([10, 10, 10, 10]);

    expect(parsePadding([10, 20])).toEqual([10, 20, 10, 20]);

    expect(parsePadding([10, 20, 30])).toEqual([10, 20, 30, 20]);

    expect(parsePadding([10, 20, 30, 40])).toEqual([10, 20, 30, 40]);
  });

  it('getVerticalPadding', () => {
    expect(getVerticalPadding()).toEqual(0);

    expect(getVerticalPadding([])).toEqual(0);

    expect(getVerticalPadding(10)).toEqual(20);

    expect(getVerticalPadding([10, 20])).toEqual(20);

    expect(getVerticalPadding([10, 20, 30])).toEqual(40);

    expect(getVerticalPadding([10, 20, 30, 40])).toEqual(40);
  });

  it('getHorizontalPadding', () => {
    expect(getHorizontalPadding()).toEqual(0);

    expect(getHorizontalPadding([])).toEqual(0);

    expect(getHorizontalPadding(10)).toEqual(20);

    expect(getHorizontalPadding([10, 20])).toEqual(40);

    expect(getHorizontalPadding([10, 20, 30])).toEqual(40);

    expect(getHorizontalPadding([10, 20, 30, 40])).toEqual(60);
  });
});

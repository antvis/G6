import { formatPadding, isViewportChanged } from '../../../src/util/base';

describe('base util', () => {
  it('formatPadding', () => {
    let padding = formatPadding(5);
    expect(padding).toEqual([5, 5, 5, 5]);

    padding = formatPadding('10');
    expect(padding).toEqual([10, 10, 10, 10]);

    padding = formatPadding([5]);
    expect(padding).toEqual([5, 5, 5, 5]);

    padding = formatPadding([5, 10]);
    expect(padding).toEqual([5, 10, 5, 10]);

    padding = formatPadding([5, 10, 15]);
    expect(padding).toEqual([5, 10, 15, 10]);

    padding = formatPadding([5, 10, 15, 20]);
    expect(padding).toEqual([5, 10, 15, 20]);
  });

  it('isViewportChanged', () => {
    let isChanged = isViewportChanged(null);
    expect(isChanged).toBe(false);

    isChanged = isViewportChanged([1, 0, 0, 0, 1, 0, 0, 0, 1]);
    expect(isChanged).toBe(false);

    isChanged = isViewportChanged([1, 0, 0, 0.5, 1, 0, 0, 0, 1]);
    expect(isChanged).toBe(true);
  });
});

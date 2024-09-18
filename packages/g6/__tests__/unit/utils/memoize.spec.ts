import { deepMemoize } from '@/src/utils/memoize';

describe('memoize utils', () => {
  it('deepMemoize', () => {
    const func = jest.fn((a: number, b: number) => a + b);
    const memoizedFunc = deepMemoize(func);

    expect(memoizedFunc(1, 2)).toBe(3);
    expect(memoizedFunc(1, 2)).toBe(3);
    expect(memoizedFunc(2, 1)).toBe(3);
  });
});

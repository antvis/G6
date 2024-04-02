import { isBetween } from '@/src/utils/math';

describe('math', () => {
  it('isBetween', () => {
    expect(isBetween(1, 0, 2)).toBe(true);
    expect(isBetween(1, 2, 3)).toBe(false);
  });
});

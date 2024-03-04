import { createDeterministicRandom } from '@@/utils';

describe('createDeterministicRandom', () => {
  it('should generate a random number between 0 and 1', () => {
    const r1 = createDeterministicRandom();
    const r2 = createDeterministicRandom();

    expect(new Array(100).fill(0).map(r1)).toEqual(new Array(100).fill(0).map(r2));
    expect(r1()).toBeGreaterThanOrEqual(0);
    expect(r1()).toBeLessThan(1);
  });
});

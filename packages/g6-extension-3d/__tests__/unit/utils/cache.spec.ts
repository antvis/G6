import { getCacheKey } from '../../../src/utils/cache';

describe('cache', () => {
  it('getCacheKey plain', () => {
    const key = Symbol.for('latitudeBands:16 longitudeBands:16 radius:10');

    expect(
      getCacheKey({
        radius: 10,
        latitudeBands: 16,
        longitudeBands: 16,
      }),
    ).toBe(key);

    expect(
      getCacheKey({
        longitudeBands: 16,
        latitudeBands: 16,
        radius: 10,
      }),
    ).toBe(key);
  });

  it('getCacheKey object', () => {
    const object = { a: { b: 1 } };

    const key1 = getCacheKey(object);
    const key2 = getCacheKey(object);
    expect(key1).not.toBe(key2);
  });
});

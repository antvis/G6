import { TupleMap } from '../../../src/utils/map';

describe('map', () => {
  it('TupleMap', () => {
    const map = new TupleMap<Date, string, number>();

    const key1 = new Date();
    const key2 = 'key2';
    map.set(key1, key2, 1);

    expect(map.has(key1, key2)).toBe(true);
    expect(map.get(key1, key2)).toBe(1);

    map.set(key1, key2, 2);
    expect(map.get(key1, key2)).toBe(2);

    const key3 = 'key3';
    expect(map.has(key1, key3)).toBe(false);
    expect(map.get(key1, key3)).toBe(undefined);
  });
});

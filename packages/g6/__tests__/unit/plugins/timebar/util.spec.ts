import { parseLevelPositionToStyle, tryToGet } from '@/src/plugins/timebar/util';

describe('util', () => {
  it('parseLevelPositionToStyle', () => {
    expect(parseLevelPositionToStyle('top', [200, 40])).toEqual('position:relative;top:0;');
    expect(parseLevelPositionToStyle('bottom', [200, 40])).toEqual('position:relative;bottom:-40px;');
  });
  it('tryToGet', () => {
    expect(tryToGet({ key1: 1, key2: 2 }, ['key1'])).toEqual(1);
    expect(tryToGet({ key1: 1, key2: 2 }, ['key2'])).toEqual(2);
    expect(tryToGet({ key1: 1, key2: 2 }, ['key3'])).toEqual(undefined);
  });
});

import { register } from '../../../src/plugin/register';
import { parsePalette } from '../../../src/utils/palette';

describe('palette', () => {
  it('parsePalette', () => {
    register('palette', 'schema', ['red', 'green', 'blue']);
    register('palette', 'interpolate', (value) => `rgb(${(value * 255).toFixed(0)}, 128, 128)`);

    expect(parsePalette('schema')).toEqual(['red', 'green', 'blue']);
    // @ts-ignore
    expect(parsePalette('interpolate')(0.1)).toEqual('rgb(26, 128, 128)');
    expect(parsePalette(['pink', 'gray', 'yellow'])).toEqual(['pink', 'gray', 'yellow']);
    // @ts-ignore
    expect(parsePalette(() => 'red')()).toBe('red');
  });
});

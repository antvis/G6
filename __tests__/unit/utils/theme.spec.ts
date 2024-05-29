import { register } from '@antv/g6';
import { themeOf } from '@g6/utils/theme';

describe('theme', () => {
  it('themeOf', () => {
    expect(themeOf({})).toEqual({});
    expect(themeOf({ theme: 'null' })).toEqual({});

    const theme = { node: {} };
    register('theme', 'light-1', theme);

    expect(themeOf({ theme: 'light-1' })).toBe(theme);
  });
});

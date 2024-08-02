import { register } from '@/src/registry/register';
import { themeOf } from '@/src/utils/theme';

describe('theme', () => {
  it('themeOf', () => {
    expect(themeOf({})).toEqual({});
    expect(themeOf({ theme: 'null' })).toEqual({});

    const theme = { node: {} };
    register('theme', 'light', theme);

    expect(themeOf({ theme: 'light' })).toBe(theme);
  });
});

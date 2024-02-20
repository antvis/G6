import type { ThemeOptions } from '../../../src';

describe('spec theme', () => {
  it('theme', () => {
    const theme: ThemeOptions = 'light';

    expect(theme).toBeTruthy();
  });
});

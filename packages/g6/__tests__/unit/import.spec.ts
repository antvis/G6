import * as G6 from '@/src';

describe('import', () => {
  it('default', () => {
    expect(G6).not.toBe(undefined);
    const keys = Object.keys(G6);
    expect(keys.length).toBeGreaterThan(0);
  });
});

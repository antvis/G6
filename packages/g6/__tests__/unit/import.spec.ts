import * as G6 from '@/src';

describe('import', () => {
  it('default', () => {
    expect(G6).not.toBe(undefined);
    const entries = Object.entries(G6);
    expect(entries.length).toBeGreaterThan(0);
  });
});

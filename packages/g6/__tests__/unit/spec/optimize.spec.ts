import type { OptimizeOptions } from '@/src';

describe('spec optimize', () => {
  it('optimize 1', () => {
    const optimize: OptimizeOptions = {
      tileFirstRender: true,
    };

    expect(optimize).toBeTruthy();
  });
});

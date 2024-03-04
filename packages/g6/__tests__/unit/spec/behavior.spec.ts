import type { BehaviorOptions } from '@/src';

describe('spec behavior', () => {
  it('behavior', () => {
    const behavior: BehaviorOptions = ['drag-canvas', 'zoom-canvas', { type: 'unset' }, { type: 'any', anyProps: 1 }];

    expect(behavior).toBeTruthy();
  });
});

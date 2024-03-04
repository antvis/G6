import type { ViewportOptions } from '@/src';

describe('spec viewport', () => {
  it('viewport 1', () => {
    const viewport: ViewportOptions = {
      autoFit: 'view',
      padding: 0,
      zoom: 1,
      zoomRange: [0.5, 2],
    };

    expect(viewport).toBeTruthy();
  });

  it('viewport 2', () => {
    const viewport: ViewportOptions = {
      autoFit: {
        type: 'center',
        animation: {
          duration: 1000,
        },
      },
      padding: [10, 10],
      zoom: 0.5,
    };

    expect(viewport).toBeTruthy();
  });
});

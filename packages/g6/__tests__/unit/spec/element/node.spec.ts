import type { NodeOptions } from '@/src';

describe('spec element node', () => {
  it('node 1', () => {
    const node: NodeOptions = {
      animation: {
        enter: [
          {
            shape: 'keyShape',
            fields: ['opacity'],
            duration: 1000,
          },
        ],
      },
      style: {
        x: 1,
        y: 1,
      },
      palette: 'spectral',
      state: {
        selected: {
          any: 1,
          x: 1,
        },
      },
    };

    expect(node).toBeTruthy();
  });

  it('node 2', () => {
    const node: NodeOptions = {
      style: {
        nodeStyle: (model: any) => model.style?.nodeStyle || 'white',
      },
      state: {
        state1: {
          nodeStyle: (data: any) => data.style?.nodeStyle || 'white',
        },
      },
      animation: {
        enter: 'fade',
        show: 'fade',
      },
      palette: 'spectral',
    };

    expect(node).toBeTruthy();
  });
});

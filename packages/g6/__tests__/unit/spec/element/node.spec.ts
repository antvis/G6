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
        collapsed: (data) => data.style?.collapsed || false,
        parentId: '1',
        x: 1,
        y: 1,
      },
      palette: 'category10',
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
        nodeStyle: (model) => model.style?.nodeStyle || 'white',
      },
      state: {
        state1: {
          nodeStyle: (data) => data.style?.nodeStyle || 'white',
        },
      },
      animation: {
        enter: {
          type: 'fade-in',
          delay: 100,
        },
        show: {
          type: 'wave-in',
          duration: 100,
        },
      },
      palette: 'spectral',
    };

    expect(node).toBeTruthy();
  });
});

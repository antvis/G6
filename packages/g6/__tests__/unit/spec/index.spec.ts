import type { G6Spec } from '@/src';
import { Renderer } from '@antv/g-canvas';

describe('spec', () => {
  it('spec', () => {
    const options: G6Spec = {
      width: 800,
      height: 600,
      renderer: () => new Renderer(),
      devicePixelRatio: 2,
      autoResize: true,
      autoFit: 'view',
      padding: [10, 10],
      zoom: 1.2,
      zoomRange: [0.5, 2],
      data: {
        nodes: [
          {
            id: 'node-1',
            data: {
              value: 1,
            },
            style: {
              nodeStyle: 'red',
            },
          },
        ],
        edges: [],
        combos: [],
      },
      node: {
        style: {
          nodeStyle: 'blue',
        },
        state: {
          state1: {
            nodeStyle: 'green',
          },
        },
        animation: {
          enter: 'fade',
        },
        palette: {
          type: 'group',
          field: 'field',
          color: 'brBG',
        },
      },
      edge: {
        animation: {
          enter: [{ fields: ['opacity'], duration: 500, shape: 'keyShape' }],
        },
      },
      theme: 'light',
      behaviors: ['drag-canvas', 'my-behavior', { type: 'drag-node' }],
      widgets: ['my-widget', { type: 'another-widget', text: 'text', value: 1 }],
    };

    expect(options).toBeTruthy();
  });
});

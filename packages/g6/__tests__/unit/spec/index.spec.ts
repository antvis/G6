import { Renderer } from '@antv/g-canvas';
import type { G6Spec } from '../../../src';

describe('spec', () => {
  it('spec', () => {
    const options: G6Spec = {
      width: 800,
      height: 600,
      renderer: () => new Renderer(),
      devicePixelRatio: 2,
      autoResize: true,
      autoFit: {
        type: 'view',
        rule: {},
      },
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
          enter: {
            type: 'fade-in',
          },
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
      optimize: {
        tileFirstRender: true,
      },
    };

    expect(options).toBeTruthy();
  });
});

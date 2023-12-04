// TODO: disable this demo temporary since gForce is not correct.

import { Graph, extend } from '@antv/g6';
import * as layoutGPU from '@antv/layout-gpu';

const layoutGPU = window.layoutGPU;
// GPU layout is not built-in G6 stbLib, you need to extend G6 with it.
const CustomGraph = extend(Graph, {
  layouts: {
    'gForce-gpu': layoutGPU.GForceLayout,
  },
});

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

fetch('https://gw.alipayobjects.com/os/basement_prod/7bacd7d1-4119-4ac1-8be3-4c4b9bcbc25f.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new CustomGraph({
      container: 'container',
      width,
      height,
      transforms: [
        {
          type: 'transform-v4-data',
          activeLifecycle: ['read'],
        },
      ],
      modes: {
        default: ['zoom-canvas', 'drag-canvas', 'drag-node', 'click-select'],
      },
      edge: {
        keyShape: {
          endArrow: true,
        },
      },
      layout: {
        type: 'gForce-gpu',
        maxIteration: 1000,
      },
      autoFit: 'view',
      data,
    });

    window.graph = graph;
  });

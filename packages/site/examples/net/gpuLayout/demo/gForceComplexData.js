// TODO: disable this demo temporary since gForce is not correct.

import { Graph, extend } from '@antv/g6';
// import by this way in your project. 在您的项目中请这样引入
// import { registry as layoutRegistry } from '@antv/layout-gpu';

const layoutGPU = window.layoutGPU;
// GPU layout is not built-in G6 stbLib, you need to exend G6 with it.
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
      transform: ['transform-v4-data'],
      modes: {
        default: ['drag-canvas', 'drag-node', 'zoom-canvas'],
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

    if (typeof window !== 'undefined')
      window.onresize = () => {
        if (!graph || graph.destroyed) return;
        if (!container || !container.scrollWidth || !container.scrollHeight) return;
        graph.setSize([container.scrollWidth, container.scrollHeight]);
      };
  });

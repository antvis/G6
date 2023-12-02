import { Graph, extend } from '@antv/g6';
// import by this way in your project. 在您的项目中请这样引入
// import { registry as layoutRegistry } from '@antv/layout-gpu';

const layoutGPU = window.layoutGPU;
// GPU layout is not built-in G6 stbLib, you need to exend G6 with it.
const CustomGraph = extend(Graph, {
  layouts: {
    'fruchterman-gpu': layoutGPU.FruchtermanLayout,
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
      node: {
        keyShape: {
          r: 5,
        },
      },
      edge: {
        keyShape: {
          opacity: 0.5,
          endArrow: true,
        },
      },
      layout: {
        type: 'fruchterman-gpu',
      },
      data,
    });
  });

window.graph = graph;
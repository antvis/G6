import { Graph, Extensions, extend } from '@antv/g6';

const ExtGraph = extend(Graph, {
  layouts: {
    forceAtlas2: Extensions.ForceAtlas2Layout,
  },
});

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new ExtGraph({
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
      layout: {
        type: 'forceAtlas2',
        preventOverlap: true,
        kr: 20,
        center: [250, 250],
      },
      autoFit: 'view',
      data,
    });
window.graph = graph;
  });

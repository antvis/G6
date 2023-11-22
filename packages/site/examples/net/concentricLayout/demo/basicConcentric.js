import { Graph, Extensions, extend } from '@antv/g6';

const ExtGraph = extend(Graph, {
  behaviors: {
    'brush-select': Extensions.BrushSelect,
  },
});

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

fetch('https://gw.alipayobjects.com/os/basement_prod/8dacf27e-e1bc-4522-b6d3-4b6d9b9ed7df.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new ExtGraph({
      container: 'container',
      width,
      height,
      autoFit: 'view',
      modes: {
        default: ['zoom-canvas', 'drag-canvas', 'drag-node', 'click-select', 'brush-select'],
      },
      layout: {
        type: 'concentric',
        maxLevelDiff: 0.5,
        sortBy: 'degree',
        preventOverlap: true,
      },
      data,
    });

    if (typeof window !== 'undefined')
      window.onresize = () => {
        if (!graph || graph.destroyed) return;
        if (!container || !container.scrollWidth || !container.scrollHeight) return;
        graph.setSize([container.scrollWidth, container.scrollHeight]);
      };
  });

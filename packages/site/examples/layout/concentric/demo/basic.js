import { Graph } from '@antv/g6';

fetch('https://gw.alipayobjects.com/os/basement_prod/8dacf27e-e1bc-4522-b6d3-4b6d9b9ed7df.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'center',
      data,
      layout: {
        type: 'concentric',
        maxLevelDiff: 0.5,
        sortBy: 'degree',
        preventOverlap: true,
      },
      node: {
        style: {
          size: 5,
          stroke: '#5B8FF9',
          fill: '#C6E5FF',
          lineWidth: 1,
        },
      },
      edge: {
        type: 'line',
        style: {
          stroke: '#E2E2E2',
        },
      },
      behaviors: ['zoom-canvas', 'drag-canvas', 'drag-element'],
      animation: false,
    });

    graph.render();
  });

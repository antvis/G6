import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/circular.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      data,
      layout: {
        type: 'circular',
      },
      node: { style: { size: 20 } },
      behaviors: ['drag-canvas', 'drag-element'],
      plugins: [
        {
          key: 'edge-bundling',
          type: 'edge-bundling',
          bundleThreshold: 0.1,
        },
      ],
    });

    graph.render();
  });

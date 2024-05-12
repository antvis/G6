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
        ordering: 'degree',
      },
      node: {
        style: {
          size: 20,
          labelText: (d) => d.id,
          fill: '#EFF4FF',
          lineWidth: 1,
          stroke: '#5F95FF',
        },
      },
      behaviors: ['drag-canvas', 'drag-element'],
    });

    graph.render();
  });

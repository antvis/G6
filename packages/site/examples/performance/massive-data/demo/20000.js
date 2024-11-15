import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/20000.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      animation: false,
      autoFit: 'view',
      data,
      node: {
        style: {
          size: 8,
        },
        palette: {
          type: 'group',
          field: 'cluster',
        },
      },
      behaviors: ['zoom-canvas', 'drag-canvas'],
    });

    graph.render();
  });

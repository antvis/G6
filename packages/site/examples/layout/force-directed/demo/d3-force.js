import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/cluster.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      node: {
        style: {
          labelText: (d) => d.id,
          ports: [],
        },
        palette: {
          type: 'group',
          field: 'cluster',
        },
      },
      layout: {
        type: 'd3-force',
        collide: {
          strength: 0.5,
        },
      },
      behaviors: ['zoom-canvas', 'drag-canvas'],
    });

    graph.render();
  });

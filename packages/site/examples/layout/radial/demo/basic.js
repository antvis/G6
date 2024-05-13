import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/radial.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      autoFit: 'center',
      layout: {
        type: 'radial',
        unitRadius: 100,
        linkDistance: 200,
      },
      node: {
        style: {
          fill: '#EFF4FF',
          labelPlacement: 'center',
          labelText: (d) => d.id,
          lineWidth: 1,
          size: 20,
          stroke: '#5F95FF',
        },
      },
      behaviors: ['drag-canvas', 'drag-element'],
    });

    graph.render();
  });

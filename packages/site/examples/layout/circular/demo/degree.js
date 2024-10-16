import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/circular.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      data,
      node: {
        style: {
          labelText: d => d.id,
          labelFill: '#fff',
          labelPlacement: 'center'
        }
      },
      layout: {
        type: 'circular',
        ordering: 'degree',
      },
      behaviors: ['drag-canvas', 'drag-element'],
    });

    graph.render();
  });

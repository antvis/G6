import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/circular.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'center',
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
        startRadius: 10,
        endRadius: 300,
      },
      behaviors: ['drag-canvas', 'drag-element'],
    });

    graph.render();
  });

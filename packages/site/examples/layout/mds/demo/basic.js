import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/cluster.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      padding: 20,
      autoFit: 'view',
      data,
      node: {
        style: {
          labelFill: '#fff',
          labelText: (d) => d.id,
          labelPlacement: 'center',
        },
      },
      layout: {
        type: 'mds',
        nodeSize: 32,
        linkDistance: 100,
      },
      behaviors: ['drag-element', 'drag-canvas', 'zoom-canvas'],
    });

    graph.render();
  });

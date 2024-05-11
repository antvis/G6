import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/element-edges.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      node: {
        style: {
          port: true,
          ports: [{ placement: 'right' }, { placement: 'left' }],
        },
      },
      edge: {
        type: 'cubic-horizontal',
        style: {
          labelText: (d) => d.id,
          labelBackground: true,
          endArrow: true,
        },
      },
      layout: {
        type: 'antv-dagre',
        rankdir: 'LR',
        nodesep: 30,
        ranksep: 150,
      },
    });

    graph.render();
  });

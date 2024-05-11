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
          ports: [{ placement: 'top' }, { placement: 'bottom' }],
        },
      },
      edge: {
        type: 'cubic-vertical',
        style: {
          labelText: (d) => d.id,
          labelBackground: true,
          endArrow: true,
        },
      },
      layout: {
        type: 'antv-dagre',
        begin: [50, 50],
        rankdir: 'TB',
        nodesep: 35,
        ranksep: 150,
      },
    });

    graph.render();
  });

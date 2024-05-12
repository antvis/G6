import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/element-edges.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      edge: {
        type: 'cubic',
        style: {
          labelText: (d) => d.id,
          labelBackground: true,
          endArrow: true,
        },
      },
      layout: {
        type: 'radial',
        unitRadius: 220,
        linkDistance: 220,
      },
    });

    graph.render();
  });

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
          labelBackground: true,
        },
        palette: {
          type: 'group',
          field: 'cluster',
        },
      },
      layout: {
        type: 'grid',
        sortBy: 'id',
        nodeSize: 32,
      },
      behaviors: ['zoom-canvas', 'drag-canvas', 'drag-element'],
    });

    graph.render();

    window.addPanel((gui) => {
      gui.add({ sortBy: 'id' }, 'sortBy', ['id', 'cluster']).onChange((type) => {
        graph.setLayout({
          type: 'grid',
          sortBy: type,
        });
        graph.layout();
      });
    });
  });

import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/cluster.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      layout: {
        type: 'grid',
        sortBy: 'id',
      },
      node: {
        style: {
          size: 20,
          stroke: '#ccc',
          lineWidth: 1,
          labelText: (d) => d.id,
        },
        palette: {
          type: 'group',
          field: 'cluster',
        },
      },
      behaviors: ['zoom-canvas', 'drag-canvas', 'drag-element', 'click-select'],
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

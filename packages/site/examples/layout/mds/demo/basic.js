import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/cluster.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      padding: 20,
      autoFit: 'view',
      data,
      layout: {
        type: 'mds',
        linkDistance: 100,
      },
      node: {
        style: {
          size: 20,
          stroke: '#9ec9ff',
          fill: '#eee',
          lineWidth: 1,
          labelText: (d) => d.id,
          labelFontSize: 12,
          labelPlacement: 'center',
          labelBackground: false,
        },
      },
      behaviors: ['drag-element', 'drag-canvas', 'zoom-canvas'],
      animation: true,
    });

    graph.render();
  });

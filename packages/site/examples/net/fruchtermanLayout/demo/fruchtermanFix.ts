import { Graph } from '@antv/g6';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      node: {
        style: {
          size: 15,
          stroke: '#5B8FF9',
          fill: '#C6E5FF',
          lineWidth: 1,
        },
      },
      edge: {
        style: {
          stroke: '#E2E2E2',
        },
      },
      layout: {
        type: 'fruchterman',
        speed: 50,
        gravity: 1,
        animated: true,
        maxIteration: 500,
      },
      behaviors: ['drag-canvas', 'drag-node'],
      animation: true,
    });

    graph.render();

    graph.on('node:dragstart', function () {
      graph.stopLayout();
    });
    graph.on('node:dragend', () => {
      graph.layout();
    });
  });

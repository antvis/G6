import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/circular.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      layout: {
        type: 'circular',
        divisions: 5,
        radius: 200,
        startAngle: Math.PI / 4,
        endAngle: Math.PI,
      },
      node: {
        style: {
          size: 20,
          fill: '#EFF4FF',
          lineWidth: 1,
          stroke: '#5F95FF',
        },
      },
      edge: {
        style: {
          endArrow: true,
        },
      },
      behaviors: ['drag-canvas', 'drag-element'],
    });

    graph.render();
  });

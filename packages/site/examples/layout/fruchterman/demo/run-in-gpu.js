import { Graph, register } from '@antv/g6';
import { FruchtermanLayout } from '@antv/layout-gpu';

register('layout', 'fruchterman-gpu', FruchtermanLayout);

fetch('https://gw.alipayobjects.com/os/basement_prod/7bacd7d1-4119-4ac1-8be3-4c4b9bcbc25f.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      node: {
        style: {
          size: 5,
        },
      },
      edge: {
        style: {
          startArrow: true,
        },
      },
      layout: {
        type: 'fruchterman-gpu',
        speed: 20,
        gravity: 1,
        maxIteration: 10000,
        workerEnabled: true,
      },
      behaviors: ['zoom-canvas', 'drag-canvas', 'drag-element'],
    });

    graph.render();
  });

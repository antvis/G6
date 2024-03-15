import { Graph, register } from '@antv/g6';
import { FruchtermanLayout } from '@antv/layout-gpu';

// Resister the layout into G6.
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
          opacity: 0.5,
          endArrow: true,
          endArrowSize: 2,
        },
      },
      layout: {
        type: 'fruchterman-gpu',
      },
      behaviors: ['zoom-canvas', 'drag-canvas', 'drag-node', 'click-select'],
    });

    graph.render();
  });

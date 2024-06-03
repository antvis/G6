import { Renderer } from '@antv/g-webgl';
import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/60000.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      animation: false,
      autoFit: 'view',
      renderer: () => new Renderer(),
      data,
      node: {
        style: {
          size: 4,
          batchKey: 'node',
        },
      },
      behaviors: ['zoom-canvas', 'drag-canvas'],
    });

    graph.draw();
  });

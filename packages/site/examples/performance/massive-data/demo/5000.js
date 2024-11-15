import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/5000.json')
  .then((res) => res.json())
  .then(async (data) => {
    const graph = new Graph({
      container: 'container',
      animation: false,
      data,
      behaviors: ['zoom-canvas', 'drag-canvas', 'drag-element'],
      autoFit: 'view',
    });

    await graph.render();
  });

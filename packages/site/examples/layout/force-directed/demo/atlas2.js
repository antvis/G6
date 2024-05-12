import { Graph } from '@antv/g6';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      autoFit: 'view',
      layout: {
        type: 'force-atlas2',
        preventOverlap: true,
        kr: 20,
        center: [250, 250],
      },
      behaviors: ['zoom-canvas', 'drag-canvas'],
      autoResize: true,
      zoomRange: [0.1, 5],
    });

    graph.render();
  });

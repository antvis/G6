import { Graph } from '@antv/g6';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/xiaomi.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      data,
      behaviors: ['hover-element'],
      layout: {
        type: 'force',
        preventOverlap: true,
        nodeSize: 24,
      },
      animation: false,
    });

    graph.render();
  });

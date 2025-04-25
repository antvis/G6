import { Graph } from '@antv/g6';

fetch('https://gw.alipayobjects.com/os/basement_prod/8dacf27e-e1bc-4522-b6d3-4b6d9b9ed7df.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      data,
      edge:{
        type:'line'
      },
      layout: {
        type: 'concentric',
        nodeSize: 32,
        maxLevelDiff: 0.5,
        sortBy: 'degree',
        preventOverlap: true,
      },
      behaviors: ['zoom-canvas', 'drag-canvas', 'drag-element'],
      animation: false,
    });

    graph.render();
  });

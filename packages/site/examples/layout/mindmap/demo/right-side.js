import { Graph, treeToGraphData } from '@antv/g6';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      data: treeToGraphData(data),
      node: {
        style: {
          labelText: d => d.id,
          labelPlacement: 'right',
          labelBackground: true,
          ports: [{ placement: 'right' }, { placement: 'left' }],
        },
        animation: {
          enter: false,
        },
      },
      edge: {
        type: 'cubic-horizontal',
        animation: {
          enter: false,
        },
      },
      layout: {
        type: 'mindmap',
        direction: 'LR',
        getHeight: () => 32,
        getWidth: () => 32,
        getVGap: () => 4,
        getHGap: () => 100,
      },
      behaviors: ['collapse-expand', 'drag-canvas', 'zoom-canvas'],
    });

    graph.render();
  });

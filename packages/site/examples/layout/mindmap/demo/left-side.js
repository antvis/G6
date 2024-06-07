import { Graph, treeToGraphData } from '@antv/g6';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      data: treeToGraphData(data),
      node: {
        style: (model) => {
          return {
            labelText: model.id,
            size: 26,
            labelPlacement: 'left',
            labelMaxWidth: 200,
            labelTextAlign: 'end',
            lineWidth: 1,
            stroke: '#5F95FF',
            fill: '#EFF4FF',
            ports: [{ placement: 'right' }, { placement: 'left' }],
          };
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
        direction: 'H',
        getHeight: () => {
          return 16;
        },
        getWidth: () => {
          return 16;
        },
        getVGap: () => {
          return 10;
        },
        getHGap: () => {
          return 100;
        },
        getSide: () => {
          return 'left';
        },
      },
      behaviors: ['collapse-expand', 'drag-canvas', 'zoom-canvas'],
    });

    graph.render();
  });

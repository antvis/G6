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
          const x = +model.style.x;
          return {
            labelText: model.id,
            size: 26,
            labelPlacement: x > 0 ? 'right' : 'left',
            labelMaxWidth: 200,
            labelTextAlign: x > 0 ? 'start' : 'end',
            lineWidth: 1,
            stroke: '#5F95FF',
            fill: '#EFF4FF',
            ports: [{ placement: 'right' }, { placement: 'left' }],
          };
        },
      },
      edge: {
        type: 'cubic-horizontal',
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
          return 50;
        },
      },
      behaviors: ['collapse-expand', 'drag-canvas', 'zoom-canvas'],
    });

    graph.render();
  });

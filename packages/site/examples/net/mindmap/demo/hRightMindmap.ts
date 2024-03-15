import { Graph, Utils } from '@antv/g6';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      data: Utils.treeToGraphData(data),
      node: {
        style: (model) => {
          const {
            style: { x },
          } = model;
          return {
            labelText: model.id,
            size: 26,
            labelPlacement: 'right',
            labelMaxWidth: 200,
            lineWidth: 1,
            stroke: '#5F95FF',
            fill: '#EFF4FF',
            ports: [
              {
                placement: 'right',
              },
              {
                placement: 'left',
              },
            ],
          };
        },
      },
      edge: {
        style: {
          type: 'cubic-horizontal',
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
          return 'right';
        },
      },
      behaviors: ['collapse-expand', 'drag-canvas', 'zoom-canvas'],
    });

    graph.render();
  });

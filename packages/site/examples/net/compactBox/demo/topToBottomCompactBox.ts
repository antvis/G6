import { Graph, Utils } from '@antv/g6';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      data: Utils.treeToGraphData(data),
      node: {
        style: {
          labelText: (data) => data.id,
          labelPlacement: 'right',
          labelMaxWidth: 200,
          transform: 'rotate(90deg)',
          size: 26,
          fill: '#EFF4FF',
          lineWidth: 1,
          stroke: '#5F95FF',
          ports: [
            {
              placement: 'bottom',
            },
            {
              placement: 'top',
            },
          ],
        },
      },
      edge: {
        style: {
          type: 'cubic-vertical',
        },
      },
      layout: {
        type: 'compact-box',
        direction: 'TB',
        getId: function getId(d) {
          return d.id;
        },
        getHeight: function getHeight() {
          return 16;
        },
        getWidth: function getWidth() {
          return 16;
        },
        getVGap: function getVGap() {
          return 80;
        },
        getHGap: function getHGap() {
          return 20;
        },
      },
      behaviors: ['drag-canvas', 'zoom-canvas', 'drag-node'],
      animation: false,
    });

    graph.render();
  });

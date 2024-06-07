import { Graph, treeToGraphData } from '@antv/g6';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      data: treeToGraphData(data),
      behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element', 'collapse-expand'],
      node: {
        style: {
          labelText: (data) => data.id,
          labelPlacement: 'right',
          labelMaxWidth: 200,
          size: 12,
          lineWidth: 1,
          fill: '#fff',
          ports: [
            {
              placement: 'right',
            },
            {
              placement: 'left',
            },
          ],
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
        type: 'compact-box',
        direction: 'LR',
        getId: function getId(d) {
          return d.id;
        },
        getHeight: function getHeight() {
          return 16;
        },
        getVGap: function getVGap() {
          return 10;
        },
        getHGap: function getHGap() {
          return 100;
        },
        getWidth: function getWidth(d) {
          return d.id.length + 20;
        },
      },
    });

    graph.render();
  });

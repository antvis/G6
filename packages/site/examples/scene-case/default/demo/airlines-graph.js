import { Graph } from '@antv/g6';

fetch('https://gw.alipayobjects.com/os/basement_prod/7ba82250-8367-4351-82b2-d48604cd2261.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      data,
      node: {
        type: 'donut',
        style: {
          x: (d) => d.x,
          y: (d) => -d.y,
          innerR: 0,
          donuts: function (d) {
            const inDegrees = this.getRelatedEdgesData(d.id, 'in').length;
            const outDegrees = this.getRelatedEdgesData(d.id, 'out').length;
            return [
              { value: outDegrees, fill: 'rgb(230, 100, 64)' },
              { value: inDegrees, fill: 'rgb(119, 243, 252)' },
            ];
          },
        },
      },
      edge: {
        style: {
          lineWidth: 0.3,
          stroke: 'l(0) 0:#FFAA86 1:#C8FDFC',
        },
      },
      transforms: [
        {
          key: 'map-node-size',
          type: 'map-node-size',
          maxSize: 20,
          minSize: 2,
          scale: 'linear',
        },
      ],
      behaviors: ['drag-canvas', 'zoom-canvas'],
      plugins: [
        {
          key: 'edge-bundling',
          type: 'edge-bundling',
          bundleThreshold: 0.1,

        },
      ],
    });

    graph.render();
  });

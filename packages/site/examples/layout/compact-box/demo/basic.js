import { Graph, treeToGraphData } from '@antv/g6';

/**
 * If the node is a leaf node
 * @param {*} d - node data
 * @returns {boolean} - whether the node is a leaf node
 */
function isLeafNode(d) {
  return !d.children || d.children.length === 0;
}

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
          labelText: (d) => d.id,
          labelPlacement: (d) => (isLeafNode(d) ? 'right' : 'left'),
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
        type: 'compact-box',
        direction: 'LR',
        getHeight: function getHeight() {
          return 32;
        },
        getWidth: function getWidth() {
          return 32;
        },
        getVGap: function getVGap() {
          return 10;
        },
        getHGap: function getHGap() {
          return 100;
        },
      },
    });

    graph.render();
  });

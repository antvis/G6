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
        style: (d) => {
          const style = {
            labelText: d.id,
            labelPlacement: 'right',
            labelOffsetX: 2,
            labelBackground: true,
            ports: [{ placement: 'top' }, { placement: 'bottom' }],
          };
          if (isLeafNode(d)) {
            Object.assign(style, {
              labelTransform: [
                ['rotate', 90],
                ['translate', 18],
              ],
              labelBaseline: 'center',
              labelTextAlign: 'left',
            });
          }
          return style;
        },
        animation: {
          enter: false,
        },
      },
      edge: {
        type: 'cubic-vertical',
        animation: {
          enter: false,
        },
      },
      layout: {
        type: 'compact-box',
        direction: 'TB',
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
    });

    graph.render();
  });

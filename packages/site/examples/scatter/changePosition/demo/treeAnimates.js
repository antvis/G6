import { Graph, Extensions, extend } from '@antv/g6';

const ExtGraph = extend(Graph, {
  edges: {
    'cubic-horizontal-edge': Extensions.CubicHorizontalEdge,
  },
});

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new ExtGraph({
      container,
      width,
      height,
      transforms: ['transform-v4-data'],
      modes: {
        default: ['drag-canvas', 'zoom-canvas', 'drag-node', 'collapse-expand-tree'],
      },
      layout: {
        type: 'compactBox',
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
      node: {
        labelShape: {
          position: 'right',
          text: {
            fields: ['id'],
            formatter: (model) => model.id,
          },
        },
        anchorPoints: [
          [0, 0.5],
          [1, 0.5],
        ],
        animates: {
          update: [
            {
              fields: ['x', 'y'],
              duration: 300,
            },
          ],
          hide: [
            {
              fields: ['opacity'],
              duration: 100,
              shapeId: 'keyShape',
            },
            {
              fields: ['opacity'],
              duration: 100,
              shapeId: 'labelShape',
            },
          ],
          show: [
            {
              fields: ['opacity'],
              duration: 1000,
              shapeId: 'keyShape',
            },
            {
              fields: ['opacity'],
              duration: 1000,
              shapeId: 'labelShape',
            },
          ],
        },
      },
      edge: {
        type: 'cubic-horizontal-edge',
      },
      autoFit: 'view',
      data: {
        type: 'treeData',
        value: data,
      },
    });

    const btnContainer = document.createElement('div');
    btnContainer.style.position = 'absolute';
    container.appendChild(btnContainer);
    const tip = document.createElement('span');
    tip.innerHTML = '👉 Click a Node to Collapse and Expand:';
    btnContainer.appendChild(tip);

    if (typeof window !== 'undefined')
      window.onresize = () => {
        if (!graph || graph.destroyed) return;
        if (!container || !container.scrollWidth || !container.scrollHeight) return;
        graph.setSize([container.scrollWidth, container.scrollHeight]);
      };
  });

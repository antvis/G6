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
      transform: ['transform-v4-data'],
      modes: {
        default: ['drag-canvas', 'zoom-canvas', 'drag-node', 'collapse-expand-tree'],
      },
      node: (model) => {
        const configRelatedToLayout =
          model.data.layoutDirection === 'TB'
            ? {
                labelShape: {
                  text: model.id,
                  position: 'bottom',
                  offsetX: 0,
                },
                anchorPoints: [
                  [0.5, 0],
                  [0.5, 1],
                ],
              }
            : {
                labelShape: {
                  text: model.id,
                  position: model.data.childrenIds?.length ? 'left' : 'right',
                  offsetX: model.data.childrenIds?.length ? -10 : 10,
                  maxWidth: '300%',
                },
                anchorPoints: [
                  [0, 0.5],
                  [1, 0.5],
                ],
              };
        return {
          id: model.id,
          data: {
            ...model.data,
            labelBackgroundShape: {},
            ...configRelatedToLayout,
            animates: {
              update: [
                {
                  fields: ['x', 'y'],
                  duration: 500,
                  shapeId: 'group',
                  order: 0,
                },
              ],
              hide: [
                {
                  fields: ['opacity'],
                  duration: 200,
                  shapeId: 'keyShape',
                },
                {
                  fields: ['opacity'],
                  duration: 200,
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
        };
      },
      edge: {
        type: 'cubic-horizontal-edge',
      },
      layout: {
        type: 'indented',
        direction: 'H',
        indent: 80,
        getHeight: () => {
          return 10;
        },
        getWidth: () => {
          return 10;
        },
        getSide: (d) => {
          if (d.id === 'Regression' || d.id === 'Classification') return 'left';
          return 'right';
        },
      },
      autoFit: 'view',
      data: {
        type: 'treeData',
        value: data,
      },
    });

    if (typeof window !== 'undefined')
      window.onresize = () => {
        if (!graph || graph.destroyed) return;
        if (!container || !container.scrollWidth || !container.scrollHeight) return;
        graph.setSize([container.scrollWidth, container.scrollHeight]);
      };
  });

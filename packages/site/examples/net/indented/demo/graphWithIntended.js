import { Graph, Extensions, extend } from '@antv/g6';

const ExtGraph = extend(Graph, {
  edges: {
    'cubic-vertical-edge': Extensions.CubicVerticalEdge,
  },
});

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new ExtGraph({
      container,
      width,
      height,
      transforms: [
        {
          type: 'transform-v4-data',
          activeLifecycle: ['read'],
        },
      ],
      modes: {
        default: ['drag-canvas', 'zoom-canvas', 'drag-node', 'collapse-expand-tree'],
      },
      node: (model) => {
        return {
          id: model.id,
          data: {
            ...model.data,
            lodLevels: [],
            anchorPoints:
              model.data.layoutDirection === 'TB'
                ? [
                    [0.5, 0],
                    [0.5, 1],
                  ]
                : [
                    [0, 0.5],
                    [1, 0.5],
                  ],
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
        type: 'cubic-vertical-edge',
        keyShape: {
          opacity: 0.5,
          endArrow: true,
        },
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
        type: 'graphData',
        value: data,
      },
    });

window.graph = graph;
  });

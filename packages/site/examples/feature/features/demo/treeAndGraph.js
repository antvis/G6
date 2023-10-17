import { Graph, Extensions, extend } from '@antv/g6';

const ExtGraph = extend(Graph, {
  transforms: { 'transform-v4-data': Extensions.TransformV4Data },
  edges: {
    'cubic-horizontal-edge': Extensions.CubicHorizontalEdge,
    'cubic-vertical-edge': Extensions.CubicVerticalEdge,
  },
  behaviors: {
    'activate-relations': Extensions.ActivateRelations,
  },
});

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

const graph = new ExtGraph({
  container,
  width,
  height,
  transforms: ['transform-v4-data'],
  modes: {
    default: ['drag-canvas', 'zoom-canvas', 'drag-node', 'collapse-expand-tree', 'click-select'],
  },
  theme: {
    type: 'spec',
    specification: {
      node: {
        dataTypeField: 'cluster',
      },
    },
  },
  node: (model) => {
    return {
      id: model.id,
      data: {
        ...model.data,
        type: 'rect-node',
        // lodStrategy: {},
        keyShape: {
          width: 50,
          height: 20,
        },
        labelShape: {
          text: model.id,
          position: 'bottom',
          maxWidth: '120%',
          lod: Math.floor(Math.random() * 5 - 3),
          fontSize: 8,
        },
        labelBackgroundShape: {},
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
            {
              fields: ['opacity'],
              duration: 500,
              shapeId: 'keyShape',
              order: 1,
            },
            {
              fields: ['opacity'],
              states: ['active', 'selected'],
              duration: 500,
              shapeId: 'haloShape',
            },
          ],
        },
      },
    };
  },
  edge: {
    type: 'cubic-horizontal-edge',
    keyShape: {
      opacity: 0.5,
      endArrow: true,
    },
  },
  layout: {
    type: 'compactBox',
    getHeight() {
      return 20;
    },
    getWidth() {
      return 50;
    },
    getVGap() {
      return 10;
    },
    getHGap() {
      return 30;
    },
  },
  edgeState: {
    active: {
      lineWidth: 3,
    },
  },
});

const dataConfigs = {
  'Graph Data': () => {
    fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
      .then((res) => res.json())
      .then((data) => {
        data.nodes.forEach((node, i) => (node.cluster = i % 3));
        graph.once('afterlayout', (e) => {
          graph.fitCenter();
        });
        graph.changeData({
          type: 'graphData',
          value: data,
        });
      });
  },
  'Tree Data': (isFirst) => {
    fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
      .then((res) => res.json())
      .then((data) => {
        graph.once('afterlayout', (e) => {
          graph.fitCenter();
        });
        if (isFirst) {
          graph.read({
            type: 'treeData',
            value: data,
          });
        } else {
          graph.changeData({
            type: 'treeData',
            value: data,
          });
        }
      });
  },
};

dataConfigs['Tree Data'](true);

const btnContainer = document.createElement('div');
btnContainer.style.position = 'absolute';
container.appendChild(btnContainer);
const tip = document.createElement('span');
tip.innerHTML = '👉 Change Data:';
btnContainer.appendChild(tip);

Object.keys(dataConfigs).forEach((name, i) => {
  const btn = document.createElement('a');
  btn.innerHTML = name;
  btn.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
  btn.style.padding = '4px';
  btn.style.marginLeft = i > 0 ? '24px' : '8px';
  btnContainer.appendChild(btn);
  btn.addEventListener('click', () => {
    dataConfigs[name]();
  });
});

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth, container.scrollHeight]);
  };

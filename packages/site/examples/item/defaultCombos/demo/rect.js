import { Graph as BaseGraph, extend, Extensions } from '@antv/g6';

const Graph = extend(BaseGraph, {
  behaviors: {
    'hover-activate': Extensions.HoverActivate,
  },
});

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

const graph = new Graph({
  container: 'container',
  width,
  height,
  stackCfg: {
    ignoreStateChange: true,
  },
  plugins: [
    {
      // lod-controller will be automatically assigned to graph with `disableLod: false` to graph if it is not configured as following
      type: 'lod-controller',
      disableLod: true,
    },
  ],
  node: {
    labelShape: {
      position: 'center',
      text: {
        fields: ['id'],
        formatter: (model) => model.id,
      },
    },
    animates: {
      update: [
        {
          fields: ['opacity'],
          shapeId: 'haloShape',
        },
      ],
    },
  },
  combo: (model) => {
    return {
      id: model.id,
      data: {
        type: 'rect-combo',
        ...model.data,
        keyShape: {
          padding: [10, 20, 30, 40],
          r: 50,
        },
        labelShape: {
          text: model.id,
        },

        animates: {
          buildIn: [
            {
              fields: ['opacity'],
              duration: 500,
              delay: 500 + Math.random() * 500,
            },
          ],
          buildOut: [
            {
              fields: ['opacity'],
              duration: 200,
            },
          ],
          update: [
            {
              fields: ['lineWidth', 'r'],
              shapeId: 'keyShape',
            },
            {
              fields: ['opacity'],
              shapeId: 'haloShape',
            },
          ],
        },
      },
    };
  },
  data: {
    nodes: [
      { id: 'node1', data: { x: 250, y: 150, parentId: 'combo1' } },
      { id: 'node2', data: { x: 350, y: 150, parentId: 'combo1' } },
      { id: 'node3', data: { x: 250, y: 300, parentId: 'combo2' } },
    ],
    edges: [],
    combos: [
      { id: 'combo1', data: { parentId: 'combo2' } },
      { id: 'combo2', data: {} },
    ],
  },
  modes: {
    default: [
      'collapse-expand-combo',
      {
        type: 'drag-node',
        enableTransient: false,
        updateComboStructure: false,
      },
      'drag-canvas',
      {
        type: 'click-select',
        itemTypes: ['node', 'edge', 'combo'],
      },
      {
        type: 'hover-activate',
        itemTypes: ['node', 'edge', 'combo'],
      },
      {
        type: 'drag-combo',
        enableTransient: true,
        updateComboStructure: true,
      },
    ],
  },
});

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth, container.scrollHeight]);
  };

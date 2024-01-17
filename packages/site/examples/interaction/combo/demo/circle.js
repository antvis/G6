import { Graph as BaseGraph, Extensions, extend } from '@antv/g6';

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

const descriptionDiv = document.createElement('div');
descriptionDiv.innerHTML =
  'Double click the combo to collapse/expand it. Drag the node or combo to change the hierarchy.';
container.appendChild(descriptionDiv);

const Graph = extend(BaseGraph, {
  behaviors: {
    'hover-activate': Extensions.HoverActivate,
  },
});
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
        type: 'circle-combo',
        ...model.data,
        keyShape: {
          padding: [10, 20, 30, 40],
          r: 50,
        },
        labelShape: {
          text: model.data.label,
          position: 'top',
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
      {
        id: 'node1',
        data: {
          x: 350,
          y: 200,
          parentId: 'combo1',
        },
      },
      { id: 'node2', data: { x: 350, y: 250, parentId: 'combo1' } },
      { id: 'node3', data: { x: 100, y: 200, parentId: 'combo3' } },
    ],
    edges: [
      { id: 'edge1', source: 'node1', target: 'node2' },
      { id: 'edge2', source: 'node1', target: 'node3' },
      { id: 'edge3', source: 'combo1', target: 'node3' },
    ],
    combos: [
      { id: 'combo1', data: { label: 'Combo 1', parentId: 'combo2' } },
      { id: 'combo2', data: { label: 'Combo 2' } },
      { id: 'combo3', data: { label: 'Combo 3', collapsed: true } },
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

window.graph = graph;
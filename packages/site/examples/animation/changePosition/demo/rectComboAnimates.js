import { Graph } from '@antv/g6';

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;
const graph = new Graph({
  container: 'container',
  width,
  height,
  layout: {
    type: 'grid',
    width: 400,
    height: 400,
  },
  autoFit: 'center',
  node: {
    keyShape: {
      r: 10,
    },
    labelShape: {
      text: {
        fields: ['id'],
        formatter: (model) => model.id,
      },
    },
  },
  combo: {
    type: 'rect-combo',
    keyShape: {
      padding: [25, 20, 15, 20],
    },
    labelShape: {
      text: {
        fields: ['id'],
        formatter: (model) => model.id,
      },
    },
    animates: {
      // collapse and expand are kinds of update, so response these update with the following animations
      update: [
        {
          // different from circle combo, the shape's style fields about size are width and height
          // what's more, x y is neccessary for rect combo since the x and y are not zero for rect combo to make the origin of its coordinate system
          fields: ['lineWidth', 'width', 'height', 'x', 'y'],
          shapeId: 'keyShape',
        },
        {
          fields: ['opacity'],
          shapeId: 'haloShape',
        },
      ],
    },
  },
  modes: {
    default: ['drag-combo', 'click-select', 'drag-node', 'drag-canvas', 'zoom-canvas', 'collapse-expand-combo'],
  },
  data: {
    nodes: [
      { id: 'node1', data: { parentId: 'combo1' } },
      { id: 'node2', data: { parentId: 'combo1' } },
      { id: 'node3', data: { parentId: 'combo2' } },
      { id: 'node4', data: { parentId: 'combo1' } },
      { id: 'node5', data: {} },
    ],
    edges: [
      { id: 'edge1', source: 'node1', target: 'node2', data: {} },
      { id: 'edge2', source: 'node1', target: 'node3', data: {} },
      { id: 'edge3', source: 'node1', target: 'node4', data: {} },
      { id: 'edge4', source: 'node2', target: 'node3', data: {} },
      { id: 'edge5', source: 'node3', target: 'node4', data: {} },
      { id: 'edge6', source: 'node4', target: 'node5', data: {} },
    ],
    combos: [
      { id: 'combo1', data: { parentId: 'combo2' } },
      { id: 'combo2', data: {} },
      { id: 'combo3', data: {} },
    ],
  },
});

const btnContainer = document.createElement('div');
btnContainer.style.position = 'absolute';
container.appendChild(btnContainer);
const tip = document.createElement('span');
tip.innerHTML = '👉 Double Click a Combo to Collapse/Expand';
btnContainer.appendChild(tip);

window.graph = graph;

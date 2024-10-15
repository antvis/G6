import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node0', size: 50, label: '0', style: { x: 326, y: 268 } },
    { id: 'node1', size: 30, label: '1', style: { x: 280, y: 384 } },
    { id: 'node2', size: 30, label: '2', style: { x: 234, y: 167 } },
    { id: 'node3', size: 30, label: '3', style: { x: 391, y: 368 } },
    { id: 'node4', size: 30, label: '4', style: { x: 444, y: 209 } },
    { id: 'node5', size: 30, label: '5', style: { x: 378, y: 157 } },
    { id: 'node6', size: 15, label: '6', style: { x: 229, y: 400 } },
    { id: 'node7', size: 15, label: '7', style: { x: 281, y: 440 } },
    { id: 'node8', size: 15, label: '8', style: { x: 188, y: 119 } },
    { id: 'node9', size: 15, label: '9', style: { x: 287, y: 157 } },
    { id: 'node10', size: 15, label: '10', style: { x: 185, y: 200 } },
    { id: 'node11', size: 15, label: '11', style: { x: 238, y: 110 } },
    { id: 'node12', size: 15, label: '12', style: { x: 239, y: 221 } },
    { id: 'node13', size: 15, label: '13', style: { x: 176, y: 160 } },
    { id: 'node14', size: 15, label: '14', style: { x: 389, y: 423 } },
    { id: 'node15', size: 15, label: '15', style: { x: 441, y: 341 } },
    { id: 'node16', size: 15, label: '16', style: { x: 442, y: 398 } },
  ],
  edges: [
    { source: 'node0', target: 'node1', label: '0-1' },
    { source: 'node0', target: 'node2', label: '0-2' },
    { source: 'node0', target: 'node3', label: '0-3' },
    { source: 'node0', target: 'node4', label: '0-4' },
    { source: 'node0', target: 'node5', label: '0-5' },
    { source: 'node1', target: 'node6', label: '1-6' },
    { source: 'node1', target: 'node7', label: '1-7' },
    { source: 'node2', target: 'node8', label: '2-8' },
    { source: 'node2', target: 'node9', label: '2-9' },
    { source: 'node2', target: 'node10', label: '2-10' },
    { source: 'node2', target: 'node11', label: '2-11' },
    { source: 'node2', target: 'node12', label: '2-12' },
    { source: 'node2', target: 'node13', label: '2-13' },
    { source: 'node3', target: 'node14', label: '3-14' },
    { source: 'node3', target: 'node15', label: '3-15' },
    { source: 'node3', target: 'node16', label: '3-16' },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: {
      labelText: (d) => d.id,
      labelMaxWidth: '200%',
      labelWordWrap: true,
      size: (d) => d.size,
    },
  },
  edge: {
    style: {
      labelText: (d) => `${d.source}-${d.target}`,
      labelWordWrap: true,
      labelMaxLines: 2,
      labelMaxWidth: '60%',
    },
  },
  behaviors: [
    {
      type: 'fix-element-size',
      key: 'fix-element-size',
      enable: true,
      node: [
        {
          shape: (shapes) =>
            shapes.find((shape) => shape.parentElement?.className === 'label' && shape.className === 'text'),
          fields: ['fontSize', 'lineHeight'],
        },
      ],
      edge: [
        {
          shape: (shapes) =>
            shapes.find((shape) => shape.parentElement?.className === 'label' && shape.className === 'text'),
          fields: ['fontSize', 'lineHeight'],
        },
      ],
    },
    'zoom-canvas',
    'drag-canvas',
  ],
  autoFit: 'center',
});

graph.render();

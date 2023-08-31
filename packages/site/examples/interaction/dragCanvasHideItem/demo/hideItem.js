import G6 from '@antv/g6';

const data = {
  nodes: [
    { id: 'node0', data: { size: 50, label: '0', x: 326, y: 268 } },
    { id: 'node1', data: { size: 30, label: '1', x: 280, y: 384 } },
    { id: 'node2', data: { size: 30, label: '2', x: 234, y: 167 } },
    { id: 'node3', data: { size: 30, label: '3', x: 391, y: 368 } },
    { id: 'node4', data: { size: 30, label: '4', x: 444, y: 209 } },
    { id: 'node5', data: { size: 30, label: '5', x: 378, y: 157 } },
    { id: 'node6', data: { size: 15, label: '6', x: 229, y: 400 } },
    { id: 'node7', data: { size: 15, label: '7', x: 281, y: 440 } },
    { id: 'node8', data: { size: 15, label: '8', x: 188, y: 119 } },
    { id: 'node9', data: { size: 15, label: '9', x: 287, y: 157 } },
    { id: 'node10', data: { size: 15, label: '10', x: 185, y: 200 } },
    { id: 'node11', data: { size: 15, label: '11', x: 238, y: 110 } },
    { id: 'node12', data: { size: 15, label: '12', x: 239, y: 221 } },
    { id: 'node13', data: { size: 15, label: '13', x: 176, y: 160 } },
    { id: 'node14', data: { size: 15, label: '14', x: 389, y: 423 } },
    { id: 'node15', data: { size: 15, label: '15', x: 441, y: 341 } },
    { id: 'node16', data: { size: 15, label: '16', x: 442, y: 398 } },
  ],
  edges: [
    { id: 'edge-1', source: 'node0', target: 'node1', data: { label: '0-1' } },
    { id: 'edge-2', source: 'node0', target: 'node2', data: { label: '0-2' } },
    { id: 'edge-3', source: 'node0', target: 'node3', data: { label: '0-3' } },
    { id: 'edge-4', source: 'node0', target: 'node4', data: { label: '0-4' } },
    { id: 'edge-5', source: 'node0', target: 'node5', data: { label: '0-5' } },
    { id: 'edge-6', source: 'node1', target: 'node6', data: { label: '1-6' } },
    { id: 'edge-7', source: 'node1', target: 'node7', data: { label: '1-7' } },
    { id: 'edge-8', source: 'node2', target: 'node8', data: { label: '2-8' } },
    { id: 'edge-9', source: 'node2', target: 'node9', data: { label: '2-9' } },
    { id: 'edge-10', source: 'node2', target: 'node10', data: { label: '2-10' } },
    { id: 'edge-11', source: 'node2', target: 'node11', data: { label: '2-11' } },
    { id: 'edge-12', source: 'node2', target: 'node12', data: { label: '2-12' } },
    { id: 'edge-13', source: 'node2', target: 'node13', data: { label: '2-13' } },
    { id: 'edge-14', source: 'node3', target: 'node14', data: { label: '3-14' } },
    { id: 'edge-15', source: 'node3', target: 'node15', data: { label: '3-15' } },
    { id: 'edge-16', source: 'node3', target: 'node16', data: { label: '3-16' } },
  ],
};

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  modes: {
    default: [
      'drag-node',
      {
        type: 'drag-canvas',
        enableOptimize: true, // enable the optimize to hide the shapes beside nodes' keyShape
      },
      {
        type: 'zoom-canvas',
        enableOptimize: true, // enable the optimize to hide the shapes beside nodes' keyShape
      },
    ],
  },
  // defaultNode: {
  //   size: [10, 10],
  //   style: {
  //     lineWidth: 2,
  //     fill: '#DEE9FF',
  //     stroke: '#5B8FF9',
  //   },
  // },
  // defaultEdge: {
  //   size: 1,
  //   style: {
  //     stroke: '#e2e2e2',
  //     lineAppendWidth: 2,
  //   },
  // },
  // nodeStateStyles: {
  //   yourStateName: {
  //     stroke: '#f00',
  //     lineWidth: 3,
  //   },
  // },
  // edgeStateStyles: {
  //   yourStateName: {
  //     stroke: '#f00',
  //     lineWidth: 3,
  //   },
  // },
  data,
});

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth, container.scrollHeight]);
  };

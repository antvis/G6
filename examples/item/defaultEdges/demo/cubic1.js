import G6 from '@antv/g6';

/**
 * The usage of cubic edge
 *  **/

G6.registerNode(
  'my-rect',
  {
    getAnchorPoints: function getAnchorPoints() {
      return [
        [0.5, 0],
        [0.5, 1],
      ];
    },
  },
  'rect',
);

const data = {
  nodes: [
    {
      id: 'node0',
      x: 200,
      y: 10,
      size: 20,
    },
    {
      id: 'node1',
      x: 200,
      y: 50,
      label: '1222',
      type: 'my-rect',
    },
    {
      id: 'node2',
      x: 150,
      y: 150,
      type: 'my-rect',
    },
    {
      id: 'node3',
      x: 250,
      y: 150,
      type: 'my-rect',
    },
    {
      id: 'node4',
      x: 200,
      y: 250,
      type: 'my-rect',
    },
  ],
  edges: [
    {
      source: 'node0',
      target: 'node1',
    },
    {
      source: 'node1',
      target: 'node2',
    },
    {
      source: 'node1',
      target: 'node3',
    },
    {
      source: 'node2',
      target: 'node4',
    },
    {
      source: 'node3',
      target: 'node4',
    },
  ],
};

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  // translate the graph to align the canvas's center, support by v3.5.1
  fitCenter: true,
  modes: {
    default: ['drag-canvas'],
  },
  defaultNode: {
    style: {
      fill: '#DEE9FF',
      stroke: '#5B8FF9',
    },
  },
  defaultEdge: {
    type: 'cubic-vertical',
    style: {
      stroke: '#F6BD16',
    },
  },
});
graph.data(data);
graph.render();

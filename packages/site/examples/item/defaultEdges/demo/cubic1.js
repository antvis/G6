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
  defaultEdge: {
    type: 'cubic-vertical',
    /* you can configure the global edge style as following lines */
    // style: {
    //   stroke: '#F6BD16',
    // },
  },
  /* styles for different states, there are built-in styles for states: active, inactive, selected, highlight, disable */
  // edgeStateStyles: {
  //   // edge style of active state
  //   active: {
  //     opacity: 0.5,
  //     stroke: '#f00'
  //   },
  //   // edge style of selected state
  //   selected: {
  //     stroke: '#ff0'
  //     lineWidth: 3,
  //   },
  // },
});
graph.data(data);
graph.render();

graph.on('edge:mouseenter', (evt) => {
  const { item } = evt;
  graph.setItemState(item, 'active', true);
});

graph.on('edge:mouseleave', (evt) => {
  const { item } = evt;
  graph.setItemState(item, 'active', false);
});

graph.on('edge:click', (evt) => {
  const { item } = evt;
  graph.setItemState(item, 'selected', true);
});
graph.on('canvas:click', (evt) => {
  graph.getEdges().forEach((edge) => {
    graph.clearItemStates(edge);
  });
});

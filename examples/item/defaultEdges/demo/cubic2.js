import G6 from '@antv/g6';

/**
 * The usage of cubic edge
 *
 *  **/
const data = {
  nodes: [
    {
      id: 'node5',
      x: 150,
      y: 200,
      label: '5',
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
    },
    {
      id: 'node6',
      x: 300,
      y: 150,
      label: '6',
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
    },
    {
      id: 'node7',
      x: 300,
      y: 250,
      label: '7',
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
    },
  ],
  edges: [
    {
      source: 'node5',
      target: 'node6',
      type: 'cubic-horizontal',
    },
    {
      source: 'node5',
      target: 'node7',
      type: 'cubic-horizontal',
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
    type: 'cubic-horizontal',
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
  graph.getEdges().forEach(edge => {
    graph.clearItemStates(edge);
  });
});

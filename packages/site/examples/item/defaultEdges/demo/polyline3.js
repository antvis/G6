import G6 from '@antv/g6';

/**
 * Usage of built-in polyline edge with controlPoints
 * by 十吾
 */

const data = {
  nodes: [
    {
      id: '4',
      x: 150,
      y: 100,
    },
    {
      id: '5',
      x: 350,
      y: 250,
    },
  ],
  edges: [
    {
      source: '4',
      target: '5',
      // assign the control points to control the bending positions
      controlPoints: [
        {
          x: 260,
          y: 80,
        },
        {
          x: 320,
          y: 50,
        },
        {
          x: 390,
          y: 110,
        },
        {
          x: 420,
          y: 110,
        },
        {
          x: 420,
          y: 140,
        },
      ],
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
  // make the edge link to the centers of the end nodes
  linkCenter: true,
  modes: {
    // behavior
    default: ['drag-node'],
  },
  defaultEdge: {
    type: 'polyline',
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

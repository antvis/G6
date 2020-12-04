import G6 from '@antv/g6';

/**
 * Built-in polyline edge with configurations
 * by 十吾
 */

const data = {
  nodes: [
    {
      id: '2',
      x: 150,
      y: 150,
    },
    {
      id: '3',
      x: 350,
      y: 250,
    },
  ],
  edges: [
    {
      source: '2',
      target: '3',
    },
  ],
};

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  /* translate the graph to align the canvas's center, support by v3.5.1 */
  fitCenter: true,
  modes: {
    /* behavior */
    default: ['drag-node'],
  },
  defaultEdge: {
    type: 'polyline',
    /* configure the bending radius and min distance to the end nodes */
    style: {
      radius: 10,
      offset: 30,
      endArrow: true,
      /* and other styles */
      // stroke: '#F6BD16',
    },
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

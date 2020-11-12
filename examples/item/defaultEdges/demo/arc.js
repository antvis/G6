import G6 from '@antv/g6';

/**
 * The usage of arc edge
 * by Shiwu
 */

const data = {
  nodes: [
    {
      id: '0',
      x: 150,
      y: 50,
    },
    {
      id: '1',
      x: 350,
      y: 250,
    },
  ],
  edges: [
    // Built-in arc edges
    {
      id: 'edge0',
      source: '0',
      target: '1',
      label: 'curveOffset = 20',
      curveOffset: 20,
    },
    {
      id: 'edge1',
      source: '0',
      target: '1',
      label: 'curveOffset = 50', // the bending degree
      curveOffset: 50,
    },
    {
      id: 'edge2',
      source: '0',
      target: '1',
      label: 'curveOffset = -50', // the bending degree
      curveOffset: -50,
    },
  ],
};

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  linkCenter: true,
  // translate the graph to align the canvas's center, support by v3.5.1
  fitCenter: true,
  modes: {
    // 支持的 behavior
    default: ['drag-node'],
  },
  defaultEdge: {
    type: 'arc',
    /* you can configure the global edge style as following lines */
    // style: {
    //   stroke: '#F6BD16',
    // },
    labelCfg: {
      autoRotate: true,
      refY: -10,
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

import G6 from '@antv/g6';

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  modes: {
    default: ['zoom-canvas', 'drag-canvas', 'drag-node'],
  },
  layout: {
    type: 'concentric',
    maxLevelDiff: 0.5,
    sortBy: 'degree',
  },
  animate: true,
  defaultNode: {
    size: 5,
    style: {
      fill: '#C6E5FF',
      stroke: '#5B8FF9',
    },
  },
  defaultEdge: {
    size: 1,
    color: '#e2e2e2',
  },
});

fetch('https://gw.alipayobjects.com/os/basement_prod/8dacf27e-e1bc-4522-b6d3-4b6d9b9ed7df.json')
  .then((res) => res.json())
  .then((data) => {
    graph.data(data);
    graph.render();
  });

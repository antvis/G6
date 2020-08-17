import G6 from '@antv/g6';

/**
 * The usage of arrows
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
      y: 50,
    },
    {
      id: '2',
      x: 150,
      y: 100,
    },
    {
      id: '3',
      x: 350,
      y: 100,
    },
  ],
  edges: [
    {
      id: 'edge0',
      source: '0',
      target: '1',
      label: 'custom arrow 1',
      style: {
        endArrow: {
          path: 'M 3,-5 L 3,5 L 15,10 L 15,-10 Z',
        },
      },
    },
    {
      id: 'edge1',
      source: '2',
      target: '3',
      label: 'custom arrow 2',
      style: {
        endArrow: {
          path: 'M0,0 L10,4 L14,14 L18,4 L28,0 L18,-4 L14,-14 L10,-4 Z',
        },
      },
    },
  ],
};

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;
data.edges.forEach((edge) => {
  edge.style.stroke = '#F6BD16';
  console.log(edge.style.endArrow);
  edge.style.endArrow.fill = '#F6BD16';
});
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  // translate the graph to align the canvas's center, support by v3.5.1
  fitCenter: true,
  defaultNode: {
    size: 15,
    style: {
      fill: '#DEE9FF',
      stroke: '#5B8FF9',
    },
  },
  modes: {
    // behaviors
    default: ['drag-node'],
  },
});

graph.data(data);
graph.render();

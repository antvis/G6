import G6 from '@antv/g6';

const data = {
  nodes: [
    {
      id: 'a',
      x: 200,
      y: 100,
      style: { fill: '#5B8FF9', stroke: null },
    },
    {
      id: 'b',
      x: 100,
      y: 200,
      style: { fill: '#5AD8A6', stroke: null },
    },
    {
      id: 'c',
      x: 300,
      y: 200,
      style: { fill: '#5D7092', stroke: null },
    },
  ],
  edges: [
    {
      id: 'a2b',
      source: 'a',
      target: 'b',
    },
    {
      id: 'a2c',
      source: 'a',
      target: 'c',
    },
  ],
};

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  animate: true,
});

graph.data(data);
graph.render();

setInterval(() => {
  data.nodes.forEach((node) => {
    node.x += Math.random() * 50 - 25;
    node.y += Math.random() * 50 - 25;
  });
  graph.changeData(data);
}, 600);

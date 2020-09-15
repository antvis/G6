import G6 from '@antv/g6';

const data = {
  nodes: [
    { id: 'node1', x: 350, y: 200 },
    { id: 'node2', x: 350, y: 250 },
    { id: 'node3', x: 100, y: 200 },
  ],
};
const descriptionDiv = document.createElement('div');
descriptionDiv.innerHTML =
  'Drag from a source node to a target node to create a new edge. Note that in trigger: \'drag\' mode cannot create a self-loop edge';
const graphDiv = document.getElementById('container');
graphDiv.appendChild(descriptionDiv);

const width = document.getElementById('container').scrollWidth;
const height = (document.getElementById('container').scrollHeight || 500) - 20;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  linkCenter: true,
  modes: {
    default: [{
      type: 'create-edge',
      trigger: 'drag' // 'click' by default. options: 'drag', 'click'
    }],
  },
  defaultEdge: {
    style: {
      stroke: '#F6BD16',
      lineWidth: 2
    },
  }
});

graph.data(data);
graph.render();

graph.on('aftercreateedge', e => {
  const edges = graph.save().edges;
  G6.Util.processParallelEdges(edges);
  graph.getEdges().forEach((edge, i) => {
    graph.updateItem(edge, edges[i])
  })
})
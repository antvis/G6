import G6 from '@antv/g6';

const data = {
  nodes: [
    { id: 'node1', x: 150, y: 250 },
    { id: 'node2', x: 350, y: 250 },
  ],
  edges: [{
    source: 'node1', target: 'node2'
  }]
};
const descriptionDiv = document.createElement('div');
descriptionDiv.innerHTML =
  'Press down the \'shift\' on keyboard and draw on the canvas.';
const graphDiv = document.getElementById('container');
graphDiv.appendChild(descriptionDiv);

const width = document.getElementById('container').scrollWidth;
const height = (document.getElementById('container').scrollHeight || 500) - 20;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  fitCenter: true,
  modes: {
    default: ['lasso-select', 'drag-node'],
  },
  nodeStateStyles: {
    selected: {
      stroke: '#f00',
      lineWidth: 3
    }
  },
  edgeStateStyles: {
    selected: {
      lineWidth: 3,
      stroke: '#f00'
    }
  }
});

graph.data(data);
graph.render();

graph.on('nodeselectchange', e => {
  console.log(e.selectedItems, e.select);
})

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
  'Draw on the canvas to create a lasso to select items.';
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
    default: [{
      type: 'lasso-select',
      delegateStyle: {
        fill: '#f00',
        fillOpacity: 0.05,
        stroke: '#f00',
        lineWidth: 1
      },
      onSelect: (nodes, edges) => {
        console.log('onSelect', nodes, edges)
      },
      selectedState: 'customStateName',
      trigger: 'drag'
    }, 'drag-node'],
  },
  nodeStateStyles: {
    customStateName: {
      stroke: '#f00',
      lineWidth: 3
    }
  },
  edgeStateStyles: {
    customStateName: {
      stroke: '#f00',
      lineWidth: 3
    }
  }
});

graph.data(data);
graph.render();

graph.on('nodeselectchange', e => {
  console.log(e.selectedItems, e.select);
})

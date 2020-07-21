import G6 from '@antv/g6';

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;
const graphDiv = document.getElementById('container');
const descriptionDiv = document.createElement('div');
descriptionDiv.innerHTML =
  'Doing layout... web-worker is enabled in this demo, so the layout will not block the page.';
graphDiv.appendChild(descriptionDiv);

const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  modes: {
    default: ['drag-canvas', 'drag-node'],
  },
  animate: true,
  defaultNode: {
    size: 10,
    style: {
      lineWidth: 2,
      stroke: '#5B8FF9',
      fill: '#C6E5FF',
    },
  },
  defaultEdge: {
    size: 1,
    color: '#e2e2e2',
    style: {
      endArrow: {
        path: 'M 0,0 L 8,4 L 8,-4 Z',
        fill: '#e2e2e2'
      },
    },
  },
  layout: {
    type: 'fruchterman',
    gpuEnabled: true,
    workerEnabled: true,
    maxIteration: 2000
  }
});



graph.on('afterlayout', () => {
  descriptionDiv.innerHTML = 'Done!';
});

fetch('https://gw.alipayobjects.com/os/basement_prod/7bacd7d1-4119-4ac1-8be3-4c4b9bcbc25f.json')
  .then(res => res.json())
  .then(data => {
    graph.data(data);
    graph.render();
  });

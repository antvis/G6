import { Graph } from '@antv/g6';

const container = document.getElementById('container');
const descriptionDiv = document.createElement('div');
descriptionDiv.innerHTML = 'Doing layout... web-worker is enabled in this demo, so the layout will not block the page.';
container.appendChild(descriptionDiv);

fetch('https://gw.alipayobjects.com/os/basement_prod/7bacd7d1-4119-4ac1-8be3-4c4b9bcbc25f.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      layout: {
        type: 'fruchterman',
        speed: 20,
        gravity: 1,
        maxIteration: 10000,
        workerEnabled: true,
      },
      node: {
        style: {
          size: 6,
        },
      },
      edge: {
        style: {
          stroke: '#ddd',
        },
      },
      behaviors: ['drag-canvas', 'drag-element'],
    });

    graph.render();

    graph.on('afterlayout', () => {
      descriptionDiv.innerHTML = 'Layout in Worker, Done!';
    });
  });

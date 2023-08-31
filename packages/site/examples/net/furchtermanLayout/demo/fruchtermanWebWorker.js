import { Graph, Extensions, extend } from '@antv/g6';

const ExtGraph = extend(Graph, {
  layouts: {
    fruchterman: Extensions.FruchtermanLayout,
  },
});

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = (container.scrollHeight || 500) - 20;

const descriptionDiv = document.createElement('div');
descriptionDiv.innerHTML = 'Doing layout... web-worker is enabled in this demo, so the layout will not block the page.';
container.appendChild(descriptionDiv);

fetch('https://gw.alipayobjects.com/os/basement_prod/7bacd7d1-4119-4ac1-8be3-4c4b9bcbc25f.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new ExtGraph({
      container: 'container',
      width,
      height,
      transform: ['transform-v4-data'],
      modes: {
        default: ['drag-canvas', 'drag-node'],
      },
      layout: {
        type: 'fruchterman',
        speed: 20,
        gravity: 1,
        maxIteration: 10000,
        gravity: 1,
        workerEnabled: true,
      },
      node: {
        keyShape: {
          r: 6,
        },
      },
      data,
    });

    graph.on('afterlayout', () => {
      descriptionDiv.innerHTML = 'Done!';
    });

    if (typeof window !== 'undefined')
      window.onresize = () => {
        if (!graph || graph.destroyed) return;
        if (!container || !container.scrollWidth || !container.scrollHeight) return;
        graph.setSize([container.scrollWidth, container.scrollHeight - 20]);
      };
  });

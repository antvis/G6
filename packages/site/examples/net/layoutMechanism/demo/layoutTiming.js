import G6 from '@antv/g6';

const tipDiv = document.createElement('div');
const container = document.getElementById('container');
container.appendChild(tipDiv);
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

fetch('https://gw.alipayobjects.com/os/basement_prod/7bacd7d1-4119-4ac1-8be3-4c4b9bcbc25f.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new G6.Graph({
      container: 'container',
      width,
      height,
      transform: ['transform-v4-data'],
      layout: {
        type: 'force',
        preventOverlap: true,
        nodeSize: 32,
        workerEnabled: true,
      },
      modes: {
        default: ['drag-node'],
      },
      node: {
        keyShape: {
          r: 6,
        },
      },
      edge: {
        keyShape: {
          opacity: 0.3,
        },
      },
      data,
    });
    graph.on('beforelayout', function () {
      tipDiv.innerHTML = 'Doing force-directed layout... the text will be changed after the layout being done.';
    });
    graph.on('afterlayout', function () {
      tipDiv.innerHTML = 'Done!';
    });

    if (typeof window !== 'undefined')
      window.onresize = () => {
        if (!graph || graph.destroyed) return;
        if (!container || !container.scrollWidth || !container.scrollHeight) return;
        graph.setSize([container.scrollWidth, container.scrollHeight]);
      };
  });

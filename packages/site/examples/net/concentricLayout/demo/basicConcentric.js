import G6 from '@antv/g6';

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;
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
  },
});

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.get('destroyed')) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.changeSize(container.scrollWidth, container.scrollHeight);
  };

fetch('https://gw.alipayobjects.com/os/basement_prod/8dacf27e-e1bc-4522-b6d3-4b6d9b9ed7df.json')
  .then((res) => res.json())
  .then((data) => {
    graph.data(data);
    graph.render();
  });

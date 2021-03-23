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
    type: 'forceAtlas2',
    preventOverlap: true,
    kr: 10,
    center: [250, 250],
  },
  defaultNode: {
    size: 20,
  },
});

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
  .then((res) => res.json())
  .then((data) => {
    data.nodes.forEach(node => {
      node.x = Math.random() * 1;
    });
    graph.on('afterlayout', e => {
      graph.fitView()
    })
    graph.data(data);
    graph.render();
  });

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.get('destroyed')) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.changeSize(container.scrollWidth, container.scrollHeight);
  };

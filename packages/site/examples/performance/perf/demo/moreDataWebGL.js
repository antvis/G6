import { Graph, Extensions, extend } from '@antv/g6';
import Stats from 'stats.js';

const ExtGraph = extend(Graph, {
  behaviors: {
    'brush-select': Extensions.BrushSelect,
  },
});

const container = document.getElementById('container');
const descriptionDiv = document.createElement('div');
descriptionDiv.innerHTML = `正在渲染大规模数据，请稍等……`;
container.appendChild(descriptionDiv);
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

const graph = new ExtGraph({
  container: 'container',
  width,
  height,
  renderer: 'webgl',
  transform: ['transform-v4-data'],
  modes: {
    default: [
      {
        type: 'zoom-canvas',
        enableOptimize: false,
        optimizeZoom: 0.9,
      },
      {
        type: 'drag-canvas',
        enableOptimize: false,
      },
      'drag-node',
      'brush-select',
    ],
  },
  node: {
    keyShape: {
      r: 2,
    },
  },
  edge: {
    keyShape: {
      opacity: 0.3,
    },
  },
});

fetch('https://gw.alipayobjects.com/os/bmw-prod/f1565312-d537-4231-adf5-81cb1cd3a0e8.json')
  .then((res) => res.json())
  .then((data) => {
    data.edges.forEach((edge) => (edge.id = `edge-${Math.random()}`));
    graph.read(data);
    const nodeLen = data.nodes.length;
    const edgeLen = data.edges.length;
    descriptionDiv.innerHTML = `节点数量：${nodeLen}, 边数量：${edgeLen}, 图元数量：${nodeLen + edgeLen}`;
  });

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth, container.scrollHeight]);
  };

// stats
const stats = new Stats();
stats.showPanel(0);
const $stats = stats.dom;
$stats.style.position = 'absolute';
$stats.style.left = '0px';
$stats.style.top = '0px';
container.appendChild($stats);
const update = () => {
  if (stats) {
    stats.update();
  }
  requestAnimationFrame(update);
};
update();

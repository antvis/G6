import { Graph, Extensions, extend } from '@antv/g6';

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
  modes: {
    default: [
      {
        type: 'zoom-canvas',
        enableOptimize: true,
        optimizeZoom: 0.9,
      },
      {
        type: 'drag-canvas',
        enableOptimize: true,
      },
      'drag-node',
      'brush-select',
    ],
  },
});

fetch('https://gw.alipayobjects.com/os/bmw-prod/f1565312-d537-4231-adf5-81cb1cd3a0e8.json')
  .then((res) => res.json())
  .then((data) => {
    graph.read(data);

    const graphData = graph.save();
    const nodeLen = graphData.nodes.length;
    const edgeLen = graphData.edges.length;
    descriptionDiv.innerHTML = `节点数量：${nodeLen}, 边数量：${edgeLen}, 图元数量：${nodeLen + edgeLen}`;
  });

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.get('destroyed')) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.changeSize(container.scrollWidth, container.scrollHeight);
  };

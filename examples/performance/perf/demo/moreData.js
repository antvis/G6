import G6 from '@antv/g6'

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  defaultNode: {
    size: 2,
    style: {
      fill: '#C6E5FF',
      stroke: '#5B8FF9',
      lineWidth: 0.3,
    },
    labelCfg: {
      style: {
        fontSize: 3,
      },
      position: 'right',
      offset: 1,
    },
  },
  defaultEdge: {
    size: 0.1,
    color: '#333',
    opacity: 0.2
  },
  nodeStateStyles: {
    selected: {
      fill: 'steelblue',
      stroke: '#000',
      lineWidth: 1,
    },
  },
  modes: {
    default: [{
      type: 'zoom-canvas',
      enableOptimize: true,
      optimizeZoom: 0.9
    }, {
      type: 'drag-canvas',
      enableOptimize: true,
    }, 'drag-node', 'brush-select'], 
  },
});

fetch(
  'https://gw.alipayobjects.com/os/bmw-prod/f1565312-d537-4231-adf5-81cb1cd3a0e8.json',
)
  .then(res => res.json())
  .then(data => {
    graph.data(data);
    graph.render();

    const graphData = graph.save()
    const nodeLen = graphData.nodes.length
    const edgeLen = graphData.edges.length
    const container = document.getElementById('container');
    const descriptionDiv = document.createElement('div');
    descriptionDiv.style.position = 'absolute'
    descriptionDiv.style.top = '0px'
    descriptionDiv.innerHTML = `节点数量：${nodeLen}, 边数量：${edgeLen}, 图元数量：${nodeLen + edgeLen}`;
    container.appendChild(descriptionDiv);
  });
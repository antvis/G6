import G6 from '@antv/g6'

const mapNodeSize = (nodes, propertyName, visualRange) => {
  let minp = 9999999999;
  let maxp = -9999999999;
  nodes.forEach(node => {
    node[propertyName] = Math.pow(node[propertyName], 1 / 3);
    minp = node[propertyName] < minp ? node[propertyName] : minp;
    maxp = node[propertyName] > maxp ? node[propertyName] : maxp;
  });
  const rangepLength = maxp - minp;
  const rangevLength = visualRange[1] - visualRange[0];
  nodes.forEach(node => {
    node.size = ((node[propertyName] - minp) / rangepLength) * rangevLength + visualRange[0];
  });
};

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
  'https://gw.alipayobjects.com/os/basement_prod/da5a1b47-37d6-44d7-8d10-f3e046dabf82.json',
)
  .then(res => res.json())
  .then(data => {
    data.nodes.forEach(node => {
      node.label = node.olabel;
      node.degree = 0;
      data.edges.forEach(edge => {
        if (edge.source === node.id || edge.target === node.id) {
          node.degree++;
        }
      });
    });
    mapNodeSize(data.nodes, 'degree', [1, 10]);
    graph.data(data);
    graph.render();

    const graphData = graph.save()
    const nodeLen = graphData.nodes.length
    const edgeLen = graphData.edges.length
    const container = document.getElementById('container');
    const descriptionDiv = document.createElement('div');
    descriptionDiv.style.position = 'absolute'
    descriptionDiv.style.top = '0px'
    descriptionDiv.innerHTML = `节点数量：${nodeLen}, 边数量：${edgeLen}, 图元数量：${nodeLen * 2 + edgeLen}`;
    container.appendChild(descriptionDiv);
  });
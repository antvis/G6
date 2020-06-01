import G6 from '@antv/g6';

const setEdgesCurOffset = (edges, offsetDiff = 30) => {
  const len = edges.length;
  const edgeMap = {};
  edges.forEach(edge => {
    const { source, target } = edge;
    let sourceTarget = `${source}-${target}`;
    if (source > target) sourceTarget = `${source}-${target}`;

    if (!edgeMap[sourceTarget]) {
      edgeMap[sourceTarget] = []
    }
    edgeMap[sourceTarget].push(edge);
  });


  for (const key in edgeMap) {
    const arcEdges = edgeMap[key];
    const { length } = arcEdges;
    for (let k = 0; k < length; k++) {
      const current = arcEdges[k];
      const sign = k % 2 === 0 ? 1 : -1;
      if (length % 2 === 1) {
        current.curveOffset = sign * Math.ceil(k / 2) * offsetDiff;
      } else {
        current.curveOffset = sign * (Math.floor((k) / 2) * offsetDiff + offsetDiff / 2);
      }
      delete current.groupById;
    }
  }
  return edges;
};

const data = {
  nodes: [
    {
      id: 'node1',
      x: 50,
      y: 350,
      label: 'A',
    },
    {
      id: 'node2',
      x: 250,
      y: 150,
      label: 'B',
    },
    {
      id: 'node3',
      x: 450,
      y: 350,
      label: 'C',
    },
  ],
  edges: []
};

for (let i = 0; i < 10; i++) {
  data.edges.push({
    source: 'node1',
    target: 'node2',
    label: `${i}th edge of A-B`
  })
}
for (let i = 0; i < 5; i++) {
  data.edges.push({
    source: 'node2',
    target: 'node3',
    label: `${i}th edge of B-C`
  })
}

setEdgesCurOffset(data.edges);

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  // translate the graph to align the canvas's center, support by v3.5.1
  fitCenter: true,
  defaultNode: {
    type: 'circle',
    size: [40],
    color: '#5B8FF9',
    style: {
      fill: '#9EC9FF',
      lineWidth: 3,
    },
    labelCfg: {
      style: {
        fill: '#000',
        fontSize: 14,
      }
    },
  },
  defaultEdge: {
    type: 'quadratic',
    labelCfg: {
      autoRotate: true,
    },
  },
  modes: {
    default: ['drag-canvas', 'drag-node'],
  },
  nodeStateStyles: {
    // style configurations for hover state
    hover: {
      fillOpacity: 0.8,
    },
    // style configurations for selected state
    selected: {
      lineWidth: 5,
    },
  },
});

graph.data(data);
graph.render();

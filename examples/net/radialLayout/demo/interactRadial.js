import G6 from '@antv/g6';

const data = {
  nodes: [
    {
      id: '0',
      label: '0',
    },
    {
      id: '1',
      label: '1',
    },
    {
      id: '2',
      label: '2',
    },
    {
      id: '3',
      label: '3',
    },
    {
      id: '4',
      label: '4',
    },
    {
      id: '5',
      label: '5',
    },
    {
      id: '6',
      label: '6',
    },
    {
      id: '7',
      label: '7',
    },
    {
      id: '8',
      label: '8',
    },
    {
      id: '9',
      label: '9',
    },
    {
      id: '10',
      label: '10',
    },
    {
      id: '11',
      label: '11',
    },
    {
      id: '12',
      label: '12',
    },
    {
      id: '13',
      label: '13',
    },
    {
      id: '14',
      label: '14',
    },
    {
      id: '15',
      label: '15',
    },
    {
      id: '16',
      label: '16',
    },
    {
      id: '17',
      label: '17',
    },
    {
      id: '18',
      label: '18',
    },
    {
      id: '19',
      label: '19',
    },
    {
      id: '20',
      label: '20',
    },
    {
      id: '21',
      label: '21',
    },
    {
      id: '22',
      label: '22',
    },
    {
      id: '23',
      label: '23',
    },
    {
      id: '24',
      label: '24',
    },
    {
      id: '25',
      label: '25',
    },
    {
      id: '26',
      label: '26',
    },
    {
      id: '27',
      label: '27',
    },
    {
      id: '28',
      label: '28',
    },
    {
      id: '29',
      label: '29',
    },
    {
      id: '30',
      label: '30',
    },
    {
      id: '31',
      label: '31',
    },
    {
      id: '32',
      label: '32',
    },
    {
      id: '33',
      label: '33',
    },
  ],
  edges: [
    {
      source: '0',
      target: '1',
    },
    {
      source: '0',
      target: '2',
    },
    {
      source: '0',
      target: '3',
    },
    {
      source: '0',
      target: '4',
    },
    {
      source: '0',
      target: '5',
    },
    {
      source: '0',
      target: '7',
    },
    {
      source: '0',
      target: '8',
    },
    {
      source: '0',
      target: '9',
    },
    {
      source: '0',
      target: '10',
    },
    {
      source: '0',
      target: '11',
    },
    {
      source: '0',
      target: '13',
    },
    {
      source: '0',
      target: '14',
    },
    {
      source: '0',
      target: '15',
    },
    {
      source: '0',
      target: '16',
    },
    {
      source: '2',
      target: '3',
    },
    {
      source: '4',
      target: '5',
    },
    {
      source: '4',
      target: '6',
    },
    {
      source: '5',
      target: '6',
    },
    {
      source: '7',
      target: '13',
    },
    {
      source: '8',
      target: '14',
    },
    {
      source: '9',
      target: '10',
    },
    {
      source: '10',
      target: '22',
    },
    {
      source: '10',
      target: '14',
    },
    {
      source: '10',
      target: '12',
    },
    {
      source: '10',
      target: '24',
    },
    {
      source: '10',
      target: '21',
    },
    {
      source: '10',
      target: '20',
    },
    {
      source: '11',
      target: '24',
    },
    {
      source: '11',
      target: '22',
    },
    {
      source: '11',
      target: '14',
    },
    {
      source: '12',
      target: '13',
    },
    {
      source: '16',
      target: '17',
    },
    {
      source: '16',
      target: '18',
    },
    {
      source: '16',
      target: '21',
    },
    {
      source: '16',
      target: '22',
    },
    {
      source: '17',
      target: '18',
    },
    {
      source: '17',
      target: '20',
    },
    {
      source: '18',
      target: '19',
    },
    {
      source: '19',
      target: '20',
    },
    {
      source: '19',
      target: '33',
    },
    {
      source: '19',
      target: '22',
    },
    {
      source: '19',
      target: '23',
    },
    {
      source: '20',
      target: '21',
    },
    {
      source: '21',
      target: '22',
    },
    {
      source: '22',
      target: '24',
    },
    {
      source: '22',
      target: '25',
    },
    {
      source: '22',
      target: '26',
    },
    {
      source: '22',
      target: '23',
    },
    {
      source: '22',
      target: '28',
    },
    {
      source: '22',
      target: '30',
    },
    {
      source: '22',
      target: '31',
    },
    {
      source: '22',
      target: '32',
    },
    {
      source: '22',
      target: '33',
    },
    {
      source: '23',
      target: '28',
    },
    {
      source: '23',
      target: '27',
    },
    {
      source: '23',
      target: '29',
    },
    {
      source: '23',
      target: '30',
    },
    {
      source: '23',
      target: '31',
    },
    {
      source: '23',
      target: '33',
    },
    {
      source: '32',
      target: '33',
    },
  ],
};

const data2_m = {
  nodes: [
    {
      id: '2',
      label: '2',
    },
    {
      id: '1001',
      label: '1001',
    },
    {
      id: '1002',
      label: '1002',
    },
    {
      id: '1003',
      label: '1003',
    },
    {
      id: '1004',
      label: '1004',
    },
    {
      id: '1005',
      label: '1005',
    },
    {
      id: '1006',
      label: '1006',
    },
    {
      id: '1007',
      label: '1007',
    },
    {
      id: '1008',
      label: '1008',
    },
    {
      id: '1009',
      label: '1009',
    },
    {
      id: '1010',
      label: '1010',
    },
    {
      id: '1011',
      label: '1011',
    },
    {
      id: '1012',
      label: '1012',
    },
    {
      id: '1013',
      label: '1013',
    },
    {
      id: '1014',
      label: '1014',
    },
    {
      id: '1015',
      label: '1015',
    },
    {
      id: '1016',
      label: '1016',
    },
    {
      id: '1017',
      label: '1017',
    },
    {
      id: '1018',
      label: '1018',
    },
    {
      id: '1019',
      label: '1019',
    },
    {
      id: '1020',
      label: '1020',
    },
    {
      id: '5',
      label: '5',
    },
    {
      id: '41',
      label: '41',
    },
  ],
  edges: [
    {
      source: '2',
      target: '1001',
    },
    {
      source: '2',
      target: '1002',
    },
    {
      source: '2',
      target: '1003',
    },
    {
      source: '2',
      target: '1004',
    },
    {
      source: '2',
      target: '1005',
    },
    {
      source: '1001',
      target: '1006',
    },
    {
      source: '1001',
      target: '1007',
    },
    {
      source: '1001',
      target: '1008',
    },
    {
      source: '1001',
      target: '1009',
    },
    {
      source: '1001',
      target: '1010',
    },
    {
      source: '1002',
      target: '1006',
    },
    {
      source: '1002',
      target: '1007',
    },
    {
      source: '1002',
      target: '1008',
    },
    {
      source: '1002',
      target: '1009',
    },
    {
      source: '1002',
      target: '1010',
    },
    {
      source: '1003',
      target: '1006',
    },
    {
      source: '1003',
      target: '1007',
    },
    {
      source: '1003',
      target: '1008',
    },
    {
      source: '1003',
      target: '1009',
    },
    {
      source: '1003',
      target: '1010',
    },
    {
      source: '1010',
      target: '1011',
    },
    {
      source: '1010',
      target: '1012',
    },
    {
      source: '1010',
      target: '1013',
    },
    {
      source: '1010',
      target: '1014',
    },
    {
      source: '1010',
      target: '1015',
    },
    {
      source: '1010',
      target: '1016',
    },
    {
      source: '1010',
      target: '1017',
    },
    {
      source: '1008',
      target: '1014',
    },
    {
      source: '1008',
      target: '1015',
    },
    {
      source: '1008',
      target: '1016',
    },
    {
      source: '1008',
      target: '1017',
    },
    {
      source: '1017',
      target: '1018',
    },
    {
      source: '1017',
      target: '1019',
    },
    {
      source: '1016',
      target: '1020',
    },
    {
      source: '1016',
      target: '1020',
    },
    {
      source: '5',
      target: '1020',
    },
    {
      source: '41',
      target: '1020',
    },
    {
      source: '5',
      target: '1009',
    },
    {
      source: '41',
      target: '1009',
    },
  ],
};

const graphDiv = document.getElementById('container');
const descriptionDiv = document.createElement('div');
descriptionDiv.innerHTML = 'Try to click node 2!';
graphDiv.appendChild(descriptionDiv);

const width = graphDiv.scrollWidth;
const height = graphDiv.scrollHeight - 30;
const mainUnitRadius = 80;
const focusNode = data.nodes[22];
focusNode.style = {
  stroke: '#00419F',
  fill: '#729FFC',
  lineWidth: 2,
};
data.nodes[2].style = {
  stroke: '#00419F',
  fill: '#729FFC',
  lineWidth: 2,
};

const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  layout: {
    type: 'radial',
    maxIteration: 200,
    focusNode,
    unitRadius: mainUnitRadius,
    linkDistance: 100,
    preventOverlap: true,
    nodeSize: 20,
  },
  animate: true,
  modes: {
    default: ['drag-node', 'click-select', 'click-add-node', 'drag-canvas'],
  },
  defaultNode: {
    size: 20,
    style: {
      lineWidth: 2,
      fill: '#C6E5FF',
      stroke: '#5B8FF9',
    },
  },
  defaultEdge: {
    size: 1,
    color: '#e2e2e2',
  },
});

graph.data({
  nodes: data.nodes,
  edges: data.edges.map((edge, i) => {
    edge.id = `edge${i}`;
    return Object.assign({}, edge);
  }),
});
graph.render();

graph.on('node:click', (ev) => {
  const itemModel = ev.item.getModel();
  const nodes = graph.getNodes();
  const edges = graph.getEdges();
  let newData;
  if (itemModel.id === '2') newData = data2_m;
  else return;
  const newNodeModels = newData.nodes;
  const newEdgeModels = [];
  // deduplication the items in newEdgeModels
  newData.edges.forEach(function (e) {
    let exist = false;
    newEdgeModels.forEach(function (ne) {
      if (ne.source === e.source && ne.target === e.target) exist = true;
    });
    if (!exist) {
      newEdgeModels.push(e);
    }
  });

  // for graph.changeData()
  const allNodeModels = [],
    allEdgeModels = [];

  // add new nodes to graph
  const nodeMap = new Map();
  nodes.forEach((n) => {
    const nModel = n.getModel();
    nodeMap.set(nModel.id, n);
  });
  newNodeModels.forEach((nodeModel) => {
    if (nodeMap.get(nodeModel.id) === undefined) {
      // set the initial positions of the new nodes to the focus(clicked) node
      nodeModel.x = itemModel.x;
      nodeModel.y = itemModel.y;
      graph.addItem('node', nodeModel);
    }
  });

  // add new edges to graph
  const edgeMap = new Map();
  edges.forEach(function (e, i) {
    const eModel = e.getModel();
    edgeMap.set(eModel.source + ',' + eModel.target, i);
  });
  const oldEdgeNum = edges.length;
  newEdgeModels.forEach(function (em, i) {
    const exist = edgeMap.get(em.source + ',' + em.target);
    if (exist === undefined) {
      graph.addItem('edge', em);
      edgeMap.set(em.source + ',' + em.target, oldEdgeNum + i);
    }
  });

  edges.forEach((e) => {
    allEdgeModels.push(e.getModel());
  });
  nodes.forEach((n) => {
    allNodeModels.push(n.getModel());
  });
  // the max degree about foces(clicked) node in the newly added data
  const maxDegree = 4;
  // the max degree about foces(clicked) node in the original data
  const oMaxDegree = 3;
  const unitRadius = 40;
  // re-place the clicked node far away the exisiting items
  // along the radius from center node to it
  const vx = itemModel.x - focusNode.x;
  const vy = itemModel.y - focusNode.y;
  const vlength = Math.sqrt(vx * vx + vy * vy);
  const ideallength = unitRadius * maxDegree + mainUnitRadius * oMaxDegree;
  itemModel.x = (ideallength * vx) / vlength + focusNode.x;
  itemModel.y = (ideallength * vy) / vlength + focusNode.y;

  const subRadialLayout = new G6.Layout.radial({
    center: [itemModel.x, itemModel.y],
    maxIteration: 200,
    focusNode: '2',
    unitRadius,
    linkDistance: 180,
    preventOverlap: true,
  });
  subRadialLayout.init({
    nodes: newNodeModels,
    edges: newEdgeModels,
  });
  subRadialLayout.execute();
  graph.positionsAnimate();
  graph.data({
    nodes: allNodeModels,
    edges: allEdgeModels,
  });
});

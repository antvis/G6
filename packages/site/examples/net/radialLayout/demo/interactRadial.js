// TODO: skip this demo sincle sub layout is wrong for this demo

import { Graph, Extensions, extend } from '@antv/g6';
// import by this way in your project. 在您的项目中请这样引入
// import { Graph as GraphCore } from '@antv/graphlib';

const { Graph: GraphCore } = window.GraphLib;

const ExtGraph = extend(Graph, {
  layouts: {
    radial: Extensions.RadialLayout,
  },
});
const data = {
  nodes: [
    {
      id: '0',
      data: {
        label: '0',
      },
    },
    {
      id: '1',
      data: {
        label: '1',
      },
    },
    {
      id: '2',
      data: {
        label: '2',
      },
    },
    {
      id: '3',
      data: {
        label: '3',
      },
    },
    {
      id: '4',
      data: {
        label: '4',
      },
    },
    {
      id: '5',
      data: {
        label: '5',
      },
    },
    {
      id: '6',
      data: {
        label: '6',
      },
    },
    {
      id: '7',
      data: {
        label: '7',
      },
    },
    {
      id: '8',
      data: {
        label: '8',
      },
    },
    {
      id: '9',
      data: {
        label: '9',
      },
    },
    {
      id: '10',
      data: {
        label: '10',
      },
    },
    {
      id: '11',
      data: {
        label: '11',
      },
    },
    {
      id: '12',
      data: {
        label: '12',
      },
    },
    {
      id: '13',
      data: {
        label: '13',
      },
    },
    {
      id: '14',
      data: {
        label: '14',
      },
    },
    {
      id: '15',
      data: {
        label: '15',
      },
    },
    {
      id: '16',
      data: {
        label: '16',
      },
    },
    {
      id: '17',
      data: {
        label: '17',
      },
    },
    {
      id: '18',
      data: {
        label: '18',
      },
    },
    {
      id: '19',
      data: {
        label: '19',
      },
    },
    {
      id: '20',
      data: {
        label: '20',
      },
    },
    {
      id: '21',
      data: {
        label: '21',
      },
    },
    {
      id: '22',
      data: {
        label: '22',
      },
    },
    {
      id: '23',
      data: {
        label: '23',
      },
    },
    {
      id: '24',
      data: {
        label: '24',
      },
    },
    {
      id: '25',
      data: {
        label: '25',
      },
    },
    {
      id: '26',
      data: {
        label: '26',
      },
    },
    {
      id: '27',
      data: {
        label: '27',
      },
    },
    {
      id: '28',
      data: {
        label: '28',
      },
    },
    {
      id: '29',
      data: {
        label: '29',
      },
    },
    {
      id: '30',
      data: {
        label: '30',
      },
    },
    {
      id: '31',
      data: {
        label: '31',
      },
    },
    {
      id: '32',
      data: {
        label: '32',
      },
    },
    {
      id: '33',
      data: {
        label: '33',
      },
    },
  ],
  edges: [
    {
      id: 'edge-841',
      source: '0',
      target: '1',
    },
    {
      id: 'edge-655',
      source: '0',
      target: '2',
    },
    {
      id: 'edge-404',
      source: '0',
      target: '3',
    },
    {
      id: 'edge-601',
      source: '0',
      target: '4',
    },
    {
      id: 'edge-554',
      source: '0',
      target: '5',
    },
    {
      id: 'edge-50',
      source: '0',
      target: '7',
    },
    {
      id: 'edge-369',
      source: '0',
      target: '8',
    },
    {
      id: 'edge-239',
      source: '0',
      target: '9',
    },
    {
      id: 'edge-475',
      source: '0',
      target: '10',
    },
    {
      id: 'edge-342',
      source: '0',
      target: '11',
    },
    {
      id: 'edge-63',
      source: '0',
      target: '13',
    },
    {
      id: 'edge-26',
      source: '0',
      target: '14',
    },
    {
      id: 'edge-33',
      source: '0',
      target: '15',
    },
    {
      id: 'edge-867',
      source: '0',
      target: '16',
    },
    {
      id: 'edge-620',
      source: '2',
      target: '3',
    },
    {
      id: 'edge-843',
      source: '4',
      target: '5',
    },
    {
      id: 'edge-832',
      source: '4',
      target: '6',
    },
    {
      id: 'edge-157',
      source: '5',
      target: '6',
    },
    {
      id: 'edge-48',
      source: '7',
      target: '13',
    },
    {
      id: 'edge-114',
      source: '8',
      target: '14',
    },
    {
      id: 'edge-913',
      source: '9',
      target: '10',
    },
    {
      id: 'edge-494',
      source: '10',
      target: '22',
    },
    {
      id: 'edge-960',
      source: '10',
      target: '14',
    },
    {
      id: 'edge-384',
      source: '10',
      target: '12',
    },
    {
      id: 'edge-94',
      source: '10',
      target: '24',
    },
    {
      id: 'edge-361',
      source: '10',
      target: '21',
    },
    {
      id: 'edge-299',
      source: '10',
      target: '20',
    },
    {
      id: 'edge-645',
      source: '11',
      target: '24',
    },
    {
      id: 'edge-487',
      source: '11',
      target: '22',
    },
    {
      id: 'edge-622',
      source: '11',
      target: '14',
    },
    {
      id: 'edge-21',
      source: '12',
      target: '13',
    },
    {
      id: 'edge-286',
      source: '16',
      target: '17',
    },
    {
      id: 'edge-643',
      source: '16',
      target: '18',
    },
    {
      id: 'edge-306',
      source: '16',
      target: '21',
    },
    {
      id: 'edge-45',
      source: '16',
      target: '22',
    },
    {
      id: 'edge-912',
      source: '17',
      target: '18',
    },
    {
      id: 'edge-820',
      source: '17',
      target: '20',
    },
    {
      id: 'edge-399',
      source: '18',
      target: '19',
    },
    {
      id: 'edge-186',
      source: '19',
      target: '20',
    },
    {
      id: 'edge-220',
      source: '19',
      target: '33',
    },
    {
      id: 'edge-577',
      source: '19',
      target: '22',
    },
    {
      id: 'edge-191',
      source: '19',
      target: '23',
    },
    {
      id: 'edge-390',
      source: '20',
      target: '21',
    },
    {
      id: 'edge-304',
      source: '21',
      target: '22',
    },
    {
      id: 'edge-888',
      source: '22',
      target: '24',
    },
    {
      id: 'edge-796',
      source: '22',
      target: '25',
    },
    {
      id: 'edge-716',
      source: '22',
      target: '26',
    },
    {
      id: 'edge-100',
      source: '22',
      target: '23',
    },
    {
      id: 'edge-933',
      source: '22',
      target: '28',
    },
    {
      id: 'edge-193',
      source: '22',
      target: '30',
    },
    {
      id: 'edge-748',
      source: '22',
      target: '31',
    },
    {
      id: 'edge-176',
      source: '22',
      target: '32',
    },
    {
      id: 'edge-525',
      source: '22',
      target: '33',
    },
    {
      id: 'edge-795',
      source: '23',
      target: '28',
    },
    {
      id: 'edge-311',
      source: '23',
      target: '27',
    },
    {
      id: 'edge-499',
      source: '23',
      target: '29',
    },
    {
      id: 'edge-418',
      source: '23',
      target: '30',
    },
    {
      id: 'edge-409',
      source: '23',
      target: '31',
    },
    {
      id: 'edge-426',
      source: '23',
      target: '33',
    },
    {
      id: 'edge-876',
      source: '32',
      target: '33',
    },
  ],
};

const data2_m = {
  nodes: [
    {
      id: '2',
      data: {
        label: '2',
      },
    },
    {
      id: '1001',
      data: {
        label: '1001',
      },
    },
    {
      id: '1002',
      data: {
        label: '1002',
      },
    },
    {
      id: '1003',
      data: {
        label: '1003',
      },
    },
    {
      id: '1004',
      data: {
        label: '1004',
      },
    },
    {
      id: '1005',
      data: {
        label: '1005',
      },
    },
    {
      id: '1006',
      data: {
        label: '1006',
      },
    },
    {
      id: '1007',
      data: {
        label: '1007',
      },
    },
    {
      id: '1008',
      data: {
        label: '1008',
      },
    },
    {
      id: '1009',
      data: {
        label: '1009',
      },
    },
    {
      id: '1010',
      data: {
        label: '1010',
      },
    },
    {
      id: '1011',
      data: {
        label: '1011',
      },
    },
    {
      id: '1012',
      data: {
        label: '1012',
      },
    },
    {
      id: '1013',
      data: {
        label: '1013',
      },
    },
    {
      id: '1014',
      data: {
        label: '1014',
      },
    },
    {
      id: '1015',
      data: {
        label: '1015',
      },
    },
    {
      id: '1016',
      data: {
        label: '1016',
      },
    },
    {
      id: '1017',
      data: {
        label: '1017',
      },
    },
    {
      id: '1018',
      data: {
        label: '1018',
      },
    },
    {
      id: '1019',
      data: {
        label: '1019',
      },
    },
    {
      id: '1020',
      data: {
        label: '1020',
      },
    },
    {
      id: '5',
      data: {
        label: '5',
      },
    },
    {
      id: '41',
      data: {
        label: '41',
      },
    },
  ],
  edges: [
    {
      id: 'edge-313',
      source: '2',
      target: '1001',
    },
    {
      id: 'edge-891',
      source: '2',
      target: '1002',
    },
    {
      id: 'edge-478',
      source: '2',
      target: '1003',
    },
    {
      id: 'edge-250',
      source: '2',
      target: '1004',
    },
    {
      id: 'edge-535',
      source: '2',
      target: '1005',
    },
    {
      id: 'edge-850',
      source: '1001',
      target: '1006',
    },
    {
      id: 'edge-381',
      source: '1001',
      target: '1007',
    },
    {
      id: 'edge-209',
      source: '1001',
      target: '1008',
    },
    {
      id: 'edge-162',
      source: '1001',
      target: '1009',
    },
    {
      id: 'edge-365',
      source: '1001',
      target: '1010',
    },
    {
      id: 'edge-873',
      source: '1002',
      target: '1006',
    },
    {
      id: 'edge-266',
      source: '1002',
      target: '1007',
    },
    {
      id: 'edge-111',
      source: '1002',
      target: '1008',
    },
    {
      id: 'edge-424',
      source: '1002',
      target: '1009',
    },
    {
      id: 'edge-471',
      source: '1002',
      target: '1010',
    },
    {
      id: 'edge-506',
      source: '1003',
      target: '1006',
    },
    {
      id: 'edge-345',
      source: '1003',
      target: '1007',
    },
    {
      id: 'edge-38',
      source: '1003',
      target: '1008',
    },
    {
      id: 'edge-195',
      source: '1003',
      target: '1009',
    },
    {
      id: 'edge-613',
      source: '1003',
      target: '1010',
    },
    {
      id: 'edge-841',
      source: '1010',
      target: '1011',
    },
    {
      id: 'edge-505',
      source: '1010',
      target: '1012',
    },
    {
      id: 'edge-828',
      source: '1010',
      target: '1013',
    },
    {
      id: 'edge-881',
      source: '1010',
      target: '1014',
    },
    {
      id: 'edge-278',
      source: '1010',
      target: '1015',
    },
    {
      id: 'edge-343',
      source: '1010',
      target: '1016',
    },
    {
      id: 'edge-921',
      source: '1010',
      target: '1017',
    },
    {
      id: 'edge-198',
      source: '1008',
      target: '1014',
    },
    {
      id: 'edge-900',
      source: '1008',
      target: '1015',
    },
    {
      id: 'edge-798',
      source: '1008',
      target: '1016',
    },
    {
      id: 'edge-765',
      source: '1008',
      target: '1017',
    },
    {
      id: 'edge-389',
      source: '1017',
      target: '1018',
    },
    {
      id: 'edge-590',
      source: '1017',
      target: '1019',
    },
    {
      id: 'edge-915',
      source: '1016',
      target: '1020',
    },
    {
      id: 'edge-439',
      source: '1016',
      target: '1020',
    },
    {
      id: 'edge-462',
      source: '5',
      target: '1020',
    },
    {
      id: 'edge-641',
      source: '41',
      target: '1020',
    },
    {
      id: 'edge-922',
      source: '5',
      target: '1009',
    },
    {
      id: 'edge-700',
      source: '41',
      target: '1009',
    },
  ],
};

const container = document.getElementById('container');
const descriptionDiv = document.createElement('div');
descriptionDiv.innerHTML = 'Try to click node 2!';
container.appendChild(descriptionDiv);

const width = container.scrollWidth;
const height = (container.scrollHeight || 500) - 30;
const mainUnitRadius = 80;
const focusNode = data.nodes[22];
focusNode.data.keyShape = {
  stroke: '#00419F',
  fill: '#729FFC',
  lineWidth: 2,
};
data.nodes[2].data.keyShape = {
  stroke: '#00419F',
  fill: '#729FFC',
  lineWidth: 2,
};

const graph = new ExtGraph({
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
    default: ['drag-node', 'click-select', 'drag-canvas'],
  },
  data,
});

graph.on('node:click', async (ev) => {
  const nodeModel = graph.getNodeData(ev.itemId);
  const nodes = graph.getAllNodesData();
  const edges = graph.getAllEdgesData();
  let newData;
  if (nodeModel.id === '2') newData = data2_m;
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
    nodeMap.set(n.id, n);
  });
  newNodeModels.forEach((model) => {
    if (!nodeMap.has(model.id)) {
      // set the initial positions of the new nodes to the focus(clicked) node
      model.data.x = nodeModel.data.x;
      model.data.y = nodeModel.data.y;
    }
  });
  graph.addData('node', newNodeModels);

  // add new edges to graph
  const edgeMap = new Map();
  edges.forEach(function (e, i) {
    edgeMap.set(e.source + ',' + e.target, i);
  });
  const oldEdgeNum = edges.length;
  newEdgeModels.forEach(function (em, i) {
    const exist = edgeMap.get(em.source + ',' + em.target);
    if (exist === undefined) {
      edgeMap.set(em.source + ',' + em.target, oldEdgeNum + i);
    }
  });
  graph.addData('edge', newEdgeModels);

  edges.forEach((e) => {
    allEdgeModels.push(e);
  });
  nodes.forEach((n) => {
    allNodeModels.push(n);
  });
  // the max degree about foces(clicked) node in the newly added data
  const maxDegree = 4;
  // the max degree about foces(clicked) node in the original data
  const oMaxDegree = 3;
  const unitRadius = 40;
  // re-place the clicked node far away the exisiting items
  // along the radius from center node to it
  debugger;
  const focus = graph.getNodeData(focusNode.id);
  const vx = nodeModel.data.x - focus.data.x;
  const vy = nodeModel.data.y - focus.data.y;
  const vlength = Math.sqrt(vx * vx + vy * vy);
  const ideallength = unitRadius * maxDegree + mainUnitRadius * oMaxDegree;
  nodeModel.data.x = (ideallength * vx) / vlength + focus.data.x;
  nodeModel.data.y = (ideallength * vy) / vlength + focus.data.y;

  const subRadialLayout = new Extensions.RadialLayout({
    center: [nodeModel.data.x, nodeModel.data.y],
    maxIteration: 200,
    focusNode: '2',
    unitRadius,
    linkDistance: 180,
    preventOverlap: true,
  });
  const positions = await subRadialLayout.execute(
    new GraphCore({
      nodes: newNodeModels,
      edges: newEdgeModels,
    }),
  );
  console.log('positions', positions);
  graph.updateNodePosition(positions.nodes.filter((node) => nodeMap.has(node.id)));
});

graph.on('click', (e) => {
  console.log('canvas', e.canvas);
});

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth, container.scrollHeight - 30]);
  };

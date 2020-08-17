import G6 from '@antv/g6';

const data = {
  nodes: [
    {
      id: '0',
      label: '0',
      cluster: '0',
    },
    {
      id: '1',
      label: '1',
      cluster: '0',
    },
    {
      id: '2',
      label: '2',
      cluster: '0',
    },
    {
      id: '3',
      label: '3',
      cluster: '0',
    },
    {
      id: '4',
      label: '4',
      cluster: '0',
    },
    {
      id: '5',
      label: '5',
      cluster: '3',
    },
    {
      id: '6',
      label: '6',
      cluster: '0',
    },
    {
      id: '7',
      label: '7',
      cluster: '0',
    },
    {
      id: '8',
      label: '8',
      cluster: '0',
    },
    {
      id: '9',
      label: '9',
      cluster: '3',
    },
    {
      id: '10',
      label: '10',
      cluster: '3',
    },
    {
      id: '11',
      label: '11',
      cluster: '2',
    },
    {
      id: '12',
      label: '12',
      cluster: '2',
    },
    {
      id: '13',
      label: '13',
      cluster: '4',
    },
    {
      id: '14',
      label: '14',
      cluster: '2',
    },
    {
      id: '15',
      label: '15',
      cluster: '2',
    },
    {
      id: '16',
      label: '16',
      cluster: '2',
    },
    {
      id: '17',
      label: '17',
      cluster: '1',
    },
    {
      id: '18',
      label: '18',
      cluster: '4',
    },
    {
      id: '19',
      label: '19',
      cluster: '4',
    },
    {
      id: '20',
      label: '20',
      cluster: '4',
    },
    {
      id: '21',
      label: '21',
      cluster: '0',
    },
    {
      id: '22',
      label: '22',
      cluster: '2',
    },
    {
      id: '23',
      label: '23',
      cluster: '2',
    },
    {
      id: '24',
      label: '24',
      cluster: '2',
    },
    {
      id: '25',
      label: '25',
      cluster: '3',
    },
    {
      id: '26',
      label: '26',
      cluster: '4',
    },
    {
      id: '27',
      label: '27',
      cluster: '4',
    },
    {
      id: '28',
      label: '28',
      cluster: '1',
    },
    {
      id: '29',
      label: '29',
      cluster: '1',
    },
    {
      id: '30',
      label: '30',
      cluster: '4',
    },
    {
      id: '31',
      label: '31',
      cluster: '4',
    },
    {
      id: '32',
      label: '32',
      cluster: '1',
    },
    {
      id: '33',
      label: '33',
      cluster: '2',
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

const colors = [
  '#BDD2FD',
  '#BDEFDB',
  '#C2C8D5',
  '#FBE5A2',
  '#F6C3B7',
  '#B6E3F5',
  '#D3C6EA',
  '#FFD8B8',
  '#AAD8D8',
  '#FFD6E7',
];
const strokes = [
  '#5B8FF9',
  '#5AD8A6',
  '#5D7092',
  '#F6BD16',
  '#E8684A',
  '#6DC8EC',
  '#9270CA',
  '#FF9D4D',
  '#269A99',
  '#FF99C3',
];

const nodes = data.nodes;
const clusterMap = new Map();
let clusterId = 0;
nodes.forEach(function (node) {
  // cluster
  if (node.cluster && clusterMap.get(node.cluster) === undefined) {
    clusterMap.set(node.cluster, clusterId);
    clusterId++;
  }
  const cid = clusterMap.get(node.cluster);
  if (!node.style) node.style = {};
  node.style.fill = colors[cid % colors.length];
  node.style.stroke = strokes[cid % strokes.length];
});

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  modes: {
    default: ['zoom-canvas', 'drag-canvas', 'drag-node'],
  },
  layout: {
    type: 'grid',
    begin: [20, 20],
    width: width - 20,
    height: height - 20,
    sortBy: 'cluster',
  },
  animate: true,
  defaultNode: {
    size: 20,
  },
  defaultEdge: {
    size: 1,
    color: '#e2e2e2',
  },
});
graph.data(data);
graph.render();

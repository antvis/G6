import G6 from '@antv/g6';

const data = {
  nodes: [
    {
      id: '0',
      sortAttr: 0,
      sortAttr2: 'a',
    },
    {
      id: '1',
      sortAttr: 0,
      sortAttr2: 'a',
    },
    {
      id: '2',
      sortAttr: 0,
      sortAttr2: 'a',
    },
    {
      id: '3',
      sortAttr: 0,
      sortAttr2: 'a',
    },
    {
      id: '4',
      sortAttr: 2,
      sortAttr2: 'c',
    },
    {
      id: '5',
      sortAttr: 0,
      sortAttr2: 'a',
    },
    {
      id: '6',
      sortAttr: 1,
      sortAttr2: 'b',
    },
    {
      id: '7',
      sortAttr: 1,
      sortAttr2: 'b',
    },
    {
      id: '8',
      sortAttr: 2,
      sortAttr2: 'c',
    },
    {
      id: '9',
      sortAttr: 3,
      sortAttr2: 'd',
    },
    {
      id: '10',
      sortAttr: 3,
      sortAttr2: 'd',
    },
    {
      id: '11',
      sortAttr: 1,
      sortAttr2: 'b',
    },
    {
      id: '12',
      sortAttr: 2,
      sortAttr2: 'c',
    },
    {
      id: '13',
      sortAttr: 1,
      sortAttr2: 'b',
    },
    {
      id: '14',
      sortAttr: 3,
      sortAttr2: 'd',
    },
    {
      id: '15',
      sortAttr: 3,
      sortAttr2: 'd',
    },
    {
      id: '16',
      sortAttr: 1,
      sortAttr2: 'b',
    },
    {
      id: '17',
      sortAttr: 2,
      sortAttr2: 'c',
    },
    {
      id: '18',
      sortAttr: 2,
      sortAttr2: 'c',
    },
    {
      id: '19',
      sortAttr: 1,
      sortAttr2: 'b',
    },
    {
      id: '20',
      sortAttr: 1,
      sortAttr2: 'b',
    },
    {
      id: '21',
      sortAttr: 3,
      sortAttr2: 'd',
    },
    {
      id: '22',
      sortAttr: 3,
      sortAttr2: 'd',
    },
    {
      id: '23',
      sortAttr: 3,
      sortAttr2: 'd',
    },
    {
      id: '24',
      sortAttr: 0,
      sortAttr2: 'a',
    },
    {
      id: '25',
      sortAttr: 0,
      sortAttr2: 'a',
    },
    {
      id: '26',
      sortAttr: 1,
      sortAttr2: 'b',
    },
    {
      id: '27',
      sortAttr: 1,
      sortAttr2: 'b',
    },
    {
      id: '28',
      sortAttr: 3,
      sortAttr2: 'd',
    },
    {
      id: '29',
      sortAttr: 2,
      sortAttr2: 'c',
    },
    {
      id: '30',
      sortAttr: 2,
      sortAttr2: 'c',
    },
    {
      id: '31',
      sortAttr: 1,
      sortAttr2: 'b',
    },
    {
      id: '32',
      sortAttr: 1,
      sortAttr2: 'b',
    },
    {
      id: '33',
      sortAttr: 0,
      sortAttr2: 'a',
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

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  modes: {
    default: ['drag-canvas', 'drag-node'],
  },
  layout: {
    type: 'radial',
    unitRadius: 70,
    maxIteration: 1000,
    linkDistance: 10,
    preventOverlap: true,
    nodeSize: 30,
    sortBy: 'sortAttr2',
    sortStrength: 50,
  },
  animate: true,
  defaultEdge: {
    size: 1,
    color: '#e2e2e2',
    style: {
      endArrow: {
        path: 'M 0,0 L 8,4 L 8,-4 Z',
        fill: '#e2e2e2',
      },
    },
  },
});

const colors = ['steelblue', 'green', 'pink', 'grey'];
const colorsObj = { a: 'steelblue', b: 'green', c: 'pink', d: 'grey' };
data.nodes.forEach((node) => {
  node.size = 20;
  node.style = {
    lineWidth: 4,
    fill: '#fff',
    stroke: colors[node.sortAttr2] || colorsObj[node.sortAttr2],
  };
});
graph.data(data);
graph.render();

import G6 from '@antv/g6';

const data = {
  nodes: [
    {
      id: '0',
      comboId: 'a',
    },
    {
      id: '1',
      comboId: 'a',
    },
    {
      id: '2',
      comboId: 'a',
    },
    {
      id: '3',
      comboId: 'a',
    },
    {
      id: '4',
      comboId: 'a',
    },
    {
      id: '5',
      comboId: 'a',
    },
    {
      id: '6',
      comboId: 'a',
    },
    {
      id: '7',
      comboId: 'a',
    },
    {
      id: '8',
      comboId: 'a',
    },
    {
      id: '9',
      comboId: 'a',
    },
    {
      id: '10',
      comboId: 'a',
    },
    {
      id: '11',
      comboId: 'a',
    },
    {
      id: '12',
      comboId: 'a',
    },
    {
      id: '13',
      comboId: 'a',
    },
    {
      id: '14',
      comboId: 'a',
    },
    {
      id: '15',
      comboId: 'a',
    },
    {
      id: '16',
      comboId: 'b',
    },
    {
      id: '17',
      comboId: 'b',
    },
    {
      id: '18',
      comboId: 'b',
    },
    {
      id: '19',
      comboId: 'b',
    },
    {
      id: '20',
    },
    {
      id: '21',
    },
    {
      id: '22',
    },
    {
      id: '23',
      comboId: 'c',
    },
    {
      id: '24',
      comboId: 'a',
    },
    {
      id: '25',
    },
    {
      id: '26',
    },
    {
      id: '27',
      comboId: 'c',
    },
    {
      id: '28',
      comboId: 'c',
    },
    {
      id: '29',
      comboId: 'c',
    },
    {
      id: '30',
      comboId: 'c',
    },
    {
      id: '31',
      comboId: 'c',
    },
    {
      id: '32',
      comboId: 'd',
    },
    {
      id: '33',
      comboId: 'd',
    },
  ],
  edges: [
    {
      source: 'a',
      target: 'b',
      label: 'Combo A - Combo B',
      size: 3,
      labelCfg: {
        autoRotate: true,
        style: {
          stroke: '#fff',
          lineWidth: 5,
          fontSize: 20
        }
      },
      style: {
        stroke: 'red'
      }
    },
    {
      source: 'a',
      target: '33',
      label: 'Combo-Node',
      size: 3,
      labelCfg: {
        autoRotate: true,
        style: {
          stroke: '#fff',
          lineWidth: 5,
          fontSize: 20
        }
      },
      style: {
        stroke: 'blue'
      }
    },
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
  combos: [{
    id: 'a',
    label: 'Combo A'
  }, {
    id: 'b',
    label: 'Combo B'
  }, {
    id: 'c',
    label: 'Combo D'
  }, {
    id: 'd',
    label: 'Combo D',
    parentId: 'b'
  },
  ]
};

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  fitView: true,
  fitViewPadding: 50,
  layout: {
    type: 'comboForce',
    nodeSpacing: d => 8
  },
  defaultNode: {
    size: 15,
    color: '#5B8FF9',
    style: {
      lineWidth: 2,
      fill: '#C6E5FF',
    },
  },
  defaultEdge: {
    size: 2,
    color: '#e2e2e2',
  },
  modes: {
    default: ['drag-combo', 'drag-node', 'drag-canvas', 'zoom-canvas']
  }
});

graph.data(data);
graph.render();
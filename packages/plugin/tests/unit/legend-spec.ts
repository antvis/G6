import G6 from '@antv/g6';
import Legend from '../../src/legend';

const div = document.createElement('div');
div.id = 'legend-spec';
document.body.appendChild(div);

describe('legend', () => {
  it('legend', () => {
    const legendData = {
      nodes: [{
        id: 'type1',
        label: 'node-type1',
        type: 'circle',
        size: 5,
        style: {
          fill: 'red'
        }
      }, {
        id: 'type2',
        label: 'node-type2',
        type: 'circle',
        size: 10,
        style: {
          r: 10,
          fill: 'blue'
        }
      }, {
        id: 'type3',
        label: 'node-type3',
        type: 'rect',
        size: [10, 10],
        style: {
          fill: 'green'
        }
      }],
      edges: [{
        id: 'eType1',
        label: 'edge-type1',
        type: 'line',
        style: {
          stroke: '#ccc'
        }
      }, {
        id: 'eType2',
        label: 'edge-type2',
        type: 'cubic',
        style: {
          stroke: '#yellow'
        }
      }, {
        id: 'eType3',
        label: 'edge-type3',
        type: 'quadratic',
        style: {
          stroke: '#cc0'
        }
      }]
    }
    const legend = new Legend({
      data: legendData
    });
  
    const data = {
      nodes: [
        {
          id: 'node1',
          label: 'node1',
          x: 100,
          y: 100,
        },
      ],
    };
    const graph = new G6.Graph({
      container: div,
      width: 800,
      height: 600,
      modes: {
        default: ['drag-canvas', 'zoom-canvas', 'drag-node'],
      },
      plugins: [legend],
    });
    graph.read(data);
  });

});


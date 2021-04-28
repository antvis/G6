import G6 from '@antv/g6';
import Legend from '../../src/legend';

const div = document.createElement('div');
div.id = 'legend-spec';
document.body.appendChild(div);

describe('legend', () => {
  it('legend', (done) => {
    const legendData = {
      nodes: [{
        id: 'type1',
        label: 'node-type1',
        type: 'circle',
        order: 4,
        size: 5,
        style: {
          fill: 'red'
        }
      }, {
        id: 'type2',
        label: 'node-type2',
        type: 'circle',
        order: 0,
        size: 20,
        style: {
          r: 20,
          fill: 'blue'
        }
      }, {
        id: 'type3',
        label: 'node-type3',
        type: 'rect',
        order: 2,
        size: [10, 10],
        style: {
          fill: 'green'
        }
      }],
      edges: [{
        id: 'eType1',
        label: 'edge-type1',
        type: 'line',
        order: 2,
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
      data: legendData,
      position: 'top',
      align: 'center',
      layout: 'horizontal', // vertical
      vertiSep: 0,
      offset: 16,
      padding: [4, 12, 50, 12],
      containerStyle: {
        fill: '#ff0',
        lineWidth: 1
      },
      title: 'Legend',
      titleConfig: {
        position: 'center',
        offsetX: 0,
        offsetY: 12,
      },
      filter: {
        enable: true,
        multiple: true,
        trigger: 'mouseenter',
        filterFunctions: {
          'type1': (d) => {
            if (d.legendType === 'type1') return true;
            return false
          },
          'type2': (d) => {
            if (d.legendType === 'type2') return true;
            return false
          },
          'type3': (d) => {
            if (d.legendType === 'type3') return true;
            return false
          },
          'eType1': (d) => {
            if (d.legendType === 'edge-type1') return true;
            return false
          },
          'eType2': (d) => {
            if (d.legendType === 'edge-type2') return true;
            return false
          },
          'eType3': (d) => {
            if (d.legendType === 'edge-type3') return true;
            return false
          },
        }
      }
    });
  
    const data = {
      nodes: [
        {
          id: '1',
          label: '1-type1',
          legendType: 'type1',
        },
        {
          id: '2',
          label: '2-type2',
          legendType: 'type2',
        },
        {
          id: '3',
          label: '3-type1',
          legendType: 'type1',
        },
        {
          id: '4',
          label: '4',
        },
      ],
      edges: [{
        source: '1',
        target: '3',
        legendType: 'edge-type1',
        label: '1->3:edge-type1'
      }, {
        source: '1',
        target: '4',
        legendType: 'edge-type3',
        label: '1->4:edge-type3'
      }, {
        source: '3',
        target: '4'
      }, {
        source: '2',
        target: '4',
        legendType: 'edge-type1',
        label: '2->4:edge-type1'
      }]
    };
    const graph = new G6.Graph({
      container: div,
      width: 400,
      height: 400,
      modes: {
        default: ['drag-canvas', 'zoom-canvas', 'drag-node',
          // {
          //   type: 'activate-relations',
          //   trigger: 'click'
          // }
        ],
      },
      edgeStateStyles: {
        active: {
          lineWidth: 3
        },
        inactive: {
          opacity: 0.5
        }
      }
      // plugins: [legend],
    });
    graph.read(data);
    graph.get('canvas').get('el').style.backgroundColor = '#ccc'
    setTimeout(() => {
      graph.addPlugin(legend)
      expect(document.getElementsByClassName('g6-legend-container').length).not.toBe(0);
      graph.destroy()
      done();
    }, 500);
  });

});


import G6 from '@antv/g6';
import Legend from '../../src/legend';

const testblock = document.createElement('div');
testblock.style.height = '100px'
testblock.style.width = '100px'
testblock.style.backgroundColor = '#f00'
document.body.appendChild(testblock);

const div = document.createElement('div');
div.id = 'legend-spec';
document.body.appendChild(div);

describe('legend', () => {
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
      size: 10,
      style: {
        r: 10,
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
      size: 20,
      style: {
        stroke: '#0f0',
      }
    }, {
      id: 'eType2',
      label: 'edge-type2',
      type: 'cubic'
    }, {
      id: 'eType3',
      label: 'edge-type3',
      type: 'quadratic',
      size: 25,
      style: {
        stroke: '#f00'
      }
    }]
  }
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
  it('legend with default position and click multiple filtering', (done) => {
    const legend = new Legend({
      data: legendData,
      align: 'center',
      layout: 'horizontal', // vertical
      vertiSep: 70,
      horiSep: 20,
      offsetY: 6,
      padding: [4, 12, 8, 12],
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
        trigger: 'click',
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

    const graph = new G6.Graph({
      container: div,
      width: 600,
      height: 400,
      modes: {
        default: ['drag-canvas', 'zoom-canvas', 'drag-node']
      },
      edgeStateStyles: {
        active: {
          lineWidth: 3
        },
        inactive: {
          opacity: 0.5
        }
      },
      // plugins: [legend]
    });
    graph.read(data);
    graph.get('canvas').get('el').style.backgroundColor = '#ccc'
    setTimeout(() => {
      graph.addPlugin(legend)
      expect(document.getElementsByClassName('g6-legend-container').length).not.toBe(0);

      const legendCanvas = legend.get('legendCanvas');
      const rootGroup = legendCanvas.get('children')[0];
      const nodeGroup = rootGroup.find(e => e.get('name') === 'node-group');
      const edgeGroup = rootGroup.find(e => e.get('name') === 'edge-group');
      const legendNode0Shape = nodeGroup.get('children')[0].get('children')[0];
      legendCanvas.emit('node-container:click', {
        target: legendNode0Shape,
        x: 0,
        y: 0,
      });
      expect(graph.findAllByState('node', 'active').length).toBe(1)

      const legendNode2Shape = nodeGroup.get('children')[2].get('children')[0];
      legendCanvas.emit('node-container:click', {
        target: legendNode2Shape,
        x: 0,
        y: 0,
      });
      expect(graph.findAllByState('node', 'active').length).toBe(3)

      legendCanvas.emit('click', {
        target: legendCanvas
      })
      expect(graph.findAllByState('node', 'active').length).toBe(0)


      const legendEdge0Shape = edgeGroup.get('children')[0].get('children')[0];
      legendCanvas.emit('node-container:click', {
        target: legendEdge0Shape,
        x: 0,
        y: 0,
      });
      expect(graph.findAllByState('edge', 'active').length).toBe(2)

      legendCanvas.emit('click', {
        target: legendCanvas
      })

      // graph.destroy()
      done();
    }, 500);
  });
  it('legend with right position and mouseenter filtering', (done) => {
    const legend = new Legend({
      data: legendData,
      align: 'right',
      layout: 'vertical',
      vertiSep: 0,
      offsetY: 16,
      padding: [4, 12, 50, 12],
      filter: {
        enable: true,
        multiple: true, // will not take effect when tirgger is mouseenter
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

    const graph = new G6.Graph({
      container: div,
      width: 400,
      height: 400,
      modes: {
        default: ['drag-canvas', 'zoom-canvas', 'drag-node']
      },
      edgeStateStyles: {
        active: {
          lineWidth: 3
        },
        inactive: {
          opacity: 0.5
        }
      }
    });
    graph.read(data);

    setTimeout(() => {
      graph.addPlugin(legend)
      expect(document.getElementsByClassName('g6-legend-container').length).not.toBe(0);

      const legendCanvas = legend.get('legendCanvas');
      const rootGroup = legendCanvas.get('children')[0];
      const nodeGroup = rootGroup.find(e => e.get('name') === 'node-group');
      const edgeGroup = rootGroup.find(e => e.get('name') === 'edge-group');
      const legendNode0Shape = nodeGroup.get('children')[0].get('children')[0];
      legendCanvas.emit('node-container:mouseenter', {
        target: legendNode0Shape,
        x: 0,
        y: 0,
      });
      expect(graph.findAllByState('node', 'active').length).toBe(1)
      legendCanvas.emit('node-container:mouseleave', {
        target: legendNode0Shape,
        x: 0,
        y: 0,
      });

      const legendNode2Shape = nodeGroup.get('children')[2].get('children')[0];
      legendCanvas.emit('node-container:mouseenter', {
        target: legendNode2Shape,
        x: 0,
        y: 0,
      });
      expect(graph.findAllByState('node', 'active').length).toBe(2)
      legendCanvas.emit('node-container:mouseleave', {
        target: legendNode2Shape,
        x: 0,
        y: 0,
      });
      expect(graph.findAllByState('node', 'active').length).toBe(0)

      legendCanvas.emit('click', {
        target: legendCanvas
      })
      expect(graph.findAllByState('node', 'active').length).toBe(0)


      const legendEdge0Shape = edgeGroup.get('children')[0].get('children')[0];
      legendCanvas.emit('node-container:mouseenter', {
        target: legendEdge0Shape,
        x: 0,
        y: 0,
      });
      expect(graph.findAllByState('edge', 'active').length).toBe(2)

      legendCanvas.emit('node-container:mouseleave', {
        target: legendEdge0Shape,
        x: 0,
        y: 0,
      });

      graph.destroy()
      done();
    }, 500);
  });
  it('legend changeData', () => {
    const typeConfigs = {
      'type1': {
        type: 'circle',
        size: 5,
        style: {
          fill: '#5B8FF9'
        }
      },
      'type2': {
        type: 'circle',
        size: 20,
        style: {
          fill: '#5AD8A6'
        }
      },
      'type3': {
        type: 'rect',
        size: [10, 10],
        style: {
          fill: '#5D7092'
        }
      },
      'eType1': {
        type: 'line',
        style: {
          width: 20,
          stroke: '#F6BD16',
        }
      },
      'eType2': {
        type: 'cubic',
      },
      'eType3': {
        type: 'quadratic',
        style: {
          width: 25,
          stroke: '#6F5EF9'
        }
      }
    }
    const legendData = {
      nodes: [{
        id: 'type1',
        label: 'node-type1',
        order: 4,
        ...typeConfigs['type1']
      }, {
        id: 'type2',
        label: 'node-type2',
        order: 0,
        ...typeConfigs['type2']
      }, {
        id: 'type3',
        label: 'node-type3',
        order: 2,
        ...typeConfigs['type3']
      }],
      edges: [{
        id: 'eType1',
        label: 'edge-type1',
        order: 2,
        ...typeConfigs['eType1']
      }, {
        id: 'eType2',
        label: 'edge-type2',
        ...typeConfigs['eType2']
      }, {
        id: 'eType3',
        label: 'edge-type3',
        ...typeConfigs['eType3']
      }]
    }
    const legend = new Legend({
      data: legendData,
      align: 'center',
      layout: 'horizontal', // vertical
      position: 'bottom-right',
      vertiSep: 12,
      horiSep: 24,
      offsetY: -24,
      padding: [4, 16, 8, 16],
      containerStyle: {
        fill: '#ccc',
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
        trigger: 'click',
        graphActiveState: 'activeByLegend',
        graphInactiveState: 'inactiveByLegend',
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
            if (d.legendType === 'eType1') return true;
            return false
          },
          'eType2': (d) => {
            if (d.legendType === 'eType2') return true;
            return false
          },
          'eType3': (d) => {
            if (d.legendType === 'eType3') return true;
            return false
          },
        }
      }
    });

    const graph = new G6.Graph({
      container: div,
      width: 400,
      height: 400,
      plugins: [legend],
      modes: {
        default: ['drag-canvas', 'zoom-canvas', 'drag-node']
      },
      edgeStateStyles: {
        active: {
          lineWidth: 3
        },
        inactive: {
          opacity: 0.5
        }
      }
    });
    graph.read(data);
    const legendCanvas = legend.get('legendCanvas');
    let legendRoot = legendCanvas.find(e => e.get('name') === 'root');
    let nodesGroup = legendRoot.find(e => e.get('name') === 'node-group')
    let edgesGroup = legendRoot.find(e => e.get('name') === 'edge-group')
    expect(nodesGroup.get('children').length).toBe(3);
    expect(edgesGroup.get('children').length).toBe(3);

    legend.changeData({
      nodes: [{
        id: 'type1',
        label: 'node-type1',
        order: 4,
        ...typeConfigs['type1']
      }],
      edges: [{
        id: 'eType1',
        label: 'edge-type1',
        order: 2,
        ...typeConfigs['eType1']
      }]
    });
    legendRoot = legendCanvas.find(e => e.get('name') === 'root');
    nodesGroup = legendRoot.find(e => e.get('name') === 'node-group')
    edgesGroup = legendRoot.find(e => e.get('name') === 'edge-group')
    expect(nodesGroup.get('children').length).toBe(1);
    expect(edgesGroup.get('children').length).toBe(1);
    graph.destroy();
  });
});


import '../../../src/behavior';
import '../../../src/shape';
import Graph from '../../../src/graph/graph';
import G6 from '../../../src';

const div = document.createElement('div');
div.id = 'drag-combo-spec';
document.body.appendChild(div);

describe('drag-combo', () => {
  it('drag combo', () => {
    const data = {
      nodes: [
        {
          id: 'node1',
          x: 150,
          y: 150,
          label: 'node1',
          comboId: 'A'
        },
        {
          id: 'node2',
          x: 200,
          y: 250,
          label: 'node2',
          comboId: 'A'
        },
        {
          id: 'node3',
          x: 100,
          y: 250,
          label: 'node3',
        },
        {
          id: 'node4',
          x: 200,
          y: 350,
          label: 'node4',
          comboId: 'B'
        },
      ],
      edges: [
        {
          source: 'node1',
          target: 'node4',
        },
        {
          source: 'node1',
          target: 'node2',
        },
        {
          source: 'node2',
          target: 'node3',
        },
      ],
      combos: [
      {
        id: 'A',
        parentId: 'C',
        label: 'gorup A',
        type: 'circle'
      }, {
        id: 'B',
        parentId: 'C',
        label: 'gorup B',
        type: 'circle'
      }, {
        id: 'C',
        label: 'gorup C',
        // type: 'rect'
      }, 
      {
        id: 'F',
        label: 'gorup F'
        // type: 'rect'
      }, {
        id: 'G',
        label: 'gorup G',
        // parentId: 'F'
        type: 'circle'
      }
    ]
    };

    const graph = new G6.Graph({
      container: 'drag-combo-spec',
      width: 1000,
      height: 800,
      modes: {
        default: [ 'drag-canvas', 'drag-combo' ]
      },
      defaultCombo: {
        // size: [100, 100],
        type: 'circle',
        style: {
          fill: '#b5f5ec'
        }
      },
      comboStateStyles: {
        active: {
          stroke: 'red'
        },
        selected: {
          'text-shape': {
            fill: '#f00',
            fontSize: 20
          },
          fill: '#36cfc9'
        },
        state2: {
          stroke: '#0f0'
        }
      }
    });
    
    graph.data(data);
    graph.render();

    console.log(graph.getCombos())

    graph.on('node:click', e => {
      // graph.hideItem(e.item);
      // graph.render()
    })
    graph.on('combo:click', e => {
      // selected = !selected;
      graph.setItemState(e.item, 'selected', true);
      const combos = graph.findAllByState('combo', 'selected')
      console.log(combos)
      // graph.setItemState(e.item, 'state2', selected);
      // graph.getNodes().forEach(node => {
      //   node.hide();
      // });
      // graph.hideItem(e.item);
      // graph.updateItem(e.item, {
      //   // type: 'rect',
      //   style: {
      //     fill: '#f00'
      //   },
      //   label: 'new Label',
      //   labelCfg: {
      //     position: 'bottom'
      //   }
      // });
      // graph.uncombo(e.item);
    });

    graph.on('canvas:click', evt => {
      const combos = graph.findAllByState('combo', 'selected')
      combos.map(combo => {
        graph.clearItemStates(combo)
      })
    })
    
  })

  it.only('combo example', () => {
    const data = {
      nodes: [
        {
          id: 'node1',
          x: 150,
          y: 150,
          label: 'node1',
          comboId: 'A'
        },
        {
          id: 'node2',
          x: 200,
          y: 250,
          label: 'node2',
          comboId: 'B'
        },
        {
          id: 'node3',
          x: 100,
          y: 250,
          label: 'node3',
        },
        {
          id: 'node4',
          x: 50,
          y: 50,
          label: 'node4',
          comboId: 'D'
        },
        {
          id: 'node5',
          x: 100,
          y: 100,
          label: 'node5',
          comboId: 'E'
        },
        {
          id: 'node6',
          x: 500,
          y: 200,
          label: 'node6'
        },
        {
          id: 'node7',
          x: 600,
          y: 200,
          label: 'node7'
        }
      ],
      edges: [
        {
          source: 'node1',
          target: 'node2',
        },
        {
          source: 'node2',
          target: 'node3',
        },
        {
          source: 'node3',
          target: 'node1',
        },
        {
          source: 'A',
          target: 'D'
        }
      ],
      combos: [
      {
        id: 'A',
        parentId: 'B',
        label: 'gorup A',
        padding: [50, 30, 10, 10],
        type: 'rect',
        style: {
          stroke: 'red',
          fill: 'green'
        }
      }, {
        id: 'B',
        label: 'gorup B',
        padding: [50, 10, 10, 50],
        // type: 'custom-combo'
      },
      {
        id: 'D',
        label: 'gorup D',
        parentId: 'E',
      }, 
      {
        id: 'E',
      },
      {
        id: 'FF',
        label: '空分组',
        type: 'custom-combo',
        style: {
          stroke: 'green',
          lineWidth: 3
        }
      }
      ]
    };

    const graph = new G6.Graph({
      container: 'drag-combo-spec',
      width: 1000,
      height: 800,
      groupByTypes: false,
      modes: {
        default: [ 'drag-canvas', 'drag-combo', 'drag-node', 'collapse-expand-combo' ]
      },
      defaultCombo: {
        // size: [100, 100],
        type: 'circle',
        style: {
          fill: '#ccc',
          opacity: 0.9
        }
      },
      comboStateStyles: {
        hover: {
          'text-shape': {
            fill: '#f00',
            fontSize: 20
          },
          fill: '#f00'
        },
        active: {
          stroke: 'red'
        },
        state2: {
          stroke: '#0f0'
        }
      },
      defaultEdge: {
        style: {
          stroke: '#f00',
          lineWidth: 3
        }
      }
    });
    
    graph.data(data);
    graph.render();

    // setTimeout(() => {
    //   graph.updateComboTree('D')
    // }, 1000)

    // graph.on('combo:mouseenter', evt => {
    //   const { item } = evt
    //   graph.setItemState(item, 'hover', true)
    // })

    // graph.on('combo:mouseleave', evt => {
    //   const { item } = evt
    //   graph.setItemState(item, 'hover', false)
    // })
  })
})

import '../../../src/behavior';
import '../../../src/shape';
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
        default: [ 'drag-canvas', 'drag-combo', 'drag-node', 'click-select' ]
      },
      defaultCombo: {
        // size: [100, 100],
        type: 'circle',
        style: {
          fill: '#b5f5ec'
        }
      },
      nodeStateStyles: {
        selected: {
          fill: 'red'
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

    graph.on('node:mouseleave', e => {
      // graph.hideItem(e.item);
      // graph.render()
      console.log('mouse leave')
    })
    graph.on('combo:click', e => {
      graph.setItemState(e.item, 'selected', true);
    });

    graph.on('canvas:click', evt => {
      const combos = graph.findAllByState('combo', 'selected')
      combos.map(combo => {
        graph.clearItemStates(combo)
      })
    })
    
  })
})

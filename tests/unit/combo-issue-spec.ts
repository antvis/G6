import G6 from '../../src';

const div = document.createElement('div');
div.id = 'container';
document.body.appendChild(div);

const data = {
  nodes: [
    { id: 'node1', x: 350, y: 200, comboId: 'combo1' },
    { id: 'node2', x: 350, y: 250, comboId: 'combo1' },
    { id: 'node3', x: 100, y: 200, comboId: 'combo3' }
  ],
  edges: [
    { source: 'node1', target: 'node2' },
    { source: 'node1', target: 'node3' },
    { source: 'combo1', target: 'node3' }
  ],
  combos: [
    { id: 'combo1', label: 'Combo 1', parentId: 'combo2' },
    { id: 'combo2', label: 'Combo 2' },
    { id: 'combo3', label: 'Combo 3', collapsed: true },
  ]
};

describe('combo states', () => {
  it('combo state bug', () => {
    const graph = new G6.Graph({
      container: 'container',
      width: 500,
      height: 500,
      // Set groupByTypes to false to get rendering result with reasonable visual zIndex for combos
      groupByTypes: false,
      defaultCombo: {
        type: 'circle',
        style: {
          lineWidth: 1,
        },
        labelCfg: {
          refY: 15,
          position: 'bottom',
        }
      },
      nodeStateStyles: {
        hover: {
          fill: 'red'
        }
      },
      comboStateStyles: {
        hover: {
          stroke: 'green'
        },
        selected: {
          stroke: 'red'
        }
      },
      modes: {
        default: ['drag-canvas', 'drag-node', 'drag-combo', 'collapse-expand-combo'],
      },
    });
    
    graph.data(data);
    graph.render();
    
    graph.on('combo:mouseenter', evt => {
      graph.setItemState(evt.item, 'hover', true)
    })
    
    graph.on('combo:mouseleave', evt => {
      graph.setItemState(evt.item, 'hover', false)
    })

    // combo 设置不存在的 state
    graph.on('combo:click', evt => {
      graph.setItemState(evt.item, 'notFound', true)
    })

    graph.on('node:mouseenter', evt => {
      
      graph.setItemState(evt.item, 'hover', true)
    })
    
    graph.on('node:mouseleave', evt => {
      
      graph.setItemState(evt.item, 'hover', false)
    })

  })
})


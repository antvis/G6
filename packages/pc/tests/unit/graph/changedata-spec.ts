import G6 from '../../../src';

const div = document.createElement('div');
div.id = 'container';
document.body.appendChild(div);

const data1 = {
  nodes: [
    { id: 'node1', x: 350, y: 200, label: '1', comboId: 'combo' },
    { id: 'node2', x: 350, y: 250, label: '2', comboId: 'combo2' },
    { id: 'node3', x: 100, y: 200, label: '3' },
  ],
}

const data = {
  nodes: [
    { id: 'node1', x: 350, y: 200, label: '1', comboId: 'combo' },
    { id: 'node2', x: 350, y: 250, label: '2', comboId: 'combo' },
    { id: 'node3', x: 100, y: 200, label: '3' },
  ],
  edges: [
    { source: 'node1', target: 'node2', label: 'xxxxxxx' },
    { source: 'node1', target: 'node3' },
  ],
  combos: [
    {
      id: 'combo',
      // collapsed: true,
      label: 'parent',
      collapsed: true,
      x: 400, y: 400
      // style: {
      //   collapsedSubstituteIcon: {
      //     show: true,
      //     img: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*IEQFS5VtXX8AAAAAAAAAAABkARQnAQ',
      //     width: 72,
      //     height: 72
      //   }
      // }
    },
    // {
    //   id: 'combo2',
    //   // collapsed: true,
    //   parentId: 'combo',
    //   label: 'combo2'
    // }
  ]
};

describe('get newly added node degree', () => {
  it('add node', () => {
    const graph = new G6.Graph({
      container: 'container',
      width: 500,
      height: 500,
      layout: {
        type: 'comboCombined'
      },
      // fitCenter: true,
      modes: {
        default: ['zoom-canvas', 'drag-canvas', 'collapse-expand-combo', 'drag-node', 'drag-combo']
      },
      defaultCombo: {
        type: 'circle',
        // animate: false
      },
      defaultEdge: {
        labelCfg: {
          autoRotate: true,
          style: {
            background: {
              fill: '#ffffff',
              stroke: '#9EC9FF',
              padding: [2, 2, 2, 2],
              radius: 2,
            },
          }
        }
      }
    });
    graph.read(data1);
    // graph.getCombos().forEach(combo => graph.updateItem(combo, { animate: true }))

    graph.on('canvas:click', e => {
      // const nodes = graph.getNodes();
      // const newNodePoses = [{ x: 50, y: 50 }, { x: 150, y: 150 }, { x: 450, y: 450 }, { x: 450, y: 400 }];
      // graph.updateItem(nodes[0], newNodePoses[2]);
      // graph.updateItem(nodes[1], newNodePoses[3]);
      // graph.updateCombos();
      // // graph.updateItem(nodes[2], newNodePoses[2]);
      // // graph.updateItem(nodes[3], newNodePoses[3]);

      // const combo = graph.findById('combo');
      // console.log('combo', combo.getModel().x, combo.getModel().y)

      graph.changeData(data)

      // graph.addItem('combo', {
      //   id: 'new-combo',
      //   collapsed: true
      // });
      // graph.addItem('node', {
      //   id: 'node4',
      //   comboId: 'new-combo'
      // });
      // graph.addItem('edge', {
      //   source: 'node4',
      //   target: 'node3'
      // })
    })
  });
});
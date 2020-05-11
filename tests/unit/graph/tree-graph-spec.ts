import { TreeGraph } from '../../../src';
import { timerOut } from '../util/timeOut';

const div = document.createElement('div');
div.id = 'tree-spec';
document.body.appendChild(div);

describe('tree graph without animate', () => {
  let graph = new TreeGraph({
    container: div,
    width: 500,
    height: 500,
    animate: false,
    modes: {
      default: ['drag-canvas', 'drag-node'],
    },
    layout: {
      type: 'dendrogram',
      direction: 'LR', // H / V / LR / RL / TB / BT
      nodeSep: 50,
      rankSep: 100,
    },
  });

  it('layout init & findDataById', () => {
    const data = {
      isRoot: true,
      id: 'Root',
      children: [
        {
          id: 'SubTreeNode1',
          children: [
            {
              id: 'SubTreeNode1.1',
            },
            {
              id: 'SubTreeNode1.2',
            },
          ],
        },
        {
          id: 'SubTreeNode2',
        },
      ],
    };
    graph.data(data);
    graph.render();
    graph.fitView();

    expect(Object.keys(graph.get('itemMap')).length).toBe(9);

    const edge = graph.findById('Root:SubTreeNode1');
    expect(edge).not.toBe(undefined);

    expect(edge.get('source')).toEqual(graph.findById('Root'));
    expect(edge.get('target')).toEqual(graph.findById('SubTreeNode1'));

    expect(graph.save()).toEqual(data);

    // findDataById
    const nodeData = graph.findDataById('Root', data);
    expect(nodeData).toEqual(data);
  });

  it('layout without data & isLayoutAnimating', () => {
    graph.data(null);
    expect(() => {
      graph.render();
    }).toThrowError('data must be defined first');

    graph.stopLayoutAnimate();
    expect(graph.isLayoutAnimating()).toBe(false);
  });

  it('changeData', () => {
    const data = {
      isRoot: true,
      id: 'Root',
      children: [
        {
          id: 'SubTreeNode1',
          children: [
            {
              id: 'SubTreeNode1.1',
            },
            {
              id: 'SubTreeNode1.2',
            },
          ],
        },
        {
          id: 'SubTreeNode3',
        },
        {
          id: 'SubTreeNode4',
          children: [{ id: 'SubTreeNode4.1' }],
        },
      ],
    };
    graph.changeData(data);
    expect(graph.save()).toEqual(data);

    expect(Object.keys(graph.get('itemMap')).length).toBe(13);
    expect(graph.findById('SubTreeNode2')).toBe(undefined);
    expect(graph.findById('SubTreeNode3')).not.toBe(undefined);
    expect(graph.findById('SubTreeNode4')).not.toBe(undefined);

    const edge = graph.findById('SubTreeNode4:SubTreeNode4.1');
    expect(edge).not.toBe(undefined);
    expect(edge.get('source')).toEqual(graph.findById('SubTreeNode4'));
    expect(edge.get('target')).toEqual(graph.findById('SubTreeNode4.1'));
  });

  it('add child', () => {
    const parent = graph.findById('SubTreeNode3');

    const child = {
      id: 'SubTreeNode3.1',
      x: 100,
      y: 100,
      type: 'rect',
      children: [{ x: 150, y: 150, id: 'SubTreeNode3.1.1' }],
    };
    graph.on('afteraddchild', function(e) {
      expect(e.item.getModel().id === 'SubTreeNode3.1' || e.item.getModel().id === 'SubTreeNode3.1.1').toBe(true);
      expect(e.item.get('parent').getModel().id === 'SubTreeNode3' || e.item.get('parent').getModel().id === 'SubTreeNode3.1').toBe(true);
      expect(e.parent.getModel().id === 'SubTreeNode3' || e.parent.getModel().id === 'SubTreeNode3.1').toBe(true);
    });

    graph.addChild(child, parent);

    const children = parent.get('model').children;
    expect(children).not.toBe(undefined);
    expect(children.length).toBe(1);
    expect(children[0].id).toEqual('SubTreeNode3.1');

    expect(graph.findById('SubTreeNode3.1')).not.toBe(undefined);
    expect(graph.findById('SubTreeNode3:SubTreeNode3.1')).not.toBe(undefined);
    expect(graph.findById('SubTreeNode3.1.1')).not.toBe(undefined);
    expect(graph.findById('SubTreeNode3.1:SubTreeNode3.1.1')).not.toBe(undefined);
  });

  it('remove child & remove nonexistent child', () => {
    graph.removeChild('SubTreeNode3.1');

    const parent = graph.findById('SubTreeNode3');
    const children = parent.get('model').children;

    expect(children.length).toBe(0);
    expect(graph.findById('SubTreeNode3.1')).toBe(undefined);
    expect(graph.findById('SubTreeNode3:SubTreeNode3.1')).toBe(undefined);
    expect(graph.findById('SubTreeNode3.1.1')).toBe(undefined);
    expect(graph.findById('SubTreeNode3.1:SubTreeNode3.1.1')).toBe(undefined);

    const none = graph.removeChild('none-child');
    expect(none).toBe(undefined);
  });

  it('collapse & expand with layout', () => {
    const parent = graph.findById('SubTreeNode1');
    let child = graph.findById('SubTreeNode1.1');
    let collapsed = true;
    graph.on('afterrefreshlayout', () => {
      if (collapsed) {
        expect(parent.getModel().collapsed).toBe(true);
        expect(child.destroyed).toBe(true);
      } else {
        child = graph.findById('SubTreeNode1.1');
        expect(parent.getModel().collapsed).toBe(false);
        expect(child.get('model').x).not.toEqual(parent.get('model').x);
        expect(!!child.getModel().collapsed).toBe(false);
        expect(child.get('model').y).not.toEqual(parent.get('model').y);
      }
    });
    graph.addBehaviors('collapse-expand', 'default');
    graph.emit('node:click', { item: parent });
    timerOut(() => {
      collapsed = false;
      graph.emit('node:click', { item: parent });
    }, 600);
    // graph.destroy();
  });

  it('collapse & expand with layout with parameter trigger=dblclick', () => {
    graph = new TreeGraph({
      container: div,
      width: 500,
      height: 500,
      animate: false,
      modes: {
        default: ['drag-canvas', 'drag-node'],
      },
      layout: {
        type: 'dendrogram',
        direction: 'LR', // H / V / LR / RL / TB / BT
        nodeSep: 50,
        rankSep: 100,
      },
    });
    const data = {
      isRoot: true,
      id: 'Root',
      children: [
        {
          id: 'SubTreeNode1',
          children: [
            {
              id: 'SubTreeNode1.1',
            },
            {
              id: 'SubTreeNode1.2',
            },
          ],
        },
        {
          id: 'SubTreeNode2',
        },
      ],
    };
    graph.data(data);
    graph.render();
    const parent = graph.findById('SubTreeNode1');
    parent.getModel().label = 'parent';
    let child = graph.findById('SubTreeNode1.1');
    let collapsed = true;
    graph.addBehaviors(
      [
        {
          type: 'collapse-expand',
          trigger: 'dblclick',
        },
      ],
      'default',
    );
    graph.on('afterrefreshlayout', () => {
      if (collapsed) {
        expect(parent.getModel().collapsed).toBe(true);
        expect(child.destroyed).toBe(true);
      } else {
        child = graph.findById('SubTreeNode1.1');
        expect(parent.getModel().collapsed).toBe(false);
        expect(child.get('model').x).not.toEqual(parent.get('model').x);
        expect(!!child.getModel().collapsed).toBe(false);
        expect(child.get('model').y).not.toEqual(parent.get('model').y);
      }
    });
    graph.emit('node:dblclick', { item: parent });
    timerOut(() => {
      collapsed = false;
      graph.emit('node:dblclick', { item: parent });
    }, 600);
  });
});

describe('update child', () => {
  const graph = new TreeGraph({
    container: div,
    width: 500,
    height: 500,
    animate: false,
    modes: {
      default: ['drag-canvas', 'drag-node'],
    },
    layout: {
      type: 'dendrogram',
      direction: 'LR', // H / V / LR / RL / TB / BT
      nodeSep: 50,
      rankSep: 100,
    },
  });

  const data = {
    isRoot: true,
    id: 'Root',
    children: [
      {
        id: 'SubTreeNode1',
      },
      {
        id: 'SubTreeNode3',
      },
    ],
  };
  graph.data(data);
  graph.render();

  it('updateChild & parent is not undefined', () => {
    const child = {
      id: 'SubTreeNode3.1',
      x: 150,
      y: 150,
      type: 'rect',
      children: [{ x: 250, y: 150, id: 'SubTreeNode3.1.1' }],
    };

    // 第一种情况，parent存在，添加的数据不存在
    graph.updateChild(child, 'SubTreeNode3');
    // 更新以后，SubTreeNode3 节点后会有子元素
    const subNode = graph.findById('SubTreeNode3');
    const children = subNode.get('children');
    expect(children).not.toBe(undefined);
    expect(children.length).toBe(1);

    const subNode3 = graph.findById('SubTreeNode3.1');
    const mode = subNode3.getModel();
    expect(mode.x).toBe(182);
    expect(mode.y).toBe(-24);
    expect(mode.type).toEqual('rect');
    expect(subNode3.get('currentShape')).toEqual('rect');
    expect(subNode3.get('children')).not.toBe(undefined);
    expect(subNode3.get('children').length).toBe(1);

    // 第二种情况，parent存在，添加的数据存在
    const treeGraphData = {
      id: 'SubTreeNode3.1',
      x: 120,
      y: 156,
      type: 'circle',
    };
    graph.updateChild(treeGraphData, 'SubTreeNode3');

    const node = graph.findById('SubTreeNode3.1');
    const model1 = node.getModel();
    expect(model1.x).toBe(182);
    expect(model1.y).toBe(-24);
    expect(model1.type).toEqual('circle');
    expect(node.get('children').length).toBe(0);
  });

  it('updateChild & parent is undefined', () => {
    const child = {
      id: 'SubTreeNode3.1',
      x: 150,
      y: 150,
      type: 'rect',
      children: [{ x: 250, y: 150, id: 'SubTreeNode3.1.1' }],
    };

    // 更新子元素，parent不存在
    graph.updateChild(child);

    // 之前的数据全都被重置
    expect(graph.findById('Root')).toBe(undefined);
    expect(graph.findById('SubTreeNode3')).toBe(undefined);
    const node = graph.findById('SubTreeNode3.1');
    expect(node).not.toBe(undefined);
    expect(node.get('children')).not.toBe(undefined);
    expect(node.get('children').length).toBe(1);
    graph.destroy();
  });
});

describe('updateLayout, layout', () => {
  const graph = new TreeGraph({
    container: div,
    width: 500,
    height: 500,
    animate: false,
    modes: {
      default: ['drag-canvas', 'drag-node'],
    },
    layout: {
      type: 'dendrogram',
      direction: 'LR', // H / V / LR / RL / TB / BT
      nodeSep: 50,
      rankSep: 100,
    },
  });

  const data = {
    isRoot: true,
    id: 'Root',
    children: [
      {
        id: 'SubTreeNode1',
        children: [
          {
            id: '1.1',
          },
          {
            id: '1.2',
          },
        ],
      },
      {
        id: 'SubTreeNode3',
        children: [
          {
            id: '3.1',
          },
          {
            id: '3.2',
          },
        ],
      },
    ],
  };
  graph.data(data);
  graph.render();

  it('updateLayout', () => {
    graph.moveTo(100, 200);
    const item = graph.getNodes()[1];
    const model = item.getModel();
    const beforeChangePos = [model.x, model.y];
    graph.updateLayout({
      type: 'compactBox',
      direction: 'LR',
    });
    const afterChangePos = [model.x, model.y];
    expect(beforeChangePos[0]).not.toBe(afterChangePos[0]);
    expect(beforeChangePos[1]).not.toBe(afterChangePos[1]);

    // changeLayout will be discarded soon.
    graph.changeLayout({
      type: 'mindmap',
      direction: 'H',
    });
    const afterChangePos2 = [model.x, model.y];
    expect(afterChangePos[1]).not.toBe(afterChangePos2[1]);

    // updateLayout without layout
    graph.updateLayout(null);
    const afterChangePos3 = [model.x, model.y];
    expect(afterChangePos2[0]).toBe(afterChangePos3[0]);
    expect(afterChangePos2[1]).toBe(afterChangePos3[1]);
  });

  it('refreshLayout', () => {
    data.children.push({
      id: 'newSubTree',
      children: [],
    });
    graph.refreshLayout();
    expect(graph.getNodes().length).toBe(8);
    graph.refreshLayout(true);
    expect(graph.getNodes().length).toBe(8);
  });
});

describe('tree graph with animate', () => {
  const graph3 = new TreeGraph({
    container: div,
    width: 500,
    height: 500,
    animate: true,
    modes: {
      default: ['drag-canvas'],
    },
    layout: {
      type: 'dendrogram',
      direction: 'LR',
      nodeSep: 50,
      rankSep: 100,
    },
  });
  it('layout init', () => {
    const data2 = {
      isRoot: true,
      id: 'Root',
      children: [
        {
          id: 'SubTreeNode1',
          label: 'SubTreeNode1',
          children: [
            {
              id: 'SubTreeNode1.1',
            },
            {
              id: 'SubTreeNode1.2',
            },
          ],
        },
        {
          id: 'SubTreeNode2',
        },
      ],
    };
    graph3.data(data2);
    graph3.render();
    graph3.fitView();

    const layoutMethod = graph3.get('layoutMethod');

    expect(layoutMethod).not.toBe(undefined);
    expect(typeof layoutMethod).toEqual('function');

    expect(Object.keys(graph3.get('itemMap')).length).toEqual(9);

    const edge = graph3.findById('Root:SubTreeNode1');
    expect(edge).not.toBe(undefined);

    expect(edge.get('source')).toEqual(graph3.findById('Root'));
    expect(edge.get('target')).toEqual(graph3.findById('SubTreeNode1'));
    expect(graph3.save()).toEqual(data2);
  });
  it('changeData', () => {
    graph3.off();
    const data3 = {
      isRoot: true,
      id: 'Root',
      children: [
        {
          id: 'SubTreeNode1',
          label: 'SubTreeNode1',
          children: [
            {
              id: 'SubTreeNode1.1',
            },
            {
              id: 'SubTreeNode1.2',
            },
          ],
        },
        {
          id: 'SubTreeNode3',
        },
        {
          id: 'SubTreeNode4',
          children: [{ id: 'SubTreeNode4.1' }],
        },
      ],
    };

    graph3.on('afteranimate', () => {
      expect(Object.keys(graph3.get('itemMap')).length).toEqual(13);

      expect(graph3.findById('SubTreeNode2')).toBe(undefined);
      expect(graph3.findById('SubTreeNode3')).not.toBe(undefined);
      expect(graph3.findById('SubTreeNode4')).not.toBe(undefined);

      const edge = graph3.findById('SubTreeNode4:SubTreeNode4.1');

      expect(edge).not.toBe(undefined);
      expect(edge.get('source')).toEqual(graph3.findById('SubTreeNode4'));
      expect(edge.get('target')).toEqual(graph3.findById('SubTreeNode4.1'));
    });
    
    graph3.changeData(data3);

    expect(graph3.save()).toEqual(data3);
  });
  it('collapse & expand', () => {
    graph3.off();

    const parent = graph3.findById('SubTreeNode1');
    let child = graph3.findById('SubTreeNode1.1');

    let collapsed = true;
    graph3.on('afteranimate', () => {
      if (collapsed) {
        expect(parent.getModel().collapsed).toBe(true);
        expect(child.destroyed).toBe(true);
      } else {
        child = graph3.findById('SubTreeNode1.1');
        expect(parent.getModel().collapsed).toBe(false);
        expect(child.get('model').x).not.toEqual(parent.get('model').x);
        expect(!!child.getModel().collapsed).toBe(false);
        expect(child.get('model').y).not.toEqual(parent.get('model').y);
      }
    });
    graph3.addBehaviors('collapse-expand', 'default');
    graph3.emit('node:click', { item: parent });

    timerOut(() => {
      collapsed = false;
      graph3.emit('node:click', { item: parent });
    }, 600);
  });
  it('collapse & expand with parameter trigger=dblclick', () => {
    graph3.off();
    graph3.moveTo(100, 150);

    const parent = graph3.findById('SubTreeNode1');
    let child = graph3.findById('SubTreeNode1.1');

    let collapsed = true;
    graph3.on('afteranimate', () => {
      if (collapsed) {
        console.log(parent.getModel().collapsed, child.destroyed)
        expect(parent.getModel().collapsed).toBe(true);
        expect(child.destroyed).toBe(true);
      } else {
        child = graph3.findById('SubTreeNode1.1');
        expect(parent.getModel().collapsed).toBe(false);
        expect(child.get('model').x).not.toEqual(parent.get('model').x);
        expect(!!child.getModel().collapsed).toBe(false);
        expect(child.get('model').y).not.toEqual(parent.get('model').y);
        // done();
      }
    });
    graph3.addBehaviors(
      [
        {
          type: 'collapse-expand',
          trigger: 'dblclick',
        },
      ],
      'default',
    );

    graph3.emit('node:dblclick', { item: parent });

    timerOut(() => {
      collapsed = false;
      graph3.emit('node:dblclick', { item: parent });
    }, 600);
  });

  // it('test', () => {
  //   const data = {
  //     isRoot: true,
  //     id: 'Root',
  //     children: [
  //       {
  //         id: 'SubTreeNode1',
  //         children: [
  //           {
  //             id: 'SubTreeNode1.1'
  //           },
  //           {
  //             id: 'SubTreeNode1.2'
  //           }
  //         ]
  //       },
  //       {
  //         id: 'SubTreeNode2'
  //       }
  //     ]
  //   };
  //   const graph2 = new TreeGraph({
  //     container: div,
  //     width: 500,
  //     height: 500,
  //     animate: false,
  //     modes: {
  //       default: [ 'drag-canvas', 'drag-node' ]
  //     },
  //     layout: {
  //       type: 'dendrogram',
  //       direction: 'LR', // H / V / LR / RL / TB / BT
  //       nodeSep: 50,
  //       rankSep: 100
  //     }
  //   });
  //   graph2.data(data);
  //   graph2.render();

  //   const pos = [0, 0];
  //   graph2.on('node:click', () => {
  //     pos[0] += 10;
  //     pos[1] += 10;
  //     graph2.moveTo(pos[0], pos[1]);
  //   });
  // });
});

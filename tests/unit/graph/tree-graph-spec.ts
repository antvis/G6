import Hierarchy from '@antv/hierarchy';
import G6 from '../../../src';

const div = document.createElement('div');
div.id = 'tree-spec';
document.body.appendChild(div);

function timerGame(callback, time = 50) {
  setTimeout(() => {
    callback();
  }, time);
}

describe('tree graph without animate', () => {
  let graph = new G6.TreeGraph({
    container: div,
    width: 500,
    height: 500,
    animate: false,
    modes: {
      default: [ 'drag-canvas', 'drag-node' ]
    },
    layout: {
      type: 'dendrogram',
      direction: 'LR', // H / V / LR / RL / TB / BT
      nodeSep: 50,
      rankSep: 100
    }
  });

  it('layout init', () => {
    const data = {
      isRoot: true,
      id: 'Root',
      children: [
        {
          id: 'SubTreeNode1',
          children: [
            {
              id: 'SubTreeNode1.1'
            },
            {
              id: 'SubTreeNode1.2'
            }
          ]
        },
        {
          id: 'SubTreeNode2'
        }
      ]
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
              id: 'SubTreeNode1.1'
            },
            {
              id: 'SubTreeNode1.2'
            }
          ]
        },
        {
          id: 'SubTreeNode3'
        }, {
          id: 'SubTreeNode4',
          children: [{ id: 'SubTreeNode4.1' }]
        }
      ]
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

    const child = { id: 'SubTreeNode3.1', x: 100, y: 100, shape: 'rect', children: [{ x: 150, y: 150, id: 'SubTreeNode3.1.1' }] };

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

  it('remove child', () => {
    graph.removeChild('SubTreeNode3.1');

    const parent = graph.findById('SubTreeNode3');
    const children = parent.get('model').children;

    expect(children.length).toBe(0);
    expect(graph.findById('SubTreeNode3.1')).toBe(undefined);
    expect(graph.findById('SubTreeNode3:SubTreeNode3.1')).toBe(undefined);
    expect(graph.findById('SubTreeNode3.1.1')).toBe(undefined);
    expect(graph.findById('SubTreeNode3.1:SubTreeNode3.1.1')).toBe(undefined);
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
    timerGame(() => {
      collapsed = false;
      graph.emit('node:click', { item: parent });
    }, 600);
    graph.destroy();
  });

  it('collapse & expand with layout with parameter trigger=dblclick', () => {
    // FIXME: graph.off() does not take effect
    // graph.off();
    graph = new G6.TreeGraph({
      container: div,
      width: 500,
      height: 500,
      animate: false,
      modes: {
        default: [ 'drag-canvas', 'drag-node' ]
      },
      layout: {
        type: 'dendrogram',
        direction: 'LR', // H / V / LR / RL / TB / BT
        nodeSep: 50,
        rankSep: 100
      }
    });
    const data = {
      isRoot: true,
      id: 'Root',
      children: [
        {
          id: 'SubTreeNode1',
          children: [
            {
              id: 'SubTreeNode1.1'
            },
            {
              id: 'SubTreeNode1.2'
            }
          ]
        },
        {
          id: 'SubTreeNode2'
        }
      ]
    };
    graph.data(data);
    graph.render();
    const parent = graph.findById('SubTreeNode1');
    parent.getModel().label = 'parent'
    let child = graph.findById('SubTreeNode1.1');
    let collapsed = true;
    graph.addBehaviors([{
      type: 'collapse-expand',
      trigger: 'dblclick'
    }], 'default');
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
    timerGame(() => {
      collapsed = false;
      graph.emit('node:dblclick', { item: parent });
    }, 600);
  });
});

describe('tree graph with animate', () => {
  const graph = new G6.TreeGraph({
    container: div,
    width: 500,
    height: 500,
    animate: true,
    modes: {
      default: [ 'drag-canvas' ]
    },
    layout: {
      type: 'dendrogram',
      direction: 'LR',
      nodeSep: 50,
      rankSep: 100
    }
  });
  it('layout init', () => {
    const data = {
      isRoot: true,
      id: 'Root',
      children: [
        {
          id: 'SubTreeNode1',
          children: [
            {
              id: 'SubTreeNode1.1'
            },
            {
              id: 'SubTreeNode1.2'
            }
          ]
        },
        {
          id: 'SubTreeNode2'
        }
      ]
    };
    graph.data(data);
    graph.render();
    graph.fitView();

    const layoutMethod = graph.get('layoutMethod');

    expect(layoutMethod).not.toBe(undefined);
    expect(typeof layoutMethod).toEqual('function');

    expect(Object.keys(graph.get('itemMap')).length).toEqual(9);

    const edge = graph.findById('Root:SubTreeNode1');
    expect(edge).not.toBe(undefined);

    expect(edge.get('source')).toEqual(graph.findById('Root'));
    expect(edge.get('target')).toEqual(graph.findById('SubTreeNode1'));
    expect(graph.save()).toEqual(data);
  });
  it('changeData', () => {
    graph.off();
    const data = {
      isRoot: true,
      id: 'Root',
      children: [
        {
          id: 'SubTreeNode1',
          children: [
            {
              id: 'SubTreeNode1.1'
            },
            {
              id: 'SubTreeNode1.2'
            }
          ]
        },
        {
          id: 'SubTreeNode3'
        }, {
          id: 'SubTreeNode4',
          children: [{ id: 'SubTreeNode4.1' }]
        }
      ]
    };
    graph.changeData(data);

    expect(graph.save()).toEqual(data);

    graph.on('afteranimate', () => {
      expect(Object.keys(graph.get('itemMap')).length).toEqual(13);

      expect(graph.findById('SubTreeNode2')).toBe(undefined);
      expect(graph.findById('SubTreeNode3')).not.toBe(undefined);
      expect(graph.findById('SubTreeNode4')).not.toBe(undefined);

      const edge = graph.findById('SubTreeNode4:SubTreeNode4.1');

      expect(edge).not.toBe(undefined);
      expect(edge.get('source')).toEqual(graph.findById('SubTreeNode4'));
      expect(edge.get('target')).toEqual(graph.findById('SubTreeNode4.1'));
    });
  });
  it('collapse & expand', () => {
    graph.off();

    const parent = graph.findById('SubTreeNode1');
    let child = graph.findById('SubTreeNode1.1');

    let collapsed = true;
    graph.on('afteranimate', () => {
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

    timerGame(() => {
      collapsed = false;
      graph.emit('node:click', { item: parent });
    }, 600);
  });
  it('collapse & expand with parameter trigger=dblclick', () => {
    graph.off();

    const parent = graph.findById('SubTreeNode1');
    let child = graph.findById('SubTreeNode1.1');

    let collapsed = true;
    graph.on('afteranimate', () => {
      if (collapsed) {
        expect(parent.getModel().collapsed).toBe(true);
        expect(child.destroyed).toBe(true);
      } else {
        child = graph.findById('SubTreeNode1.1');
        expect(parent.getModel().collapsed).toBe(false);
        expect(child.get('model').x).not.toEqual(parent.get('model').x);
        expect(!!child.getModel().collapsed).toBe(false);
        expect(child.get('model').y).not.toEqual(parent.get('model').y);
        // done();
      }
    });
    graph.addBehaviors([{
      type: 'collapse-expand',
      trigger: 'dblclick'
    }], 'default');

    graph.emit('node:dblclick', { item: parent });

    timerGame(() => {
      collapsed = false;
      graph.emit('node:dblclick', { item: parent });
    }, 600);
  });
});
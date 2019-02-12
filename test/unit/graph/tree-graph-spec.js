const expect = require('chai').expect;
const Hierarchy = require('@antv/hierarchy');
const G6 = require('../../../src');

const div = document.createElement('div');
div.id = 'tree-spec';
document.body.appendChild(div);

function isNumberEqual(a, b) {
  return Math.abs(a - b) < 0.0001;
}

describe('tree graph without layout', () => {
  const graph = new G6.TreeGraph({
    container: div,
    width: 500,
    height: 500,
    pixelRatio: 2,
    modes: {
      default: [ 'drag-canvas' ]
    }
  });
  let root = {
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
  const NODE_SIZE = 16;
  const PEM = 5;
  root = Hierarchy.dendrogram(root, {
    direction: 'TB', // H / V / LR / RL / TB / BT
    nodeSep: 200,
    getId(d) {
      return d.id;
    },
    getHeight() {
      return NODE_SIZE;
    },
    getWidth() {
      return NODE_SIZE;
    },
    getHGap() {
      return 10;
    },
    getVGap() {
      return 10;
    },
    getSubTreeSep(d) {
      if (!d.children || !d.children.length) {
        return 0;
      }
      return PEM;
    }
  });
  it('render tree graph', () => {
    graph.data(root);
    graph.render();
    const rootNode = graph.get('root');
    expect(rootNode).not.to.be.undefined;
    expect(rootNode.get('model').id).to.equal('Root');
    expect(Object.keys(graph.get('itemMap')).length).to.equal(9);
    const edge = graph.findById('Root:SubTreeNode1');
    expect(edge).not.to.be.undefined;
    expect(edge.get('source')).to.equal(graph.findById('Root'));
    expect(edge.get('target')).to.equal(graph.findById('SubTreeNode1'));
  });
  it('change data', () => {
    let data = {
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
    const root = graph.get('root');
    data = Hierarchy.dendrogram(data, {
      direction: 'LR', // H / V / LR / RL / TB / BT
      nodeSep: 200,
      getId(d) {
        return d.id;
      },
      getHeight() {
        return NODE_SIZE;
      },
      getWidth() {
        return NODE_SIZE;
      },
      getHGap() {
        return 10;
      },
      getVGap() {
        return 10;
      },
      getSubTreeSep(d) {
        if (!d.children || !d.children.length) {
          return 0;
        }
        return PEM;
      }
    });
    graph.changeData(data);
    graph.fitView();
    expect(graph.get('root')).to.equal(root);
    expect(Object.keys(graph.get('itemMap')).length).to.equal(13);
    expect(graph.findById('SubTreeNode2')).to.be.undefined;
    expect(graph.findById('SubTreeNode3')).not.to.be.undefined;
    expect(graph.findById('SubTreeNode4')).not.to.be.undefined;
    const edge = graph.findById('SubTreeNode4:SubTreeNode4.1');
    expect(edge).not.to.be.undefined;
    expect(edge.get('source')).to.equal(graph.findById('SubTreeNode4'));
    expect(edge.get('target')).to.equal(graph.findById('SubTreeNode4.1'));
  });
  it('add child', () => {
    const parent = graph.findById('SubTreeNode3');
    const child = { id: 'SubTreeNode3.1', x: 100, y: 100, shape: 'rect', children: [{ x: 150, y: 150, id: 'SubTreeNode3.1.1' }] };
    graph.addChild(child, parent);
    const children = parent.get('model').children;
    expect(children).not.to.be.undefined;
    expect(children.length).to.equal(1);
    expect(children[0].id).to.equal('SubTreeNode3.1');
    expect(graph.findById('SubTreeNode3.1')).not.to.be.undefined;
    expect(graph.findById('SubTreeNode3:SubTreeNode3.1')).not.to.be.undefined;
    expect(graph.findById('SubTreeNode3.1.1')).not.to.be.undefined;
    expect(graph.findById('SubTreeNode3.1:SubTreeNode3.1.1')).not.to.be.undefined;
  });
  it('remove child', () => {
    graph.removeChild('SubTreeNode3.1');
    const parent = graph.findById('SubTreeNode3');
    const children = parent.get('model').children;
    expect(children.length).to.equal(0);
    expect(graph.findById('SubTreeNode3.1')).to.be.undefined;
    expect(graph.findById('SubTreeNode3:SubTreeNode3.1')).to.be.undefined;
    expect(graph.findById('SubTreeNode3.1.1')).to.be.undefined;
    expect(graph.findById('SubTreeNode3.1:SubTreeNode3.1.1')).to.be.undefined;
  });
  it('collapse & expand with default animate', done => {
    const parent = graph.findById('SubTreeNode1');
    const child = graph.findById('SubTreeNode1.1');
    let collapsed = true;
    graph.addBehaviors({
      type: 'collapse-expand',
      animate: {
        duration: 500,
        callback() {
          if (collapsed) {
            expect(parent.get('collapsed')).to.be.true;
            expect(parent.hasState('collapsed')).to.be.true;
            expect(isNumberEqual(child.get('model').x, parent.get('model').x)).to.be.true;
            expect(!!child.get('collapsed')).to.be.false;
            expect(child.hasState('collapsed')).to.be.true;
            expect(isNumberEqual(child.get('model').y, parent.get('model').y)).to.be.true;
          } else {
            expect(parent.get('collapsed')).to.be.false;
            expect(parent.hasState('collapsed')).to.be.false;
            expect(child.get('model').x).not.to.equal(parent.get('model').x);
            expect(!!child.get('collapsed')).to.be.false;
            expect(child.hasState('collapsed')).to.be.false;
            expect(child.get('model').y).not.to.equal(parent.get('model').y);
            graph.removeBehaviors('collapse-expand', 'default');
            done();
          }
        }
      }
    }, 'default');
    graph.emit('node:click', { item: parent });
    setTimeout(() => {
      collapsed = false;
      graph.emit('node:click', { item: parent });
    }, 600);
  });
  it('collapse & expand without onChange', () => {
    graph.addBehaviors({
      type: 'collapse-expand',
      animate: false
    }, 'default');
    const root = graph.get('root');
    const child = graph.findById('SubTreeNode1');
    const leave = graph.findById('SubTreeNode1.1');
    graph.emit('node:click', { item: root });
    expect(root.isVisible()).to.be.true;
    expect(child.isVisible()).to.be.false;
    expect(leave.isVisible()).to.be.false;
    expect(child.hasState('collapsed')).to.be.true;
    expect(leave.hasState('collapsed')).to.be.true;
    graph.emit('node:click', { item: root });
    expect(root.isVisible()).to.be.true;
    expect(child.isVisible()).to.be.true;
    expect(leave.isVisible()).to.be.true;
    expect(child.hasState('collapsed')).to.be.false;
    expect(leave.hasState('collapsed')).to.be.false;
    graph.removeBehaviors('collapse-expand', 'default');
  });
  it('collapse & expand animate', done => {
    G6.Global.defaultNode.style.fill = '#fff';
    const parent = graph.findById('SubTreeNode1');
    const child = graph.findById('SubTreeNode1.1');
    let collapsed = true;
    graph.addBehaviors({
      type: 'collapse-expand',
      animate: {
        duration: 500,
        callback() {
          if (collapsed) {
            expect(parent.get('collapsed')).to.be.true;
            expect(parent.hasState('collapsed')).to.be.true;
            expect(isNumberEqual(child.get('model').x, parent.get('model').x)).to.be.true;
            expect(!!child.get('collapsed')).to.be.false;
            expect(child.hasState('collapsed')).to.be.true;
            expect(isNumberEqual(child.get('model').y, parent.get('model').y)).to.be.true;
          } else {
            expect(parent.get('collapsed')).to.be.false;
            expect(parent.hasState('collapsed')).to.be.false;
            expect(child.get('model').x).not.to.equal(parent.get('model').x);
            expect(!!child.get('collapsed')).to.be.false;
            expect(child.hasState('collapsed')).to.be.false;
            expect(child.get('model').y).not.to.equal(parent.get('model').y);
            graph.removeBehaviors('collapse-expand', 'default');
            done();
          }
        }
      },
      onChange(item, collapsed) {
        let data = graph.get('data');
        item.get('model').data.collapsed = collapsed;
        data = Hierarchy.dendrogram(data.data, {
          direction: 'LR', // H / V / LR / RL / TB / BT
          nodeSep: 200,
          getId(d) {
            return d.id;
          },
          getHeight() {
            return NODE_SIZE;
          },
          getWidth() {
            return NODE_SIZE;
          },
          getHGap() {
            return 10;
          },
          getVGap() {
            return 10;
          },
          getSubTreeSep(d) {
            if (!d.children || !d.children.length) {
              return 0;
            }
            return PEM;
          }
        });
        return data;
      }
    }, 'default');
    graph.emit('node:click', { item: parent });
    setTimeout(() => {
      collapsed = false;
      graph.emit('node:click', { item: parent });
    }, 600);
  });
});

describe('tree graph with layout', () => {
  let count = 0;
  const graph = new G6.TreeGraph({
    container: div,
    width: 500,
    height: 500,
    pixelRatio: 2,
    modes: {
      default: [ 'drag-canvas' ]
    },
    layout: data => {
      count++;
      return Hierarchy.dendrogram(data, {
        direction: 'LR', // H / V / LR / RL / TB / BT
        nodeSep: 50,
        rankSep: 100
      });
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
    const rootNode = graph.get('root');
    expect(rootNode).not.to.be.undefined;
    expect(rootNode.get('model').id).to.equal('Root');
    expect(Object.keys(graph.get('itemMap')).length).to.equal(9);
    const edge = graph.findById('Root:SubTreeNode1');
    expect(edge).not.to.be.undefined;
    expect(edge.get('source')).to.equal(graph.findById('Root'));
    expect(edge.get('target')).to.equal(graph.findById('SubTreeNode1'));
    expect(graph.save()).to.equal(data);
    expect(count).to.equal(1);
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
    expect(graph.save()).to.equal(data);
    expect(Object.keys(graph.get('itemMap')).length).to.equal(13);
    expect(graph.findById('SubTreeNode2')).to.be.undefined;
    expect(graph.findById('SubTreeNode3')).not.to.be.undefined;
    expect(graph.findById('SubTreeNode4')).not.to.be.undefined;
    const edge = graph.findById('SubTreeNode4:SubTreeNode4.1');
    expect(edge).not.to.be.undefined;
    expect(edge.get('source')).to.equal(graph.findById('SubTreeNode4'));
    expect(edge.get('target')).to.equal(graph.findById('SubTreeNode4.1'));
    expect(count).to.equal(2);
  });
  it('add child', () => {
    const parent = graph.findById('SubTreeNode3');
    const child = { id: 'SubTreeNode3.1', x: 100, y: 100, shape: 'rect', children: [{ x: 150, y: 150, id: 'SubTreeNode3.1.1' }] };
    graph.addChild(child, parent);
    const children = parent.get('model').children;
    expect(children).not.to.be.undefined;
    expect(children.length).to.equal(1);
    expect(children[0].id).to.equal('SubTreeNode3.1');
    expect(graph.findById('SubTreeNode3.1')).not.to.be.undefined;
    expect(graph.findById('SubTreeNode3:SubTreeNode3.1')).not.to.be.undefined;
    expect(graph.findById('SubTreeNode3.1.1')).not.to.be.undefined;
    expect(graph.findById('SubTreeNode3.1:SubTreeNode3.1.1')).not.to.be.undefined;
    expect(count).to.equal(3);
  });
  it('remove child', () => {
    graph.removeChild('SubTreeNode3.1');
    const parent = graph.findById('SubTreeNode3');
    const children = parent.get('model').children;
    expect(children.length).to.equal(0);
    expect(graph.findById('SubTreeNode3.1')).to.be.undefined;
    expect(graph.findById('SubTreeNode3:SubTreeNode3.1')).to.be.undefined;
    expect(graph.findById('SubTreeNode3.1.1')).to.be.undefined;
    expect(graph.findById('SubTreeNode3.1:SubTreeNode3.1.1')).to.be.undefined;
    expect(count).to.equal(4);
  });
  it('collapse & expand with layout', done => {
    const parent = graph.findById('SubTreeNode1');
    const child = graph.findById('SubTreeNode1.1');
    let collapsed = true;
    graph.addBehaviors({
      type: 'collapse-expand',
      onChange: (item, collapsed) => {
        const data = item.get('model').data;
        data.collapsed = collapsed;
        return false;
      },
      animate: {
        callback() {
          if (collapsed) {
            expect(parent.get('collapsed')).to.be.true;
            expect(parent.hasState('collapsed')).to.be.true;
            expect(isNumberEqual(child.get('model').x, parent.get('model').x)).to.be.true;
            expect(!!child.get('collapsed')).to.be.false;
            expect(child.hasState('collapsed')).to.be.true;
            expect(isNumberEqual(child.get('model').y, parent.get('model').y)).to.be.true;
          } else {
            expect(parent.get('collapsed')).to.be.false;
            expect(parent.hasState('collapsed')).to.be.false;
            expect(child.get('model').x).not.to.equal(parent.get('model').x);
            expect(!!child.get('collapsed')).to.be.false;
            expect(child.hasState('collapsed')).to.be.false;
            expect(child.get('model').y).not.to.equal(parent.get('model').y);
            done();
          }
        }
      } }, 'default');
    graph.emit('node:click', { item: parent });
    setTimeout(() => {
      collapsed = false;
      graph.emit('node:click', { item: parent });
    }, 600);
  });
  /* const treeData = {
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
        id: 'SubTreeNode2',
        children: [
          {
            id: 'SubTreeNode2.1'
          },
          {
            id: 'SubTreeNode2.2',
            children: [
              {
                id: 'SubTreeNode1.2.1'
              },
              {
                id: 'SubTreeNode1.2.2'
              },
              {
                id: 'SubTreeNode1.2.3'
              }
            ]
          }
        ]
      }, {
        id: 'SubTreeNode3'
      }, {
        id: 'SubTreeNode4'
      }, {
        id: 'SubTreeNode5'
      }, {
        id: 'SubTreeNode6'
      }, {
        id: 'SubTreeNode7',
        children: [
          {
            id: 'SubTreeNode3.1'
          },
          {
            id: 'SubTreeNode3.2'
          },
          {
            id: 'SubTreeNode3.3'
          }
        ]
      }, {
        id: 'SubTreeNode8'
      }, {
        id: 'SubTreeNode9'
      }, {
        id: 'SubTreeNode10'
      }, {
        id: 'SubTreeNode11'
      }
    ]
  };
  it('radial layout', () => {
    graph.data(treeData);
    graph.render();
    G6.Util.radialLayout(graph, 'LR');
  });
  it('vertical layout to radial layout', () => {
    const graph = new G6.TreeGraph({
      container: div,
      width: 500,
      height: 500,
      pixelRatio: 2,
      modes: {
        default: [ 'drag-canvas' ]
      },
      layout: data => {
        count++;
        return Hierarchy.dendrogram(data, {
          direction: 'TB', // H / V / LR / RL / TB / BT
          nodeSep: 50,
          rankSep: 100
        });
      }
    });
    graph.data(treeData);
    graph.render();
    G6.Util.radialLayout(graph, 'TB');
  });*/
});

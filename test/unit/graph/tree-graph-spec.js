const expect = require('chai').expect;
const Hierarchy = require('@antv/hierarchy');
const G6 = require('../../../src');

const div = document.createElement('div');
div.id = 'tree-spec';
document.body.appendChild(div);

describe('tree graph without animate', () => {
  const graph = new G6.TreeGraph({
    container: div,
    width: 500,
    height: 500,
    pixelRatio: 2,
    animate: false,
    modes: {
      default: [ 'drag-canvas' ]
    },
    layout: data => {
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
    expect(Object.keys(graph.get('itemMap')).length).to.equal(9);
    const edge = graph.findById('Root:SubTreeNode1');
    expect(edge).not.to.be.undefined;
    expect(edge.get('source')).to.equal(graph.findById('Root'));
    expect(edge.get('target')).to.equal(graph.findById('SubTreeNode1'));
    expect(graph.save()).to.equal(data);
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
  it('collapse & expand with layout', done => {
    const parent = graph.findById('SubTreeNode1');
    let child = graph.findById('SubTreeNode1.1');
    let collapsed = true;
    graph.on('afterrefreshlayout', () => {
      if (collapsed) {
        expect(parent.getModel().collapsed).to.be.true;
        expect(child.destroyed).to.be.true;
      } else {
        child = graph.findById('SubTreeNode1.1');
        expect(parent.getModel().collapsed).to.be.false;
        expect(child.get('model').x).not.to.equal(parent.get('model').x);
        expect(!!child.getModel().collapsed).to.be.false;
        expect(child.get('model').y).not.to.equal(parent.get('model').y);
        done();
      }
    });
    graph.addBehaviors('collapse-expand', 'default');
    graph.emit('node:click', { item: parent });
    setTimeout(() => {
      collapsed = false;
      graph.emit('node:click', { item: parent });
    }, 600);
  });
  it('collapse & expand with layout with parameter trigger=dblclick', done => {
    graph.removeEvent();
    const parent = graph.findById('SubTreeNode1');
    let child = graph.findById('SubTreeNode1.1');
    let collapsed = true;
    graph.addBehaviors([{
      type: 'collapse-expand',
      trigger: 'dblclick'
    }], 'default');
    graph.on('afterrefreshlayout', () => {
      if (collapsed) {
        expect(parent.getModel().collapsed).to.be.true;
        expect(child.destroyed).to.be.true;
      } else {
        child = graph.findById('SubTreeNode1.1');
        expect(parent.getModel().collapsed).to.be.false;
        expect(child.get('model').x).not.to.equal(parent.get('model').x);
        expect(!!child.getModel().collapsed).to.be.false;
        expect(child.get('model').y).not.to.equal(parent.get('model').y);
        done();
      }
    });
    graph.emit('node:dblclick', { item: parent });
    setTimeout(() => {
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
    pixelRatio: 2,
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
  it('layout init', done => {
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
    expect(layoutMethod).not.to.be.undefined;
    expect(typeof layoutMethod).to.equal('function');
    expect(Object.keys(graph.get('itemMap')).length).to.equal(9);
    const edge = graph.findById('Root:SubTreeNode1');
    expect(edge).not.to.be.undefined;
    expect(edge.get('source')).to.equal(graph.findById('Root'));
    expect(edge.get('target')).to.equal(graph.findById('SubTreeNode1'));
    expect(graph.save()).to.equal(data);
    expect(JSON.stringify(data)).not.to.throw;
    graph.on('afteranimate', () => { done(); });
  });
  it('changeData', done => {
    graph.removeEvent();
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
    graph.on('afteranimate', () => {
      expect(Object.keys(graph.get('itemMap')).length).to.equal(13);
      expect(graph.findById('SubTreeNode2')).to.be.undefined;
      expect(graph.findById('SubTreeNode3')).not.to.be.undefined;
      expect(graph.findById('SubTreeNode4')).not.to.be.undefined;
      const edge = graph.findById('SubTreeNode4:SubTreeNode4.1');
      expect(edge).not.to.be.undefined;
      expect(edge.get('source')).to.equal(graph.findById('SubTreeNode4'));
      expect(edge.get('target')).to.equal(graph.findById('SubTreeNode4.1'));
      done();
    });
  });
  it('collapse & expand', done => {
    graph.removeEvent();
    const parent = graph.findById('SubTreeNode1');
    let child = graph.findById('SubTreeNode1.1');
    let collapsed = true;
    graph.on('afteranimate', () => {
      if (collapsed) {
        expect(parent.getModel().collapsed).to.be.true;
        expect(child.destroyed).to.be.true;
      } else {
        child = graph.findById('SubTreeNode1.1');
        expect(parent.getModel().collapsed).to.be.false;
        expect(child.get('model').x).not.to.equal(parent.get('model').x);
        expect(!!child.getModel().collapsed).to.be.false;
        expect(child.get('model').y).not.to.equal(parent.get('model').y);
        done();
      }
    });
    graph.addBehaviors('collapse-expand', 'default');
    graph.emit('node:click', { item: parent });
    setTimeout(() => {
      collapsed = false;
      graph.emit('node:click', { item: parent });
    }, 600);
  });
  it('collapse & expand with parameter trigger=dblclick', done => {
    graph.removeEvent();
    const parent = graph.findById('SubTreeNode1');
    let child = graph.findById('SubTreeNode1.1');
    let collapsed = true;
    graph.on('afteranimate', () => {
      if (collapsed) {
        expect(parent.getModel().collapsed).to.be.true;
        expect(child.destroyed).to.be.true;
      } else {
        child = graph.findById('SubTreeNode1.1');
        expect(parent.getModel().collapsed).to.be.false;
        expect(child.get('model').x).not.to.equal(parent.get('model').x);
        expect(!!child.getModel().collapsed).to.be.false;
        expect(child.get('model').y).not.to.equal(parent.get('model').y);
        done();
      }
    });
    graph.addBehaviors([{
      type: 'collapse-expand',
      trigger: 'dblclick'
    }], 'default');
    graph.emit('node:dblclick', { item: parent });
    setTimeout(() => {
      collapsed = false;
      graph.emit('node:dblclick', { item: parent });
    }, 600);
  });
});

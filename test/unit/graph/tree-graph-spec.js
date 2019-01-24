const expect = require('chai').expect;
const Hierarchy = require('@antv/hierarchy');
const G6 = require('../../../src');

const div = document.createElement('div');
div.id = 'tree-spec';
document.body.appendChild(div);

describe.only('tree graph', () => {
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
  it('collapse & expand animate', () => {
    G6.Global.defaultNode.style.fill = '#fff';
    graph.addBehaviors({
      type: 'collapse-expand',
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
  });
});

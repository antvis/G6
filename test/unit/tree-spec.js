require('../../plugins/');
const Tree = require('../../src/tree');
// const Layouts = require('../../src/layouts/');
const expect = require('chai').expect;
// const Util = require('../../src/util/');
const div = document.createElement('div');
const data = require('../fixtures/sample-tree-data.json');
document.body.appendChild(div);
const tree = new Tree({
  container: div,
  height: 600,
  fitView: 'cc',
  modes: {
    default: [ 'panCanvas' ]
  },
  animate: false
});
tree.node().label(model => {
  return model.name;
});
tree.read(data);
tree.on('click', () => {
  tree.draw();
});
describe('tree test', () => {
  it('render', () => {
    expect(tree.find('analytics')).not.equal(undefined);
    expect(tree.find('root')).not.equal(undefined);
  });
  it('add', () => {
    tree.add('node', {
      id: 'addNode',
      label: 'addNode',
      parent: 'analytics'
    });
    expect(tree.find('addNode')).not.equal(undefined);
  });
  it('update', () => {
    tree.update('addNode', {
      children: [
        {
          id: 'addNode.1',
          label: 'addNode.1',
          parent: 'addNode'
        }
      ]
    });
    expect(tree.find('addNode').getModel().children[0].id).equal('addNode.1');
    tree.update('addNode', {
      collapsed: true
    });
    expect(tree.find('addNode.1').isVisible()).equal(false);
    tree.update('addNode', {
      collapsed: false
    });
    expect(tree.find('addNode.1').isVisible()).equal(true);
  });
  it('remove', () => {
    tree.remove('analytics');
    expect(tree.find('analytics')).equal(undefined);
  });
  it('destroy test graph', () => {
    tree.destroy();
  });
});

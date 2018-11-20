require('../../plugins/');
const Tree = require('../../src/tree');
// const Layouts = require('../../src/layouts/');
const expect = require('chai').expect;
// const Util = require('../../src/util/');
const div = document.createElement('div');
div.setAttribute('data-test-spec', 'tree-spec.js');
const data = require('../fixtures/sample-tree-data.json');
document.body.appendChild(div);
describe('tree test', () => {
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
  it('render', () => {
    expect(tree.find('analytics')).not.equal(undefined);
    expect(tree.find('root')).not.equal(undefined);
  });
  it('add', () => {
    tree.add('node', {
      id: 'addNode',
      label: 'addNode',
      parent: 'analytics',
      children: [
        {
          id: 'addNode.5',
          collapsed: true,
          children: [
            { id: 'addNode.5.1' }
          ]
        }
      ]
    });
    expect(tree.find('addNode')).not.equal(undefined);
    expect(tree.find('addNode.5.1').isVisible()).equal(false);

    tree.add('node', {
      id: 'addNode2',
      label: 'addNode',
      parent: 'analytics',
      collapsed: true,
      children: [
        { id: 'addNode2.1' },
        {},
        {}
      ]
    });
    expect(tree.find('addNode2.1').isVisible()).equal(false);
    tree.add('node', {
      id: 'addNode3',
      label: 'addNode',
      parent: 'addNode2.1'
    });
    expect(tree.find('addNode3').isVisible()).equal(false);
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
    tree.update('addNode', {
      parent: 'root'
    });
    expect(tree.find('root-addNode')).not.equal(undefined);
    tree.update('addNode', {
      children: [
        {
          id: 'addNode.2',
          label: 'addNode.2'
        }
      ]
    });
    expect(tree.find('addNode.2')).not.equal(undefined);
    expect(tree.find('addNode.1')).equal(undefined);
    tree.update('addNode', {
      nth: 1
    });
  });
  it('remove', () => {
    tree.remove('analytics');
    expect(tree.find('analytics')).equal(undefined);
  });
  it('remove null', () => {
    tree.remove(null);
  });
  it('getHierarchy', () => {
    expect(tree.getHierarchy('root')).equal(1);
    expect(tree.getHierarchy('addNode')).equal(2);
  });
  it('getNth', () => {
    expect(tree.getNth('addNode')).equal(0);
  });
  it('save', () => {
    expect(tree.save().roots.length).equal(1);
  });
  it('getRoots', () => {
    expect(tree.getRoots()[0].id).equal('root');
  });
  it('changeLayout', () => {
    tree.changeLayout(() => {

    });
  });
  it('destroy test graph', () => {
    tree.destroy();
  });
});

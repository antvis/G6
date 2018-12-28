const expect = require('chai').expect;
const G = require('@antv/g');
const Node = require('../../../src/item/node');

const div = document.createElement('div');
div.id = 'item-spec';
document.body.appendChild(div);

describe('node', () => {
  it('new & destroy node', () => {
    const parent = new G.Group();
    const node = new Node({x: 0, y: 0, id: 'a', color: '#ccc' }, parent);
    const group = node.get('group');
    expect(node).not.to.be.undefined;
    expect(node.getType()).to.equal('node');
    expect(node.getNeighbors().length).to.equal(0);
    expect(group).not.to.be.undefined;
    expect(group.get('children').length).to.equal(1);
    expect(group.get('children')[0].type).to.equal('circle');
    expect(group.get('children')[0].attr('stroke')).to.equal('#ccc');
    node.destroy();
    expect(node.destroyed).to.be.true;
  });
  it('node type', () => {
    let node = new Node({ x: 0, y: 0, id: 'a', type: 'rect', label: 'text ' }, new G.Group());
    let shapes = node.get('group').get('children');
    expect(shapes.length).to.equal(2);
    expect(shapes[0].type).to.equal('rect');
    expect(shapes[1].type).to.equal('text');
    node.destroy();
    node = new Node({ x: 0, y: 0, id: 'b', href: 'https://img.alicdn.com/tfs/TB1_uT8a5ERMeJjSspiXXbZLFXa-143-59.png', type: 'image' }, new G.Group());
    shapes = node.get('group').get('children');
    expect(shapes.length).to.equal(1);
    expect(shapes[0].type).to.equal('image');
  });
  it('node update attrs', () => {
    const node = new Node({ x: 0, y: 0, id: 'a', type: 'rect', label: 'text', color: '#ccc' }, new G.Group());
    const shape = node.get('keyShape');
    const label = node.get('group').get('children')[1];
    expect(shape.type).to.equal('rect');
    expect(shape.attr('stroke')).to.equal('#ccc');
    expect(label.attr('text')).to.equal('text');
    node._update({ color: '#666', label: 'update' });
    expect(shape.type).to.equal('rect');
    expect(shape.attr('stroke')).to.equal('#666');
    expect(label.attr('text')).to.equal('update');
  });
  it('node update type', () => {
    const node = new Node({ x: 0, y: 0, id: 'a', type: 'rect', label: 'text', color: '#ccc' }, new G.Group());
    const shape = node.get('keyShape');
    expect(shape.type).to.equal('rect');
    node._update({ type: 'circle' });
    expect(shape.get('destroyed')).to.be.true;
    expect(node.get('keyShape').type).to.equal('circle');
  });
  it('node set state', () => {
    const node = new Node({ x: 0, y: 0, id: 'a', type: 'rect', label: 'text', color: '#1890ff' }, new G.Group());
    const shape = node.get('keyShape');
    expect(shape.attr('stroke')).to.equal('#1890ff');
    expect(shape.attr('fillOpacity')).to.equal(1);
    node._setState('active', true);
    expect(shape.attr('fillOpacity')).to.equal(0.8);
    expect(node.getStates().length).to.equal(1);
    expect(node.getStates()[0]).to.equal('active');
    node._setState('active', false);
    expect(shape.attr('fillOpacity')).to.equal(1);
    expect(node.getStates().length).to.equal(0);
  });
});

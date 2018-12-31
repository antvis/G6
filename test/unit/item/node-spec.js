const expect = require('chai').expect;
const G = require('@antv/g');
const Node = require('../../../src/item/node');

const div = document.createElement('div');
div.id = 'node-spec';
document.body.appendChild(div);

describe('node', () => {
  it('new node and destroy', () => {
    const group = new G.Group();
    const node = new Node({
      model: {
        x: 100,
        y: 100,
        shape: 'circle'
      },
      group,
      id: 'a'
    });
    expect(node.get('type')).eql('node');
    const shape = group.get('children')[0];
    expect(shape.attr('x')).eql(0);
    expect(group.attr('matrix')[6]).eql(100);
    expect(group.getCount()).eql(1);
    node.destroy();
    expect(node.destroyed).eql(true);
  });

  it('node with label', () => {
    const group = new G.Group();
    let node = new Node({
      model: {
        x: 5,
        y: 5,
        shape: 'rect',
        label: 'ni hao'
      },
      group
    });
    let shapes = node.get('group').get('children');
    expect(shapes.length).to.equal(2);
    expect(shapes[0].type).to.equal('rect');
    expect(shapes[1].type).to.equal('text');
    node.destroy();
    node = new Node({
      model: { x: 0, y: 0, id: 'b', img: 'https://img.alicdn.com/tfs/TB1_uT8a5ERMeJjSspiXXbZLFXa-143-59.png', shape: 'image' },
      group: new G.Group()
    });
    shapes = node.get('group').get('children');
    expect(shapes.length).to.equal(1);
    expect(shapes[0].type).to.equal('image');
    node.destroy();
  });
  it('node update', () => {
    const group = new G.Group();
    const node = new Node({
      model: {
        x: 5,
        y: 5,
        size: [ 40, 20 ],
        shape: 'rect',
        label: 'ni hao'
      },
      group
    });
    const shape = group.get('children')[0];
    expect(shape.attr('x')).eql(-20);
    expect(group.attr('matrix')[6]).eql(5);

    node.update({ x: 6, y: 10, size: [ 20, 20 ] });
    expect(group.attr('matrix')[6]).eql(6);
    expect(group.attr('matrix')[7]).eql(10);
    expect(shape.attr('x')).eql(-10);
  });

  it('node update, change shape', () => {
    const group = new G.Group();
    const node = new Node({
      model: {
        x: 100,
        y: 100,
        size: [ 20, 40 ],
        shape: 'rect',
        label: 'ni hao'
      },
      group
    });
    const shape = node.get('keyShape');
    expect(shape.get('type')).eql('rect');
    expect(shape.attr('width')).eql(20);
    expect(group.attr('matrix')[6]).eql(100);
    node.update({ shape: 'circle', size: 10, x: 50 });
    const newShape = node.get('keyShape');
    expect(shape.get('destroyed')).eql(true);
    expect(newShape.get('type')).eql('circle');
    expect(newShape.attr('r')).eql(5);
    expect(group.attr('matrix')[6]).eql(50);
  });

  it('init states', () => {
    const group = new G.Group();
    const node = new Node({
      model: {
        x: 100,
        y: 100,
        size: [ 20, 40 ],
        shape: 'rect',
        label: 'ni hao'
      },
      group,
      states: [ 'active' ]
    });
    let shape = node.get('keyShape');
    expect(shape.attr('fillOpacity')).eql(0.8);

    node.setState('active', false);
    expect(shape.attr('fillOpacity')).eql(1);

    node.setState('active', true);
    expect(shape.attr('fillOpacity')).eql(0.8);

    // update
    node.update({ x: 10, y: 10 });
    expect(shape.attr('fillOpacity')).eql(0.8);
    // 切换 shape ，图形会重绘，状态会保留
    node.update({ shape: 'circle' });
    shape = node.get('keyShape');
    expect(shape.attr('fillOpacity')).eql(0.8);
  });

});

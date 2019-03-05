const expect = require('chai').expect;
const G = require('@antv/g/lib');
const Node = require('../../../src/item/node');
const Shape = require('../../../src/shape/');
const div = document.createElement('div');
div.id = 'node-spec';
document.body.appendChild(div);

function snap(x1, x2) {
  return Math.abs(x1 - x2) <= 0.5;
}

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

  it('update with state', () => {
    Shape.registerNode('custom-rect', {
      setState(name, value, node) {
        // const group = node.getContainer();
        const shape = node.get('keyShape');
        if (name === 'selected') {
          if (value) {
            shape.attr('fill', 'red');
          } else {
            shape.attr('fill', 'white');
          }
        }
      }
    }, 'rect');
    const group = new G.Group();
    const node = new Node({
      model: {
        x: 100,
        y: 100,
        size: [ 20, 40 ],
        shape: 'custom-rect',
        label: 'ni hao'
      },
      group,
      states: [ 'active' ]
    });
    const shape = node.get('keyShape');
    expect(shape.attr('fill')).eql('#fff');
    node.setState('selected', true);
    expect(shape.attr('fill')).eql('red');
    node.update({ x: 10 });
    expect(shape.attr('fill')).eql('red');
    node.update({ size: [ 20, 30 ] });
    expect(shape.attr('fill')).eql('red');
    node.setState('selected', false);
    expect(shape.attr('fill')).eql('white');
  });

  it('get link point, without anchor', () => {
    const group = new G.Group();
    const node = new Node({
      model: {
        x: 100,
        y: 100,
        size: [ 20, 20 ],
        shape: 'rect'
      },
      group
    });
    const point = node.getLinkPoint({ x: 0, y: 0 });
    expect(snap(point.x, 90)).eql(true);
    expect(snap(point.y, 90)).eql(true);

    const point1 = node.getLinkPoint({ x: 100, y: 0 });
    expect(snap(point1.x, 100)).eql(true);
    expect(snap(point1.y, 90)).eql(true);
  });
  it('getLinkPointByAnchor', () => {
    const group = new G.Group();
    const node = new Node({
      model: {
        x: 100,
        y: 100,
        size: [ 20, 20 ],
        shape: 'rect',
        anchorPoints: [
          [ 0.5, 0 ], [ 1, 0.5 ], [ 0.5, 1 ], [ 0, 0.5 ]
        ]
      },
      group
    });
    const point = node.getLinkPointByAnchor(0);
    expect(snap(point.x, 100)).eql(true);
    expect(snap(point.y, 90)).eql(true);

    const point1 = node.getLinkPointByAnchor(1);
    expect(snap(point1.x, 110)).eql(true);
    expect(snap(point1.y, 100)).eql(true);
  });
  it('get snap point', () => {
    const group = new G.Group();
    const node = new Node({
      model: {
        x: 100,
        y: 100,
        size: [ 20, 20 ],
        shape: 'rect',
        anchorPoints: [
          [ 0.5, 0 ], [ 1, 0.5 ], [ 0.5, 1 ], [ 0, 0.5 ]
        ]
      },
      group
    });

    const point = node.getLinkPoint({ x: 1, y: 0 });
    expect(snap(point.x, 100)).eql(true);
    expect(snap(point.y, 90)).eql(true);

    const point1 = node.getLinkPoint({ x: 200, y: 10 });
    expect(snap(point1.x, 110)).eql(true);
    expect(snap(point1.y, 100)).eql(true);
  });

  it('only move', () => {
    const group = new G.Group();
    const node = new Node({
      model: {
        x: 100,
        y: 100,
        size: [ 20, 20 ],
        shape: 'rect',
        anchorPoints: [
          [ 0.5, 0 ], [ 1, 0.5 ], [ 0.5, 1 ], [ 0, 0.5 ]
        ]
      },
      group
    });
    expect(node.get('model').x).eql(100);
    expect(node.get('model').y).eql(100);

    node.update({ x: 200 });
    expect(node.get('model').x).eql(200);
    expect(node.get('model').y).eql(100);

    node.update({ y: 200 });
    expect(node.get('model').x).eql(200);
    expect(node.get('model').y).eql(200);
  });

  it('register shape only draw', () => {
    Shape.registerNode('my-node-test', {
      draw(cfg, group) {
        const shape = group.addShape('circle', {
          attrs: {
            x: 0,
            y: 0,
            r: cfg.size
          }
        });
        return shape;
      }
    });

    const group = new G.Group();
    const node = new Node({
      model: {
        x: 100,
        y: 100,
        size: 10,
        shape: 'my-node-test'
      },
      group
    });

    const shape = node.get('keyShape');
    expect(!!shape.get('destroyed')).eql(false);

    node.update({ x: 0, y: 20 });
    expect(!!shape.get('destroyed')).eql(false);

    node.update({ size: 20 });
    expect(shape.get('destroyed')).eql(true);
    expect(shape).not.eql(node.get('keyShape'));
    Shape.Node['my-node-test'] = null;
  });
  it('update position', () => {
    const group = new G.Group();
    const node = new Node({
      model: {
        x: 100,
        y: 100,
        size: [ 10, 10 ],
        shape: 'rect'
      },
      group
    });
    let bbox = node.getBBox();
    expect(bbox.minX).to.equal(94.5);
    expect(bbox.minY).to.equal(94.5);
    expect(bbox.maxX).to.equal(105.5);
    expect(bbox.maxY).to.equal(105.5);
    node.updatePosition({ x: 150, y: 150 });
    bbox = node.getBBox();
    expect(bbox.minX).to.equal(144.5);
    expect(bbox.minY).to.equal(144.5);
    expect(bbox.maxX).to.equal(155.5);
    expect(bbox.maxY).to.equal(155.5);
  });
});

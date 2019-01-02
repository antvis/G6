const expect = require('chai').expect;
const G = require('@antv/g');
const Node = require('../../../src/item/node');
const Edge = require('../../../src/item/edge');

const div = document.createElement('div');
div.id = 'edge-spec';
document.body.appendChild(div);

const canvas = new G.Canvas({
  containerId: 'edge-spec',
  width: 600,
  height: 600
});

describe('edge test', () => {
  const aNode = new Node({
    model: {
      id: 'a',
      x: 100,
      y: 100,
      shape: 'circle'
    },
    group: canvas.addGroup()
  });

  const bNode = new Node({
    model: {
      id: 'b',
      x: 200,
      y: 200,
      shape: 'circle'
    },
    group: canvas.addGroup()
  });

  const cNode = new Node({
    model: {
      id: 'c',
      x: 300,
      y: 200,
      shape: 'circle'
    },
    group: canvas.addGroup()
  });
  let edge;
  it('init', () => {
    const group = canvas.addGroup();
    edge = new Edge({
      model: {

      },
      source: aNode,
      target: bNode,
      group
    });

    expect(group.getCount()).eql(1);
    canvas.draw();
  });

  it('get model', () => {
    const model = edge.getModel();
    expect(model.source).eql('a');
    expect(model.target).eql('b');
  });

  it('node edges', () => {
    expect(aNode.getEdges().length).eql(1);
    expect(aNode.getEdges()[0]).eql(edge);
    expect(bNode.getEdges().length).eql(1);
    const outEdges = aNode.getOutEdges();
    expect(outEdges.length).eql(1);
    expect(bNode.getOutEdges().length).eql(0);
    expect(aNode.getInEdges().length).eql(0);
    expect(bNode.getInEdges().length).eql(1);
  });

  it('update', () => {
    edge.update({
      color: 'red'
    });
    const shape = edge.get('keyShape');
    expect(shape.attr('stroke')).eql('red');
  });

  it('move node nad refresh', () => {
    const shape = edge.get('keyShape');
    const intersectPoint = aNode.getLinkPoint(bNode.getModel());
    expect(shape.attr('path')[0]).eqls([ 'M', intersectPoint.x, intersectPoint.y ]);
    aNode.update({
      x: 150,
      y: 100
    });
    edge.refresh();

    const intersectPoint1 = aNode.getLinkPoint(bNode.getModel());
    expect(shape.attr('path')[0]).eqls([ 'M', intersectPoint1.x, intersectPoint1.y ]);
    expect(intersectPoint).not.eqls(intersectPoint1);
    canvas.draw();
  });

  it('change source', () => {
    const shape = edge.get('keyShape');
    const intersectPoint = aNode.getLinkPoint(bNode.getModel());
    expect(shape.attr('path')[0]).eqls([ 'M', intersectPoint.x, intersectPoint.y ]);
    edge.setSource(cNode);
    edge.refresh();
    const intersectPoint1 = cNode.getLinkPoint(bNode.getModel());
    expect(shape.attr('path')[0]).eqls([ 'M', intersectPoint1.x, intersectPoint1.y ]);
    expect(intersectPoint).not.eqls(intersectPoint1);

    expect(aNode.getEdges().length).eql(0);
    expect(cNode.getEdges().length).eql(1);
    canvas.draw();
  });

  it('change target', () => {
    const shape = edge.get('keyShape');
    const intersectPoint = bNode.getLinkPoint(cNode.getModel());
    expect(shape.attr('path')[1]).eqls([ 'L', intersectPoint.x, intersectPoint.y ]);
    edge.setTarget(aNode);
    edge.refresh();
    const intersectPoint1 = aNode.getLinkPoint(cNode.getModel());
    expect(shape.attr('path')[1]).eqls([ 'L', intersectPoint1.x, intersectPoint1.y ]);
    expect(intersectPoint).not.eqls(intersectPoint1);

    expect(bNode.getEdges().length).eql(0);
    expect(aNode.getEdges().length).eql(1);

  });

  it('set source and target to plain objects', () => {
    const shape = edge.get('keyShape');
    const point1 = { x: 50, y: 50 };
    const point2 = { x: 150, y: 150 };
    edge.setSource(point1);
    edge.refresh();
    expect(shape.attr('path')[0]).eqls([ 'M', point1.x, point1.y ]);

    edge.setTarget(point2);
    edge.refresh();
    expect(shape.attr('path')[1]).eqls([ 'L', point2.x, point2.y ]);
    canvas.draw();

  });

  it('states', () => {
    const shape = edge.get('keyShape');
    expect(shape.attr('strokeOpacity')).eql(1);
    edge.setState('active', true);
    expect(shape.attr('strokeOpacity')).eql(0.8);

    edge.setState('active', false);
    expect(shape.attr('strokeOpacity')).eql(1);
  });

  it('destroy', () => {
    edge.setSource(aNode);
    edge.setTarget(bNode);
    expect(aNode.getEdges().length).eql(1);
    expect(bNode.getEdges().length).eql(1);

    const group = edge.get('group');
    edge.destroy();
    expect(aNode.getEdges().length).eql(0);
    expect(bNode.getEdges().length).eql(0);
    expect(group.get('destroyed')).eql(true);

  });
});

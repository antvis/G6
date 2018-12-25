const expect = require('chai').expect;
const G6 = require('../../../src');
const Node = require('../../../src/item/node');

const div = document.createElement('div');
div.id = 'item-spec';
document.body.appendChild(div);

describe('node', () => {
  const graph = new G6.Graph({
    container: div,
    width: 500,
    height: 500,
    pixelRatio: 2
  });
  it('new & destroy node', () => {
    const node = new Node({ graph, x: 0, y: 0, id: 'a', color: '#ccc' });
    const group = node.get('group');
    expect(node).not.to.be.undefined;
    expect(node.getType()).to.equal('node');
    expect(node.getNeighbors().length).to.equal(0);
    expect(node.get('shapeObj')).not.to.be.undefined;
    expect(group).not.to.be.undefined;
    expect(group.get('children').length).to.equal(1);
    expect(group.get('children')[0].type).to.equal('circle');
    expect(group.get('children')[0].attr('stroke')).to.equal('#ccc');
    node.destroy();
    expect(node.destroyed).to.be.true;
  });
  it('neighbor', () => {
    const src = new Node({ graph, x: 0, y: 0, id: 'a', color: '#ccc' });
    const target = new Node({ graph, x: 50, y: 50, id: 'b', color: '#333' });
    src.addNeighbor(target);
    expect(src.getNeighbors().length).to.equal(1);
    expect(src.getNeighbors()[0]).to.equal(target);
    expect(src.getEdges().length).to.equal(0);
  });
  it('node type', () => {
    let node = new Node({ graph, x: 0, y: 0, id: 'a', type: 'rect', label: 'text ' });
    let shapes = node.get('group').get('children');
    expect(shapes.length).to.equal(2);
    expect(shapes[0].type).to.equal('rect');
    expect(shapes[1].type).to.equal('text');
    node.destroy();
    node = new Node({ graph, x: 0, y: 0, id: 'b', href: 'https://img.alicdn.com/tfs/TB1_uT8a5ERMeJjSspiXXbZLFXa-143-59.png', type: 'image' });
    shapes = node.get('group').get('children');
    expect(shapes.length).to.equal(1);
    expect(shapes[0].type).to.equal('image');
  });
});

const expect = require('chai').expect;
const G6 = require('../../../src');
// const Util = require('../../../src/util');

const div = document.createElement('div');
div.id = 'graph-spec';
document.body.appendChild(div);

describe('graph', () => {
  const graph = new G6.Graph({
    container: div,
    width: 500,
    height: 500,
    pixelRatio: 2
  });
  it('new & destroy graph', () => {
    const inst = new G6.Graph({
      container: div,
      width: 500,
      height: 500
    });
    const length = div.childNodes.length;
    expect(inst).not.to.be.undefined;
    expect(inst).to.be.an.instanceof(G6.Graph);
    expect(length > 1).to.be.true;
    expect(inst.get('canvas')).not.to.be.undefined;
    expect(inst.get('group')).not.to.be.undefined;
    expect(inst.get('group').get('className')).to.equal('root-container');
    expect(inst.get('group').get('id').endsWith('-root')).to.be.true;
    const children = inst.get('group').get('children');
    expect(children.length).to.equal(2);
    expect(children[1].get('className')).to.equal('node-container');
    expect(children[0].get('className')).to.equal('edge-container');
    inst.destroy();
    expect(inst.get('canvas').destroyed);
    expect(length - div.childNodes.length).to.equal(1);
  });

  const canvasMatrix = graph.get('canvas').getMatrix();
  it('translate', () => {
    graph.translate(100, 100);
    const matrix = graph.get('group').getMatrix();
    expect(canvasMatrix[6]).to.equal(0);
    expect(canvasMatrix[7]).to.equal(0);
    expect(matrix[6]).to.equal(100);
    expect(matrix[7]).to.equal(100);
    graph.get('group').resetMatrix();
  });
  it('zoom', () => {
    expect(canvasMatrix[0]).to.equal(2);
    expect(canvasMatrix[0]).to.equal(2);
    graph.zoom(3, { x: 100, y: 100 });
    expect(canvasMatrix[0]).to.equal(2);
    expect(canvasMatrix[0]).to.equal(2);
    const matrix = graph.get('group').getMatrix();
    expect(matrix[0]).to.equal(3);
    expect(matrix[4]).to.equal(3);
    expect(graph.getZoom()).to.equal(3);
    graph.get('group').resetMatrix();
  });
  it('change size', () => {
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500
    });
    expect(typeof graph.changeSize).to.equal('function');
    graph.changeSize(300, 300);
    expect(graph.get('width')).to.equal(300);
    expect(graph.get('height')).to.equal(300);
    graph.destroy();
  });
  it('data & changeData & save', () => {
    const data = {
      nodes: [{
        id: 'a',
        shape: 'circle',
        color: '#333',
        x: 30,
        y: 30,
        size: 20,
        label: 'a'
      }, {
        id: 'b',
        shape: 'ellipse',
        color: '#666',
        x: 50,
        y: 60,
        size: [ 30, 40 ],
        label: 'b'
      }, {
        id: 'c',
        shape: 'rect',
        color: '#999',
        x: 100,
        y: 70,
        size: 20,
        label: 'c'
      }],
      edges: [{
        source: 'a',
        target: 'b',
        id: 'd'
      }, {
        source: 'a',
        target: 'c',
        id: 'e'
      }]
    };
    graph.data(data);
    graph.render();
    expect(graph.get('nodes').length).to.equal(3);
    expect(graph.get('edges').length).to.equal(2);
    let map = graph.get('itemMap');
    expect(map.a).not.to.be.undefined;
    expect(map.b).not.to.be.undefined;
    expect(map.c).not.to.be.undefined;
    expect(map.d).not.to.be.undefined;
    expect(map.e).not.to.be.undefined;
    data.nodes.splice(0, 1);
    data.edges.splice(0, 1);
    data.edges[0].source = 'b';
    data.nodes.push({
      id: 'f',
      shape: 'circle',
      color: '#333',
      x: 100,
      y: 80,
      size: 30,
      label: 'f'
    });
    graph.changeData(data);
    map = graph.get('itemMap');
    expect(graph.get('nodes').length).to.equal(3);
    expect(graph.get('edges').length).to.equal(1);
    expect(map.a).to.be.undefined;
    expect(map.b).not.to.be.undefined;
    expect(map.c).not.to.be.undefined;
    expect(map.d).to.be.undefined;
    expect(map.e).not.to.be.undefined;
    expect(map.f).not.to.be.undefined;
    const exported = graph.save();
    expect(exported.nodes.length).to.equal(3);
    expect(exported.edges.length).to.equal(1);
    const edge = exported.edges[0];
    expect(edge.id).to.equal('e');
    expect(edge.source).to.equal('b');
    expect(edge.target).to.equal('c');
  });
  it('find', () => {
    graph.clear();
    graph.addItem('node', { id: 'node', x: 50, y: 100, size: 50, className: 'test test2' });
    const node = graph.addItem('node', { id: 'node2', x: 100, y: 100, size: 50, className: 'test' });
    const findNode = graph.find('node', node => {
      return node.get('model').x === 100;
    });
    expect(findNode).not.to.be.undefined;
    expect(findNode).to.equal(node);
  });
  it('findAll', () => {
    graph.clear();
    const node1 = graph.addItem('node', { id: 'node', x: 100, y: 100, size: 50, className: 'test test2' });
    const node2 = graph.addItem('node', { id: 'node2', x: 100, y: 100, size: 50, className: 'test' });
    const node3 = graph.addItem('node', { id: 'node2', x: 100, y: 100, size: 50 });
    node1.setState('active', true);
    node2.setState('selected', true);
    node3.setState('active', true);
    let nodes = graph.findAllByState('node', 'active');
    expect(nodes.length).to.equal(2);
    expect(nodes[0]).to.equal(node1);
    expect(nodes[1]).to.equal(node3);
    nodes = graph.findAllByState('node', 'selected');
    expect(nodes.length).to.equal(1);
    expect(nodes[0]).to.equal(node2);
  });
  it('refresh positions', () => {
    const data = { id: 'node', x: 100, y: 50, size: 50, className: 'test test2' };
    const node = graph.addItem('node', data);
    const group = node.get('group');
    expect(group.getMatrix()[6]).to.equal(100);
    expect(group.getMatrix()[7]).to.equal(50);
    data.x = 50;
    data.y = 100;
    graph.refreshPositions();
    expect(group.getMatrix()[6]).to.equal(50);
    expect(group.getMatrix()[7]).to.equal(100);
  });
  it('canvas point & model point convert', () => {
    const group = graph.get('group');
    let point = graph.getPointByCanvas(100, 100);
    expect(point.x).to.equal(100);
    expect(point.y).to.equal(100);
    group.translate(100, 100);
    point = graph.getPointByCanvas(100, 100);
    expect(point.x).to.equal(0);
    expect(point.y).to.equal(0);
    group.scale(1.5, 1.5);
    point = graph.getPointByCanvas(100, 100);
    expect(parseInt(point.x), 10).to.equal(-33);
    expect(parseInt(point.y), 10).to.equal(-33);
    group.resetMatrix();
    point = graph.getCanvasByPoint(100, 100);
    expect(point.x).to.equal(100);
    expect(point.y).to.equal(100);
    group.translate(100, 100);
    point = graph.getCanvasByPoint(0, 0);
    expect(point.x).to.equal(100);
    expect(point.y).to.equal(100);
    group.resetMatrix();
  });
  it('client point & model point convert', () => {
    const group = graph.get('group');
    const bbox = graph.get('canvas').get('el').getBoundingClientRect();
    let point = graph.getPointByClient(bbox.left + 100, bbox.top + 100);
    expect(point.x).to.equal(100);
    expect(point.y).to.equal(100);
    group.translate(100, 100);
    point = graph.getPointByClient(bbox.left + 100, bbox.top + 100);
    expect(point.x).to.equal(0);
    expect(point.y).to.equal(0);
    group.scale(1.5, 1.5);
    point = graph.getPointByClient(bbox.left + 100, bbox.top + 100);
    expect(parseInt(point.x), 10).to.equal(-33);
    expect(parseInt(point.y), 10).to.equal(-33);
    group.resetMatrix();
    point = graph.getClientByPoint(100, 100);
    expect(point.x).to.equal(bbox.left + 100);
    expect(point.y).to.equal(bbox.top + 100);
    group.translate(100, 100);
    point = graph.getClientByPoint(100, 100);
    expect(point.x).to.equal(bbox.left + 200);
    expect(point.y).to.equal(bbox.top + 200);
  });
});

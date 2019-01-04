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
    expect(inst.canvas.destroyed);
    expect(length - div.childNodes.length).to.equal(1);
  });

  const canvasMatrix = graph.canvas.getMatrix();
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
  it('add node', () => {
    const node = graph.addItem('node', { shape: 'circle', color: '#ccc', style: { x: 50, y: 50, r: 20, lineWidth: 2 } });
    expect(node).not.to.be.undefined;
    const nodes = graph.get('nodes');
    expect(nodes.length).to.equal(1);
    expect(nodes[0]).to.equal(node);
    const node2 = graph.addItem('node', { shape: 'rect', id: 'node', color: '#666', style: { x: 100, y: 100, width: 100, height: 70 } });
    expect(node2).not.to.be.undefined;
    expect(nodes.length).to.equal(2);
    expect(nodes[1]).to.equal(node2);
    graph.removeItem(node);
    expect(nodes.length).to.equal(1);
    expect(nodes[0]).to.equal(node2);
    graph.removeItem(node2);
    expect(nodes.length).to.equal(0);
  });
  it('add edge', () => {
    const node1 = graph.addItem('node', { shape: 'circle', color: '#ccc', x: 50, y: 50, size: 20, style: { lineWidth: 2 } });
    const node2 = graph.addItem('node', { shape: 'rect', id: 'node', x: 100, y: 100, color: '#666', size: [ 100, 70 ] });
    const edge = graph.addItem('edge', { id: 'edge', source: node1, target: node2 });
    expect(graph.get('edges').length).to.equal(1);
    expect(graph.get('edges')[0]).to.equal(edge);
    expect(Object.keys(graph.get('itemById')).length).to.equal(3);
    expect(graph.get('itemById').edge).to.equal(edge);
    expect(node1.getEdges().length).to.equal(1);
    expect(node2.getEdges().length).to.equal(1);
    graph.removeItem(edge);
    expect(graph.get('edges').length).to.equal(0);
  });
  it('data & changeData', () => {
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
    const map = graph.get('itemById');
    expect(map.a).not.to.be.undefined;
    expect(map.b).not.to.be.undefined;
    expect(map.c).not.to.be.undefined;
    expect(map.d).not.to.be.undefined;
    expect(map.e).not.to.be.undefined;
    data.nodes.splice(0, 1);
    data.edges.splice(0, 1);
    data.edges[0].source = 'b';
    graph.changeData(data);
    expect(graph.get('nodes').length).to.equal(2);
    expect(graph.get('edges').length).to.equal(1);
    expect(map.a).to.be.undefined;
    expect(map.b).not.to.be.undefined;
    expect(map.c).not.to.be.undefined;
    expect(map.d).to.be.undefined;
    expect(map.e).not.to.be.undefined;
  });
  it('fresh graph', () => {
    graph.clear();
    const node = graph.addItem('node', { id: 'node', x: 100, y: 100, size: 50 });
    const node2 = graph.addItem('node', { id: 'node2', x: 100, y: 200, size: 50 });
    const node3 = graph.addItem('node', { id: 'node3', x: 300, y: 100, size: 50 });
    const edge = graph.addItem('edge', { id: 'edge', source: node, target: node2 });
    graph.paint();
    let path = edge.get('keyShape').attr('path');
    expect(path[0][1]).to.equal(100);
    expect(path[0][2]).to.equal(125.5);
    expect(path[1][1]).to.equal(100);
    expect(path[1][2]).to.equal(174.5);
    edge.setTarget(node3);
    graph.refresh();
    path = edge.get('keyShape').attr('path');
    expect(path[0][1]).to.equal(125.5);
    expect(path[0][2]).to.equal(100);
    expect(path[1][1]).to.equal(274.5);
    expect(path[1][2]).to.equal(100);
  });
  it('show & hide item', () => {
    const node = graph.addItem('node', { id: 'node', x: 100, y: 100, size: 50 });
    const node2 = graph.addItem('node', { id: 'node2', x: 100, y: 100, size: 50 });
    const edge = graph.addItem('edge', { id: 'edge', source: node, target: node2 });
    graph.hideItem('node');
    expect(node.isVisible()).to.be.false;
    expect(edge.isVisible()).to.be.false;
    graph.showItem(node);
    expect(node.isVisible()).to.be.true;
    expect(edge.isVisible()).to.be.true;
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
});

const expect = require('chai').expect;
const G6 = require('../../../src');
const Util = require('../../../src/util');

const div = document.createElement('div');
div.id = 'graph-spec';
document.body.appendChild(div);

describe.only('graph', () => {
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
    const node = graph.addNode({ type: 'circle', color: '#ccc', style: { x: 50, y: 50, r: 20, lineWidth: 2} });
    expect(node).not.to.be.undefined;
    expect(graph.nodes.length).to.equal(1);
    expect(graph.nodes[0]).to.equal(node);
    const node2 = graph.addNode({ type: 'rect', id: 'node', color: '#666', style: { x: 100, y: 100, width: 100, height: 70 } });
    expect(node2).not.to.be.undefined;
    expect(graph.nodes.length).to.equal(2);
    expect(graph.nodes[1]).to.equal(node2);
    graph.removeNode(node);
    expect(graph.nodes.length).to.equal(1);
    expect(graph.nodes[0]).to.equal(node2);
    graph.removeNode('node');
    expect(graph.nodes.length).to.equal(0);
  });
  it('add edge', () => {
    // TODO
  });
});

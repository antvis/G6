const expect = require('chai').expect;
const G6 = require('../../../src');
const Minimap = require('../../../src/plugins/minimap');
const Simulate = require('event-simulate');
const div = document.createElement('div');
div.id = 'minimap';
document.body.appendChild(div);

describe('minimap', () => {
  const graph = new G6.Graph({
    container: div,
    width: 500,
    height: 500,
    modes: {
      default: [{
        type: 'drag-node',
        delegate: false
      }, 'zoom-canvas', 'click-select', 'drag-canvas' ]
    },
    pixelRatio: 2
  });
  graph.addItem('node', { id: 'node', label: 'text', x: 50, y: 50 });
  it('minimap with default settings & destroy', () => {
    const minimap = new Minimap({ graph, size: [ 200, 200 ] });
    const canvas = minimap.getCanvas();
    expect(canvas).not.to.be.undefined;
    expect(canvas.get('width')).to.equal(200);
    expect(canvas.get('height')).to.equal(200);
    const viewport = minimap.getViewport();
    expect(viewport).not.to.be.undefined;
    expect(viewport.className.indexOf('g6-minimap-viewport') >= 0).to.be.true;
    expect(viewport.style.left).to.equal('0px');
    expect(viewport.style.top).to.equal('0px');
    expect(viewport.style.width).to.equal('200px');
    expect(viewport.style.height).to.equal('200px');
    // 缩小的时候，viewport已经最大了，不会更大
    graph.zoom(0.5, { x: 250, y: 250 });
    expect(viewport.style.left).to.equal('0px');
    expect(viewport.style.top).to.equal('0px');
    expect(viewport.style.width).to.equal('200px');
    expect(viewport.style.height).to.equal('200px');
    graph.zoom(2.5, { x: 250, y: 250 });
    expect(viewport.style.left).to.equal('20px');
    expect(viewport.style.top).to.equal('20px');
    expect(viewport.style.width).to.equal('160px');
    expect(viewport.style.height).to.equal('160px');
    minimap.destroy();
    const container = div.childNodes[1];
    expect(container.innerHTML).to.equal('');
    graph.zoom(2.5, { x: 250, y: 250 });
    expect(viewport.style.left).to.equal('20px');
    expect(viewport.style.top).to.equal('20px');
    expect(viewport.style.width).to.equal('160px');
    expect(viewport.style.height).to.equal('160px');
  });
  it('move viewport', done => {
    graph.get('group').resetMatrix();
    const minimap = new Minimap({ graph, size: [ 200, 200 ] });
    const viewport = minimap.getViewport();
    const canvas = minimap.getCanvas();
    graph.zoom(2, { x: 250, y: 250 });
    graph.translate(100, 100);
    expect(viewport.style.left).to.equal('30px');
    expect(viewport.style.top).to.equal('30px');
    expect(viewport.style.width).to.equal('100px');
    expect(viewport.style.height).to.equal('100px');
    const container = canvas.get('containerDOM');
    Simulate.simulate(viewport, 'mousedown', {
      clientX: 100,
      clientY: 100,
      target: viewport
    });
    Simulate.simulate(container, 'mousemove', {
      clientX: 120,
      clientY: 120
    });
    setTimeout(() => {
      expect(viewport.style.left).to.equal('50px');
      expect(viewport.style.top).to.equal('50px');
      expect(viewport.style.width).to.equal('100px');
      expect(viewport.style.height).to.equal('100px');
      const matrix = graph.get('group').getMatrix();
      expect(matrix[0]).to.equal(2);
      expect(matrix[4]).to.equal(2);
      expect(matrix[6]).to.equal(-250);
      expect(matrix[7]).to.equal(-250);
      done();
    }, 50);
  });
});

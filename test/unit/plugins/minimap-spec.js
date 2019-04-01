const expect = require('chai').expect;
const G6 = require('../../../src');
const Minimap = require('../../../plugins/minimap');
const Simulate = require('event-simulate');
const div = document.createElement('div');
div.id = 'minimap';
document.body.appendChild(div);
const container = document.createElement('div');
div.appendChild(container);

describe('minimap', () => {
  const minimap = new Minimap({ size: [ 200, 200 ] });
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
    pixelRatio: 2,
    plugins: [ minimap ]
  });
  graph.addItem('node', { id: 'node1', label: 'text1', x: 50, y: 50 });
  graph.addItem('node', { id: 'node2', label: 'text2', x: 120, y: 150 });
  graph.addItem('edge', { id: 'edge1', source: 'node1', target: 'node2' });
  it('minimap with default settings & destroy', () => {
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
    minimap.destroyPlugin();
    const container = div.childNodes[1];
    expect(container.innerHTML).to.equal('');
    graph.zoom(2.5, { x: 250, y: 250 });
    expect(viewport.style.left).to.equal('20px');
    expect(viewport.style.top).to.equal('20px');
    expect(viewport.style.width).to.equal('160px');
    expect(viewport.style.height).to.equal('160px');
  });
  xit('move viewport', done => {
    const minimap = new Minimap({ size: [ 200, 200 ] });
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      plugins: [ minimap ]
    });
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
    Simulate.simulate(container, 'mouseup', {
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
      Simulate.simulate(viewport, 'mousedown', {
        clientX: 200,
        clientY: 200,
        target: viewport
      });
      Simulate.simulate(container, 'mousemove', {
        clientX: 0,
        clientY: 0
      });
      setTimeout(() => {
        expect(viewport.style.left).to.equal('0px');
        expect(viewport.style.top).to.equal('0px');
        expect(viewport.style.width).to.equal('100px');
        expect(viewport.style.height).to.equal('100px');
        const matrix = graph.get('group').getMatrix();
        expect(matrix[0]).to.equal(2);
        expect(matrix[4]).to.equal(2);
        expect(matrix[6]).to.equal(0);
        expect(matrix[7]).to.equal(0);
        graph.destroy();
        done();
      }, 50);
    }, 50);
  });
  it('delegate type of minimap', () => {
    const minimap = new Minimap({ size: [ 200, 200 ], type: 'delegate', delegateStyle: { fill: '#fff' } });
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      plugins: [ minimap ]
    });
    const nodeBBox = graph.addItem('node', { id: 'node', x: 100, y: 100, size: 16 }).getBBox();
    const canvas = minimap.getCanvas();
    const delegateShape = canvas.get('children')[0].get('children')[0];
    expect(delegateShape.attr('x')).to.equal(nodeBBox.minX);
    expect(delegateShape.attr('y')).to.equal(nodeBBox.minY);
    expect(delegateShape.attr('width')).to.equal(nodeBBox.width);
    expect(delegateShape.attr('height')).to.equal(nodeBBox.height);
    expect(delegateShape.attr('fill')).to.equal('#fff');
    expect(delegateShape.attr('stroke')).to.equal('#096dd9');
    graph.destroy();
  });
  it('minimap container', () => {
    const minimap = new Minimap({ container, size: [ 200, 200 ], className: 'test-className' });
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      plugins: [ minimap ],
      modes: {
        default: [{
          type: 'drag-node',
          delegate: false
        }, 'zoom-canvas', 'click-select', 'drag-canvas' ]
      },
      pixelRatio: 2
    });
    const minimapContainer = container.childNodes[0];
    expect(minimapContainer.childNodes).not.to.be.undefined;
    expect(minimapContainer.className).to.equal('test-className');
    expect(minimapContainer.style.width).to.equal('200px');
    expect(minimapContainer.style.width).to.equal('200px');
    expect(minimapContainer.childNodes[0].tagName).to.equal('DIV');
    expect(minimapContainer.childNodes[0].style.position).to.equal('relative');
    expect(minimapContainer.childNodes[0].childNodes[0]).to.equal(minimap.getCanvas().get('el'));
    graph.destroy();
    expect(container.innerHTML).to.equal('');
  });
  it('canvas minX minY < 0', () => {
    const minimap = new Minimap({ size: [ 200, 200 ] });
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      plugins: [ minimap ]
    });
    graph.addItem('node', { id: 'node1', x: -50, y: -50 });
    const canvas = minimap.getCanvas();
    const matrix = canvas.getMatrix();
    expect(matrix[6] - 56 < 1).to.be.true;
    expect(matrix[7] - 56 < 1).to.be.true;
    graph.destroy();
  });
  it('keyShapeOnly minimap', () => {
    const minimap = new Minimap({ size: [ 200, 200 ], type: 'keyShape' });
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      plugins: [ minimap ]
    });
    graph.addItem('node', { id: 'node1', label: 'text1', x: 50, y: 50 });
    graph.addItem('node', { id: 'node2', label: 'text2', x: 120, y: 150 });
    graph.addItem('edge', { id: 'edge1', source: 'node1', target: 'node2' });
    const canvas = minimap.getCanvas();
    const shapeGroup = canvas.get('children')[0].get('children');
    expect(shapeGroup.length).to.equal(3);
    expect(shapeGroup[0].type).to.equal('path');
    expect(shapeGroup[0].attr('path')).not.to.be.undefined;
    expect(shapeGroup[1].type).to.equal('group');
    expect(shapeGroup[1].getMatrix()[6]).to.equal(50);
    expect(shapeGroup[1].getMatrix()[7]).to.equal(50);
    expect(shapeGroup[1].get('children').length).to.equal(1);
    expect(shapeGroup[1].get('children')[0].type).to.equal('circle');
    expect(shapeGroup[2].type).to.equal('group');
    expect(shapeGroup[2].getMatrix()[6]).to.equal(120);
    expect(shapeGroup[2].getMatrix()[7]).to.equal(150);
    expect(shapeGroup[2].get('children').length).to.equal(1);
    expect(shapeGroup[2].get('children')[0].type).to.equal('circle');
    graph.destroy();
  });
});

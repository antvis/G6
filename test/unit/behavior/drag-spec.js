const expect = require('chai').expect;
const G6 = require('../../../src');

const div = document.createElement('div');
div.id = 'pan-spec';
document.body.appendChild(div);

describe('drag-canvas', () => {
  it('drag canvas', () => {
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [ 'drag-canvas' ]
      },
      pixelRatio: 2
    });
    const matrix = graph.get('group').getMatrix();
    let start = false;
    graph.on('canvas:dragstart', () => { start = true; });
    graph.on('canvas:dragend', () => { start = false; });
    graph.paint();
    graph.emit('canvas:mousedown', { clientX: 150, clientY: 150 });
    graph.emit('canvas:mousemove', { clientX: 200, clientY: 200 });
    expect(start).to.be.true;
    graph.emit('canvas:mousemove', { clientX: 250, clientY: 250 });
    expect(start).to.be.true;
    expect(matrix[6]).to.equal(100);
    expect(matrix[7]).to.equal(100);
    graph.emit('canvas:mouseup', {});
    expect(start).to.be.false;
    graph.destroy();
  });
  it('prevent default drag behavior', () => {
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [{
          type: 'drag-canvas',
          shouldUpdate: () => { return false; }
        }]
      },
      pixelRatio: 2
    });
    const matrix = graph.get('group').getMatrix();
    let start = false;
    graph.on('canvas:dragstart', () => { start = true; });
    graph.on('canvas:dragend', () => { start = false; });
    graph.paint();
    graph.emit('canvas:mousedown', { clientX: 150, clientY: 150 });
    graph.emit('canvas:mousemove', { clientX: 200, clientY: 200 });
    expect(start).to.be.true;
    graph.emit('canvas:mousemove', { clientX: 250, clientY: 250 });
    expect(start).to.be.true;
    expect(matrix[6]).to.equal(0);
    expect(matrix[7]).to.equal(0);
    graph.emit('canvas:mouseup', {});
    expect(start).to.be.false;
    graph.destroy();
  });
  it('unbind event', () => {
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [{
          type: 'drag-canvas',
          shouldUpdate: () => { return false; }
        }],
        custom: []
      },
      pixelRatio: 2
    });
    let triggered = false;
    graph.setMode('custom');
    graph.on('canvas:dragstart', () => { triggered = true; });
    graph.on('canvas:dragend', () => { triggered = true; });
    graph.emit('canvas:mousedown', { clientX: 150, clientY: 150 });
    graph.emit('canvas:mousemove', { clientX: 200, clientY: 200 });
    expect(triggered).to.be.false;
    graph.emit('canvas:mousemove', { clientX: 250, clientY: 250 });
    expect(triggered).to.be.false;
    graph.emit('canvas:mouseup', { clientX: 250, clientY: 250 });
    expect(triggered).to.be.false;
    graph.destroy();
  });
  it('drag with direction restrict', () => {
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [{
          type: 'drag-canvas',
          direction: 'x'
        }]
      },
      pixelRatio: 2
    });
    const matrix = graph.get('group').getMatrix();
    let start = false;
    graph.addItem('node', { x: 100, y: 100, color: '#666', type: 'rect', id: 'test' });
    graph.on('canvas:dragstart', () => { start = true; });
    graph.on('canvas:dragend', () => { start = false; });
    graph.paint();
    graph.emit('canvas:mousedown', { clientX: 150, clientY: 150 });
    graph.emit('canvas:mousemove', { clientX: 200, clientY: 200 });
    expect(start).to.be.true;
    graph.emit('canvas:mousemove', { clientX: 250, clientY: 250 });
    expect(start).to.be.true;
    expect(matrix[6]).to.equal(100);
    expect(matrix[7]).to.equal(0);
    graph.emit('canvas:mouseup', { clientX: 200, clientY: 200 });
    expect(start).to.be.false;
  });
  it('drag offset', () => {
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [{
          type: 'drag-canvas'
        }]
      },
      pixelRatio: 2
    });
    let triggered = false;
    let dragging = false;
    graph.on('canvas:dragstart', () => {
      triggered = true;
    });
    graph.on('canvas:drag', () => {
      dragging = true;
    });
    graph.emit('canvas:mousedown', { clientX: 150, clientY: 150 });
    graph.emit('canvas:mousemove', { clientX: 150, clientY: 150 });
    expect(triggered).to.be.false;
    expect(dragging).to.be.false;
    graph.emit('canvas:mousemove', { clientX: 160, clientY: 160 });
    expect(triggered).to.be.true;
    expect(dragging).to.be.true;
    dragging = false;
    graph.emit('canvas:click', { clientX: 170, clientY: 170 });
    graph.emit('canvas:mousemove', { clientX: 170, clientY: 170 });
    expect(dragging).to.be.false;
  });
});

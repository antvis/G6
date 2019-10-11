const expect = require('chai').expect;
const Event = require('@antv/g/lib').Event;
const G6 = require('../../../src');

const div = document.createElement('div');
div.id = 'zoom-spec';
document.body.appendChild(div);

function createWheelEvent(canvas, delta, x, y) {
  const bbox = canvas.getBoundingClientRect();
  const e = new Event('wheel', {}, false, false);
  e.clientX = bbox.left + x;
  e.clientY = bbox.top + y;
  e.wheelDelta = delta;
  return e;
}

describe('zoom-canvas', () => {
  it('zoom canvas', () => {
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [ 'zoom-canvas' ]
      },
      pixelRatio: 2
    });
    const e = createWheelEvent(graph.get('canvas').get('el'), 100, 100, 100);
    graph.emit('wheel', e);
    let matrix = graph.get('group').getMatrix();
    expect(matrix[0]).to.equal(1.1);
    expect(matrix[4]).to.equal(1.1);
    expect(matrix[6]).to.equal(-10.000000000000014);
    expect(matrix[7]).to.equal(-10.000000000000014);
    graph.emit('wheel', e);
    matrix = graph.get('group').getMatrix();
    expect(matrix[0]).to.equal(1.2100000000000002);
    expect(matrix[4]).to.equal(1.2100000000000002);
    expect(matrix[6]).to.equal(100 - 100 * 0.75 * 0.75);
    expect(matrix[7]).to.equal(100 - 100 * 0.75 * 0.75);
    graph.destroy();
  });
  it('max zoom & min zoom', () => {
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [{
          type: 'zoom-canvas',
          maxZoom: 5,
          minZoom: 0.5
        }]
      },
      pixelRatio: 2
    });
    graph.zoom(5);
    let e = createWheelEvent(graph.get('canvas').get('el'), -100, 100, 100);
    graph.emit('wheel', e);
    let matrix = graph.get('group').getMatrix();
    expect(matrix[0]).to.equal(4.5);
    expect(matrix[4]).to.equal(4.5);
    graph.zoom(0.1);
    e = createWheelEvent(graph.get('canvas').get('el'), 100, 100, 100);
    graph.emit('wheel', e);
    matrix = graph.get('group').getMatrix();
    expect(matrix[0]).to.equal(0.45);
    expect(matrix[4]).to.equal(0.45);
  });
  it('unbind zoom', () => {
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [ 'zoom-canvas' ],
        custom: []
      },
      pixelRatio: 2
    });
    const e = createWheelEvent(graph.get('canvas').get('el'), -100, 100, 100);
    graph.emit('wheel', e);
    let matrix = graph.get('group').getMatrix();
    expect(matrix[0]).to.equal(0.9);
    expect(matrix[4]).to.equal(0.9);
    expect(matrix[6]).to.equal(10);
    expect(matrix[7]).to.equal(10);
    graph.setMode('custom');
    graph.emit('wheel', e);
    matrix = graph.get('group').getMatrix();
    expect(matrix[0]).to.equal(0.9);
    expect(matrix[4]).to.equal(0.9);
    expect(matrix[6]).to.equal(10);
    expect(matrix[7]).to.equal(10);
  });
});

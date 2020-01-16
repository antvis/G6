import '../../../src/behavior'
import '../../../src/shape'
import Graph from '../../../src/graph/graph'
import { Event } from '@antv/g-canvas';


const div = document.createElement('div');
div.id = 'zoom-spec';
document.body.appendChild(div);

class G6Event extends Event {
  wheelDelta: number
}
function createWheelEvent(canvas, delta, x, y) {
  const bbox = canvas.getBoundingClientRect();
  const e = new G6Event('wheel', {});
  e.clientX = bbox.left + x;
  e.clientY = bbox.top + y;
  e.wheelDelta = delta;
  return e;
}

function approximateEqual(a, b) {
  return Math.abs(a - b) < 0.0001;
}

describe('zoom-canvas', () => {
  it('zoom canvas', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [ 'zoom-canvas' ]
      },
    });
    const e = createWheelEvent(graph.get('canvas').get('el'), 100, 100, 100);
    graph.emit('wheel', e);
    let matrix = graph.get('group').getMatrix();
    expect(approximateEqual(matrix[0], 1.1)).toBe(true);
    expect(approximateEqual(matrix[4], 1.1)).toBe(true);
    expect(approximateEqual(matrix[6], -10)).toBe(true);
    expect(approximateEqual(matrix[7], -10)).toBe(true);
    graph.emit('wheel', e);
    matrix = graph.get('group').getMatrix();
    expect(approximateEqual(matrix[0], 1.21)).toBe(true);
    expect(approximateEqual(matrix[4], 1.21)).toBe(true);
    expect(approximateEqual(matrix[6], -21)).toBe(true);
    expect(approximateEqual(matrix[7], -21)).toBe(true);
    graph.destroy();
  });
  it('prevent update', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [{
          type: 'zoom-canvas',
          shouldUpdate: e => { expect(e).not.toBe(undefined); return false; }
        }]
      }
    });
    const e = createWheelEvent(graph.get('canvas').get('el'), 100, 100, 100);
    graph.emit('wheel', e);
    let matrix = graph.get('group').getMatrix();
    expect(matrix).toBe(null);
    graph.destroy();
  });
  it('max zoom & min zoom', () => {
    const graph = new Graph({
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
    });
    graph.zoom(5);
    let e = createWheelEvent(graph.get('canvas').get('el'), -100, 100, 100);
    graph.emit('wheel', e);
    let matrix = graph.get('group').getMatrix();
    expect(matrix[0]).toEqual(4.5);
    expect(matrix[4]).toEqual(4.5);
    graph.zoom(0.1);
    e = createWheelEvent(graph.get('canvas').get('el'), 100, 100, 100);
    graph.emit('wheel', e);
    matrix = graph.get('group').getMatrix();
    expect(matrix[0]).toEqual(0.45);
    expect(matrix[4]).toEqual(0.45);
  });
  it('unbind zoom', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [ 'zoom-canvas' ],
        custom: []
      },
    });
    const e = createWheelEvent(graph.get('canvas').get('el'), -100, 100, 100);
    graph.emit('wheel', e);
    let matrix = graph.get('group').getMatrix();
    expect(approximateEqual(matrix[0], 0.9)).toBe(true);
    expect(approximateEqual(matrix[4], 0.9)).toBe(true);
    expect(matrix[6]).toEqual(10);
    expect(matrix[7]).toEqual(10);
    graph.setMode('custom');
    graph.emit('wheel', e);
    matrix = graph.get('group').getMatrix();
    expect(approximateEqual(matrix[0], 0.9)).toBe(true);
    expect(approximateEqual(matrix[4], 0.9)).toBe(true);
    expect(matrix[6]).toEqual(10);
    expect(matrix[7]).toEqual(10);
  });
});

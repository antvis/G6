import '../../../src';
import { Graph } from '../../../src';
import { Event } from '@antv/g-canvas';

const data = {
  nodes: [
    { id: 'node1', label: 'node1' },
    { id: 'node2', label: 'node2' },
    { id: 'node3', label: 'node3' },
    { id: 'node4', label: 'node4' },
    { id: 'node5', label: 'node5' },
  ],
  edges: [
    { source: 'node1', target: 'node2' },
    { source: 'node1', target: 'node3' },
    { source: 'node1', target: 'node4' },
    { source: 'node4', target: 'node2' },
    { source: 'node5', target: 'node2' },
  ],
};

const div = document.createElement('div');
div.id = 'scroll-spec';
document.body.appendChild(div);

class G6Event extends Event {
  wheelDelta: number;
}
function createWheelEvent(delta, deltaX, deltaY) {

  const e = new G6Event('wheel', {});
  e.deltaX = deltaX;
  e.deltaY = deltaY;
  e.wheelDelta = delta;
  return e;
}

function approximateEqual(a, b, threshold = 0.02) {
  return Math.abs(a - b) < threshold;
}

describe('scroll-canvas', () => {
  it('scroll canvas', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [
          {
            type: 'scroll-canvas',
          },
        ],
      },
    });
    graph.data(data);
    graph.render();
    const e = createWheelEvent(100, 100, 100);
    graph.emit('wheel', e);
    let matrix = graph.get('group').getMatrix();
    expect(approximateEqual(matrix[0], 1)).toBe(true);
    expect(approximateEqual(matrix[4], 1)).toBe(true);
    expect(approximateEqual(matrix[6], -100)).toBe(true);
    expect(approximateEqual(matrix[7], -100)).toBe(true);
    graph.emit('wheel', e);
    matrix = graph.get('group').getMatrix();
    expect(approximateEqual(matrix[0], 1)).toBe(true);
    expect(approximateEqual(matrix[4], 1)).toBe(true);
    expect(approximateEqual(matrix[6], -200)).toBe(true);
    expect(approximateEqual(matrix[7], -200)).toBe(true);
    graph.destroy();
  });
  it('direction x', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [
          {
            type: 'scroll-canvas',
            direction: 'x'
          },
        ],
      },
    });
    graph.data(data);
    graph.render();
    const e = createWheelEvent(100, 100, 100);
    graph.emit('wheel', e);
    let matrix = graph.get('group').getMatrix();
    expect(approximateEqual(matrix[0], 1)).toBe(true);
    expect(approximateEqual(matrix[4], 1)).toBe(true);
    expect(approximateEqual(matrix[6], -100)).toBe(true);
    expect(approximateEqual(matrix[7], 0)).toBe(true);
    graph.emit('wheel', e);
    matrix = graph.get('group').getMatrix();
    expect(approximateEqual(matrix[0], 1)).toBe(true);
    expect(approximateEqual(matrix[4], 1)).toBe(true);
    expect(approximateEqual(matrix[6], -200)).toBe(true);
    expect(approximateEqual(matrix[7], 0)).toBe(true);
    graph.destroy();
  });
  it('direction x', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [
          {
            type: 'scroll-canvas',
            direction: 'y'
          },
        ],
      },
    });
    graph.data(data);
    graph.render();
    const e = createWheelEvent(100, 100, 100);
    graph.emit('wheel', e);
    let matrix = graph.get('group').getMatrix();
    expect(approximateEqual(matrix[0], 1)).toBe(true);
    expect(approximateEqual(matrix[4], 1)).toBe(true);
    expect(approximateEqual(matrix[6], 0)).toBe(true);
    expect(approximateEqual(matrix[7], -100)).toBe(true);
    graph.emit('wheel', e);
    matrix = graph.get('group').getMatrix();
    expect(approximateEqual(matrix[0], 1)).toBe(true);
    expect(approximateEqual(matrix[4], 1)).toBe(true);
    expect(approximateEqual(matrix[6], 0)).toBe(true);
    expect(approximateEqual(matrix[7], -200)).toBe(true);
    graph.destroy();
  });
});

import '../../../src/behavior';
import '../../../src/shape';
import Graph from '../../../src/graph/graph';
import { Event } from '@antv/g-canvas';
import { numberEqual } from '../layout/util';

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
  ]
}

const div = document.createElement('div');
div.id = 'zoom-spec';
document.body.appendChild(div);

class G6Event extends Event {
  wheelDelta: number;
}
function createWheelEvent(canvas, delta, x, y) {
  const bbox = canvas.getBoundingClientRect();
  const e = new G6Event('wheel', {});
  e.clientX = bbox.left + x;
  e.clientY = bbox.top + y;
  e.wheelDelta = delta;
  return e;
}

function approximateEqual(a, b, threshold = 0.02) {
  return Math.abs(a - b) < threshold;
}

describe('zoom-canvas', () => {
  it('zoom canvas', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [{
          type: 'zoom-canvas',
          // enableOptimize: true
        }],
      },
    });
    graph.data(data);
    graph.render();
    const e = createWheelEvent(graph.get('canvas').get('el'), 100, 100, 100);
    graph.emit('wheel', e);
    let matrix = graph.get('group').getMatrix();
    expect(approximateEqual(matrix[0], 1.1)).toBe(true);
    expect(approximateEqual(matrix[4], 1.1)).toBe(true);
    expect(approximateEqual(matrix[6], -11.1)).toBe(true);
    expect(approximateEqual(matrix[7], -11.1)).toBe(true);
    graph.emit('wheel', e);
    matrix = graph.get('group').getMatrix();
    expect(approximateEqual(matrix[0], 1.23)).toBe(true);
    expect(approximateEqual(matrix[4], 1.23)).toBe(true);
    expect(approximateEqual(matrix[6], -23.45)).toBe(true);
    expect(approximateEqual(matrix[7], -23.45)).toBe(true);
    // graph.destroy();
  });
  it('event not prevented', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [
          {
            type: 'zoom-canvas',
            shouldUpdate: (e) => {
              expect(e.defaultPrevented).toBe(false);
              return false;
            },
          },
        ],
      },
    });
    const e = createWheelEvent(graph.get('canvas').get('el'), 100, 100, 100);
    graph.emit('wheel', e);
    graph.destroy();
  });
  it('prevent update', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [
          {
            type: 'zoom-canvas',
            shouldUpdate: (e) => {
              expect(e).not.toBe(undefined);
              return false;
            },
          },
        ],
      },
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
        default: [
          {
            type: 'zoom-canvas',
            maxZoom: 5,
            minZoom: 0.5,
          },
        ],
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
    expect(matrix[0]).toEqual(0.5);
    expect(matrix[4]).toEqual(0.5);
  });
  it('unbind zoom', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: ['zoom-canvas'],
        custom: [],
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

  it('zoom with optimize', (done) => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [
          {
            type: 'zoom-canvas',
            enableOptimize: true,
          },
        ],
      },
    });

    const data = {
      nodes: [
        {
          id: 'node1',
          x: 100,
          y: 100,
          label: 'label',
        },
        {
          id: 'node2',
          x: 100,
          y: 200,
          label: 'label2',
        },
      ],
      edges: [
        {
          source: 'node1',
          target: 'node2',
          label: 'edge',
        },
      ],
    };

    graph.data(data);
    graph.render();

    let e = createWheelEvent(graph.get('canvas').get('el'), 100, 100, 100);
    graph.emit('wheel', e);
    let matrix = graph.get('group').getMatrix();
    expect(approximateEqual(matrix[0], 1.1)).toBe(true);
    expect(approximateEqual(matrix[4], 1.1)).toBe(true);
    expect(approximateEqual(matrix[6], -11.1)).toBe(true);
    expect(approximateEqual(matrix[7], -11.1)).toBe(true);

    // 默认 zoom=1，会显示所有元素
    setTimeout(() => {
      let node1 = graph.findById('node1');
      let container = node1.getContainer();
      container.get('children').map((child) => {
        expect(child.get('visible')).toBe(true);
      });

      graph.zoom(0.5);
      e = createWheelEvent(graph.get('canvas').get('el'), 100, 100, 100);
      graph.emit('wheel', e);

      // 只显示 keyShape
      node1 = graph.findById('node1');
      container = node1.getContainer();
      expect(node1.getKeyShape().get('visible')).toBe(true);
      container.get('children').map((child) => {
        if (!child.get('isKeyShape')) {
          expect(child.get('visible')).toBe(false);
        }
      });
      graph.zoomTo(1);
      e = createWheelEvent(graph.get('canvas').get('el'), 100, 100, 100);
      graph.emit('wheel', e);
      setTimeout(() => {
        node1 = graph.findById('node1');
        container = node1.getContainer();
        container.get('children').map((child) => {
          expect(child.get('visible')).toBe(true);
        });
        graph.destroy();
        done();
      }, 550);
    }, 550);
  });
  it('zoom and fix items with fixAll', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [
          {
            type: 'zoom-canvas',
            fixSelectedItems: {
              fixAll: true,
            },
          },
          'drag-node',
        ],
      },
      defaultNode: { size: 100, style: { lineWidth: 0 } },
      nodeStateStyles: {
        selected: {
          fill: '#f00',
        },
      },
      edgeStateStyles: {
        selected: {
          stroke: '#f00',
        },
      },
    });

    const data = {
      nodes: [
        {
          id: 'node1',
          x: 100,
          y: 100,
          label: 'label',
        },
        {
          id: 'node2',
          x: 100,
          y: 100,
          label: 'label2',
        },
      ],
      edges: [
        {
          source: 'node1',
          target: 'node2',
          label: 'edge',
        },
      ],
    };

    graph.data(data);
    graph.render();

    const node = graph.getNodes()[1];
    const shapeGroup = node.getContainer();
    let matrix = shapeGroup.getMatrix();
    graph.setItemState(node, 'selected', true);
    const edge = graph.getEdges()[0];
    graph.setItemState(edge, 'selected', true);

    let pe = createWheelEvent(graph.get('canvas').get('el'), 100, 100, 100);
    graph.emit('wheel', pe);
    expect(matrix[0]).toBe(1);
    expect(matrix[4]).toBe(1);
    let ne = createWheelEvent(graph.get('canvas').get('el'), -100, 100, 100);
    graph.emit('wheel', ne);
    graph.emit('wheel', ne);
    matrix = shapeGroup.getMatrix();
    expect(numberEqual(matrix[0], 1.11, 0.002)).toBe(true);
    expect(numberEqual(matrix[4], 1.11, 0.002)).toBe(true);
    graph.emit('wheel', pe);
    matrix = shapeGroup.getMatrix();
    expect(matrix[0]).toBe(1);
    expect(matrix[4]).toBe(1);

    graph.destroy();
  });
  it('zoom and fix items with fixLabel and fixLineWidth', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [
          {
            type: 'zoom-canvas',
            fixSelectedItems: {
              fixLabel: true,
              fixLineWidth: true,
            },
          },
          'drag-node',
        ],
      },
      nodeStateStyles: {
        selected: {
          fill: '#f00',
        },
      },
      edgeStateStyles: {
        selected: {
          stroke: '#f00',
        },
      },
    });

    const data = {
      nodes: [
        {
          id: 'node1',
          x: 100,
          y: 100,
          label: 'label',
        },
        {
          id: 'node2',
          x: 100,
          y: 200,
          label: 'label2',
        },
      ],
      edges: [
        {
          source: 'node1',
          target: 'node2',
          label: 'edge',
        },
      ],
    };

    graph.data(data);
    graph.render();

    const node = graph.getNodes()[1];
    const shapeGroup = node.getContainer();
    let textShape = shapeGroup.find((e) => e.get('name') === 'text-shape');
    let keyShape = node.getKeyShape();
    graph.setItemState(node, 'selected', true);
    const edge = graph.getEdges()[0];
    graph.setItemState(edge, 'selected', true);

    let pe = createWheelEvent(graph.get('canvas').get('el'), 100, 100, 100);
    graph.emit('wheel', pe);
    expect(textShape.attr('fontSize')).toEqual(12);
    expect(keyShape.attr('lineWidth')).toBe(4);
    let ne = createWheelEvent(graph.get('canvas').get('el'), -100, 100, 100);
    graph.emit('wheel', ne);
    graph.emit('wheel', ne);
    expect(numberEqual(textShape.attr('fontSize'), 13.33, 0.004)).toEqual(true);
    expect(numberEqual(keyShape.attr('lineWidth'), 4.444, 0.002)).toBe(true);
    graph.emit('wheel', pe);
    expect(textShape.attr('fontSize')).toEqual(12);
    expect(keyShape.attr('lineWidth')).toBe(4);

    graph.destroy();
  });
});

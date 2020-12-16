import '../../../src/behavior';
import '../../../src/shape';
import Graph from '../../../src/graph/graph';

const div = document.createElement('div');
div.id = 'pan-spec';
document.body.appendChild(div);

const data = {
  nodes: [
    {
      id: 'node1',
      x: 50,
      y: 50,
      // label: 'node1'
    },
    {
      id: 'node2',
      x: 200,
      y: 50,
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
    },
  ],
};

describe('drag-canvas', () => {
  it('drag canvas', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [{
          type: 'drag-canvas'
        }],
      },
    });
    graph.data(data);
    graph.render();
    let start = false;
    graph.on('canvas:dragstart', () => {
      start = true;
    });
    graph.on('canvas:dragend', () => {
      start = false;
    });
    graph.paint();
    graph.emit('dragstart', { clientX: 150, clientY: 150, target: graph.get('canvas') });
    graph.emit('drag', { clientX: 200, clientY: 200, target: graph.get('canvas') });
    expect(start).toBe(true);
    graph.emit('drag', { clientX: 250, clientY: 250, target: graph.get('canvas') });
    expect(start).toBe(true);
    const matrix = graph.get('group').getMatrix();
    expect(matrix[6]).toEqual(100);
    expect(matrix[7]).toEqual(100);
    graph.emit('dragend', {});
    expect(start).toBe(false);
    graph.destroy();
  });
  it('prevent default drag behavior', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [
          {
            type: 'drag-canvas',
            shouldUpdate: () => {
              return false;
            },
          },
        ],
      },
    });
    graph.data(data);
    graph.render();
    let start = false;
    graph.on('canvas:dragstart', () => {
      start = true;
    });
    graph.on('canvas:dragend', () => {
      start = false;
    });
    graph.paint();
    graph.emit('dragstart', { clientX: 150, clientY: 150, target: graph.get('canvas') });
    graph.emit('drag', { clientX: 200, clientY: 200, target: graph.get('canvas') });
    expect(start).toBe(true);
    graph.emit('drag', { clientX: 250, clientY: 250, target: graph.get('canvas') });
    expect(start).toBe(true);
    const matrix = graph.get('group').getMatrix();
    expect(matrix).toEqual(null);
    graph.emit('canvas:dragend', {});
    expect(start).toBe(false);
    graph.destroy();
  });
  it('unbind event', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [
          {
            type: 'drag-canvas',
          },
        ],
        custom: [],
      },
    });
    graph.data(data);
    graph.render();
    let triggered = false;
    graph.setMode('custom');
    graph.on('canvas:dragstart', () => {
      triggered = true;
    });
    graph.on('canvas:dragend', () => {
      triggered = true;
    });
    graph.emit('dragstart', { clientX: 150, clientY: 150, target: graph.get('canvas') });
    graph.emit('drag', { clientX: 200, clientY: 200, target: graph.get('canvas') });
    expect(triggered).toBe(false);
    graph.emit('drag', { clientX: 250, clientY: 250, target: graph.get('canvas') });
    expect(triggered).toBe(false);
    graph.emit('dragend', { clientX: 250, clientY: 250 });
    expect(triggered).toBe(false);
    graph.destroy();
  });
  it('drag with x direction restrict', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [
          {
            type: 'drag-canvas',
            direction: 'x',
          },
        ],
      },
    });
    graph.data(data);
    graph.render();
    let start = false;
    graph.addItem('node', { x: 100, y: 100, color: '#666', type: 'rect', id: 'test' });
    graph.on('canvas:dragstart', () => {
      start = true;
    });
    graph.on('canvas:dragend', () => {
      start = false;
    });
    graph.paint();
    graph.emit('dragstart', { clientX: 150, clientY: 150, target: graph.get('canvas') });
    graph.emit('drag', { clientX: 200, clientY: 200, target: graph.get('canvas') });
    expect(start).toBe(true);
    graph.emit('drag', { clientX: 250, clientY: 250, target: graph.get('canvas') });
    expect(start).toBe(true);
    const matrix = graph.get('group').getMatrix();
    expect(matrix[6]).toEqual(100);
    expect(matrix[7]).toEqual(0);
    graph.emit('dragend', { clientX: 200, clientY: 200 });
    expect(start).toBe(false);
    graph.destroy();
  });
  it('drag with y direction restrict', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [
          {
            type: 'drag-canvas',
            direction: 'y',
          },
        ],
      },
    });
    let start = false;
    graph.addItem('node', { x: 100, y: 100, color: '#666', type: 'rect', id: 'test' });
    graph.paint();
    graph.emit('dragstart', { clientX: 150, clientY: 150, target: graph.get('canvas') });
    graph.emit('drag', { clientX: 250, clientY: 250, target: graph.get('canvas') });
    const matrix = graph.get('group').getMatrix();
    expect(matrix[6]).toEqual(0);
    expect(matrix[7]).toEqual(100);
    graph.emit('dragend', { clientX: 250, clientY: 250 });
    graph.destroy();
  });
  it('drag offset', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [
          {
            type: 'drag-canvas',
          },
        ],
      },
    });
    let triggered = false;
    let dragging = false;
    graph.on('canvas:dragstart', () => {
      triggered = true;
    });
    graph.on('canvas:drag', () => {
      dragging = true;
    });
    graph.emit('dragstart', { clientX: 150, clientY: 150, target: graph.get('canvas') });
    graph.emit('drag', { clientX: 150, clientY: 150, target: graph.get('canvas') });
    expect(triggered).toBe(false);
    expect(dragging).toBe(false);
    graph.emit('drag', { clientX: 160, clientY: 160, target: graph.get('canvas') });
    expect(triggered).toBe(true);
    graph.emit('drag', { clientX: 170, clientY: 180, target: graph.get('canvas') });
    expect(dragging).toBe(true);
    dragging = false;
    graph.emit('canvas:click', { clientX: 170, clientY: 170, target: graph.get('canvas') });
    graph.emit('drag', { clientX: 170, clientY: 170, target: graph.get('canvas') });
    expect(dragging).toBe(false);
    graph.destroy();
  });
  it('drag with keydown', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [
          {
            type: 'drag-canvas',
          },
        ],
      },
    });
    let triggered = false;
    let dragging = false;
    graph.on('canvas:dragstart', () => {
      triggered = true;
    });
    graph.on('canvas:drag', () => {
      dragging = true;
    });

    // mouse down and up without moving
    graph.emit('dragstart', { clientX: 150, clientY: 150, target: graph.get('canvas') });
    graph.emit('dragend', { clientX: 150, clientY: 150, target: graph.get('canvas') });
    expect(triggered).toBe(false);
    expect(dragging).toBe(false);

    graph.emit('keydown', { key: 'shift' });
    graph.emit('dragstart', { clientX: 150, clientY: 150, target: graph.get('canvas') });
    expect(triggered).toBe(false);
    expect(dragging).toBe(false);
    graph.emit('drag', { clientX: 160, clientY: 160, target: graph.get('canvas') });
    expect(triggered).toBe(false);
    graph.emit('dragend', { clientX: 160, clientY: 160 });
    expect(triggered).toBe(false);

    graph.emit('keyup', { key: 'shift' });
    graph.emit('dragstart', { clientX: 150, clientY: 150, target: graph.get('canvas') });
    graph.emit('drag', { clientX: 150, clientY: 150, target: graph.get('canvas') });
    expect(triggered).toBe(false);
    expect(dragging).toBe(false);
    graph.emit('drag', { clientX: 160, clientY: 160, target: graph.get('canvas') });
    expect(triggered).toBe(true);
    graph.destroy();
  });
  it('drag with keydown code invalid', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [
          {
            type: 'drag-canvas',
          },
        ],
      },
    });
    let triggered = false;
    graph.on('canvas:dragstart', () => {
      triggered = true;
    });
    graph.emit('keydown', {}); // key undefined
    graph.emit('dragstart', { clientX: 150, clientY: 150, target: graph.get('canvas') });
    graph.emit('dragend', { clientX: 160, clientY: 160 });
    expect(triggered).toBe(false);
    graph.emit('keyup', {});

    graph.emit('keydown', { key: 'abc' }); // key invalid
    graph.emit('dragstart', { clientX: 150, clientY: 150, target: graph.get('canvas') });
    graph.emit('dragend', { clientX: 160, clientY: 160 });
    expect(triggered).toBe(false);
    graph.emit('keyup', {});
    graph.destroy();
  });

  it('drag out of canvas', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [
          {
            type: 'drag-canvas',
          },
        ],
      },
    });
    graph.emit('dragstart', { clientX: 150, clientY: 150, target: graph.get('canvas') });
    graph.emit('drag', { clientX: 550, clientY: 550, target: graph.get('canvas') });
    graph.emit('canvas:mouseleave', { target: graph.get('canvas').get('el') });

    // dragend out of the canvas
    const event = document.createEvent('MouseEvents');
    event.initMouseEvent(
      'dragend',
      true,
      true,
      document.defaultView,
      0,
      0,
      0,
      550,
      550, // clientX = 550, clientY = 550
      false,
      false,
      false,
      false,
      0,
      null,
    );
    document.body.dispatchEvent(event);
    const movedMatrix = graph.get('group').getMatrix();
    expect(movedMatrix[6]).toEqual(400);
    expect(movedMatrix[7]).toEqual(400);
  });

  it('drag out of canvas, but it is not dragging', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [
          {
            type: 'drag-canvas',
          },
        ],
      },
    });
    graph.emit('dragstart', { clientX: 150, clientY: 150, target: graph.get('canvas') });
    graph.emit('drag', { clientX: 350, clientY: 350, target: graph.get('canvas') });
    graph.emit('dragend', { clientX: 350, clientY: 350 });
    graph.emit('canvas:mouseleave', { target: graph.get('canvas').get('el') });

    // dragend out of the canvas
    const event = document.createEvent('MouseEvents');
    event.initMouseEvent(
      'dragend',
      true,
      true,
      document.defaultView,
      0,
      0,
      0,
      550,
      550, // clientX = 550, clientY = 550
      false,
      false,
      false,
      false,
      0,
      null,
    );
    document.body.dispatchEvent(event);
    const movedMatrix = graph.get('group').getMatrix();
    expect(movedMatrix[6]).toEqual(200);
    expect(movedMatrix[7]).toEqual(200);
  });

  it('enable optimize to hide the shapes while dragging', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [
          {
            type: 'drag-canvas',
            enableOptimize: true,
          },
        ],
      },
    });
    graph.data(data);
    graph.render();
    graph.emit('dragstart', { clientX: 150, clientY: 150, target: graph.get('canvas') });
    graph.emit('drag', { clientX: 350, clientY: 350, target: graph.get('canvas') });

    let nodes = graph.getNodes();
    nodes.forEach((node) => {
      const children = node.getContainer().get('children');
      children.forEach((child) => {
        if (!child.get('isKeyShape')) expect(child.get('visible')).toEqual(false);
        else expect(child.get('visible')).toEqual(true);
      });
    });
    let edges = graph.getEdges();
    edges.forEach((edge) => {
      const children = edge.getContainer().get('children');
      children.forEach((child) => {
        expect(child.get('visible')).toEqual(false);
      });
    });

    graph.emit('dragend', { clientX: 350, clientY: 350 });

    nodes = graph.getNodes();
    nodes.forEach((node) => {
      const children = node.getContainer().get('children');
      children.forEach((child) => {
        if (!child.get('isKeyShape')) expect(child.get('visible')).toEqual(true);
        else expect(child.get('visible')).toEqual(true);
      });
    });
    edges = graph.getEdges();
    edges.forEach((edge) => {
      const children = edge.getContainer().get('children');
      children.forEach((child) => {
        expect(child.get('visible')).toEqual(true);
      });
    });
  });

  it('drag canvas with scalableRange', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [
          {
            type: 'drag-canvas',
            scalableRange: -150,
          },
        ],
      },
    });
    graph.data(data);
    graph.render();
    let start = false;
    graph.on('canvas:dragstart', () => {
      start = true;
    });
    graph.on('canvas:dragend', () => {
      start = false;
    });
    graph.paint();
    graph.emit('dragstart', { clientX: 150, clientY: 150, target: graph.get('canvas') });
    graph.emit('drag', { clientX: 200, clientY: 200, target: graph.get('canvas') });
    expect(start).toBe(true);
    graph.emit('drag', { clientX: 250, clientY: 250, target: graph.get('canvas') });
    expect(start).toBe(true);
    let matrix = graph.get('group').getMatrix();
    expect(matrix[6]).toEqual(100);
    expect(matrix[7]).toEqual(100);

    graph.emit('drag', { clientX: 400, clientY: 350, target: graph.get('canvas') });
    matrix = graph.get('group').getMatrix();
    expect(matrix[6]).toEqual(250);
    expect(matrix[7]).toEqual(200);
    expect(start).toBe(true);

    // 超过了设置的范围，则不再移动
    graph.emit('drag', { clientX: 550, clientY: 550, target: graph.get('canvas') });
    matrix = graph.get('group').getMatrix();
    expect(matrix[6]).toEqual(250);
    expect(matrix[7]).toEqual(200);
    expect(start).toBe(true);

    graph.emit('dragend', {});
    expect(start).toBe(false);
    graph.destroy();
  });
});

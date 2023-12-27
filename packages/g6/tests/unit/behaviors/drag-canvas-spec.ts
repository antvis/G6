import G6 from '../../../src/index';
const container = document.createElement('div');
document.querySelector('body').appendChild(container);

describe('drag-canvas behavior', () => {
  it('drag-canvas with default props', (done) => {
    const graph = new G6.Graph({
      container,
      width: 500,
      height: 500,
      layout: {
        type: 'grid',
      },
      data: {
        nodes: [
          { id: 'node1', data: { x: 100, y: 200 } },
          { id: 'node2', data: { x: 200, y: 250 } },
        ],
        edges: [{ id: 'edge1', source: 'node1', target: 'node2', data: {} }],
      },
      modes: {
        default: ['drag-canvas'],
      },
    });

    let times = 0;
    graph.on('viewportchange', ({ translate }) => {
      switch (times) {
        case 0:
          expect(translate.dx).toBe(100);
          expect(translate.dy).toBe(100);
          break;
        case 1:
          expect(translate.dx).toBe(0);
          expect(translate.dy).toBe(-100);
          break;
        case 2:
          expect(translate.dx).toBe(0);
          expect(translate.dy).toBe(200);
          break;
        case 3:
          expect(translate.dx).toBe(0);
          expect(translate.dy).toBe(0);
          break;
      }
      times++;
    });

    graph.on('afterlayout', (e) => {
      graph.emit('pointerdown', {
        client: { x: 100, y: 50 },
      });
      // times === 0;
      graph.emit('pointermove', {
        client: { x: 200, y: 150 },
      });
      // times === 1;
      graph.emit('pointermove', {
        client: { x: 200, y: 50 },
      });
      expect(graph.getItemVisible('edge1')).toBe(false);
      expect(graph.transientCanvas.getRoot().childNodes[1].childNodes.length).toBe(2);
      graph.emit('pointerup', {
        client: { x: 200, y: 50 },
      });
      expect(graph.getItemVisible('edge1')).toBe(true);
      expect(graph.transientCanvas.getRoot().childNodes[1].childNodes.length).toBe(0);

      graph.emit('pointerdown', {
        client: { x: 100, y: 50 },
        shiftKey: true,
      });
      // times === 2;
      graph.emit('pointermove', {
        client: { x: 100, y: 250 },
        shiftKey: true,
      });
      expect(graph.getItemVisible('edge1')).toBe(false);
      expect(graph.transientCanvas.getRoot().childNodes[1].childNodes.length).toBe(2);
      // times === 3, out of view failed
      graph.emit('pointermove', {
        client: { x: 100, y: 550 },
      });
      graph.emit('pointerup', {
        client: { x: 200, y: 50 },
      });
      expect(graph.getItemVisible('edge1')).toBe(true);
      expect(graph.transientCanvas.getRoot().childNodes[1].childNodes.length).toBe(0);

      graph.destroy();
      done();
    });
  });
  it('drag-canvas with trigger directionKeys', (done) => {
    const graph = new G6.Graph({
      container,
      width: 500,
      height: 500,
      layout: {
        type: 'grid',
      },
      data: {
        nodes: [
          { id: 'node1', data: { x: 100, y: 200 } },
          { id: 'node2', data: { x: 200, y: 250 } },
        ],
        edges: [{ id: 'edge1', source: 'node1', target: 'node2', data: {} }],
      },
      modes: {
        default: [
          {
            type: 'drag-canvas',
            trigger: 'directionKeys',
          },
        ],
      },
    });

    let times = 0;
    graph.on('viewportchange', ({ translate }) => {
      switch (times) {
        case 0:
          expect(translate.dx).toBe(-1);
          break;
        case 1:
          expect(translate.dy).toBe(1);
          break;
        case 2:
          expect(translate.dy).toBe(-1);
          break;
        case 3:
          expect(translate.dx).toBe(1);
          break;
      }
      times++;
    });

    graph.on('afterlayout', (e) => {
      // times === 0;
      graph.emit('keydown', {
        key: 'ArrowLeft',
      });
      // times === 1;
      graph.emit('keydown', {
        key: 'ArrowDown',
      });
      // times === 2;
      graph.emit('keydown', {
        key: 'ArrowUp',
      });
      // times === 3;
      graph.emit('keydown', {
        key: 'ArrowRight',
      });

      graph.destroy();
      done();
    });
  });
  it('drag-canvas with secondaryKey a', (done) => {
    const graph = new G6.Graph({
      container,
      width: 500,
      height: 500,
      layout: {
        type: 'grid',
      },
      data: {
        nodes: [
          { id: 'node1', data: { x: 100, y: 200 } },
          { id: 'node2', data: { x: 200, y: 250 } },
        ],
        edges: [{ id: 'edge1', source: 'node1', target: 'node2', data: {} }],
      },
      modes: {
        default: [
          {
            type: 'drag-canvas',
            secondaryKey: 'a',
          },
        ],
      },
    });

    graph.on('viewportchange', ({ translate }) => {
      expect(translate.dx).toBe(100);
      expect(translate.dy).toBe(100);
    });

    graph.on('afterlayout', (e) => {
      graph.emit('pointerdown', {
        client: { x: 100, y: 50 },
      });
      // nothing change, secondaryKey is not pressing
      graph.emit('pointermove', {
        client: { x: 200, y: 150 },
      });
      expect(graph.getItemVisible('edge1')).toBe(true);

      graph.emit('keydown', { key: 'a' });
      graph.emit('pointerdown', {
        client: { x: 100, y: 50 },
      });
      // viewportchange
      graph.emit('pointermove', {
        client: { x: 200, y: 150 },
      });
      expect(graph.getItemVisible('edge1')).toBe(false);
      expect(graph.transientCanvas.getRoot().childNodes[1].childNodes.length).toBe(2);
      graph.emit('pointerup', {
        client: { x: 200, y: 50 },
      });
      graph.destroy();
      done();
    });
  });
  it('drag-canvas with enableOptimize false', (done) => {
    const graph = new G6.Graph({
      container,
      width: 500,
      height: 500,
      layout: {
        type: 'grid',
      },
      data: {
        nodes: [
          { id: 'node1', data: { x: 100, y: 200 } },
          { id: 'node2', data: { x: 200, y: 250 } },
        ],
        edges: [{ id: 'edge1', source: 'node1', target: 'node2', data: {} }],
      },
      modes: {
        default: [
          {
            type: 'drag-canvas',
            enableOptimize: false,
          },
        ],
      },
    });

    graph.on('viewportchange', ({ translate }) => {
      expect(translate.dx).toBe(100);
      expect(translate.dy).toBe(100);
    });

    graph.on('afterlayout', (e) => {
      graph.emit('pointerdown', {
        client: { x: 100, y: 50 },
      });
      // viewportchange
      graph.emit('pointermove', {
        client: { x: 200, y: 150 },
      });
      expect(graph.getItemVisible('edge1')).toBe(true);
      expect(graph.transientCanvas.getRoot().childNodes[1].childNodes.length).toBe(0);
      graph.emit('pointerup', {
        client: { x: 200, y: 50 },
      });

      graph.destroy();
      done();
    });
  });
  it('drag-canvas with direction x and update to y', (done) => {
    const graph = new G6.Graph({
      container,
      width: 500,
      height: 500,
      layout: {
        type: 'grid',
      },
      data: {
        nodes: [
          { id: 'node1', data: { x: 100, y: 200 } },
          { id: 'node2', data: { x: 200, y: 250 } },
        ],
        edges: [{ id: 'edge1', source: 'node1', target: 'node2', data: {} }],
      },
      modes: {
        default: [
          {
            type: 'drag-canvas',
            direction: 'x',
          },
        ],
      },
    });

    let times = 0;
    graph.on('viewportchange', ({ translate }) => {
      if (times === 0) {
        expect(translate.dx).toBe(100);
        expect(translate.dy).toBe(0);
      } else {
        expect(translate.dx).toBe(0);
        expect(translate.dy).toBe(100);
      }
      times++;
    });

    graph.on('afterlayout', (e) => {
      graph.emit('pointerdown', {
        client: { x: 100, y: 50 },
      });
      // times = 0
      graph.emit('pointermove', {
        client: { x: 200, y: 150 },
      });
      graph.emit('pointerup', {
        client: { x: 200, y: 50 },
      });

      graph.updateBehavior(
        {
          type: 'drag-canvas',
          direction: 'y',
        },
        'default',
      );
      graph.emit('pointerdown', {
        client: { x: 100, y: 50 },
      });
      // times = 1
      graph.emit('pointermove', {
        client: { x: 200, y: 150 },
      });
      graph.emit('pointerup', {
        client: { x: 200, y: 50 },
      });

      graph.destroy();
      done();
    });
  });
  it('drag-canvas with trigger directionKeys and speedupKey', (done) => {
    const graph = new G6.Graph({
      container,
      width: 500,
      height: 500,
      layout: {
        type: 'grid',
      },
      data: {
        nodes: [
          { id: 'node1', data: { x: 100, y: 200 } },
          { id: 'node2', data: { x: 200, y: 250 } },
        ],
        edges: [{ id: 'edge1', source: 'node1', target: 'node2', data: {} }],
      },
      modes: {
        default: [
          {
            type: 'drag-canvas',
            trigger: 'directionKeys',
            speedUpKey: 'b',
          },
        ],
      },
    });

    let times = 0;
    graph.on('viewportchange', ({ translate }) => {
      switch (times) {
        case 0:
          expect(translate.dx).toBe(-20);
          break;
        case 1:
          expect(translate.dy).toBe(20);
          break;
        case 2:
          expect(translate.dy).toBe(-20);
          break;
        case 3:
          expect(translate.dx).toBe(20);
          break;
      }
      times++;
    });

    graph.on('afterlayout', (e) => {
      graph.emit('keydown', {
        key: 'b',
      });
      // times === 0;
      graph.emit('keydown', {
        key: 'ArrowLeft',
      });
      // times === 1;
      graph.emit('keydown', {
        key: 'ArrowDown',
      });
      // times === 2;
      graph.emit('keydown', {
        key: 'ArrowUp',
      });
      // times === 3;
      graph.emit('keydown', {
        key: 'ArrowRight',
      });

      graph.destroy();
      done();
    });
  });
  it('drag-canvas with eventname', (done) => {
    const graph = new G6.Graph({
      container,
      width: 500,
      height: 500,
      layout: {
        type: 'grid',
      },
      data: {
        nodes: [
          { id: 'node1', data: { x: 100, y: 200 } },
          { id: 'node2', data: { x: 200, y: 250 } },
        ],
        edges: [{ id: 'edge1', source: 'node1', target: 'node2', data: {} }],
      },
      modes: {
        default: [
          {
            type: 'drag-canvas',
            eventName: 'xxeventname',
          },
        ],
      },
    });

    graph.on('xxeventname', ({ translate }) => {
      expect(translate.dx).toBe(100);
      expect(translate.dy).toBe(100);
    });

    graph.on('afterlayout', (e) => {
      graph.emit('pointerdown', {
        client: { x: 100, y: 50 },
      });
      // viewportchange
      graph.emit('pointermove', {
        client: { x: 200, y: 150 },
      });
      graph.emit('pointerup', {
        client: { x: 200, y: 50 },
      });

      graph.destroy();
      done();
    });
  });
});

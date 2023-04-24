import G6 from '../../../src/index';
const container = document.createElement('div');
document.querySelector('body').appendChild(container);

describe('zoom-canvas behavior', () => {
  it('zoom-canvas with default props', (done) => {
    const graph = new G6.Graph({
      container,
      width: 500,
      height: 500,
      type: 'graph',
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
        default: ['zoom-canvas'],
      },
    });

    let times = 0;
    graph.on('viewportchange', ({ zoom }) => {
      switch (times) {
        case 0:
          expect(zoom.ratio).toBe(101 / 100);
          break;
        case 1:
          expect(zoom.ratio).toBe(100 / 101);
          break;
      }
      times++;
    });

    graph.on('afterlayout', (e) => {
      expect(
        graph.transientCanvas.getRoot().childNodes[1].childNodes.length,
      ).toBe(0);
      // times === 0;
      graph.emit('wheel', {
        canvas: { x: 100, y: 50 },
        deltaY: -1,
      });
      // item hidden
      expect(graph.getItemVisible('edge1')).toBe(false);
      expect(graph.getItemVisible('node1')).toBe(false);
      expect(graph.getItemVisible('node2')).toBe(false);
      expect(
        graph.transientCanvas.getRoot().childNodes[1].childNodes.length,
      ).toBe(2);

      // times === 1;
      graph.emit('wheel', {
        canvas: { x: 100, y: 50 },
        deltaY: 1,
      });

      setTimeout(() => {
        // zooming end
        expect(graph.getItemVisible('edge1')).toBe(true);
        expect(graph.getItemVisible('node1')).toBe(true);
        expect(graph.getItemVisible('node2')).toBe(true);
        expect(
          graph.transientCanvas.getRoot().childNodes[1].childNodes.length,
        ).toBe(0);

        // hide item first and wheel
        graph.hideItem('edge1');
        expect(graph.getItemVisible('edge1')).toBe(false);
        graph.emit('wheel', {
          canvas: { x: 100, y: 50 },
          deltaY: 1,
        });

        setTimeout(() => {
          expect(graph.getItemVisible('edge1')).toBe(false);
          expect(graph.getItemVisible('node1')).toBe(true);
          expect(graph.getItemVisible('node2')).toBe(true);
          graph.destroy();
          done();
        }, 1000);
      }, 1000);
    });
  });

  it('zoom-canvas with sensitivity 10', (done) => {
    const graph = new G6.Graph({
      container,
      width: 500,
      height: 500,
      type: 'graph',
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
            type: 'zoom-canvas',
            sensitivity: 10,
          },
        ],
      },
    });

    let times = 0;
    graph.on('viewportchange', ({ zoom }) => {
      switch (times) {
        case 0:
          expect(zoom.ratio).toBe(110 / 100);
          break;
        case 1:
          expect(zoom.ratio).toBe(100 / 110);
          break;
      }
      times++;
    });

    graph.on('afterlayout', (e) => {
      // times === 0;
      graph.emit('wheel', {
        canvas: { x: 100, y: 50 },
        deltaY: -1,
      });
      // times === 1;
      graph.emit('wheel', {
        canvas: { x: 100, y: 50 },
        deltaY: 1,
      });

      graph.destroy();
      done();
    });
  });

  it('zoom-canvas with secondaryKey', (done) => {
    const graph = new G6.Graph({
      container,
      width: 500,
      height: 500,
      type: 'graph',
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
            type: 'zoom-canvas',
            secondaryKey: 'a',
          },
        ],
      },
    });

    let times = 0;
    graph.on('viewportchange', ({ zoom }) => {
      switch (times) {
        case 0:
          expect(zoom.ratio).toBe(101 / 100);
          break;
        case 1:
          expect(zoom.ratio).toBe(100 / 101);
          break;
      }
      times++;
    });

    graph.on('afterlayout', (e) => {
      // no effect, since secondary key is not pressing
      graph.emit('wheel', {
        canvas: { x: 100, y: 50 },
        deltaY: -1,
      });
      expect(graph.getZoom()).toBe(1);

      graph.emit('keydown', {
        key: 'a',
      });
      // times === 0;
      graph.emit('wheel', {
        canvas: { x: 100, y: 50 },
        deltaY: -1,
      });
      expect(graph.getZoom()).toBe(101 / 100);
      // times === 1;
      graph.emit('wheel', {
        canvas: { x: 100, y: 50 },
        deltaY: 1,
      });

      graph.emit('keyup', {
        key: 'a',
      });
      // no effect
      graph.emit('wheel', {
        canvas: { x: 100, y: 50 },
        deltaY: -1,
      });
      expect(graph.getZoom()).toBe(1);

      graph.destroy();
      done();
    });
  });

  it('zoom-canvas with trigger upDownKeys', (done) => {
    const graph = new G6.Graph({
      container,
      width: 500,
      height: 500,
      type: 'graph',
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
        default: [{ type: 'zoom-canvas', trigger: 'upDownKeys' }],
      },
    });

    let times = 0;
    graph.on('viewportchange', ({ zoom }) => {
      switch (times) {
        case 0:
          expect(zoom.ratio).toBe(101 / 100);
          break;
        case 1:
          expect(zoom.ratio).toBe(100 / 101);
          break;
      }
      times++;
    });

    graph.on('afterlayout', (e) => {
      // no effect
      graph.emit('wheel', {
        canvas: { x: 100, y: 50 },
        deltaY: -1,
      });
      expect(graph.getZoom()).toBe(1);

      // times === 0
      graph.emit('keydown', {
        key: 'ArrowUp',
      });
      expect(graph.getZoom()).toBe(101 / 100);
      // times === 1;
      graph.emit('keydown', {
        key: 'ArrowDown',
      });
      expect(graph.getZoom()).toBe(1);

      graph.destroy();
      done();
    });
  });
});

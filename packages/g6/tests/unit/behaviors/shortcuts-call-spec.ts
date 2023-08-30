import G6 from '../../../src/index';
const container = document.createElement('div');
document.querySelector('body').appendChild(container);

describe('shortcuts-call behavior', () => {
  it('shortcuts-call with default options', (done) => {
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
          { id: 'node1', data: {} },
          { id: 'node2', data: {} },
          { id: 'node3', data: {} },
          { id: 'node4', data: {} },
        ],
        edges: [{ id: 'edge1', source: 'node1', target: 'node2', data: {} }],
      },
      modes: {
        default: ['shortcuts-call'],
      },
    });

    const mockCallback = jest.fn(() => {});
    graph.on('viewportchange', () => {
      mockCallback();
      expect(mockCallback.mock.calls).toHaveLength(1);
    });

    graph.on('afterlayout', (e) => {
      graph.emit('keydown', {
        key: 'control',
      });
      graph.emit('keydown', {
        key: '1',
      });
      graph.destroy();
      done();
    });
  });
  it('shortcuts-call with custom options', (done) => {
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
          { id: 'node1', data: {} },
          { id: 'node2', data: {} },
          { id: 'node3', data: {} },
          { id: 'node4', data: {} },
        ],
        edges: [{ id: 'edge1', source: 'node1', target: 'node2', data: {} }],
      },
      modes: {
        default: [
          {
            type: 'shortcuts-call',
            trigger: 'shift',
            combinedKey: 'm',
            functionName: 'zoomTo',
            functionParams: [0.5],
          },
        ],
      },
    });

    graph.on('viewportchange', ({ zoom }) => {
      expect(zoom.ratio).toBe(0.5);
    });

    graph.on('afterlayout', (e) => {
      graph.emit('keydown', {
        key: 'shift',
      });
      graph.emit('keydown', {
        key: 'm',
      });
      graph.destroy();
      done();
    });
  });
});

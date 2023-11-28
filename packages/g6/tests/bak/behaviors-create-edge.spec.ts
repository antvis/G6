import { resetEntityCounter } from '@antv/g';
import createEdge from '../demo/behaviors/create-edge';
import { createContext } from './utils';
import './utils/useSnapshotMatchers';

describe('Create edge behavior', () => {
  beforeEach(() => {
    /**
     * SVG Snapshot testing will generate a unique id for each element.
     * Reset to 0 to keep snapshot consistent.
     */
    resetEntityCounter();
  });

  it('trigger click should be rendered correctly with Canvas2D', (done) => {
    const dir = `${__dirname}/snapshots/canvas/behaviors`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('canvas', 500, 500);

    const graph = createEdge(
      {
        container,
        backgroundCanvas,
        canvas,
        transientCanvas,
        width: 500,
        height: 500,
      },
      {
        trigger: 'click',
        edgeConfig: { keyShape: { stroke: '#f00' } },
        createVirtualEventName: 'begincreate',
        cancelCreateEventName: 'cancelcreate',
      },
    );

    graph.on('afterlayout', async () => {
      graph.emit('node:click', {
        itemId: 'node5',
        itemType: 'node',
        canvas: { x: 100, y: 100 },
      });
      graph.emit('pointermove', { canvas: { x: 100, y: 100 } });
      await expect(canvas).toMatchSVGSnapshot(
        dir,
        'behaviors-create-edge-click-begin',
      );

      graph.emit('node:click', {
        itemId: 'node2',
        itemType: 'node',
        canvas: { x: 100, y: 100 },
      });
      await expect(canvas).toMatchSVGSnapshot(
        dir,
        'behaviors-create-edge-click-finish',
      );

      graph.emit('node:click', {
        itemId: 'node5',
        itemType: 'node',
        canvas: { x: 100, y: 100 },
      });
      graph.emit('node:click', {
        itemId: 'node5',
        itemType: 'node',
        canvas: { x: 100, y: 100 },
      });
      await expect(canvas).toMatchSVGSnapshot(
        dir,
        'behaviors-create-edge-click-loop',
      );

      graph.destroy();
      done();
    });
  });

  it('trigger drag should be rendered correctly with Canvas2D', (done) => {
    const dir = `${__dirname}/snapshots/canvas/behaviors`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('canvas', 500, 500);

    const graph = createEdge(
      {
        container,
        backgroundCanvas,
        canvas,
        transientCanvas,
        width: 500,
        height: 500,
      },
      {
        trigger: 'drag',
        edgeConfig: { keyShape: { stroke: '#f00' } },
      },
    );

    graph.on('afterlayout', async () => {
      graph.emit('node:dragstart', {
        itemId: 'node5',
        itemType: 'node',
        canvas: { x: 100, y: 100 },
      });
      graph.emit('drag', { canvas: { x: 100, y: 100 } });
      await expect(canvas).toMatchSVGSnapshot(
        dir,
        'behaviors-create-edge-drag-begin',
      );

      const nodeModel = graph.getNodeData('node2');
      graph.emit('drop', {
        itemId: 'node2',
        itemType: 'node',
        canvas: { x: nodeModel?.data.x, y: nodeModel?.data.y },
      });
      await expect(canvas).toMatchSVGSnapshot(
        dir,
        'behaviors-create-edge-drag-finish',
      );

      graph.emit('node:dragstart', {
        itemId: 'node5',
        itemType: 'node',
        canvas: { x: 100, y: 100 },
      });
      graph.emit('drag', { canvas: { x: 100, y: 100 } });
      const node5Model = graph.getNodeData('node5');
      graph.emit('drop', {
        itemId: 'node5',
        itemType: 'node',
        canvas: { x: node5Model?.data.x, y: node5Model?.data.y },
      });
      await expect(canvas).toMatchSVGSnapshot(
        dir,
        'behaviors-create-edge-drag-loop',
      );

      graph.destroy();
      done();
    });
  });

  it('should be rendered correctly with SVG', (done) => {
    const dir = `${__dirname}/snapshots/svg/behaviors`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('svg', 500, 500);

    const graph = createEdge(
      {
        container,
        backgroundCanvas,
        canvas,
        transientCanvas,
        width: 500,
        height: 500,
      },
      {
        trigger: 'click',
        edgeConfig: { keyShape: { stroke: '#f00' } },
        createVirtualEventName: 'begincreate',
        cancelCreateEventName: 'cancelcreate',
      },
    );

    graph.on('afterlayout', async () => {
      graph.emit('node:click', {
        itemId: 'node5',
        itemType: 'node',
        canvas: { x: 100, y: 100 },
      });
      graph.emit('pointermove', { canvas: { x: 100, y: 100 } });
      await expect(canvas).toMatchSVGSnapshot(
        dir,
        'behaviors-create-edge-click-begin',
      );

      graph.emit('node:click', {
        itemId: 'node2',
        itemType: 'node',
        canvas: { x: 100, y: 100 },
      });
      await expect(canvas).toMatchSVGSnapshot(
        dir,
        'behaviors-create-edge-click-finish',
      );

      graph.destroy();
      done();
    });
  });
});

import { resetEntityCounter } from '@antv/g';
import { createContext } from './utils';
import anchor from '../demo/item/anchor';
import './utils/useSnapshotMatchers';

describe('Anchor points and shapes', () => {
  beforeEach(() => {
    /**
     * SVG Snapshot testing will generate a unique id for each element.
     * Reset to 0 to keep snapshot consistent.
     */
    resetEntityCounter();
  });

  it('edges link to node center with empty anchorPoints', (done) => {
    const dir = `${__dirname}/snapshots/canvas`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('canvas', 500, 500);

    const graph = anchor(
      {
        container,
        backgroundCanvas,
        canvas,
        transientCanvas,
        width: 500,
        height: 500,
      },
      {
        anchorPoints: [],
        showAnchorShapes: false,
      },
    );

    graph.on('afterlayout', async () => {
      await expect(canvas).toMatchCanvasSnapshot(dir, 'anchor-empty');
      graph.destroy();
      done();
    });
  });

  it('node with 4 anchorPoints and edge find the nearest one', (done) => {
    const dir = `${__dirname}/snapshots/canvas`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('canvas', 500, 500);

    const graph = anchor(
      {
        container,
        backgroundCanvas,
        canvas,
        transientCanvas,
        width: 500,
        height: 500,
      },
      {
        anchorPoints: [
          [0.5, 1],
          [1, 0.5],
          [0, 0.5],
          [0.5, 0],
        ],
        showAnchorShapes: false,
      },
    );

    graph.on('afterlayout', async () => {
      await expect(canvas).toMatchCanvasSnapshot(dir, 'anchor-4-points');

      // move node, edge find the nearset again
      graph.updateData('node', {
        id: 'node1',
        data: {
          x: 50,
          y: 100,
        },
      });
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'anchor-4-points-update-position',
      );

      graph.destroy();
      done();
    });
  });
  it('node with 4 anchorPoints and anchorShapes and edge find the nearest one', (done) => {
    const dir = `${__dirname}/snapshots/canvas`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('canvas', 500, 500);

    const graph = anchor(
      {
        container,
        backgroundCanvas,
        canvas,
        transientCanvas,
        width: 500,
        height: 500,
      },
      {
        anchorPoints: [
          [0.5, 1],
          [1, 0.5],
          [0, 0.5],
          [0.5, 0],
        ],
        showAnchorShapes: true,
      },
    );

    graph.on('afterlayout', async () => {
      await expect(canvas).toMatchCanvasSnapshot(dir, 'anchor-4-shapes');

      graph.updateData('edge', {
        id: 'edge1',
        data: {
          sourceAnchor: 1,
          targetAnchor: 0,
        },
      });

      graph.destroy();
      done();
    });
  });
});

import { resetEntityCounter } from '@antv/g';
import processParallelEdges from '../demo/data/process-parallel-edges';
import { EdgeUserModel } from '../../src';
import { createContext } from './utils';
import './utils/useSnapshotMatchers';

describe('Items edge line', () => {
  beforeEach(() => {
    /**
     * SVG Snapshot testing will generate a unique id for each element.
     * Reset to 0 to keep snapshot consistent.
     */
    resetEntityCounter();
  });

  it('should be rendered correctly with Canvas2D', (done) => {
    const dir = `${__dirname}/snapshots/canvas`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('canvas', 500, 500);

    const graph = processParallelEdges({
      container,
      backgroundCanvas,
      canvas,
      transientCanvas,
      width: 500,
      height: 500,
    });

    graph.on('afterlayout', async () => {
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'data-parallel-edges-quadratic',
      );

      const loopEdges: EdgeUserModel[] = [];
      for (let i = 0; i < 10; i++) {
        loopEdges.push({
          id: `edgeA-A${i}`,
          source: 'node1',
          target: 'node1',
          data: {
            label: `${i}th edge of A -> A`,
          },
        });
      }
      graph.addData('edge', loopEdges);
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'data-parallel-edges-loop',
      );

      graph.destroy();
      done();
    });
  });

  it('should be rendered correctly with SVG', (done) => {
    const dir = `${__dirname}/snapshots/svg`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('svg', 500, 500);

    const graph = processParallelEdges({
      container,
      backgroundCanvas,
      canvas,
      transientCanvas,
      width: 500,
      height: 500,
    });

    graph.on('afterlayout', async () => {
      await expect(canvas).toMatchSVGSnapshot(
        dir,
        'data-parallel-edges-quadratic',
      );

      graph.destroy();
      done();
    });
  });

  it.skip('should be rendered correctly with WebGL', (done) => {
    const dir = `${__dirname}/snapshots/webgl`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('webgl', 500, 500);

    const graph = processParallelEdges({
      container,
      backgroundCanvas,
      canvas,
      transientCanvas,
      width: 500,
      height: 500,
    });

    graph.on('afterlayout', async () => {
      await expect(canvas).toMatchWebGLSnapshot(dir, 'items-edge-line');
      graph.destroy();
      done();
    });
  });
});

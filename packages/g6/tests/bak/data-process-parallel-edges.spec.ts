import { resetEntityCounter } from '@antv/g';
import processParallelEdges from '../demo/data/process-parallel-edges';
import { EdgeUserModel } from '../../src';
import { createContext, sleep } from './utils';
import './utils/useSnapshotMatchers';

describe('Process parallel edges', () => {
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
      await expect(canvas).toMatchSVGSnapshot(
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
      await expect(canvas).toMatchSVGSnapshot(dir, 'data-parallel-edges-loop');

      // ====== add/remove edge ======
      const $changeData = document.getElementById('parallelEdges-removeEdge')!;
      $changeData.click();
      await expect(canvas).toMatchSVGSnapshot(
        dir,
        'data-parallel-edges-add-edge',
      );

      $changeData.click();
      await expect(canvas).toMatchSVGSnapshot(
        dir,
        'data-parallel-edges-remove-edge',
      );

      // ====== update edge's source ======
      const $updateData = document.getElementById('parallelEdges-updateData')!;
      $updateData.click();
      await expect(canvas).toMatchSVGSnapshot(
        dir,
        'data-parallel-edges-update-edge-1',
      );

      $updateData.click();
      await expect(canvas).toMatchSVGSnapshot(
        dir,
        'data-parallel-edges-update-edge-2',
      );

      $updateData.click();
      await expect(canvas).toMatchSVGSnapshot(
        dir,
        'data-parallel-edges-update-edge-3',
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
      await expect(canvas).toMatchWebGLSnapshot(
        dir,
        'data-parallel-edges-quadratic',
      );
      graph.destroy();
      done();
    });
  });
});

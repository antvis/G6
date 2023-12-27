import { EdgeUserModel } from '../../src';
import processParallelEdges from '../demo/data/process-parallel-edges';
import { createContext } from './utils';
import './utils/useSnapshotMatchers';

const dir = `${__dirname}/snapshots/data-parallel`;

describe('Process parallel edges', () => {
  it('should be rendered correctly with Canvas2D', (done) => {
    const { backgroundCanvas, canvas, container, labelCanvas, transientCanvas, transientLabelCanvas } = createContext(
      500,
      500,
    );

    const graph = processParallelEdges({
      backgroundCanvas,
      canvas,
      container,
      labelCanvas,
      transientCanvas,
      transientLabelCanvas,
      width: 500,
      height: 500,
    });

    graph.on('afterlayout', async () => {
      await expect(canvas).toMatchSVGSnapshot(dir, 'data-parallel-edges-quadratic');

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
      await expect(canvas).toMatchSVGSnapshot(dir, 'data-parallel-edges-add-edge');

      $changeData.click();
      await expect(canvas).toMatchSVGSnapshot(dir, 'data-parallel-edges-remove-edge');

      // ====== update edge's source ======
      const $updateData = document.getElementById('parallelEdges-updateData')!;
      $updateData.click();
      await expect(canvas).toMatchSVGSnapshot(dir, 'data-parallel-edges-update-edge-1');

      $updateData.click();
      await expect(canvas).toMatchSVGSnapshot(dir, 'data-parallel-edges-update-edge-2');

      $updateData.click();
      await expect(canvas).toMatchSVGSnapshot(dir, 'data-parallel-edges-update-edge-3');

      graph.destroy();
      done();
    });
  });
});

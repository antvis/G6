import { resetEntityCounter } from '@antv/g';
import force3D from '../demo/layouts/force-3d';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { sleep } from './utils/sleep';
import './utils/useSnapshotMatchers';

describe('Force3D layout', () => {
  beforeEach(() => {
    /**
     * SVG Snapshot testing will generate a unique id for each element.
     * Reset to 0 to keep snapshot consistent.
     */
    resetEntityCounter();
  });

  it.skip('should be rendered correctly with WebGL', (done) => {
    const dir = `${__dirname}/snapshots/webgl`;
    const backgroundCanvas = createNodeGCanvas('webgl', 500, 500);
    const canvas = createNodeGCanvas('webgl', 500, 500);
    const transientCanvas = createNodeGCanvas('webgl', 500, 500);

    const graph = force3D({
      backgroundCanvas,
      canvas,
      transientCanvas,
      width: 500,
      height: 500,
      renderer: 'webgl-3d',
    });

    graph.on('afterlayout', async () => {
      await sleep(1000);
      await expect(canvas).toMatchWebGLSnapshot(dir, 'layout-force3d');
      graph.destroy();
      done();
    });
  });
});

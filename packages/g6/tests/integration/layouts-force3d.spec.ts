import { resetEntityCounter } from '@antv/g';
import force3D from '../demo/layouts/force-3d';
import './utils/useSnapshotMatchers';
import { createContext } from './utils';

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
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('webgl', 500, 500);

    const graph = force3D({
      container,
      backgroundCanvas,
      canvas,
      transientCanvas,
      width: 500,
      height: 500,
      renderer: 'webgl-3d',
    });

    graph.on('afterlayout', async () => {
      await expect(canvas).toMatchWebGLSnapshot(dir, 'layouts-force3d');
      graph.destroy();
      done();
    });
  });
});

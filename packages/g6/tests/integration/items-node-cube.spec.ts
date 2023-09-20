import { resetEntityCounter } from '@antv/g';
import cube from '../demo/item/node/cube'
import './utils/useSnapshotMatchers';
import { createContext } from './utils';

describe('Items node cube', () => {
  beforeEach(() => {
    /**
     * SVG Snapshot testing will generate a unique id for each element.
     * Reset to 0 to keep snapshot consistent.
     */
    resetEntityCounter();
  });

  it('should be rendered correctly with WebGL', (done) => {
    const dir = `${__dirname}/snapshots/webgl/items/node`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('webgl', 500, 500);

    const graph = cube({
      container,
      backgroundCanvas,
      canvas,
      transientCanvas,
      width: 500,
      height: 500,
      renderer: 'webgl-3d',
    });

    graph.on('afterrender', async () => {
      await expect(canvas).toMatchWebGLSnapshot(dir, 'items-node-cube');
      graph.destroy();
      done();
    });
  });
});

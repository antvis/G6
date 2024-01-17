import force3D from '../demo/layouts/force-3d';
import { createContext } from './utils';
import './utils/useSnapshotMatchers';

const dir = `${__dirname}/snapshots/layouts`;

describe('Force3D layout', () => {
  it.skip('should be rendered correctly with WebGL', (done) => {
    const { backgroundCanvas, canvas, transientCanvas, container } = createContext(500, 500);

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
      await expect(canvas).toMatchSVGSnapshot(dir, 'force3d');
      graph.destroy();
      done();
    });
  });
});

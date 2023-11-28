import { resetEntityCounter } from '@antv/g';
import TimebarTime from '../demo/plugins/timebar-time';
import { createContext } from './utils';
import './utils/useSnapshotMatchers';

describe('Default Timebar', () => {
  beforeEach(() => {
    resetEntityCounter();
  });

  it('should be rendered correctly with Canvas2D', (done) => {
    const dir = `${__dirname}/snapshots/canvas/plugins/timebar`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('canvas', 500, 500);
    const graph = TimebarTime({
      backgroundCanvas,
      canvas,
      transientCanvas,
      width: 500,
      height: 500,
      container,
    });

    graph.on('afterlayout', async () => {
      await expect(canvas).toMatchSVGSnapshot(dir, 'plugins-timebar-chart');
      graph.destroy();
      done();
    });
  });
});

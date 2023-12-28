import TimebarTime from '../demo/plugins/timebar-time';
import { createContext } from './utils';
import './utils/useSnapshotMatchers';

const dir = `${__dirname}/snapshots/plugins/timebar`;

describe.skip('Default Timebar', () => {
  it('should be rendered correctly', (done) => {
    const { backgroundCanvas, canvas, container, labelCanvas, transientCanvas, transientLabelCanvas } = createContext(
      500,
      500,
    );
    const graph = TimebarTime({
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
      await expect(canvas).toMatchSVGSnapshot(dir, 'plugins-timebar-timeline');
      graph.destroy();
      done();
    });
  });
});

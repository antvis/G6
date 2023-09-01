import { resetEntityCounter } from '@antv/g';
import { createContext } from '../utils';
import TimebarTime from '../../demo/plugins/timebar-time';

describe('Default Timebar', () => {
  beforeEach(() => {
    resetEntityCounter();
  });

  it('should be rendered correctly with Canvas2D', (done) => {
    const dir = `${__dirname}/../snapshots/canvas`;
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
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'plugins-toolbar-default',
      );
      graph.destroy();
      done();
    });
  });
});

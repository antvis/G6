import scrollCanvas from '../demo/behaviors/scroll-canvas';
import { createContext } from './utils';
import './utils/useSnapshotMatchers';

const dir = `${__dirname}/snapshots/behaviors`;

describe('Scroll canvas behavior', () => {
  it('should be rendered correctly', (done) => {
    const { backgroundCanvas, canvas, container, labelCanvas, transientCanvas, transientLabelCanvas } = createContext(
      500,
      500,
    );

    const graph = scrollCanvas({
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
      await expect(canvas).toMatchSVGSnapshot(dir, 'behaviors-scroll-canvas');

      graph.emit('wheel', {
        deltaX: 50,
        deltaY: 50,
      });

      await expect(canvas).toMatchSVGSnapshot(dir, 'behaviors-scroll-canvas-wheel');

      graph.emit('wheel', {
        client: { x: 50, y: 50 },
        ctrlKey: true,
      });

      await expect(canvas).toMatchSVGSnapshot(dir, 'behaviors-scroll-canvas-zoom');

      graph.destroy();
      done();
    });
  });
});

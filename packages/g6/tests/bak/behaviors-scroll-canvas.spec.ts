import { resetEntityCounter } from '@antv/g';
import scrollCanvas from '../demo/behaviors/scroll-canvas';
import { createContext, triggerEvent } from './utils';
import './utils/useSnapshotMatchers';

function sleep(time: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(null);
    }, time);
  });
}
describe('Scroll canvas behavior', () => {
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

    const graph = scrollCanvas({
      container,
      backgroundCanvas,
      canvas,
      transientCanvas,
      width: 500,
      height: 500,
    });

    graph.on('afterlayout', async () => {
      await expect(canvas).toMatchSVGSnapshot(dir, 'behaviors-scroll-canvas');

      graph.emit('wheel', {
        deltaX: 50,
        deltaY: 50,
      });
      await sleep(2000);
      await expect(canvas).toMatchSVGSnapshot(
        dir,
        'behaviors-scroll-canvas-wheel',
      );

      graph.emit('wheel', {
        client: { x: 50, y: 50 },
        ctrlKey: true,
      });

      await sleep(2000);
      await expect(canvas).toMatchSVGSnapshot(
        dir,
        'behaviors-scroll-canvas-zoom',
      );

      graph.destroy();
      done();
    });
  });

  it('should be rendered correctly with SVG', (done) => {
    const dir = `${__dirname}/snapshots/svg`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('svg', 500, 500);

    const graph = scrollCanvas({
      container,
      backgroundCanvas,
      canvas,
      transientCanvas,
      width: 500,
      height: 500,
    });

    graph.on('afterlayout', async () => {
      await expect(canvas).toMatchSVGSnapshot(dir, 'behaviors-scroll-canvas');

      graph.emit('wheel', {
        deltaX: 50,
        deltaY: 50,
      });

      await sleep(2000);
      await expect(canvas).toMatchSVGSnapshot(
        dir,
        'behaviors-scroll-canvas-wheel',
      );

      graph.emit('wheel', {
        client: { x: 50, y: 50 },
        ctrlKey: true,
      });

      await sleep(2000);
      await expect(canvas).toMatchSVGSnapshot(
        dir,
        'behaviors-scroll-canvas-zoom',
      );

      graph.destroy();
      done();
    });
  });
});

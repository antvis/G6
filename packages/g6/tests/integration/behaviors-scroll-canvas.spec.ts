import { resetEntityCounter } from '@antv/g';
import scrollCanvas from '../demo/behaviors/activate-relations';
import './utils/useSnapshotMatchers';
import { createContext, triggerEvent } from './utils';

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
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'behaviors-scroll-canvas',
      );

      graph.emit('wheel', {
        deltaX: 50,
        deltaY: 50,
      });

      await expect(canvas).toMatchSVGSnapshot(dir, 'behaviors-scroll-canvas-scrolled');

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

      await expect(canvas).toMatchSVGSnapshot(dir, 'behaviors-scroll-canvas-scrolled');
      
      graph.destroy();
      done();
    });
  });
});

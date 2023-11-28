import { resetEntityCounter } from '@antv/g';
import d3force from '../demo/layouts/d3force';
import { createContext } from './utils';
import './utils/useSnapshotMatchers';

describe('D3Force layout', () => {
  beforeEach(() => {
    /**
     * SVG Snapshot testing will generate a unique id for each element.
     * Reset to 0 to keep snapshot consistent.
     */
    resetEntityCounter();
  });

  /**
   * D3 force has some random result, which is hard to test with screenshots.
   */
  it.skip('should be rendered correctly with Canvas2D', (done) => {
    const dir = `${__dirname}/snapshots/canvas`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('canvas', 500, 500);

    const graph = d3force({
      container,
      backgroundCanvas,
      canvas,
      transientCanvas,
      width: 500,
      height: 500,
    });

    graph.on('afterlayout', async () => {
      await expect(canvas).toMatchSVGSnapshot(dir, 'layouts-d3force');

      // const layoutAnimation = graph.getLayoutCurrentAnimation()!;
      // layoutAnimation.
      // layoutAnimation.currentTime = 0;
      // await expect(canvas).toMatchSVGSnapshot(dir, 'layouts-d3force-0');

      graph.destroy();
      done();
    });
  });

  it.skip('should be rendered correctly with SVG', (done) => {
    const dir = `${__dirname}/snapshots/svg`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('svg', 500, 500);

    const graph = d3force({
      container,
      backgroundCanvas,
      canvas,
      transientCanvas,
      width: 500,
      height: 500,
    });

    graph.on('afterlayout', async () => {
      await expect(canvas).toMatchSVGSnapshot(dir, 'layouts-d3force');
      graph.destroy();
      done();
    });
  });

  it.skip('should be rendered correctly with WebGL', (done) => {
    const dir = `${__dirname}/snapshots/webgl`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('webgl', 500, 500);

    const graph = d3force({
      container,
      backgroundCanvas,
      canvas,
      transientCanvas,
      width: 500,
      height: 500,
    });

    graph.on('afterlayout', async () => {
      await expect(canvas).toMatchWebGLSnapshot(dir, 'layouts-d3force');
      graph.destroy();
      done();
    });
  });
});

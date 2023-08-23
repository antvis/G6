import { resetEntityCounter } from '@antv/g';
import force from '../demo/layouts/force';
import { createContext } from './utils';
import './utils/useSnapshotMatchers';

describe.skip('Force layout', () => {
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

    const graph = force({
      container,
      backgroundCanvas,
      canvas,
      transientCanvas,
      width: 500,
      height: 500,
    });

    graph.on('afterlayout', async () => {
      await expect(canvas).toMatchCanvasSnapshot(dir, 'layouts-force');
      graph.destroy();
      done();
    });
  });

  it('should be rendered correctly with SVG', (done) => {
    const dir = `${__dirname}/snapshots/svg`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('svg', 500, 500);

    const graph = force({
      container,
      backgroundCanvas,
      canvas,
      transientCanvas,
      width: 500,
      height: 500,
    });

    graph.on('afterlayout', async () => {
      await expect(canvas).toMatchSVGSnapshot(dir, 'layouts-force');
      graph.destroy();
      done();
    });
  });

  it.skip('should be rendered correctly with WebGL', (done) => {
    const dir = `${__dirname}/snapshots/webgl`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('webgl', 500, 500);

    const graph = force({
      container,
      backgroundCanvas,
      canvas,
      transientCanvas,
      width: 500,
      height: 500,
    });

    graph.on('afterlayout', async () => {
      await expect(canvas).toMatchWebGLSnapshot(dir, 'layouts-force');
      graph.destroy();
      done();
    });
  });
});

import { resetEntityCounter } from '@antv/g';
import force from '../demo/layouts/force';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { sleep } from './utils/sleep';
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
    const backgroundCanvas = createNodeGCanvas('canvas', 500, 500);
    const canvas = createNodeGCanvas('canvas', 500, 500);
    const transientCanvas = createNodeGCanvas('canvas', 500, 500);

    const graph = force({
      backgroundCanvas,
      canvas,
      transientCanvas,
      width: 500,
      height: 500,
    });

    graph.on('afterlayout', async () => {
      await sleep(2000);
      await expect(canvas).toMatchCanvasSnapshot(dir, 'layout-force');
      graph.destroy();
      done();
    });
  });

  it('should be rendered correctly with SVG', (done) => {
    const dir = `${__dirname}/snapshots/svg`;
    const backgroundCanvas = createNodeGCanvas('svg', 500, 500);
    const canvas = createNodeGCanvas('svg', 500, 500);
    const transientCanvas = createNodeGCanvas('svg', 500, 500);

    const graph = force({
      backgroundCanvas,
      canvas,
      transientCanvas,
      width: 500,
      height: 500,
    });

    graph.on('afterlayout', async () => {
      await sleep(1000);
      await expect(canvas).toMatchSVGSnapshot(dir, 'layout-force');
      graph.destroy();
      done();
    });
  });

  it('should be rendered correctly with WebGL', (done) => {
    const dir = `${__dirname}/snapshots/webgl`;
    const backgroundCanvas = createNodeGCanvas('webgl', 500, 500);
    const canvas = createNodeGCanvas('webgl', 500, 500);
    const transientCanvas = createNodeGCanvas('webgl', 500, 500);

    const graph = force({
      backgroundCanvas,
      canvas,
      transientCanvas,
      width: 500,
      height: 500,
    });

    graph.on('afterlayout', async () => {
      await sleep(1000);
      await expect(canvas).toMatchWebGLSnapshot(dir, 'layout-force');
      graph.destroy();
      done();
    });
  });
});

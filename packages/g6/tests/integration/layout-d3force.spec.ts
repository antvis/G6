import { resetEntityCounter } from '@antv/g';
import d3force from '../demo/layouts/d3force';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { sleep } from './utils/sleep';
import './utils/useSnapshotMatchers';

describe('D3Force layout', () => {
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

    const graph = d3force({
      backgroundCanvas,
      canvas,
      transientCanvas,
      width: 500,
      height: 500,
    });

    graph.on('afterlayout', async () => {
      await sleep(300);
      await expect(canvas).toMatchCanvasSnapshot(dir, 'layout-d3force');

      // const layoutAnimation = graph.getLayoutCurrentAnimation()!;
      // layoutAnimation.
      // layoutAnimation.currentTime = 0;
      // await expect(canvas).toMatchCanvasSnapshot(dir, 'layout-d3force-0');

      graph.destroy();
      done();
    });
  });

  it('should be rendered correctly with SVG', (done) => {
    const dir = `${__dirname}/snapshots/svg`;
    const backgroundCanvas = createNodeGCanvas('svg', 500, 500);
    const canvas = createNodeGCanvas('svg', 500, 500);
    const transientCanvas = createNodeGCanvas('svg', 500, 500);

    const graph = d3force({
      backgroundCanvas,
      canvas,
      transientCanvas,
      width: 500,
      height: 500,
    });

    graph.on('afterlayout', async () => {
      await sleep(300);
      await expect(canvas).toMatchSVGSnapshot(dir, 'layout-d3force');
      graph.destroy();
      done();
    });
  });

  it('should be rendered correctly with WebGL', (done) => {
    const dir = `${__dirname}/snapshots/webgl`;
    const backgroundCanvas = createNodeGCanvas('webgl', 500, 500);
    const canvas = createNodeGCanvas('webgl', 500, 500);
    const transientCanvas = createNodeGCanvas('webgl', 500, 500);

    const graph = d3force({
      backgroundCanvas,
      canvas,
      transientCanvas,
      width: 500,
      height: 500,
    });

    graph.on('afterlayout', async () => {
      await sleep(300);
      await expect(canvas).toMatchWebGLSnapshot(dir, 'layout-d3force');
      graph.destroy();
      done();
    });
  });
});

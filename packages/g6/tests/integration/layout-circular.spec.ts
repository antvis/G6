import circular from '../demo/layouts/circular';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { sleep } from './utils/sleep';
import './utils/useSnapshotMatchers';

describe('Circular layout', () => {
  const dir = `${__dirname}/snapshots/layout`;
  const backgroundCanvas = createNodeGCanvas(500, 500);
  const canvas = createNodeGCanvas(500, 500);
  const transientCanvas = createNodeGCanvas(500, 500);

  it('chart({ autoFit: true }) should fit parent container', (done) => {
    const graph = circular({
      backgroundCanvas,
      canvas,
      transientCanvas,
      width: 500,
      height: 500,
    });

    graph.on('afterlayout', async () => {
      await sleep(1000);

      expect(canvas).toMatchCanvasSnapshot(dir, 'circular');
      done();
    });
    // await sleep(1000);
    // await expect(canvas).toMatchCanvasSnapshot(dir, 'circular');
  });

  afterAll(() => {
    canvas?.destroy();
  });
});

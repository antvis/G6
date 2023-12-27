import d3force from '../demo/layouts/d3force';
import { createContext } from './utils';
import './utils/useSnapshotMatchers';

const dir = `${__dirname}/snapshots/layouts`;

describe('D3Force layout', () => {
  /**
   * D3 force has some random result, which is hard to test with screenshots.
   */
  it.skip('should be rendered correctly', (done) => {
    const { backgroundCanvas, canvas, container, labelCanvas, transientCanvas, transientLabelCanvas } = createContext(
      500,
      500,
    );

    const graph = d3force({
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
      await expect(canvas).toMatchSVGSnapshot(dir, 'd3force');

      // const layoutAnimation = graph.getLayoutCurrentAnimation()!;
      // layoutAnimation.
      // layoutAnimation.currentTime = 0;
      // await expect(canvas).toMatchSVGSnapshot(dir, 'layouts-d3force-0');

      graph.destroy();
      done();
    });
  });
});

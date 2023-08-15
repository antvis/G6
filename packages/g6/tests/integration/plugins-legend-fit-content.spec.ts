import { resetEntityCounter } from '@antv/g';
import legend from '../demo/plugins/legend';
import './utils/useSnapshotMatchers';
import { createContext, triggerEvent } from './utils';
import { createNodeGCanvas } from './utils/createNodeGCanvas';

describe('Plugin legend fit content', () => {
  beforeEach(() => {
    /**
     * SVG Snapshot testing will generate a unique id for each element.
     * Reset to 0 to keep snapshot consistent.
     */
    resetEntityCounter();
  });

  it('should be rendered correctly with SVG', (done) => {
    const dir = `${__dirname}/snapshots/svg`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('svg', 500, 500);
    const legendCanvas = createNodeGCanvas('svg', 200, 200);

    const graph = legend({
      container,
      backgroundCanvas,
      canvas,
      transientCanvas,
      width: 500,
      height: 500,
      legendCanvas,
    });

    graph.on('afterlayout', async () => {
      await expect(legendCanvas).toMatchSVGSnapshot(
        dir,
        'plugins-legend-fit-content',
      );
      graph.destroy();
      done();
    });
  });
});

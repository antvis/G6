import EdgeFilterLens from '../demo/plugins/edgeFilterLens';
import { createContext } from './utils';
import { triggerEvent } from './utils/event';
import './utils/useSnapshotMatchers';

const dir = `${__dirname}/snapshots/plugins/edgeFilterLens`;

describe('Default EdgeFilterLens', () => {
  it('should be rendered correctly with fitler lens with mousemove', async () => {
    const {
      backgroundCanvas,
      canvas,
      container,
      labelCanvas,
      transientCanvas,
      transientLabelCanvas,
    } = createContext(500, 500);
    const graph = EdgeFilterLens({
      backgroundCanvas,
      canvas,
      container,
      labelCanvas,
      transientCanvas,
      transientLabelCanvas,
      width: 500,
      height: 500,
    });

    const process = new Promise((resolve) => {
      graph.on('afterlayout', () => {
        resolve(undefined);
      });
    });

    await process;

    triggerEvent(graph, 'mousedown', 200, 200);
    await expect(transientCanvas).toMatchSVGSnapshot(
      dir,
      'plugins-edge-filter-lens-transients',
    );
    graph.destroy();
  });
});

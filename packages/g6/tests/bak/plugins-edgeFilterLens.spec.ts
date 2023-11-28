import { resetEntityCounter } from '@antv/g';
import EdgeFilterLens from '../demo/plugins/edgeFilterLens';
import { createContext, sleep } from './utils';
import { triggerEvent } from './utils/event';
import './utils/useSnapshotMatchers';

describe('Default EdgeFilterLens', () => {
  beforeEach(() => {
    resetEntityCounter();
  });

  it('should be rendered correctly with fitler lens with mousemove', async () => {
    const dir = `${__dirname}/snapshots/canvas/plugins/edgeFilterLens`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('canvas', 500, 500);
    const graph = EdgeFilterLens({
      backgroundCanvas,
      canvas,
      transientCanvas,
      width: 500,
      height: 500,
      container,
    });
    console.log('graph', graph);

    const process = new Promise((reslove) => {
      graph.on('afterlayout', () => {
        console.log('afterlayout');
        reslove();
      });
    });

    await process;
    await sleep(300);
    triggerEvent(graph, 'mousedown', 200, 200);
    await expect(transientCanvas).toMatchSVGSnapshot(
      dir,
      'plugins-edge-filter-lens-transients',
    );
    graph.destroy();
  });
});

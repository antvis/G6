import { resetEntityCounter } from '@antv/g';
import EdgeFilterLens from '../demo/plugins/edgeFilterLens';
import { createContext, sleep } from './utils';
import { triggerEvent } from './utils/event';
import './utils/useSnapshotMatchers';

describe('Default EdgeFilterLens', () => {
  beforeEach(() => {
    resetEntityCounter();
  });

  it('should be rendered correctly with Canvas2D', async () => {
    const dir = `${__dirname}/snapshots/canvas/plugins/edgeFilterLens`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('canvas', 500, 500);
    const graph = await EdgeFilterLens({
      backgroundCanvas,
      canvas,
      transientCanvas,
      width: 500,
      height: 500,
      container,
    });

    const process = new Promise((reslove) => {
      graph.on('afterlayout', reslove);
    })

    await process;
    await sleep(300);
    triggerEvent(graph, 'mousedown', 100, 100);
    await expect(canvas).toMatchCanvasSnapshot(
      dir,
      'plugins-edge-filter-lens',
    );
    graph.destroy();
  });
});

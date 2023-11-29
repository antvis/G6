import { resetEntityCounter } from '@antv/g';
import './utils/useSnapshotMatchers';
import collapseExpandTree from '../demo/behaviors/collapse-expand-tree';
import { createContext, sleep } from './utils';

describe('Collapse or expand a branch', () => {
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

    const graph = collapseExpandTree({
      container,
      backgroundCanvas,
      canvas,
      transientCanvas,
      width: 500,
      height: 500,
    });

    graph.on('afterrender', async (e) => {
      await sleep(100);
      await expect(canvas).toMatchSVGSnapshot(dir, 'behaviors-collapse-expand');

      // collapse child branch
      graph.emit('node:click', { itemId: 'cnode1', itemType: 'node' });
      await sleep(800);
      await expect(canvas).toMatchSVGSnapshot(
        dir,
        'behaviors-collapse-expand-collapse-cnode1',
      );

      // collapse parent branch
      graph.emit('node:click', { itemId: 'node1', itemType: 'node' });
      await sleep(800);
      await expect(canvas).toMatchSVGSnapshot(
        dir,
        'behaviors-collapse-expand-collapse-node1',
      );

      // expand parent branch
      graph.emit('node:click', { itemId: 'node1', itemType: 'node' });
      await sleep(1000);
      await expect(canvas).toMatchSVGSnapshot(
        dir,
        'behaviors-collapse-expand-expand-node1',
      );
      // expand child branch
      graph.emit('node:click', { itemId: 'cnode1', itemType: 'node' });
      await sleep(1000);
      await expect(canvas).toMatchSVGSnapshot(
        dir,
        'behaviors-collapse-expand-expand-cnode1',
      );
      graph.destroy();
      done();
    });
  });
});

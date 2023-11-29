import './utils/useSnapshotMatchers';
import collapseExpandTree from '../demo/behaviors/collapse-expand-tree';
import { createContext } from './utils';

const dir = `${__dirname}/snapshots/behaviors`;

describe('Collapse or expand a branch', () => {
  it('should be rendered correctly', (done) => {
    const {
      backgroundCanvas,
      canvas,
      container,
      labelCanvas,
      transientCanvas,
      transientLabelCanvas,
    } = createContext(500, 500);

    const graph = collapseExpandTree({
      backgroundCanvas,
      canvas,
      container,
      labelCanvas,
      transientCanvas,
      transientLabelCanvas,
      width: 500,
      height: 500,
    });

    graph.on('afterrender', async (e) => {
      await expect([canvas, labelCanvas]).toMatchSVGSnapshot(
        dir,
        'behaviors-collapse-expand',
      );

      // collapse child branch
      graph.emit('node:click', { itemId: 'cnode1', itemType: 'node' });
      await expect([canvas, labelCanvas]).toMatchSVGSnapshot(
        dir,
        'behaviors-collapse-expand-collapse-cnode1',
      );

      // collapse parent branch
      graph.emit('node:click', { itemId: 'node1', itemType: 'node' });
      await expect([canvas, labelCanvas]).toMatchSVGSnapshot(
        dir,
        'behaviors-collapse-expand-collapse-node1',
      );

      // expand parent branch
      graph.emit('node:click', { itemId: 'node1', itemType: 'node' });
      await expect([canvas, labelCanvas]).toMatchSVGSnapshot(
        dir,
        'behaviors-collapse-expand-expand-node1',
      );
      // expand child branch
      graph.emit('node:click', { itemId: 'cnode1', itemType: 'node' });
      await expect([canvas, labelCanvas]).toMatchSVGSnapshot(
        dir,
        'behaviors-collapse-expand-expand-cnode1',
      );
      graph.destroy();
      done();
    });
  });
});

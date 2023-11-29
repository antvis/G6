import activateRelations from '../demo/behaviors/activate-relations';
import { createContext } from './utils';
import './utils/useSnapshotMatchers';

const dir = `${__dirname}/snapshots/behaviors`;

describe('Activate relations behavior', () => {
  it('should be rendered correctly', (done) => {
    const {
      backgroundCanvas,
      canvas,
      container,
      labelCanvas,
      transientCanvas,
      transientLabelCanvas,
    } = createContext(500, 500);

    const graph = activateRelations({
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
      await expect([canvas, labelCanvas]).toMatchSVGSnapshot(
        dir,
        'behaviors-activate-relations',
      );

      // @ts-ignore
      // mouseEvent.target = canvas.getContextService().getDomElement();
      graph.emit('node:click', { itemId: 'node1', itemType: 'node' });
      await expect([canvas, labelCanvas]).toMatchSVGSnapshot(
        dir,
        'behaviors-activate-relations-activate-node1',
      );

      /**
       * Click document to clear active state.
       */
      graph.emit('canvas:click', {});
      await expect([canvas, labelCanvas]).toMatchSVGSnapshot(
        dir,
        'behaviors-activate-relations-deactivate-node1',
      );

      graph.destroy();
      done();
    });
  });
});

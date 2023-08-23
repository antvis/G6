import { resetEntityCounter } from '@antv/g';
import activateRelations from '../demo/behaviors/activate-relations';
import { createContext } from './utils';
import './utils/useSnapshotMatchers';

describe('Activate relations behavior', () => {
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

    const graph = activateRelations({
      container,
      backgroundCanvas,
      canvas,
      transientCanvas,
      width: 500,
      height: 500,
    });

    graph.on('afterlayout', async () => {
      // await expect(canvas).toMatchCanvasSnapshot(
      //   dir,
      //   'behaviors-activate-relations',
      // );

      // @ts-ignore
      // mouseEvent.target = canvas.getContextService().getDomElement();
      graph.emit('node:click', { itemId: 'node1', itemType: 'node' });
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'behaviors-activate-relations-activate-node1',
      );

      /**
       * Click document to clear active state.
       */
      graph.emit('canvas:click', {});
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'behaviors-activate-relations-deactivate-node1',
      );

      graph.destroy();
      done();
    });
  });

  it('should be rendered correctly with SVG', (done) => {
    const dir = `${__dirname}/snapshots/svg`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('svg', 500, 500);

    const graph = activateRelations({
      container,
      backgroundCanvas,
      canvas,
      transientCanvas,
      width: 500,
      height: 500,
    });

    graph.on('afterlayout', async () => {
      await expect(canvas).toMatchSVGSnapshot(
        dir,
        'behaviors-activate-relations',
      );
      graph.destroy();
      done();
    });
  });
});

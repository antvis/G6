import { resetEntityCounter } from '@antv/g';
import activateRelations from '../demo/behaviors/activate-relations';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { triggerEvent } from './utils/event';
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
    const backgroundCanvas = createNodeGCanvas('canvas', 500, 500);
    const canvas = createNodeGCanvas('canvas', 500, 500);
    const transientCanvas = createNodeGCanvas('canvas', 500, 500);

    const graph = activateRelations({
      backgroundCanvas,
      canvas,
      transientCanvas,
      width: 500,
      height: 500,
    });

    graph.on('afterlayout', async () => {
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'behaviors-activate-relations',
      );

      // @ts-ignore
      // mouseEvent.target = canvas.getContextService().getDomElement();
      triggerEvent(graph, 'mousedown', 81, 50);
      triggerEvent(graph, 'mouseup', 81, 50);
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'behaviors-activate-relations-activate-node1',
      );

      /**
       * Click document to clear active state.
       */
      triggerEvent(graph, 'mousedown', 0, 0);
      triggerEvent(graph, 'mouseup', 0, 0);
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
    const backgroundCanvas = createNodeGCanvas('svg', 500, 500);
    const canvas = createNodeGCanvas('svg', 500, 500);
    const transientCanvas = createNodeGCanvas('svg', 500, 500);

    const graph = activateRelations({
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

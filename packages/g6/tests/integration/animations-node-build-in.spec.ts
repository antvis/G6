import { resetEntityCounter } from '@antv/g';
import nodeBuildIn from '../demo/animations/node-build-in';
import './utils/useSnapshotMatchers';
import { createContext } from './utils';

describe('Animation node buildIn', () => {
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

    const graph = nodeBuildIn({
      container,
      backgroundCanvas,
      canvas,
      transientCanvas,
      width: 500,
      height: 500,
    });

    graph.on('afterlayout', async () => {
      const nodes = graph.getAllNodesData();

      /**
       * Time: 0
       */
      nodes.forEach(({ id }) => {
        const node = graph['getItemById'](id);
        node.animations.forEach((animation) => {
          animation.currentTime = 0;
          animation.pause();
        });
      });
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'animations-node-build-in-ready',
      );

      /**
       * Time: 200
       */
      nodes.forEach(({ id }) => {
        const node = graph['getItemById'](id);
        node.animations.forEach((animation) => {
          animation.currentTime = 200;
          animation.pause();
        });
      });
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'animations-node-build-in-running',
      );

      /**
       * Resume all animations.
       */
      nodes.forEach(({ id }) => {
        const node = graph['getItemById'](id);
        node.animations.forEach((animation) => {
          animation.play();
        });
      });

      /**
       * Time: finished
       */
      await Promise.all(
        nodes.map(async ({ id }) => {
          const node = graph['getItemById'](id);
          await Promise.all(
            node.animations.map((animation) => animation.finished),
          );
        }),
      );
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'animations-node-build-in-finished',
      );

      graph.destroy();
      done();
    });
  });

  it('should be rendered correctly with SVG', (done) => {
    const dir = `${__dirname}/snapshots/svg`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('svg', 500, 500);

    const graph = nodeBuildIn({
      container,
      backgroundCanvas,
      canvas,
      transientCanvas,
      width: 500,
      height: 500,
    });

    graph.on('afterlayout', async () => {
      const nodes = graph.getAllNodesData();

      /**
       * Time: 0
       */
      nodes.forEach(({ id }) => {
        const node = graph['getItemById'](id);
        node.animations.forEach((animation) => {
          animation.currentTime = 0;
          animation.pause();
        });
      });
      await expect(canvas).toMatchSVGSnapshot(
        dir,
        'animations-node-build-in-ready',
      );

      /**
       * Time: 200
       */
      nodes.forEach(({ id }) => {
        const node = graph['getItemById'](id);
        node.animations.forEach((animation) => {
          animation.currentTime = 200;
          animation.pause();
        });
      });
      await expect(canvas).toMatchSVGSnapshot(
        dir,
        'animations-node-build-in-running',
      );

      /**
       * Resume all animations.
       */
      nodes.forEach(({ id }) => {
        const node = graph['getItemById'](id);
        node.animations.forEach((animation) => {
          animation.play();
        });
      });

      /**
       * Time: finished
       */
      await Promise.all(
        nodes.map(async ({ id }) => {
          const node = graph['getItemById'](id);
          await Promise.all(
            node.animations.map((animation) => animation.finished),
          );
        }),
      );
      await expect(canvas).toMatchSVGSnapshot(
        dir,
        'animations-node-build-in-finished',
      );

      graph.destroy();
      done();
    });
  });
});

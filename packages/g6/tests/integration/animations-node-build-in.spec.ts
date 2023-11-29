import nodeBuildIn from '../demo/animations/node-build-in';
import { createContext } from './utils';
import './utils/useSnapshotMatchers';

const dir = `${__dirname}/snapshots/animations`;

describe('Animation node buildIn', () => {
  it('should be rendered correctly', (done) => {
    const {
      backgroundCanvas,
      canvas,
      container,
      labelCanvas,
      transientCanvas,
      transientLabelCanvas,
    } = createContext(500, 500);

    const graph = nodeBuildIn({
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
      const nodes = graph.getAllNodesData();

      /**
       * Time: 0
       */
      nodes.forEach(({ id }) => {
        const node = graph['getItemById'](id)!;
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
        const node = graph['getItemById'](id)!;
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
        const node = graph['getItemById'](id)!;
        node.animations.forEach((animation) => {
          animation.play();
        });
      });

      /**
       * Time: finished
       */
      await Promise.all(
        nodes.map(async ({ id }) => {
          const node = graph['getItemById'](id)!;
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

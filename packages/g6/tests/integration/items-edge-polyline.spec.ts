import polylineEdge from '../demo/item/edge/polyline-edge';
import './utils/useSnapshotMatchers';
import { createContext } from './utils';

const dir = `${__dirname}/snapshots/items/edge/polyline`;

describe('Items edge polyline', () => {
  it('should be rendered correctly', (done) => {
    const {
      backgroundCanvas,
      canvas,
      container,
      labelCanvas,
      transientCanvas,
      transientLabelCanvas,
    } = createContext(500, 500);

    const graph = polylineEdge({
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
      try {
        await expect(canvas).toMatchSVGSnapshot(dir, 'items-edge-polyline');

        /**
         * Click the checkbox to show label.
         */
        const $showLabel = document.querySelectorAll(
          'input',
        )[0] as HTMLInputElement;
        $showLabel.click();
        await expect(canvas).toMatchSVGSnapshot(
          dir,
          'items-edge-polyline-show-label',
        );
        $showLabel.click();

        /**
         * Click the checkbox to display selected style.
         */
        const $selected = document.querySelectorAll(
          'input',
        )[2] as HTMLInputElement;
        $selected.click();
        await expect(canvas).toMatchSVGSnapshot(
          dir,
          'items-edge-polyline-selected-style',
        );
        $selected.click();

        /**
         * Click the checkbox to highlight.
         */
        const $highlight = document.querySelectorAll(
          'input',
        )[3] as HTMLInputElement;
        $highlight.click();
        await expect(canvas).toMatchSVGSnapshot(
          dir,
          'items-edge-polyline-highlight-style',
        );
        $highlight.click();

        /**
         * Click the checkbox to add border radius.
         */
        const $radius = document.querySelectorAll(
          'input',
        )[4] as HTMLInputElement;
        $radius.click();
        await expect(canvas).toMatchSVGSnapshot(
          dir,
          'items-edge-polyline-radius',
        );
        $radius.click();

        /**
         * Click the checkbox to enable automatic obstacle avoidances.
         */
        const $obstacle = document.querySelectorAll(
          'input',
        )[5] as HTMLInputElement;
        const $enableObstacleAvoidance = document.querySelectorAll(
          'input',
        )[6] as HTMLInputElement;

        /**
         * Click the checkbox to prevent obstacle to overlap edges.
         */
        // const $preventObstacleOverlapEdges = document.querySelectorAll(
        //   'input',
        // )[7] as HTMLInputElement;
        // const $moveObstacle = document.querySelectorAll(
        //   'input',
        // )[8] as HTMLInputElement;
        // $obstacle.click();
        // $enableObstacleAvoidance.click();
        // $preventObstacleOverlapEdges.click();
        // $moveObstacle.click();
        // await expect(canvas).toMatchSVGSnapshot(
        //   dir,
        //   'items-edge-polyline-prevent-overlap-edges',
        // );
        // $obstacle.click();
        // $enableObstacleAvoidance.click();
        // $preventObstacleOverlapEdges.click();
        // $moveObstacle.click();
      } finally {
        graph.destroy();
        done();
      }
    });
  });
});

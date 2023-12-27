import loopEdge from '../demo/item/edge/loop-edge';
import { createContext } from './utils';
import './utils/useSnapshotMatchers';

const dir = `${__dirname}/snapshots/items/edge/loop`;

describe('Items edge line', () => {
  it('should be rendered correctly', (done) => {
    const { backgroundCanvas, canvas, container, labelCanvas, transientCanvas, transientLabelCanvas } = createContext(
      500,
      500,
    );

    const graph = loopEdge({
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
      await expect(canvas).toMatchSVGSnapshot(dir, 'items-edge-loop');

      /**
       * Click the checkbox to switch clockwise.
       */
      const $switchClockwise = document.querySelectorAll('input')[0] as HTMLInputElement;
      $switchClockwise.click();
      await expect(canvas).toMatchSVGSnapshot(dir, 'items-edge-loop-clockwise');
      $switchClockwise.click();

      /**
       * Click the checkbox to set custom distance.
       */
      const $dist = document.querySelectorAll('input')[1] as HTMLInputElement;
      $dist.click();
      await expect(canvas).toMatchSVGSnapshot(dir, 'items-edge-loop-distance');
      $dist.click();

      /**
       * Click the button to change loop position.
       */
      const $loopPositionBtn = document.querySelectorAll('button')[0] as HTMLButtonElement;
      $loopPositionBtn.click();
      await expect(canvas).toMatchSVGSnapshot(dir, 'items-edge-loop-top-right');
      $loopPositionBtn.click();
      await expect(canvas).toMatchSVGSnapshot(dir, 'items-edge-loop-right');
      $loopPositionBtn.click();
      await expect(canvas).toMatchSVGSnapshot(dir, 'items-edge-loop-bottom-right');
      $loopPositionBtn.click();
      await expect(canvas).toMatchSVGSnapshot(dir, 'items-edge-loop-bottom');
      $loopPositionBtn.click();
      await expect(canvas).toMatchSVGSnapshot(dir, 'items-edge-loop-bottom-left');
      $loopPositionBtn.click();
      await expect(canvas).toMatchSVGSnapshot(dir, 'items-edge-loop-left');
      $loopPositionBtn.click();
      await expect(canvas).toMatchSVGSnapshot(dir, 'items-edge-loop-top-left');
      $loopPositionBtn.click();

      graph.destroy();
      done();
    });
  });
});

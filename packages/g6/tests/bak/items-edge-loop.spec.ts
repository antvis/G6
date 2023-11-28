import { resetEntityCounter } from '@antv/g';
import loopEdge from '../demo/item/edge/loop-edge';
import { createContext } from './utils';
import './utils/useSnapshotMatchers';

describe('Items edge line', () => {
  beforeEach(() => {
    /**
     * SVG Snapshot testing will generate a unique id for each element.
     * Reset to 0 to keep snapshot consistent.
     */
    resetEntityCounter();
  });

  it('should be rendered correctly with Canvas2D', (done) => {
    const dir = `${__dirname}/snapshots/canvas/items/edge/loop`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('canvas', 500, 500);

    const graph = loopEdge({
      container,
      backgroundCanvas,
      canvas,
      transientCanvas,
      width: 500,
      height: 500,
    });

    graph.on('afterlayout', async () => {
      await expect(canvas).toMatchSVGSnapshot(dir, 'items-edge-loop');

      /**
       * Click the checkbox to switch clockwise.
       */
      const $switchClockwise = document.querySelectorAll(
        'input',
      )[0] as HTMLInputElement;
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
      const $loopPositionBtn = document.querySelectorAll(
        'button',
      )[0] as HTMLButtonElement;
      $loopPositionBtn.click();
      await expect(canvas).toMatchSVGSnapshot(dir, 'items-edge-loop-top-right');
      $loopPositionBtn.click();
      await expect(canvas).toMatchSVGSnapshot(dir, 'items-edge-loop-right');
      $loopPositionBtn.click();
      await expect(canvas).toMatchSVGSnapshot(
        dir,
        'items-edge-loop-bottom-right',
      );
      $loopPositionBtn.click();
      await expect(canvas).toMatchSVGSnapshot(dir, 'items-edge-loop-bottom');
      $loopPositionBtn.click();
      await expect(canvas).toMatchSVGSnapshot(
        dir,
        'items-edge-loop-bottom-left',
      );
      $loopPositionBtn.click();
      await expect(canvas).toMatchSVGSnapshot(dir, 'items-edge-loop-left');
      $loopPositionBtn.click();
      await expect(canvas).toMatchSVGSnapshot(dir, 'items-edge-loop-top-left');
      $loopPositionBtn.click();

      graph.destroy();
      done();
    });
  });

  it('should be rendered correctly with SVG', (done) => {
    const dir = `${__dirname}/snapshots/svg/items/edge/loop`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('svg', 500, 500);

    const graph = loopEdge({
      container,
      backgroundCanvas,
      canvas,
      transientCanvas,
      width: 500,
      height: 500,
    });

    graph.on('afterlayout', async () => {
      await expect(canvas).toMatchSVGSnapshot(dir, 'items-edge-loop');

      /**
       * Click the checkbox to switch clockwise.
       */
      const $switchClockwise = document.querySelectorAll(
        'input',
      )[0] as HTMLInputElement;
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
      const $loopPositionBtn = document.querySelectorAll(
        'button',
      )[0] as HTMLButtonElement;
      $loopPositionBtn.click();
      await expect(canvas).toMatchSVGSnapshot(dir, 'items-edge-loop-top-right');
      $loopPositionBtn.click();
      await expect(canvas).toMatchSVGSnapshot(dir, 'items-edge-loop-right');
      $loopPositionBtn.click();
      await expect(canvas).toMatchSVGSnapshot(
        dir,
        'items-edge-loop-bottom-right',
      );
      $loopPositionBtn.click();
      await expect(canvas).toMatchSVGSnapshot(dir, 'items-edge-loop-bottom');
      $loopPositionBtn.click();
      await expect(canvas).toMatchSVGSnapshot(
        dir,
        'items-edge-loop-bottom-left',
      );
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

import { resetEntityCounter } from '@antv/g';
import lineEdge from '../demo/item/edge/line-edge';
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
    const dir = `${__dirname}/snapshots/canvas`;
    const {
      backgroundCanvas,
      canvas,
      transientCanvas,
      container,
    } = createContext('canvas', 500, 500);

    const graph = lineEdge({
      container,
      backgroundCanvas,
      canvas,
      transientCanvas,
      width: 500,
      height: 500,
    });

    graph.on('afterlayout', async () => {
      await expect(canvas).toMatchCanvasSnapshot(dir, 'items-edge-line');

      /**
       * Click the checkbox to show label.
       */
      const $showLabel = document.querySelectorAll(
        'input',
      )[0] as HTMLInputElement;
      $showLabel.click();
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'items-edge-line-show-label',
      );
      $showLabel.click();

      /**
       * Click the checkbox to display selected style.
       */
      const $selected = document.querySelectorAll(
        'input',
      )[2] as HTMLInputElement;
      $selected.click();
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'items-edge-line-selected-style',
      );
      $selected.click();

      /**
       * Click the checkbox to highlight.
       */
      const $highlight = document.querySelectorAll(
        'input',
      )[3] as HTMLInputElement;
      $highlight.click();
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'items-edge-line-highlight-style',
      );
      $highlight.click();

      graph.destroy();
      done();
    });
  });

  // it('should be rendered correctly with SVG', (done) => {
  //   const dir = `${__dirname}/snapshots/svg`;
  //   const { backgroundCanvas, canvas, transientCanvas, container } =
  //     createContext('svg', 500, 500);

  //   const graph = lineEdge({
  //     container,
  //     backgroundCanvas,
  //     canvas,
  //     transientCanvas,
  //     width: 500,
  //     height: 500,
  //   });

  //   graph.on('afterlayout', async () => {
  //     await expect(canvas).toMatchSVGSnapshot(dir, 'items-edge-line');

  //     /**
  //      * Click the checkbox to show label.
  //      */
  //     const $showLabel = document.querySelectorAll(
  //       'input',
  //     )[0] as HTMLInputElement;
  //     $showLabel.click();
  //     await expect(canvas).toMatchSVGSnapshot(
  //       dir,
  //       'items-edge-line-show-label',
  //     );
  //     $showLabel.click();

  //     /**
  //      * Click the checkbox to display selected style.
  //      */
  //     const $selected = document.querySelectorAll(
  //       'input',
  //     )[2] as HTMLInputElement;
  //     $selected.click();
  //     await expect(canvas).toMatchSVGSnapshot(
  //       dir,
  //       'items-edge-line-selected-style',
  //     );
  //     $selected.click();

  //     /**
  //      * Click the checkbox to highlight.
  //      */
  //     const $highlight = document.querySelectorAll(
  //       'input',
  //     )[3] as HTMLInputElement;
  //     $highlight.click();
  //     await expect(canvas).toMatchSVGSnapshot(
  //       dir,
  //       'items-edge-line-highlight-style',
  //     );
  //     $highlight.click();

  //     graph.destroy();
  //     done();
  //   });
  // });
});

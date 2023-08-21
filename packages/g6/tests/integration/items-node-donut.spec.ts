import { resetEntityCounter } from '@antv/g';
import donutNode from '../demo/item/node/donut-node';
import './utils/useSnapshotMatchers';
import { createContext } from './utils';

describe('Items edge line', () => {
  beforeEach(() => {
    /**
     * SVG Snapshot testing will generate a unique id for each element.
     * Reset to 0 to keep snapshot consistent.
     */
    resetEntityCounter();
  });

  it('should be rendered correctly with Canvas2D', (done) => {
    const dir = `${__dirname}/snapshots/canvas/items/node/donut`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('canvas', 500, 500);

    const graph = donutNode({
      container,
      backgroundCanvas,
      canvas,
      transientCanvas,
      width: 500,
      height: 500,
    });

    graph.on('afterlayout', async () => {
      await expect(canvas).toMatchCanvasSnapshot(dir, 'items-node-donut');

      /**
       * Click the checkbox to set custom colors.
       */
      const $customColors = document.querySelectorAll(
        'input',
      )[0] as HTMLInputElement;
      $customColors.click();
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'items-node-donut-custom-colors',
      );
      $customColors.click();

      /**
       * Click the checkbox to set custom inner size.
       */
      const $innerSize = document.querySelectorAll(
        'input',
      )[1] as HTMLInputElement;
      $innerSize.click();
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'items-node-donut-custom-innersize',
      );
      $innerSize.click();

      /**
       * Click the checkbox to update attrs.
       */
      const $attrs = document.querySelectorAll('input')[2] as HTMLInputElement;
      $attrs.click();
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'items-node-donut-custom-attrs',
      );
      $attrs.click();

      /**
       * Click the checkbox to set selected style.
       */
      const $selected = document.querySelectorAll(
        'input',
      )[3] as HTMLInputElement;
      $selected.click();
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'items-node-donut-selected-style',
      );
      $selected.click();

      graph.destroy();
      done();
    });
  });

  it('should be rendered correctly with SVG', (done) => {
    const dir = `${__dirname}/snapshots/svg/items/node/donut`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('svg', 500, 500);

    const graph = donutNode({
      container,
      backgroundCanvas,
      canvas,
      transientCanvas,
      width: 500,
      height: 500,
    });

    graph.on('afterlayout', async () => {
      await expect(canvas).toMatchSVGSnapshot(dir, 'items-node-donut');
      /**
       * Click the checkbox to set custom colors.
       */
      const $customColors = document.querySelectorAll(
        'input',
      )[0] as HTMLInputElement;
      $customColors.click();
      await expect(canvas).toMatchSVGSnapshot(
        dir,
        'items-node-donut-custom-colors',
      );
      $customColors.click();

      /**
       * Click the checkbox to set custom inner size.
       */
      const $innerSize = document.querySelectorAll(
        'input',
      )[1] as HTMLInputElement;
      $innerSize.click();
      await expect(canvas).toMatchSVGSnapshot(
        dir,
        'items-node-donut-custom-innersize',
      );
      $innerSize.click();

      /**
       * Click the checkbox to update attrs.
       */
      const $attrs = document.querySelectorAll('input')[2] as HTMLInputElement;
      $attrs.click();
      await expect(canvas).toMatchSVGSnapshot(
        dir,
        'items-node-donut-custom-attrs',
      );
      $attrs.click();

      /**
       * Click the checkbox to set selected style.
       */
      const $selected = document.querySelectorAll(
        'input',
      )[3] as HTMLInputElement;
      $selected.click();
      await expect(canvas).toMatchSVGSnapshot(
        dir,
        'items-node-donut-selected-style',
      );
      $selected.click();

      graph.destroy();
      done();
    });
  });
});

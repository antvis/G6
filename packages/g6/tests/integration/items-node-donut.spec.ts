import donutNode from '../demo/item/node/donut-node';
import { createContext } from './utils';
import './utils/useSnapshotMatchers';

const dir = `${__dirname}/snapshots/items/node/donut`;

describe('Items node donut', () => {
  it('should be rendered correctly', (done) => {
    const { backgroundCanvas, canvas, container, labelCanvas, transientCanvas, transientLabelCanvas } = createContext(
      500,
      500,
    );

    const graph = donutNode({
      backgroundCanvas,
      canvas,
      container,
      labelCanvas,
      transientCanvas,
      transientLabelCanvas,
      width: 500,
      height: 500,
    });

    graph.on('afterrender', async () => {
      await expect(canvas).toMatchSVGSnapshot(dir, 'items-node-donut');

      /**
       * Click the checkbox to set custom colors.
       */
      const $customColors = document.querySelectorAll('input')[0] as HTMLInputElement;
      $customColors.click();
      await expect(canvas).toMatchSVGSnapshot(dir, 'items-node-donut-custom-colors');
      $customColors.click();

      /**
       * Click the checkbox to set custom inner size.
       */
      const $innerSize = document.querySelectorAll('input')[1] as HTMLInputElement;
      $innerSize.click();

      await expect(canvas).toMatchSVGSnapshot(dir, 'items-node-donut-custom-innersize');
      $innerSize.click();

      /**
       * Click the checkbox to update attrs.
       */
      const $attrs = document.querySelectorAll('input')[2] as HTMLInputElement;
      $attrs.click();
      await expect(canvas).toMatchSVGSnapshot(dir, 'items-node-donut-custom-attrs');
      $attrs.click();

      /**
       * Click the checkbox to set selected style.
       */
      const $selected = document.querySelectorAll('input')[3] as HTMLInputElement;
      $selected.click();
      await expect(canvas).toMatchSVGSnapshot(dir, 'items-node-donut-selected-style');
      $selected.click();

      graph.destroy();
      done();
    });
  });
});

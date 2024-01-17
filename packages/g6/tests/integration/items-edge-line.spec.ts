import lineEdge from '../demo/item/edge/line-edge';
import { createContext } from './utils';
import './utils/useSnapshotMatchers';

const dir = `${__dirname}/snapshots/items/edge/line`;

describe('Items edge line', () => {
  it('should be rendered correctly', (done) => {
    const { backgroundCanvas, canvas, container, labelCanvas, transientCanvas, transientLabelCanvas } = createContext(
      500,
      500,
    );

    const graph = lineEdge({
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
      await expect(canvas).toMatchSVGSnapshot(dir, 'items-edge-line');

      /**
       * Click the checkbox to show label.
       */
      const $showLabel = document.querySelectorAll('input')[0] as HTMLInputElement;
      $showLabel.click();
      await expect(canvas).toMatchSVGSnapshot(dir, 'items-edge-line-show-label');
      $showLabel.click();

      /**
       * Click the checkbox to display selected style.
       */
      const $selected = document.querySelectorAll('input')[2] as HTMLInputElement;
      $selected.click();
      await expect(canvas).toMatchSVGSnapshot(dir, 'items-edge-line-selected-style');
      $selected.click();

      /**
       * Click the checkbox to highlight.
       */
      const $highlight = document.querySelectorAll('input')[3] as HTMLInputElement;
      $highlight.click();
      await expect(canvas).toMatchSVGSnapshot(dir, 'items-edge-line-highlight-style');
      $highlight.click();

      graph.destroy();
      done();
    });
  });
});

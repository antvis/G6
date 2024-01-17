import arrow from '../demo/item/edge/arrow';
import { createContext } from './utils';
import './utils/useSnapshotMatchers';

const dir = `${__dirname}/snapshots/items/edge/arrow`;

describe('Edge start arrow', () => {
  it('Edge with endArrow', (done) => {
    const { backgroundCanvas, canvas, container, labelCanvas, transientCanvas, transientLabelCanvas } = createContext(
      500,
      500,
    );

    const graph = arrow(
      {
        backgroundCanvas,
        canvas,
        container,
        labelCanvas,
        transientCanvas,
        transientLabelCanvas,
        width: 500,
        height: 500,
      },
      {
        startArrow: false,
        endArrow: true,
      },
    );

    graph.on('afterlayout', async () => {
      await expect(canvas).toMatchSVGSnapshot(dir, 'arrow-end');

      const $typeBtn = document.getElementById('arrow-change-type') as HTMLInputElement;
      $typeBtn.click();
      await expect(canvas).toMatchSVGSnapshot(dir, 'arrow-end-change-type-circle');

      $typeBtn.click();
      await expect(canvas).toMatchSVGSnapshot(dir, 'arrow-end-change-type-rect');

      $typeBtn.click();
      await expect(canvas).toMatchSVGSnapshot(dir, 'arrow-end-change-type-diamond');

      $typeBtn.click();
      await expect(canvas).toMatchSVGSnapshot(dir, 'arrow-end-change-type-vee');

      const $colorBtn = document.getElementById('arrow-change-color') as HTMLInputElement;
      $colorBtn.click();
      await expect(canvas).toMatchSVGSnapshot(dir, 'arrow-end-change-color');

      const $removeBtn = document.getElementById('arrow-remove') as HTMLInputElement;
      $removeBtn.click();
      await expect(canvas).toMatchSVGSnapshot(dir, 'arrow-end-remove');

      $removeBtn.click();
      await expect(canvas).toMatchSVGSnapshot(dir, 'arrow-end-add');

      graph.destroy();
      done();
    });
  });

  it('Edge with startArrow', (done) => {
    const { backgroundCanvas, canvas, container, labelCanvas, transientCanvas, transientLabelCanvas } = createContext(
      500,
      500,
    );

    const graph = arrow(
      {
        backgroundCanvas,
        canvas,
        container,
        labelCanvas,
        transientCanvas,
        transientLabelCanvas,
        width: 500,
        height: 500,
      },
      {
        startArrow: true,
        endArrow: false,
      },
    );

    graph.on('afterlayout', async () => {
      await expect(canvas).toMatchSVGSnapshot(dir, 'arrow-start');
      graph.destroy();
      done();
    });
  });
});
